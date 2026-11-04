"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  ShieldCheck,
  Zap,
  Lock,
  Globe2,
  CheckCircle2,
  ChevronRight,
  Server,
  ArrowRight,
  Wifi,
  Users,
  Check,
  X,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const globalLocations = [
    { country: "United States", code: "US", flag: "🇺🇸", ping: "18ms", status: "Optimal" },
    { country: "Singapore", code: "SG", flag: "🇸🇬", ping: "12ms", status: "Optimal" },
    { country: "Germany", code: "DE", flag: "🇩🇪", ping: "22ms", status: "Optimal" },
    { country: "United Kingdom", code: "UK", flag: "🇬🇧", ping: "20ms", status: "Optimal" },
    { country: "Japan", code: "JP", flag: "🇯🇵", ping: "28ms", status: "Optimal" },
    { country: "Canada", code: "CA", flag: "🇨🇦", ping: "24ms", status: "Optimal" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        
        {/* 1. VISUAL 2-COLUMN HERO (TEXT ON LEFT + LIVE NETWORK CARD ON RIGHT) */}
        <section className="w-full bg-white border-b border-slate-200 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">About Us</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT: PUNCHY TEXT & KEY PILLS */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Verified Digital Network</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  Fast, Private & <br />
                  <span className="text-blue-600">Unrestricted Access</span> for All
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  NexVPN is an automated digital inventory provider delivering verified high-speed VPN licenses, private residential proxies, and aged digital assets with instant on-screen credentials.
                </p>

                {/* QUICK TRUST HIGHLIGHT CHIPS */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Instant 24/7 Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Zero Activity Logs</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>1-Hour Warranty</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
                  >
                    <span>Browse Inventory</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              {/* RIGHT: VISUAL HIGH-TECH LIVE STATUS CARD */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl shadow-slate-900/10 space-y-5 border border-slate-800">
                  
                  {/* CARD HEADER */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                        <Wifi className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Live Node Monitor</div>
                        <div className="text-[10px] text-slate-400">Low-Latency Global Cluster</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      99.9% Online
                    </span>
                  </div>

                  {/* LIVE PING METRICS LIST */}
                  <div className="space-y-2.5">
                    {[
                      { flag: "🇺🇸", city: "New York, USA", ping: "18ms", load: "12%" },
                      { flag: "🇸🇬", city: "Singapore Central", ping: "12ms", load: "18%" },
                      { flag: "🇩🇪", city: "Frankfurt, Germany", ping: "22ms", load: "9%" },
                      { flag: "🇬🇧", city: "London, UK", ping: "20ms", load: "15%" },
                    ].map((srv, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{srv.flag}</span>
                          <span className="font-semibold text-slate-200">{srv.city}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-bold text-emerald-400">{srv.ping}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Load {srv.load}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CARD FOOTER */}
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-blue-400" />
                      <span>256-Bit AES Encryption</span>
                    </span>
                    <span className="text-blue-300 font-semibold">Instant Swap</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2. STATS BAR (BALANCED & CLEAN) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: "50+", label: "Global Server Nodes", icon: Server, color: "text-blue-600 bg-blue-50" },
              { value: "99.9%", label: "Uptime SLA", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
              { value: "10k+", label: "Delivered Orders", icon: Users, color: "text-purple-600 bg-purple-50" },
              { value: "Instant", label: "24/7 Automated Dispatch", icon: Zap, color: "text-amber-600 bg-amber-50" },
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl ${st.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">{st.value}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{st.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. VISUAL GLOBAL COVERAGE (GRID OF FLAGS WITH REAL PINGS) */}
        <section className="w-full bg-white border-y border-slate-200 py-14 sm:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Global Reach
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  High-Speed Global Server Locations
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Connect through our top-performing global tier-1 network nodes.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 self-start sm:self-auto">
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>50+ Regions Covered</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {globalLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all text-center space-y-2 group shadow-2xs"
                >
                  <div className="text-3xl">{loc.flag}</div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {loc.country}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{loc.ping}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. VISUAL DO'S AND DON'TS (USER SAFETY CHECKLIST - NO BORING WALLS OF TEXT) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Warranty & Safety Rules
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Account Usage Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Simple guidelines to keep your account safe and guarantee your 1-hour replacement warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* DO's CARD */}
            <div className="p-6 sm:p-8 bg-white border border-emerald-200 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Recommended Steps (Do This)</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Connect to the recommended VPN country (e.g. USA or Japan) before opening accounts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Test your login credentials immediately upon order delivery.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Contact Telegram or WhatsApp support within 1 hour if you encounter any initial issue.</span>
                </li>
              </ul>
            </div>

            {/* DON'Ts CARD */}
            <div className="p-6 sm:p-8 bg-white border border-rose-200 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <X className="w-5 h-5 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Prohibited Actions (Do Not)</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✕</span>
                  <span>Do NOT attempt to change the password, email, or security passkeys of the account.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✕</span>
                  <span>Do NOT share credentials across multiple unauthorized devices beyond the limit.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✕</span>
                  <span>Do NOT delay reporting login issues past the 1-hour replacement window.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5. CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-blue-600 text-white space-y-4 shadow-lg shadow-blue-500/20">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Secure Your Connection?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto">
              Check our live verified inventory of NordVPN, ExpressVPN, and private proxies today.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
              >
                <span>Go to Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
