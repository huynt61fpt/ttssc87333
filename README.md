# Hệ Thống Tra Cứu Barcode & Kho Liên Kết Thường Dùng

Hệ thống web tra cứu nội bộ kết nối trực tiếp với Google Sheets, hiển thị mã vạch chuẩn **Code 128** và ghi nhận lịch sử tra cứu của người dùng vào mục Quản trị (Admin Settings).

---

## 🌟 Tính Năng Chính

### 1. Tab Tra Cứu Barcode
- **Điều kiện nhập:** Ô tìm kiếm yêu cầu tối thiểu **8 ký tự**, có bộ đếm ký tự và phản hồi màu sắc trực quan (cảnh báo vàng khi dưới 8 ký tự, xanh khi đủ điều kiện).
- **Kết quả trả về đầy đủ 4 trường:**
  1. Mã sản phẩm (`Product Code`)
  2. Tên sản phẩm (`Product Name`)
  3. Mã Barcode số (`Barcode Number`)
  4. Barcode vạch hiển thị theo chuẩn **Code 128** độ nét cao bằng SVG.
- **Tiện ích đi kèm:**
  - Sao chép nhanh số barcode và mã sản phẩm chỉ với 1 click.
  - Tải ảnh mã vạch định dạng PNG hoặc vector SVG sắc nét.
  - Hỗ trợ in tem barcode trực tiếp ra máy in tem nhãn.
- **Tự động lưu lịch sử:** Mọi lượt tra cứu (kể cả tìm thấy hay không tìm thấy) đều được lưu trữ đầy đủ thời gian, từ khóa, thông tin thiết bị và đồng bộ về Google Sheet.

### 2. Tab Tra Cứu LINK Thường Dùng
- Hiển thị danh sách các module link dạng lưới (Grid) hiện đại.
- Thiết kế chuẩn UI/UX: **Icon nổi bật ở trên, Tên link ở dưới**.
- Phân loại theo nhóm danh mục (Báo cáo, Hệ thống, Tài liệu, v.v.).
- Ô tìm kiếm lọc nhanh liên kết.
- Click trực tiếp vào module để mở liên kết trong tab mới an toàn.

### 3. Tab Quản Trị & Cài Đặt (Admin Settings)
- **Bảo mật mã PIN:** Yêu cầu nhập PIN (mặc định: `123456`, có thể đổi trong giao diện).
- **Lịch sử tra cứu toàn diện:** Xem bảng chi tiết mọi lượt tra cứu từ tất cả người dùng, tìm kiếm lịch sử, lọc trạng thái Tìm thấy/Không thấy.
- **Thống kê:** Tổng số lượt tìm kiếm, số lượt thành công, tỷ lệ phần trăm (%).
- **Xuất dữ liệu:** Xuất toàn bộ lịch sử ra file **CSV (Excel)** với định dạng UTF-8 hiển thị tiếng Việt chuẩn xác.
- **Cấu hình Google Sheets:** Nhập URL Web App của Google Apps Script, kiểm tra trạng thái và đồng bộ dữ liệu tức thì.
- **Cung cấp sẵn mã nguồn Code.gs:** 1-click copy toàn bộ mã để dán vào Google Sheet.

---

## 🚀 Hướng Dẫn Chạy Dự Án

### Khởi động môi trường phát triển (Dev)
```bash
npm install
npm run dev
```
Truy cập tại: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

### Build bản đóng gói xuất bản (Production)
```bash
npm run build
```
Thư mục `dist/` chứa toàn bộ mã nguồn tĩnh sẵn sàng triển khai lên Vercel, Netlify, GitHub Pages hoặc Web Server nội bộ.

---

## 📑 Hướng Dẫn Cấu Hình Google Sheets

1. Tạo một bảng tính Google Sheets mới với 3 sheet:
   - **Sheet 1: `Barcode`**
     - Cột A: Mã sản phẩm
     - Cột B: Tên sản phẩm
     - Cột C: Barcode
     - Cột D: Danh mục
   - **Sheet 2: `Links`**
     - Cột A: Tên link
     - Cột B: URL
     - Cột C: Tên Icon (Globe, HardDrive, FileSpreadsheet, Mail, Boxes, Headset, ScanBarcode, MessageSquare, BarChart3...)
     - Cột D: Danh mục
     - Cột E: Mô tả
   - **Sheet 3: `History`**
     - Hệ thống tự động tạo các cột tiêu đề khi có lượt tra cứu đầu tiên.

2. Mở **Tiện ích mở rộng > Apps Script**, dán nội dung từ file `src/google-apps-script/Code.gs` vào.
3. Bấm **Triển khai (Deploy) > Tùy chọn triển khai mới (New deployment)**:
   - Chọn loại: **Ứng dụng web (Web app)**
   - Thực thi dưới dạng: **Tôi (Me)**
   - Người có quyền truy cập: **Bất kỳ ai (Anyone)**
4. Sao chép URL nhận được và dán vào mục **Quản trị & Cài đặt > Cấu hình Google Apps Script** trên giao diện web.
