import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">ProfileRank AI</p>
        <h1 className="text-4xl font-bold leading-tight">
          Your LinkedIn profile is not bad.
          <br />
          It is just invisible.
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Get a recruiter-style audit, keyword gap analysis, niche-specific rewrite, and export-ready LinkedIn copy in minutes.
        </p>
        <div className="flex gap-3">
          <Link href="/signup" className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">Get my free profile score</Link>
          <Link href="/onboarding" className="rounded-lg border border-slate-300 px-4 py-2 font-medium">See how it works</Link>
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          "Recruiters cannot shortlist what they cannot find.",
          "You do not need more buzzwords. You need better positioning.",
          "This section is doing some work. Just not the right kind."
        ].map((copy) => (
          <div key={copy} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">{copy}</div>
        ))}
      </section>
    </div>
  );
}
