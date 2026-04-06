"use client";

import { useMemo, useState } from "react";
import { RefinePanel } from "@/components/results/refine-panel";

type Props = {
  auditId: string;
  explanations: Record<string, string>;
  rewrite: Record<string, unknown>;
  keywordCoverage?: number;
  headlineSeed: string;
};

const tabs = ["Audit", "Job Match", "Rewritten Profile", "Explanations", "Refine", "Export"] as const;

export function ResultsTabs({ auditId, explanations, rewrite, keywordCoverage, headlineSeed }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Audit");

  const headlines = useMemo(() => {
    const raw = rewrite.headlines;
    return Array.isArray(raw) ? raw.map((h) => String(h)) : [];
  }, [rewrite]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-full px-3 py-1.5 text-sm ${active === tab ? "bg-brand-600 text-white" : "border bg-white"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === "Audit" ? (
        <div className="space-y-2 text-sm text-slate-700">
          <p>Here’s what recruiters are likely seeing right now.</p>
          <p>Keyword coverage: <strong>{Math.round(keywordCoverage ?? 0)}%</strong></p>
        </div>
      ) : null}

      {active === "Job Match" ? (
        <p className="text-sm text-slate-700">Paste a target JD in onboarding to maximize job-match insights and missing-term analysis.</p>
      ) : null}

      {active === "Rewritten Profile" ? (
        <div className="space-y-2">
          {headlines.length ? headlines.map((h) => <p key={h} className="rounded-md border p-2 text-sm">{h}</p>) : <p className="text-sm text-slate-600">No rewrite options available.</p>}
        </div>
      ) : null}

      {active === "Explanations" ? (
        <ul className="space-y-2 text-sm">
          {Object.entries(explanations).map(([k, v]) => (
            <li key={k}><strong className="capitalize">{k}:</strong> {v}</li>
          ))}
        </ul>
      ) : null}

      {active === "Refine" ? <RefinePanel auditId={auditId} initialText={headlineSeed} /> : null}

      {active === "Export" ? (
        <div className="space-y-2 text-sm text-slate-700">
          <p>Export options are coming next: copy full package, plain text, and PDF.</p>
          <button className="rounded-lg border px-3 py-2">Copy rewrite JSON</button>
        </div>
      ) : null}
    </div>
  );
}
