import type { KeywordOutput, OnboardingInput, ScoreBreakdown } from "@/types/audit";

function includesAny(text: string, needles: string[]) {
  const lower = text.toLowerCase();
  return needles.filter((n) => lower.includes(n.toLowerCase())).length;
}

function clamp(value: number, min = 0, max = 20) {
  return Math.max(min, Math.min(max, value));
}

export function deterministicScore(input: OnboardingInput, keywords: KeywordOutput): ScoreBreakdown {
  const headline = input.currentProfileText.split("\n")[0] ?? "";
  const about = input.currentProfileText;
  const experience = input.resumeText ?? input.currentProfileText;

  const headlineHits = includesAny(headline, [input.targetJobTitle, ...keywords.primaryKeywords.slice(0, 4)]);
  const aboutHits = includesAny(about, [...keywords.primaryKeywords, ...keywords.secondaryKeywords]);
  const experienceHits = includesAny(experience, [...keywords.primaryKeywords, ...keywords.skillsTools]);

  const coverageRatio = includesAny(input.currentProfileText, keywords.primaryKeywords) / Math.max(1, keywords.primaryKeywords.length);

  const headlineScore = clamp(6 + headlineHits * 3);
  const aboutScore = clamp(5 + Math.round(aboutHits * 1.6));
  const experienceScore = clamp(5 + Math.round(experienceHits * 1.4));
  const skillsCoverage = clamp(Math.round(coverageRatio * 20));
  const positioningConsistency = clamp(
    8 + (input.targetIndustry ? 3 : 0) + (input.targetLocation ? 2 : 0) + (input.profileType ? 3 : 0)
  );

  const total = headlineScore + aboutScore + experienceScore + skillsCoverage + positioningConsistency;

  const jobMatch = input.jobDescriptionText
    ? clamp(Math.round((includesAny(input.currentProfileText, keywords.primaryKeywords.concat(keywords.secondaryKeywords)) /
        Math.max(1, keywords.primaryKeywords.length + keywords.secondaryKeywords.length)) * 20), 0, 20) * 5
    : undefined;

  return {
    headline: headlineScore,
    about: aboutScore,
    experience: experienceScore,
    skillsCoverage,
    positioningConsistency,
    total,
    jobMatch
  };
}
