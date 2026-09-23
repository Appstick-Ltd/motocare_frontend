import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  BookOpen,
  Calculator,
  Mail,
  MessageCircle,
  MapPin,
  Sparkles,
} from "lucide-react";
import { GooglePlayButton } from "@/components/landing/LandingPageClient";

export default function PublicContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white"
      suppressHydrationWarning
    >
      {/* Public Navbar */}
      <header
        className="border-b border-white/10 bg-[#07090F]/90 backdrop-blur-xl sticky top-0 z-40"
        suppressHydrationWarning
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4"
          suppressHydrationWarning
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-[#0a0d17] rounded-[10px] flex items-center justify-center p-1.5">
                <Image
                  src="/logo.png"
                  alt="MotoCare Logo"
                  width={30}
                  height={30}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5 uppercase">
                MOTO <span className="text-orange-500">CARE</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Fuel, Mileage &amp; Vehicle Care</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link
              href="/fuel-mileage-tracker"
              className="hover:text-orange-400 transition-colors"
            >
              Fuel Tracker
            </Link>
            <Link
              href="/vehicle-service-reminder"
              className="hover:text-orange-400 transition-colors"
            >
              Service Reminder
            </Link>
            <Link
              href="/tax-insurance-fitness-reminder"
              className="hover:text-orange-400 transition-colors"
            >
              BRTA Renewal
            </Link>
            <Link
              href="/how-to-calculate-bike-mileage"
              className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-amber-400 font-semibold"
            >
              <Calculator className="w-3.5 h-3.5" /> Mileage Tool
            </Link>
            <Link
              href="/blog"
              className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" /> Blog
            </Link>
          </nav>

          {/* Download CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get App</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#04060A] py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 text-left">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-0.5 shadow-md shadow-orange-500/20">
                  <div className="h-full w-full bg-[#0a0d17] rounded-[10px] flex items-center justify-center p-1">
                    <Image
                      src="/logo.png"
                      alt="MotoCare Logo"
                      width={28}
                      height={28}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-base text-white uppercase tracking-tight">
                    MOTO <span className="text-orange-500">CARE</span>
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium -mt-0.5">
                    Vehicle Telemetry &amp; Care
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                The smart fuel, mileage, and vehicle maintenance companion built for riders and car drivers in Bangladesh.
              </p>
              <div className="pt-2">
                <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare" />
              </div>
            </div>

            {/* Solutions */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Vehicle Solutions
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/fuel-mileage-tracker" className="hover:text-orange-400 transition-colors">
                    Fuel &amp; Mileage Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/vehicle-service-reminder" className="hover:text-orange-400 transition-colors">
                    Engine Oil &amp; Service Reminder
                  </Link>
                </li>
                <li>
                  <Link href="/tax-insurance-fitness-reminder" className="hover:text-orange-400 transition-colors">
                    BRTA Tax &amp; Fitness Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/motorcycle-maintenance-app" className="hover:text-orange-400 transition-colors">
                    Motorcycle Care App BD
                  </Link>
                </li>
                <li>
                  <Link href="/car-expense-tracker" className="hover:text-orange-400 transition-colors">
                    Car Expense Tracker BD
                  </Link>
                </li>
                <li>
                  <Link href="/vehicle-service-history" className="hover:text-orange-400 transition-colors">
                    Digital Service History
                  </Link>
                </li>
              </ul>
            </div>

            {/* Guides & Tools */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Guides &amp; Tools
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/how-to-calculate-bike-mileage" className="hover:text-orange-400 transition-colors font-medium text-amber-400">
                    Mileage Calculator Tool
                  </Link>
                </li>
                <li>
                  <Link href="/bike-maintenance-schedule-bangladesh" className="hover:text-orange-400 transition-colors">
                    Bike Service Schedule
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-orange-400 transition-colors font-semibold text-slate-300">
                    All Guides &amp; Blog
                  </Link>
                </li>
                <li>
                  <Link href="/blog/brta-vehicle-document-renewal-guide" className="hover:text-orange-400 transition-colors">
                    BRTA Renewal Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog/why-bike-mileage-drops-solutions" className="hover:text-orange-400 transition-colors">
                    Why Mileage Drops (Fix)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Support &amp; Contact
              </h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <a
                  href="mailto:motocare@appstick.com.bd"
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>motocare@appstick.com.bd</span>
                </a>
                <a
                  href="https://wa.me/8801404049797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+880 1404-049797 (WhatsApp)</span>
                </a>
                <div className="flex items-start gap-2 pt-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} MotoCare. A Product of Appstick Ltd.</p>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
              <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-condition" className="hover:text-orange-400 transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>•</span>
              <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
