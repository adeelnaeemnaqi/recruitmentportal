import { ExperienceLevel, ProfileType } from "@prisma/client";

export type OnboardingInput = {
  currentProfileText: string;
  resumeText?: string;
  targetJobTitle: string;
  targetIndustry: string;
  experienceLevel: ExperienceLevel;
  profileType: ProfileType;
  targetLocation?: string;
  jobDescriptionText?: string;
};

export type KeywordOutput = {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  titleVariants: string[];
  skillsTools: string[];
  domainPhrases: string[];
  weakPhrasesToAvoid: string[];
};

export type ScoreBreakdown = {
  headline: number;
  about: number;
  experience: number;
  skillsCoverage: number;
  positioningConsistency: number;
  total: number;
  jobMatch?: number;
};
