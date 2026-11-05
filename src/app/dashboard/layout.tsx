"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import {
  ShieldCheck,
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  Key,
  Headphones,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  User,
  CreditCard,
  Sliders,
} from "lucide-react";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number>(25000);
  const [userName, setUserName] = useState<string>("User Account");
  const [userEmail, setUserEmail] = useState<string>("user@example.com");
  const [userRole, setUserRole] = useState<string>("customer");

  useEffect(() => {
    try {
      const savedName = localStorage.getItem("user_name");
      if (savedName) setUserName(savedName);
      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) setUserEmail(savedEmail);
      const savedRole = localStorage.getItem("user_role");
      if (savedRole) setUserRole(savedRole);
      const savedBal = localStorage.getItem("user_wallet_balance");
      if (savedBal !== null) {
        setWalletBalance(parseFloat(savedBal));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "false");
    }
    setMobileSidebarOpen(false);
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Orders & Credentials", href: "/dashboard/orders", icon: Key, badge: "Logins" },
    { name: "Wallet & Deposits", href: "/dashboard/wallet", icon: Wallet, badge: "Balance" },
    { name: "Support & Warranty", href: "/dashboard/support", icon: Headphones, badge: "1-Hr" },
    { name: "Browse Products", href: "/products", icon: ShoppingBag },
  ];

  const currentNav = navItems.find((item) => item.href === pathname) || {
    name: "Customer Dashboard",
  };

  return (
    <div className="min-h-screen bg-slate-100/90 flex flex-col lg:flex-row text-slate-800 font-sans">
      
      {/* 1. DESKTOP CUSTOMER SIDEBAR (SAME STRUCTURE & SLEEK LOOK AS ADMIN PANEL) */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-200 flex-col justify-between shrink-0 border-r border-slate-800 sticky top-0 h-screen z-40">
        <div className="p-4 space-y-4">
          
          {/* BRAND HEADER */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-white tracking-tight">
                  Nex<span className="text-blue-400">VPN</span>
                </span>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.2 rounded uppercase">
                  Client
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">Customer Portal</div>
            </div>
          </div>

          {/* USER PROFILE SNIPPET IN SIDEBAR */}
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{userName}</div>
              <div className="text-[11px] text-emerald-400 font-semibold truncate">
                Balance: {formatPrice(walletBalance)}
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1">
            <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/20 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* BOTTOM ACTIONS: SWITCH TO ADMIN CMS + BACK TO WEBSITE + SIGN OUT */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          
          {/* SWITCH TO ADMIN CMS LINK (SHOWN ONLY IF USER IS ADMIN) */}
          {userRole === "admin" && (
            <Link
              href="/admin"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-xs font-bold text-amber-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Switch to Admin CMS</span>
              </span>
              <span className="text-[10px] bg-amber-400/20 px-1.5 py-0.5 rounded">Admin</span>
            </Link>
          )}

          {/* BACK TO PUBLIC WEBSITE */}
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-bold text-blue-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>← Back to Website</span>
            </span>
          </Link>

          {/* SIGN OUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />

          <div className="relative w-72 max-w-[85%] bg-slate-900 text-slate-200 p-4 flex flex-col justify-between h-full max-h-screen overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-base font-black text-white">NexVPN Portal</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CURRENCY TOGGLE IN MOBILE SIDEBAR */}
              <div className="flex items-center justify-between p-2.5 bg-slate-800 rounded-xl text-xs">
                <span className="text-slate-400 font-bold">Currency:</span>
                <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      currency === "USD" ? "bg-blue-600 text-white" : "text-slate-400"
                    }`}
                  >
                    USD $
                  </button>
                  <button
                    onClick={() => setCurrency("NGN")}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      currency === "NGN" ? "bg-blue-600 text-white" : "text-slate-400"
                    }`}
                  >
                    NGN ₦
                  </button>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                        isActive
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              {userRole === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs"
                >
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Switch to Admin CMS</span>
                </Link>
              )}
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-rose-400 text-xs font-semibold hover:bg-rose-500/10 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT WRAPPER */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        
        {/* TOP HEADER BAR (RESPONSIVE HEADER WITH TRUNCATION & COMPACT CONTROLS) */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-2xs">
          
          {/* Left: Mobile hamburger + Current Page Title */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-700 truncate">
              <span className="text-slate-400 hidden sm:inline">Client Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
              <span className="text-blue-600 font-extrabold truncate max-w-[125px] sm:max-w-none">{currentNav.name}</span>
            </div>
          </div>

          {/* Right: Currency Switcher + Compact Balance Pill + Back to Website */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* CURRENCY TOGGLE */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-blue-600 text-white shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency("NGN")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === "NGN"
                    ? "bg-blue-600 text-white shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ₦ NGN
              </button>
            </div>

            {/* BALANCE PILL */}
            <Link
              href="/dashboard/wallet"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-[11px] sm:text-xs transition-colors shrink-0"
              title="Click to manage wallet funds"
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{currency === "USD" ? `$${(walletBalance / 1550).toFixed(2)}` : `₦${walletBalance.toLocaleString()}`}</span>
            </Link>

            {/* BACK TO WEBSITE BUTTON */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 shadow-xs shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Back to Website</span>
              <span className="sm:hidden">Site</span>
            </Link>
          </div>
        </header>

        {/* 4. MAIN PAGE BODY (FULL WIDTH - NO EMPTY MARGINS) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
