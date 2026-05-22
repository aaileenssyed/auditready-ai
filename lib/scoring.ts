import { NistQuestion } from "@/data/nistQuestions";

export type Answer = "Yes" | "Partially" | "No" | "Not Applicable";

export function calculateScore(
  questions: NistQuestion[],
  answers: Record<string, Answer>
) {
  let earned = 0;
  let possible = 0;

  questions.forEach((q) => {
    const answer = answers[q.id];

    if (!answer || answer === "Not Applicable") return;

    possible += q.weight;

    if (answer === "Yes") earned += q.weight;
    if (answer === "Partially") earned += q.weight * 0.5;
  });

  return possible === 0 ? 0 : Math.round((earned / possible) * 100);
}

export function getRiskRating(score: number) {
  if (score >= 85) return "Low Risk";
  if (score >= 70) return "Moderate Risk";
  if (score >= 50) return "High Risk";
  return "Critical Risk";
}

export function generateGaps(
  questions: NistQuestion[],
  answers: Record<string, Answer>
) {
  return questions
    .filter((q) => answers[q.id] === "No" || answers[q.id] === "Partially")
    .map((q) => ({
      id: q.id,
      function: q.function,
      category: q.category,
      question: q.question,
      severity: q.severity,
      missingPolicy: q.missingPolicy,
      missingTechnicalControl: q.missingTechnicalControl,
      evidence: q.evidence,
      remediation: q.remediation,
    }));
}

export function calculateFunctionScores(
  questions: NistQuestion[],
  answers: Record<string, Answer>
) {
  const functions = ["Govern", "Identify", "Protect", "Detect", "Respond", "Recover"];

  return functions.map((fn) => {
    const filtered = questions.filter((q) => q.function === fn);
    const score = calculateScore(filtered, answers);

    return {
      function: fn,
      score,
    };
  });
}