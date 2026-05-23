"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const frameworks = [
  {
    id: "nist-csf-2",
    name: "NIST CSF 2.0",
    status: "Available",
    description:
      "Assess readiness across Govern, Identify, Protect, Detect, Respond, and Recover.",
  },
  {
    id: "cis-controls",
    name: "CIS Controls",
    status: "Coming Soon",
    description:
      "Evaluate readiness against prioritized cybersecurity safeguards.",
  },
  {
    id: "soc-2",
    name: "SOC 2",
    status: "Coming Soon",
    description:
      "Prepare for trust services criteria related to security, availability, and confidentiality.",
  },
  {
    id: "iso-27001",
    name: "ISO 27001",
    status: "Coming Soon",
    description:
      "Review information security management and governance maturity.",
  },
  {
    id: "hipaa",
    name: "HIPAA",
    status: "Coming Soon",
    description:
      "Assess safeguards for protecting electronic protected health information.",
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    status: "Coming Soon",
    description:
      "Evaluate payment card data security readiness and technical control gaps.",
  },
];

export default function StartAssessmentPage() {
  const router = useRouter();

  const [selectedFramework, setSelectedFramework] = useState("nist-csf-2");

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
    const framework = frameworks.find((item) => item.id === selectedFramework);

    localStorage.setItem("companyProfile", JSON.stringify(profile));

    localStorage.setItem(
      "selectedFramework",
      JSON.stringify({
        id: selectedFramework,
        name: framework?.name || "NIST CSF 2.0",
      })
    );

    localStorage.removeItem("assessmentAnswers");

    router.push("/assessment/questions");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#020617_42%,#020617_100%)] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm backdrop-blur">
            AuditReady AI · Assessment Setup
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Choose Your Compliance Framework
          </h1>

          <p className="mt-3 max-w-2xl text-slate-200">
            Select the compliance framework you want to check readiness for, then enter your organization details.
          </p>
        </div>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {frameworks.map((framework) => {
            const available = framework.status === "Available";
            const selected = selectedFramework === framework.id;

            return (
              <button
                key={framework.id}
                type="button"
                disabled={!available}
                onClick={() => available && setSelectedFramework(framework.id)}
                className={`rounded-2xl border p-5 text-left shadow-xl transition-all ${
                  selected
                    ? "border-white bg-white text-slate-950"
                    : available
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                    : "cursor-not-allowed border-white/10 bg-white/[0.04] text-slate-400 opacity-80"
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold">{framework.name}</h2>

                  {available ? (
                    <Badge
                      className={
                        selected
                          ? "bg-emerald-600 text-white hover:bg-emerald-600"
                          : "bg-emerald-400/20 text-emerald-200 hover:bg-emerald-400/20"
                      }
                    >
                      Available
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-800">
                      <Lock className="mr-1 h-3 w-3" />
                      Soon
                    </Badge>
                  )}
                </div>

                <p
                  className={`text-sm leading-6 ${
                    selected ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {framework.description}
                </p>

                {selected && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Selected for this assessment
                  </div>
                )}
              </button>
            );
          })}
        </section>

        <Card className="border-white/20 bg-white text-slate-950 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-950">
              Organization Profile
            </CardTitle>
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
              Continue with NIST CSF 2.0 Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}