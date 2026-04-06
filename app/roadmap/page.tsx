const done = [
  "Landing + onboarding + dashboard + results flows",
  "Auth (signup/login) and account page",
  "Audit creation, scoring, keyword extraction fallback",
  "Guided refine controls and export (txt/json)",
  "Usage limits, plan gating, mock billing checkout",
  "Paddle webhook signature verification scaffold",
  "Analytics event scaffolding",
  "CI + screenshots workflow + baseline tests"
];

const pending = [
  "Paddle hosted checkout URL creation in provider",
  "PDF export endpoint",
  "Richer results insights and rewrite quality",
  "Integration tests for core user journeys",
  "Production analytics provider integration",
  "Final UX polish + accessibility pass"
];

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Build status & roadmap</h1>
        <p className="text-slate-600">What is completed vs what is still pending.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">✅ Done so far</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {done.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">🧭 Pending next</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {pending.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
