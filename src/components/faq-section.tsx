"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Send, ShieldCheck } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How fast is the delivery after payment?",
      answer:
        "Delivery is instant and automated. As soon as your order is confirmed, your VPN login credentials, activation key, or proxy access will be delivered directly to your screen and order history 24/7.",
    },
    {
      question: "What does the 1-Hour Replacement Warranty cover?",
      answer:
        "All our verified accounts and VPN licenses come with a 1-hour replacement policy. If your credentials fail to log in on your first attempt, message our support within 1 hour for an instant replacement.",
    },
    {
      question: "Can I change the password or email of the account?",
      answer:
        "No. You must not attempt to change the password, email, or security settings of the provided account. Doing so will immediately terminate the warranty.",
    },
    {
      question: "Which devices are supported?",
      answer:
        "We offer packages for Android, iOS, Windows, Mac, and Linux. Check the device limit mentioned in the title of each product (e.g. 1 Phone device or 1 PC device).",
    },
    {
      question: "How can I contact customer support if I face any issue?",
      answer:
        "You can reach our active support desk directly via WhatsApp or join our official Telegram channel. Our support team is online 24/7 to assist you.",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: FAQ HEADER & SUPPORT BOX */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Got Questions? <br className="hidden sm:inline" />
                We&apos;ve Got <span className="text-blue-600">Answers</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Everything you need to know about our verified VPN accounts, proxies, delivery speed, and replacement policy.
              </p>
            </div>

            {/* DIRECT SUPPORT CARD */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Still need help?</h4>
                  <p className="text-xs text-slate-500">Our admin is online 24/7 to assist you.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram Channel</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE ACCORDION LIST */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
