"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import {
  Wrench,
  Fuel,
  Bell,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  Shield,
  FileText,
  Info,
  Mail,
  Zap,
  Award,
  PhoneCall,
  Activity,
} from "lucide-react";

// ── App Store Badges (Pixel-Perfect Components) ──────────────────────────────

export function AppStoreButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#app-download"
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/90 hover:bg-black text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group ${className}`}
      aria-label="Download on the App Store"
    >
      <svg
        className="w-7 h-7 fill-white shrink-0 group-hover:scale-105 transition-transform"
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div className="text-left flex flex-col justify-center leading-none">
        <span className="text-[10px] text-slate-400 font-medium tracking-wide">Download on the</span>
        <span className="text-base font-bold text-white tracking-tight mt-0.5">App Store</span>
      </div>
    </a>
  );
}

export function GooglePlayButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#app-download"
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/90 hover:bg-black text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group ${className}`}
      aria-label="Get it on Google Play"
    >
      <svg
        className="w-6 h-6 shrink-0 group-hover:scale-105 transition-transform"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M48.7 18.5c-4.8 5.2-7.7 13-7.7 23v429c0 10 2.9 17.8 7.7 23l2.4 2.4L275 272v-5.8L51.1 16.1l-2.4 2.4z"
        />
        <path
          fill="#FFBA00"
          d="M350.8 347.8l-75.8-75.8V266l75.8-75.8 1.8 1 89.8 51.1c25.7 14.6 25.7 38.5 0 53.1l-89.8 51.1-1.8 1.4z"
        />
        <path
          fill="#00E676"
          d="M275 266.2L51.1 490.1c8.4 8.9 22.3 9.9 37.9 1.1l263.6-149.8-77.6-75.2z"
        />
        <path
          fill="#FF3D00"
          d="M275 266.2l77.6-75.2L89 41.2c-15.6-8.9-29.5-7.8-37.9 1.1L275 266.2z"
        />
      </svg>
      <div className="text-left flex flex-col justify-center leading-none">
        <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">GET IT ON</span>
        <span className="text-base font-bold text-white tracking-tight mt-0.5">Google Play</span>
      </div>
    </a>
  );
}

// ── Animation Variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Helper Component ────────────────────────────────────────────────────────

function InView({
  children,
  variants = fadeUp,
  className = "",
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function InViewStagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Wrench,
    title: "Service History & Logs",
    desc: "Record every maintenance, parts replacement, and oil change with dates, odometer, and invoices.",
    color: "#EB8D00",
    tag: "Maintenance",
  },
  {
    icon: Fuel,
    title: "Fuel & Mileage Analytics",
    desc: "Calculate precise fuel efficiency (km/L), track fuel spending trends, and optimize route economy.",
    color: "#3B82F6",
    tag: "Economy",
  },
  {
    icon: Bell,
    title: "Predictive Reminders",
    desc: "Automated alert schedules for engine oil, coolant, battery checks, insurance renewal, and fitness certificates.",
    color: "#10B981",
    tag: "Alerts",
  },
  {
    icon: ShieldCheck,
    title: "Digital Document Vault",
    desc: "Store vehicle registration, driving license, insurance policies, and tax receipts safely with cloud backup.",
    color: "#8B5CF6",
    tag: "Security",
  },
  {
    icon: MapPin,
    title: "Verified Service Hubs",
    desc: "Find certified mechanics, trusted workshops, and 24/7 roadside emergency breakdown assistance nearby.",
    color: "#EF4444",
    tag: "Assistance",
  },
  {
    icon: Clock,
    title: "Expense Breakdown",
    desc: "Categorized financial dashboards showing total cost of ownership, spare parts expenses, and service bills.",
    color: "#F59E0B",
    tag: "Reports",
  },
];

const stats = [
  { value: "50,000+", label: "Active Riders & Drivers" },
  { value: "250,000+", label: "Service Records Logged" },
  { value: "99.8%", label: "On-Time Service Health" },
  { value: "4.9 ★", label: "App Store & Play Store" },
];

