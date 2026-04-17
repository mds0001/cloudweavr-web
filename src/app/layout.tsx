import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threads by Cloud Weaver — Weaves your cloud data",
  description: "Threads connects, transforms, and delivers data between any cloud source and destination — intelligently, automatically, and at scale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
