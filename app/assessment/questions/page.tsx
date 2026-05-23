"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { nistQuestions } from "@/data/nistQuestions";
import { Answer } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const answerOptions: Answer[] = ["Yes", "Partially", "No", "Not Applicable"];

export default function QuestionsPage() {
  const router = useRouter();

  const [frameworkName, setFrameworkName] = useState("NIST CSF 2.0");
  const [frameworkId, setFrameworkId] = useState("nist-csf-2");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  useEffect(() => {
    const savedFramework = localStorage.getItem("selectedFramework");

    if (savedFramework) {
      const parsed = JSON.parse(savedFramework);
      setFrameworkName(parsed.name || "NIST CSF 2.0");
      setFrameworkId(parsed.id || "nist-csf-2");
    }
  }, []);

  const activeQuestions = nistQuestions;

  const question = activeQuestions[currentIndex];

  const progress = Math.round(
    ((currentIndex + 1) / activeQuestions.length) * 100
  );

  function selectAnswer(answer: Answer) {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));
  }

  function nextQuestion() {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("assessmentAnswers", JSON.stringify(answers));
      router.push("/report");
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  const selectedAnswer = answers[question.id];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#020617_42%,#020617_100%)] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm backdrop-blur">
            AuditReady AI · {frameworkName}
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {frameworkName} Assessment
          </h1>

          <p className="mt-3 text-slate-200">
            Answer each question based on the organization’s current security and compliance posture.
          </p>

          {frameworkId !== "nist-csf-2" && (
            <p className="mt-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
              This framework is not active yet. The MVP currently supports NIST CSF 2.0 only.
            </p>
          )}
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur">
          <div className="mb-2 flex justify-between text-sm text-slate-100">
            <span>
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span>{progress}% complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-slate-800" />
        </div>

        <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
          <CardHeader className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-slate-950 text-white hover:bg-slate-950">
                {question.function}
              </Badge>

              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {question.severity}
              </Badge>

              <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
                {question.controlType}
              </Badge>
            </div>

            <div>
              <CardTitle className="text-2xl leading-tight text-slate-950 md:text-3xl">
                {question.question}
              </CardTitle>
              <p className="mt-3 text-sm font-medium text-slate-500">
                {question.category}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {answerOptions.map((option) => {
                const active = selectedAnswer === option;

                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(option)}
                    className={`rounded-2xl border px-5 py-5 text-left text-base font-semibold transition-all ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                        : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {option}

                    <p
                      className={`mt-1 text-sm font-normal ${
                        active ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {option === "Yes" &&
                        "Control is implemented and documented."}
                      {option === "Partially" &&
                        "Control exists but is incomplete."}
                      {option === "No" &&
                        "Control is missing or not implemented."}
                      {option === "Not Applicable" &&
                        "Control does not apply to this organization."}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                className="border-slate-300 bg-white text-slate-950 hover:bg-slate-100"
                disabled={currentIndex === 0}
                onClick={previousQuestion}
              >
                Previous
              </Button>

              <Button
                disabled={!selectedAnswer}
                onClick={nextQuestion}
                className="bg-slate-950 text-white hover:bg-slate-800"
              >
                {currentIndex === activeQuestions.length - 1
                  ? "Generate Report"
                  : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}