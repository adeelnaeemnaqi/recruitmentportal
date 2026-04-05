import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth/session";

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    redirect("/login");
  }

  const report = await prisma.auditReport.findFirst({
    where: { id: params.id, userId: user.id },
    include: { keywordAnalysis: true }
  });

  if (!report) return notFound();

  const explanations = report.scoreExplanationsJson as Record<string, string>;
  const rewrite = report.rewriteOutputsJson as Record<string, unknown>;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <Card title="Score summary">
          <p className="text-3xl font-bold">{report.totalScore}/100</p>
          <p className="mt-1 text-slate-600">Job Match: {report.jobMatchScore ?? "N/A"}</p>
        </Card>
        <Card title="Category scores">
          <ul className="space-y-2">
            <li>Headline: {report.headlineScore}/20</li>
            <li>About: {report.aboutScore}/20</li>
            <li>Experience: {report.experienceScore}/20</li>
            <li>Skills & Keywords: {report.skillsCoverageScore}/20</li>
            <li>Positioning: {report.positioningScore}/20</li>
          </ul>
        </Card>
      </div>

      <div className="space-y-4">
        <Card title="Audit explanations">
          <ul className="space-y-2">
            {Object.entries(explanations).map(([k, v]) => (
              <li key={k}><strong className="capitalize">{k}:</strong> {v}</li>
            ))}
          </ul>
        </Card>

        <Card title="Rewrite preview">
          <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(rewrite, null, 2)}</pre>
        </Card>
      </div>
    </div>
  );
}
