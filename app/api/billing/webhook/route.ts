import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { mapPlanToTier, verifyPaddleSignature, type PaddleEvent } from "@/lib/billing/paddle";
import { trackServerEvent } from "@/lib/analytics/track";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("paddle-signature") ?? "";
  const secret = process.env.PADDLE_WEBHOOK_SECRET ?? "";

  if (secret) {
    const isValid = verifyPaddleSignature(raw, signature, secret);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const payload = JSON.parse(raw) as PaddleEvent;

  const userId = payload.data.custom_data?.userId;
  if (!userId) {
    return NextResponse.json({ received: true, skipped: "missing userId in custom_data" });
  }

  const status = payload.data.status ?? "active";
  const providerSubId = payload.data.id;
  const providerCustomerId = payload.data.customer_id;
  const periodEnd = payload.data.next_billed_at ? new Date(payload.data.next_billed_at) : undefined;

  await prisma.subscription.upsert({
    where: { id: `${userId}:paddle` },
    update: {
      provider: "paddle",
      providerSubId,
      providerCustomerId,
      status,
      planTier: mapPlanToTier(payload.data.custom_data?.plan),
      currentPeriodEnd: periodEnd
    },
    create: {
      id: `${userId}:paddle`,
      userId,
      provider: "paddle",
      providerSubId,
      providerCustomerId,
      status,
      planTier: mapPlanToTier(payload.data.custom_data?.plan),
      currentPeriodEnd: periodEnd
    }
  });

  if (status === "active") {
    trackServerEvent("subscription_success", { userId, provider: "paddle" });
  }

  return NextResponse.json({ received: true, event: payload.event_type });
}
