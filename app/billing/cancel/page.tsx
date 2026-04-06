import Link from "next/link";

export default function BillingCancelPage() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Checkout canceled</h1>
      <p className="text-slate-600">No worries. Your free plan is still active.</p>
      <Link href="/pricing" className="rounded-lg bg-brand-600 px-4 py-2 text-white">Back to pricing</Link>
    </div>
  );
}
