import Link from "next/link";
import { PlanTier } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/session";
import { getAuditLimit } from "@/lib/billing/entitlements";
import { ReportsList } from "@/components/dashboard/reports-list";

function getCurrentPeriodStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    redirect("/login");
  }

  const [reports, sub, usage] = await Promise.all([
    prisma.auditReport.findMany({
      where: { userId: user.id },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, targetJobTitle: true, totalScore: true, jobMatchScore: true, createdAt: true }
    }),
    prisma.subscription.findFirst({
      where: { userId: user.id, status: "active" },
      orderBy: { updatedAt: "desc" },
      select: { planTier: true }
    }),
    prisma.usageRecord.findUnique({
      where: { id: `${user.id}:${getCurrentPeriodStart().toISOString()}` },
      select: { auditsUsed: true }
    })
  ]);

  const planTier = sub?.planTier ?? PlanTier.FREE;
  const auditsUsed = usage?.auditsUsed ?? 0;
  const auditLimit = getAuditLimit(planTier);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/onboarding" className="rounded-lg bg-brand-600 px-4 py-2 text-white">Start new audit</Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">Plan: <strong>{planTier}</strong> · Audits used this month: <strong>{auditsUsed}/{auditLimit}</strong></p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-medium">Recent reports</h2>
        <ReportsList reports={reports} />
      </div>
    </div>
  );
}
