"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  MessageCircle,
  ExternalLink,
  ShieldAlert,
  Eye,
  X,
  Mail,
  User,
  RefreshCw,
} from "lucide-react";

interface SupportTicket {
  id: string;
  name: string;
  email: string;
  handle: string;
  orderId: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "Unread" | "In Review" | "Resolved";
}

const defaultTickets: SupportTicket[] = [
  {
    id: "QRY-8841",
    name: "Alex Morgan",
    email: "alex.trade@gmail.com",
    handle: "+234 812 345 6789",
    orderId: "ORD-9842",
    subject: "1-Hour Replacement Guarantee Request",
    message: "Hi Admin, I just bought the NordVPN 1-Month account, but upon logging in it said 'invalid password'. Can you please send a replacement key under the 1-hour warranty?",
    timestamp: "12 mins ago",
    status: "Unread",
  },
  {
    id: "QRY-8840",
    name: "Samuel Jackson",
    email: "samuel.trader@proton.me",
    handle: "@samuel_fx",
    orderId: "ORD-9839",
    subject: "Payment & Wallet Deposit Inquiry",
    message: "I sent 20 USDT on TRC20 network. Please check my transaction hash: 4c7a6f8b9e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b and credit my account balance.",
    timestamp: "45 mins ago",
    status: "Unread",
  },
  {
    id: "QRY-8839",
    name: "David Adeleke",
    email: "david.rich@gmail.com",
    handle: "+234 701 444 8899",
    orderId: "N/A",
    subject: "Bulk Wholesale VPN Accounts",
    message: "Hello, I want to purchase 50 ExpressVPN keys and 100 USA Gmail accounts per week for my marketing firm. Do you offer bulk discounts or custom API delivery?",
    timestamp: "3 hours ago",
    status: "Resolved",
  },
];

export default function AdminContactQueriesPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "Unread" | "Resolved">("ALL");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Sync from localStorage (shared with Contact Page)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("contact_queries");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge stored queries with defaults
          setTickets([...parsed, ...defaultTickets.filter((d) => !parsed.some((p: any) => p.id === d.id))]);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setTickets(defaultTickets);
  }, []);

  const saveTickets = (updated: SupportTicket[]) => {
    setTickets(updated);
    try {
      localStorage.setItem("contact_queries", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated: SupportTicket[] = tickets.map((t) =>
      t.id === id
        ? {
            ...t,
            status: (t.status === "Resolved" ? "Unread" : "Resolved") as
              | "Unread"
              | "In Review"
              | "Resolved",
          }
        : t
    );
    saveTickets(updated);
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({
        ...selectedTicket,
        status: selectedTicket.status === "Resolved" ? "Unread" : "Resolved",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this customer inquiry?")) {
      const updated = tickets.filter((t) => t.id !== id);
      saveTickets(updated);
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket(null);
      }
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = tickets.filter((t) => t.status === "Unread").length;

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* 1. HEADER (TIGHT SPACING & CLEAR FONT) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Support Desk Inquiries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Customer Contact Messages
          </h1>
          <p className="text-sm text-slate-500">
            Real-time inquiries submitted from the website Contact Page (`/contact`).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/contact"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Contact Form</span>
          </Link>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Total Inquiries</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{tickets.length}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Pending / Unread</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{unreadCount}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Warranty Claims</div>
          <div className="text-2xl font-black text-purple-600 mt-1">
            {tickets.filter((t) => t.subject.includes("Warranty") || t.subject.includes("Replacement")).length}
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Resolved Tickets</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {tickets.filter((t) => t.status === "Resolved").length}
          </div>
        </div>
      </div>

      {/* 3. SEARCH & STATUS FILTER */}
      <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, order ID, or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {(["ALL", "Unread", "Resolved"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {st} {st === "Unread" && unreadCount > 0 && `(${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. INQUIRIES DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-5">Customer Info</th>
                <th className="py-3 px-4">Subject & Message</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* CUSTOMER INFO */}
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{t.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{t.email}</span>
                    </div>
                    {t.handle && t.handle !== "N/A" && (
                      <div className="text-xs text-emerald-600 font-mono mt-0.5 flex items-center gap-1 font-semibold">
                        <MessageCircle className="w-3 h-3 text-emerald-500" />
                        <span>{t.handle}</span>
                      </div>
                    )}
                  </td>

                  {/* SUBJECT & TRUNCATED MESSAGE */}
                  <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                    <div className="font-bold text-slate-900 text-sm truncate">{t.subject}</div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {t.message}
                    </p>
                  </td>

                  {/* ORDER ID */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {t.orderId !== "N/A" ? (
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">
                        {t.orderId}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">No Order ID</span>
                    )}
                  </td>

                  {/* TIME */}
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.timestamp}</span>
                    </div>
                  </td>

                  {/* STATUS BADGE */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {t.status === "Unread" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                        Unread
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Resolved
                      </span>
                    )}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedTicket(t)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                        title="Read Full Inquiry"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(t.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          t.status === "Resolved"
                            ? "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                        title="Toggle Status"
                      >
                        {t.status === "Resolved" ? "Re-open" : "Resolve"}
                      </button>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. TICKET DETAILS MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">
                    Inquiry Details: {selectedTicket.id}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTicket.status === "Unread"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submitted {selectedTicket.timestamp}
                </p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Sender Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedTicket.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Email:</span>
                  <span className="font-bold text-slate-900">{selectedTicket.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Contact / Handle:</span>
                  <span className="font-bold text-emerald-600 font-mono">{selectedTicket.handle || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Related Order ID:</span>
                  <span className="font-bold text-blue-600 font-mono">{selectedTicket.orderId}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Subject
                </span>
                <div className="font-bold text-slate-900 text-base">
                  {selectedTicket.subject}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Full Customer Message
                </span>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedTicket.message}
                </div>
              </div>

              {/* Direct Reply on WhatsApp if handle is phone number */}
              {selectedTicket.handle && selectedTicket.handle !== "N/A" && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${selectedTicket.handle.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedTicket.name)},%20regarding%20your%20inquiry%20(${selectedTicket.id})%20on%20NexVPN:`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply to Customer via WhatsApp</span>
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(selectedTicket.id)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Mark as {selectedTicket.status === "Resolved" ? "Unread" : "Resolved"}
              </button>

              <button
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
