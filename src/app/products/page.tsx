import React from "react";
import Link from "next/link";
import CategoryProductFilter from "@/components/category-product-filter";
import Footer from "@/components/footer";
import { ChevronRight, ShieldCheck, Filter } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* HEADER & BREADCRUMBS BANNER */}
        <div className="w-full bg-white border-b border-slate-200 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">Products</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Category Filter & <span className="text-blue-600">Inventory</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Select any category to filter high-speed VPN accounts, private proxies, USA texting apps, and verified social logs.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold self-start sm:self-auto shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>11 Categories Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED CATEGORY-WISE FILTER SYSTEM */}
        <div className="py-6 sm:py-10">
          <CategoryProductFilter />
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
