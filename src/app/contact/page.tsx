"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  MessageCircle,
  Send,
  Mail,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handle: "",
    orderId: "",
    subject: "1-Hour Replacement Guarantee Request",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuery = {
      id: `QRY-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      email: formData.email,
      handle: formData.handle || "N/A",
      orderId: formData.orderId || "N/A",
      subject: formData.subject,
      message: formData.message,
      timestamp: "Just now",
      status: "Unread",
    };

    if (typeof window !== "undefined") {
      try {
        const existing = JSON.parse(localStorage.getItem("contact_queries") || "[]");
        localStorage.setItem("contact_queries", JSON.stringify([newQuery, ...existing]));
      } catch (err) {
        console.error(err);
      }
    }

    setFormSubmitted(true);
  };

  const contactChannels = [
    {
      title: "WhatsApp 24/7 Help Desk",
      desc: "Fastest response for order issues, replacements, and quick questions.",
      icon: MessageCircle,
      action: "Chat on WhatsApp",
      href: "https://wa.me",
      badge: "Fastest Response (< 10m)",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
    {
      title: "Telegram Official Channel",
      desc: "Daily stock restock alerts, special discounts, and verified notifications.",
      icon: Send,
      action: "Join Telegram Channel",
      href: "https://t.me",
      badge: "Daily Updates",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      title: "Telegram Community Group",
      desc: "Connect with thousands of fellow users, ask questions, and share setups.",
      icon: Users,
      action: "Join Discussion Group",
      href: "https://t.me",
      badge: "Community",
      color: "bg-purple-50 text-purple-600 border-purple-200",
      btnColor: "bg-purple-600 hover:bg-purple-700 text-white",
    },
    {
      title: "Official Email Support",
      desc: "Send detailed inquiries, partnership requests, or bulk wholesale orders.",
      icon: Mail,
      action: "support@nexvpn.store",
      href: "mailto:support@nexvpn.store",
      badge: "Official Inquiries",
      color: "bg-slate-100 text-slate-700 border-slate-200",
      btnColor: "bg-slate-900 hover:bg-slate-800 text-white",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* 1. HERO BREADCRUMB & HEADER */}
        <div className="w-full bg-white border-b border-slate-200 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">Contact & Support</span>
            </nav>

            <div className="max-w-2xl space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                🎧 Customer Assistance
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                We&apos;re Here to <span className="text-blue-600">Help You 24/7</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Need immediate help with your VPN account, proxy credentials, or 1-hour replacement? Connect directly with our online team below.
              </p>
            </div>

          </div>
        </div>

        {/* 2. 4 INSTANT CONTACT CARDS (CLEANLY SEPARATED WITH PROPER TOP SPACING) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactChannels.map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200/90 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl ${ch.color} border flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {ch.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ch.desc}</p>
                    </div>
                  </div>

                  <a
                    href={ch.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center transition-all shadow-xs ${ch.btnColor}`}
                  >
                    {ch.action}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. CONTACT FORM & COMMITMENT SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: INTERACTIVE TICKET FORM */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Direct Ticket Form
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Send Us a Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Submit your request and our support desk will respond to your email or Telegram promptly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, {formData.name || "Customer"}. Our active support agent will review your ticket and reply within 15 minutes.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm text-slate-900 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm text-slate-900 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Telegram or WhatsApp Handle
                      </label>
                      <input
                        type="text"
                        value={formData.handle}
                        onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                        placeholder="@username or phone"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm text-slate-900 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Order ID (If applicable)
                      </label>
                      <input
                        type="text"
                        value={formData.orderId}
                        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                        placeholder="#ORD-89421"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm text-slate-900 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Subject / Topic *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm text-slate-900 focus:outline-none transition-all"
                    >
                      <option>1-Hour Replacement Guarantee Request</option>
                      <option>VPN Connection & Login Help</option>
                      <option>Wallet Balance Deposit Question</option>
                      <option>Bulk Order / Reseller Wholesale</option>
                      <option>Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your issue, account details, or questions..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm text-slate-900 focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
                  >
                    Submit Support Ticket
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: SUPPORT COMMITMENT & REPLACEMENT POLICY SUMMARY */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Replacement Guarantee
                    </h4>
                    <p className="text-xs text-slate-500">Fast 1-hour resolution policy</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  If an account or proxy fails to authenticate upon delivery, provide your order number and screenshot to our WhatsApp or Telegram within 1 hour. We issue replacements immediately with zero bureaucracy.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Average WhatsApp response: &lt; 10 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Verified accounts inspected daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Direct admin contact available 24/7</span>
                  </div>
                </div>
              </div>

              {/* QUICK HOURS / SLA CARD */}
              <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Working Hours & SLA</span>
                </div>
                <div className="text-lg font-bold text-white">
                  Automated Delivery: <span className="text-emerald-400">24/7/365</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our digital stock server automatically dispenses credentials anytime. Live human agents are available 24/7 on WhatsApp & Telegram.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
