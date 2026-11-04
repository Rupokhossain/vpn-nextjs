"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { productsData } from "@/data/mock-products";
import ProductModal from "@/components/product-modal";
import { Eye, ArrowRight, Flame } from "lucide-react";

export default function FeaturedProducts() {
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Take the top 6 hot selling items
  const featuredItems = productsData.filter((p) => p.isPopular).slice(0, 6);

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-blue-600" />
              <span>Hot & Best Selling</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-blue-600">VPNs & Accounts</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Our most requested high-speed servers, proxies, and verified accounts with instant auto-delivery.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group self-start sm:self-auto"
          >
            <span>See All Inventory</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 MODERN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredItems.map((product) => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="group bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* TOP ROW: BRAND & STOCK */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${product.brandColor} shadow-2xs`}>
                      {product.brand}
                    </span>

                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Out of Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        In Stock: {product.stock} qty.
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3
                    onClick={() => setActiveModalProduct(product)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* BOTTOM: PRICE & VIEW ACCOUNTS BUTTON */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Per Quantity:</div>
                    <div className="text-lg sm:text-xl font-black text-slate-900">
                      ₦{product.priceNGN.toLocaleString()}.00
                      <span className="text-[11px] font-normal text-slate-500 block sm:inline sm:ml-1">
                        (${product.priceUSD.toFixed(2)})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalProduct(product)}
                    disabled={isOutOfStock}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                      isOutOfStock
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isOutOfStock ? "Sold Out" : "View Accounts"}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* BOTTOM PROMINENT "VIEW ALL PRODUCTS" BUTTON */}
        <div className="pt-6 text-center space-y-2">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all active:scale-[0.98]"
          >
            <span>Explore All Products ({productsData.length}+ Available)</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="text-xs text-slate-500">
            Click to browse all 11+ categories including Proxies, Texting Apps, and Social Accounts.
          </div>
        </div>

      </div>

      {/* PRODUCT MODAL */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
