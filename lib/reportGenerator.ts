export function generateRiskSummary(score: number, gaps: any[]) {
  const critical = gaps.filter((g) => g.severity === "Critical").length;
  const high = gaps.filter((g) => g.severity === "High").length;

  if (score >= 85) {
    return `The organization demonstrates strong compliance readiness with a score of ${score}%. Only a small number of control gaps were identified. The main priority should be maintaining evidence quality, reviewing controls regularly, and preparing documentation for future audits.`;
  }

  if (score >= 70) {
    return `The organization has a moderate compliance readiness score of ${score}%. The assessment identified ${critical} critical gaps and ${high} high-priority gaps. The organization should focus on strengthening documentation, access controls, monitoring, and evidence collection.`;
  }

  if (score >= 50) {
    return `The organization has a high-risk readiness score of ${score}%. Several important policies, technical controls, and evidence items are missing or incomplete. Immediate remediation should focus on identity protection, incident response, logging, vulnerability management, and backup recovery.`;
  }

  return `The organization has a critical readiness score of ${score}%. Significant compliance and cybersecurity control gaps were identified. The organization should prioritize foundational security governance, access control, asset inventory, monitoring, incident response, and backup recovery procedures.`;
}

export function generateRoadmap() {
  return {
    thirtyDays: [
      "Enable MFA for privileged and sensitive accounts.",
      "Create or update access control and cybersecurity governance policies.",
      "Build a basic asset inventory for systems, users, applications, and cloud services.",
      "Collect evidence for existing security controls.",
    ],
    sixtyDays: [
      "Implement recurring access reviews.",
      "Create an incident response plan.",
      "Start vulnerability scanning and remediation tracking.",
      "Document vendor and third-party risk review procedures.",
    ],
    ninetyDays: [
      "Perform an incident response tabletop exercise.",
      "Test backup and recovery procedures.",
      "Create a centralized evidence repository.",
      "Review framework alignment and prepare an audit-readiness package.",
    ],
  };
}