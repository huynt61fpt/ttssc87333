import React from "react";
import { ArrowRight } from "lucide-react";
import { Barcode3DHeroIcon, Link3DHeroIcon, Document3DHeroIcon } from "./LinkIcons";

export default function Home({ onNavigateTab }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Module 1: Tra cứu Barcode với Icon 3D */}
        <button
          onClick={() => onNavigateTab("barcode")}
          className="group bg-white border border-blue-200/90 hover:border-blue-500 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer relative overflow-hidden"
        >
          {/* Hiệu ứng nền phát sáng nhẹ khi hover */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

          {/* Icon 3D Mã vạch Code 128 */}
          <div className="flex items-center justify-center h-22 w-22 sm:h-26 sm:w-26 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
            <Barcode3DHeroIcon className="w-22 h-22 sm:w-26 sm:h-26" />
          </div>

          <div className="space-y-1.5 z-10">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
              Tra Cứu Barcode
            </h3>
            <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
              Tra mã sản phẩm & tạo tem nhãn mã vạch chuẩn Code 128
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-1.5 text-blue-600 font-bold text-xs sm:text-sm group-hover:translate-x-1.5 transition-transform z-10">
            <span>Vào tra cứu</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Module 2: Tra cứu LINK với Icon 3D */}
        <button
          onClick={() => onNavigateTab("links")}
          className="group bg-white border border-blue-200/90 hover:border-blue-500 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer relative overflow-hidden"
        >
          {/* Hiệu ứng nền phát sáng nhẹ khi hover */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

          {/* Icon 3D Móc xích liên kết đa chiều */}
          <div className="flex items-center justify-center h-22 w-22 sm:h-26 sm:w-26 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
            <Link3DHeroIcon className="w-22 h-22 sm:w-26 sm:h-26" />
          </div>

          <div className="space-y-1.5 z-10">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
              Tra Cứu LINK
            </h3>
            <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
              Kho liên kết các phần mềm tác nghiệp nội bộ SSC
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-1.5 text-blue-600 font-bold text-xs sm:text-sm group-hover:translate-x-1.5 transition-transform z-10">
            <span>Vào tra cứu</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Module 3: Biên bản, Mẫu file với Icon 3D */}
        <button
          onClick={() => onNavigateTab("documents")}
          className="group bg-white border border-blue-200/90 hover:border-blue-500 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer relative overflow-hidden"
        >
          {/* Hiệu ứng nền phát sáng nhẹ khi hover */}
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

          {/* Icon 3D Mẫu file hồ sơ Excel / Word */}
          <div className="flex items-center justify-center h-22 w-22 sm:h-26 sm:w-26 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
            <Document3DHeroIcon className="w-22 h-22 sm:w-26 sm:h-26" />
          </div>

          <div className="space-y-1.5 z-10">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
              Biên Bản & Mẫu File
            </h3>
            <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
              Danh mục biểu mẫu chuẩn, tự động tải về file Excel & Word
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-1.5 text-emerald-600 font-bold text-xs sm:text-sm group-hover:translate-x-1.5 transition-transform z-10">
            <span>Tải biểu mẫu</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
}