export default function LandingPageClient() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      {/* ── Background Glow Effects ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-orange-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundSize: "32px 32px",
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070913]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="h-full w-full bg-[#0d1222] rounded-[14px] flex items-center justify-center p-1.5">
                <Image
                  src="/logo.png"
                  alt="MotoCare Logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block">
                Moto<span className="text-orange-500">Care</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Smart Vehicle Care Platform
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-orange-400 transition-colors">
              Features
            </a>
            <a href="#vehicles" className="hover:text-orange-400 transition-colors">
              Bikes & Cars
            </a>
            <a href="#emergency" className="hover:text-orange-400 transition-colors">
              Emergency SOS
            </a>
            <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
              How It Works
            </a>
            <Link href="/about-us" className="hover:text-orange-400 transition-colors">
              About Us
            </Link>
          </nav>

          {/* App Store / Google Play Mini Access */}
          <div className="flex items-center gap-2">
            <a
              href="#app-download"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 transition-all duration-200"
            >
              <Smartphone className="w-4 h-4" />
              <span>Download App</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Top Pill Badge */}
          <motion.div
            variants={fadeUpDelayed(0.05)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/25 text-orange-400 mb-6 shadow-xs backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Motorbike & Automobile Care Companion</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeUpDelayed(0.12)}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            Smarter Vehicle Maintenance. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Zero Headaches.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpDelayed(0.2)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Effortlessly monitor oil changes, track precise fuel mileage, store crucial vehicle papers, and receive predictive maintenance alerts before breakdowns happen.
          </motion.p>

          {/* ── APP STORE & GOOGLE PLAY BUTTONS (HERO) ── */}
          <motion.div
            variants={fadeUpDelayed(0.28)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AppStoreButton />
            <GooglePlayButton />
          </motion.div>

          {/* Key Metric Pills */}
          <motion.div
            variants={fadeUpDelayed(0.34)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-slate-300"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Complete Logbook
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fuel Economy Calculator
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Timely Push Reminders
            </span>
          </motion.div>

          {/* ── HERO SHOWCASE 100% REALISTIC PHOTOGRAPH ── */}
          <motion.div
            variants={fadeUpDelayed(0.4)}
            initial="hidden"
            animate="visible"
            className="mt-12 sm:mt-16 relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl shadow-orange-500/10 overflow-hidden"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] max-h-[520px]">
              <Image
                src="/images/app-mobile-hand.jpg"
                alt="MotoCare Mobile App in Workshop"
                width={1400}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913]/90 via-transparent to-black/20" />

              {/* Floating live badge */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Telemetry & Logs</span>
              </div>

              {/* Floating bottom feature pill */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Full Service & Telemetry Companion</h4>
                    <p className="text-xs text-slate-300">Instant diagnostics, fuel expense tracking, and verified service record archives</p>
                  </div>
                </div>
                <a
                  href="#app-download"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-colors shrink-0 shadow-md"
                >
                  Get Mobile App
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <InView key={idx} variants={fadeUpDelayed(idx * 0.08)}>
              <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">{s.label}</p>
            </InView>
          ))}
        </div>
      </section>

      {/* ── VEHICLE TYPES SHOWCASE (100% REALISTIC PHOTOS) ── */}
      <section id="vehicles" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <InView className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Built for Every Ride
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Bikes, Scooters, Sedans & SUVs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Customized maintenance schedule formulas tailored for both motorbikes and multi-cylinder cars.
            </p>
          </InView>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bike Card */}
            <InView>
              <div className="group rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10 hover:border-orange-500/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-md">
                    <Image
                      src="/images/bike-service-real.jpg"
                      alt="Real Motorcycle Engine Workshop Service"
                      width={700}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-md">
                      Motorbikes & Scooters
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Motorbike Care Suite</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Track chain lubrication intervals, valve clearances, tire pressure, engine oil grades, and brake fluid health with automated km-based triggers.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-medium text-slate-300">
                  <span>Engine oil · Spark plug · Air filter</span>
                  <span className="text-orange-400 font-semibold">100% Precision</span>
                </div>
              </div>
            </InView>

            {/* Car Card */}
            <InView>
              <div className="group rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10 hover:border-blue-500/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-md">
                    <Image
                      src="/images/car-service-real.jpg"
                      alt="Real Automotive Workshop Diagnostic"
                      width={700}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                      Sedans, SUVs & Fleets
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Car & Fleet Management</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Comprehensive logbook for coolant flushes, transmission oils, battery diagnostics, wheel alignment, periodic AC service, and road fitness renewals.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-medium text-slate-300">
                  <span>OBD logs · Suspension · Insurance</span>
                  <span className="text-blue-400 font-semibold">Full Telemetry</span>
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── 24/7 EMERGENCY & ROADSIDE REALISTIC SECTION ── */}
      <section id="emergency" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left text column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/25 text-red-400">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 Emergency Assistance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Never Stranded on the Road Again
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect with verified mechanics, towing recovery vans, battery jumpstarters, and puncture repair specialists with a single tap in the MotoCare app.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>Instant GPS location sharing with nearest tow trucks</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>Transparent fixed repair pricing with zero surge fees</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>Verified workshops across national highways and cities</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <AppStoreButton className="py-2 px-4" />
                <GooglePlayButton className="py-2 px-4" />
              </div>
            </div>

            {/* Right realistic image column */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-tr from-white/10 to-transparent">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
                  <Image
                    src="/images/emergency-assistance-real.jpg"
                    alt="Realistic Roadside Emergency Rescue Vehicle"
                    width={800}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs text-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Highway & Citywide Breakdown Network
                    </span>
                    <span className="text-orange-400 font-bold">24/7 Live Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES ── */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <InView className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Powerful Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Everything Your Vehicle Needs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Purpose-built tools to maximize engine longevity, improve fuel mileage, and preserve trade-in value.
            </p>
          </InView>

          <InViewStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                variants={cardItem}
                className="group relative rounded-2xl p-6 bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${f.color}15`,
                        border: `1px solid ${f.color}30`,
                      }}
                    >
                      <f.icon className="w-6 h-6" style={{ color: f.color }} />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </InViewStagger>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <InView className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Effortless Setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Ready in Under 60 Seconds
            </h2>
          </InView>

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "Download MotoCare & Add Vehicle",
                desc: "Choose your motorbike or car brand, model, year, and starting odometer reading.",
              },
              {
                num: "02",
                title: "Log Maintenance, Repairs & Fuel Invoices",
                desc: "Quickly record workshop receipts, fuel volume, costs, and replaced components.",
              },
              {
                num: "03",
                title: "Enjoy Timely Reminders & Instant Peace of Mind",
                desc: "MotoCare calculates ideal service schedules and notifies you before critical thresholds are reached.",
              },
            ].map((step, idx) => (
              <InView key={idx} variants={fadeUpDelayed(idx * 0.1)}>
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-6 hover:border-orange-500/30 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-lg shadow-lg shadow-orange-500/20">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET APP PROMO BANNER WITH STORE BADGES ── */}
      <section id="app-download" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <InView className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 shadow-2xl text-white">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/20 border border-white/15 mb-4">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Download MotoCare Mobile</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Get the App on iOS & Android
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
                Join thousands of motorcycle enthusiasts and car owners who maintain peak performance with MotoCare.
              </p>

              {/* STORE BADGES */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <AppStoreButton className="bg-black/90 hover:bg-black" />
                <GooglePlayButton className="bg-black/90 hover:bg-black" />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-white/80">
                <span>✓ Free Cloud Sync</span>
                <span>•</span>
                <span>✓ Offline Support</span>
                <span>•</span>
                <span>✓ Instant Service Reminders</span>
              </div>
            </div>
          </div>
        </InView>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#05070d] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5">
                  <div className="h-full w-full bg-[#0d1222] rounded-[10px] flex items-center justify-center p-1">
                    <Image
                      src="/logo.png"
                      alt="MotoCare"
                      width={32}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <span className="font-extrabold text-xl text-white">
                  Moto<span className="text-orange-500">Care</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                The premier digital vehicle care and maintenance ecosystem for motorcycle riders and car owners worldwide.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>support@motocare.app</span>
              </div>

              {/* Footer store badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <AppStoreButton className="py-2 px-4 !rounded-xl" />
                <GooglePlayButton className="py-2 px-4 !rounded-xl" />
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#features" className="hover:text-orange-400 transition-colors">
                    Features & Modules
                  </a>
                </li>
                <li>
                  <a href="#vehicles" className="hover:text-orange-400 transition-colors">
                    Bike & Car Care
                  </a>
                </li>
                <li>
                  <a href="#emergency" className="hover:text-orange-400 transition-colors">
                    Emergency Roadside SOS
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                    About MotoCare
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Compliance */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Legal & Privacy
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-orange-400" /> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-condition"
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-400" /> About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom attribution bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} MotoCare. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span>A product of</span>
              <a
                href="https://shopstick.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-400 hover:text-orange-400 transition-colors"
              >
                Shopstick
              </a>
              <span>•</span>
              <span>Powered by</span>
              <a
                href="https://appstick.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-400 hover:text-orange-400 transition-colors"
              >
                Appstick Ltd
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
