import React, { useState, useMemo } from "react";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  FolderDown,
  Sparkles
} from "lucide-react";
import { triggerDownloadDocument } from "../services/api";

export default function DocumentTemplates({ documentsList = [], isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all"); // "all" | "excel" | "word"
  const [downloadingId, setDownloadingId] = useState(null);

  // Hàm xác định chuẩn xác tài liệu là Excel hay Word
  const checkIsExcel = (doc) => {
    const typeStr = String(doc?.type || "").toLowerCase().trim();
    const extStr = String(doc?.extension || "").toLowerCase().trim();
    const titleStr = String(doc?.title || "").toLowerCase().trim();
    const urlStr = String(doc?.url || "").toLowerCase().trim();
    return (
      typeStr === "excel" ||
      extStr.includes("xls") ||
      titleStr.includes(".xlsx") ||
      titleStr.includes(".xls") ||
      urlStr.includes("spreadsheets") ||
      urlStr.includes("format=xlsx") ||
      (!typeStr.includes("word") &&
        !typeStr.includes("doc") &&
        (titleStr.includes("kiểm kê") ||
          titleStr.includes("bảng kê") ||
          titleStr.includes("tra soát") ||
          titleStr.includes("thu chi") ||
          titleStr.includes("bàn giao ca") ||
          titleStr.includes("tồn kho")))
    );
  };

  // Lọc danh sách biên bản theo tìm kiếm và loại file
  const filteredDocs = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return documentsList.filter((doc) => {
      const isExcel = checkIsExcel(doc);
      const docType = isExcel ? "excel" : "word";
      const matchType = selectedType === "all" || docType === selectedType;
      const matchSearch =
        !q ||
        (doc.title && doc.title.toLowerCase().includes(q)) ||
        (doc.category && doc.category.toLowerCase().includes(q));
      return matchType && matchSearch;
    });
  }, [documentsList, searchTerm, selectedType]);

  const handleDownload = (doc, isExcelDoc) => {
    setDownloadingId(doc.id);
    triggerDownloadDocument({
      ...doc,
      type: isExcelDoc ? "excel" : "word",
      extension: isExcelDoc ? ".xlsx" : ".docx"
    });
    setTimeout(() => setDownloadingId(null), 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-start space-y-3 animate-fadeIn">
      {/* 1. Header công cụ tìm kiếm và lọc định dạng */}
      <div className="bg-white border border-blue-100 rounded-2xl p-3.5 sm:p-4 shadow-2xs shrink-0 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FolderDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Biên Bản & Mẫu File Nghiệp Vụ
              </h2>
              <p className="text-xs text-slate-500">
                Tự động tải về đúng biểu mẫu chuẩn Microsoft Excel (.xlsx) và Word (.docx)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 self-start sm:self-center">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              Tổng cộng: {filteredDocs.length} biểu mẫu
            </span>
          </div>
        </div>

        {/* Thanh tìm kiếm và bộ lọc nhanh Excel / Word */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm nhanh tên biên bản, mẫu giấy tờ, từ khóa..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedType === "all"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedType("excel")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                selectedType === "excel"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => setSelectedType("word")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                selectedType === "word"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Word (.docx)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Giao diện dạng DANH SÁCH: Bên trái là TÊN, Bên phải là NÚT TẢI VỀ */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {filteredDocs.map((doc) => {
          const isExcel = checkIsExcel(doc);
          const isDownloading = downloadingId === doc.id;

          return (
            <div
              key={doc.id}
              className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-xl p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* BÊN TRÁI: ICON VÀ TÊN BIÊN BẢN */}
              <div className="flex items-start space-x-3.5 min-w-0 flex-1">
                {/* Icon loại file */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isExcel
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white"
                      : "bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-600 group-hover:text-white"
                  } transition-colors`}
                >
                  {isExcel ? (
                    <FileSpreadsheet className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>

                {/* Thông tin biên bản */}
                <div className="space-y-1 min-w-0 flex-1">
                  <h3
                    className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2"
                    title={doc.title}
                  >
                    {doc.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span
                      className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        isExcel
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {isExcel ? "EXCEL (.XLSX)" : "WORD (.DOCX)"}
                    </span>

                    {doc.category && (
                      <span className="text-slate-500 font-medium bg-slate-100 px-1.5 py-0.2 rounded text-[10px]">
                        {doc.category}
                      </span>
                    )}

                    {doc.size && <span>• {doc.size}</span>}
                    {doc.updatedAt && (
                      <span className="text-slate-400 hidden sm:inline">
                        • Cập nhật: {doc.updatedAt}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* BÊN PHẢI: NÚT TẢI VỀ TỰ ĐỘNG ĐÚNG FORM EXCEL / WORD */}
              <div className="shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleDownload(doc, isExcel)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-2xs transition active:scale-95 ${
                    isExcel
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  title={isExcel ? `Tải file Excel (.xlsx): ${doc.title}` : `Tải file Word (.docx): ${doc.title}`}
                >
                  {isDownloading ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-200 animate-bounce" />
                      <span>Đang tải file...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{isExcel ? "Tải file .xlsx" : "Tải file .docx"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredDocs.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 mt-4 shadow-2xs">
            <p className="text-slate-500 text-xs">
              Không tìm thấy biên bản nào phù hợp với từ khóa "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
              }}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Xem tất cả biên bản & mẫu file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
