"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StartAssessmentPage() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    companyName: "",
    industry: "",
    size: "",
    cloudProvider: "",
    sensitiveData: "",
    paymentData: "",
    healthData: "",
    remoteWork: "",
    vendors: "",
  });

  function updateField(field: string, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function startAssessment() {
    localStorage.setItem("companyProfile", JSON.stringify(profile));
    router.push("/assessment/questions");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#020617_42%,#020617_100%)] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm backdrop-blur">
            AuditReady AI · Organization Profile
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Start Assessment
          </h1>

          <p className="mt-3 text-slate-200">
            Enter basic organization details to personalize the readiness report.
          </p>
        </div>

        <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-950">Company Profile</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div>
              <Label className="text-slate-800">Company Name</Label>
              <Input
                className="mt-2 border-slate-300 bg-white text-slate-950 placeholder:text-slate-400"
                value={profile.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="DemoCloud Health"
              />
            </div>

            <div>
              <Label className="text-slate-800">Industry</Label>
              <Input
                className="mt-2 border-slate-300 bg-white text-slate-950 placeholder:text-slate-400"
                value={profile.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                placeholder="Healthcare SaaS"
              />
            </div>

            <div>
              <Label className="text-slate-800">Company Size</Label>
              <Input
                className="mt-2 border-slate-300 bg-white text-slate-950 placeholder:text-slate-400"
                value={profile.size}
                onChange={(e) => updateField("size", e.target.value)}
                placeholder="25-50 employees"
              />
            </div>

            <div>
              <Label className="text-slate-800">Cloud Provider</Label>
              <Input
                className="mt-2 border-slate-300 bg-white text-slate-950 placeholder:text-slate-400"
                value={profile.cloudProvider}
                onChange={(e) => updateField("cloudProvider", e.target.value)}
                placeholder="AWS, Azure, Google Cloud, None"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["sensitiveData", "Handles sensitive data?"],
                ["paymentData", "Handles payment data?"],
                ["healthData", "Handles health data?"],
                ["remoteWork", "Supports remote work?"],
                ["vendors", "Uses third-party vendors?"],
              ].map(([field, label]) => (
                <div key={field}>
                  <Label className="text-slate-800">{label}</Label>
                  <Input
                    className="mt-2 border-slate-300 bg-white text-slate-950 placeholder:text-slate-400"
                    value={(profile as any)[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    placeholder="Yes / No / Not sure"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={startAssessment}
              className="mt-4 bg-slate-950 text-white hover:bg-slate-800"
            >
              Continue to Questionnaire
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}