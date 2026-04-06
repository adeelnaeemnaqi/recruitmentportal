"use client";

import { useState } from "react";

const styles = [
  { value: "stronger", label: "Make it stronger" },
  { value: "simplify", label: "Simplify it" },
  { value: "technical", label: "Make it more technical" },
  { value: "strategic", label: "Make it more strategic" },
  { value: "results", label: "Make it more results-driven" },
  { value: "warmer", label: "Make it warmer" },
  { value: "shorter", label: "Make it shorter" },
  { value: "niche", label: "Make it more niche-specific" }
];

type Props = {
  auditId: string;
  initialText: string;
};

export function RefinePanel({ auditId, initialText }: Props) {
  const [text, setText] = useState(initialText);
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);

  async function refine(style: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, sourceText: text, style, instruction })
      });

      if (!res.ok) {
        return;
      }

      const data = (await res.json()) as { refined: string };
      setText(data.refined);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">Tell us what to change</p>
      <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} className="min-h-20 w-full rounded-lg border p-2" placeholder="e.g. emphasize B2B SaaS and remove filler" />
      <div className="flex flex-wrap gap-2">
        {styles.map((s) => (
          <button key={s.value} type="button" onClick={() => void refine(s.value)} className="rounded-full border px-3 py-1 text-sm hover:bg-slate-100" disabled={loading}>
            {s.label}
          </button>
        ))}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-44 w-full rounded-lg border p-3 text-sm" />
    </div>
  );
}
