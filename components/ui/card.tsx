export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 font-semibold text-slate-900">{title}</h3>
      <div className="text-sm text-slate-700">{children}</div>
    </section>
  );
}
