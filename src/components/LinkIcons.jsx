import React from "react";

// Bộ Icon đồ họa chất lượng cao theo đúng chuẩn giao diện ảnh mẫu của Trung Tâm SSC
export function MagnifyingGlassWithRibbonIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueRibbon" x1="16" y1="12" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="goldHandle" x1="36" y1="36" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Ruy băng xoắn màu xanh 3D */}
      <path
        d="M20 14 C12 20, 14 34, 24 38 C34 42, 44 32, 40 20 C36 8, 22 8, 20 14 Z"
        stroke="url(#blueRibbon)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Kính lúp vàng */}
      <circle cx="38" cy="38" r="11" stroke="#F59E0B" strokeWidth="3.5" fill="#EFF6FF" fillOpacity="0.8" />
      <path d="M46 46 L55 55" stroke="url(#goldHandle)" strokeWidth="4.5" strokeLinecap="round" />
      {/* Điểm sáng mặt kính */}
      <circle cx="35" cy="35" r="2.5" fill="#60A5FA" />
    </svg>
  );
}

export function BoxWithGlassIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Khối hộp isometric 3D xanh dương */}
      <polygon points="32,12 48,20 32,28 16,20" fill="#60A5FA" />
      <polygon points="16,20 32,28 32,46 16,38" fill="#2563EB" />
      <polygon points="32,28 48,20 48,38 32,46" fill="#1D4ED8" />
      {/* Kính lúp vàng đính kèm */}
      <circle cx="44" cy="40" r="8" stroke="#F59E0B" strokeWidth="2.5" fill="#EFF6FF" />
      <path d="M50 46 L57 53" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CylinderIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trụ database / đĩa tròn xanh */}
      <ellipse cx="32" cy="22" rx="16" ry="6" fill="#60A5FA" />
      <path d="M16 22 V36 C16 39.5 23 42 32 42 C41 42 48 39.5 48 36 V22" fill="#2563EB" />
      <ellipse cx="32" cy="22" rx="16" ry="6" fill="#93C5FD" fillOpacity="0.4" />
      {/* Nhãn thông báo số 0 */}
      <circle cx="44" cy="16" r="4.5" fill="#F87171" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="44" y="18.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">0</text>
    </svg>
  );
}

export function DocumentIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tờ hóa đơn bo góc có viền xanh */}
      <rect x="20" y="14" width="24" height="34" rx="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.5" />
      <line x1="26" y1="22" x2="38" y2="22" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="28" x2="38" y2="28" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="34" x2="34" y2="34" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      {/* Dấu tick xanh */}
      <circle cx="38" cy="40" r="4" fill="#3B82F6" />
      <path d="M36 40 L37.5 41.5 L40.5 38.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function MedicalBoxIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hộp thuốc y tế / Long Châu */}
      <rect x="16" y="20" width="32" height="26" rx="4" fill="#2563EB" />
      <rect x="24" y="15" width="16" height="7" rx="2" stroke="#2563EB" strokeWidth="2.5" fill="#EFF6FF" />
      {/* Chữ thập y tế trắng */}
      <circle cx="32" cy="33" r="8" fill="#FFFFFF" />
      <path d="M32 29 V37 M28 33 H36" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChatBubbleIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 20 C18 16 22 14 32 14 C42 14 46 16 46 24 C46 32 40 34 32 34 C28 34 24 35 20 38 L22 33 C19 31 18 27 18 20 Z"
        fill="#2563EB"
      />
      <circle cx="26" cy="24" r="2" fill="#FFFFFF" />
      <circle cx="32" cy="24" r="2" fill="#FFFFFF" />
      <circle cx="38" cy="24" r="2" fill="#FFFFFF" />
    </svg>
  );
}

export function EducationIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mũ tốt nghiệp cử nhân */}
      <polygon points="32,16 48,23 32,30 16,23" fill="#1D4ED8" />
      <rect x="24" y="27" width="16" height="8" rx="2" fill="#2563EB" />
      {/* Quyển sách mở bên dưới */}
      <path d="M18 42 C24 38 30 40 32 42 C34 40 40 38 46 42 V46 C40 42 34 44 32 46 C30 44 24 42 18 46 Z" fill="#60A5FA" />
    </svg>
  );
}

