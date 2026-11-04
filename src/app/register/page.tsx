"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handle: "",
    password: "",
    confirmPassword: "",
    termsAgreed: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (!formData.termsAgreed) {
      setError("Please accept the terms and warranty policy.");
      return;
    }

    setLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }

    // Simulated registration (redirects directly to /admin dashboard)
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-lg space-y-6">
        
        {/* LOGO & HEADING */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:bg-blue-700 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Nex<span className="text-blue-600">VPN</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Join NexVPN to receive verified VPN servers, proxies, and automatic digital wallet access.
          </p>
        </div>

        {/* REGISTER CARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* FULL NAME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* EMAIL ADDRESS & TELEGRAM/WHATSAPP IN 2 COLUMNS ON DESKTOP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Telegram / WhatsApp *
                </label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    placeholder="@username or phone"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* PASSWORD & CONFIRM PASSWORD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* TERMS & WARRANTY CHECKBOX */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none leading-relaxed">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAgreed}
                  onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/about" className="text-blue-600 font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and acknowledge the{" "}
                  <strong className="text-slate-800">1-Hour Replacement Warranty</strong> policy.
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* PERKS ROW */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-slate-800">⚡ 0s Instant</span>
              <span>Auto Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-slate-100">
              <span className="font-bold text-slate-800">💳 Free Wallet</span>
              <span>Deposit Balance</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-slate-800">🤝 1-Hour</span>
              <span>Warranty Swap</span>
            </div>
          </div>

          {/* SWITCH TO LOGIN & ADMIN */}
          <div className="pt-3 text-center border-t border-slate-100 space-y-1.5">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
                Sign In
              </Link>
            </p>
            <p className="text-xs text-slate-400">
              Store Owner?{" "}
              <Link href="/admin" className="font-bold text-blue-600 hover:underline">
                Open Admin CMS Control ➔
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
