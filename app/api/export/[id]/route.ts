import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

function toTextPayload(report: {
  targetJobTitle: string;
  targetIndustry: string;
  totalScore: number;
  jobMatchScore: number | null;
  rewriteOutputsJson: unknown;
  scoreExplanationsJson: unknown;
}) {
  return [
    `ProfileRank AI Export`,
    `Target role: ${report.targetJobTitle}`,
    `Target industry: ${report.targetIndustry}`,
    `Profile score: ${report.totalScore}/100`,
    `Job match: ${report.jobMatchScore ?? "N/A"}`,
    "",
    "Rewrite outputs:",
    JSON.stringify(report.rewriteOutputsJson, null, 2),
    "",
    "Explanations:",
    JSON.stringify(report.scoreExplanationsJson, null, 2)
  ].join("\n");
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const report = await prisma.auditReport.findFirst({
    where: { id: params.id, userId: user.id },
    select: {
      id: true,
      targetJobTitle: true,
      targetIndustry: true,
      totalScore: true,
      jobMatchScore: true,
      rewriteOutputsJson: true,
      scoreExplanationsJson: true
    }
  });

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const format = new URL(req.url).searchParams.get("format") ?? "text";

  await prisma.exportRecord.create({
    data: {
      auditReportId: report.id,
      format
    }
  });

  if (format === "json") {
    return NextResponse.json(report, {
      headers: {
        "Content-Disposition": `attachment; filename="profilerank-${report.id}.json"`
      }
    });
  }

  if (format === "pdf") {
    return NextResponse.json(
      { error: "PDF export is not enabled yet. Use text/json export for now." },
      { status: 501 }
    );
  }

  const text = toTextPayload(report);
  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="profilerank-${report.id}.txt"`
    }
  });
}
