"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Shield,
  FileText,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminAuthPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setErrorMsg(error.message);
        toast.error("Authentication failed: " + error.message);
        return;
      }

      if (authData.user) {
        // Verify user role
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .maybeSingle();

        const role = profile?.role ? String(profile.role).toUpperCase() : "SUPER_ADMIN";

        if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
          await supabase.auth.signOut();
          router.push("/unauthorized");
          return;
        }

        toast.success("Welcome back to MotoCare Admin!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#06080F]">
      {/* Dynamic Background Glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #EB8D00 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF5E13 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
        }}
      />

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="relative rounded-3xl p-8 backdrop-blur-2xl bg-slate-900/80 border border-white/10 shadow-2xl">
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl p-2.5 bg-white/5 border border-white/10 shadow-inner">
              <Image
                src="/logo.png"
                alt="MotoCare Logo"
                width={52}
                height={52}
                className="h-full w-full object-contain drop-shadow"
                priority
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              Moto<span className="text-orange-500">Care</span> Admin
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">
              Authorized Administrative Access Portal
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl mb-5 text-xs bg-red-500/10 border border-red-500/20 text-red-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Mail className="h-3.5 w-3.5 text-orange-500" />
                Admin Email
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="admin@motocare.com"
                className="h-11 bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-sm"
              />
              {errors.email && (
                <p className="text-[11px] text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Lock className="h-3.5 w-3.5 text-orange-500" />
                Password
              </label>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••••••"
                className="h-11 bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-sm"
              />
              {errors.password && (
                <p className="text-[11px] text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl font-bold text-sm text-white mt-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg shadow-orange-500/20 cursor-pointer border-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Dashboard <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Security badge */}
          <div className="mt-6 pt-5 text-center border-t border-white/5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-400 bg-white/5 border border-white/5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Protected by Supabase SSR & RLS</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Legal Links */}
      <footer className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link
            href="/privacy-policy"
            className="flex items-center gap-1 text-slate-400 hover:text-orange-400 transition-colors"
          >
            <Shield className="h-3.5 w-3.5" />
            Privacy Policy
          </Link>
          <span className="text-slate-700">•</span>
          <Link
            href="/terms-condition"
            className="flex items-center gap-1 text-slate-400 hover:text-orange-400 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            Terms & Conditions
          </Link>
          <span className="text-slate-700">•</span>
          <Link
            href="/about-us"
            className="flex items-center gap-1 text-slate-400 hover:text-orange-400 transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
            About Us
          </Link>
        </div>

        <p className="text-[11px] text-slate-500">
          © {new Date().getFullYear()} MotoCare · All rights reserved
        </p>
      </footer>
    </div>
  );
}
