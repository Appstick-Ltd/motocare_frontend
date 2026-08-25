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
  ArrowRight,
  Phone,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";

interface LandingPageClientProps {
  isLoggedIn?: boolean;
}

// ── Animation Variants ──────────────────────────────────────────────────────

const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

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
  const visible = useInView(ref, { once: true, margin: "-70px" });
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
  const visible = useInView(ref, { once: true, margin: "-70px" });
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

const ORANGE = "#EB8D00";

const features = [
  { icon: Wrench,     title: "Service Tracking",  desc: "Log every maintenance, oil change, and repair with full history.",          color: ORANGE    },
  { icon: Fuel,       title: "Fuel Management",   desc: "Track fuel fill-ups, calculate mileage, and monitor economy over time.",    color: "#3498DB" },
  { icon: Bell,       title: "Smart Reminders",   desc: "Never miss a service date — get automatic alerts for upcoming work.",       color: "#3EB780" },
  { icon: ShieldCheck,title: "Insurance & Docs",  desc: "Store documents, insurance papers, and renewal dates securely.",            color: "#6D5BF5" },
  { icon: MapPin,     title: "Nearby Garages",    desc: "Find verified mechanics and service centers close to your location.",       color: "#EF4444" },
  { icon: Clock,      title: "Expense History",   desc: "Visualize spending trends with detailed expense reports.",                  color: "#F59E0B" },
];

const steps = [
  { num: "01", title: "Create Account",   desc: "Sign up in seconds — just your phone number and vehicle info." },
  { num: "02", title: "Add Your Vehicle", desc: "Add your bike or car with model, year, and registration details." },
  { num: "03", title: "Track Everything", desc: "Log services, fuel, expenses and get smart reminders automatically." },
];

const stats = [
  { value: "50K+", label: "Active Users"     },
  { value: "200K+", label: "Services Logged" },
  { value: "1K+",  label: "Partner Garages"  },
  { value: "4.8★", label: "App Rating"       },
];

// ── Main Component ───────────────────────────────────────────────────────────

