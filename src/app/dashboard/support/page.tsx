"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Headphones,
  LifeBuoy,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  FileQuestion,
  HelpCircle,
  Key,
} from "lucide-react";

interface QueryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "New" | "Replied" | "Resolved";
}

export default function CustomerDashboardSupportPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [issueType, setIssueType] = useState<string>("Invalid Login Credentials");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("user@example.com");
  const [phone, setPhone] = useState<string>("+234 809 111 2233");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [myTickets, setMyTickets] = useState<QueryItem[]>([]);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem("admin_orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        setOrders(parsed);
        if (parsed.length > 0) {
          setSelectedOrderId(parsed[0].id);
        }
      }

      const storedQueries = localStorage.getItem("contact_queries");
      if (storedQueries) {
        setMyTickets(JSON.parse(storedQueries));
      } else {
        const defaultTicket: QueryItem = {
          id: "TKT-108",
          name: "User Account",
          email: "user@example.com",
          phone: "+234 809 111 2233",
          subject: "1-Hour Warranty Claim: NordVPN Renewal",
          message: "Account login confirmed working, warranty verified.",
          timestamp: "Today, 11:30 AM",
          status: "Resolved",
        };
        setMyTickets([defaultTicket]);
        localStorage.setItem("contact_queries", JSON.stringify([defaultTicket]));
      }

      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) setEmail(savedEmail);
      const savedPhone = localStorage.getItem("user_phone");
      if (savedPhone) setPhone(savedPhone);

      // Read query param if passed e.g. ?orderId=ORD-1535
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const orderParam = params.get("orderId");
        if (orderParam) {
          setSelectedOrderId(orderParam);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please describe your issue.");
      return;
    }

    const newTicket: QueryItem = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      name: "Customer Portal User",
      email: email.trim(),
      phone: phone.trim(),
      subject: `1-Hour Warranty Claim [${selectedOrderId || "General"}]: ${issueType}`,
      message: message.trim(),
      timestamp: "Just now",
      status: "New",
    };

    const updated = [newTicket, ...myTickets];
    setMyTickets(updated);
    localStorage.setItem("contact_queries", JSON.stringify(updated));

    setSubmitSuccess(true);
    setMessage("");
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 w-full pb-8">
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Guaranteed 1-Hour Replacement Protection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Support & 1-Hour Warranty Desk
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mt-1">
            Need help with your VPN account or instant replacement for delivered credentials? Submit a ticket or message our 24/7 care team.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp 24/7</span>
          </a>
        </div>
      </div>

      {/* 2. THREE CONTACT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs transition-all group flex items-start gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              WhatsApp Support
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">Instant chat with human technician.</p>
            <span className="text-[11px] font-bold text-emerald-600 mt-2 inline-flex items-center gap-1">
              <span>Open WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </a>

        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-white hover:bg-sky-50/50 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs transition-all group flex items-start gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              Telegram Channel
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">Real-time alerts, stock drops & bot.</p>
            <span className="text-[11px] font-bold text-sky-600 mt-2 inline-flex items-center gap-1">
              <span>Join Telegram</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </a>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              1-Hour Warranty Rule
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Valid for 60 minutes from time of purchase.
            </p>
            <span className="text-[11px] font-bold text-purple-600 mt-2 block">
              100% Free Replacement
            </span>
          </div>
        </div>
      </div>

      {/* 3. TICKET SUBMISSION FORM */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Submit 1-Hour Replacement / Support Ticket
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            If your purchased login is incorrect or locked, submit your request here. Our admin team will investigate immediately.
          </p>
        </div>

        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Order ID
              </label>
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold"
              >
                {orders.length === 0 ? (
                  <option value="">No recent orders found</option>
                ) : (
                  orders.map((ord) => (
                    <option key={ord.id} value={ord.id}>
                      {ord.id} — {ord.productName}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Issue Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold"
              >
                <option value="Invalid Login Credentials">Invalid Login Credentials (Wrong Pass/Email)</option>
                <option value="2FA Code or OTP Required">2FA Authentication or OTP Required</option>
                <option value="Expired Subscription">Subscription Expired Prematurely</option>
                <option value="Account Locked by Provider">Account Suspended or Locked by Provider</option>
                <option value="Other Technical Inquiries">Other Technical Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Phone / Contact
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 809 111 2233"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Description of the Problem
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what error appears when you try to log into the application..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Warranty Claim Ticket</span>
            </button>
          </div>

          {submitSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ticket submitted successfully! Admin will review and provide a fresh account within minutes.</span>
            </div>
          )}
        </form>
      </div>

      {/* 4. TICKET HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              My Support & Warranty Tickets
            </h3>
            <p className="text-xs text-slate-500">
              History of your submitted requests.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Total {myTickets.length} Tickets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 sm:px-6">Ticket ID</th>
                <th className="py-3 px-4 sm:px-6">Subject</th>
                <th className="py-3 px-4 sm:px-6">Time</th>
                <th className="py-3 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {myTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-blue-600">
                    {t.id}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-800">
                    {t.subject}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-500 text-xs">
                    {t.timestamp}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        t.status === "Resolved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : t.status === "Replied"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          t.status === "Resolved"
                            ? "bg-emerald-500"
                            : t.status === "Replied"
                            ? "bg-blue-500"
                            : "bg-amber-500"
                        }`}
                      />
                      <span>{t.status}</span>
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
