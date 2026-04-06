import Link from "next/link";
import { CTAButtons } from "@/components/landing/cta-buttons";

const howItWorks = [
  { title: "Audit", text: "We score headline, about, experience, keywords, and positioning." },
  { title: "Match", text: "If you paste a job description, we calculate fit and gap areas." },
  { title: "Rewrite", text: "Get role-aligned headline/about options and experience guidance." },
  { title: "Explain", text: "Understand why each suggestion improves recruiter visibility." },
  { title: "Refine", text: "Iterate section-wise with guided controls and custom instructions." },
  { title: "Export", text: "Download shareable output package (text/json now, PDF next)." }
];

const features = [
  {
    title: "Recruiter-style profile score",
    text: "Not vibes. A transparent score out of 100 with category breakdown."
  },
  {
    title: "Keyword gap intelligence",
    text: "Find high-signal terms you’re missing and low-signal fluff to remove."
  },
  {
    title: "Job-match scoring",
    text: "Paste a JD and see what is helping your fit and what is hurting it."
  },
  {
    title: "Guided rewrites + explanations",
    text: "Get improved copy and plain-English reasons behind every change."
  },
  {
    title: "Section-wise refinement",
    text: "Make it stronger, shorter, more technical, more strategic, and more niche-specific."
  },
  {
    title: "Usage gating + billing-ready",
    text: "Free and paid behavior is in place with Paddle-friendly architecture."
  }
];

const faqs = [
  {
    q: "Is this a generic AI writer?",
    a: "No. It is built around recruiter visibility, role fit, and positioning clarity."
  },
  {
    q: "Will it fabricate achievements?",
    a: "No. The product is designed to preserve truthfulness and avoid invented claims."
  },
  {
    q: "Do you post to LinkedIn automatically?",
    a: "No. You keep full control over edits and publishing."
  },
  {
    q: "Can I try before paying?",
    a: "Yes. The free tier gives a limited preview so you can evaluate quality first."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-10">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-br from-white to-slate-100 p-8 lg:grid-cols-2 lg:p-12">
        <div className="space-y-5">
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">ProfileRank AI</p>
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
          <p className="text-sm font-semibold text-slate-500">Live example snapshot</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">Profile score</p>
              <p className="text-2xl font-bold">74 → 89</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">Job match</p>
              <p className="text-2xl font-bold">68 → 84</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>✅ Missing high-value keywords identified</li>
            <li>✅ Headline repositioned for target role</li>
            <li>✅ About rewritten for clarity + credibility</li>
            <li>✅ Experience phrasing shifted toward outcomes</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">The problem</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "You apply repeatedly and hear... silence.",
            "Your headline sounds generic, not searchable.",
            "Your About section says words, but not positioning.",
            "Most tools rewrite content without explaining why it works."
          ].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">{item}</div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">How it works</h2>
          <Link href="/demo" className="text-sm font-medium text-brand-600">View demo →</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {howItWorks.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Step {index + 1}</p>
              <p className="mt-1 font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">Before</h3>
          <p className="mt-2 text-slate-600">
            “Experienced professional seeking opportunities with communication and teamwork skills.”
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">After</h3>
          <p className="mt-2 text-slate-600">
            “B2B SaaS Product Analyst turning user behavior data into experiments that improved activation and retention.”
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="text-slate-600">Free gives a taste. Paid gives the actual fix.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <p className="font-semibold">Free</p>
            <p className="text-sm text-slate-600">1 audit/month, limited preview, no full export.</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="font-semibold">Pro</p>
            <p className="text-sm text-slate-600">Full audit, full rewrites, guided editing, exports, history.</p>
          </div>
        </div>
        <Link href="/pricing" className="inline-flex rounded-lg bg-brand-600 px-5 py-3 font-medium text-white">See full pricing</Link>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-3xl font-bold">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-lg border p-4">
              <p className="font-medium">{item.q}</p>
              <p className="mt-1 text-sm text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-slate-900 p-8 text-white">
        <h2 className="text-3xl font-bold">Recruiters cannot shortlist what they cannot find.</h2>
        <p className="mt-2 max-w-2xl text-slate-300">Better keywords. Cleaner positioning. Less fluff. Let’s fix your profile properly.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/signup" className="rounded-lg bg-white px-5 py-3 font-medium text-slate-900">Get my free profile score</Link>
          <Link href="/roadmap" className="rounded-lg border border-slate-500 px-5 py-3 font-medium">See roadmap</Link>
        </div>
      </section>
    </div>
  );
}
