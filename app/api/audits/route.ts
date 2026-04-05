import { NextResponse } from "next/server";
import { z } from "zod";
import { ExperienceLevel, ProfileType } from "@prisma/client";
import { runAudit } from "@/lib/audit/engine";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/session";

const auditInputSchema = z.object({
  currentProfileText: z.string().min(80),
  resumeText: z.string().optional().or(z.literal("")),
  targetJobTitle: z.string().min(2),
  targetIndustry: z.string().min(2),
  experienceLevel: z.nativeEnum(ExperienceLevel),
  profileType: z.nativeEnum(ProfileType),
  targetLocation: z.string().optional().or(z.literal("")),
  jobDescriptionText: z.string().optional().or(z.literal(""))
});

export async function POST(req: Request) {
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

  const formData = await req.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = auditInputSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const input = {
    ...parsed.data,
    resumeText: parsed.data.resumeText || undefined,
    targetLocation: parsed.data.targetLocation || undefined,
    jobDescriptionText: parsed.data.jobDescriptionText || undefined
  };

  const report = await runAudit(input);

  const saved = await prisma.auditReport.create({
    data: {
      userId: user.id,
      currentProfileText: input.currentProfileText,
      resumeText: input.resumeText,
      targetJobTitle: input.targetJobTitle,
      targetIndustry: input.targetIndustry,
      experienceLevel: input.experienceLevel,
      profileType: input.profileType,
      targetLocation: input.targetLocation,
      jobDescriptionText: input.jobDescriptionText,
      totalScore: report.scores.total,
      headlineScore: report.scores.headline,
      aboutScore: report.scores.about,
      experienceScore: report.scores.experience,
      skillsCoverageScore: report.scores.skillsCoverage,
      positioningScore: report.scores.positioningConsistency,
      jobMatchScore: report.scores.jobMatch,
      scoreExplanationsJson: report.explanations,
      positioningDataJson: report.positioning,
      rewriteOutputsJson: report.rewrite,
      explanationOutputsJson: report.explanations,
      keywordAnalysis: {
        create: {
          primaryKeywordsJson: report.keywords.primaryKeywords,
          secondaryKeywordsJson: report.keywords.secondaryKeywords,
          titleVariantsJson: report.keywords.titleVariants,
          skillsToolsJson: report.keywords.skillsTools,
          domainPhrasesJson: report.keywords.domainPhrases,
          weakPhrasesJson: report.keywords.weakPhrasesToAvoid,
          matchedKeywordsJson: report.keywords.primaryKeywords.slice(0, 3),
          missingKeywordsJson: report.keywords.primaryKeywords.slice(3),
          coveragePct: (report.scores.skillsCoverage / 20) * 100
        }
      }
    }
  });

  return NextResponse.redirect(new URL(`/results/${saved.id}`, req.url));
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ audits: [] });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    return NextResponse.json({ audits: [] });
  }

  const audits = await prisma.auditReport.findMany({
    where: { userId: user.id },
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      targetJobTitle: true,
      totalScore: true,
      jobMatchScore: true,
      createdAt: true
    }
  });

  return NextResponse.json({ audits });
}
