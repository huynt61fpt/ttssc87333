import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { renderCustomLinkIcon } from "./LinkIcons";

export default function QuickLinks({ linksList, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc link theo từ khóa tìm kiếm
  const filteredLinks = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return linksList;
    return linksList.filter(
      (item) => item.title && item.title.toLowerCase().includes(q)
    );
  }, [linksList, searchTerm]);

  return (
    <div className="w-full h-full flex flex-col justify-start space-y-2.5 animate-fadeIn">
      {/* Thanh tìm kiếm nhanh gọn gàng */}
      <div className="flex items-center justify-between gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm nhanh liên kết tác nghiệp..."
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-500 font-medium"
          />
        </div>

        <div className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 shrink-0">
          Tổng cộng: {filteredLinks.length} liên kết
        </div>
      </div>

      {/* Grid danh sách module chuẩn theo đúng ảnh mẫu (7 cột, nền trắng, icon 3D sắc nét) */}
      <div className="flex-1 overflow-y-auto pr-0.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {filteredLinks.map((item, idx) => (
            <a
              key={item.id || idx}
              href={item.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex flex-col items-center justify-center p-3 text-center min-h-[96px] sm:min-h-[105px]"
            >
              {/* Icon 3D chuẩn mẫu ở trên */}
              <div className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 group-hover:scale-110 transition-transform duration-150">
                {renderCustomLinkIcon(item.icon, "w-10 h-10 sm:w-11 sm:h-11 drop-shadow-2xs", item.title)}
              </div>

              {/* Tên liên kết ở dưới (Tô đậm) */}
              <span
                className="mt-1.5 text-[11px] sm:text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight px-0.5"
                title={item.title}
              >
                {item.title}
              </span>
            </a>
          ))}
        </div>

        {filteredLinks.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 mt-4 shadow-2xs">
            <p className="text-slate-500 text-xs">
              Không tìm thấy liên kết nào với từ khóa "{searchTerm}".
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Xem tất cả liên kết
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
