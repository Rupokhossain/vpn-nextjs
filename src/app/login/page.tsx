"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }

    // Simulated login (redirects directly to /admin dashboard)
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-md space-y-6">
        
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in to access your wallet balance, orders, and VPN configs.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL INPUT */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please contact our 24/7 WhatsApp or Telegram support desk to reset your password.");
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* REMEMBER ME CHECKBOX */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* SWITCH TO REGISTER & ADMIN */}
          <div className="pt-3 text-center border-t border-slate-100 space-y-2">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account yet?{" "}
              <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700">
                Register here
              </Link>
            </p>
            <p className="text-xs text-slate-400">
              Store Owner / Admin?{" "}
              <Link href="/admin" className="font-bold text-blue-600 hover:underline">
                Open Admin CMS Control ➔
              </Link>
            </p>
          </div>

        </div>

        {/* SECURITY TRUST FOOTNOTE */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit SSL Encrypted & Private Connection</span>
        </div>

      </div>
    </div>
  );
}
