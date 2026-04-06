import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { refineText, type RefineStyle } from "@/lib/audit/refine";
import { trackServerEvent } from "@/lib/analytics/track";

const refineSchema = z.object({
  auditId: z.string().min(10),
  sourceText: z.string().min(3),
  style: z.enum(["stronger", "simplify", "technical", "strategic", "results", "warmer", "shorter", "niche"]),
  instruction: z.string().optional()
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = refineSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const report = await prisma.auditReport.findFirst({
    where: { id: parsed.data.auditId, userId: user.id },
    select: { id: true }
  });

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const refined = refineText(parsed.data.sourceText, parsed.data.style as RefineStyle, parsed.data.instruction);

  const now = new Date();
  const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const periodId = `${user.id}:${periodStart.toISOString()}`;

  await prisma.usageRecord.upsert({
    where: { id: periodId },
    update: { refinesUsed: { increment: 1 } },
    create: {
      id: periodId,
      userId: user.id,
      periodStart,
      periodEnd: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)),
      refinesUsed: 1
    }
  });

  trackServerEvent("refine_used", { userId: user.id, auditId: parsed.data.auditId, style: parsed.data.style });

  return NextResponse.json({ refined });
}
