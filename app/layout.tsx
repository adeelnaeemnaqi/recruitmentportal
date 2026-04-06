import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ProfileRank AI",
  description: "LinkedIn profile audit and optimization"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold">ProfileRank AI</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
              <Link href="/demo" className="text-slate-600 hover:text-slate-900">Demo</Link>
              <Link href="/roadmap" className="text-slate-600 hover:text-slate-900">Roadmap</Link>
              <Link href="/login" className="rounded-lg border px-3 py-1.5">Log in</Link>
              <Link href="/signup" className="rounded-lg bg-brand-600 px-3 py-1.5 text-white">Get score</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
