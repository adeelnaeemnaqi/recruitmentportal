import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Payment successful 🎉</h1>
      <p className="text-slate-600">Your subscription is active. Let’s make that profile impossible to ignore.</p>
      <div className="flex gap-3">
        <Link href="/dashboard" className="rounded-lg bg-brand-600 px-4 py-2 text-white">Go to dashboard</Link>
        <Link href="/account" className="rounded-lg border px-4 py-2">View account</Link>
      </div>
    </div>
  );
}
