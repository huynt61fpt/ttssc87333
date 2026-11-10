// Service kết nối độc lập từng Google Sheet cho mỗi Module (Barcode, Links, Documents)
import * as XLSX from "xlsx";

export const DEFAULT_MOCK_BARCODES = [
  {
    productCode: "00021971",
    productName: "TETRACYCLIN 1% MEDIPHARCO 5G",
    barcode: "014260100013",
    category: "Dược phẩm",
    unit: "Tuýp",
    status: "Đang kinh doanh"
  },
  {
    productCode: "00007304",
    productName: "Sản phẩm mã 00007304 - Trung Tâm SSC Long Châu",
    barcode: "00007304",
    category: "Dược phẩm",
    unit: "Hộp",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-883901",
    productName: "Cà phê Robusta Đắk Lắk Thượng Hạng 500g",
    barcode: "8935001883901",
    category: "Thực phẩm",
    unit: "Gói",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-883902",
    productName: "Trà Xanh Thái Nguyên Cao Cấp 200g",
    barcode: "8935001883902",
    category: "Đồ uống",
    unit: "Hộp",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-883903",
    productName: "Bánh Quy Bơ Pháp Hộp Thiếc Hoàng Gia",
    barcode: "8935001883903",
    category: "Bánh kẹo",
    unit: "Hộp",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-771234",
    productName: "Nước Rửa Tay Sát Khuẩn Tinh Dầu Tràm 500ml",
    barcode: "8936002771234",
    category: "Gia dụng",
    unit: "Chai",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-992145",
    productName: "Khăn Giấy Ướt Kháng Khuẩn Không Mùi 100 Tờ",
    barcode: "8938003992145",
    category: "Vệ sinh",
    unit: "Gói",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-556677",
    productName: "Sữa Hạt Óc Chó Hạnh Nhân Không Đường 1L",
    barcode: "8939004556677",
    category: "Sữa hạt",
    unit: "Hộp",
    status: "Đang kinh doanh"
  },
  {
    productCode: "SP-334455",
    productName: "Bộ Ly Thủy Tinh Chịu Nhiệt Cao Cấp 6 Chiếc",
    barcode: "8931005334455",
    category: "Gia dụng",
    unit: "Bộ",
    status: "Đang kinh doanh"
  }
];

export const DEFAULT_MOCK_LINKS = [
  { id: 1, title: "AI mentor", url: "https://example.com/ai-mentor", icon: "search" },
  { id: 2, title: "Báo cáo KPI cận date", url: "https://example.com/kpi", icon: "box" },
  { id: 3, title: "Chính sách đổi trả", url: "https://example.com/doi-tra", icon: "cylinder" },
  { id: 4, title: "Claim NVC", url: "https://example.com/claim-nvc", icon: "search" },
  { id: 5, title: "Duyệt mua điện thoại", url: "https://example.com/duyet-mua", icon: "search" },
  { id: 6, title: "Điều chỉnh hóa đơn", url: "https://example.com/dieu-chinh-hd", icon: "document" },
  { id: 7, title: "Đổ báo cáo y tế", url: "https://example.com/bc-yte", icon: "medical" },
  { id: 8, title: "FPT chat", url: "https://example.com/fpt-chat", icon: "chat" },
  { id: 9, title: "Giới thiệu người tài (GTNT)", url: "https://example.com/gtnt", icon: "search" },
  { id: 10, title: "Hệ thống cửa hàng Long Châu", url: "https://example.com/longchau", icon: "medical" },
  { id: 11, title: "Khiếu nại NVC XanhSM", url: "https://example.com/xanhsm", icon: "search" },
  { id: 12, title: "Kiểm tra giao dịch chuyển khoản", url: "https://example.com/chuyen-khoan", icon: "education" },
  { id: 13, title: "Link đào tạo", url: "https://example.com/dao-tao", icon: "search" },
  { id: 14, title: "Link đăng ký CTV Ecom", url: "https://example.com/ctv-ecom", icon: "search" },
  { id: 15, title: "Link truy cập mail", url: "https://mail.google.com", icon: "mail" },
  { id: 16, title: "Link truy cập vào trang inside", url: "https://example.com/inside", icon: "lock" },
  { id: 17, title: "Loại trừ trùng lặp FS", url: "https://example.com/trung-lap-fs", icon: "search" },
  { id: 18, title: "Phụ cấp trực đêm Long Châu", url: "https://example.com/phu-cap-truc-dem", icon: "medical" },
  { id: 19, title: "RSA CTV Ecom", url: "https://example.com/rsa-ecom", icon: "lock" },
  { id: 20, title: "Tải app bán hàng, giao hàng", url: "https://example.com/tai-app", icon: "truck" },
  { id: 21, title: "Tài liệu nội bộ công ty", url: "https://example.com/tai-lieu", icon: "search" }
];

