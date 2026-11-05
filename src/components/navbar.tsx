"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  LayoutGrid,
  LogOut,
  Wallet,
  ShoppingBag,
  User,
} from "lucide-react";
import { useCurrency } from "@/context/currency-context";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Authentication State: Defaults to true (logged-in view per user request)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [walletBalance, setWalletBalance] = useState<number>(25000);
  const [userRole, setUserRole] = useState<string>("customer");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage if set, default to true
  useEffect(() => {
    const savedAuth = localStorage.getItem("isLoggedIn");
    if (savedAuth !== null) {
      setIsLoggedIn(savedAuth === "true");
    } else {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    }

    const savedName = localStorage.getItem("user_name");
    if (savedName) setUserName(savedName);
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) setUserEmail(savedEmail);
    const savedBal = localStorage.getItem("user_wallet_balance");
    if (savedBal !== null) setWalletBalance(parseFloat(savedBal));
    const savedRole = localStorage.getItem("user_role");
    if (savedRole) setUserRole(savedRole);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Do not render public website navbar inside admin panel or customer dashboard portal
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Nex<span className="text-blue-600">VPN</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Fast & Secure Network
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT SIDE: CURRENCY SWITCHER + AUTHENTICATED USER PILL OR GUEST BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* CURRENCY SWITCHER PILL */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-blue-600 text-white shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="View prices in USD ($)"
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
                title="View prices in Nigerian Naira (₦)"
              >
                ₦ NGN
              </button>
            </div>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                
                {/* USER PILL BUTTON */}
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white shadow-xs transition-all cursor-pointer group"
                  aria-label="User Account Menu"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-bold text-slate-100">{userName.split(" ")[0]}</span>
                  {userDropdownOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900/98 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-50 text-white space-y-1 animate-in fade-in zoom-in-95 duration-100">
                    
                    {/* User Info Header in Dropdown */}
                    <div className="px-3.5 py-2 border-b border-slate-800">
                      <div className="text-xs font-bold text-white truncate">{userName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{userEmail}</div>
                    </div>

                    {/* Customer Dashboard Link */}
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors group shadow-sm"
                    >
                      <User className="w-4 h-4 text-blue-100 group-hover:scale-110 transition-transform" />
                      <span>Customer Dashboard</span>
                    </Link>

                    {/* My Wallet Link */}
                    <Link
                      href="/dashboard/wallet"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors group"
                    >
                      <Wallet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>My Wallet & Balance</span>
                    </Link>

                    {/* My Orders Link */}
                    <Link
                      href="/dashboard/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors group"
                    >
                      <ShoppingBag className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span>My Orders & Logins</span>
                    </Link>

                    <div className="border-t border-slate-800/90 my-1" />

                    {/* Dashboard Link (Directly to Admin Dashboard) */}
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-amber-500/10 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Admin CMS Panel</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                        Admin
                      </span>
                    </Link>

                    <div className="border-t border-slate-800/90 my-1" />

                    {/* Logout Action */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-colors group text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                      <span>Logout</span>
                    </button>

                  </div>
                )}

              </div>
            ) : (
              /* GUEST BUTTONS (LOGIN & REGISTER) */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 text-sm font-semibold transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* 4. MOBILE CONTROLS & HAMBURGER TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            {!mobileMenuOpen && (
              isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-xs font-bold"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-white text-[10px] font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span>{userName ? userName.split(" ")[0] : "User"}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                >
                  Login
                </Link>
              )
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. FULL OVERLAY MOBILE MENU DRAWER (CLEAN, MODERN & APP-LIKE) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl max-h-[90vh] flex flex-col justify-between shadow-2xl animate-in slide-in-from-bottom-6 duration-200 overflow-hidden">
            
            {/* DRAWER TOP HEADER */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-slate-900 tracking-tight">
                    Nex<span className="text-blue-600">VPN</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Fast & Secure Network</span>
                </div>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* DRAWER SCROLLABLE BODY */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* LOGGED IN USER PROFILE SNIPPET */}
              {isLoggedIn && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {userName}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {userEmail}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Balance</span>
                    <span className="text-xs font-black text-emerald-600">
                      {formatPrice(walletBalance)}
                    </span>
                  </div>
                </div>
              )}

              {/* MAIN NAVIGATION LINKS */}
              <div className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Menu
                </div>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50 border border-blue-200"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </Link>
                  );
                })}
              </div>

              {/* CURRENCY TOGGLE */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Display Currency:</span>
                <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currency === "USD"
                        ? "bg-blue-600 text-white shadow-xs font-black"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    $ USD
                  </button>
                  <button
                    onClick={() => setCurrency("NGN")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currency === "NGN"
                        ? "bg-blue-600 text-white shadow-xs font-black"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    ₦ NGN
                  </button>
                </div>
              </div>

              {/* USER PORTAL ACTIONS (CLEAN, CONSISTENT & ELEGANT) */}
              {isLoggedIn ? (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Customer Portal
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Customer Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/dashboard/wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      <span>My Wallet & Deposits</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/dashboard/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="w-4 h-4 text-purple-600" />
                      <span>My Orders & Credentials</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  {userRole === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutGrid className="w-4 h-4 text-amber-600" />
                        <span>Go to Admin CMS</span>
                      </div>
                      <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded font-bold text-amber-800">
                        Admin
                      </span>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-sm hover:bg-blue-700"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* DRAWER BOTTOM LOGOUT */}
            {isLoggedIn && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout from Session</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}
