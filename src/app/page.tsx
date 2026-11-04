import React from "react";
import HeroSlider from "@/components/hero-slider";
import ProductShowcase from "@/components/product-showcase";
import HowItWorks from "@/components/how-it-works";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import { Zap, ShieldCheck, Lock, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* 1. FULL-WIDTH HERO BANNER SLIDER */}
        <HeroSlider />

        {/* 2. 4 CLEAN, SPACIOUS FEATURE CARDS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Instant Auto-Delivery",
                desc: "Get credentials in seconds 24/7",
                icon: Zap,
                color: "text-amber-500 bg-amber-50 border-amber-200/60",
              },
              {
                title: "100% Zero-Logs",
                desc: "Military-grade 256-bit AES privacy",
                icon: Lock,
                color: "text-blue-600 bg-blue-50 border-blue-200/60",
              },
              {
                title: "Ultra-Low Ping",
                desc: "Optimized for gaming & streaming",
                icon: ShieldCheck,
                color: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
              },
              {
                title: "24/7 Live Support",
                desc: "Telegram & WhatsApp direct help",
                icon: Headphones,
                color: "text-purple-600 bg-purple-50 border-purple-200/60",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-5 sm:p-6 bg-white hover:bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. FULL PRODUCT SHOWCASE (DIRECTLY ON HOME PAGE) */}
        <ProductShowcase />

        {/* 4. HOW IT WORKS (3 SIMPLE STEPS TO BUY & CONNECT) */}
        <HowItWorks />

        {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION & 24/7 SUPPORT) */}
        <FAQSection />
      </div>

      {/* 6. CLEAN MODERN FOOTER */}
      <Footer />
    </div>
  );
}
