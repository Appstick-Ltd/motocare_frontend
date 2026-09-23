"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { GooglePlayButton } from "@/components/landing/LandingPageClient";

export function MileageCalculatorWidget() {
  const [distance, setDistance] = useState<string>("150");
  const [fuelLiters, setFuelLiters] = useState<string>("3.75");
  const [fuelCost, setFuelCost] = useState<string>("500");

  const distNum = parseFloat(distance) || 0;
  const fuelNum = parseFloat(fuelLiters) || 0;
  const costNum = parseFloat(fuelCost) || 0;

  const mileageKmpl = fuelNum > 0 && distNum > 0 ? (distNum / fuelNum).toFixed(1) : "0.0";
  const costPerKm = distNum > 0 && costNum > 0 ? (costNum / distNum).toFixed(2) : "0.00";
  const costPerLiter = fuelNum > 0 && costNum > 0 ? (costNum / fuelNum).toFixed(1) : "0.0";

  const handleReset = () => {
    setDistance("");
    setFuelLiters("");
    setFuelCost("");
  };

  return (
    <div className="rounded-3xl bg-[#0B0F1C] border border-orange-500/40 p-6 sm:p-10 shadow-2xl shadow-orange-500/10 text-left relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Free Interactive Tool
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Online Tank-to-Tank Mileage Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculate your bike or car fuel economy and cost per kilometer instantly.
          </p>
        </div>

        <button
          onClick={handleReset}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-center">
        {/* Input Fields */}
        <div className="md:col-span-7 space-y-5">
          {/* Distance Driven */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              1. Distance Traveled (Kilometers)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g. 150"
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none text-white text-base font-bold transition-colors pr-14"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                KM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              (Current Odometer - Starting Odometer on previous fill-up)
            </p>
          </div>

          {/* Fuel Purchased */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              2. Fuel Added to Refill Tank (Liters)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={fuelLiters}
                onChange={(e) => setFuelLiters(e.target.value)}
                placeholder="e.g. 3.75"
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none text-white text-base font-bold transition-colors pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                Liters
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Exact volume indicated on fuel dispenser pump meter
            </p>
          </div>

          {/* Total Cost */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              3. Total Cost in BDT (৳ Taka)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={fuelCost}
                onChange={(e) => setFuelCost(e.target.value)}
                placeholder="e.g. 500"
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/15 focus:border-orange-500 focus:outline-none text-white text-base font-bold transition-colors pr-14"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                BDT ৳
              </span>
            </div>
          </div>
        </div>

        {/* Calculation Result Card */}
        <div className="md:col-span-5 rounded-2xl bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-amber-500/5 border border-orange-500/40 p-6 sm:p-7 text-center flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block mb-1">
              Calculated Mileage
            </span>
            <div className="flex items-baseline justify-center gap-1.5 my-2">
              <span className="text-5xl font-black text-white tracking-tight">
                {mileageKmpl}
              </span>
              <span className="text-base font-bold text-orange-400">km/L</span>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Cost per Kilometer:</span>
                <span className="font-extrabold text-white text-sm">৳ {costPerKm} / km</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Calculated Fuel Rate:</span>
                <span className="font-bold text-slate-200">৳ {costPerLiter} / L</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-[11px] text-slate-300 mb-3">
              Want automatic mileage calculations, monthly expense charts, and oil change reminders?
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.appstick.motocare.motocare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/30"
            >
              <span>Download MotoCare App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