// Danh sách biên bản & mẫu file chuẩn SSC Long Châu
export const DEFAULT_MOCK_DOCUMENTS = [
  {
    id: 1,
    title: "Biên bản bàn giao ca trực đêm dược sĩ Long Châu",
    type: "excel", // "excel" | "word"
    extension: ".xlsx",
    category: "Vận hành cửa hàng",
    size: "45 KB",
    updatedAt: "2026-11-01",
    url: ""
  },
  {
    id: 2,
    title: "Mẫu đơn đề nghị thanh toán phụ cấp trực ca đêm",
    type: "word",
    extension: ".docx",
    category: "Nhân sự & Phúc lợi",
    size: "32 KB",
    updatedAt: "2026-10-25",
    url: ""
  },
  {
    id: 3,
    title: "Biên bản kiểm kê hàng hóa cận hạn sử dụng (Cận date)",
    type: "excel",
    extension: ".xlsx",
    category: "Quản lý kho",
    size: "58 KB",
    updatedAt: "2026-11-05",
    url: ""
  },
  {
    id: 4,
    title: "Mẫu biên bản khiếu nại thất thoát / hư hỏng hàng hóa NVC",
    type: "word",
    extension: ".docx",
    category: "Vận chuyển",
    size: "36 KB",
    updatedAt: "2026-10-28",
    url: ""
  },
  {
    id: 5,
    title: "Biên bản hủy thuốc, dược phẩm vỡ hỏng tại nhà thuốc",
    type: "excel",
    extension: ".xlsx",
    category: "Dược phẩm",
    size: "62 KB",
    updatedAt: "2026-11-02",
    url: ""
  },
  {
    id: 6,
    title: "Mẫu đơn xin duyệt mua sắm thiết bị & điện thoại cửa hàng",
    type: "word",
    extension: ".docx",
    category: "Hành chính",
    size: "28 KB",
    updatedAt: "2026-10-15",
    url: ""
  },
  {
    id: 7,
    title: "Biên bản tra soát & đối chiếu tiền chuyển khoản ngân hàng",
    type: "excel",
    extension: ".xlsx",
    category: "Kế toán - Tài chính",
    size: "74 KB",
    updatedAt: "2026-11-08",
    url: ""
  },
  {
    id: 8,
    title: "Mẫu hợp đồng / phiếu đăng ký cộng tác viên E-Commerce",
    type: "word",
    extension: ".docx",
    category: "Kinh doanh online",
    size: "42 KB",
    updatedAt: "2026-10-30",
    url: ""
  }
];

const STORAGE_KEYS = {
  BARCODE_SHEET_URL: "portal_barcode_sheet_url",
  LINKS_SHEET_URL: "portal_links_sheet_url",
  DOCS_SHEET_URL: "portal_docs_sheet_url",
  BARCODE_CACHE: "portal_barcode_cache_v4",
  LINKS_CACHE: "portal_links_cache_v4",
  DOCS_CACHE: "portal_docs_cache_v4",
  SEARCH_HISTORY: "portal_search_history",
  ADMIN_PIN: "portal_admin_pin",
  BARCODE_LAST_SYNC: "portal_barcode_last_sync",
  LINKS_LAST_SYNC: "portal_links_last_sync",
  DOCS_LAST_SYNC: "portal_docs_last_sync"
};

export const getBarcodeSheetUrl = () => localStorage.getItem(STORAGE_KEYS.BARCODE_SHEET_URL) || "";
export const setBarcodeSheetUrl = (url) => localStorage.setItem(STORAGE_KEYS.BARCODE_SHEET_URL, url.trim());

