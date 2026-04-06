import { NextResponse } from "next/server";
import { PlanTier } from "@prisma/client";
import { auth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getAuditLimit } from "@/lib/billing/entitlements";

function getCurrentPeriodStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const planTier =
    (
      await prisma.subscription.findFirst({
        where: { userId: user.id, status: "active" },
        orderBy: { updatedAt: "desc" },
        select: { planTier: true }
      })
    )?.planTier ?? PlanTier.FREE;

  const usage = await prisma.usageRecord.findUnique({
    where: { id: `${user.id}:${getCurrentPeriodStart().toISOString()}` },
    select: { auditsUsed: true, exportsUsed: true, refinesUsed: true }
  });

  const auditLimit = getAuditLimit(planTier);

  return NextResponse.json({
    planTier,
    usage: usage ?? { auditsUsed: 0, exportsUsed: 0, refinesUsed: 0 },
    limits: { audits: auditLimit }
  });
}
