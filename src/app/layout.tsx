import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio — terminal",
  description: "A terminal-style developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body>{children}</body>
    </html>
  );
}
