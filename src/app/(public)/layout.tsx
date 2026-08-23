import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, FileText, Info, ArrowLeft } from "lucide-react";

export default function PublicContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
      {/* Public Navbar */}
      <header className="border-b border-border/70 bg-card/85 backdrop-blur-md sticky top-0 z-30 shadow-xs" suppressHydrationWarning>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4" suppressHydrationWarning>
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 p-1 border border-orange-500/30 flex items-center justify-center shadow-xs">
              <Image src="/logo.png" alt="MotoCare Logo" width={32} height={32} className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-foreground flex items-center gap-1.5">
                MotoCare
              </span>
              <p className="text-[10px] text-muted-foreground font-medium">Vehicle Management & Care</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs font-semibold">
            <Link
              href="/privacy-policy"
              className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors flex items-center gap-1.5"
            >
              <Shield className="h-3.5 w-3.5 text-orange-500" />
              <span className="hidden sm:inline">Privacy Policy</span>
            </Link>
            <Link
              href="/terms-condition"
              className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden sm:inline">Terms & Conditions</span>
            </Link>
            <Link
              href="/about-us"
              className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors flex items-center gap-1.5"
            >
              <Info className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden sm:inline">About Us</span>
            </Link>
            <Link
              href="/dashboard"
              className="ml-2 px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} MotoCare. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-condition" className="hover:text-orange-500 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/about-us" className="hover:text-orange-500 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
