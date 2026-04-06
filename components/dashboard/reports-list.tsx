"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Report = {
  id: string;
  targetJobTitle: string;
  totalScore: number;
};

export function ReportsList({ reports }: { reports: Report[] }) {
  const router = useRouter();

  async function deleteReport(id: string) {
    const ok = window.confirm("Delete this report? This cannot be undone.");
    if (!ok) return;

    const res = await fetch(`/api/audits/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <ul className="space-y-2 text-sm">
      {reports.map((r) => (
        <li key={r.id} className="flex items-center justify-between rounded-md border p-2">
          <span>{r.targetJobTitle} · Score {r.totalScore}</span>
          <div className="flex items-center gap-3">
            <Link className="underline" href={`/results/${r.id}`}>View</Link>
            <button className="text-red-600 underline" onClick={() => void deleteReport(r.id)}>Delete</button>
          </div>
        </li>
      ))}
      {reports.length === 0 ? <li className="text-slate-500">No reports yet. Run your first audit.</li> : null}
    </ul>
  );
}
