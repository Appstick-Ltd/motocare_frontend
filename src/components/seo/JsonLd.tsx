import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const motocareSoftwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MotoCare",
  alternateName: "MotoCare Vehicle Maintenance & Fuel Tracker",
  operatingSystem: "Android, iOS",
  applicationCategory: "UtilityApplication",
  applicationSubCategory: "Vehicle Management, Fuel & Mileage Tracker",
  description:
    "The all-in-one vehicle care and fuel management app for motorcycle and car owners in Bangladesh. Track fuel logs, mileage (km/L), engine oil service intervals, and BRTA tax token/fitness renewal deadlines.",
  image: "https://motocare.appstick.com.bd/logo.png",
  url: "https://motocare.appstick.com.bd",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BDT",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Organization",
    name: "Appstick Ltd",
    url: "https://appstick.com.bd",
  },
  installUrl:
    "https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare",
  featureList: [
    "Fuel & Mileage Tracking with BDT cost per kilometer",
    "Smart Engine Oil & Filter Change Periodic Reminders",
    "Bangladesh BRTA Tax Token, Fitness & Insurance Expiry Tracker",
    "Complete Vehicle Service History and Maintenance Digital Logbook",
    "Real-time expense reports with visual charts and analytics",
  ],
};

export const motocareOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MotoCare",
  url: "https://motocare.appstick.com.bd",
  logo: "https://motocare.appstick.com.bd/logo.png",
  parentOrganization: {
    "@type": "Organization",
    name: "Appstick Ltd",
    url: "https://appstick.com.bd",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+8801404049797",
    contactType: "customer support",
    areaServed: "BD",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: [
    "https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare",
  ],
};
