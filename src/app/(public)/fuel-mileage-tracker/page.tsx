import React from "react";
import type { Metadata } from "next";
import {
  Fuel,
  Gauge,
  TrendingDown,
  Coins,
  History,
  AlertTriangle,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Bike & Car Fuel Mileage Tracker App in Bangladesh (km/L & BDT Cost)",
  description:
    "Accurately calculate your motorcycle and car fuel mileage (km/L) and cost per kilometer in BDT. Track petrol, octane, and CNG fill-ups with automatic consumption analytics.",
  keywords: [
    "bike mileage tracker bangladesh",
    "motorcycle fuel mileage app",
    "fuel cost calculator bd",
    "petrol octane consumption tracker",
    "calculate km per liter bangladesh",
    "car mileage logbook",
  ],
  alternates: {
    canonical: "/fuel-mileage-tracker",
  },
  openGraph: {
    title: "Bike & Car Fuel Mileage Tracker App | MotoCare Bangladesh",
    description:
      "Calculate real-world mileage and cost per kilometer. Never wonder where your fuel budget went.",
    url: "/fuel-mileage-tracker",
  },
};

export default function FuelMileageTrackerPage() {
  return (
    <SeoLandingPage
      badge="Fuel &amp; Mileage Telemetry"
      h1Title="The Smartest Bike &amp; Car Fuel Mileage Tracker in Bangladesh"
      subtitle="Stop guessing your fuel economy. MotoCare automatically calculates real-world km/L, cost per kilometer in BDT, and notifies you when mileage drops."
      heroHighlight="Calculated using verified full-tank telemetry for Dhaka &amp; highway traffic"
      featuresTitle="Comprehensive Fuel Log &amp; Mileage Telemetry"
      featuresSubtitle="Designed for motorbikes, private cars, CNG hybrids, and delivery fleets in Bangladesh."
      features={[
        {
          icon: <Gauge className="w-6 h-6" />,
          title: "Real-Time km/L Mileage Calculation",
          description:
            "Log your odometer reading and liters purchased. MotoCare calculates your exact kilometer per liter instantly without manual math.",
          tag: "Core Feature",
        },
        {
          icon: <Coins className="w-6 h-6" />,
          title: "Cost Per Kilometer in BDT (৳)",
          description:
            "Know exactly how many Taka each kilometer costs. Compare Octane vs Petrol efficiency across city vs highway rides.",
          tag: "Expense Tracking",
        },
        {
          icon: <TrendingDown className="w-6 h-6" />,
          title: "Mileage Drop Alerts",
          description:
            "If your mileage drops below normal, MotoCare flags potential engine tuning, tire pressure, or clogged air filter issues before big repairs.",
          tag: "Smart Alerts",
        },
        {
          icon: <History className="w-6 h-6" />,
          title: "Complete Fuel Fill-Up History",
          description:
            "Store every receipt, fuel station name, date, and price per liter. Export visual charts for monthly and annual travel budgets.",
        },
        {
          icon: <Fuel className="w-6 h-6" />,
          title: "Multi-Fuel Support: Octane, Petrol, CNG",
          description:
            "Seamlessly track motorcycles, hybrid cars, and dual-fuel vehicles with accurate metrics tailored for each fuel type.",
        },
        {
          icon: <AlertTriangle className="w-6 h-6" />,
          title: "Bad Fuel & Station Comparison",
          description:
            "Identify which filling stations deliver better quality fuel by tracking mileage variations across different pumps in BD.",
        },
      ]}
      bangladeshContext={{
        title: "Overcoming Fuel Inefficiencies on Bangladesh Roads",
        subtitle:
          "Daily city traffic in Dhaka, Chittagong, and Rajshahi imposes severe stress on your engine. Here is how MotoCare keeps fuel costs under control:",
        points: [
          {
            title: "Idling & Traffic Jam Factor",
            desc: "Prolonged idling in Dhaka gridlocks consumes fuel with zero mileage gains. MotoCare isolates city commute logs from highway trips.",
          },
          {
            title: "Octane vs Petrol Pricing",
            desc: "With fluctuating fuel tariffs, tracking BDT cost per kilometer helps you identify whether premium Octane pays off in mileage.",
          },
          {
            title: "Tire Pressure Impact",
            desc: "Under-inflated tires on uneven roads increase drag by up to 15%. Logged mileage trends alert you when tires need refilling.",
          },
          {
            title: "Adulterated Fuel Detection",
            desc: "Sudden unexplained drops in tank-to-tank mileage reveal contaminated fuel batches before engine knocking causes permanent damage.",
          },
        ],
      }}
      faqs={[
        {
          question: "How does MotoCare calculate bike mileage (km/L)?",
          answer:
            "MotoCare uses the internationally recognized Full Tank to Full Tank method. When you fill up and enter the liters added along with your odometer reading, the app computes: (Current Odometer - Previous Odometer) ÷ Liters. This gives your exact, untampered mileage.",
        },
        {
          question: "Can I use MotoCare for both a motorcycle and a car?",
          answer:
            "Yes! You can add unlimited vehicles under one MotoCare account, switching effortlessly between your bike, scooter, and private car.",
        },
        {
          question: "Does MotoCare work offline without internet?",
          answer:
            "Yes. You can log fuel purchases at the pump even when offline. Once you connect to mobile data or Wi-Fi, your records sync automatically to your secure cloud account.",
        },
        {
          question: "Is MotoCare really 100% free?",
          answer:
            "Yes, the core vehicle management, fuel tracking, and service reminder features are completely free to use for individual vehicle owners in Bangladesh.",
        },
      ]}
      relatedPages={[
        {
          title: "Interactive Mileage Calculator",
          href: "/how-to-calculate-bike-mileage",
          desc: "Calculate your bike's fuel economy online right now using our web tool.",
        },
        {
          title: "Service Reminder App",
          href: "/vehicle-service-reminder",
          desc: "Set automatic engine oil change reminders based on your logged kilometers.",
        },
        {
          title: "Motorcycle Care App BD",
          href: "/motorcycle-maintenance-app",
          desc: "Comprehensive maintenance tracking for Yamaha, Honda, Suzuki, TVS & Bajaj.",
        },
      ]}
    />
  );
}
