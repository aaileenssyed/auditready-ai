import Image from "next/image";
import Link from "next/link";

const frameworks = [
  "NIST CSF 2.0 — Available",
  "CIS Controls — Coming Soon",
  "SOC 2 — Coming Soon",
  "ISO 27001 — Coming Soon",
  "HIPAA — Coming Soon",
  "PCI DSS — Coming Soon",
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg">
            <Image
              src="/auditready-logo.png"
              alt="AuditReady AI logo"
              width={44}
              height={44}
              className="h-full w-full object-contain p-1"
              priority
            />
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

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/assessment/start" className="hover:text-white">
            Assessment
          </Link>
          <Link href="/report?sample=true" className="hover:text-white">
            Sample Report
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 py-3">
          {frameworks.map((item) => {
            const available = item.includes("Available");

            return (
              <span
                key={item}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold shadow-sm ${
                  available
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                    : "border-white/15 bg-white/10 text-slate-300"
                }`}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}