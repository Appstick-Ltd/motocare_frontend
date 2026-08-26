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
  Bot,
  Car,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
  ArrowRight,
  HelpCircle,
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

// ── Architecture Pipeline Flow ──────────────────────────────────────────────

const pipelineSteps = [
  {
    step: "01",
    title: "Vehicle Data",
    desc: "VIN, number plate, brand, engine specs, mileage & multi-vehicle garage profile.",
    icon: Car,
    color: "#3B82F6",
  },
  {
    step: "02",
    title: "Smart Tracking",
    desc: "Log engine oil, fuel fill-ups, parts replacements, invoices & cost per km.",
    icon: Activity,
    color: "#10B981",
  },
  {
    step: "03",
    title: "Proactive Reminders",
    desc: "Mileage & date triggers for oil due, fitness, tax permit, insurance & battery lifecycle.",
    icon: Bell,
    color: "#EB8D00",
  },
  {
    step: "04",
    title: "Predictive Health",
    desc: "Calculates tire wear, component degradation & warns before breakdown occurs.",
    icon: TrendingUp,
    color: "#8B5CF6",
  },
  {
    step: "05",
    title: "AI Assistant",
    desc: "Interactive conversational vehicle intelligence for maintenance questions & advice.",
    icon: Bot,
    color: "#EC4899",
  },
];

// ── Core Modules Data ────────────────────────────────────────────────────────

