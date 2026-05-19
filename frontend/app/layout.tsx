import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "ClinicalSiteHub",
    template: "%s | ClinicalSiteHub",
  },
  description:
    "Clinical research site ratings, sponsor analytics, and therapeutic area discovery platform.",
  keywords: [
    "clinical research",
    "research sites",
    "clinical trials",
    "oncology trials",
    "research site ratings",
    "CRO",
    "sponsor analytics",
    "clinical trial platform",
  ],
  metadataBase: new URL("https://www.clinicalsitehub.com"),
  openGraph: {
    title: "ClinicalSiteHub",
    description:
      "Clinical research site ratings and sponsor analytics platform.",
    url: "https://www.clinicalsitehub.com",
    siteName: "ClinicalSiteHub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClinicalSiteHub",
    description:
      "Clinical research site ratings and sponsor analytics platform.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}