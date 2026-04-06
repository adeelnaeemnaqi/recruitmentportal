"use client";

import { useState } from "react";

const plans = [
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: "$15/mo",
    points: ["Full audits", "Job-match scoring", "Guided editing", "Exports"]
  },
  {
    id: "pro_annual",
    name: "Pro Annual",
    price: "$132/yr",
    points: ["Everything in Pro", "2 months free", "Priority feature updates"]
  }
] as const;

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function startCheckout(plan: "pro_monthly" | "pro_annual") {
    setLoading(plan);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });
      const data = (await res.json()) as { url?: string };
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-slate-600">Free gives a taste. Paid gives the actual fix.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-1 text-3xl font-bold">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {plan.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
            <button
              onClick={() => void startCheckout(plan.id)}
              disabled={loading === plan.id}
              className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-white"
            >
              {loading === plan.id ? "Redirecting..." : "Choose plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
