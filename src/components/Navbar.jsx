import React from "react";
import { Barcode, Link2, Settings, RefreshCw } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, dataSource, isSyncing, onSync }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab("barcode")}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition">
              <Barcode className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-blue-950 block">
                PORTAL TRA CỨU
              </span>
              <span className="text-[10px] text-blue-600 tracking-wider uppercase block font-semibold -mt-0.5">
                Barcode 128 & Quick Links
              </span>
            </div>
          </div>

          {/* 3 Mục Tab Menu */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {/* Tab 1: Tra cứu Barcode */}
            <button
              onClick={() => setActiveTab("barcode")}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "barcode"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-blue-600 hover:bg-white/80"
              }`}
            >
              <Barcode className="w-4 h-4" />
              <span>Tra cứu Barcode</span>
            </button>

            {/* Tab 2: Tra cứu LINK thường dùng */}
            <button
              onClick={() => setActiveTab("links")}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "links"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-blue-600 hover:bg-white/80"
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Tra cứu LINK</span>
            </button>

            {/* Tab 3: Quản trị & Cài đặt */}
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "admin"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-blue-600 hover:bg-white/80"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Quản trị & Cài đặt</span>
              <span className="sm:hidden">Cài đặt</span>
            </button>
          </nav>

          {/* Trạng thái dữ liệu nguồn */}
          <div className="hidden md:flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/70 text-blue-900">
              <span
                className={`w-2 h-2 rounded-full ${
                  dataSource.includes("Google")
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-blue-500"
                }`}
              />
              <span className="text-[11px] font-semibold">{dataSource}</span>
            </div>

            <button
              onClick={onSync}
              disabled={isSyncing}
              title="Đồng bộ lại dữ liệu từ Google Sheet"
              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-blue-600" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
