import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
  BookOpen,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { JsonLd } from "@/components/seo/JsonLd";
import { GooglePlayButton } from "@/components/landing/LandingPageClient";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | MotoCare",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://motocare.appstick.com.bd";

  return {
    title: `${post.title} | MotoCare Guide`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://motocare.appstick.com.bd";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Organization",
      name: post.author.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "MotoCare",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="relative text-slate-100 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left">
      <JsonLd data={articleSchema} />

      {/* Breadcrumb Back */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Guides &amp; Blog
        </Link>
      </div>

      {/* Category & Read Time */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
          <Tag className="w-3 h-3" /> {post.category}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.readTime}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-500" /> Updated: {post.updatedDate}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-white leading-tight tracking-tight">
        {post.title}
      </h1>

      {post.banglaTitle && (
        <p className="mt-2 text-base sm:text-lg font-bold text-amber-300">
          {post.banglaTitle}
        </p>
      )}

      {/* Author Bar */}
      <div className="flex items-center gap-3 my-6 py-4 border-y border-white/10 text-xs">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 p-0.5 flex items-center justify-center font-bold text-white">
          M
        </div>
        <div>
          <span className="font-bold text-white block text-sm">{post.author.name}</span>
          <span className="text-slate-400 text-xs">{post.author.role}</span>
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-invert prose-orange max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 pt-2">
        {post.content.split("\n\n").map((block, i) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="text-xl sm:text-2xl font-black text-white mt-10 mb-4 pb-2 border-b border-white/10"
              >
                {trimmed.replace("## ", "")}
              </h2>
            );
          }

          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={i} className="text-lg font-bold text-orange-400 mt-6 mb-2">
                {trimmed.replace("### ", "")}
              </h3>
            );
          }

          if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
            const listItems = trimmed
              .split("\n")
              .filter((line) => line.trim().startsWith("* ") || line.trim().startsWith("- "))
              .map((line) => line.replace(/^[\*\-]\s+/, ""));

            return (
              <ul key={i} className="space-y-2 pl-5 list-disc text-slate-300">
                {listItems.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );
          }

          if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ")) {
            const listItems = trimmed
              .split("\n")
              .filter((line) => /^\d+\.\s+/.test(line.trim()))
              .map((line) => line.replace(/^\d+\.\s+/, ""));

            return (
              <ol key={i} className="space-y-2 pl-5 list-decimal text-slate-300">
                {listItems.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ol>
            );
          }

          if (trimmed.startsWith("---")) {
            return <hr key={i} className="border-white/10 my-8" />;
          }

          return (
            <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: trimmed }} />
          );
        })}
      </div>

      {/* Mid-Article / End-of-Article App Download Card */}
      <div className="my-12 rounded-3xl bg-gradient-to-br from-orange-950/40 via-[#0d1222] to-amber-950/30 border border-orange-500/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-orange-500/10">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block mb-1">
            Never Forget Maintenance
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            Track Fuel, Service &amp; Mileage in One Free App
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Join thousands of riders in Bangladesh using MotoCare to calculate km/L and set automatic oil change alerts.
          </p>
        </div>
        <div className="shrink-0">
          <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare" />
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="mt-14 pt-8 border-t border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">Related Maintenance Guides</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="rounded-2xl p-5 bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{rel.readTime}</span>
                  <span className="flex items-center gap-1 text-orange-400 font-semibold">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
