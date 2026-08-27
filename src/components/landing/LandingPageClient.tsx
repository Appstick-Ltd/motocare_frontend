"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Calendar,
  ClipboardCheck,
  Wallet,
  Car,
  ShieldCheck,
  PieChart,
  Bell,
  Wrench,
  FileText,
  Users,
  Bike,
  Shield,
  ArrowRight,
  Download,
  Star,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Mail,
  Send,
  X,
  Smartphone,
  TrendingUp,
  Activity,
  Check,
  Clock,
  Fuel,
} from "lucide-react";

// ── Super-Fast, Butter-Smooth Animation Variants ────────────────────────────

const fadeUpSnappy: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpDelayedSnappy = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardItemFast: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Motion Wrapper Component ────────────────────────────────────────────────

function InView({
  children,
  variants = fadeUpSnappy,
  className = "",
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
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
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Pixel-Perfect Official App Store & Google Play Badges ───────────────────

export function GooglePlayButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center gap-3.5 px-5 py-2.5 sm:py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-white/20 hover:border-orange-500/60 shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] transition-all duration-150 group cursor-pointer ${className}`}
      aria-label="Get it on Google Play"
    >
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 group-hover:scale-105 transition-transform duration-150"
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
        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">GET IT ON</span>
        <span className="text-sm sm:text-base font-bold text-white tracking-tight mt-1">Google Play</span>
      </div>
    </button>
  );
}

export function AppStoreButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center gap-3.5 px-5 py-2.5 sm:py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-white/20 hover:border-orange-500/60 shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] transition-all duration-150 group cursor-pointer ${className}`}
      aria-label="Download on the App Store"
    >
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 fill-white shrink-0 group-hover:scale-105 transition-transform duration-150"
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div className="text-left flex flex-col justify-center leading-none">
        <span className="text-[10px] text-slate-400 font-medium tracking-wide">Download on the</span>
        <span className="text-sm sm:text-base font-bold text-white tracking-tight mt-1">App Store</span>
      </div>
    </button>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function LandingPageClient() {
  const [activeNav, setActiveNav] = useState("home");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Smooth active nav observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "how-it-works", "benefits", "testimonials", "download"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#05060A] text-slate-100 font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden"
      suppressHydrationWarning
    >
      {/* ── Ambient Background Lighting ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" suppressHydrationWarning>
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-orange-500/20 via-orange-600/5 to-transparent rounded-full blur-[140px] opacity-80" />
        <div className="absolute top-[35%] -left-60 w-[550px] h-[550px] bg-orange-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] -right-60 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          }}
        />
      </div>

      {/* ── 1. NAVBAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#05060A]/80 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-200"
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="h-full w-full bg-[#0a0d17] rounded-[14px] flex items-center justify-center p-1.5">
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
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase">
                  MOTO <span className="text-orange-500">CARE</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight -mt-0.5">
                Smart Care. Smooth Ride.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-slate-300">
            {[
              { id: "home", label: "Home" },
              { id: "features", label: "Features" },
              { id: "how-it-works", label: "How It Works" },
              { id: "benefits", label: "Benefits" },
              { id: "testimonials", label: "Testimonials" },
              { id: "download", label: "Download" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 transition-colors duration-150 hover:text-white ${
                  activeNav === item.id ? "text-orange-500 font-semibold" : "text-slate-300"
                }`}
              >
                {item.label}
                {activeNav === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Download App Top Right Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              <span>Download App</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Download className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. HERO SECTION (100% Matching Reference Design with Dual Angled Mockups & Vehicles) ── */}
      <section id="home" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 z-10" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-6 items-center">
            {/* Left Column: Headline & Official Store Badges */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Badge: YOUR RIDE, OUR CARE */}
              <InView>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-orange-400 border border-orange-500/40 bg-orange-500/10 shadow-sm backdrop-blur-md">
                  YOUR RIDE, OUR CARE
                </div>
              </InView>

              {/* Main Headline */}
              <InView variants={fadeUpDelayedSnappy(0.05)}>
                <h1 className="text-4xl sm:text-6xl lg:text-[58px] font-extrabold tracking-tight leading-[1.08] text-white">
                  Smart Care. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500">
                    Smooth Ride.
                  </span>
                </h1>
              </InView>

              {/* Subtitle */}
              <InView variants={fadeUpDelayedSnappy(0.1)}>
                <p className="text-base sm:text-lg text-slate-300 max-w-md leading-relaxed font-normal">
                  All-in-one vehicle management app to track maintenance, manage expenses, and keep your ride in perfect condition.
                </p>
              </InView>

              {/* Side-by-Side Official Google Play & App Store Badges */}
              <InView variants={fadeUpDelayedSnappy(0.15)}>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <GooglePlayButton onClick={() => setIsDownloadModalOpen(true)} />
                  <AppStoreButton onClick={() => setIsDownloadModalOpen(true)} />
                </div>
              </InView>

              {/* Feature Bullet Points */}
              <InView variants={fadeUpDelayedSnappy(0.2)}>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Cloud Backup
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Alerts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Vehicle Support
                  </span>
                </div>
              </InView>
            </div>

            {/* Right Column: Animated Realistic 19.5:9 Dual Mobile Screens */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
              {/* Background Ambient Breathing Glow */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-orange-500/25 via-amber-500/15 to-transparent rounded-full blur-[140px] pointer-events-none"
              />

              <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-6 py-2">
                {/* ── PHONE 1 (Primary Foreground Phone - Live Animated 19.5:9 iPhone) ── */}
                <motion.div
                  initial={{ opacity: 0, y: 24, rotate: -2 }}
                  animate={{
                    opacity: 1,
                    y: [0, -10, 0],
                    rotate: [-1.5, -2.2, -1.5],
                  }}
                  transition={{
                    opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="relative z-20 w-[275px] sm:w-[305px] h-[560px] sm:h-[590px] rounded-[48px] p-2.5 sm:p-3 bg-neutral-900 border-[4px] border-slate-700/90 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.95)] backdrop-blur-xl shrink-0 flex flex-col group cursor-default"
                >
                  {/* Dark UI Screen with 100% height */}
                  <div className="rounded-[38px] bg-[#0A0D16] text-white p-3.5 border border-white/10 shadow-inner overflow-hidden text-left flex flex-col justify-between h-full relative">
                    {/* Subtle Screen Ambient Reflection */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-500/10 via-transparent to-transparent pointer-events-none rounded-tr-[38px]" />

                    {/* Top Section */}
                    <div>
                      {/* Dynamic Island / Status Bar */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pb-2">
                        <span>9:31</span>
                        {/* Dynamic Island with Live Indicator */}
                        <div className="w-22 h-4.5 bg-black rounded-full mx-auto flex items-center justify-between px-2 shadow-inner border border-white/5">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[7.5px] text-emerald-400 font-mono font-bold leading-none">LIVE</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                        </div>
                        <div className="flex items-center gap-1 text-[9px]">
                          <span>5G</span>
                          <span className="w-2.5 h-1.5 rounded-xs bg-white/80 inline-block" />
                        </div>
                      </div>

                      {/* App Header: My Vehicles & Orange + Button */}
                      <div className="flex items-center justify-between mt-1 mb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-0.5">
                            <span className="w-3.5 h-0.5 bg-slate-300 rounded-full" />
                            <span className="w-3.5 h-0.5 bg-slate-300 rounded-full" />
                            <span className="w-2.5 h-0.5 bg-slate-300 rounded-full" />
                          </div>
                          <span className="text-xs font-black text-white">My Vehicles</span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-orange-500/40 cursor-pointer"
                        >
                          +
                        </motion.div>
                      </div>

                      {/* Vehicle Card: Yamaha R15 V4 */}
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-2xl bg-gradient-to-br from-white to-slate-100 text-slate-900 shadow-md flex items-center justify-between gap-2 mb-3 border border-white/60 relative overflow-hidden"
                      >
                        {/* Shimmer sweep */}
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                        />

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-black text-slate-900 leading-tight">Yamaha R15 V4</h4>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[7.5px] bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ready
                            </span>
                          </div>
                          <div className="mt-1.5 space-y-0.5 text-[9px] text-slate-600 font-semibold">
                            <p className="flex items-center gap-1">
                              📅 <span>2023 Edition</span>
                            </p>
                            <p className="flex items-center gap-1">
                              ⏱️ <span className="font-bold text-slate-800">12,450 km</span>
                            </p>
                          </div>
                        </div>
                        <div className="w-20 h-13 relative rounded-lg overflow-hidden shrink-0 shadow-xs">
                          <Image
                            src="/images/yamaha-r15.jpg"
                            alt="Yamaha R15"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </motion.div>

                      {/* Upcoming Reminders Section */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-200">Upcoming Reminders</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                          </div>
                          <span className="text-[9px] font-bold text-orange-400 hover:underline cursor-pointer">View All</span>
                        </div>

                        {/* Reminder 1: Engine Oil (Urgent / Animated) */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          animate={{ borderColor: ["rgba(249,115,22,0.3)", "rgba(249,115,22,0.8)", "rgba(249,115,22,0.3)"] }}
                          transition={{ duration: 2.2, repeat: Infinity }}
                          className="p-2.5 rounded-xl bg-white text-slate-900 shadow-sm flex items-center justify-between border-2 border-orange-500/40 relative overflow-hidden"
                        >
                          <div className="flex items-center gap-2.5">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.8, repeat: Infinity }}
                              className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/40 text-white"
                            >
                              <Fuel className="w-3.5 h-3.5" />
                            </motion.div>
                            <div>
                              <p className="text-[10px] font-black text-slate-900 leading-none">Engine Oil Change</p>
                              <p className="text-[8px] text-orange-600 font-bold mt-0.5 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-orange-500 inline-block" /> Due in 5 days
                              </p>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            ⏱️ 12,500 km
                          </span>
                        </motion.div>

                        {/* Reminder 2: Chain Cleaning */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="p-2.5 rounded-xl bg-white text-slate-900 shadow-sm flex items-center justify-between border border-slate-100"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/30 text-white">
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-900 leading-none">Chain Cleaning</p>
                              <p className="text-[8px] text-slate-500 font-semibold mt-0.5">Due in 12 days</p>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            ⏱️ 12,800 km
                          </span>
                        </motion.div>

                        {/* Reminder 3: General Service */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="p-2.5 rounded-xl bg-white text-slate-900 shadow-sm flex items-center justify-between border border-slate-100"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-600/30 text-white">
                              <Wrench className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-900 leading-none">General Service</p>
                              <p className="text-[8px] text-slate-500 font-semibold mt-0.5">Due in 18 days</p>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            ⏱️ 13,000 km
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Section: Navigation Bar & Home Indicator */}
                    <div className="pt-2 border-t border-white/10 mt-2">
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-400">
                        <span className="text-orange-400 flex flex-col items-center relative">
                          <Activity className="w-3.5 h-3.5 text-orange-400" />
                          <span>Home</span>
                          <span className="w-1 h-1 rounded-full bg-orange-400 mt-0.5" />
                        </span>
                        <span className="flex flex-col items-center hover:text-slate-200 cursor-pointer">
                          <Bell className="w-3.5 h-3.5" /> Reminders
                        </span>
                        <span className="flex flex-col items-center hover:text-slate-200 cursor-pointer">
                          <Wallet className="w-3.5 h-3.5" /> Expenses
                        </span>
                        <span className="flex flex-col items-center hover:text-slate-200 cursor-pointer">
                          <FileText className="w-3.5 h-3.5" /> History
                        </span>
                        <span className="flex flex-col items-center hover:text-slate-200 cursor-pointer">
                          <Users className="w-3.5 h-3.5" /> More
                        </span>
                      </div>
                      {/* iPhone Home Bar */}
                      <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2" />
                    </div>
                  </div>
                </motion.div>

                {/* ── PHONE 2 (Secondary Phone - Live Expense Overview & Animated Chart) ── */}
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: 3 }}
                  animate={{
                    opacity: 1,
                    y: [-10, 4, -10],
                    rotate: [2.5, 3.2, 2.5],
                  }}
                  transition={{
                    opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="hidden md:flex flex-col relative z-10 -ml-16 lg:-ml-12 w-[260px] sm:w-[285px] h-[530px] sm:h-[560px] rounded-[46px] p-2.5 sm:p-3 bg-neutral-950 border-[4px] border-slate-700/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9)] shrink-0 group cursor-default"
                >
                  <div className="rounded-[36px] bg-[#070913] text-white p-3.5 border border-white/10 shadow-inner overflow-hidden text-left flex flex-col justify-between h-full relative">
                    {/* Subtle Reflection */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-tr-[36px]" />

                    {/* Top Section */}
                    <div>
                      {/* Status Bar */}
                      <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold pb-2">
                        <span>9:31</span>
                        <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
                        <span>100%</span>
                      </div>

                      {/* Expense Header */}
                      <div className="flex items-center gap-1 text-xs font-bold text-white mb-2">
                        <span className="text-slate-400">&lt;</span>
                        <span>Expense Overview</span>
                      </div>

                      {/* This Month Total with Animated Trend */}
                      <div className="mb-1 flex items-end justify-between">
                        <div>
                          <span className="text-[8px] text-slate-400 font-medium">This Month</span>
                          <div className="text-xl font-black text-white tracking-tight">৳ 4,850</div>
                        </div>
                        <span className="inline-flex items-center gap-0.5 text-[8.5px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                          <TrendingUp className="w-2.5 h-2.5" /> +12%
                        </span>
                      </div>

                      {/* Glowing Orange Line Graph with Animated Pulsing Data Points */}
                      <div className="h-16 w-full relative my-1.5">
                        <svg className="w-full h-full" viewBox="0 0 200 65" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="neonGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF5E13" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#FF5E13" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,50 Q30,55 55,42 T110,25 T155,14 T200,32 L200,65 L0,65 Z"
                            fill="url(#neonGrad)"
                          />
                          <path
                            d="M0,50 Q30,55 55,42 T110,25 T155,14 T200,32"
                            fill="none"
                            stroke="#FF5E13"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          {/* Pulsing Target Point on May */}
                          <circle cx="155" cy="14" r="7" fill="#FF5E13" opacity="0.3" className="animate-ping" />
                          <circle cx="155" cy="14" r="3.5" fill="#FF5E13" className="shadow-lg shadow-orange-500" />
                        </svg>
                        <div className="flex justify-between text-[7px] text-slate-500 font-mono mt-0.5">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span className="text-orange-400 font-bold">May</span>
                          <span>Jun</span>
                        </div>
                      </div>

                      {/* Recent Expenses List with Hover Interactions */}
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[9px] font-bold text-slate-200">Recent Expenses</span>
                          <span className="text-[8px] font-bold text-orange-400 hover:underline cursor-pointer">View All</span>
                        </div>

                        {/* Expense Item 1 */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="p-2 rounded-xl bg-white text-slate-900 flex items-center justify-between shadow-xs border border-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-red-100 text-red-600 flex items-center justify-center text-[9px] font-bold">
                              🛢️
                            </div>
                            <div>
                              <p className="text-[9px] font-bold leading-none">Engine Oil</p>
                              <p className="text-[7px] text-slate-500 mt-0.5">20 May 2024</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-900">৳ 1,200</span>
                        </motion.div>

                        {/* Expense Item 2 */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="p-2 rounded-xl bg-white text-slate-900 flex items-center justify-between shadow-xs border border-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center text-[9px] font-bold">
                              ⚙️
                            </div>
                            <div>
                              <p className="text-[9px] font-bold leading-none">Oil Filter</p>
                              <p className="text-[7px] text-slate-500 mt-0.5">20 May 2024</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-900">৳ 450</span>
                        </motion.div>

                        {/* Expense Item 3 */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="p-2 rounded-xl bg-white text-slate-900 flex items-center justify-between shadow-xs border border-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center text-[9px] font-bold">
                              🔗
                            </div>
                            <div>
                              <p className="text-[9px] font-bold leading-none">Chain Lube</p>
                              <p className="text-[7px] text-slate-500 mt-0.5">18 May 2024</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-900">৳ 300</span>
                        </motion.div>

                        {/* Expense Item 4 */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          className="p-2 rounded-xl bg-white text-slate-900 flex items-center justify-between shadow-xs border border-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold">
                              🛠️
                            </div>
                            <div>
                              <p className="text-[9px] font-bold leading-none">Service</p>
                              <p className="text-[7px] text-slate-500 mt-0.5">15 May 2024</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-900">৳ 2,900</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Home Indicator */}
                    <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURE QUICK BAR (6-ITEM HORIZONTAL RIBBON) ── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 relative z-20" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          <InView>
            <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
                {[
                  { icon: Calendar, title: "Smart\nReminders", href: "#features" },
                  { icon: ClipboardCheck, title: "Maintenance\nTracking", href: "#features" },
                  { icon: Wallet, title: "Expense\nTracker", href: "#features" },
                  { icon: Car, title: "Service\nHistory", href: "#features" },
                  { icon: ShieldCheck, title: "Manage\nVehicles", href: "#features" },
                  { icon: PieChart, title: "Detailed\nReports", href: "#features" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-150 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500 group-hover:bg-orange-500/20 transition-all duration-150 shadow-md">
                      <item.icon className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                    </div>
                    <span className="mt-2.5 text-xs font-bold text-slate-200 group-hover:text-orange-400 transition-colors whitespace-pre-line leading-tight">
                      {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE MOTOCARE? (5 CORE CARDS) ── */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <InView className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
              WHY CHOOSE MOTOCARE?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 leading-tight">
              Everything You Need, <br />
              <span className="text-orange-500">All in One Place</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              MotoCare makes vehicle care simple, organized and stress-free.
            </p>
          </InView>

          {/* 5 Distinct Feature Cards Grid */}
          <InViewStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                icon: Bell,
                title: "On-time Reminders",
                desc: "Never miss an important service or inspection again.",
              },
              {
                icon: Wrench,
                title: "Track Maintenance",
                desc: "Keep a complete log of all your vehicle maintenance.",
              },
              {
                icon: Wallet,
                title: "Expense Management",
                desc: "Track expenses and save more on your ride.",
              },
              {
                icon: FileText,
                title: "Service History",
                desc: "Get full history for better resale value and performance.",
              },
              {
                icon: Car,
                title: "Multi-Vehicle",
                desc: "Manage all your vehicles in one dashboard.",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardItemFast}
                className="group relative rounded-3xl p-6 sm:p-7 bg-[#0B0F19]/80 border border-white/10 hover:border-orange-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col items-center text-center shadow-xl"
              >
                {/* Circular Orange Icon on Top */}
                <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-orange-500/20 group-hover:border-orange-500 transition-all duration-200 shadow-lg shadow-orange-500/10">
                  <card.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-orange-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </InViewStagger>
        </div>
      </section>



      {/* ── 6. HOW IT WORKS (4 CONNECTED STEPS) ── */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <InView className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 leading-tight">
              Simple Steps for a Better Ride
            </h2>
          </InView>

          {/* 4 Connected Process Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                num: "01",
                icon: Download,
                title: "Download the App",
                desc: "Get MotoCare from Play Store or App Store.",
              },
              {
                num: "02",
                icon: Bike,
                title: "Add Your Vehicle",
                desc: "Add your vehicle details in just a few steps.",
              },
              {
                num: "03",
                icon: ClipboardCheck,
                title: "Set Reminders",
                desc: "Get timely reminders for services & maintenance.",
              },
              {
                num: "04",
                icon: ShieldCheck,
                title: "Ride Worry-Free",
                desc: "We take care, so you can enjoy the ride.",
              },
            ].map((step, idx) => (
              <InView key={idx} variants={fadeUpDelayedSnappy(idx * 0.06)}>
                <div className="relative flex flex-col items-center text-center group">
                  {/* Step Icon in Glowing Orange Circle */}
                  <div className="relative mb-6">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-orange-600/30 to-amber-500/20 border-2 border-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
                      <step.icon className="w-8 h-8 text-orange-400" />
                    </div>
                    {/* Number Badge at Bottom */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-orange-500 text-[10px] font-black text-white shadow-md">
                      {step.num}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connecting Arrow for Desktop */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute -right-4 top-9 z-20 text-slate-600">
                      <ArrowRight className="w-5 h-5 text-orange-500/40" />
                    </div>
                  )}
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BENEFITS & PROACTIVE ADVANTAGES ── */}
      <section id="benefits" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01] border-y border-white/5" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Showcase */}
            <InView className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                  <Image
                    src="/images/bike-service-real.jpg"
                    alt="Professional Vehicle Inspection & Maintenance"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs flex items-center justify-between text-white">
                    <span className="font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Zero Surprise Breakdowns</span>
                    </span>
                    <span className="text-orange-400 font-bold">100% Proactive</span>
                  </div>
                </div>
              </div>
            </InView>

            {/* Right Text & Feature Checks */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <InView>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-orange-400 border border-orange-500/30 bg-orange-500/10">
                  BENEFITS &amp; ADVANTAGES
                </div>
              </InView>

              <InView variants={fadeUpDelayedSnappy(0.05)}>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Maximize Vehicle Resale Value, <br />
                  <span className="text-orange-500">Minimize Fuel &amp; Repair Costs</span>
                </h2>
              </InView>

              <InView variants={fadeUpDelayedSnappy(0.1)}>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  MotoCare records every single rupee spent, parts replaced, workshop invoices, and oil changes into a verifiable digital service booklet.
                </p>
              </InView>

              <InView variants={fadeUpDelayedSnappy(0.15)}>
                <div className="space-y-3 pt-2">
                  {[
                    "Automated Km & Date-based engine oil expiration alerts",
                    "Detailed fuel economy tracking with real-time km/liter analytics",
                    "Secure cloud backup of smart cards, tax permits & insurance",
                    "Instant breakdown prevention with periodic health diagnostics",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-orange-400" />
                      </div>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </InView>

              <InView variants={fadeUpDelayedSnappy(0.2)}>
                <div className="pt-3">
                  <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 transition-all duration-150 cursor-pointer"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS SECTION ── */}
      <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          <InView className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
              RIDER TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Loved by Riders &amp; Car Owners
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              See how MotoCare helps everyday drivers maintain smooth rides.
            </p>
          </InView>

          <InViewStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Tanvir Ahmed",
                vehicle: "Yamaha MT-15 & Honda City",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
                text: "MotoCare saved my engine! The timely notification for engine oil change popped right when I was crossing 3,000 km. Super clean UI!",
                rating: 5,
              },
              {
                name: "Shahriar Hossain",
                vehicle: "KTM Duke 250",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                text: "The expense breakdown is insane. I can see my exact cost per kilometer and fuel efficiency without doing any manual math.",
                rating: 5,
              },
              {
                name: "Mahmudur Rahman",
                vehicle: "Toyota Corolla Cross",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                text: "Managing both my family car and office motorcycle in one single dashboard is a lifesaver. Highly recommend MotoCare!",
                rating: 5,
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                variants={cardItemFast}
                className="rounded-3xl p-6 sm:p-8 bg-[#090D18]/90 border border-white/10 hover:border-orange-500/40 transition-all duration-200 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-orange-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{review.name}</h4>
                    <span className="text-[11px] text-orange-400 font-medium">{review.vehicle}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </InViewStagger>
        </div>
      </section>

      {/* ── 9. CTA BANNER ("Take Better Care of Your Vehicle Today!") ── */}
      <section id="download" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto">
          <InView>
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-orange-500/30 bg-[#090D18] shadow-2xl shadow-orange-500/10">
              {/* Background Rider on Sunset Road */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/rider-sunset.jpg"
                  alt="Superbike on Highway Sunset"
                  fill
                  className="object-cover object-right sm:object-center opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#05060A] via-[#05060A]/85 to-transparent" />
              </div>

              {/* Content Box */}
              <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-2xl text-left">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  Take Better Care <br />
                  of <span className="text-orange-500">Your Vehicle</span> Today!
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                  Join over 10,000+ passionate motorcycle riders and automotive enthusiasts maintaining peak road performance with MotoCare.
                </p>

                {/* App Store & Google Play Badges */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <GooglePlayButton onClick={() => setIsDownloadModalOpen(true)} />
                  <AppStoreButton onClick={() => setIsDownloadModalOpen(true)} />
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* ── 10. FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#030408] relative z-10" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-12">
            {/* Brand column */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-0.5 shadow-md shadow-orange-500/20">
                  <div className="h-full w-full bg-[#0a0d17] rounded-[14px] flex items-center justify-center p-1.5">
                    <Image
                      src="/logo.png"
                      alt="MotoCare"
                      width={32}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-lg text-white uppercase tracking-tight">
                    MOTO <span className="text-orange-500">CARE</span>
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium -mt-0.5">
                    Smart Care. Smooth Ride.
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Your all-in-one solution for vehicle maintenance, tracking and expense management.
              </p>

              {/* Social media icons */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { label: "Facebook", icon: "f", href: "https://facebook.com" },
                  { label: "Instagram", icon: "ig", href: "https://instagram.com" },
                  { label: "YouTube", icon: "yt", href: "https://youtube.com" },
                  { label: "Twitter", icon: "x", href: "https://twitter.com" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/20 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-orange-400 transition-all duration-150"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {["Home", "Features", "How It Works", "Benefits", "Testimonials", "Download"].map(
                  (link, i) => (
                    <li key={i}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-orange-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Support Links */}
            <div className="md:col-span-2 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-condition" className="hover:text-orange-400 transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Newsletter
              </h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Subscribe to get updates and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-11 pl-4 pr-12 rounded-xl bg-slate-900/90 border border-white/10 focus:border-orange-500 focus:outline-none text-xs text-white placeholder:text-slate-500 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 w-9 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {newsletterSubmitted && (
                <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Bottom copyright attribution */}
          <div
            className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left"
            suppressHydrationWarning
          >
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

      {/* ── 11. DOWNLOAD APP MODAL ── */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDownloadModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md rounded-3xl bg-[#090D18] border border-orange-500/40 p-6 sm:p-8 shadow-2xl shadow-orange-500/20 text-center"
            >
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-7 h-7 text-orange-400" />
              </div>

              <h3 className="text-2xl font-extrabold text-white">Get MotoCare App</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                Download now on iOS or Android and take full control of your motorbike and car care.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <GooglePlayButton className="w-full justify-center py-3" onClick={() => alert("Redirecting to Google Play Store...")} />
                <AppStoreButton className="w-full justify-center py-3" onClick={() => alert("Redirecting to Apple App Store...")} />
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free · Cloud Sync · Real-time Alerts</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
