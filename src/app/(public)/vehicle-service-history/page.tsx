import React from "react";
import type { Metadata } from "next";
import {
  History,
  FileCheck,
  ShieldCheck,
  Award,
  Smartphone,
  CloudDownload,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Vehicle Service History & Digital Maintenance Logbook | MotoCare",
  description:
    "Build a permanent digital service record for your motorcycle or car. Preserve invoices, mechanic notes, and maintenance logs to boost resale value in Bangladesh.",
  keywords: [
    "vehicle service history app",
    "digital vehicle logbook bangladesh",
    "car maintenance records online",
    "bike service history tracker",
    "proof of vehicle maintenance bd",
    "car resale value boost service log",
  ],
  alternates: {
    canonical: "/vehicle-service-history",
  },
  openGraph: {
    title: "Vehicle Service History & Digital Logbook | MotoCare",
    description:
      "A complete digital portfolio of every repair, oil change, and parts replacement for your vehicle in Bangladesh.",
    url: "/vehicle-service-history",
  },
};

export default function VehicleServiceHistoryPage() {
  return (
    <SeoLandingPage
      badge="Digital Vehicle Logbook"
      h1Title="Permanent Digital Service History for Bikes &amp; Cars in Bangladesh"
      subtitle="Say goodbye to lost paper service booklets and forgotten mechanic receipts. MotoCare organizes every oil change, brake replacement, and workshop visit into a clean digital portfolio."
      heroHighlight="Proven to increase vehicle resale value by up to 15-20% through verifiable maintenance records"
      featuresTitle="A Complete Life-Cycle Record for Every Vehicle"
      featuresSubtitle="Keep mechanics accountable and provide transparent proof of care to future vehicle buyers."
      features={[
        {
          icon: <History className="w-6 h-6" />,
          title: "Chronological Maintenance Timeline",
          description:
            "Every service entry is organized chronologically by date and odometer reading with full detail on parts changed and workshop notes.",
          tag: "Timeline View",
        },
        {
          icon: <Award className="w-6 h-6" />,
          title: "Maximize Resale Value",
          description:
            "Buyers in Bangladesh often doubt used vehicle odometer readings. A verified MotoCare service history builds trust and commands top market value.",
          tag: "High Resale Value",
        },
        {
          icon: <FileCheck className="w-6 h-6" />,
          title: "Receipt & Invoice Storage",
          description:
            "Never misplace spare parts warranty receipts or garage bills. Store digital copies linked directly to the specific maintenance event.",
          tag: "Paperless",
        },
        {
          icon: <ShieldCheck className="w-6 h-6" />,
          title: "Prevent Redundant Workshop Repairs",
          description:
            "Unscrupulous mechanics might claim your spark plug or coolant needs replacement. Check your MotoCare history on the spot to know exact previous service dates.",
        },
        {
          icon: <CloudDownload className="w-6 h-6" />,
          title: "Secure Cloud Backup & Sync",
          description:
            "Vehicle histories are safely saved in the cloud. Even if you lose or damage your smartphone, your vehicle's entire life log remains intact.",
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Instant Sharing with Mechanics",
          description:
            "Show your phone screen directly to your motorcycle mechanic or auto electrician so they instantly understand your vehicle's recent repairs.",
        },
      ]}
      bangladeshContext={{
        title: "Why Paper Logbooks Fail in Bangladesh",
        subtitle:
          "Traditional vehicle paperwork suffers from humidity, loss, and mechanic inconsistency:",
        points: [
          {
            title: "Physical Paper Damage",
            desc: "Paper service books kept under motorcycle seats or glove boxes get wet, torn, or misplaced during rainy monsoons.",
          },
          {
            title: "Multiple Workshop Visits",
            desc: "Owners frequently visit different local garages in Dhaka, Bogura, or Sylhet without standard recordkeeping.",
          },
          {
            title: "Used Market Odometer Fraud",
            desc: "Tampered odometers are rampant in the second-hand vehicle market. Comprehensive logbooks establish verifiable vehicle authenticity.",
          },
          {
            title: "Parts Warranty Tracking",
            desc: "Batteries, tires, and spark plugs often come with 1–2 year warranties easily forgotten without digital tracking.",
          },
        ],
      }}
      faqs={[
        {
          question: "Can I transfer the vehicle service history to the new buyer?",
          answer:
            "Yes! You can share your vehicle's complete digital maintenance timeline with potential buyers, demonstrating that your vehicle received regular care.",
        },
        {
          question: "Can I log past services that I did months ago?",
          answer:
            "Yes. MotoCare allows you to backdate service entries with past odometer readings and dates, so you can build your complete historical logbook anytime.",
        },
        {
          question: "Is there a limit on how many service records I can add?",
          answer:
            "No, you can log as many service, repair, and fuel events as you need for the entire lifetime of your vehicle.",
        },
      ]}
      relatedPages={[
        {
          title: "Vehicle Service Reminder",
          href: "/vehicle-service-reminder",
          desc: "Set automatic engine oil change and periodic inspection alerts.",
        },
        {
          title: "Car Expense Tracker",
          href: "/car-expense-tracker",
          desc: "Track total ownership costs, parts invoices, and fuel in BDT.",
        },
        {
          title: "Motorcycle Maintenance App",
          href: "/motorcycle-maintenance-app",
          desc: "Tailored bike maintenance logbook for Bangladeshi riders.",
        },
      ]}
    />
  );
}
