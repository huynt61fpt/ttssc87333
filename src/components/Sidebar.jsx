import React from "react";
import { Home, Barcode, Link2, FileText, RefreshCw, Layers, Shield } from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  barcodeSource = "",
  linksSource = "",
  docsSource = "",
  isSyncing,
  onSync
}) {
  const menuItems = [
    {
      id: "home",
      label: "Trang chủ",
      desc: "Tổng quan & Lối tắt",
      icon: Home,
    },
    {
      id: "barcode",
      label: "Tra cứu Barcode",
      desc: "Mã vạch Code 128",
      icon: Barcode,
    },
    {
      id: "links",
      label: "Tra cứu LINK",
      desc: "Kho liên kết nhanh",
      icon: Link2,
    },
    {
      id: "documents",
      label: "Biên bản, mẫu file",
      desc: "Tải file Excel, Word",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-full md:w-60 lg:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 no-print h-full">
      {/* Brand & Logo Header trong Sidebar */}
      <div
        className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50/70 shrink-0 cursor-pointer"
        onClick={() => setActiveTab("home")}
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-tight text-blue-950">
              TRUNG TÂM SSC
            </h1>
            <span className="text-[11px] font-bold text-blue-600 tracking-wider">
              MÃ: 87333
            </span>
          </div>
        </div>
      </div>

      {/* Menu danh mục các Tab */}
      <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
          DANH MỤC HỆ THỐNG
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/25"
                  : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 font-medium"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-blue-600"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm leading-tight truncate">{item.label}</div>
                <div
                  className={`text-[10px] truncate mt-0.5 ${
                    isActive ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer kín đáo ở đáy Sidebar: phiên bản & lối vào quản trị */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/60 shrink-0 flex items-center justify-between text-[11px] text-slate-400">
        <span>SSC Hệ thống v2.0</span>
        <button
          onClick={() => setActiveTab("admin")}
          title="Cài đặt hệ thống (Mã PIN: 123456)"
          className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-200/60 transition"
        >
          <Shield className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
