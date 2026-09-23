"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { GooglePlayButton } from "@/components/landing/LandingPageClient";
import { JsonLd } from "@/components/seo/JsonLd";

export interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoLandingPageProps {
  badge: string;
  h1Title: string;
  subtitle: string;
  heroHighlight?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  features: FeatureCard[];
  bangladeshContext: {
    title: string;
    subtitle: string;
    points: { title: string; desc: string }[];
  };
  faqs: FaqItem[];
  relatedPages?: { title: string; href: string; desc: string }[];
  children?: React.ReactNode; // For custom widgets like interactive calculators
}

export function SeoLandingPage({
  badge,
  h1Title,
  subtitle,
  heroHighlight,
  featuresTitle = "Why Vehicle Owners Rely on MotoCare",
  featuresSubtitle = "Engineered specifically to solve real-world daily challenges faced by Bangladeshi riders and car owners.",
  features,
  bangladeshContext,
  faqs,
  relatedPages,
  children,
}: SeoLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="relative overflow-hidden text-slate-100">
      <JsonLd data={faqSchema} />

      {/* ── Background Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-gradient-to-b from-orange-500/15 via-orange-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-orange-400 border border-orange-500/40 bg-orange-500/10 shadow-sm backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>{badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
          {h1Title}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {heroHighlight && (
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{heroHighlight}</span>
          </div>
        )}

        {/* CTA Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare" />
        </div>

        {/* Trust Points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free to Use
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bangladesh Currency (BDT ৳)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cloud Automatic Sync
          </span>
        </div>
      </section>

      {/* ── Custom Interactive Children (e.g., Mileage Calculator) ── */}
      {children && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-16">
          {children}
        </section>
      )}

      {/* ── Key Features Grid ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {featuresTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            {featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-orange-500/40 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 group text-left flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
                  {feat.icon}
                </div>
                {feat.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {feat.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed flex-1">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bangladesh-Specific Context & Practical Tips ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-orange-950/30 via-[#0d1222] to-amber-950/20 border border-orange-500/30 p-8 sm:p-12 text-left relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" /> Bangladesh Local Road Context
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {bangladeshContext.title}
            </h2>
            <p className="text-sm text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {bangladeshContext.subtitle}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {bangladeshContext.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0 mt-0.5 font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{pt.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section with Accordion ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Everything you need to know about vehicle tracking with MotoCare in Bangladesh.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden text-left transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-white hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Related Solutions & Guides Cross-links ── */}
      {relatedPages && relatedPages.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/5">
          <h3 className="text-lg font-bold text-white mb-6 text-left">
            Related Vehicle Solutions &amp; Guides
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedPages.map((page, i) => (
              <Link
                key={i}
                href={page.href}
                className="rounded-xl p-4 bg-white/[0.02] border border-white/5 hover:border-orange-500/40 transition-all text-left group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-orange-400 transition-colors flex items-center justify-between">
                    <span>{page.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-orange-400" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {page.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Bottom Conversion Funnel CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-8 sm:p-12 shadow-2xl shadow-orange-500/20 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Start Tracking Your Vehicle with MotoCare
          </h2>
          <p className="mt-3 text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            Free download on Android. Take 1 minute to install and save thousands of Taka on fuel waste and unexpected engine repairs.
          </p>
          <div className="mt-8 flex justify-center">
            <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare" />
          </div>
        </div>
      </section>
    </div>
  );
}