const allModules = [
  {
    icon: Car,
    title: "Multiple Vehicle Management",
    desc: "Add your family or commercial bikes, cars & fleets. Track brand, model, year, VIN/Chassis, number plates, engine details, and mileage separately.",
    color: "#3B82F6",
    tag: "Garage Profile",
  },
  {
    icon: Wrench,
    title: "Maintenance Management",
    desc: "Engine oil, brake pads, tire replacement, battery health, air/fuel filters, coolant, and custom servicing intervals with workshop invoice storage.",
    color: "#EB8D00",
    tag: "Service Center",
  },
  {
    icon: Bell,
    title: "Smart Date & Mileage Reminders",
    desc: "Automatic push alerts for upcoming service dues, engine oil expiration, fitness certificate, road tax renewal, insurance expiry, and battery checks.",
    color: "#10B981",
    tag: "Proactive Alerts",
  },
  {
    icon: Clock,
    title: "Complete Service History",
    desc: "Know exactly what was serviced, on which date, at what odometer reading, cost incurred, mechanic notes, and which workshop performed the work.",
    color: "#F59E0B",
    tag: "Digital Logbook",
  },
  {
    icon: Fuel,
    title: "Fuel Tracking & Mileage (km/L)",
    desc: "Record fill-ups, liters, fuel price, total bill, and calculate real-time fuel efficiency (km per liter) with consumption trend charts.",
    color: "#06B6D4",
    tag: "Fuel Economy",
  },
  {
    icon: FileSpreadsheet,
    title: "Expense Breakdown & Cost per KM",
    desc: "Categorized financial dashboards showing maintenance costs, fuel spend, repair bills, parts replacement, insurance fees, and monthly/yearly summaries.",
    color: "#8B5CF6",
    tag: "Financial Analytics",
  },
  {
    icon: ShieldCheck,
    title: "Digital Document Vault",
    desc: "Store vehicle registration smart cards, insurance papers, tax receipts, driving license, and warranty cards safely with cloud backup.",
    color: "#14B8A6",
    tag: "Secure Vault",
  },
  {
    icon: Bot,
    title: "AI Maintenance Assistant",
    desc: "Ask anything about your vehicle: 'When is my next service?', 'What does this dashboard warning mean?', 'What to inspect at 15,000 km?'.",
    color: "#EC4899",
    tag: "AI Intelligence",
  },
  {
    icon: Activity,
    title: "Vehicle Health Overview",
    desc: "Instant vehicle health score, overdue maintenance indicators, tire condition rating, battery life status, and proactive risk mitigations.",
    color: "#EF4444",
    tag: "Live Diagnostics",
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
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden" suppressHydrationWarning>
      {/* ── Background Glow Effects ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-orange-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[35%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-[65%] -right-40 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl" />
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
                Vehicle Management & Maintenance Assistant
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#pipeline" className="hover:text-orange-400 transition-colors">
              How It Works
            </a>
            <a href="#modules" className="hover:text-orange-400 transition-colors">
              Features
            </a>
            <a href="#ai-assistant" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-orange-400 font-semibold">
              <Bot className="w-3.5 h-3.5" /> AI Assistant
            </a>
            <a href="#vehicles" className="hover:text-orange-400 transition-colors">
              Bikes & Cars
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
              <span>Get Free App</span>
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
            <span>Complete Vehicle Management + Predictive AI Maintenance Assistant</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeUpDelayed(0.12)}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            Your Complete Vehicle Care. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Driven by AI Intelligence.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpDelayed(0.2)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            MotoCare is more than just a record keeper. From mileage & fuel tracking to smart service reminders, digital document vaults, and proactive AI diagnostics — it understands what your vehicle needs before breakdowns happen.
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
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Vehicle Garage
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Date & Mileage Reminders
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fuel Economy (km/L)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Conversational AI Assistant
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
                <span>Live Telemetry & AI Analytics</span>
              </div>

              {/* Floating bottom feature pill */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Continuous Lifecycle Management</h4>
                    <p className="text-xs text-slate-300">Vehicle Data → Smart Tracking → Reminders → Predictive Analytics → AI Assistance</p>
                  </div>
                </div>
                <a
                  href="#pipeline"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-colors shrink-0 shadow-md"
                >
                  See Architecture Flow
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

      {/* ── CORE DIFFERENTIATOR PIPELINE ARCHITECTURE ── */}
      <section id="pipeline" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <InView className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              The MotoCare Differentiator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Beyond Simple Record Keeping
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              MotoCare doesn&apos;t just store your data — it proactively calculates maintenance degradation, triggers timely warnings, and gives AI-guided insights before problems turn into costly repairs.
            </p>
          </InView>

          {/* 5-Step Pipeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pipelineSteps.map((item, idx) => (
              <InView key={idx} variants={fadeUpDelayed(idx * 0.08)}>
                <div className="relative rounded-2xl p-5 bg-slate-900/70 border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-md"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        {item.step}
                      </span>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  {idx < pipelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL CORE MODULES FEATURE GRID ── */}
      <section id="modules" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <InView className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Complete Feature Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Engineered for Total Vehicle Peace of Mind
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Comprehensive modules covering every aspect of vehicle ownership, maintenance, fuel economics, and legal compliance.
            </p>
          </InView>

          <InViewStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((m, idx) => (
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
                        background: `${m.color}15`,
                        border: `1px solid ${m.color}30`,
                      }}
                    >
                      <m.icon className="w-6 h-6" style={{ color: m.color }} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </InViewStagger>
        </div>
      </section>

      {/* ── AI VEHICLE ASSISTANT SPOTLIGHT ── */}
      <section id="ai-assistant" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left text column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 border border-pink-500/25 text-pink-400">
                <Bot className="w-4 h-4" />
                <span>Next-Gen Conversational Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Meet MotoCare AI: <br />
                Your 24/7 Virtual Mechanic & Advisor
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Got a question about your car or motorcycle? MotoCare AI analyzes your specific vehicle model, year, driving habits, and current mileage to deliver instant, personalized guidance.
              </p>

              {/* Chat question examples */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">Q:</span>
                  <span>&ldquo;When is my next engine oil & filter change due?&rdquo;</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">Q:</span>
                  <span>&ldquo;What does the yellow ABS or Check Engine warning light mean?&rdquo;</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">Q:</span>
                  <span>&ldquo;What critical parts should I inspect at 25,000 km?&rdquo;</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <AppStoreButton className="py-2 px-4" />
                <GooglePlayButton className="py-2 px-4" />
              </div>
            </div>

            {/* Right realistic AI Assistant Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-tr from-white/10 to-transparent">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] max-h-[460px]">
                  <Image
                    src="/images/ai-assistant-real.jpg"
                    alt="MotoCare AI Vehicle Health Assistant Interface"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                      MotoCare AI Health Score: 92/100
                    </span>
                    <span className="text-pink-400 font-bold">Optimal Condition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIKES & CARS REALISTIC SHOWCASE ── */}
      <section id="vehicles" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <InView className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Built for Every Ride
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Bikes, Scooters, Sedans, SUVs & Commercial
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
                Take Control of Your Ride Today
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
                <span>✓ Multi-Vehicle Support</span>
                <span>•</span>
                <span>✓ AI Assistant</span>
                <span>•</span>
                <span>✓ Offline Cloud Sync</span>
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
                The premier digital vehicle care and maintenance assistant ecosystem for motorcycle riders and car owners worldwide.
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
                  <a href="#pipeline" className="hover:text-orange-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#modules" className="hover:text-orange-400 transition-colors">
                    All Modules
                  </a>
                </li>
                <li>
                  <a href="#ai-assistant" className="hover:text-orange-400 transition-colors">
                    AI Vehicle Assistant
                  </a>
                </li>
                <li>
                  <a href="#vehicles" className="hover:text-orange-400 transition-colors">
                    Bikes & Cars
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
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500" suppressHydrationWarning>
            <p suppressHydrationWarning>© 2026 MotoCare. All rights reserved.</p>
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
