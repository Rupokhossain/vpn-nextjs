"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Lock,
  Wifi,
  Sparkles,
  Server,
  CheckCircle2,
} from "lucide-react";

interface SlideData {
  id: number;
  badge: {
    text: string;
    icon: typeof Zap;
  };
  title: string;
  highlightText: string;
  description: string;
  primaryBtn: {
    text: string;
    href: string;
  };
  secondaryBtn: {
    text: string;
    href: string;
  };
  image: string;
  stats: { label: string; value: string; icon: typeof CheckCircle2 }[];
}

const slides: SlideData[] = [
  {
    id: 1,
    badge: {
      text: "Ultra-Fast 10 Gbps Bandwidth",
      icon: Zap,
    },
    title: "High Speed Dedicated",
    highlightText: "VPN Servers & Proxies",
    description:
      "Unlock ultra-low ping for smooth gaming, seamless 4K streaming, and 100% anonymous browsing across 50+ global server locations.",
    primaryBtn: {
      text: "Explore Products",
      href: "/products",
    },
    secondaryBtn: {
      text: "View Locations",
      href: "/about",
    },
    // Iconic Global Cyber Network / Digital Earth Connectivity (Clean, High-Tech, Trusted)
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=85",
    stats: [
      { label: "Uptime Rate", value: "99.9%", icon: CheckCircle2 },
      { label: "Average Ping", value: "15ms", icon: Wifi },
      { label: "Global Nodes", value: "50+ Regions", icon: Server },
    ],
  },
  {
    id: 2,
    badge: {
      text: "Verified Premium Accounts",
      icon: ShieldCheck,
    },
    title: "Top-Tier Paid VPNs &",
    highlightText: "Static Residential IPs",
    description:
      "Instant stock of verified NordVPN, ExpressVPN, IPVanish accounts, and dedicated USA/UK private proxies with maximum confidentiality.",
    primaryBtn: {
      text: "Buy VPN Accounts",
      href: "/products",
    },
    secondaryBtn: {
      text: "How It Works",
      href: "/about",
    },
    // Modern Cyber Security & Encryption Network
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1920&q=85",
    stats: [
      { label: "Security", value: "256-Bit AES", icon: Lock },
      { label: "Privacy", value: "Strict No-Logs", icon: ShieldCheck },
      { label: "Support", value: "Multi-Device", icon: CheckCircle2 },
    ],
  },
  {
    id: 3,
    badge: {
      text: "Instant Delivery System",
      icon: Sparkles,
    },
    title: "Automated 24/7 Delivery &",
    highlightText: "Replacement Guarantee",
    description:
      "Pay securely using bKash, Nagad, or Crypto. Receive your verified VPN credentials and config keys instantly with 1-hour warranty.",
    primaryBtn: {
      text: "Get Started Now",
      href: "/register",
    },
    secondaryBtn: {
      text: "Contact Support",
      href: "/contact",
    },
    // Clean High-Tech Modern Server Infrastructure
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1920&q=85",
    stats: [
      { label: "Delivery", value: "Instant 0s", icon: Zap },
      { label: "Warranty", value: "1-Hour Policy", icon: ShieldCheck },
      { label: "Payment", value: "bKash / Crypto", icon: Globe2 },
    ],
  },
];

export default function HeroSlider() {
  const [slideList, setSlideList] = useState<SlideData[]>(slides);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_hero_slides");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: SlideData[] = parsed.map((item: any, idx: number) => ({
            id: item.id || idx + 1,
            badge: {
              text: item.badgeText || "Special Offer",
              icon: idx === 1 ? ShieldCheck : idx === 2 ? Sparkles : Zap,
            },
            title: item.title,
            highlightText: item.highlightText,
            description: item.description,
            primaryBtn: {
              text: item.primaryBtnText || "Explore Products",
              href: item.primaryBtnHref || "/products",
            },
            secondaryBtn: {
              text: item.secondaryBtnText || "View Locations",
              href: item.secondaryBtnHref || "/about",
            },
            image: item.imageUrl || slides[idx % slides.length].image,
            stats: [
              { label: item.stat1Label || "Uptime Rate", value: item.stat1Value || "99.9%", icon: CheckCircle2 },
              { label: item.stat2Label || "Average Ping", value: item.stat2Value || "15ms", icon: Wifi },
              { label: "Global Nodes", value: "50+ Regions", icon: Server },
            ],
          }));
          setSlideList(formatted);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slideList.length);
  }, [slideList.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slideList.length) % slideList.length);
  }, [slideList.length]);

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const activeSlide = slideList[current] || slideList[0];
  const BadgeIcon = activeSlide.badge.icon;

  return (
    <div
      className="relative w-full h-[500px] sm:h-[560px] lg:h-[600px] overflow-hidden bg-slate-900 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. BACKGROUND SLIDER WITH SMOOTH TRANSITION & SOFT OVERLAY */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* High-res clean image */}
          <Image
            src={activeSlide.image}
            alt={activeSlide.title}
            fill
            priority
            className="object-cover object-center brightness-[0.92]"
            sizes="100vw"
          />

          {/* Clean modern overlay that is NOT too dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
        </motion.div>
      </AnimatePresence>

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-5">
          
          {/* BADGE PILL */}
          <motion.div
            key={`badge-${activeSlide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 backdrop-blur-md text-blue-200 text-xs sm:text-sm font-semibold shadow-sm"
          >
            <BadgeIcon className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>{activeSlide.badge.text}</span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            key={`title-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md"
          >
            {activeSlide.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
              {activeSlide.highlightText}
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            key={`desc-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base lg:text-lg text-slate-100 leading-relaxed max-w-2xl font-normal drop-shadow"
          >
            {activeSlide.description}
          </motion.p>

          {/* STATS CHIPS */}
          <motion.div
            key={`stats-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1"
          >
            {activeSlide.stats.map((st, idx) => {
              const StIcon = st.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <StIcon className="w-4 h-4 text-cyan-400" />
                  <span>
                    {st.label}: <strong className="text-white">{st.value}</strong>
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* CALL TO ACTION BUTTONS */}
          <motion.div
            key={`cta-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <Link
              href={activeSlide.primaryBtn.href}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/40 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <span>{activeSlide.primaryBtn.text}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={activeSlide.secondaryBtn.href}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
            >
              <span>{activeSlide.secondaryBtn.text}</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* 3. NAVIGATION ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 4. PAGINATION INDICATORS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/40 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
        {slideList.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === idx
                ? "w-7 bg-blue-500 shadow-sm shadow-blue-400"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
