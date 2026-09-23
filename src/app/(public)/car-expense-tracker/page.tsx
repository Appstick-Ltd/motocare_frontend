import React from "react";
import type { Metadata } from "next";
import {
  Car,
  PieChart,
  Wallet,
  Receipt,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

export const metadata: Metadata = {
  title: "Car Expense & Maintenance Cost Tracker in Bangladesh | MotoCare",
  description:
    "Track all private car expenses in BDT: octane, CNG, workshop repairs, driver salary, tolls, parking, and insurance. Complete vehicle cost analytics in BD.",
  keywords: [
    "car expense tracker bangladesh",
    "private car cost calculator bd",
    "car maintenance logbook",
    "track octane cng cost bangladesh",
    "car annual ownership cost bd",
    "vehicle fleet expense tracker",
  ],
  alternates: {
    canonical: "/car-expense-tracker",
  },
  openGraph: {
    title: "Car Expense & Maintenance Cost Tracker | MotoCare Bangladesh",
    description:
      "Monitor the true total cost of ownership for your private car or company fleet in Bangladesh.",
    url: "/car-expense-tracker",
  },
};

export default function CarExpenseTrackerPage() {
  return (
    <SeoLandingPage
      badge="Total Cost of Ownership"
      h1Title="The Ultimate Private Car Expense &amp; Maintenance Tracker in BD"
      subtitle="Gain complete visibility into your true car operating costs. Track Octane, CNG, workshop repairs, tolls, driver salaries, and BRTA renewals in BDT."
      heroHighlight="Visual expense categorization charts and monthly cost breakdown in Taka (৳)"
      featuresTitle="Every Vehicle Taka Accounted For"
      featuresSubtitle="From daily office commutes to long highway road trips, understand where every Rupee and Taka goes."
      features={[
        {
          icon: <Car className="w-6 h-6" />,
          title: "Dual Fuel Tracking: Octane &amp; CNG",
          description:
            "Effortlessly log both CNG cubic meters and Octane liters for converted or factory bi-fuel sedans and SUVs.",
          tag: "Bi-Fuel Support",
        },
        {
          icon: <PieChart className="w-6 h-6" />,
          title: "Visual Category Breakdown",
          description:
            "Interactive charts showing expense distribution across Fuel, Scheduled Service, Unexpected Repairs, Parking &amp; Tolls.",
          tag: "Visual Analytics",
        },
        {
          icon: <Wallet className="w-6 h-6" />,
          title: "True Cost Per KM (৳/km)",
          description:
            "Calculate your car's true cost per kilometer including fuel consumption, maintenance wear-and-tear, and paperwork fees.",
          tag: "Financial Clarity",
        },
        {
          icon: <Receipt className="w-6 h-6" />,
          title: "Workshop Invoice &amp; Parts Archive",
          description:
            "Photograph and store workshop repair bills, AC gas refilling receipts, suspension bushings, and tire replacement invoices.",
        },
        {
          icon: <FileSpreadsheet className="w-6 h-6" />,
          title: "Monthly &amp; Annual Reports",
          description:
            "Generate structured monthly expense summaries for company vehicle allowances or family financial planning.",
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Mileage Efficiency Analysis",
          description:
            "Track AC-on vs AC-off fuel variations and highway vs city efficiency to adopt smarter, fuel-saving driving habits.",
        },
      ]}
      bangladeshContext={{
        title: "Managing Escalating Car Costs in Bangladesh Cities",
        subtitle:
          "Owning a car in Bangladesh entails significant recurring expenditures beyond initial purchase price:",
        points: [
          {
            title: "Toll & Expressway Charges",
            desc: "Daily commuting on the Dhaka Elevated Expressway or Padma Bridge adds substantial monthly transit costs tracked within MotoCare.",
          },
          {
            title: "Engine Sludge from Stop-and-Go Heat",
            desc: "Sedan engines idling with continuous air conditioning degrade full synthetic oil faster than expected. Timely alerts prevent engine sludge.",
          },
          {
            title: "Suspension Maintenance on Rough Surfaces",
            desc: "Potholes and monsoon road degradation wear shock absorbers, tie rod ends, and ball joints requiring systematic inspection logs.",
          },
          {
            title: "Driver Salary & Petty Cash Tracking",
            desc: "Easily log parking allowances, washing fees, and cash given to personal drivers for accurate accountability.",
          },
        ],
      }}
      faqs={[
        {
          question: "Can I track multiple cars for my family or small business?",
          answer:
            "Yes! You can add multiple cars and assign each its own fuel type, expense logs, and maintenance alerts under one unified dashboard.",
        },
        {
          question: "How do I calculate cost per kilometer for my car?",
          answer:
            "MotoCare divides your total logged expenses (fuel + repairs + consumables) by total kilometers traveled, giving an accurate cost-per-kilometer figure in BDT.",
        },
        {
          question: "Can I export my car expense records to Excel or PDF?",
          answer:
            "Yes, you can view and export clean summaries of your vehicle expenses, service history, and fuel logs anytime.",
        },
      ]}
      relatedPages={[
        {
          title: "Fuel & Mileage Tracker",
          href: "/fuel-mileage-tracker",
          desc: "Calculate octane and CNG consumption with real-time mileage stats.",
        },
        {
          title: "BRTA Tax & Fitness Reminder",
          href: "/tax-insurance-fitness-reminder",
          desc: "Avoid hefty BRTA fines with automated tax token and fitness expiration alerts.",
        },
        {
          title: "Vehicle Service History Log",
          href: "/vehicle-service-history",
          desc: "Keep a digital service portfolio to maximize your car's resale value.",
        },
      ]}
    />
  );
}
