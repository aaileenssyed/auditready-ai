import Link from "next/link";
import { ShieldCheck, FileText, BarChart3, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          NIST CSF 2.0 readiness demo
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          AuditReady AI
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Turn security gaps into audit-ready action plans. Assess compliance readiness,
          identify missing controls, and generate evidence checklists.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/assessment/start">
            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
  Start Free Assessment
</Button>
          </Link>
          <Link href="/report">
            <Button
  size="lg"
  variant="outline"
  className="border-white/30 bg-white text-slate-950 hover:bg-slate-100"
>
  View Sample Report
</Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-4">
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardContent className="p-6">
            <ShieldCheck className="mb-4 h-8 w-8" />
            <h3 className="font-semibold">Framework Readiness</h3>
            <p className="mt-2 text-sm text-slate-400">
              Start with NIST CSF 2.0 and expand into CIS, SOC 2, ISO, HIPAA, and PCI.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-slate-800">
          <CardContent className="p-6">
            <BarChart3 className="mb-4 h-8 w-8" />
            <h3 className="font-semibold">Readiness Score</h3>
            <p className="mt-2 text-sm text-slate-400">
              Get an explainable score based on questionnaire responses and weighted controls.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-slate-800">
          <CardContent className="p-6">
            <ClipboardCheck className="mb-4 h-8 w-8" />
            <h3 className="font-semibold">Evidence Checklist</h3>
            <p className="mt-2 text-sm text-slate-400">
              Identify policies, screenshots, reports, and documents needed for audit readiness.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-slate-800">
          <CardContent className="p-6">
            <FileText className="mb-4 h-8 w-8" />
            <h3 className="font-semibold">PDF Report</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generate a professional readiness report with gaps and a remediation roadmap.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 text-center text-sm text-slate-400">
        AuditReady AI is a readiness and educational tool. It does not provide legal advice,
        formal certification, or guaranteed compliance.
      </section>
    </main>
  );
}