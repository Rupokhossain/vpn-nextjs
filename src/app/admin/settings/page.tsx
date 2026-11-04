"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Save,
  CheckCircle2,
  Globe,
  MessageCircle,
  Send,
  Mail,
  Bell,
  DollarSign,
  Upload,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings State
  const [siteSettings, setSiteSettings] = useState({
    siteName: "NexVPN",
    siteTagline: "Premium VPN Accounts, Residential Proxies & Digital Logs",
    logoType: "icon", // 'icon' or 'custom_image'
    logoImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    primaryColor: "blue", // blue, indigo, emerald, violet
    whatsappNumber: "+234 812 345 6789",
    whatsappLink: "https://wa.me/2348123456789",
    telegramChannel: "https://t.me/nexvpn_official",
    telegramGroup: "https://t.me/nexvpn_community",
    supportEmail: "support@nexvpnstore.com",
    announcementEnabled: true,
    announcementText: "⚡ Fast 24/7 Delivery Active | All VPNs Come With 1-Hour Replacement Warranty!",
    announcementBg: "bg-blue-600",
    defaultCurrency: "NGN",
    usdExchangeRate: "1550", // 1 USD = 1550 NGN
    warrantyDurationHours: "1",
    warrantyPolicyText:
      "All purchases come with a strict 1-Hour Replacement Warranty from the exact timestamp of delivery. Test credentials immediately. No password or email changes allowed on shared accounts.",
    usdtTrc20Address: "TQn9Y2khEsLJW1ChVWFMSMeSTow5KaxnSE",
    btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_site_settings");
      if (stored) {
        setSiteSettings(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    setSiteSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("admin_site_settings", JSON.stringify(siteSettings));
    } catch (err) {
      console.error(err);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <Settings className="w-4 h-4" />
            <span>General Site Customization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Website Identity & Global Settings
          </h1>
          <p className="text-sm text-slate-500">
            Control your brand name, logo, support numbers, announcement banner, and payment wallets.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors self-start sm:self-auto"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Live Site</span>
        </Link>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs sm:text-sm font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Settings saved successfully! Website branding & contact details updated.</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Saved</span>
        </div>
      )}

      {/* 2. FORM & LIVE PREVIEWS */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* SECTION 1: SITE IDENTITY & LOGO */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Brand Identity & Logo</h2>
              <p className="text-xs text-slate-500">Customize the site name and logo displayed across the header and footer.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
              Brand Control
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Site Name (Brand) *
              </label>
              <input
                type="text"
                required
                value={siteSettings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                placeholder="NexVPN"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-bold focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Site Tagline *
              </label>
              <input
                type="text"
                required
                value={siteSettings.siteTagline}
                onChange={(e) => handleChange("siteTagline", e.target.value)}
                placeholder="Premium VPN Accounts, Residential Proxies & Digital Logs"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* LOGO TYPE SWITCHER */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700">
              Logo Display Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => handleChange("logoType", "icon")}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  siteSettings.logoType === "icon"
                    ? "border-blue-600 bg-blue-50/50 text-blue-900"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold">Default Vector Badge</div>
                    <div className="text-[11px] text-slate-500">ShieldCheck Vector with gradient text</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="logoType"
                  checked={siteSettings.logoType === "icon"}
                  onChange={() => {}}
                  className="w-4 h-4 text-blue-600"
                />
              </label>

              <label
                onClick={() => handleChange("logoType", "custom_image")}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  siteSettings.logoType === "custom_image"
                    ? "border-blue-600 bg-blue-50/50 text-blue-900"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 overflow-hidden">
                    {siteSettings.logoImageUrl ? (
                      <Image
                        src={siteSettings.logoImageUrl}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Upload className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold">Custom Image URL</div>
                    <div className="text-[11px] text-slate-500">Upload or link your custom logo PNG/SVG</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="logoType"
                  checked={siteSettings.logoType === "custom_image"}
                  onChange={() => {}}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
            </div>

            {siteSettings.logoType === "custom_image" && (
              <div className="pt-2 space-y-1.5 animate-in fade-in duration-150">
                <label className="block text-xs font-bold text-slate-700">
                  Custom Logo Image URL (PNG/SVG/WebP)
                </label>
                <input
                  type="url"
                  value={siteSettings.logoImageUrl}
                  onChange={(e) => handleChange("logoImageUrl", e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
                />
              </div>
            )}
          </div>

          {/* LIVE LOGO PREVIEW IN NAVBAR CONTEXT */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Navbar Preview: How Your Logo Looks to Visitors
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {siteSettings.logoType === "icon" ? (
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src={siteSettings.logoImageUrl}
                      alt="Logo"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  {siteSettings.siteName.slice(0, 3)}
                  <span className="text-blue-600">{siteSettings.siteName.slice(3) || "VPN"}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Home</span>
                <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Product</span>
                <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs">
                  Register
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: TOP ANNOUNCEMENT NOTICE */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Announcement & Alert Banner</h2>
              <p className="text-xs text-slate-500">Display an urgent notification or delivery guarantee banner at the top of the site.</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-bold text-slate-600">Enable Bar:</span>
              <input
                type="checkbox"
                checked={siteSettings.announcementEnabled}
                onChange={(e) => handleChange("announcementEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
            </label>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Notice Message Text
              </label>
              <input
                type="text"
                value={siteSettings.announcementText}
                onChange={(e) => handleChange("announcementText", e.target.value)}
                placeholder="e.g. ⚡ Fast 24/7 Delivery Active | All VPNs Come With 1-Hour Warranty!"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all font-medium"
              />
            </div>

            {/* LIVE ANNOUNCEMENT PREVIEW */}
            {siteSettings.announcementEnabled && (
              <div className="p-3 bg-blue-600 text-white rounded-xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs">
                <Bell className="w-4 h-4 shrink-0 text-cyan-200" />
                <span>{siteSettings.announcementText}</span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: OFFICIAL SUPPORT & SOCIAL CHANNELS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Official Support Channels</h2>
              <p className="text-xs text-slate-500">Connected to the floating support buttons, Contact page, and order modals.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
              24/7 Live Desk
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Support Phone Number *</span>
              </label>
              <input
                type="text"
                required
                value={siteSettings.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                placeholder="+234 812 345 6789"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Send className="w-4 h-4 text-blue-500" />
                <span>Telegram Official Channel Link *</span>
              </label>
              <input
                type="url"
                required
                value={siteSettings.telegramChannel}
                onChange={(e) => handleChange("telegramChannel", e.target.value)}
                placeholder="https://t.me/nexvpn_official"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Send className="w-4 h-4 text-cyan-600" />
                <span>Telegram Discussion Group Link</span>
              </label>
              <input
                type="url"
                value={siteSettings.telegramGroup}
                onChange={(e) => handleChange("telegramGroup", e.target.value)}
                placeholder="https://t.me/nexvpn_community"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>Customer Support Email</span>
              </label>
              <input
                type="email"
                value={siteSettings.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
                placeholder="support@nexvpnstore.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: CURRENCY & EXCHANGE RATE */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Currency & Exchange Rate</h2>
              <p className="text-xs text-slate-500">Configure default display currency and dynamic NGN/USD conversions.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs">
              Pricing Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Default Currency Format
              </label>
              <select
                value={siteSettings.defaultCurrency}
                onChange={(e) => handleChange("defaultCurrency", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-bold focus:outline-none transition-all"
              >
                <option value="NGN">Nigerian Naira (₦ NGN) Primary</option>
                <option value="USD">US Dollar ($ USD) Primary</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Exchange Rate: 1 USD in NGN (₦)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  ₦
                </span>
                <input
                  type="number"
                  value={siteSettings.usdExchangeRate}
                  onChange={(e) => handleChange("usdExchangeRate", e.target.value)}
                  placeholder="1550"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono font-bold focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: 1-HOUR WARRANTY & REPLACEMENT POLICY */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Warranty & Replacement Rules</h2>
              <p className="text-xs text-slate-500">Configure the buyer warranty rules rendered in every product checkout modal.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs">
              Consumer Policy
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Warranty Replacement Period
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={siteSettings.warrantyDurationHours}
                  onChange={(e) => handleChange("warrantyDurationHours", e.target.value)}
                  className="w-24 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold font-mono"
                />
                <span className="text-xs text-slate-600 font-bold">Hours from instant delivery</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Official Warranty Policy Statement
              </label>
              <textarea
                rows={3}
                value={siteSettings.warrantyPolicyText}
                onChange={(e) => handleChange("warrantyPolicyText", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: MANUAL WALLET DEPOSIT ADDRESSES */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Deposit Receiving Wallets (Crypto)</h2>
              <p className="text-xs text-slate-500">Wallet addresses shown to customers when funding their account balance.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
              Wallet Engine
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                USDT (TRC-20) Receiving Address
              </label>
              <input
                type="text"
                value={siteSettings.usdtTrc20Address}
                onChange={(e) => handleChange("usdtTrc20Address", e.target.value)}
                placeholder="TQn9Y2khEsLJW1ChVWFMSMeSTow5KaxnSE"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Bitcoin (BTC) Receiving Address
              </label>
              <input
                type="text"
                value={siteSettings.btcAddress}
                onChange={(e) => handleChange("btcAddress", e.target.value)}
                placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SAVE BUTTON */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All Global Settings</span>
          </button>
          <span className="text-xs text-slate-500">Changes reflect immediately across live storefront.</span>
        </div>

      </form>

    </div>
  );
}
