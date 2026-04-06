import { Card } from "@/components/ui/card";

export default function DemoPage() {
  const sample = {
    total: 74,
    jobMatch: 68,
    category: {
      headline: 15,
      about: 14,
      experience: 16,
      skills: 14,
      positioning: 15
    },
    headlines: [
      "Product Analyst | Turning customer data into growth decisions",
      "SaaS Product Analyst | Insights, experimentation, and impact",
      "Product Analyst helping teams prioritize what moves KPIs"
    ]
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Demo report preview</h1>
        <p className="text-slate-600">This is a sample output so you can evaluate the UI instantly.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Score summary">
          <p className="text-3xl font-bold">{sample.total}/100</p>
          <p className="text-slate-600">Job Match: {sample.jobMatch}/100</p>
        </Card>

        <Card title="Category scores">
          <ul className="space-y-1">
            <li>Headline: {sample.category.headline}/20</li>
            <li>About: {sample.category.about}/20</li>
            <li>Experience: {sample.category.experience}/20</li>
            <li>Skills & Keywords: {sample.category.skills}/20</li>
            <li>Positioning: {sample.category.positioning}/20</li>
          </ul>
        </Card>
      </div>

      <Card title="Suggested headlines">
        <ul className="space-y-2">
          {sample.headlines.map((h) => (
            <li key={h} className="rounded-md border p-2">{h}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
