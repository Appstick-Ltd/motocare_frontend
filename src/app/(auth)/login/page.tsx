"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">
      {/* Background Subtle Mesh / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />

      <Card className="w-full max-w-md border-slate-800 bg-slate-900/90 text-white shadow-2xl backdrop-blur-md">
        <CardHeader className="space-y-3 text-center pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              MotoCare Super Admin
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs mt-1">
              Authorized Administrative Access Portal
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive-foreground text-xs animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-400" /> Admin Email
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="admin@motocare.com"
                className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-500 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-[11px] text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-blue-400" /> Password
              </label>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••••••"
                className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-500 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-[11px] text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-blue-600/25 transition-all mt-2"
            >
              {isLoading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Dashboard <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 text-slate-400 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Protected by Supabase SSR & RLS</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
