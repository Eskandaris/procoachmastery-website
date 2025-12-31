import type { Metadata } from "next";
import "./globals.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { StickyCTAConditional } from "@/components/StickyCTAConditional";
import { MainWrapper } from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "Pro Coach Mastery - AI-gedreven coachopleiding",
  description: "Leer coachen met realistische AI-avatars én echte cliënten. Bouw een portfolio voor EMCC-certificering.",
  keywords: "coach opleiding, AI coaching, EMCC certificering, professioneel coachen",
  authors: [{ name: "Alexander van den Berg" }],
  openGraph: {
    title: "Pro Coach Mastery - AI-gedreven coachopleiding",
    description: "Leer coachen met realistische AI-avatars én echte cliënten. Bouw een portfolio voor EMCC-certificering.",
    type: "website",
    locale: "nl_NL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <HeaderWrapper />
        <StickyCTAConditional />
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
