import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap | ProfileRank AI",
  description: "Current build status and upcoming roadmap items for ProfileRank AI."
};

const doneItems = [
  "Landing, onboarding, dashboard, and results flows",
  "Auth (signup/login) and account page",
  "Audit creation, scoring, and keyword extraction fallback",
  "Guided refine controls and export (txt/json)",
  "Usage limits and plan gating",
  "Paddle webhook signature verification scaffold",
  "Analytics event scaffolding",
  "CI workflow and baseline tests"
];

const nextItems = [
  "Paddle hosted checkout URL creation in provider",
  "PDF export endpoint",
  "Richer results insights and rewrite quality",
  "Integration tests for core user journeys",
  "Production analytics provider integration",
  "Final UX polish and accessibility pass"
];

export default function RoadmapPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Build status and roadmap</h1>
        <p className="text-slate-600">What is completed and what is pending next.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">Done</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            {doneItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">Pending next</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            {nextItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
