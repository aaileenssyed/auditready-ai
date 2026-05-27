import { Suspense } from "react";
import ReportClient from "./ReportClient";

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="text-slate-300">Loading report...</p>
          </div>
        </main>
      }
    >
      <ReportClient />
    </Suspense>
  );
}