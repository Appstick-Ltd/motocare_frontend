import React from "react";
import type { Metadata } from "next";
import {
  Calendar,
  Wrench,
  CheckCircle2,
  Shield,
  Layers,
  Thermometer,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Complete Bike Maintenance Schedule for Bangladesh | Periodic Service Chart",
  description:
    "Standard motorcycle maintenance schedule for Bangladesh roads: 1,000 km, 3,000 km, 6,000 km, and 10,000 km periodic servicing checklist for Yamaha, Honda, Suzuki & Bajaj.",
  keywords: [
    "bike maintenance schedule bangladesh",
    "motorcycle service interval chart",
    "yamaha bike periodic service schedule",
    "bajaj pulsar maintenance kilometer chart",
    "monsoon motorcycle care tips bd",
    "bike engine oil change period bangladesh",
  ],
  alternates: {
    canonical: "/bike-maintenance-schedule-bangladesh",
  },
  openGraph: {
    title: "Bike Maintenance Schedule Bangladesh | MotoCare",
    description:
      "A complete kilometer and season-wise maintenance checklist tailored to Bangladesh road conditions.",
    url: "/bike-maintenance-schedule-bangladesh",
  },
};

export default function BikeMaintenanceScheduleBangladeshPage() {
  return (
    <SeoLandingPage
      badge="Periodic Service Guide"
      h1Title="The Definitive Bike Maintenance Schedule for Bangladesh Roads"
      subtitle="Follow this kilometer-based and seasonal motorcycle service checklist. Maximize engine life, maintain 45+ km/L mileage, and keep your ride safe in every weather condition."
      heroHighlight="Optimized for Bangladesh tropical weather, dusty roads, and heavy monsoon rains"
      featuresTitle="Kilometer-by-Kilometer Maintenance Milestones"
      featuresSubtitle="Follow standard manufacturer intervals tuned for real-world Bangladeshi road challenges."
      features={[
        {
          icon: <Wrench className="w-6 h-6" />,
          title: "Every 1,000 – 1,500 km: Minor Service",
          description:
            "Engine oil drain (Mineral), chain cleaning & lube, tire pressure check, clutch cable free-play adjustment, and washing.",
          tag: "Minor Routine",
        },
        {
          icon: <Layers className="w-6 h-6" />,
          title: "Every 3,000 – 4,000 km: Intermediate Care",
          description:
            "Oil filter replacement, air filter inspection & cleaning, brake pad check, spark plug gap cleaning, battery terminal greasing.",
          tag: "Intermediate",
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Every 6,000 – 8,000 km: Comprehensive Tuning",
          description:
            "FI throttle body or carburetor tuning, new air filter, brake fluid bleed, drive chain slack tightening or link removal.",
          tag: "Engine Tuning",
        },
        {
          icon: <Thermometer className="w-6 h-6" />,
          title: "Every 10,000 – 12,000 km: Major Overhaul",
          description:
            "Front fork suspension oil replacement, cone set (steering bearing) greasing, valve tappet clearance adjustment, new spark plug.",
          tag: "Major Service",
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: "Pre-Monsoon Inspection",
          description:
            "Check tire tread depth for wet asphalt grip, verify electrical waterproofing, and apply anti-rust spray on metal fasteners.",
        },
        {
          icon: <CheckCircle2 className="w-6 h-6" />,
          title: "Post-Touring Highway Check",
          description:
            "After long trips on Dhaka-Chittagong or Sylhet highways, inspect wheel rim trueness, drive chain stretch, and engine oil discoloration.",
        },
      ]}
      bangladeshContext={{
        title: "Adjusting Service Schedules for Local Environmental Factors",
        subtitle:
          "Bangladesh road conditions require shorter intervals than European or Japanese factory manuals:",
        points: [
          {
            title: "Severe Road Dust & Fly Ash",
            desc: "City flyovers and highway construction sites necessitate air filter cleaning every 2,000 km rather than factory 6,000 km guidelines.",
          },
          {
            title: "Heavy Monsoon Water Splash",
            desc: "Waterlogged roads wash away chain lubricant and penetrate wheel bearings, demanding immediate relubrication after heavy rains.",
          },
          {
            title: "High Summer Ambient Heat",
            desc: "When temperatures hit 38°C in April and May, engine oil shears faster. Using high viscosity index oils (e.g. 10W-40 or 20W-50) is vital.",
          },
          {
            title: "Frequent Sudden Braking",
            desc: "Unpredictable traffic maneuvers accelerate front disc pad wear. Inspect brake pads whenever lever travel feels spongy.",
          },
        ],
      }}
      faqs={[
        {
          question: "When should I change engine oil for a brand new bike during break-in (run-in)?",
          answer:
            "For a new motorcycle in Bangladesh, change the first engine oil at 300–500 km, the second at 1,000 km, and the third at 1,500–2,000 km to safely flush out microscopic metal shavings from the new engine block.",
        },
        {
          question: "Which engine oil is better for Bangladesh: Mineral or Synthetic?",
          answer:
            "Mineral oil is cost-effective but requires replacement every 1,000–1,200 km. Semi-synthetic lasts 2,000–2,500 km, while Full Synthetic (10W-40/10W-50) provides the highest heat protection and can run up to 3,500+ km even in Dhaka traffic.",
        },
        {
          question: "How does MotoCare help me follow this schedule?",
          answer:
            "MotoCare has pre-built service templates for major motorcycle brands. Once you enter your starting odometer reading, the app alerts you automatically as each maintenance milestone approaches.",
        },
      ]}
      relatedPages={[
        {
          title: "Vehicle Service Reminder",
          href: "/vehicle-service-reminder",
          desc: "Automated notification reminders for your motorcycle service milestones.",
        },
        {
          title: "How to Calculate Bike Mileage",
          href: "/how-to-calculate-bike-mileage",
          desc: "Learn how regular maintenance boosts your bike's fuel economy.",
        },
        {
          title: "Motorcycle Maintenance App",
          href: "/motorcycle-maintenance-app",
          desc: "Digital logbook app for Yamaha, Honda, Suzuki, TVS & Bajaj.",
        },
      ]}
    />
  );
}
