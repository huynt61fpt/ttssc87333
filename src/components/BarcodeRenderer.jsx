import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { Download, Printer, Copy, Check, Barcode } from "lucide-react";

export default function BarcodeRenderer({ value, productName, productCode }) {
  const svgRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        setRenderError(false);
        JsBarcode(svgRef.current, String(value).trim(), {
          format: "CODE128",
          lineColor: "#0f172a",
          width: 2.0,
          height: 55,
          displayValue: true,
          font: "monospace",
          fontSize: 15,
          textMargin: 6,
          margin: 8,
          background: "#ffffff"
        });
      } catch (err) {
        console.error("Lỗi vẽ barcode Code 128:", err);
        setRenderError(true);
      }
    }
  }, [value]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Barcode_${value}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `Barcode_${value}.png`;
      link.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs flex flex-col items-center">
      {/* Header Module Barcode: Nền màu xanh dương, chữ màu trắng */}
      <div className="w-full bg-blue-600 text-white px-3.5 py-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 text-white">
          <Barcode className="w-3.5 h-3.5" />
          <span>Mã vạch chuẩn Code 128</span>
        </span>
        <div className="flex items-center space-x-1 no-print">
          <button
            onClick={handleCopy}
            title="Sao chép số barcode"
            className="p-1 rounded text-white/90 hover:text-white hover:bg-white/20 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleDownloadPng}
            title="Tải ảnh PNG"
            className="p-1 rounded text-white/90 hover:text-white hover:bg-white/20 transition"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handlePrint}
            title="In tem barcode"
            className="p-1 rounded text-white/90 hover:text-white hover:bg-white/20 transition"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Vùng hiển thị Barcode */}
      <div className="w-full bg-slate-50 p-2.5 flex flex-col items-center justify-center">
        <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center max-w-full overflow-x-auto print:shadow-none print:p-0 print:border-none">
          {productName && (
            <div className="text-center font-bold text-slate-900 text-xs mb-0.5 line-clamp-1 max-w-[280px]">
              {productName}
            </div>
          )}
          {productCode && (
            <div className="text-center text-[11px] text-blue-700 font-mono font-bold mb-1">
              Mã SP: {productCode}
            </div>
          )}

          {renderError ? (
            <div className="p-2 text-rose-600 text-xs font-mono">
              Không thể tạo mã Code 128 từ chuỗi này
            </div>
          ) : (
            <svg ref={svgRef} className="max-w-full h-auto"></svg>
          )}
        </div>

        <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between w-full no-print px-1">
          <span>Vector SVG / PNG nét cao</span>
          <button
            onClick={handleDownloadSvg}
            className="text-blue-600 hover:text-blue-800 font-bold underline text-[11px]"
          >
            Lưu vector SVG
          </button>
        </div>
      </div>
    </div>
  );
}