export const getLinksSheetUrl = () => localStorage.getItem(STORAGE_KEYS.LINKS_SHEET_URL) || "";
export const setLinksSheetUrl = (url) => localStorage.setItem(STORAGE_KEYS.LINKS_SHEET_URL, url.trim());

export const getDocsSheetUrl = () => localStorage.getItem(STORAGE_KEYS.DOCS_SHEET_URL) || "";
export const setDocsSheetUrl = (url) => localStorage.setItem(STORAGE_KEYS.DOCS_SHEET_URL, url.trim());

export const getAdminPin = () => localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || "123456";
export const setAdminPin = (pin) => localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, pin);

export const getLocalHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Lỗi đọc lịch sử cục bộ:", e);
    return [];
  }
};

export const clearLocalHistory = () => localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);

function getGoogleSheetCsvUrl(rawUrl, defaultSheetName = "") {
  const url = rawUrl.trim();
  if (!url) return null;

  if (url.includes("script.google.com/macros/s/")) {
    return { type: "app_script", url };
  }

  if (url.includes("output=csv") || url.includes("export?format=csv")) {
    return { type: "csv", url };
  }

  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    const gidMatch = url.match(/[#&]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : "";
    const sheetParam = defaultSheetName ? `&sheet=${encodeURIComponent(defaultSheetName)}` : "";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${sheetParam}${gidParam}`;
    return { type: "csv", url: csvUrl };
  }

  return { type: "raw", url };
}

function parseCsv(csvText) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentToken = "";

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentToken += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(currentToken.trim());
      currentToken = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      row.push(currentToken.trim());
      currentToken = "";
      if (row.some((cell) => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
    } else {
      currentToken += char;
    }
  }

  if (currentToken || row.length > 0) {
    row.push(currentToken.trim());
    if (row.some((cell) => cell.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

export const recordSearchHistory = async (historyItem) => {
  const item = {
    id: "H-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
    timestamp: new Date().toISOString(),
    query: String(historyItem.query || ""),
    found: !!historyItem.found,
    productCode: String(historyItem.productCode || "N/A"),
    productName: String(historyItem.productName || "N/A"),
    barcode: String(historyItem.barcode || "N/A"),
    deviceInfo: `${navigator.platform || "PC"} - ${navigator.userAgent.includes("Mobile") ? "Di động" : "Máy tính"}`
  };

  try {
    const currentList = getLocalHistory();
    const updated = [item, ...currentList].slice(0, 500);
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error("Không thể lưu lịch sử cục bộ:", e);
  }

  const barcodeUrl = getBarcodeSheetUrl();
  if (barcodeUrl && barcodeUrl.includes("script.google.com")) {
    try {
      await fetch(barcodeUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "log_history", data: item })
      });
    } catch (err) {
      console.warn("Không thể đồng bộ log lịch sử lên Apps Script:", err);
    }
  }

  return item;
};

function normalizeBarcodeItem(raw) {
  return {
    productCode: String(raw.productCode || raw.code || "").trim(),
    productName: String(raw.productName || raw.name || "").trim(),
    barcode: String(raw.barcode || raw.code || raw.productCode || "").trim().replace(/^'/, ""),
    category: String(raw.category || "Dược phẩm").trim(),
    status: String(raw.status || "Đang kinh doanh").trim()
  };
}

export const fetchBarcodes = async () => {
  const rawUrl = getBarcodeSheetUrl();
  const config = getGoogleSheetCsvUrl(rawUrl, "Barcode");

  if (config) {
    try {
      if (config.type === "app_script") {
        const res = await fetch(`${config.url}?action=get_barcodes`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            const normalized = json.data.map(normalizeBarcodeItem);
            localStorage.setItem(STORAGE_KEYS.BARCODE_CACHE, JSON.stringify(normalized));
            localStorage.setItem(STORAGE_KEYS.BARCODE_LAST_SYNC, new Date().toISOString());
            return { data: normalized, source: "Google Sheet Barcode (Trực tiếp)" };
          }
        }
      } else {
        const res = await fetch(config.url);
        if (res.ok) {
          const csvText = await res.text();
          const rows = parseCsv(csvText);
          const items = [];
          for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (r[0] || r[1] || r[2]) {
              const pCode = String(r[0] || "").trim();
              const pName = String(r[1] || "").trim();
              const pBarcode = String(r[2] || pCode).trim().replace(/^'/, "");

              items.push({
                productCode: pCode,
                productName: pName || `Sản phẩm ${pCode}`,
                barcode: pBarcode,
                category: String(r[3] || "Dược phẩm").trim(),
                status: String(r[4] || "Đang kinh doanh").trim()
              });
            }
          }
          if (items.length > 0) {
            localStorage.setItem(STORAGE_KEYS.BARCODE_CACHE, JSON.stringify(items));
            localStorage.setItem(STORAGE_KEYS.BARCODE_LAST_SYNC, new Date().toISOString());
            return { data: items, source: "Google Sheet Barcode (CSV)" };
          }
        }
      }
    } catch (err) {
      console.warn("Lỗi tải từ Google Sheet Barcode:", err);
    }
  }

  const cached = localStorage.getItem(STORAGE_KEYS.BARCODE_CACHE);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return { data: parsed.map(normalizeBarcodeItem), source: "Bộ nhớ đệm Barcode (Cache)" };
    } catch (e) {}
  }

  return { data: DEFAULT_MOCK_BARCODES.map(normalizeBarcodeItem), source: "Dữ liệu mẫu Barcode (Demo)" };
};

export const fetchLinks = async () => {
  const rawUrl = getLinksSheetUrl();
  const config = getGoogleSheetCsvUrl(rawUrl, "Links");

  if (config) {
    try {
      if (config.type === "app_script") {
        const res = await fetch(`${config.url}?action=get_links`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            localStorage.setItem(STORAGE_KEYS.LINKS_CACHE, JSON.stringify(json.data));
            localStorage.setItem(STORAGE_KEYS.LINKS_LAST_SYNC, new Date().toISOString());
            return { data: json.data, source: "Google Sheet Links (Trực tiếp)" };
          }
        }
      } else {
        const res = await fetch(config.url);
        if (res.ok) {
          const csvText = await res.text();
          const rows = parseCsv(csvText);
          const items = [];
          for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (r[0] || r[1]) {
              items.push({
                id: i,
                title: String(r[0] || "").trim(),
                url: String(r[1] || "").trim(),
                icon: String(r[2] || "search").trim(),
                category: String(r[3] || "Chung").trim(),
                description: String(r[4] || "").trim()
              });
            }
          }
          if (items.length > 0) {
            localStorage.setItem(STORAGE_KEYS.LINKS_CACHE, JSON.stringify(items));
            localStorage.setItem(STORAGE_KEYS.LINKS_LAST_SYNC, new Date().toISOString());
            return { data: items, source: "Google Sheet Links (CSV)" };
          }
        }
      }
    } catch (err) {
      console.warn("Lỗi tải từ Google Sheet Links:", err);
    }
  }

  return { data: DEFAULT_MOCK_LINKS, source: "Mẫu giao diện SSC (21 Links)" };
};

// Hàm chuẩn hóa thông tin tài liệu
function normalizeDocumentItem(item, id = 1) {
  const title = String(item.title || item.name || `Biểu mẫu SSC số ${id}`).trim();
  const url = String(item.url || item.link || "").trim();
  const rawType = String(item.type || item.extension || "").toLowerCase().trim();
  const titleLow = title.toLowerCase();
  const urlLow = url.toLowerCase();

  // Nhận diện chuẩn xác 100% định dạng Excel vs Word
  const isExcel =
    rawType === "excel" ||
    rawType === "xlsx" ||
    rawType === "xls" ||
    urlLow.includes("spreadsheets") ||
    urlLow.includes("format=xlsx") ||
    urlLow.endsWith(".xlsx") ||
    urlLow.endsWith(".xls") ||
    titleLow.includes(".xlsx") ||
    titleLow.includes(".xls") ||
    (!rawType.includes("word") &&
      !rawType.includes("doc") &&
      (titleLow.includes("kiểm kê") ||
        titleLow.includes("bảng kê") ||
        titleLow.includes("tra soát") ||
        titleLow.includes("bàn giao ca") ||
        titleLow.includes("hủy thuốc") ||
        titleLow.includes("thu chi") ||
        titleLow.includes("tồn kho")));

  return {
    id: item.id || id,
    title,
    url,
    type: isExcel ? "excel" : "word",
    extension: isExcel ? ".xlsx" : ".docx",
    category: String(item.category || item.phongBan || "Nghiệp vụ SSC").trim(),
    size: String(item.size || (isExcel ? "45 KB" : "32 KB")).trim(),
    updatedAt: String(item.updatedAt || item.date || new Date().toISOString().slice(0, 10)).trim()
  };
}

// Hàm thông minh phân tích dòng CSV từ Google Sheet của người dùng
function parseDocumentRow(row, id) {
  let url = "";
  let urlIdx = -1;

  // 1. Quét tìm cột chứa URL
  for (let i = 0; i < row.length; i++) {
    const val = String(row[i] || "").trim();
    if (
      val.startsWith("http://") ||
      val.startsWith("https://") ||
      val.includes("drive.google.com") ||
      val.includes("docs.google.com")
    ) {
      url = val;
      urlIdx = i;
      break;
    }
  }

  // 2. Lấy các ô còn lại (loại bỏ ô URL)
  const remaining = row
    .map((cell, idx) => ({ text: String(cell || "").trim(), idx }))
    .filter((item) => item.idx !== urlIdx && item.text.length > 0);

  if (remaining.length === 0 && !url) return null;

  // 3. Quét tìm ô chỉ định loại file
  let explicitType = "";
  let typeIdx = -1;
  for (const item of remaining) {
    const low = item.text.toLowerCase();
    if (
      low === "excel" ||
      low === "xlsx" ||
      low === "xls" ||
      low === "bảng tính" ||
      low === "sheet" ||
      low.includes(".xlsx")
    ) {
      explicitType = "excel";
      typeIdx = item.idx;
      break;
    }
    if (
      low === "word" ||
      low === "docx" ||
      low === "doc" ||
      low === "văn bản" ||
      low.includes(".docx")
    ) {
      explicitType = "word";
      typeIdx = item.idx;
      break;
    }
  }

  // 4. Lấy tiêu đề tài liệu
  const titleCandidates = remaining.filter((item) => item.idx !== typeIdx);
  let title = "";
  if (titleCandidates.length > 0) {
    // Nếu ô đầu là STT (1, 2, 3...) thì lấy ô kế tiếp làm tiêu đề
    if (/^\d+$/.test(titleCandidates[0].text) && titleCandidates.length > 1) {
      title = titleCandidates[1].text;
    } else {
      title = titleCandidates[0].text;
    }
  } else {
    title = `Biểu mẫu SSC số ${id}`;
  }

  // 5. Xác định định dạng cuối cùng
  let isExcel = false;
  if (explicitType === "excel") {
    isExcel = true;
  } else if (explicitType === "word") {
    isExcel = false;
  } else {
    const checkStr = `${title} ${url}`.toLowerCase();
    isExcel =
      checkStr.includes("spreadsheets") ||
      checkStr.includes("excel") ||
      checkStr.includes("xlsx") ||
      checkStr.includes("xls") ||
      checkStr.includes("kiểm kê") ||
      checkStr.includes("bảng kê") ||
      checkStr.includes("tra soát") ||
      checkStr.includes("thu chi") ||
      checkStr.includes("tồn kho") ||
      checkStr.includes("bàn giao ca");
  }

  // 6. Lấy danh mục
  const catCandidates = titleCandidates.filter(
    (item) => item.text !== title && !/^\d+$/.test(item.text)
  );
  const category = catCandidates.length > 0 ? catCandidates[0].text : "Nghiệp vụ SSC";

  return {
    id,
    title,
    url,
    type: isExcel ? "excel" : "word",
    extension: isExcel ? ".xlsx" : ".docx",
    category,
    size: isExcel ? "45 KB" : "32 KB",
    updatedAt: new Date().toISOString().slice(0, 10)
  };
}

// 3. TẢI DỮ LIỆU TỪ SHEET BIÊN BẢN & MẪU FILE
export const fetchDocuments = async () => {
  const rawUrl = getDocsSheetUrl();
  const config = getGoogleSheetCsvUrl(rawUrl, "Documents");

  if (config) {
    try {
      if (config.type === "app_script") {
        const res = await fetch(`${config.url}?action=get_docs`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            const normalized = json.data.map((item, idx) =>
              normalizeDocumentItem(item, idx + 1)
            );
            localStorage.setItem(STORAGE_KEYS.DOCS_CACHE, JSON.stringify(normalized));
            localStorage.setItem(STORAGE_KEYS.DOCS_LAST_SYNC, new Date().toISOString());
            return { data: normalized, source: "Google Sheet Mẫu File (Trực tiếp)" };
          }
        }
      } else {
        const res = await fetch(config.url);
        if (res.ok) {
          const csvText = await res.text();
          const rows = parseCsv(csvText);
          const items = [];
          for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (!r || r.every((cell) => !cell)) continue;

            const parsed = parseDocumentRow(r, i);
            if (parsed) items.push(parsed);
          }
          if (items.length > 0) {
            localStorage.setItem(STORAGE_KEYS.DOCS_CACHE, JSON.stringify(items));
            localStorage.setItem(STORAGE_KEYS.DOCS_LAST_SYNC, new Date().toISOString());
            return { data: items, source: "Google Sheet Mẫu File (CSV)" };
          }
        }
      }
    } catch (err) {
      console.warn("Lỗi tải từ Google Sheet Documents:", err);
    }
  }

  const cached = localStorage.getItem(STORAGE_KEYS.DOCS_CACHE);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return {
        data: parsed.map(normalizeDocumentItem),
        source: "Bộ nhớ đệm Mẫu File (Cache)"
      };
    } catch (e) {}
  }

  return {
    data: DEFAULT_MOCK_DOCUMENTS.map(normalizeDocumentItem),
    source: "Dữ liệu mẫu Biên Bản & Mẫu File (Demo)"
  };
};

// HÀM TỰ ĐỘNG TẢI VỀ CHUẨN 100% EXCEL (.xlsx) HOẶC WORD (.docx)
export function triggerDownloadDocument(doc) {
  if (!doc) return;

  const url = doc.url ? doc.url.trim() : "";
  const title = String(doc.title || "bieu_mau_ssc").trim();
  const cleanBaseName = title
    .replace(/[\/\\:*?"<>|]/g, "_")
    .replace(/\.(xlsx|xls|docx|doc)$/i, "");

  // Kiểm tra dứt khoát loại tài liệu
  const typeStr = String(doc.type || "").toLowerCase().trim();
  const extStr = String(doc.extension || "").toLowerCase().trim();
  const titleStr = title.toLowerCase();

  const isExcel =
    typeStr === "excel" ||
    extStr === ".xlsx" ||
    extStr.includes("xls") ||
    titleStr.includes(".xlsx") ||
    titleStr.includes(".xls") ||
    url.includes("spreadsheets") ||
    url.includes("format=xlsx");

  // ==========================================
  // NHÁNH 1: TẢI FILE EXCEL (.xlsx)
  // ==========================================
  if (isExcel) {
    // 1.1 Nếu link là Google Sheets -> Xuất thẳng định dạng .xlsx
    const gSheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (gSheetMatch && gSheetMatch[1]) {
      const directExcel = `https://docs.google.com/spreadsheets/d/${gSheetMatch[1]}/export?format=xlsx`;
      const link = document.createElement("a");
      link.href = directExcel;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = `${cleanBaseName}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 1.2 Nếu là link file tải trực tiếp kết thúc bằng .xlsx hoặc .xls
    if (url && (url.toLowerCase().endsWith(".xlsx") || url.toLowerCase().endsWith(".xls"))) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = `${cleanBaseName}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 1.3 Nếu là file Google Drive
    const gDriveMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (gDriveMatch && gDriveMatch[1] && !url.includes("/document/")) {
      const directDrive = `https://drive.google.com/uc?export=download&id=${gDriveMatch[1]}`;
      window.open(directDrive, "_blank");
      return;
    }

    // 1.4 Luôn tự động sinh file Microsoft Excel (.xlsx) chuẩn 100% bằng thư viện SheetJS (XLSX)
    try {
      const wb = XLSX.utils.book_new();
      const wsData = [
        [`TRUNG TÂM SSC - 87333 | BIỂU MẪU NGHIỆP VỤ NỘI BỘ`],
        [title.toUpperCase()],
        [`Đơn vị ban hành: Trung Tâm SSC (Mã: 87333) - FPT Long Châu`],
        [`Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}`],
        [],
        ["STT", "Nội Dung / Mục Nghiệp Vụ", "Số Lượng / Trạng Thái", "Bộ Phận Phụ Trách", "Ghi Chú"],
        [1, "Kiểm tra danh mục hàng hóa / thuốc theo quy chuẩn", "Đạt chuẩn", "Dược sĩ phụ trách", "Đã rà soát"],
        [2, "Bàn giao hồ sơ chứng từ ca trực & đối soát số liệu", "Đã xác nhận", "Trung Tâm SSC", "Khớp số liệu"],
        [3, "Xác nhận của quản lý cửa hàng / trưởng ca", "Đã ký", "Cửa hàng trưởng", "Hợp lệ"],
        [],
        [],
        ["", "Người Lập Biểu Mẫu", "", "Phụ Trách Trung Tâm SSC", ""],
        ["", "(Ký và ghi rõ họ tên)", "", "(Ký và đóng dấu)", ""]
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!cols"] = [{ wch: 8 }, { wch: 45 }, { wch: 25 }, { wch: 22 }, { wch: 25 }];
      XLSX.utils.book_append_sheet(wb, ws, "BieuMauSSC");
      XLSX.writeFile(wb, `${cleanBaseName}.xlsx`);
      return;
    } catch (err) {
      console.error("Lỗi tạo file Excel .xlsx:", err);
    }
  }

  // ==========================================
  // NHÁNH 2: TẢI FILE WORD (.docx / .doc)
  // ==========================================
  // 2.1 Nếu link là Google Docs -> Xuất thẳng .docx
  const gDocMatch = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
  if (gDocMatch && gDocMatch[1]) {
    const directWord = `https://docs.google.com/document/d/${gDocMatch[1]}/export?format=docx`;
    const link = document.createElement("a");
    link.href = directWord;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${cleanBaseName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // 2.2 Nếu là link file tải trực tiếp kết thúc bằng .docx hoặc .doc
  if (url && (url.toLowerCase().endsWith(".docx") || url.toLowerCase().endsWith(".doc"))) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${cleanBaseName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // 2.3 Nếu có link URL trực tiếp khác
  if (url && !url.includes("example.com")) {
    window.open(url, "_blank");
    return;
  }

  // 2.4 Tự động sinh file Word HTML (.doc) mở chuẩn 100% trong Microsoft Word
  const wordContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${title}</title>
<style>
body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; margin: 40px; }
h2 { text-align: center; color: #1e3a8a; font-size: 16pt; margin-top: 10px; }
.header { text-align: center; font-weight: bold; margin-bottom: 20px; }
.meta { margin-top: 20px; border-collapse: collapse; width: 100%; }
.meta td, .meta th { border: 1px solid #999; padding: 8px; text-align: left; }
.meta th { background-color: #2563eb; color: white; }
</style></head>
<body>
<div class='header'>
  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
  Độc lập - Tự do - Hạnh phúc<br>
  ----------o0o----------
</div>
<h2>${title.toUpperCase()}</h2>
<p style='text-align: center; font-style: italic;'>Mã đơn vị: Trung Tâm SSC - 87333 (FPT Long Châu)</p>
<p><strong>Kính gửi:</strong> Ban Giám Đốc / Trưởng Bộ Phận Trung Tâm SSC</p>
<p>Họ và tên người lập: ............................................................................................</p>
<p>Chức danh / Bộ phận: ...........................................................................................</p>
<table class='meta'>
  <tr><th>STT</th><th>Nội dung thực hiện</th><th>Thời gian</th><th>Xác nhận</th></tr>
  <tr><td>1</td><td>${title}</td><td>${new Date().toLocaleDateString("vi-VN")}</td><td>Hoàn tất</td></tr>
  <tr><td>2</td><td>Bàn giao hồ sơ chứng từ</td><td>${new Date().toLocaleDateString("vi-VN")}</td><td>Đã nộp</td></tr>
</table>
<table style='width: 100%; margin-top: 40px; text-align: center;'>
  <tr>
    <td style='width: 50%;'><strong>Người lập biểu mẫu</strong><br><em>(Ký và ghi rõ họ tên)</em></td>
    <td style='width: 50%;'><strong>Phụ trách Trung Tâm SSC</strong><br><em>(Ký và xác nhận)</em></td>
  </tr>
</table>
</body></html>`;
  const blob = new Blob(["\ufeff", wordContent], { type: "application/msword;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${cleanBaseName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
