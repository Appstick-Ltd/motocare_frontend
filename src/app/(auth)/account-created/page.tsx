"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

// ── Confetti particle ────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#EB8D00", "#3EB780", "#3498DB", "#6D5BF5", "#EF4444", "#F59E0B"];

function ConfettiDot({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="absolute top-0 w-2 h-2 rounded-full pointer-events-none"
      style={{ left: `${x}%`, background: color }}
      initial={{ y: -20, opacity: 1, scale: 1 }}
      animate={{ y: 160, opacity: 0, scale: 0.4, rotate: 360 }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AccountCreatedPage() {
  const [dots] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.6,
      x: 10 + Math.random() * 80,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }))
  );

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ background: "#F6F8FA" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl px-8 py-12 text-center overflow-hidden"
        style={{ boxShadow: "0 8px 48px rgba(23,36,76,0.10)", border: "1px solid #F0F0F0" }}
      >
        {/* Confetti burst */}
        <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden">
          {dots.map((d) => (
            <ConfettiDot key={d.id} delay={d.delay} x={d.x} color={d.color} />
          ))}
        </div>

        {/* Check icon */}
        <div className="relative flex items-center justify-center mb-7">
          {/* Outer pulse ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full"
            style={{ background: "rgba(62,183,128,0.12)" }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          {/* Inner ring */}
          <motion.div
            className="absolute w-20 h-20 rounded-full"
            style={{ background: "rgba(62,183,128,0.18)" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          />
          {/* Check circle */}
          <motion.div
            className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "#3EB780" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3, type: "spring", stiffness: 220, damping: 14 }}
          >
            <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
          </motion.div>

          {/* Sparkle dots */}
          {[
            { angle: 0,   dist: 52, color: "#EB8D00", size: 8  },
            { angle: 60,  dist: 48, color: "#3498DB", size: 6  },
            { angle: 120, dist: 52, color: "#6D5BF5", size: 7  },
            { angle: 180, dist: 48, color: "#F59E0B", size: 6  },
            { angle: 240, dist: 52, color: "#EF4444", size: 8  },
            { angle: 300, dist: 48, color: "#3EB780", size: 6  },
          ].map((dot, i) => {
            const rad = (dot.angle * Math.PI) / 180;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  left: `calc(50% + ${Math.cos(rad) * dot.dist}px - ${dot.size / 2}px)`,
                  top: `calc(50% + ${Math.sin(rad) * dot.dist}px - ${dot.size / 2}px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.45 + i * 0.04, type: "spring" }}
              />
            );
          })}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-2xl font-extrabold text-[#17244C]"
        >
          Congratulations! Your account created successfully!
        </motion.h1>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-5 text-xs text-[#9CA3AF] flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Welcome to MotoCare — your vehicle&apos;s best companion!
        </motion.p>
      </motion.div>
    </div>
  );
}
