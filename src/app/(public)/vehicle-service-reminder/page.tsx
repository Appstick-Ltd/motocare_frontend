import React from "react";
import type { Metadata } from "next";
import {
  Bell,
  Wrench,
  Clock,
  Calendar,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Vehicle Service & Engine Oil Reminder App Bangladesh | MotoCare",
  description:
    "Never miss an engine oil change, brake pad inspection, or periodic servicing. MotoCare alerts you by kilometers driven and calendar days for bikes & cars.",
  keywords: [
    "vehicle service reminder app",
    "engine oil change reminder bd",
    "bike periodic service alert",
    "car maintenance schedule reminder",
    "motorcycle oil change interval bangladesh",
    "vehicle maintenance tracker",
  ],
  alternates: {
    canonical: "/vehicle-service-reminder",
  },
  openGraph: {
    title: "Vehicle Service & Engine Oil Reminder App | MotoCare BD",
    description:
      "Automated mileage & date-based maintenance reminders for motorcycle and car owners in Bangladesh.",
    url: "/vehicle-service-reminder",
  },
};

export default function VehicleServiceReminderPage() {
  return (
    <SeoLandingPage
      badge="Automated Maintenance Alerts"
      h1Title="Never Miss an Engine Oil Change or Vehicle Service Again"
      subtitle="Automated kilometer-driven and calendar-based reminders for motorbikes and cars. Protect engine health and prevent expensive repair bills."
      heroHighlight="Dual Trigger: Alerts triggered by both Kilometers driven &amp; Calendar days elapsed"
      featuresTitle="Smart Maintenance Triggers Designed for Long Engine Life"
      featuresSubtitle="Configure custom interval thresholds or choose recommended manufacturer presets for your vehicle model."
      features={[
        {
          icon: <Wrench className="w-6 h-6" />,
          title: "Engine Oil Change Alerts",
          description:
            "Set alerts for mineral oil (1,000–1,200 km), semi-synthetic (2,000–2,500 km), or full synthetic (3,000+ km). Get warned 100 km in advance.",
          tag: "Top Utility",
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "Brake & Safety Inspection Reminders",
          description:
            "Track front & rear disc brake pads, brake fluid levels, and drum brake shoe wear to prevent dangerous failure in traffic.",
          tag: "Rider Safety",
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: "Dual-Mode: Mileage & Date Interval",
          description:
            "If you drive infrequently, engine oil still degrades over time. MotoCare alerts you if 3 months pass even if kilometer limit isn't reached.",
          tag: "Smart Engine",
        },
        {
          icon: <Bell className="w-6 h-6" />,
          title: "Push Notifications & Email Alerts",
          description:
            "Receive timely push notifications on your phone so you can schedule a workshop visit without keeping mental checklists.",
        },
        {
          icon: <ShieldAlert className="w-6 h-6" />,
          title: "Air & Oil Filter Lifecycle Tracking",
          description:
            "Replace dirty air and oil filters on schedule to safeguard your engine cylinder from abrasive road dust and maintain peak compression.",
        },
        {
          icon: <CheckCircle2 className="w-6 h-6" />,
          title: "One-Tap Service Log Reset",
          description:
            "When service is done, tap 'Completed'. Enter costs, notes, and mechanic name. MotoCare automatically schedules the next cycle.",
        },
      ]}
      bangladeshContext={{
        title: "Why Regular Service Intervals Matter on Bangladesh Roads",
        subtitle:
          "High ambient temperatures exceeding 38°C in summer, humid monsoons, and extreme airborne dust drastically reduce oil lubricity:",
        points: [
          {
            title: "Stop-and-Go Engine Heat",
            desc: "Idling for 45 minutes in Dhaka traffic causes air-cooled motorcycle engines to overheat, burning oil viscosity faster than highway cruising.",
          },
          {
            title: "Monsoon Water Contamination",
            desc: "Waterlogging during monsoon rains often contaminates drive chains, wheel bearings, and suspension seals requiring periodic inspection.",
          },
          {
            title: "Clogged Air Filters from Construction Dust",
            desc: "Ongoing city road works saturate air filters within 3,000 km, reducing air intake and flooding cylinders with rich fuel mixtures.",
          },
          {
            title: "Resale Value Retention",
            desc: "A verified digital service log on MotoCare proves your vehicle was maintained meticulously, fetching up to 20% higher resale price.",
          },
        ],
      }}
      faqs={[
        {
          question: "How do I set up an engine oil reminder in MotoCare?",
          answer:
            "Simply select your vehicle, tap 'Add Reminder', choose 'Engine Oil', and enter your desired interval (e.g. 1,500 km or 90 days). As you log your fuel entries or update your odometer, MotoCare tracks your remaining distance and alerts you when maintenance is due.",
        },
        {
          question: "Can I create custom reminders for custom aftermarket parts?",
          answer:
            "Yes! You can create custom reminders for chain sprockets, spark plugs, radiator coolant, fork oil, tire rotation, or transmission fluids with custom mileage or date intervals.",
        },
        {
          question: "What happens if I forget to log my kilometers for a week?",
          answer:
            "MotoCare features calendar-based fallback reminders. If you haven't updated your odometer recently, the app prompts you to verify your mileage so alerts remain accurate.",
        },
      ]}
      relatedPages={[
        {
          title: "Fuel & Mileage Tracker",
          href: "/fuel-mileage-tracker",
          desc: "Track every fill-up and discover how regular oil changes improve your mileage.",
        },
        {
          title: "BRTA Renewal Reminder",
          href: "/tax-insurance-fitness-reminder",
          desc: "Track tax token, fitness, and insurance renewal dates alongside your service log.",
        },
        {
          title: "Bike Maintenance Schedule BD",
          href: "/bike-maintenance-schedule-bangladesh",
          desc: "Full periodic maintenance checklist customized for Bangladesh road conditions.",
        },
      ]}
    />
  );
}
