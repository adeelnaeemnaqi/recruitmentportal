import Link from "next/link";
import { PlanTier } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscriptions: {
        orderBy: { updatedAt: "desc" },
        take: 1
      }
    }
  });

  if (!user) redirect("/login");

  const sub = user.subscriptions[0];
  const tier = sub?.planTier ?? PlanTier.FREE;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account & Billing</h1>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p><strong>Email:</strong> {user.email}</p>
        <p className="mt-2"><strong>Plan:</strong> {tier}</p>
        <p className="mt-2"><strong>Status:</strong> {sub?.status ?? "inactive"}</p>
        <p className="mt-2"><strong>Period ends:</strong> {sub?.currentPeriodEnd?.toISOString() ?? "N/A"}</p>
      </div>
      <Link className="rounded-lg bg-brand-600 px-4 py-2 text-white" href="/pricing">Manage plan</Link>
    </div>
  );
}
