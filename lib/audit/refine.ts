const replacements: Record<string, Array<[RegExp, string]>> = {
  stronger: [[/help/gi, "drive"], [/worked on/gi, "led"]],
  simplify: [[/utilize/gi, "use"], [/facilitate/gi, "help"]],
  technical: [[/business impact/gi, "technical outcomes"], [/strategy/gi, "architecture and implementation"]],
  strategic: [[/execution/gi, "strategy and execution"], [/tasks/gi, "initiatives"]],
  results: [[/improved/gi, "improved measurably"], [/supported/gi, "delivered outcomes for"]],
  warmer: [[/led/gi, "collaborated to lead"], [/delivered/gi, "helped deliver"]],
  shorter: [],
  niche: [[/industry/gi, "target niche"], [/teams/gi, "cross-functional product teams"]]
};

export type RefineStyle = keyof typeof replacements;

export function refineText(source: string, style: RefineStyle, customInstruction?: string): string {
  let next = source;
  for (const [pattern, value] of replacements[style] ?? []) {
    next = next.replace(pattern, value);
  }

  if (style === "shorter") {
    next = next
      .split(" ")
      .filter((_, index) => index % 7 !== 0)
      .join(" ");
  }

  if (customInstruction?.trim()) {
    next = `${next}\n\nRefinement note: ${customInstruction.trim()}`;
  }

  return next;
}
