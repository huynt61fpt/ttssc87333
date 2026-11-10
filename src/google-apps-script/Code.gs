/**
 * GOOGLE APPS SCRIPT CHO HỆ THỐNG TRA CỨU BARCODE & LINK
 * 
 * Hướng dẫn cài đặt nhanh:
 * 1. Mở Google Sheets của bạn. Tạo 3 sheet với tên chính xác:
 *    - Sheet 1: "Barcode"
 *      Cột A: Mã sản phẩm
 *      Cột B: Tên sản phẩm
 *      Cột C: Barcode
 *      Cột D: Danh mục (tùy chọn)
 * 
 *    - Sheet 2: "Links"
 *      Cột A: Tên link
 *      Cột B: URL
 *      Cột C: Icon (chọn từ danh sách Lucide icons như: Globe, FileSpreadsheet, HardDrive, Mail, Boxes, Headset...)
 *      Cột D: Danh mục
 *      Cột E: Mô tả
 * 
 *    - Sheet 3: "History"
 *      Cột A: Thời gian
 *      Cột B: Từ khóa tìm
 *      Cột C: Kết quả (Tìm thấy / Không thấy)
 *      Cột D: Mã sản phẩm
 *      Cột E: Tên sản phẩm
 *      Cột F: Barcode
 *      Cột G: Thiết bị truy cập
 * 
 * 2. Vào Tiện ích mở rộng (Extensions) > Apps Script.
 * 3. Xóa hết code cũ và dán toàn bộ đoạn code dưới đây vào.
 * 4. Nhấn "Triển khai" (Deploy) > "Tùy chọn triển khai mới" (New deployment).
 *    - Loại: Web App (Ứng dụng web)
 *    - Thực thi dưới dạng (Execute as): Tôi (Me)
 *    - Người có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 * 5. Sao chép "URL ứng dụng web" (Web App URL) và dán vào mục Setting của trang web tra cứu.
 */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "get_barcodes";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = { status: "success", data: [] };

  try {
    if (action === "get_barcodes") {
      var sheet = ss.getSheetByName("Barcode") || ss.getSheets()[0];
      var values = sheet.getDataRange().getValues();
      var data = [];
      // Bỏ qua dòng tiêu đề 0
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
    } 
    else if (action === "get_links") {
      var linkSheet = ss.getSheetByName("Links");
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
    else if (action === "get_history") {
      var histSheet = ss.getSheetByName("History");
      if (histSheet) {
        var values = histSheet.getDataRange().getValues();
        var data = [];
        for (var k = 1; k < values.length; k++) {
          var row = values[k];
          data.push({
            timestamp: row[0],
            query: row[1],
            found: row[2] === "Tìm thấy" || row[2] === true,
            productCode: row[3],
            productName: row[4],
            barcode: row[5],
            deviceInfo: row[6]
          });
        }
        result.data = data.reverse(); // Mới nhất lên đầu
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
}
