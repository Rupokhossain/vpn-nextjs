"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  Save,
  Layers,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { productsData } from "@/data/mock-products";
import { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_products_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveProductsToStorage = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem("admin_products_data", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add / Edit
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "NordVPN",
    category: "One Month Paid VPN",
    priceNGN: 1500,
    priceUSD: 1.0,
    stock: 10,
    isPopular: false,
    rules: "Do not change password or email. 1 device only.",
  });

  // Bulk Upload State
  const [bulkTargetProductId, setBulkTargetProductId] = useState<string>(products[0]?.id || "");
  const [bulkCredentialsText, setBulkCredentialsText] = useState("");

  const categories = [
    "ALL",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Delete
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from your catalog?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProductsToStorage(updated);
      showToast(`Deleted "${name}" successfully.`);
    }
  };

  // Handle Save (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Update existing
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: productForm.name,
              brand: productForm.brand,
              category: productForm.category,
              categoryLabel: productForm.category,
              priceNGN: Number(productForm.priceNGN),
              priceUSD: Number(productForm.priceUSD),
              stock: Number(productForm.stock),
              isPopular: productForm.isPopular,
              rules: productForm.rules.split("\n").filter(Boolean),
            }
          : p
      );
      saveProductsToStorage(updated);
      showToast(`Product "${productForm.name}" updated successfully!`);
      setEditingProduct(null);
    } else {
      // Add new
      const newProd: Product = {
        id: `custom-${Date.now()}`,
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        categoryLabel: productForm.category,
        brandLogoText: productForm.brand.slice(0, 2).toUpperCase(),
        brandColor: "bg-blue-600 text-white",
        description: productForm.name,
        priceNGN: Number(productForm.priceNGN),
        priceUSD: Number(productForm.priceUSD),
        stock: Number(productForm.stock),
        isPopular: productForm.isPopular,
        rules: productForm.rules.split("\n").filter(Boolean),
      };
      const updated = [newProd, ...products];
      saveProductsToStorage(updated);
      showToast(`New product "${productForm.name}" created!`);
    }

    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      priceNGN: p.priceNGN,
      priceUSD: p.priceUSD,
      stock: p.stock,
      isPopular: !!p.isPopular,
      rules: Array.isArray(p.rules) ? p.rules.join("\n") : String(p.rules || ""),
    });
    setIsAddModalOpen(true);
  };

  // Handle Bulk Upload of Logs / Accounts
  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = bulkCredentialsText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      alert("Please paste at least one credential line.");
      return;
    }

    const updated = products.map((p) =>
      p.id === bulkTargetProductId
        ? { ...p, stock: p.stock + lines.length }
        : p
    );
    saveProductsToStorage(updated);

    const targetProd = products.find((p) => p.id === bulkTargetProductId);
    showToast(`Added ${lines.length} accounts to "${targetProd?.name}". Stock updated!`);
    setBulkCredentialsText("");
    setIsBulkUploadOpen(false);
  };

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" />
            <span>Inventory & Catalog CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Products & Stock Management
          </h1>
          <p className="text-sm text-slate-500">
            Add new VPN plans, edit pricing, manage stock quantity, and paste fresh account logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setBulkTargetProductId(products[0]?.id || "");
              setIsBulkUploadOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Bulk Upload Logs</span>
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setProductForm({
                name: "",
                brand: "NordVPN",
                category: "One Month Paid VPN",
                priceNGN: 1500,
                priceUSD: 1.0,
                stock: 10,
                isPopular: false,
                rules: "Do not change password or email. 1 device only.",
              });
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs sm:text-sm font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Active</span>
        </div>
      )}

      {/* 2. SEARCH & CATEGORY FILTER BAR */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by VPN title or brand..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories (Full Inventory)" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. PRODUCTS DATA TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Catalog Items ({filteredProducts.length})</span>
          </div>
          <span className="text-xs text-slate-400">Live Client Data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[680px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Product Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (NGN / USD)</th>
                <th className="py-3.5 px-4 text-center">Stock Level</th>
                <th className="py-3.5 px-4 text-center">Popular Badge</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock <= 0;
                const isLowStock = p.stock > 0 && p.stock <= 2;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* TITLE & BRAND */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 max-w-xs sm:max-w-md">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {p.brand}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: {p.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="py-4 px-4 text-slate-600 text-xs font-semibold whitespace-nowrap">
                      {p.category}
                    </td>

                    {/* PRICE */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-black text-slate-900 text-sm">
                        ₦{p.priceNGN.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-400">
                        ${p.priceUSD.toFixed(2)} USD
                      </div>
                    </td>

                    {/* STOCK STATUS */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          {p.stock} left
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {p.stock} in stock
                        </span>
                      )}
                    </td>

                    {/* POPULAR BADGE */}
                    <td className="py-4 px-4 text-center">
                      {p.isPopular ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 border border-amber-400/30 text-[10px] font-bold">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          FEATURED
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ADD / EDIT PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingProduct ? "Edit Product Details" : "Add New VPN Product"}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingProduct
                    ? "Update pricing, description rules, or stock level."
                    : "Add a new account type or proxy service to the live store."}
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 overflow-y-auto">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  placeholder="e.g. NordVPN | 1 MONTH Premium Account"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Brand / Service *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) =>
                      setProductForm({ ...productForm, brand: e.target.value })
                    }
                    placeholder="e.g. NordVPN"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    placeholder="e.g. One Month Paid VPN"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Price NGN (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.priceNGN}
                    onChange={(e) =>
                      setProductForm({ ...productForm, priceNGN: Number(e.target.value) })
                    }
                    placeholder="1500"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Price USD ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.priceUSD}
                    onChange={(e) =>
                      setProductForm({ ...productForm, priceUSD: Number(e.target.value) })
                    }
                    placeholder="1.00"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Current Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: Number(e.target.value) })
                    }
                    placeholder="10"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Home Page Featured
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isPopular}
                      onChange={(e) =>
                        setProductForm({ ...productForm, isPopular: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-xs font-bold text-slate-700">Show on Home</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Usage Rules & Warranty Instructions *
                </label>
                <textarea
                  rows={3}
                  value={productForm.rules}
                  onChange={(e) =>
                    setProductForm({ ...productForm, rules: e.target.value })
                  }
                  placeholder="e.g. Do not change email or password. 1 device only."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 5. BULK UPLOAD LOGS MODAL */}
      {isBulkUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Bulk Upload Account Credentials
                </h3>
                <p className="text-xs text-slate-500">
                  Paste multiple account logs. Stock quantity will automatically increment.
                </p>
              </div>
              <button
                onClick={() => setIsBulkUploadOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBulkUpload} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Select Target Product *
                </label>
                <select
                  value={bulkTargetProductId}
                  onChange={(e) => setBulkTargetProductId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Paste Credentials (One per line) *
                  </label>
                  <span className="text-[11px] font-mono text-purple-600 font-bold">
                    {bulkCredentialsText
                      .split("\n")
                      .filter((l) => l.trim().length > 0).length}{" "}
                    lines detected
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={bulkCredentialsText}
                  onChange={(e) => setBulkCredentialsText(e.target.value)}
                  placeholder={`user1@gmail.com:Pass9981\nuser2@gmail.com:Secret45\nuser3@gmail.com:Alpha2026`}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-purple-500 leading-relaxed"
                />
                <p className="text-[11px] text-slate-400">
                  Format: <code>email:password</code> or <code>activation_key</code>. Each line will count as +1 item in stock.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBulkUploadOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20"
                >
                  <Upload className="w-4 h-4" />
                  <span>Append to Inventory</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
