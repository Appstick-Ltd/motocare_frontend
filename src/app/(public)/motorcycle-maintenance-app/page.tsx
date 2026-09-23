import React from "react";
import type { Metadata } from "next";
import {
  Bike,
  Sparkles,
  Shield,
  Layers,
  Fuel,
  CheckCircle2,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Motorcycle Maintenance & Care App for Bangladesh | MotoCare",
  description:
    "The all-in-one bike care app for Yamaha, Honda, Suzuki, Bajaj, and TVS owners in Bangladesh. Manage fuel logs, oil intervals, chain care, and expenses.",
  keywords: [
    "motorcycle maintenance app bangladesh",
    "bike care app bd",
    "yamaha r15 fzs service tracker",
    "honda xblade service app",
    "bajaj pulsar maintenance log",
    "tvs apache rtr service reminder",
    "bike digital logbook bangladesh",
  ],
  alternates: {
    canonical: "/motorcycle-maintenance-app",
  },
  openGraph: {
    title: "Motorcycle Maintenance & Care App in Bangladesh | MotoCare",
    description:
      "Engineered specifically for Bangladeshi bikers. Track fuel, chain lube, periodic services, and BRTA paper renewals.",
    url: "/motorcycle-maintenance-app",
  },
};

export default function MotorcycleMaintenanceAppPage() {
  return (
    <SeoLandingPage
      badge="Biker-First Telemetry"
      h1Title="The #1 Motorcycle Maintenance &amp; Care App for Bikers in Bangladesh"
      subtitle="Built specifically for Yamaha, Honda, Suzuki, Bajaj, TVS, and Lifan owners. Track daily fuel, oil changes, chain lubrication, and parts replacement in one unified digital logbook."
      heroHighlight="Compatible with 100+ motorcycle models popular across Dhaka &amp; highway corridors"
      featuresTitle="Engineered for Passionate Bikers &amp; Daily Commuters"
      featuresSubtitle="From sporty 150cc–165cc cruisers to economical 100cc–125cc commuter bikes, MotoCare keeps two-wheelers in peak mechanical health."
      features={[
        {
          icon: <Bike className="w-6 h-6" />,
          title: "Model-Specific Service Schedules",
          description:
            "Tailored presets for popular bikes in BD: Yamaha FZ-S / R15, Suzuki Gixxer, Honda X-Blade, Bajaj Pulsar, TVS Apache RTR, and Hero Hunk.",
          tag: "Custom Presets",
        },
        {
          icon: <Fuel className="w-6 h-6" />,
          title: "Tank-to-Tank Fuel Log in Taka (৳)",
          description:
            "Record petrol and octane fill-ups. Instant mileage calculation shows your true km/L so you can detect engine power loss early.",
          tag: "Fuel Tracker",
        },
        {
          icon: <Layers className="w-6 h-6" />,
          title: "Chain Care & Lube Reminders",
          description:
            "Drive chains stretch and accumulate road grit. Get notified every 500–800 km to clean, tighten, and lubricate your motorcycle drive chain.",
          tag: "Biker Essential",
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "BRTA Tax Token & Smart Card Alerts",
          description:
            "Avoid traffic sergeant penalties. Set reminders for 2-year or 10-year motorcycle tax token renewals and driving license expiry.",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          title: "Monthly Expense & Parts Cost Log",
          description:
            "Track tires, brake pads, chain sprockets, clutch cables, and modifications. Know your exact monthly motorcycle operating budget.",
        },
        {
          icon: <CheckCircle2 className="w-6 h-6" />,
          title: "Instant Cloud Backup",
          description:
            "Switching phones? Your entire motorcycle maintenance history, fuel statistics, and service logs are securely restored in seconds.",
        },
      ]}
      bangladeshContext={{
        title: "Tackling Common Motorcycle Woes in Bangladesh",
        subtitle:
          "Daily highway touring and city gridlocks present distinct challenges for two-wheelers:",
        points: [
          {
            title: "Drive Chain Rust & Sludge",
            desc: "Potholes and wet roads splatter sand into the O-ring chain, accelerating sprocket teeth wear if not cleaned regularly.",
          },
          {
            title: "Overheating in Traffic",
            desc: "Air-cooled single cylinder engines run hot in standstill traffic. MotoCare helps you maintain optimal oil drain intervals.",
          },
          {
            title: "Front Fork Oil Leaks",
            desc: "Impact with high speed bumps often ruptures fork oil seals. Logging periodic fork checks prevents steering instability.",
          },
          {
            title: "Battery Health During Winter",
            desc: "Self-starter motors strain motorcycle batteries during cold morning starts. Periodic charging alerts save you from kick-starting emergencies.",
          },
        ],
      }}
      faqs={[
        {
          question: "Can I manage multiple bikes in the same app?",
          answer:
            "Yes! Whether you have a commuter bike for daily office trips and a touring sports bike for weekends, MotoCare lets you manage multiple vehicles separately with dedicated statistics for each.",
        },
        {
          question: "Does the app support electric bikes (e-bikes) and scooters?",
          answer:
            "Yes. You can log e-scooters, scooters, and standard fuel motorcycles, tailoring maintenance intervals for tires, brakes, and electrical checkups.",
        },
        {
          question: "Can I show my service history when selling my bike?",
          answer:
            "Absolutely! A transparent digital service record on MotoCare provides unquestionable proof of timely maintenance to buyers, boosting resale value.",
        },
      ]}
      relatedPages={[
        {
          title: "Fuel & Mileage Tracker",
          href: "/fuel-mileage-tracker",
          desc: "Calculate your motorcycle's exact km/L and fuel budget in BDT.",
        },
        {
          title: "Bike Maintenance Schedule BD",
          href: "/bike-maintenance-schedule-bangladesh",
          desc: "Detailed periodic maintenance schedule by kilometers for Bangladesh.",
        },
        {
          title: "How to Calculate Bike Mileage",
          href: "/how-to-calculate-bike-mileage",
          desc: "Step-by-step formula and interactive online mileage calculator.",
        },
      ]}
    />
  );
}
