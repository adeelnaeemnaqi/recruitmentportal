import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <form action="/api/register" method="post" className="space-y-3">
        <input name="name" placeholder="Name" className="w-full rounded-lg border p-2" />
        <input name="email" type="email" placeholder="Email" className="w-full rounded-lg border p-2" required />
        <input name="password" type="password" placeholder="Password" className="w-full rounded-lg border p-2" required />
        <button className="w-full rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">Sign up</button>
      </form>
      <p className="text-sm text-slate-600">Already have an account? <Link href="/login" className="underline">Log in</Link></p>
    </div>
  );
}
