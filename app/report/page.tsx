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
import { exportReportToPDF } from "@/lib/pdfExport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ReportPage() {
  const [profile, setProfile] = useState<any>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  useEffect(() => {
    const savedProfile = localStorage.getItem("companyProfile");
    const savedAnswers = localStorage.getItem("assessmentAnswers");

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
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

  const evidenceChecklist = Array.from(
    new Set(gaps.flatMap((g) => g.evidence))
  );

  const criticalGaps = gaps.filter((g) => g.severity === "Critical").length;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold">AuditReady AI Report</h1>
            <p className="mt-2 text-slate-400">
              NIST CSF 2.0 compliance readiness assessment
            </p>
          </div>

          <Button onClick={() => exportReportToPDF("audit-report")}>
            Download PDF Report
          </Button>
        </div>

        <div id="audit-report" className="space-y-8 bg-slate-950 pb-10">
          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-slate-300 md:grid-cols-3">
              <p><strong>Company:</strong> {profile.companyName || "Sample Organization"}</p>
              <p><strong>Industry:</strong> {profile.industry || "Not provided"}</p>
              <p><strong>Size:</strong> {profile.size || "Not provided"}</p>
              <p><strong>Cloud:</strong> {profile.cloudProvider || "Not provided"}</p>
              <p><strong>Health Data:</strong> {profile.healthData || "Not provided"}</p>
              <p><strong>Payment Data:</strong> {profile.paymentData || "Not provided"}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle>Readiness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{score}%</p>
                <Progress value={score} className="mt-4" />
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle>Risk Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="text-base">{riskRating}</Badge>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle>Critical Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{criticalGaps}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle>Evidence Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{evidenceChecklist.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle>Function-Level Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {functionScores.map((item) => (
                <div key={item.function}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.function}</span>
                    <span>{item.score}%</span>
                  </div>
                  <Progress value={item.score} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle>Risk Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-slate-300">{riskSummary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle>Missing Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  {missingPolicies.length > 0 ? (
                    missingPolicies.map((policy) => <li key={String(policy)}>{String(policy)}</li>)
                  ) : (
                    <li>No missing policies identified.</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle>Missing Technical Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
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

          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle>Evidence Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid list-disc gap-2 pl-5 text-slate-300 md:grid-cols-2">
                {evidenceChecklist.map((item) => (
                  <li key={String(item)}>{String(item)}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle>30/60/90-Day Remediation Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold">First 30 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {roadmap.thirtyDays.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Next 60 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {roadmap.sixtyDays.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Next 90 Days</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {roadmap.ninetyDays.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle>Detailed Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {gaps.length > 0 ? (
                gaps.map((gap) => (
                  <div key={gap.id} className="rounded-lg border border-slate-800 p-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge>{gap.function}</Badge>
                      <Badge variant="outline" className="text-white">{gap.severity}</Badge>
                    </div>
                    <h3 className="font-semibold">{gap.question}</h3>
                    <p className="mt-2 text-sm text-slate-400">{gap.remediation}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-300">No major gaps identified.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}