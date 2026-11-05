"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import {
  Wallet,
  ShoppingBag,
  Key,
  Copy,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  PlusCircle,
  ArrowRight,
  Sparkles,
  Headphones,
  Sliders,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface CustomerOrder {
  id: string;
  customerEmail: string;
  customerContact: string;
  productName: string;
  quantity: number;
  totalNGN: number;
  totalUSD: number;
  paymentMethod: string;
  status: "Delivered" | "Processing" | "Replaced" | "Refunded";
  timestamp: string;
  credentials: string[];
}

export default function CustomerDashboardPage() {
  const { formatPrice, formatSecondary, currency } = useCurrency();
  const [balanceNGN, setBalanceNGN] = useState<number>(25000);
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("user@example.com");
  const [userPhone, setUserPhone] = useState<string>("");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [demoAdded, setDemoAdded] = useState(false);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem("user_name");
      if (savedName) setUserName(savedName);
      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) setUserEmail(savedEmail);
      const savedPhone = localStorage.getItem("user_phone");
      if (savedPhone) setUserPhone(savedPhone);

      const savedBalance = localStorage.getItem("user_wallet_balance");
      if (savedBalance !== null) {
        setBalanceNGN(parseFloat(savedBalance));
      } else {
        localStorage.setItem("user_wallet_balance", "25000");
        setBalanceNGN(25000);
      }

      const storedOrders = localStorage.getItem("admin_orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      }

      const defaultOrders: CustomerOrder[] = [
        {
          id: "ORD-9842",
          customerEmail: "user@example.com",
          customerContact: "+234 809 111 2233",
          productName: "NordVPN | 1 MONTH Premium Account 1 Device",
          quantity: 1,
          totalNGN: 1650,
          totalUSD: 1.05,
          paymentMethod: "Wallet",
          status: "Delivered",
          timestamp: "10 minutes ago",
          credentials: ["nord_user_991@nexvpn.store : SecurePass881#@nord"],
        },
        {
          id: "ORD-9838",
          customerEmail: "user@example.com",
          customerContact: "+234 701 444 8899",
          productName: "2010-2023 USA OLD GMAIL With Cookies",
          quantity: 2,
          totalNGN: 1900,
          totalUSD: 1.22,
          paymentMethod: "Wallet",
          status: "Delivered",
          timestamp: "2 hours ago",
          credentials: [
            "oldusgmail01@gmail.com : Pass2010#recovery",
            "oldusgmail02@gmail.com : Pass2010#recovery",
          ],
        },
      ];
      setOrders(defaultOrders);
      localStorage.setItem("admin_orders", JSON.stringify(defaultOrders));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleAddDemoFunds = (amount: number) => {
    const newBal = balanceNGN + amount;
    setBalanceNGN(newBal);
    try {
      localStorage.setItem("user_wallet_balance", newBal.toString());
      setDemoAdded(true);
      setTimeout(() => setDemoAdded(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  const stats = [
    {
      title: "Store Wallet Balance",
      value: formatPrice(balanceNGN),
      subtext: `${formatSecondary(balanceNGN)} available`,
      icon: Wallet,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      actionText: "+ Deposit",
      actionHref: "/dashboard/wallet",
    },
    {
      title: "Delivered Products",
      value: `${orders.length} Items`,
      subtext: "Instant 0s delivery",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      actionText: "View Logins",
      actionHref: "/dashboard/orders",
    },
    {
      title: "Replacement Guarantee",
      value: "1-Hour Policy",
      subtext: "Guaranteed replacement",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      actionText: "Warranty Rules",
      actionHref: "/dashboard/support",
    },
    {
      title: "Support Desk",
      value: "24/7 Online",
      subtext: "WhatsApp & Telegram",
      icon: Headphones,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      actionText: "Live Chat",
      actionHref: "https://wa.me",
    },
  ];

  return (
    <div className="space-y-6 w-full pb-8">
      
      {/* 1. TOP WELCOME & SUMMARY BANNER (SAME STYLE AS ADMIN OVERVIEW) */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Customer Self-Service Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, <span className="text-blue-600">{userName}</span>!
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Account: <strong className="text-slate-800">{userEmail}</strong> • Manage your verified VPN licenses, wallet balance, on-screen credentials, and 1-hour warranty replacements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleAddDemoFunds(10000)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            title="Add ₦10,000 for instant testing"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>+ ₦10k Demo Balance</span>
          </button>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse VPNs</span>
          </Link>
        </div>
      </div>

      {/* DEMO FUNDS ALERT TOAST */}
      {demoAdded && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs sm:text-sm font-bold animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>₦10,000 demo funds credited to your wallet balance!</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Updated</span>
        </div>
      )}

      {/* 2. STATS 4-COLUMN CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {st.title}
                </span>
                <div className={`p-2 rounded-xl ${st.color} border shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 truncate">
                  {st.subtext}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href={st.actionHref}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>{st.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. LATEST DELIVERED CREDENTIALS (HERO CARD) */}
      {latestOrder && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5 relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Latest Purchased Account Details</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                {latestOrder.productName}
              </h2>
              <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                <span>Order: <strong className="text-slate-200">{latestOrder.id}</strong></span>
                <span>•</span>
                <span>Delivered {latestOrder.timestamp}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{formatPrice(latestOrder.totalNGN, latestOrder.totalUSD)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Delivered Active</span>
              </span>
            </div>
          </div>

          {/* CREDENTIALS BOX */}
          <div className="space-y-2 relative z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-400" />
              <span>Delivered Credentials (1-Click Copy)</span>
            </div>

            {latestOrder.credentials.map((cred, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 font-mono text-xs sm:text-sm"
              >
                <span className="text-emerald-400 select-all truncate">{cred}</span>
                <button
                  onClick={() => handleCopy(cred, `dash-${idx}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === `dash-${idx}` ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
            <div className="flex items-center gap-2 text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>1-Hour Replacement Warranty Active. Test credentials immediately.</span>
            </div>

            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View All Order History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. QUICK SHORTCUTS 4-GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Browse Products",
            desc: "Shop NordVPN, ExpressVPN & USA Logs",
            href: "/products",
            icon: ShoppingBag,
            color: "text-blue-600 bg-blue-50 border-blue-200",
          },
          {
            title: "Fund Wallet",
            desc: "Deposit NGN or USDT via Blockchain",
            href: "/dashboard/wallet",
            icon: Wallet,
            color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          },
          {
            title: "Delivered Orders",
            desc: "Access credentials & keys anytime",
            href: "/dashboard/orders",
            icon: Key,
            color: "text-purple-600 bg-purple-50 border-purple-200",
          },
          {
            title: "Support Desk",
            desc: "1-Hour warranty replacement support",
            href: "/dashboard/support",
            icon: Headphones,
            color: "text-amber-600 bg-amber-50 border-amber-200",
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group flex items-start gap-3.5"
            >
              <div
                className={`w-10 h-10 rounded-xl ${card.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                  {card.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 5. RECENT PURCHASES TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Recent Purchases & Logins
            </h3>
            <p className="text-xs text-slate-500">
              Your recent transactions and delivered digital products.
            </p>
          </div>
          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>See All Orders</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 sm:px-6">Order ID</th>
                <th className="py-3 px-4 sm:px-6">Product</th>
                <th className="py-3 px-4 sm:px-6">Price ({currency})</th>
                <th className="py-3 px-4 sm:px-6">Delivered Credential</th>
                <th className="py-3 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {orders.slice(0, 4).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-blue-600">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                    {item.productName}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                    {formatPrice(item.totalNGN, item.totalUSD)}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-600 truncate max-w-[200px]">
                    {item.credentials[0] || "Delivered"}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Delivered" ? "bg-emerald-500" : "bg-purple-500"
                        }`}
                      />
                      <span>{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
