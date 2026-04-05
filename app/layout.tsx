import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProfileRank AI",
  description: "LinkedIn profile audit and optimization"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
