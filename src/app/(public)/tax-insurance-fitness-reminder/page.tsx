import React from "react";
import type { Metadata } from "next";
import {
  ShieldAlert,
  Calendar,
  FileCheck,
  AlertOctagon,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "BRTA Tax Token, Fitness & Insurance Renewal Reminder App | MotoCare",
  description:
    "Avoid heavy traffic police fines in Bangladesh. Track BRTA Tax Token, Fitness Certificate, Route Permit, and Vehicle Insurance expiration dates with automated alerts.",
  keywords: [
    "brta tax token reminder app",
    "vehicle fitness renewal tracker bangladesh",
    "bike tax token expiry alert",
    "car insurance expiry reminder bd",
    "avoid traffic police fine bangladesh",
    "brta document management app",
  ],
  alternates: {
    canonical: "/tax-insurance-fitness-reminder",
  },
  openGraph: {
    title: "BRTA Tax Token, Fitness & Insurance Expiry Tracker | MotoCare",
    description:
      "Automated deadline alerts for Tax Token, Fitness, and Insurance for bikes & cars in Bangladesh.",
    url: "/tax-insurance-fitness-reminder",
  },
};

export default function TaxInsuranceFitnessReminderPage() {
  return (
    <SeoLandingPage
      badge="BRTA Compliance &amp; Legal Guard"
      h1Title="Never Face a Traffic Fine for Expired BRTA Tax Token or Fitness"
      subtitle="Track your Bangladesh Road Transport Authority (BRTA) documents effortlessly. Receive automatic notifications 30 days, 15 days, and 7 days before Tax Token, Fitness, or Insurance expiration."
      heroHighlight="Save thousands of Taka in Road Transport Act 2018 non-compliance penalties"
      featuresTitle="Comprehensive Document Renewal Tracking"
      featuresSubtitle="Designed according to Bangladesh traffic regulations for private cars, motorbikes, microbuses, and commercial fleets."
      features={[
        {
          icon: <Calendar className="w-6 h-6" />,
          title: "BRTA Tax Token Expiration Alert",
          description:
            "Set your 1-year, 2-year, or 10-year motorcycle tax token expiration date. Get early advance alerts so you can visit the bank or pay via bsp.brta.gov.bd on time.",
          tag: "Zero Penalties",
        },
        {
          icon: <ShieldAlert className="w-6 h-6" />,
          title: "Vehicle Fitness Certificate Tracker",
          description:
            "Fitness renewal requires physical vehicle inspection at BRTA circles. MotoCare alerts you early so you can schedule maintenance before testing.",
          tag: "Inspection Alert",
        },
        {
          icon: <FileCheck className="w-6 h-6" />,
          title: "Third-Party & Comprehensive Insurance",
          description:
            "Keep your motor vehicle insurance policy active with timely expiration reminders, preventing legal vulnerability during accidental claims.",
          tag: "Financial Protection",
        },
        {
          icon: <AlertOctagon className="w-6 h-6" />,
          title: "Commercial Route Permit Reminders",
          description:
            "Essential for microbuses, pickups, and commercial trucks navigating inter-district routes under strict BRTA jurisdiction.",
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "Grace Period Countdown",
          description:
            "Real-time countdown shows exactly how many days remain until your paper deadline, preventing last-minute rush and delayed banking penalties.",
        },
        {
          icon: <CheckCircle2 className="w-6 h-6" />,
          title: "Document Photo Backup",
          description:
            "Store high-resolution snapshots of your Smart Card, Tax Token, and Insurance inside MotoCare for quick reference when pulled over.",
        },
      ]}
      bangladeshContext={{
        title: "Navigating Bangladesh Road Transport Law 2018 Penalties",
        subtitle:
          "Under the amended Road Transport Act 2018, operating vehicles with expired paperwork attracts stringent legal consequences:",
        points: [
          {
            title: "Hefty Monetary Fines",
            desc: "Driving with an expired tax token or fitness certificate can lead to immediate traffic cases and fines ranging from ৳2,000 to ৳10,000+.",
          },
          {
            title: "Vehicle Impoundment Risk",
            desc: "Serious delays in document renewal give traffic authorities legal grounds to impound vehicles, leading to tedious recovery hassles.",
          },
          {
            title: "Banking & BSP System Delays",
            desc: "Last-minute payment during bank closing hours or server congestion can push you past your deadline. Early reminders eliminate stress.",
          },
          {
            title: "Insurance Claim Rejection",
            desc: "If an accident occurs while your tax token or fitness certificate is expired, insurance firms in Bangladesh will reject claim settlements.",
          },
        ],
      }}
      faqs={[
        {
          question: "How far in advance does MotoCare alert me before document expiry?",
          answer:
            "MotoCare sends notifications 30 days, 15 days, 7 days, and 1 day before your document expires, giving you plenty of time to clear bank fees and renew your certificates.",
        },
        {
          question: "Do personal motorcycles need yearly fitness renewal in Bangladesh?",
          answer:
            "Under BRTA rules, personal motorcycles do not require annual fitness certificate renewals, but Tax Token renewal is mandatory (every 1 or 2 years depending on registration). Private cars and commercial vehicles require regular fitness renewal.",
        },
        {
          question: "Can I store multiple vehicles' BRTA documents?",
          answer:
            "Yes! You can manage document expiration dates for your entire family's bikes and cars or company transport fleet in one place.",
        },
      ]}
      relatedPages={[
        {
          title: "Vehicle Service Reminder",
          href: "/vehicle-service-reminder",
          desc: "Never miss an oil change or mechanical service interval.",
        },
        {
          title: "Car Expense Tracker",
          href: "/car-expense-tracker",
          desc: "Track renewal fee payments, fuel, and workshop expenses in BDT.",
        },
        {
          title: "BRTA Document Renewal Guide",
          href: "/blog/brta-vehicle-document-renewal-guide",
          desc: "Step-by-step tutorial on renewing BRTA tax tokens and fitness certificates.",
        },
      ]}
    />
  );
}