export function LaptopMailIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Màn hình laptop */}
      <rect x="20" y="18" width="24" height="17" rx="2" fill="#1D4ED8" />
      <polygon points="14,37 50,37 46,40 18,40" fill="#60A5FA" />
      {/* Thư email trong màn hình */}
      <rect x="24" y="22" width="16" height="10" rx="1" fill="#FFFFFF" />
      <path d="M24 22 L32 28 L40 22" stroke="#2563EB" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function LockIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Càng khóa bạc */}
      <path d="M24 27 V20 C24 15.5 27.5 12 32 12 C36.5 12 40 15.5 40 20 V27" stroke="#94A3B8" strokeWidth="3.5" fill="none" />
      {/* Thân ổ khóa xanh 3D */}
      <rect x="20" y="26" width="24" height="20" rx="4" fill="#2563EB" />
      <circle cx="32" cy="34" r="2.5" fill="#FBBF24" />
      <rect x="31" y="34" width="2" height="5" fill="#FBBF24" />
    </svg>
  );
}

export function TruckIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Thùng xe tải xanh */}
      <rect x="14" y="22" width="22" height="16" rx="2" fill="#2563EB" />
      <path d="M36 26 H44 L48 32 V38 H36 Z" fill="#60A5FA" />
      {/* Bánh xe */}
      <circle cx="22" cy="40" r="4" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="42" cy="40" r="4" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Vạch tốc độ */}
      <line x1="8" y1="26" x2="11" y2="26" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="30" x2="11" y2="30" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Icon 3D Cao Cấp Cho Module Tra Cứu Barcode Trang Chủ
