import React from "react";
import type { Metadata } from "next";
import {
  Calculator,
  Gauge,
  Fuel,
  TrendingUp,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { MileageCalculatorWidget } from "@/components/calculator/MileageCalculatorWidget";

export const metadata: Metadata = {
  title: "How to Calculate Bike Mileage in Bangladesh (Formula & Free Calculator Tool)",
  description:
    "Learn the full tank-to-tank formula to calculate motorcycle mileage (km/L) and cost per km in Bangladesh. Use our free interactive online mileage calculator.",
  keywords: [
    "how to calculate bike mileage in bangladesh",
    "bike mileage calculation formula",
    "tank to tank mileage test formula bd",
    "motorcycle mileage calculator online",
    "calculate km per liter motorcycle",
    "petrol octane mileage test dhaka",
  ],
  alternates: {
    canonical: "/how-to-calculate-bike-mileage",
  },
  openGraph: {
    title: "How to Calculate Bike Mileage in Bangladesh | MotoCare",
    description:
      "Step-by-step formula and free interactive calculator to test your bike's fuel economy in km/L.",
    url: "/how-to-calculate-bike-mileage",
  },
};

export default function HowToCalculateBikeMileagePage() {
  return (
    <SeoLandingPage
      badge="Fuel Economy Guide &amp; Tool"
      h1Title="How to Calculate Motorcycle Mileage in Bangladesh (ট্যাংক-টু-ট্যাংক পদ্ধতি)"
      subtitle="The accurate, verified method to measure your bike's actual kilometer per liter (km/L) and cost per kilometer in BDT amidst congested Bangladesh traffic."
      heroHighlight="Try the free interactive calculator widget below to check your vehicle's fuel economy instantly"
      featuresTitle="The 4-Step Tank-to-Tank Methodology"
      featuresSubtitle="Never trust the fuel gauge needle alone. Follow the gold standard in vehicle fuel telemetry."
      features={[
        {
          icon: <Fuel className="w-6 h-6" />,
          title: "Step 1: Fill Tank to the Brim",
          description:
            "Visit a trusted petrol pump. Fill your motorcycle fuel tank completely until the fuel reaches the inner neck collar.",
          tag: "Step 1",
        },
        {
          icon: <Gauge className="w-6 h-6" />,
          title: "Step 2: Reset Trip Meter to 0.0",
          description:
            "Reset Trip A on your digital speedometer to 0.0 km. If using an analog odometer, record the exact current reading (e.g. 15,200 km).",
          tag: "Step 2",
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Step 3: Ride Normally (100–200 km)",
          description:
            "Ride your normal daily routine for a few days across typical traffic conditions. Avoid artificial hypermiling to capture true real-world consumption.",
          tag: "Step 3",
        },
        {
          icon: <Calculator className="w-6 h-6" />,
          title: "Step 4: Refill & Calculate Formula",
          description:
            "Refill the tank to the exact same brim. Divide trip kilometers by liters added: Mileage (km/L) = Distance (km) ÷ Liters.",
          tag: "Step 4",
        },
        {
          icon: <Coins className="w-6 h-6" />,
          title: "Cost Per Kilometer Formula (BDT)",
          description:
            "Calculate your exact driving cost: Cost (৳/km) = Total Money Spent (৳) ÷ Distance Driven (km).",
        },
        {
          icon: <CheckCircle2 className="w-6 h-6" />,
          title: "Automate it with MotoCare",
          description:
            "Don't carry notebooks or spreadsheets. Simply log your fill-up inside the MotoCare app and let our algorithms do the math.",
        },
      ]}
      bangladeshContext={{
        title: "Factors That Skew Bike Mileage in Bangladesh",
        subtitle:
          "Understanding why your test mileage may vary across seasons and traffic zones:",
        points: [
          {
            title: "Dhaka Traffic Jam Idling",
            desc: "Idling for 1 hour at Mohakhali or Mirpur burns approximately 0.25–0.4 liters of fuel with zero distance gained.",
          },
          {
            title: "Pump Dispenser Calibration",
            desc: "Fuel dispensers at some untrustworthy pumps deliver short measures. Always test at certified franchise petrol stations.",
          },
          {
            title: "Half-Clutch Riding in Jams",
            desc: "Riding continuously in 1st/2nd gear with half-pressed clutch slips engine power and drops fuel efficiency by up to 25%.",
          },
          {
            title: "Tire Pressure Variation",
            desc: "Tire air pressure drops naturally over 2–3 weeks. Riding with 22 PSI instead of 33 PSI significantly increases rolling drag.",
          },
        ],
      }}
      faqs={[
        {
          question: "Why does my bike show 50 km/L on the highway but only 35 km/L in Dhaka?",
          answer:
            "In highway cruising, your engine operates in 5th gear at optimal RPM (4,000–5,000 RPM) with continuous momentum. In Dhaka city traffic, constant first-gear starts, brake-and-throttle cycles, and 40% idle time drastically reduce efficiency.",
        },
        {
          question: "Does Octane give better mileage than Petrol in 150cc bikes in Bangladesh?",
          answer:
            "Modern high-compression 150cc–165cc bikes (e.g. Yamaha R15, Suzuki Gixxer, Honda X-Blade) feature compression ratios above 9.5:1. They run cooler and cleaner on Octane (RON 95), giving 2–4 km/L better mileage and smoother throttle response than lower RON Petrol.",
        },
        {
          question: "How can I improve my bike's mileage by 5-10 km/L?",
          answer:
            "1. Maintain tire pressure weekly (front 28 PSI, rear 34 PSI). 2. Clean or replace your air filter every 3,000 km. 3. Clean and lube your drive chain every 500 km. 4. Avoid sudden aggressive throttle revs at traffic lights. 5. Service your carburetor or clean FI injectors on schedule.",
        },
      ]}
      relatedPages={[
        {
          title: "Fuel & Mileage Tracker App",
          href: "/fuel-mileage-tracker",
          desc: "Automate fuel calculation with our free mobile app.",
        },
        {
          title: "Bike Maintenance Schedule",
          href: "/bike-maintenance-schedule-bangladesh",
          desc: "Follow periodic service guidelines to keep mileage high.",
        },
        {
          title: "Why Bike Mileage Drops",
          href: "/blog/why-bike-mileage-drops-solutions",
          desc: "Read our comprehensive mechanical guide to diagnose fuel loss.",
        },
      ]}
    >
      {/* Interactive Live Calculator Tool */}
      <MileageCalculatorWidget />
    </SeoLandingPage>
  );
}
