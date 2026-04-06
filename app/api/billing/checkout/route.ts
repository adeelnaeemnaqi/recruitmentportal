import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getBillingProvider, mapCheckoutPlanTier } from "@/lib/billing/provider";

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

  return NextResponse.json({ url });
}
