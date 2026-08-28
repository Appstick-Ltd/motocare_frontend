import React from "react";
import Image from "next/image";

export default function RootLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#06080F] relative overflow-hidden">
      {/* Dynamic Glow */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl animate-pulse"
        style={{ background: "radial-gradient(circle, #EB8D00 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-2xl p-2.5">
          <Image
            src="/logo.png"
            alt="MotoCare Logo"
            width={48}
            height={48}
            className="h-full w-full object-contain animate-bounce"
            priority
          />
          <div className="absolute -inset-1 rounded-2xl border border-orange-500/40 animate-ping pointer-events-none opacity-40" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-300 tracking-wide">
            Loading Moto<span className="text-orange-500">Care</span>...
          </span>
        </div>
      </div>
    </div>
  );
}
