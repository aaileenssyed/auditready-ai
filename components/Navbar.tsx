import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg transition group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight text-white">
              AuditReady AI
            </p>
            <p className="text-xs font-medium text-slate-400">
              Compliance readiness assistant
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/assessment/start" className="hover:text-white">
            Assessment
          </Link>
          <Link href="/report" className="hover:text-white">
            Sample Report
          </Link>
        </nav>
      </div>
    </header>
  );
}