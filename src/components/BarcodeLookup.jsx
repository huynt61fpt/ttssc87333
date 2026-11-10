import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  RotateCcw,
  X,
  ArrowRight,
  ExternalLink,
  Printer,
  Copy,
  Check,
  AlertCircle,
  Tag,
  Hash,
  Barcode as BarcodeIcon,
  Image as ImageIcon,
  PhoneCall
} from "lucide-react";
import JsBarcode from "jsbarcode";
import { recordSearchHistory } from "../services/api";
import zaloQrImg from "../assets/zalo-qr-87333.png";

// Hàm tìm kiếm sản phẩm thông minh và chính xác tuyệt đối
function findMatchingProducts(barcodeList, query) {
  if (!barcodeList || !barcodeList.length || !query) return [];

  const rawQ = String(query).trim();
  const q = rawQ.toLowerCase();
  const qClean = q.replace(/[^a-zA-Z0-9]/g, "");
  const qNoZeros = qClean.replace(/^0+/, "");

  // TẦNG 1: Khớp chính xác 100% trên Mã sản phẩm hoặc Barcode
  const exactMatches = barcodeList.filter((item) => {
    const code = String(item.productCode || "").toLowerCase().trim();
    const barcode = String(item.barcode || "").toLowerCase().trim();
    return code === q || barcode === q;
  });

  if (exactMatches.length > 0) {
    // Trả về duy nhất 1 sản phẩm chính xác nhất (khử mọi trùng lặp)
    return [exactMatches[0]];
  }

  // TẦNG 2: Khớp chính xác khi loại bỏ số 0 ở đầu (VD: 00007304 khớp với 7304)
  if (qNoZeros.length >= 2) {
    const exactNoZeros = barcodeList.filter((item) => {
      const codeClean = String(item.productCode || "").toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "");
      const codeNoZeros = codeClean.replace(/^0+/, "");

      const barcodeClean = String(item.barcode || "").toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "");
      const barcodeNoZeros = barcodeClean.replace(/^0+/, "");

      return codeNoZeros === qNoZeros || barcodeNoZeros === qNoZeros;
    });

    if (exactNoZeros.length > 0) {
      return [exactNoZeros[0]];
    }
  }

  // TẦNG 3: Khớp bắt đầu bằng mã SP hoặc Barcode (Prefix match)
  const prefixMatches = barcodeList.filter((item) => {
    const code = String(item.productCode || "").toLowerCase().trim();
    const barcode = String(item.barcode || "").toLowerCase().trim();
    return code.startsWith(q) || barcode.startsWith(q);
  });

  if (prefixMatches.length > 0) {
    return [prefixMatches[0]];
  }

  // TẦNG 4: Khớp tìm kiếm theo Tên sản phẩm
  const nameMatches = barcodeList.filter((item) => {
    const name = String(item.productName || "").toLowerCase().trim();
    return name.includes(q);
  });

  if (nameMatches.length > 0) {
    // Khử trùng lặp theo cặp mã sản phẩm - barcode
    const unique = [];
    const seen = new Set();
    for (const item of nameMatches) {
      const key = `${String(item.productCode || "").trim()}_${String(item.barcode || "").trim()}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }

  // TẦNG 5: Khớp chuỗi con bất kỳ (Substring match)
  const substringMatches = barcodeList.filter((item) => {
    const code = String(item.productCode || "").toLowerCase().trim();
    const barcode = String(item.barcode || "").toLowerCase().trim();
    return code.includes(q) || barcode.includes(q);
  });

  if (substringMatches.length > 0) {
    return [substringMatches[0]];
  }

  return [];
}

// Component vẽ tem Barcode chuẩn Code 128 viền nét đứt y hệt ảnh mẫu
function BarcodeTicket({ product }) {
  const svgRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const barcodeValue = String(product.barcode || product.productCode || "").trim();

  useEffect(() => {
    if (svgRef.current && barcodeValue) {
      try {
        JsBarcode(svgRef.current, barcodeValue, {
          format: "CODE128",
          lineColor: "#0f172a",
          width: 2.1,
          height: 68,
          displayValue: false, // Ẩn số tự động để render số tùy biến chuẩn theo mẫu
          margin: 0,
          background: "transparent"
        });
      } catch (e) {
        console.error("Lỗi vẽ barcode tem:", e);
      }
    }
  }, [barcodeValue]);

  const handleCopy = () => {
    navigator.clipboard.writeText(barcodeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full lg:w-80 bg-white border-2 border-dashed border-slate-300 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xs relative print:border-none print:shadow-none">
      {/* Tiêu đề mã và tên trên tem */}
      <div className="w-full text-center pb-2 border-b border-dashed border-slate-200">
        <p className="text-xs font-bold text-blue-900 line-clamp-1">
          {product.productCode} – {product.productName}
        </p>
      </div>

      {/* Vạch Barcode Code 128 */}
      <div className="w-full py-3 flex items-center justify-center overflow-x-auto">
        <svg ref={svgRef} className="max-w-full h-auto"></svg>
      </div>

      {/* Số Barcode hiển thị to rõ phía dưới vạch */}
      <div className="w-full text-center pt-1 font-mono font-black text-sm sm:text-base tracking-widest text-slate-900">
        {barcodeValue}
      </div>

      {/* Nút in & copy tiện lợi */}
      <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-100 no-print text-[11px] text-slate-500">
        <button
          onClick={handleCopy}
          className="hover:text-blue-600 flex items-center space-x-1 font-semibold"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Đã copy" : "Copy số"}</span>
        </button>
        <span>•</span>
        <button
          onClick={handlePrint}
          className="hover:text-blue-600 flex items-center space-x-1 font-semibold"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>In tem</span>
        </button>
      </div>
    </div>
  );
}

export default function BarcodeLookup({ barcodeList = [], isLoading, onRefresh, onNavigateAdmin }) {
  const [searchTerm, setSearchTerm] = useState("00021971"); // Mẫu mặc định ban đầu theo đúng ảnh
  const [hasSearched, setHasSearched] = useState(true);
  const [lastQuery, setLastQuery] = useState("00021971");
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const charCount = searchTerm.trim().length;
  const isMinLengthMet = charCount >= 8;

  // Tự động tính danh sách tối đa 5 sản phẩm gợi ý khi người dùng gõ
  const suggestions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q || !showSuggestions) return [];

    const qClean = q.replace(/[^a-zA-Z0-9]/g, "");
    const qNoZeros = qClean.replace(/^0+/, "");

    const seen = new Set();
    const list = [];

    // 1. Ưu tiên khớp chính xác hoặc bắt đầu bằng mã SP / barcode
    for (const item of barcodeList) {
      if (list.length >= 5) break;
      const code = String(item.productCode || "").toLowerCase().trim();
      const barcode = String(item.barcode || "").toLowerCase().trim();
      const key = `${code}_${barcode}`;

      if (seen.has(key)) continue;

      if (code === q || barcode === q || code.startsWith(q) || barcode.startsWith(q)) {
        seen.add(key);
        list.push(item);
      }
    }

    // 2. Khớp mã không tính số 0 ở đầu (VD: 00007304 khớp 7304)
    if (list.length < 5 && qNoZeros) {
      for (const item of barcodeList) {
        if (list.length >= 5) break;
        const codeClean = String(item.productCode || "").toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "").replace(/^0+/, "");
        const barcodeClean = String(item.barcode || "").toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "").replace(/^0+/, "");
        const key = `${item.productCode}_${item.barcode}`;

        if (seen.has(key)) continue;

        if (codeClean === qNoZeros || barcodeClean === qNoZeros || codeClean.startsWith(qNoZeros) || barcodeClean.startsWith(qNoZeros)) {
          seen.add(key);
          list.push(item);
        }
      }
    }

    // 3. Khớp tên sản phẩm
    if (list.length < 5) {
      for (const item of barcodeList) {
        if (list.length >= 5) break;
        const name = String(item.productName || "").toLowerCase().trim();
        const key = `${item.productCode}_${item.barcode}`;

        if (seen.has(key)) continue;

        if (name.includes(q)) {
          seen.add(key);
          list.push(item);
        }
      }
    }

    // 4. Khớp chuỗi con bất kỳ trong mã / barcode
    if (list.length < 5) {
      for (const item of barcodeList) {
        if (list.length >= 5) break;
        const code = String(item.productCode || "").toLowerCase().trim();
        const barcode = String(item.barcode || "").toLowerCase().trim();
        const key = `${item.productCode}_${item.barcode}`;

        if (seen.has(key)) continue;

        if (code.includes(q) || barcode.includes(q)) {
          seen.add(key);
          list.push(item);
        }
      }
    }

    return list.slice(0, 5);
  }, [searchTerm, showSuggestions, barcodeList]);

  // Đóng danh sách gợi ý khi bấm ra ngoài ô nhập
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Thực hiện tìm kiếm với thuật toán phân tầng ưu tiên chính xác tuyệt đối
  const searchResults = useMemo(() => {
    if (!hasSearched || !lastQuery) return [];
    return findMatchingProducts(barcodeList, lastQuery);
  }, [hasSearched, lastQuery, barcodeList]);

  // Tự động chọn sản phẩm đầu tiên khi đổi từ khóa
  useEffect(() => {
    setSelectedResultIndex(0);
  }, [searchResults]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    if (!isMinLengthMet) return;

    const query = searchTerm.trim();
    setLastQuery(query);
    setHasSearched(true);

    const matches = findMatchingProducts(barcodeList, query);
    const primaryMatch = matches.length > 0 ? matches[0] : null;

    await recordSearchHistory({
      query: query,
      found: matches.length > 0,
      productCode: primaryMatch ? primaryMatch.productCode : query,
      productName: primaryMatch ? primaryMatch.productName : "Sản phẩm tra cứu",
      barcode: primaryMatch ? primaryMatch.barcode : query
    });
  };

  // Khi click vào 1 sản phẩm gợi ý: tự điền vào ô và ẩn ngay gợi ý
  const handleSelectSuggestion = async (item) => {
    const queryVal = String(item.productCode || item.barcode || "").trim();
    setSearchTerm(queryVal);
    setLastQuery(queryVal);
    setShowSuggestions(false); // Gợi ý biến mất ngay lập tức!
    setHasSearched(true);
    setSelectedResultIndex(0);

    await recordSearchHistory({
      query: queryVal,
      found: true,
      productCode: item.productCode,
      productName: item.productName,
      barcode: item.barcode
    });
  };

  const handleResetInput = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSearchOther = () => {
    setSearchTerm("");
    setHasSearched(false);
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleViewImage = (product) => {
    const query = product.productName || product.productCode;
    window.open(
      `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query + " Long Châu")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn w-full flex-1 flex flex-col justify-start">
      {/* 1. KHUNG TÌM KIẾM THEO ĐÚNG MẪU ẢNH */}
      <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        {/* Tiêu đề & nút Làm mới ô nhập */}
        <div className="flex items-center justify-between pb-2.5">
          <h2 className="text-sm sm:text-base font-extrabold text-blue-950 tracking-tight">
            Nhập mã hoặc tên sản phẩm
          </h2>
          <button
            onClick={handleResetInput}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới ô nhập</span>
          </button>
        </div>

        {/* Ô nhập bo tròn viên thuốc (Pill shape) kèm hộp gợi ý 5 sản phẩm */}
        <form onSubmit={handleSearch} ref={searchContainerRef} className="relative">
          <div className="bg-white border border-blue-200/90 rounded-2xl p-1.5 pl-4 flex items-center shadow-inner hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition relative z-20">
            <Search className="w-5 h-5 text-blue-600 shrink-0" />

            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Nhập mã SP hoặc barcode (tối thiểu 8 ký tự)..."
              className="w-full px-3 py-2 text-base sm:text-lg font-bold text-slate-900 bg-transparent focus:outline-none placeholder:font-normal placeholder:text-slate-400 font-mono"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setShowSuggestions(false);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 mr-2 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={!isMinLengthMet || isLoading}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-all shrink-0 ${
                isMinLengthMet && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>TRA CỨU</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hộp gợi ý 5 sản phẩm nổi (Floating Dropdown) - Tự ẩn ngay sau khi click */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white border border-blue-200 rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
              <div className="px-3.5 py-1.5 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between text-[11px] font-bold text-blue-700">
                <span>Gợi ý {suggestions.length} sản phẩm phù hợp:</span>
                <span className="text-slate-400 font-normal">Click để chọn & tự động tra cứu</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSuggestion(item)}
                    className="p-3 hover:bg-blue-50/70 cursor-pointer transition flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0 flex-1 text-left">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug truncate">
                        {item.productName}
                      </p>
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          Mã: {item.productCode}
                        </span>
                        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          Barcode: {item.barcode}
                        </span>
                        {item.category && (
                          <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded hidden sm:inline">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center space-x-1 text-blue-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition">
                      <span>Chọn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dòng trạng thái số lượng ký tự */}
          <div className="flex items-center justify-between text-[11px] pt-2 px-1 text-slate-500">
            <span>
              {charCount === 0 ? (
                "Yêu cầu tối thiểu 8 ký tự"
              ) : isMinLengthMet ? (
                <span className="text-blue-700 font-bold">Đủ điều kiện tra cứu ({charCount} ký tự)</span>
              ) : (
                <span className="text-amber-600 font-semibold">Đã nhập {charCount}/8 ký tự (Cần thêm {8 - charCount} ký tự)</span>
              )}
            </span>

            <div className="flex items-center space-x-1.5">
              <span>Mẫu nhanh:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("00021971");
                  setLastQuery("00021971");
                  setHasSearched(true);
                }}
                className="font-mono text-blue-600 hover:underline font-bold"
              >
                00021971
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("00007304");
                  setLastQuery("00007304");
                  setHasSearched(true);
                }}
                className="font-mono text-blue-600 hover:underline font-bold"
              >
                00007304
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 2. KHUNG KẾT QUẢ THEO ĐÚNG MẪU ẢNH (MÀU KEM ẤM & TEM VẠCH NÉT ĐỨT) */}
      {hasSearched && (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            (() => {
              const product = searchResults[selectedResultIndex] || searchResults[0];
              return (
                <div className="space-y-2.5">
                  {/* Nếu tìm theo tên có nhiều hơn 1 sản phẩm: hiển thị thanh chọn nhanh gọn gàng */}
                  {searchResults.length > 1 && (
                    <div className="bg-white border border-blue-200 rounded-xl p-2.5 flex items-center space-x-2 text-xs overflow-x-auto shadow-2xs">
                      <span className="font-bold text-blue-900 shrink-0">
                        Tìm thấy {searchResults.length} sản phẩm:
                      </span>
                      <div className="flex items-center space-x-1.5 flex-1 overflow-x-auto py-0.5">
                        {searchResults.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedResultIndex(idx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                              idx === selectedResultIndex
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            {item.productCode} - {item.productName ? item.productName.slice(0, 25) : ""}...
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DUY NHẤT 1 KHUNG KẾT QUẢ CHUẨN GIAO DIỆN ẢNH MẪU */}
                  <div className="bg-[#FCF7ED] border border-[#F0DCBE] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5">
                    {/* Cột bên trái: Chi tiết 3 ô thông tin & 2 nút thao tác */}
                    <div className="flex-1 space-y-3 flex flex-col justify-between">
                      {/* Hàng 1: Mã sản phẩm & Barcode số */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Hộp 1: Mã sản phẩm */}
                        <div className="bg-[#F5E8D7] rounded-xl p-3 border border-[#EAD4BC]">
                          <span className="text-[11px] font-bold text-[#8C6A43] tracking-wide flex items-center space-x-1">
                            <Hash className="w-3.5 h-3.5" />
                            <span>MÃ SẢN PHẨM</span>
                          </span>
                          <p className="text-base sm:text-xl font-black font-mono text-slate-900 mt-1">
                            {product.productCode}
                          </p>
                        </div>

                        {/* Hộp 2: Barcode số */}
                        <div className="bg-[#FEF1D8] rounded-xl p-3 border border-[#FDE3B5]">
                          <span className="text-[11px] font-bold text-[#B45309] tracking-wide flex items-center space-x-1">
                            <BarcodeIcon className="w-3.5 h-3.5" />
                            <span>BARCODE SỐ</span>
                          </span>
                          <p className="text-base sm:text-xl font-black font-mono text-[#B45309] mt-1">
                            {product.barcode}
                          </p>
                        </div>
                      </div>

                      {/* Hàng 2: Tên sản phẩm */}
                      <div className="bg-white border border-[#EAD4BC] rounded-xl p-3 shadow-2xs">
                        <span className="text-[11px] font-bold text-[#8C6A43] tracking-wide flex items-center space-x-1">
                          <Tag className="w-3.5 h-3.5" />
                          <span>TÊN SẢN PHẨM</span>
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 leading-snug">
                          {product.productName}
                        </p>
                      </div>

                      {/* Hàng 3: 2 nút bấm thao tác */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {/* Nút 1: Xem hình ảnh SP */}
                        <button
                          onClick={() => handleViewImage(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 shadow-xs transition"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>Xem hình ảnh SP</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                        </button>

                        {/* Nút 2: Tra cứu mã khác */}
                        <button
                          onClick={handleSearchOther}
                          className="bg-[#F1DEC7] hover:bg-[#E7D0B5] text-[#78350F] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Tra cứu mã khác</span>
                        </button>
                      </div>
                    </div>

                    {/* Cột bên phải: Khung tem nhãn mã vạch viền nét đứt chuẩn y hệt ảnh */}
                    <BarcodeTicket product={product} />
                  </div>
                </div>
              );
            })()
          ) : (
            /* Khi không có trong cơ sở dữ liệu Google Sheet */
            <div className="bg-[#FCF7ED] border border-[#F0DCBE] rounded-2xl p-5 sm:p-7 shadow-xs text-center flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF1D8] border border-[#FDE3B5] flex items-center justify-center text-[#B45309] shadow-inner">
                <PhoneCall className="w-7 h-7" />
              </div>

              <div className="space-y-1.5 max-w-lg">
                <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                  Không tìm thấy thông tin sản phẩm
                </h3>
                <p className="text-sm sm:text-base font-bold text-[#8C6A43] leading-relaxed">
                  Vui lòng liên hệ <span className="font-mono font-black text-[#B45309] text-base sm:text-lg px-2 py-0.5 bg-[#FEF1D8] rounded-md border border-[#FDE3B5]">87333</span> để được hỗ trợ
                </p>
                <div className="text-xs text-slate-500 font-mono">
                  Mã đã tra cứu: <span className="font-bold text-slate-800">"{lastQuery}"</span>
                </div>
              </div>

              {/* Ảnh mã QR Zalo hỗ trợ */}
              <div className="flex flex-col items-center justify-center p-3 bg-white border border-[#EAD4BC] rounded-2xl shadow-xs">
                <img
                  src={zaloQrImg}
                  alt="QR Zalo 87333 hỗ trợ"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-xl"
                />
                <span className="text-[11px] font-bold text-slate-500 mt-2">
                  Quét mã QR Zalo để liên hệ hỗ trợ nhanh
                </span>
              </div>

              <div className="pt-1 flex items-center space-x-3">
                <button
                  onClick={handleSearchOther}
                  className="bg-[#F1DEC7] hover:bg-[#E7D0B5] text-[#78350F] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center space-x-1.5 transition active:scale-95 shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tra cứu mã khác</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
