import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { GooglePlayButton } from "@/components/landing/LandingPageClient";

export const metadata: Metadata = {
  title: "Vehicle Care & Maintenance Guides for Bangladesh | MotoCare Blog",
  description:
    "Expert maintenance tips, bike mileage calculations, BRTA document renewal guides, and vehicle cost-saving strategies for Bangladesh riders and drivers.",
  keywords: [
    "motocare blog",
    "bike maintenance tips bangladesh",
    "calculate bike mileage in dhaka",
    "brta tax token renewal guide",
    "motorcycle service checklist bd",
    "vehicle cost saving tips bd",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "MotoCare Vehicle Guides & Maintenance Blog | Bangladesh",
    description:
      "Actionable maintenance advice, fuel-saving guides, and regulatory tips for bike and car owners in Bangladesh.",
    url: "/blog",
  },
};

export default function BlogCatalogPage() {
  return (
    <div className="relative text-slate-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-orange-500/15 via-orange-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-orange-400 border border-orange-500/40 bg-orange-500/10 shadow-sm backdrop-blur-md mb-4">
          <BookOpen className="w-3.5 h-3.5 text-orange-400" />
          <span>MOTOCARE KNOWLEDGE HUB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Vehicle Care Guides &amp; Practical Advice for Bangladesh
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          From tank-to-tank mileage testing to BRTA tax token renewal procedures, explore verified guides written by automotive telemetry specialists.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-orange-500/40 p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between text-left group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  <Tag className="w-3 h-3" /> {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.readTime}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-orange-400 transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>

              {post.banglaTitle && (
                <p className="text-xs font-semibold text-amber-300/80 mt-1.5">
                  {post.banglaTitle}
                </p>
              )}

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xs font-bold text-orange-400">
                  M
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-bold text-slate-200">{post.author.name}</span>
                  <span className="text-[10px] text-slate-500">{post.publishedDate}</span>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-20 rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-8 sm:p-12 text-center text-white relative z-10 shadow-2xl shadow-orange-500/20">
        <h3 className="text-2xl sm:text-3xl font-black">
          Put These Maintenance Tips on Autopilot
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-orange-100 max-w-lg mx-auto leading-relaxed">
          Download MotoCare and get automatic oil change notifications, fuel economy stats, and BRTA renewal reminders directly on your mobile.
        </p>
        <div className="mt-6 flex justify-center">
          <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare" />
        </div>
      </div>
    </div>
  );
}
