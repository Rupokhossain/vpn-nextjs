"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import {
  FileText,
  Search,
  Key,
  Copy,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  AlertTriangle,
  RefreshCw,
  ShoppingBag,
  LifeBuoy,
} from "lucide-react";

interface UserOrder {
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

export default function CustomerDashboardOrdersPage() {
  const { formatPrice, formatSecondary, currency } = useCurrency();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      }

      // Default sample orders for demonstration
      const defaults: UserOrder[] = [
        {
          id: "ORD-1535",
          customerEmail: "user@example.com",
          customerContact: "+234 809 111 2233",
          productName: "IP VANISH | 7 DAYS premium vpn 1 device",
          quantity: 1,
          totalNGN: 500,
          totalUSD: 0.8,
          paymentMethod: "Wallet",
          status: "Delivered",
          timestamp: "Just now",
          credentials: ["ipvanish_user_890@nexvpn.store : Pass8472!#x"],
        },
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
      setOrders(defaults);
      localStorage.setItem("admin_orders", JSON.stringify(defaults));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.productName.toLowerCase().includes(q) ||
      order.customerEmail.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 w-full pb-8">
      {/* 1. TOP HEADER & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-1">
            <Key className="w-3.5 h-3.5" />
            <span>Customer Credentials Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Purchased Products & Logins
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mt-1">
            Access delivered VPN credentials, copy account details, and monitor your 1-hour warranty guarantee.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop More Products</span>
          </Link>
        </div>
      </div>

      {/* 2. SEARCH & COUNTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Order ID or Product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>
        <div className="text-xs font-bold text-slate-500">
          Showing <span className="text-slate-900 font-extrabold">{filteredOrders.length}</span> orders
        </div>
      </div>

      {/* 3. ORDERS LIST */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Orders Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No orders match your search query. Try searching for a different keyword or browse our catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-all"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg">
                    {order.id}
                  </span>
                  <span className="text-slate-500">Placed {order.timestamp}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">Paid via {order.paymentMethod}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        order.status === "Delivered" ? "bg-emerald-500" : "bg-blue-500"
                      }`}
                    />
                    <span>{order.status}</span>
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {order.productName}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Quantity: {order.quantity} item(s)
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">
                      {formatPrice(order.totalNGN, order.totalUSD)}
                    </div>
                    <div className="text-xs text-slate-400">
                      ({formatSecondary(order.totalNGN, order.totalUSD)})
                    </div>
                  </div>
                </div>

                {/* Delivered Credentials Box */}
                {order.credentials && order.credentials.length > 0 && (
                  <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-blue-400" />
                        <span>Delivered Credentials ({order.credentials.length})</span>
                      </div>
                      <span className="text-emerald-400 font-semibold normal-case text-[11px]">Instant Access</span>
                    </div>

                    <div className="space-y-2">
                      {order.credentials.map((cred, cIdx) => {
                        const copyId = `${order.id}-${cIdx}`;
                        return (
                          <div
                            key={cIdx}
                            className="flex items-center justify-between gap-3 p-3 bg-slate-800/90 rounded-xl border border-slate-700 font-mono text-xs sm:text-sm"
                          >
                            <span className="text-emerald-400 select-all truncate">{cred}</span>
                            <button
                              onClick={() => handleCopy(cred, copyId)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                            >
                              {copiedKey === copyId ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order Footer Warranty Info */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-medium">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>1-Hour Replacement Warranty Guaranteed</span>
                  </div>

                  <Link
                    href={`/dashboard/support?orderId=${encodeURIComponent(order.id)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <LifeBuoy className="w-3.5 h-3.5" />
                    <span>Issue with Account? Request 1-Hour Replacement</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
