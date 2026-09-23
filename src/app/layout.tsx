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
    default: "MotoCare | Fuel, Mileage, Service & Vehicle Expense Tracker Bangladesh",
    template: "%s | MotoCare",
  },
  description:
    "The smartest vehicle maintenance app for Bangladesh. Track bike & car fuel efficiency (km/L), engine oil service reminders, BRTA tax token/fitness expiry, and maintenance history.",
  keywords: [
    "bike mileage tracker bangladesh",
    "vehicle service reminder app",
    "fuel cost tracker bd",
    "motorcycle maintenance app",
    "car expense tracker bangladesh",
    "brta tax token reminder",
    "fitness certificate renewal tracker",
    "bike engine oil change reminder",
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
    title: "MotoCare - Fuel, Mileage & Vehicle Service Reminder App",
    description:
      "Never miss an engine oil change or BRTA renewal again. Track vehicle fuel, mileage, and expenses seamlessly in Bangladesh.",
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
    title: "MotoCare - Fuel, Mileage & Service Tracker for Bikes & Cars",
    description:
      "Digital vehicle logbook & maintenance reminder tailored for riders and car owners in Bangladesh.",
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
