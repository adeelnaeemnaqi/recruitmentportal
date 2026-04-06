"use client";

import Link from "next/link";

async function track(source: string) {
  await fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "landing_cta_click", payload: { source } })
  });
}

export function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/signup"
        onClick={() => void track("hero_primary")}
        className="rounded-lg bg-brand-600 px-5 py-3 font-medium text-white"
      >
        Get my free profile score
      </Link>
      <Link
        href="/demo"
        onClick={() => void track("hero_secondary")}
        className="rounded-lg border border-slate-300 px-5 py-3 font-medium"
      >
        See how it works
      </Link>
    </div>
  );
}
