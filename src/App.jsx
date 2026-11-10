import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import BarcodeLookup from "./components/BarcodeLookup";
import QuickLinks from "./components/QuickLinks";
import DocumentTemplates from "./components/DocumentTemplates";
import AdminSettings from "./components/AdminSettings";
import { fetchBarcodes, fetchLinks, fetchDocuments } from "./services/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); // Mặc định vào Trang chủ
  const [barcodes, setBarcodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [barcodeSource, setBarcodeSource] = useState("Đang tải...");
  const [linksSource, setLinksSource] = useState("Đang tải...");
  const [docsSource, setDocsSource] = useState("Đang tải...");
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Khởi tạo và tải dữ liệu độc lập cho từng module
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [barcodeRes, linkRes, docsRes] = await Promise.all([
        fetchBarcodes(),
        fetchLinks(),
        fetchDocuments()
      ]);

      setBarcodes(barcodeRes.data || []);
      setBarcodeSource(barcodeRes.source || "Dữ liệu mẫu Barcode (Demo)");

      setLinks(linkRes.data || []);
      setLinksSource(linkRes.source || "Dữ liệu mẫu Links (Demo)");

      setDocuments(docsRes.data || []);
      setDocsSource(docsRes.source || "Dữ liệu mẫu Biểu mẫu (Demo)");

      setLastSyncTime(new Date().toISOString());
    } catch (err) {
      console.error("Lỗi tải dữ liệu ban đầu:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      await loadData();
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Dọn dẹp cache cũ để luôn nhận diện bộ icon 3D và cấu trúc dữ liệu mới nhất
    localStorage.removeItem("portal_links_cache");
    localStorage.removeItem("portal_barcode_cache");
    localStorage.removeItem("portal_docs_cache");
    localStorage.removeItem("portal_docs_cache_v4");
    loadData();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col select-none selection:bg-blue-600 selection:text-white">
      {/* 1. Header chính */}
      <Header />

      {/* 2. Thân ứng dụng: Sidebar Menu bên trái + Nội dung chính bên phải */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row w-full overflow-hidden">
        {/* Tab menu bên trái (Trang chủ, Tra cứu Barcode, Tra cứu LINK, Biên bản mẫu file) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          barcodeSource={barcodeSource}
          linksSource={linksSource}
          docsSource={docsSource}
          isSyncing={isSyncing}
          onSync={handleSyncAll}
        />

        {/* Khu vực nội dung chính */}
        <main className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 flex flex-col justify-start">
          {activeTab === "home" && (
            <Home
              onNavigateTab={setActiveTab}
              barcodeCount={barcodes.length}
              linksList={links}
              documentsList={documents}
              barcodeSource={barcodeSource}
              linksSource={linksSource}
            />
          )}

          {activeTab === "barcode" && (
            <BarcodeLookup
              barcodeList={barcodes}
              isLoading={isLoading}
              onRefresh={handleSyncAll}
              onNavigateAdmin={() => setActiveTab("admin")}
            />
          )}

          {activeTab === "links" && (
            <QuickLinks linksList={links} isLoading={isLoading} />
          )}

          {activeTab === "documents" && (
            <DocumentTemplates documentsList={documents} isLoading={isLoading} />
          )}

          {activeTab === "admin" && (
            <div className="w-full flex-1 min-h-0 overflow-y-auto">
              <AdminSettings
                onSyncAll={handleSyncAll}
                isSyncing={isSyncing}
                lastSyncTime={lastSyncTime}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
