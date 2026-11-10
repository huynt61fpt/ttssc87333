import React, { useState, useEffect } from "react";
import {
  Shield,
  Key,
  History,
  Settings,
  Download,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  FileSpreadsheet,
  Search,
  CheckCircle2,
  XCircle,
  Code2,
  Barcode,
  Link2,
  ExternalLink
} from "lucide-react";
import {
  getBarcodeSheetUrl,
  setBarcodeSheetUrl,
  getLinksSheetUrl,
  setLinksSheetUrl,
  getDocsSheetUrl,
  setDocsSheetUrl,
  getLocalHistory,
  clearLocalHistory,
  getAdminPin,
  setAdminPin
} from "../services/api";

export default function AdminSettings({ onSyncAll, isSyncing, lastSyncTime }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Cấu hình URL riêng cho từng module
  const [barcodeUrl, setBarcodeUrlState] = useState("");
  const [linksUrl, setLinksUrlState] = useState("");
  const [docsUrl, setDocsUrlState] = useState("");
  const [barcodeSaved, setBarcodeSaved] = useState(false);
  const [linksSaved, setLinksSaved] = useState(false);
  const [docsSaved, setDocsSaved] = useState(false);

  // Đổi PIN
  const [newPin, setNewPin] = useState("");
  const [pinChangedMsg, setPinChangedMsg] = useState(false);

  // Dữ liệu lịch sử
  const [historyList, setHistoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeSubTab, setActiveSubTab] = useState("config"); // mặc định vào tab Cấu hình các Sheet

  // Code.gs copy state
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setBarcodeUrlState(getBarcodeSheetUrl());
    setLinksUrlState(getLinksSheetUrl());
    setDocsUrlState(getDocsSheetUrl());
    refreshHistory();
  }, [isAuthenticated]);

  const refreshHistory = () => {
    const local = getLocalHistory();
    setHistoryList(local);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = getAdminPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveBarcodeUrl = (e) => {
    e.preventDefault();
    setBarcodeSheetUrl(barcodeUrl);
    setBarcodeSaved(true);
    setTimeout(() => setBarcodeSaved(false), 3000);
    onSyncAll();
  };

  const handleSaveLinksUrl = (e) => {
    e.preventDefault();
    setLinksSheetUrl(linksUrl);
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 3000);
    onSyncAll();
  };

  const handleSaveDocsUrl = (e) => {
    e.preventDefault();
    setDocsSheetUrl(docsUrl);
    setDocsSaved(true);
    setTimeout(() => setDocsSaved(false), 3000);
    onSyncAll();
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      setAdminPin(newPin.trim());
      setNewPin("");
      setPinChangedMsg(true);
      setTimeout(() => setPinChangedMsg(false), 3000);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử tra cứu đã lưu trên máy tính này?")) {
      clearLocalHistory();
      setHistoryList([]);
    }
  };

  const handleExportCsv = () => {
    if (historyList.length === 0) {
      alert("Chưa có bản ghi lịch sử nào để xuất!");
      return;
    }

    const headers = ["Thời gian", "Từ khóa tra cứu", "Trạng thái", "Mã sản phẩm", "Tên sản phẩm", "Mã Barcode", "Thiết bị"];
    const rows = historyList.map((item) => [
      `"${new Date(item.timestamp).toLocaleString("vi-VN")}"`,
      `"${item.query || ""}"`,
      `"${item.found ? "Tìm thấy" : "Không tìm thấy"}"`,
      `"${item.productCode || ""}"`,
      `"${item.productName || ""}"`,
      `"'${item.barcode || ""}"`,
      `"${item.deviceInfo || ""}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Lich_su_tra_cuu_barcode_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredHistory = historyList.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      (item.query && item.query.toLowerCase().includes(q)) ||
      (item.productName && item.productName.toLowerCase().includes(q)) ||
      (item.barcode && item.barcode.toLowerCase().includes(q)) ||
      (item.productCode && item.productCode.toLowerCase().includes(q));

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "found" && item.found) ||
      (statusFilter === "not_found" && !item.found);

    return matchSearch && matchStatus;
  });

  const totalCount = historyList.length;
  const foundCount = historyList.filter((i) => i.found).length;
  const successRate = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0;

  const appScriptCode = `function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "get_barcodes";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = { status: "success", data: [] };

  try {
    if (action === "get_barcodes") {
      var sheet = ss.getSheetByName("Barcode") || ss.getSheets()[0];
      var values = sheet.getDataRange().getValues();
      var data = [];
      for (var i = 1; i < values.length; i++) {
        var row = values[i];
        if (row[0] || row[1] || row[2]) {
          data.push({
            productCode: String(row[0] || "").trim(),
            productName: String(row[1] || "").trim(),
            barcode: String(row[2] || "").trim(),
            category: String(row[3] || "").trim()
          });
        }
      }
      result.data = data;
    } else if (action === "get_links") {
      var linkSheet = ss.getSheetByName("Links") || ss.getSheets()[0];
      if (linkSheet) {
        var values = linkSheet.getDataRange().getValues();
        var data = [];
        for (var j = 1; j < values.length; j++) {
          var row = values[j];
          if (row[0] || row[1]) {
            data.push({
              id: j,
              title: String(row[0] || "").trim(),
              url: String(row[1] || "").trim(),
              icon: String(row[2] || "ExternalLink").trim(),
              category: String(row[3] || "Chung").trim(),
              description: String(row[4] || "").trim()
            });
          }
        }
        result.data = data;
      }
    }
  } catch (err) {
    result.status = "error";
    result.message = err.toString();
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var histSheet = ss.getSheetByName("History");
  if (!histSheet) {
    histSheet = ss.insertSheet("History");
    histSheet.appendRow(["Thời gian", "Từ khóa tìm kiếm", "Trạng thái", "Mã sản phẩm", "Tên sản phẩm", "Mã barcode", "Thiết bị"]);
    histSheet.getRange("A1:G1").setFontWeight("bold").setBackground("#e2e8f0");
  }
  try {
    var payload = JSON.parse(e.postData.contents);
    if (payload.action === "log_history" && payload.data) {
      var d = payload.data;
      var timeStr = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
      histSheet.appendRow([
        timeStr,
        d.query || "",
        d.found ? "Tìm thấy" : "Không tìm thấy",
        d.productCode || "",
        d.productName || "",
        d.barcode || "",
        d.deviceInfo || ""
      ]);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(appScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-6 bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/5 text-center animate-fadeIn">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-5 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white mb-2 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Xác Thực Quản Trị Viên</h3>
          <p className="text-xs text-blue-100 mt-0.5">
            Trung Tâm SSC - 87333
          </p>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-500">
            Vui lòng nhập mã PIN quản trị để cài đặt liên kết Google Sheets cho từng module.
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Mã PIN (Mặc định: 123456)"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg tracking-widest text-slate-900 placeholder:tracking-normal placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
              />
              {pinError && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center justify-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" /> Mã PIN không chính xác
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 transition active:scale-98"
            >
              Mở Cài Đặt Quản Trị
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
            *Mã PIN mặc định ban đầu: <span className="font-mono text-blue-600 font-bold">123456</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-fadeIn">
      {/* Header Quản Trị */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-200" />
            <h2 className="text-base sm:text-lg font-bold text-white">Cấu Hình Google Sheets Cho Từng Module</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-blue-800 shadow-2xs">
              ADMIN
            </span>
          </div>
          <p className="text-[11px] text-blue-100 mt-0.5">
            Dán đường link Google Sheet độc lập cho từng module để hệ thống tự động đồng bộ dữ liệu
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition"
          >
            Khóa lại
          </button>
          <button
            onClick={onSyncAll}
            disabled={isSyncing}
            className="px-3 py-1.5 rounded-lg bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold flex items-center space-x-1 shadow-sm transition"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin text-blue-700" : ""}`} />
            <span>{isSyncing ? "Đang đồng bộ..." : "Đồng bộ tất cả"}</span>
          </button>
        </div>
      </div>

      {/* Tabs con trong Admin */}
      <div className="flex border-b border-slate-200 space-x-2 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab("config")}
          className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition ${
            activeSubTab === "config"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-500 hover:text-blue-600"
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Cấu hình Google Sheet riêng</span>
        </button>

        <button
          onClick={() => setActiveSubTab("history")}
          className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition ${
            activeSubTab === "history"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-500 hover:text-blue-600"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Lịch sử tra cứu ({historyList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("guide")}
          className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition ${
            activeSubTab === "guide"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-500 hover:text-blue-600"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Hướng dẫn & Code.gs</span>
        </button>
      </div>

      {/* TAB 1: CẤU HÌNH GOOGLE SHEET RIÊNG BIỆT CHO TỪNG MODULE */}
      {activeSubTab === "config" && (
        <div className="space-y-4">
          {/* 1. MODULE TRA CỨU BARCODE */}
          <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Barcode className="w-4 h-4 text-blue-100" />
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  1. Google Sheet cho Module "Tra Cứu Barcode"
                </h3>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold text-white">
                Mã vạch Code 128
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div className="text-[11px] text-slate-600 space-y-1">
                <p>
                  <strong>Cách 1 (Nhanh nhất):</strong> Chia sẻ file Google Sheet Barcode ở chế độ <em>"Bất kỳ ai có đường liên kết đều có thể xem"</em> và dán link vào ô bên dưới.
                </p>
                <p className="text-slate-500">
                  Cấu trúc cột yêu cầu: <strong>Cột A:</strong> Mã SP | <strong>Cột B:</strong> Tên SP | <strong>Cột C:</strong> Mã Barcode | <strong>Cột D:</strong> Danh mục
                </p>
              </div>

              <form onSubmit={handleSaveBarcodeUrl} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={barcodeUrl}
                    onChange={(e) => setBarcodeUrlState(e.target.value)}
                    placeholder="Dán link Google Sheet Barcode (https://docs.google.com/spreadsheets/d/...)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition whitespace-nowrap"
                  >
                    Lưu & Đồng bộ Barcode
                  </button>
                </div>

                {barcodeSaved && (
                  <p className="text-[11px] text-emerald-600 flex items-center font-bold">
                    <Check className="w-3.5 h-3.5 mr-1" /> Đã lưu và kích hoạt kết nối Sheet Barcode!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* 2. MODULE TRA CỨU LINK */}
          <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link2 className="w-4 h-4 text-blue-100" />
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  2. Google Sheet cho Module "Tra Cứu LINK"
                </h3>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold text-white">
                Kho liên kết thường dùng
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div className="text-[11px] text-slate-600 space-y-1">
                <p>
                  <strong>Cách 1 (Nhanh nhất):</strong> Chia sẻ file Google Sheet Links ở chế độ <em>"Bất kỳ ai có đường liên kết đều có thể xem"</em> và dán link vào ô bên dưới.
                </p>
                <p className="text-slate-500">
                  Cấu trúc cột yêu cầu: <strong>Cột A:</strong> Tên link | <strong>Cột B:</strong> URL | <strong>Cột C:</strong> Icon (HardDrive, FileSpreadsheet, Mail, Globe...) | <strong>Cột D:</strong> Danh mục | <strong>Cột E:</strong> Mô tả
                </p>
              </div>

              <form onSubmit={handleSaveLinksUrl} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={linksUrl}
                    onChange={(e) => setLinksUrlState(e.target.value)}
                    placeholder="Dán link Google Sheet Links (https://docs.google.com/spreadsheets/d/...)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition whitespace-nowrap"
                  >
                    Lưu & Đồng bộ Links
                  </button>
                </div>

                {linksSaved && (
                  <p className="text-[11px] text-emerald-600 flex items-center font-bold">
                    <Check className="w-3.5 h-3.5 mr-1" /> Đã lưu và kích hoạt kết nối Sheet Links!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* 3. MODULE BIÊN BẢN & MẪU FILE */}
          <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-100" />
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  3. Google Sheet cho Module "Biên Bản, Mẫu File"
                </h3>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold text-white">
                Excel & Word tự động tải
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div className="text-[11px] text-slate-600 space-y-1">
                <p>
                  <strong>Cách thiết lập:</strong> Chia sẻ Google Sheet ở chế độ <em>"Bất kỳ ai có đường liên kết đều có thể xem"</em> và dán link vào ô bên dưới.
                </p>
                <p className="text-slate-500">
                  Cấu trúc cột yêu cầu: <strong>Cột A:</strong> Tên biểu mẫu / biên bản | <strong>Cột B:</strong> Link file gốc (Google Drive / Sheets / Docs / URL) | <strong>Cột C:</strong> Loại (excel / word) | <strong>Cột D:</strong> Danh mục (Kho vận, Kế toán, Nhân sự...) | <strong>Cột E:</strong> Dung lượng hoặc mô tả ngắn
                </p>
              </div>

              <form onSubmit={handleSaveDocsUrl} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={docsUrl}
                    onChange={(e) => setDocsUrlState(e.target.value)}
                    placeholder="Dán link Google Sheet Biên bản & Mẫu file (https://docs.google.com/spreadsheets/d/...)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition whitespace-nowrap"
                  >
                    Lưu & Đồng bộ Mẫu File
                  </button>
                </div>

                {docsSaved && (
                  <p className="text-[11px] text-emerald-600 flex items-center font-bold">
                    <Check className="w-3.5 h-3.5 mr-1" /> Đã lưu và kích hoạt kết nối Sheet Biên bản & Mẫu file!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* 4. ĐỔI MÃ PIN BẢO VỆ */}
          <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-blue-600 text-white px-4 py-2 flex items-center space-x-2">
              <Key className="w-3.5 h-3.5 text-blue-100" />
              <h3 className="text-xs font-bold text-white">Đổi Mã PIN Quản Trị</h3>
            </div>

            <div className="p-3.5">
              <form onSubmit={handleChangePin} className="flex items-center space-x-2 max-w-sm">
                <input
                  type="text"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Mã PIN mới (tối thiểu 4 số)..."
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition"
                >
                  Cập nhật
                </button>
              </form>
              {pinChangedMsg && (
                <p className="text-[11px] text-emerald-600 flex items-center font-bold mt-1.5">
                  <Check className="w-3.5 h-3.5 mr-1" /> Đổi mã PIN thành công!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LỊCH SỬ TRA CỨU */}
      {activeSubTab === "history" && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-2xs">
              <span className="text-[11px] text-slate-500 block">Tổng lượt tra cứu:</span>
              <span className="text-lg font-black text-slate-900">{totalCount}</span>
            </div>
            <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-2xs">
              <span className="text-[11px] text-slate-500 block">Tìm thấy sản phẩm:</span>
              <span className="text-lg font-black text-emerald-600">{foundCount}</span>
            </div>
            <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-2xs">
              <span className="text-[11px] text-slate-500 block">Tỉ lệ thành công:</span>
              <span className="text-lg font-black text-blue-600">{successRate}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Lọc từ khóa, mã SP..."
                className="w-48 pl-2.5 pr-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded px-2 py-1"
              >
                <option value="all">Tất cả</option>
                <option value="found">Tìm thấy</option>
                <option value="not_found">Không thấy</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleExportCsv}
                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>Xuất CSV</span>
              </button>
              <button
                onClick={handleClearHistory}
                className="px-2 py-1 rounded border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs max-h-72 overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-blue-600 text-white uppercase tracking-wider font-bold sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Thời gian</th>
                  <th className="py-2.5 px-3">Từ khóa</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3">Mã SP</th>
                  <th className="py-2.5 px-3">Tên sản phẩm</th>
                  <th className="py-2.5 px-3">Barcode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-blue-50/50">
                    <td className="py-2 px-3 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {item.timestamp ? new Date(item.timestamp).toLocaleString("vi-VN") : "N/A"}
                    </td>
                    <td className="py-2 px-3 font-mono font-bold text-blue-950">
                      {item.query}
                    </td>
                    <td className="py-2 px-3">
                      {item.found ? (
                        <span className="text-emerald-700 font-bold text-[11px]">Tìm thấy</span>
                      ) : (
                        <span className="text-rose-600 font-medium text-[11px]">Không thấy</span>
                      )}
                    </td>
                    <td className="py-2 px-3 font-mono text-blue-600 font-bold">{item.productCode || "—"}</td>
                    <td className="py-2 px-3 truncate max-w-xs">{item.productName || "—"}</td>
                    <td className="py-2 px-3 font-mono text-blue-700">{item.barcode || "—"}</td>
                  </tr>
                ))}
                {filteredHistory.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      Chưa có dữ liệu tra cứu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: HƯỚNG DẪN & CODE.GS */}
      {activeSubTab === "guide" && (
        <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Mã nguồn Apps Script (Dành cho ai muốn dùng Web App)</h3>
            <button
              onClick={copyCode}
              className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold flex items-center space-x-1"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Đã copy!" : "Copy code"}</span>
            </button>
          </div>
          <pre className="bg-slate-900 p-3 rounded-lg text-blue-300 font-mono text-[11px] overflow-x-auto max-h-60">
            {appScriptCode}
          </pre>
        </div>
      )}
    </div>
  );
}
