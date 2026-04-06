import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getBillingProvider, mapCheckoutPlanTier } from "@/lib/billing/provider";
import { trackServerEvent } from "@/lib/analytics/track";

const checkoutSchema = z.object({
  plan: z.enum(["pro_monthly", "pro_annual"])
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true, email: true } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const payload = await req.json();
  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  trackServerEvent("checkout_started", { userId: user.id, plan: parsed.data.plan });

  const origin = new URL(req.url).origin;
  const successUrl = `${origin}/billing/success?plan=${parsed.data.plan}`;
  const cancelUrl = `${origin}/billing/cancel`;

  if ((process.env.BILLING_MODE ?? "mock") === "mock") {
    await prisma.subscription.upsert({
      where: { id: `${user.id}:mock` },
      update: {
        planTier: mapCheckoutPlanTier(parsed.data.plan),
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      create: {
        id: `${user.id}:mock`,
        userId: user.id,
        provider: "mock",
        providerSubId: `mock_${parsed.data.plan}`,
        planTier: mapCheckoutPlanTier(parsed.data.plan),
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    trackServerEvent("subscription_success", { userId: user.id, plan: parsed.data.plan, mode: "mock" });

    return NextResponse.json({ url: successUrl });
  }

  const provider = getBillingProvider();
  const url = await provider.createCheckoutUrl({
    userId: user.id,
    userEmail: user.email,
    plan: parsed.data.plan,
    successUrl,
    cancelUrl
  });

  if (!url) {
    return NextResponse.json({ error: "Checkout provider unavailable" }, { status: 503 });
  }

  return NextResponse.json({ url });
}
