import Link from "next/link";
import { CTAButtons } from "@/components/landing/cta-buttons";

const steps = ["Audit", "Match", "Rewrite", "Explain", "Refine", "Export"];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-10">
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">Recruiter-informed LinkedIn optimization</p>
          <h1 className="text-5xl font-bold leading-tight">
            Your LinkedIn profile is not bad.
            <br />
            It is just invisible.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            Get a recruiter-style audit, keyword gap analysis, niche-specific rewrite, and export-ready LinkedIn copy in minutes.
          </p>
          <CTAButtons />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Sample outcome</p>
          <p className="mt-2 text-4xl font-bold">74 → 89</p>
          <p className="mt-1 text-slate-600">Profile score improvement after rewrite + keyword alignment</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Missing high-signal keywords identified</li>
            <li>• Headline rewritten for search relevance</li>
            <li>• About section repositioned for target role</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why most profiles underperform</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "You apply repeatedly but get little response.",
            "Headlines are generic, summaries are vague.",
            "Role-specific keywords and proof are missing.",
            "Most tools rewrite text but never explain why."
          ].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">{item}</div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How ProfileRank AI works</h2>
        <div className="grid gap-3 md:grid-cols-6">
          {steps.map((step, idx) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <p className="text-xs text-slate-500">Step {idx + 1}</p>
              <p className="font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">Before</h3>
          <p className="mt-2 text-slate-600">“Experienced professional seeking opportunities with strong communication skills and passion.”</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">After</h3>
          <p className="mt-2 text-slate-600">“B2B SaaS Product Analyst translating funnel data into experiments that improved activation and retention.”</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Simple pricing</h2>
        <p className="text-slate-600">Free gives a taste. Paid gives the actual fix.</p>
        <Link href="/pricing" className="inline-flex rounded-lg bg-brand-600 px-5 py-3 font-medium text-white">View plans</Link>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="space-y-3 text-slate-700">
          <p><strong>Do you auto-post to LinkedIn?</strong> No. You stay in control of edits and publishing.</p>
          <p><strong>Will you fabricate achievements?</strong> No. Rewrites are designed to preserve truthfulness.</p>
          <p><strong>Can I test before paying?</strong> Yes, the free plan includes a limited audit preview.</p>
        </div>
      </section>
    </div>
  );
}
