"use client";

import React from "react";
import { ShoppingCart, CreditCard, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Service",
      desc: "Browse our verified catalog and pick your required VPN account, proxy package, or texting app.",
      icon: ShoppingCart,
      color: "bg-blue-600 text-white shadow-blue-500/25",
      badge: "Step 1",
    },
    {
      step: "02",
      title: "Fast & Secure Payment",
      desc: "Pay seamlessly with your funded wallet or contact our admin directly via WhatsApp for instant processing.",
      icon: CreditCard,
      color: "bg-indigo-600 text-white shadow-indigo-500/25",
      badge: "Step 2",
    },
    {
      step: "03",
      title: "Instant Credentials & Connect",
      desc: "Receive your login credentials and setup guide instantly on-screen with our 1-hour replacement warranty.",
      icon: KeyRound,
      color: "bg-emerald-600 text-white shadow-emerald-500/25",
      badge: "Step 3",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            ⚡ Quick Setup Guide
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works in <span className="text-blue-600">3 Easy Steps</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Getting your premium private VPN or proxy account takes less than two minutes from order to connection.
          </p>
        </div>

        {/* 3 STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-blue-300 rounded-3xl p-6 sm:p-8 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* STEP NUMBER & ICON ROW */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.color} shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                {/* BOTTOM PERK CHIP */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 Automated Availability</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