export default function LandingPageClient({ isLoggedIn = false }: LandingPageClientProps) {
  return (
    <div className="min-h-screen bg-white text-[#17244C] overflow-x-hidden font-sans">

      {/* ── NAVBAR ── */}
      <motion.nav
        variants={fadeUpDelayed(0)}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 bg-white/90"
        style={{ backdropFilter: "blur(12px)", borderBottom: "1px solid #F0F0F0" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: ORANGE, boxShadow: `0 4px 14px ${ORANGE}40` }}
          >
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#17244C]">
            Moto<span style={{ color: ORANGE }}>Care</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#6B7280]">
          <a href="#features"     className="hover:text-[#17244C] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#17244C] transition-colors">How It Works</a>
        </div>

        {/* CTA */}
        <Link
          href={isLoggedIn ? "/dashboard" : "/login"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: ORANGE, boxShadow: `0 4px 14px ${ORANGE}38` }}
        >
          {isLoggedIn ? "Dashboard" : "Sign In"} <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Light blob bg */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${ORANGE}0D 0%, transparent 70%)` }}
        />

        {/* Badge */}
        <motion.div
          variants={fadeUpDelayed(0.05)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
          style={{ background: `${ORANGE}12`, border: `1px solid ${ORANGE}28`, color: ORANGE }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          #1 Vehicle Management Platform Worldwide
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUpDelayed(0.14)}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-[68px] font-extrabold text-center leading-[1.1] max-w-4xl text-[#17244C]"
        >
          Your Vehicle.{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${ORANGE}, #FF6B35)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Smarter Care.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpDelayed(0.26)}
          initial="hidden"
          animate="visible"
          className="mt-5 text-center text-base md:text-lg max-w-xl leading-relaxed text-[#6B7280]"
        >
          Track services, fuel, and expenses — get timely reminders for your bike or car. Built for vehicle owners around the world.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUpDelayed(0.38)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
        >
          <Link
            href="/login"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${ORANGE}, #FF6B35)`,
              boxShadow: `0 8px 24px ${ORANGE}38`,
            }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-[#6B7280] hover:text-[#17244C] transition-colors"
            style={{ border: "1px solid #E5E7EB" }}
          >
            See Features
          </a>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          variants={fadeUpDelayed(0.52)}
          initial="hidden"
          animate="visible"
          className="relative mt-14 w-full max-w-5xl rounded-3xl overflow-hidden"
          style={{
            border: "1px solid #E5E7EB",
            boxShadow: "0 24px 80px rgba(23,36,76,0.10)",
          }}
        >
          <Image
            src="/images/hero-vehicles.jpg"
            alt="MotoCare Bikes and Cars"
            width={1200}
            height={600}
            className="w-full object-cover"
            style={{ aspectRatio: "2 / 1" }}
            priority
          />
          {/* subtle bottom fade into white */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to top, white, transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 px-6">
        <InViewStagger
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl"
          // @ts-expect-error inline style
          style={{ background: "#F9FAFB", border: "1px solid #F0F0F0" }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={cardItem} className="text-center">
              <p className="text-3xl font-extrabold" style={{ color: ORANGE }}>{s.value}</p>
              <p className="text-sm text-[#9CA3AF] mt-1">{s.label}</p>
            </motion.div>
          ))}
        </InViewStagger>
      </section>

      {/* ── VEHICLE SHOWCASE ── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <InView variants={fadeLeft}>
            <motion.div
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 8px 32px rgba(23,36,76,0.07)" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/motorbike-care.jpg"
                alt="Motorbike Service"
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: "3/2" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(23,36,76,0.75) 30%, transparent)" }}
              />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
                  Motorbike
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">Bike Care</h3>
                <p className="text-sm mt-1 text-white/75">Service tracking for all bike models</p>
              </div>
            </motion.div>
          </InView>

          <InView variants={fadeRight}>
            <motion.div
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 8px 32px rgba(23,36,76,0.07)" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/car-care.jpg"
                alt="Car Service"
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: "3/2" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(23,36,76,0.75) 30%, transparent)" }}
              />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3498DB]">
                  Automobile
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">Car Care</h3>
                <p className="text-sm mt-1 text-white/75">Complete maintenance management for cars</p>
              </div>
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-[#F9FAFB]">
        <InView className="max-w-6xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#17244C]">
            Everything you need,
          </h2>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D1D5DB]">
            nothing you don&apos;t.
          </h2>
        </InView>

        <InViewStagger className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardItem}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white"
              style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 16px rgba(23,36,76,0.05)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}12`, border: `1px solid ${f.color}25` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-base mb-1.5 text-[#17244C]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{f.desc}</p>
            </motion.div>
          ))}
        </InViewStagger>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <InView className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#17244C]">
              Simple as 1, 2, 3
            </h2>
          </InView>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <InView key={step.num} variants={fadeUpDelayed(i * 0.1)}>
                <div className="flex items-start gap-6">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm text-white"
                    style={{
                      background: `linear-gradient(135deg, ${ORANGE}, #FF6B35)`,
                      boxShadow: `0 4px 18px ${ORANGE}35`,
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-lg text-[#17244C]">{step.title}</h3>
                    <p className="text-sm mt-1 leading-relaxed text-[#6B7280]">{step.desc}</p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-16 px-6 bg-[#F9FAFB]">
        <InView className="max-w-2xl mx-auto">
          <div
            className="p-8 md:p-10 rounded-3xl text-center bg-white"
            style={{ border: "1px solid #F0F0F0", boxShadow: "0 4px 24px rgba(23,36,76,0.06)" }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: ORANGE }} />
              ))}
            </div>
            <p className="text-lg md:text-xl leading-relaxed italic text-[#374151]">
              &ldquo;MotoCare has completely changed how I manage my Yamaha R15. I never miss a service and I know exactly where every penny goes.&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: `${ORANGE}15`, color: ORANGE }}
              >
                R
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-[#17244C]">Rafiq Ahmed</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>Bike Owner, London</p>
              </div>
            </div>
          </div>
        </InView>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <InView className="max-w-3xl mx-auto text-center">
          <div
            className="relative p-10 md:p-16 rounded-3xl overflow-hidden text-white"
            style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, #FF6B35 100%)` }}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
            <div className="relative z-10">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-extrabold">Start for Free Today</h2>
              <p className="mt-3 text-sm md:text-base max-w-md mx-auto text-white/80">
                Join vehicle owners worldwide who trust MotoCare to keep their rides in perfect shape.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 mt-7 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 bg-white"
                style={{ color: ORANGE }}
              >
                Sign In to MotoCare <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </InView>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid #F0F0F0" }}>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: ORANGE }}
              >
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm text-[#17244C]">
                Moto<span style={{ color: ORANGE }}>Care</span>
              </span>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-1.5 text-sm text-[#9CA3AF]">
              <Phone className="w-3.5 h-3.5" />
              <span>support@motocare.app</span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#D1D5DB]">© 2024 MotoCare. All rights reserved.</p>
          </div>

          {/* Bottom attribution row */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-5 text-xs text-[#9CA3AF]"
            style={{ borderTop: "1px solid #F0F0F0" }}
          >
            <span>A product of</span>
            <a
              href="https://shopstick.com.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#17244C] hover:underline transition-colors"
              style={{ color: "#EB8D00" }}
            >
              Shopstick
            </a>
            <span className="hidden sm:inline text-[#E5E7EB]">•</span>
            <span>Powered by</span>
            <a
              href="https://appstick.com.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-colors"
              style={{ color: "#17244C" }}
            >
              Appstick Ltd
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
