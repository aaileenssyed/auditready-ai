"use client";

import { useEffect, useState } from "react";
import { nistQuestions } from "@/data/nistQuestions";
import {
  Answer,
  calculateFunctionScores,
  calculateScore,
  generateGaps,
  getRiskRating,
} from "@/lib/scoring";
import { generateRiskSummary, generateRoadmap } from "@/lib/reportGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const demoProfile = {
  companyName: "DemoCloud Health",
  industry: "Healthcare SaaS",
  size: "25-50 employees",
  cloudProvider: "AWS",
  sensitiveData: "Yes",
  paymentData: "No",
  healthData: "Yes",
  remoteWork: "Yes",
  vendors: "Yes",
};

const demoAnswers: Record<string, Answer> = {
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

export default function ReportClient() {
  const [profile, setProfile] = useState<any>(demoProfile);
  const [answers, setAnswers] = useState<Record<string, Answer>>(demoAnswers);

  useEffect(() => {
    const savedProfile = localStorage.getItem("companyProfile");
    const savedAnswers = localStorage.getItem("assessmentAnswers");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const score = calculateScore(nistQuestions, answers);
  const riskRating = getRiskRating(score);
  const gaps = generateGaps(nistQuestions, answers);
  const functionScores = calculateFunctionScores(nistQuestions, answers);
  const riskSummary = generateRiskSummary(score, gaps);
  const roadmap = generateRoadmap();

  const missingPolicies = Array.from(
    new Set(gaps.map((g) => g.missingPolicy).filter(Boolean))
  );

  const missingTechnicalControls = Array.from(
    new Set(gaps.map((g) => g.missingTechnicalControl).filter(Boolean))
  );

  const evidenceChecklist = Array.from(new Set(gaps.flatMap((g) => g.evidence)));

  const criticalGaps = gaps.filter((g) => g.severity === "Critical").length;
  const highGaps = gaps.filter((g) => g.severity === "High").length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#020617_42%,#020617_100%)] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm backdrop-blur">
              AuditReady AI · Readiness Report
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Compliance Readiness Report
            </h1>

            <p className="mt-2 text-slate-200">
              NIST CSF 2.0 assessment with gaps, evidence needs, and remediation roadmap.
            </p>
          </div>

          <Button
            onClick={() =>
              import("@/lib/pdfExport").then((m) => {
                const fn = (m as any).exportReportToPDF ?? (m as any).default;
                if (typeof fn === "function") fn("audit-report");
              })
            }
            className="bg-white text-slate-950 hover:bg-slate-100"
          >
            Download PDF Report
          </Button>
        </div>

        <div id="audit-report" className="space-y-8 rounded-3xl bg-slate-100 p-4 text-slate-950 md:p-8">
          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Executive Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-slate-700 md:grid-cols-3">
              <p>
                <strong>Company:</strong> {profile.companyName || "Sample Organization"}
              </p>
              <p>
                <strong>Industry:</strong> {profile.industry || "Not provided"}
              </p>
              <p>
                <strong>Size:</strong> {profile.size || "Not provided"}
              </p>
              <p>
                <strong>Cloud Provider:</strong> {profile.cloudProvider || "Not provided"}
              </p>
              <p>
                <strong>Health Data:</strong> {profile.healthData || "Not provided"}
              </p>
              <p>
                <strong>Payment Data:</strong> {profile.paymentData || "Not provided"}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
              <CardHeader>
                <CardTitle className="text-base text-slate-600">Readiness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{score}%</p>
                <Progress value={score} className="mt-4 h-3" />
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
              <CardHeader>
                <CardTitle className="text-base text-slate-600">Risk Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-slate-950 px-3 py-1 text-base text-white hover:bg-slate-950">
                  {riskRating}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
              <CardHeader>
                <CardTitle className="text-base text-slate-600">Critical Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{criticalGaps}</p>
                <p className="mt-2 text-sm text-slate-500">{highGaps} high-priority gaps</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
              <CardHeader>
                <CardTitle className="text-base text-slate-600">Evidence Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{evidenceChecklist.length}</p>
                <p className="mt-2 text-sm text-slate-500">items needed for readiness</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Function-Level Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {functionScores.map((item) => (
                <div key={item.function}>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>{item.function}</span>
                    <span>{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Risk Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-slate-700">{riskSummary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Missing Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {missingPolicies.length > 0 ? (
                    missingPolicies.map((policy) => (
                      <li key={String(policy)}>{String(policy)}</li>
                    ))
                  ) : (
                    <li>No missing policies identified.</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Missing Technical Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {missingTechnicalControls.length > 0 ? (
                    missingTechnicalControls.map((control) => (
                      <li key={String(control)}>{String(control)}</li>
                    ))
                  ) : (
                    <li>No missing technical controls identified.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Evidence Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid list-disc gap-2 pl-5 text-slate-700 md:grid-cols-2">
                {evidenceChecklist.length > 0 ? (
                  evidenceChecklist.map((item) => (
                    <li key={String(item)}>{String(item)}</li>
                  ))
                ) : (
                  <li>No missing evidence items identified.</li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">30/60/90-Day Remediation Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-3 font-semibold">First 30 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {roadmap.thirtyDays.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-3 font-semibold">Next 60 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {roadmap.sixtyDays.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-3 font-semibold">Next 90 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {roadmap.ninetyDays.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Detailed Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {gaps.length > 0 ? (
                gaps.map((gap) => (
                  <div
                    key={gap.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge className="bg-slate-950 text-white hover:bg-slate-950">
                        {gap.function}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {gap.severity}
                      </Badge>
                      <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-200">
                        {gap.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-slate-950">{gap.question}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {gap.remediation}
                    </p>

                    {gap.missingPolicy && (
                      <p className="mt-3 text-sm text-slate-700">
                        <strong>Missing policy:</strong> {gap.missingPolicy}
                      </p>
                    )}

                    {gap.missingTechnicalControl && (
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Missing technical control:</strong>{" "}
                        {gap.missingTechnicalControl}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-700">No major gaps identified.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white text-slate-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">
                AuditReady AI is a readiness and educational tool. It does not provide
                legal advice, formal certification, or guaranteed compliance. Organizations
                should consult qualified security, legal, and compliance professionals before
                relying on any assessment for audit or certification purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}