export function Barcode3DHeroIcon({ className = "w-20 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="16" y1="20" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient id="cardBorder" x1="16" y1="20" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="laserGrad" x1="14" y1="48" x2="82" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" stopOpacity="0" />
          <stop offset="0.2" stopColor="#EF4444" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#F87171" stopOpacity="1" />
          <stop offset="0.8" stopColor="#EF4444" stopOpacity="0.8" />
          <stop offset="1" stopColor="#EF4444" stopOpacity="0" />
        </linearGradient>
        <filter id="laserGlow" x="10" y="42" width="76" height="12" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="shadow3D" x="8" y="14" width="80" height="74" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1E3A8A" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Bóng đổ 3D bên dưới */}
      <ellipse cx="48" cy="82" rx="34" ry="7" fill="#1E293B" fillOpacity="0.12" />

      {/* Thẻ tem 3D bo góc */}
      <g filter="url(#shadow3D)">
        <rect x="14" y="16" width="68" height="58" rx="14" fill="url(#cardGrad)" stroke="url(#cardBorder)" strokeWidth="2.5" />
      </g>

      {/* Dãy vạch mã vạch Code 128 3D */}
      <g fill="#1E293B">
        <rect x="23" y="26" width="3.5" height="34" rx="1" />
        <rect x="29" y="26" width="2" height="34" rx="0.8" />
        <rect x="33.5" y="26" width="4.5" height="34" rx="1" />
        <rect x="40.5" y="26" width="2" height="34" rx="0.8" />
        <rect x="45" y="26" width="5.5" height="34" rx="1" />
        <rect x="53" y="26" width="2.5" height="34" rx="0.8" />
        <rect x="58" y="26" width="4" height="34" rx="1" />
        <rect x="64.5" y="26" width="2" height="34" rx="0.8" />
        <rect x="69" y="26" width="4.5" height="34" rx="1" />
      </g>

      {/* Tia laser quét ngang 3D màu đỏ/cam phát sáng */}
      <g filter="url(#laserGlow)">
        <line x1="16" y1="45" x2="80" y2="45" stroke="url(#laserGrad)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="48" cy="45" r="3" fill="#FFFFFF" />
      </g>

      {/* Nốt phản quang kính 3D */}
      <path d="M18 20 C24 20, 28 22, 34 26" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// Icon 3D Cao Cấp Cho Module Tra Cứu LINK Trang Chủ
export function Link3DHeroIcon({ className = "w-20 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ringGrad1" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="ringGrad2" x1="36" y1="36" x2="76" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <filter id="linkShadow3D" x="12" y="14" width="74" height="74" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0369A1" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Bóng đổ 3D dưới đất */}
      <ellipse cx="48" cy="82" rx="34" ry="7" fill="#1E293B" fillOpacity="0.12" />

      <g filter="url(#linkShadow3D)">
        {/* Vòng móc xích 1 (Nghiêng 45 độ) */}
        <rect
          x="22"
          y="30"
          width="36"
          height="22"
          rx="11"
          transform="rotate(-35 40 41)"
          stroke="url(#ringGrad1)"
          strokeWidth="7"
          fill="none"
        />

        {/* Vòng móc xích 2 đan lồng 3D */}
        <rect
          x="38"
          y="44"
          width="36"
          height="22"
          rx="11"
          transform="rotate(-35 56 55)"
          stroke="url(#ringGrad2)"
          strokeWidth="7"
          fill="none"
        />

        {/* Điểm đan xen phía trước tạo hiệu ứng 3D lồng vào nhau */}
        <path
          d="M48 35 C52 38, 56 42, 60 48"
          stroke="url(#ringGrad2)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tia sáng lấp lánh (Sparkle) */}
        <path
          d="M66 22 L68 28 L74 30 L68 32 L66 38 L64 32 L58 30 L64 28 Z"
          fill="#FACC15"
        />
        <circle cx="28" cy="62" r="3" fill="#60A5FA" />
      </g>
    </svg>
  );
}

// Icon 3D Cao Cấp Cho Module Biên Bản & Mẫu File (Excel/Word 3D)
export function Document3DHeroIcon({ className = "w-20 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradient Folder bìa hồ sơ */}
        <linearGradient id="folderBack" x1="16" y1="28" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="folderFront" x1="14" y1="42" x2="82" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        {/* Gradient Sheet Excel Xanh lá */}
        <linearGradient id="excelGreen" x1="26" y1="18" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="0.6" stopColor="#10B981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        {/* Gradient Sheet Word Xanh dương */}
        <linearGradient id="wordBlue" x1="42" y1="14" x2="72" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93C5FD" />
          <stop offset="0.6" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="docShadow3D" x="8" y="10" width="80" height="78" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#1E3A8A" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Bóng đổ 3D dưới đất */}
      <ellipse cx="48" cy="83" rx="34" ry="7" fill="#1E293B" fillOpacity="0.14" />

      <g filter="url(#docShadow3D)">
        {/* Folder tab sau */}
        <path
          d="M18 36 C18 32.7 20.7 30 24 30 L38 30 C41 30 43.5 31.8 44.5 34.5 L46 38 L72 38 C75.3 38 78 40.7 78 44 L78 72 C78 75.3 75.3 78 72 78 L24 78 C20.7 78 18 75.3 18 72 Z"
          fill="url(#folderBack)"
        />

        {/* File 1 (Phía sau): Word (.docx) */}
        <g transform="rotate(8 58 36)">
          <rect x="42" y="16" width="30" height="40" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M42 16 L64 16 L72 24 L72 56 L42 56 Z" fill="url(#wordBlue)" />
          {/* Nếp gấp góc */}
          <path d="M64 16 L64 24 L72 24 Z" fill="#93C5FD" />
          {/* Biểu tượng 'W' */}
          <text x="57" y="38" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="sans-serif">W</text>
          <line x1="47" y1="44" x2="67" y2="44" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="47" y1="49" x2="63" y2="49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
        </g>

        {/* File 2 (Phía trước): Excel (.xlsx) */}
        <g transform="rotate(-6 36 34)">
          <rect x="22" y="18" width="32" height="42" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M22 18 L46 18 L54 26 L54 60 L22 60 Z" fill="url(#excelGreen)" />
          {/* Nếp gấp góc */}
          <path d="M46 18 L46 26 L54 26 Z" fill="#A7F3D0" />
          {/* Biểu tượng 'X' */}
          <text x="38" y="41" textAnchor="middle" fill="white" fontSize="15" fontWeight="900" fontFamily="sans-serif">X</text>
          {/* Lưới bảng tính mô phỏng */}
          <rect x="27" y="46" width="22" height="9" rx="1.5" fill="white" fillOpacity="0.25" />
          <line x1="38" y1="46" x2="38" y2="55" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="27" y1="50.5" x2="49" y2="50.5" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
        </g>

        {/* Folder vạt trước (Pocket) với góc nghiêng 3D */}
        <path
          d="M16 46 C16 43 18.5 40.5 21.5 40.5 L40 40.5 C42.5 40.5 44.7 42 45.6 44.2 L48 50 L74.5 50 C77.5 50 80 52.5 80 55.5 L80 72.5 C80 75.5 77.5 78 74.5 78 L21.5 78 C18.5 78 16 75.5 16 72.5 Z"
          fill="url(#folderFront)"
        />

        {/* Nút huy hiệu Tải về hình tròn 3D màu cam/vàng */}
        <circle cx="68" cy="64" r="10" fill="#F59E0B" stroke="white" strokeWidth="2.5" />
        {/* Mũi tên tải xuống trắng */}
        <path d="M68 59 L68 67 M65 65 L68 68 L71 65" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Tia sáng lấp lánh (Sparkle) */}
        <path
          d="M20 22 L22 27 L27 28.5 L22 30 L20 35 L18 30 L13 28.5 L18 27 Z"
          fill="#FACC15"
        />
      </g>
    </svg>
  );
}

// Hàm chọn icon thông minh: tự động nhận diện từ mã icon hoặc tiêu đề liên kết
export function renderCustomLinkIcon(iconType = "", className = "w-10 h-10", title = "") {
  const rawIcon = String(iconType || "").toLowerCase().trim();
  const rawTitle = String(title || "").toLowerCase().trim();

  // 1. Nhận diện trực tiếp qua mã icon
  if (rawIcon === "box" || rawIcon === "hop" || rawIcon === "boxes") {
    return <BoxWithGlassIcon className={className} />;
  }
  if (rawIcon === "cylinder" || rawIcon === "tru" || rawIcon === "database") {
    return <CylinderIcon className={className} />;
  }
  if (rawIcon === "document" || rawIcon === "filespreadsheet" || rawIcon === "bill") {
    return <DocumentIcon className={className} />;
  }
  if (rawIcon === "medical" || rawIcon === "yte" || rawIcon === "longchau") {
    return <MedicalBoxIcon className={className} />;
  }
  if (rawIcon === "chat" || rawIcon === "messagesquare" || rawIcon === "message") {
    return <ChatBubbleIcon className={className} />;
  }
  if (rawIcon === "education" || rawIcon === "daotao" || rawIcon === "bank") {
    return <EducationIcon className={className} />;
  }
  if (rawIcon === "mail" || rawIcon === "laptop" || rawIcon === "email") {
    return <LaptopMailIcon className={className} />;
  }
  if (rawIcon === "lock" || rawIcon === "khoa" || rawIcon === "security") {
    return <LockIcon className={className} />;
  }
  if (rawIcon === "truck" || rawIcon === "xe" || rawIcon === "giaohang") {
    return <TruckIcon className={className} />;
  }

  // 2. Nhận diện thông minh qua tiêu đề liên kết (nếu người dùng để trống icon hoặc dán Google Sheet)
  if (rawTitle.includes("kpi") || rawTitle.includes("cận date") || rawTitle.includes("can date")) {
    return <BoxWithGlassIcon className={className} />;
  }
  if (rawTitle.includes("đổi trả") || rawTitle.includes("doi tra") || rawTitle.includes("chính sách")) {
    return <CylinderIcon className={className} />;
  }
  if (rawTitle.includes("hóa đơn") || rawTitle.includes("hoa don") || rawTitle.includes("điều chỉnh")) {
    return <DocumentIcon className={className} />;
  }
  if (rawTitle.includes("y tế") || rawTitle.includes("y te") || rawTitle.includes("long châu") || rawTitle.includes("long chau") || rawTitle.includes("trực đêm") || rawTitle.includes("truc dem")) {
    return <MedicalBoxIcon className={className} />;
  }
  if (rawTitle.includes("chat") || rawTitle.includes("tin nhắn")) {
    return <ChatBubbleIcon className={className} />;
  }
  if (rawTitle.includes("chuyển khoản") || rawTitle.includes("chuyen khoan") || rawTitle.includes("đào tạo") || rawTitle.includes("dao tao")) {
    return <EducationIcon className={className} />;
  }
  if (rawTitle.includes("mail") || rawTitle.includes("gmail") || rawTitle.includes("outlook") || rawTitle.includes("hòm thư")) {
    return <LaptopMailIcon className={className} />;
  }
  if (rawTitle.includes("inside") || rawTitle.includes("rsa") || rawTitle.includes("khóa") || rawTitle.includes("bảo mật")) {
    return <LockIcon className={className} />;
  }
  if (rawTitle.includes("giao hàng") || rawTitle.includes("giao hang") || rawTitle.includes("bán hàng") || rawTitle.includes("ban hang") || rawTitle.includes("app")) {
    return <TruckIcon className={className} />;
  }

  // Mặc định: Kính lúp ruy băng xanh 3D (dùng cho AI mentor, Claim NVC, Duyệt mua, GTNT, Khiếu nại, CTV Ecom, v.v.)
  return <MagnifyingGlassWithRibbonIcon className={className} />;
}
