import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://motocare.appstick.com.bd";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MotoCare | Smart Fuel, Mileage, Service & Vehicle Expense Tracker",
    template: "%s | MotoCare",
  },
  description:
    "The complete vehicle maintenance logbook and expense manager. Track fuel efficiency, calculate accurate mileage, schedule automated service reminders, and monitor vehicle costs.",
  keywords: [
    "vehicle mileage tracker",
    "fuel expense tracker",
    "vehicle service reminder app",
    "motorcycle maintenance log",
    "car expense tracker",
    "engine oil change reminder",
    "digital service history book",
    "vehicle management app",
    "motocare",
    "appstick motocare",
  ],
  authors: [{ name: "Appstick Ltd", url: "https://appstick.com.bd" }],
  creator: "Appstick Ltd",
  publisher: "Appstick Ltd",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MotoCare - Smart Fuel, Mileage & Vehicle Service Reminder App",
    description:
      "Never miss an engine oil change or document renewal. Track fuel economy, log maintenance expenses, and keep your vehicles running smooth.",
    url: siteUrl,
    siteName: "MotoCare",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "MotoCare Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MotoCare - Smart Fuel, Mileage & Service Tracker for Bikes & Cars",
    description:
      "Digital vehicle logbook & maintenance reminder tailored for riders and car owners worldwide.",
    images: ["/logo.png"],
  },
  verification: {
    google: "googlec3f767308c397204",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import { JsonLd, motocareSoftwareAppSchema, motocareOrganizationSchema } from "@/components/seo/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <JsonLd data={motocareSoftwareAppSchema} />
        <JsonLd data={motocareOrganizationSchema} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
