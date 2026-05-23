"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { nistQuestions } from "@/data/nistQuestions";
import {
  Answer,
  calculateFunctionScores,
  calculateScore,
  generateGaps,
  getRiskRating,
} from "@/lib/scoring";
import { generateRiskSummary, generateRoadmap } from "@/lib/reportGenerator";
import { exportReadinessReportToPDF } from "@/lib/pdfExport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const sampleProfile = {
  companyName: "DemoCloud Health",
  industry: "Healthcare SaaS",
  size: "25–50 employees",
  cloudProvider: "AWS",
  sensitiveData: "Yes",
  paymentData: "No",
  healthData: "Yes",
  remoteWork: "Yes",
  vendors: "Yes",
};

const sampleAnswers: Record<string, Answer> = {
  "GV-001": "Partially",
  "GV-002": "Yes",
  "GV-003": "No",
  "ID-001": "Partially",
  "ID-002": "No",
  "ID-003": "Partially",
  "PR-001": "Yes",
  "PR-002": "Partially",
  "PR-003": "Yes",
  "PR-004": "Partially",
  "PR-005": "No",
  "DE-001": "No",
  "DE-002": "Partially",
  "RS-001": "No",
  "RS-002": "No",
  "RC-001": "Partially",
  "RC-002": "No",
};

export default function ReportPage() {
  const searchParams = useSearchParams();
  const isSampleMode = searchParams.get("sample") === "true";

  const [frameworkName, setFrameworkName] = useState("NIST CSF 2.0");
  const [frameworkId, setFrameworkId] = useState("nist-csf-2");
  const [profile, setProfile] = useState<any>(sampleProfile);
  const [answers, setAnswers] = useState<Record<string, Answer>>(sampleAnswers);

  useEffect(() => {
    if (isSampleMode) {
      setFrameworkName("NIST CSF 2.0");
      setFrameworkId("nist-csf-2");
      setProfile(sampleProfile);
      setAnswers(sampleAnswers);
      return;
    }

    const savedFramework = localStorage.getItem("selectedFramework");
    const savedProfile = localStorage.getItem("companyProfile");
    const savedAnswers = localStorage.getItem("assessmentAnswers");

    if (savedFramework) {
      const parsed = JSON.parse(savedFramework);
      setFrameworkName(parsed.name || "NIST CSF 2.0");
      setFrameworkId(parsed.id || "nist-csf-2");
    }

    if (savedProfile && savedAnswers) {
      setProfile(JSON.parse(savedProfile));
      setAnswers(JSON.parse(savedAnswers));
    } else {
      setProfile(sampleProfile);
      setAnswers(sampleAnswers);
    }
  }, [isSampleMode]);

  const activeQuestions = nistQuestions;

  const score = calculateScore(activeQuestions, answers);
  const riskRating = getRiskRating(score);
  const gaps = generateGaps(activeQuestions, answers);
  const functionScores = calculateFunctionScores(activeQuestions, answers);
  const riskSummary = generateRiskSummary(score, gaps);
  const roadmap = generateRoadmap();

  const missingPolicies = Array.from(
    new Set(gaps.map((g) => g.missingPolicy).filter(Boolean))
  ) as string[];

  const missingTechnicalControls = Array.from(
    new Set(gaps.map((g) => g.missingTechnicalControl).filter(Boolean))
  ) as string[];

  const evidenceChecklist = Array.from(
    new Set(gaps.flatMap((g) => g.evidence))
  ) as string[];

  const criticalGaps = gaps.filter((g) => g.severity === "Critical").length;

  function handlePDFDownload() {
    exportReadinessReportToPDF({
  companyName: profile.companyName || "Sample Organization",
  industry: profile.industry || "Not provided",
  frameworkName,
  score,
  riskRating,
  riskSummary,
  missingPolicies,
  missingTechnicalControls,
  evidenceChecklist,
  roadmap,
});
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#020617_42%,#020617_100%)] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm backdrop-blur">
              {isSampleMode ? "Sample Report" : "Generated Report"} ·{" "}
              {frameworkName}
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              AuditReady AI Report
            </h1>

            <p className="mt-2 text-slate-200">
              Compliance readiness assessment with gap analysis and remediation roadmap.
            </p>

            {frameworkId !== "nist-csf-2" && (
              <p className="mt-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
                This report is currently using the NIST CSF 2.0 question bank. Dedicated question banks for other frameworks are planned for future versions.
              </p>
            )}
          </div>

          <Button
            onClick={handlePDFDownload}
            className="bg-white text-slate-950 hover:bg-slate-100"
          >
            Download PDF Report
          </Button>
        </div>

        <div className="space-y-8">
          <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-3">
              <p>
                <strong>Company:</strong> {profile.companyName}
              </p>
              <p>
                <strong>Industry:</strong> {profile.industry}
              </p>
              <p>
                <strong>Size:</strong> {profile.size}
              </p>
              <p>
                <strong>Cloud:</strong> {profile.cloudProvider}
              </p>
              <p>
                <strong>Health Data:</strong> {profile.healthData}
              </p>
              <p>
                <strong>Payment Data:</strong> {profile.paymentData}
              </p>
              <p>
                <strong>Framework:</strong> {frameworkName}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Readiness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{score}%</p>
                <Progress value={score} className="mt-4" />
              </CardContent>
            </Card>

            <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Risk Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-slate-950 text-base text-white">
                  {riskRating}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Critical Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{criticalGaps}</p>
              </CardContent>
            </Card>

            <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Evidence Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">
                  {evidenceChecklist.length}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>Function-Level Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {functionScores.map((item) => (
                <div key={item.function}>
                  <div className="mb-1 flex justify-between text-sm font-medium text-slate-700">
                    <span>{item.function}</span>
                    <span>{item.score}%</span>
                  </div>
                  <Progress value={item.score} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>Executive Risk Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-slate-700">{riskSummary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Missing Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {missingPolicies.map((policy) => (
                    <li key={policy}>{policy}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Missing Technical Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {missingTechnicalControls.map((control) => (
                    <li key={control}>{control}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>Evidence Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid list-disc gap-2 pl-5 text-slate-700 md:grid-cols-2">
                {evidenceChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>30/60/90-Day Remediation Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold">First 30 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {roadmap.thirtyDays.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Next 60 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {roadmap.sixtyDays.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Next 90 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {roadmap.ninetyDays.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>Detailed Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {gaps.map((gap) => (
                <div
                  key={gap.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge className="bg-slate-950 text-white">
                      {gap.function}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      {gap.severity}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-950">
                    {gap.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {gap.remediation}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}