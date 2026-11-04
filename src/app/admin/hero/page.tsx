"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sliders,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  RefreshCw,
  Eye,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AdminHeroCMSPage() {
  const [selectedSlideId, setSelectedSlideId] = useState<number>(1);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Editable slides state
  const [slides, setSlides] = useState([
    {
      id: 1,
      badgeText: "Ultra-Fast 10 Gbps Bandwidth",
      title: "High Speed Dedicated",
      highlightText: "VPN Servers & Proxies",
      description:
        "Unlock ultra-low ping for smooth gaming, seamless 4K streaming, and 100% anonymous browsing across 50+ global server locations.",
      primaryBtnText: "Explore Products",
      primaryBtnHref: "/products",
      secondaryBtnText: "View Locations",
      secondaryBtnHref: "/about",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=85",
      stat1Value: "99.9%",
      stat1Label: "Uptime Rate",
      stat2Value: "15ms",
      stat2Label: "Average Ping",
    },
    {
      id: 2,
      badgeText: "Verified Premium Accounts",
      title: "Top-Tier Paid VPNs &",
      highlightText: "Static Residential IPs",
      description:
        "Instant stock of verified NordVPN, ExpressVPN, IPVanish accounts, and dedicated USA/UK private proxies with maximum confidentiality.",
      primaryBtnText: "Buy VPN Accounts",
      primaryBtnHref: "/products",
      secondaryBtnText: "How It Works",
      secondaryBtnHref: "/about",
      imageUrl:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1920&q=85",
      stat1Value: "256-Bit AES",
      stat1Label: "Security",
      stat2Value: "Strict No-Logs",
      stat2Label: "Privacy",
    },
    {
      id: 3,
      badgeText: "Instant Delivery System",
      title: "Automated 24/7 Delivery &",
      highlightText: "Replacement Guarantee",
      description:
        "Pay securely using bKash, Nagad, or Crypto. Receive your verified VPN credentials and config keys instantly with 1-hour warranty.",
      primaryBtnText: "Get Started Now",
      primaryBtnHref: "/register",
      secondaryBtnText: "Contact Support",
      secondaryBtnHref: "/contact",
      imageUrl:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1920&q=85",
      stat1Value: "Instant 0s",
      stat1Label: "Delivery",
      stat2Value: "1-Hour Policy",
      stat2Label: "Warranty",
    },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_hero_slides");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const currentSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];

  const updateCurrentSlide = (field: string, value: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === selectedSlideId ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("admin_hero_slides", JSON.stringify(slides));
    } catch (err) {
      console.error(err);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Visual Hero Customizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Hero Banner & Slider CMS
          </h1>
          <p className="text-sm text-slate-500">
            Change background images, headlines, gradient text, badges, and button links for each slide in real-time.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors self-start sm:self-auto"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Live Site</span>
        </Link>
      </div>

      {/* SLIDE SELECTOR TABS */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-xl w-fit shadow-2xs">
        {slides.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSlideId(s.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              selectedSlideId === s.id
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Slide #{s.id}
          </button>
        ))}
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-sm font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Slide #{selectedSlideId} updated successfully! Changes saved to frontend memory.</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Live</span>
        </div>
      )}

      {/* 2-COLUMN GRID: EDIT FORM ON LEFT + LIVE PREVIEW ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* EDIT FORM (LEFT 7 COLS) */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Editing Content for Slide #{selectedSlideId}
            </h3>
            <span className="text-xs font-semibold text-blue-600">Active Slide</span>
          </div>

          {/* 1. BACKGROUND IMAGE URL */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Background Image URL *</span>
              <span className="text-[11px] text-slate-400 font-normal">Direct Image Link (Unsplash, Imgur, etc.)</span>
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                value={currentSlide.imageUrl}
                onChange={(e) => updateCurrentSlide("imageUrl", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* 2. BADGE TEXT */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Badge Tagline *
            </label>
            <input
              type="text"
              required
              value={currentSlide.badgeText}
              onChange={(e) => updateCurrentSlide("badgeText", e.target.value)}
              placeholder="e.g. Ultra-Fast 10 Gbps Bandwidth"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
            />
          </div>

          {/* 3. HEADLINE & HIGHLIGHT TEXT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Headline (White Text) *
              </label>
              <input
                type="text"
                required
                value={currentSlide.title}
                onChange={(e) => updateCurrentSlide("title", e.target.value)}
                placeholder="e.g. High Speed Dedicated"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Gradient Highlight Text *
              </label>
              <input
                type="text"
                required
                value={currentSlide.highlightText}
                onChange={(e) => updateCurrentSlide("highlightText", e.target.value)}
                placeholder="e.g. VPN Servers & Proxies"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all font-semibold text-blue-600"
              />
            </div>
          </div>

          {/* 4. DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Slide Subtitle / Description *
            </label>
            <textarea
              required
              rows={3}
              value={currentSlide.description}
              onChange={(e) => updateCurrentSlide("description", e.target.value)}
              placeholder="Enter compelling description for buyers..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all leading-relaxed"
            />
          </div>

          {/* 5. CALL TO ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Primary Button Label
              </label>
              <input
                type="text"
                value={currentSlide.primaryBtnText}
                onChange={(e) => updateCurrentSlide("primaryBtnText", e.target.value)}
                placeholder="Explore Products"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Primary Button Link
              </label>
              <input
                type="text"
                value={currentSlide.primaryBtnHref}
                onChange={(e) => updateCurrentSlide("primaryBtnHref", e.target.value)}
                placeholder="/products"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* 6. STATS CHIPS CONFIG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Stat Chip 1 (Value: Label)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={currentSlide.stat1Value}
                  onChange={(e) => updateCurrentSlide("stat1Value", e.target.value)}
                  placeholder="99.9%"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
                <input
                  type="text"
                  value={currentSlide.stat1Label}
                  onChange={(e) => updateCurrentSlide("stat1Label", e.target.value)}
                  placeholder="Uptime"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Stat Chip 2 (Value: Label)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={currentSlide.stat2Value}
                  onChange={(e) => updateCurrentSlide("stat2Value", e.target.value)}
                  placeholder="15ms"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
                <input
                  type="text"
                  value={currentSlide.stat2Label}
                  onChange={(e) => updateCurrentSlide("stat2Label", e.target.value)}
                  placeholder="Ping"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Slide #{selectedSlideId} Changes</span>
            </button>
            <span className="text-xs text-slate-400">Instantly previewed on right ➔</span>
          </div>
        </form>

        {/* LIVE VISUAL PREVIEW CARD (RIGHT 5 COLS) */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Real-Time Visitor Preview</span>
            </div>
            <span className="text-[11px] text-slate-400">Scale: 100% Responsive</span>
          </div>

          {/* MINIATURE HERO BANNER PREVIEW */}
          <div className="relative w-full h-[380px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-center p-6 text-white select-none">
            {/* Background Image Preview */}
            <div className="absolute inset-0">
              <Image
                src={currentSlide.imageUrl}
                alt="Preview"
                fill
                className="object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-[10px] font-bold">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>{currentSlide.badgeText}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {currentSlide.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  {currentSlide.highlightText}
                </span>
              </h2>

              <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Chips */}
              <div className="flex items-center gap-2 pt-1 text-[10px]">
                <span className="bg-slate-900/60 px-2 py-1 rounded-md border border-white/20 font-bold">
                  {currentSlide.stat1Label}: {currentSlide.stat1Value}
                </span>
                <span className="bg-slate-900/60 px-2 py-1 rounded-md border border-white/20 font-bold">
                  {currentSlide.stat2Label}: {currentSlide.stat2Value}
                </span>
              </div>

              {/* Button */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-sm">
                  <span>{currentSlide.primaryBtnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Live Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 text-white text-[9px] font-bold">
                Live Preview
              </span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 leading-relaxed">
            💡 <strong>Admin Note:</strong> The inputs above allow you or your client to test changing hero slide images and text without writing code. When the backend developer connects real APIs, these will save directly to MongoDB or PostgreSQL.
          </div>
        </div>

      </div>

    </div>
  );
}
