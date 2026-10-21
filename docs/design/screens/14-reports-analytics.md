# Thiết Kế Chi Tiết: Báo Cáo & Phân Tích Nhân Sự — Phân Hệ REP (Screens 59 - 63)

Tài liệu thiết kế chi tiết phân hệ Báo cáo và Phân tích nhân sự (`REP`), cung cấp các biểu đồ trực quan, phân tích tỷ lệ nghỉ việc (Turnover rate) và công cụ trích xuất dữ liệu có che dữ liệu nhạy cảm (Data Masking).
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [FR-REP-001 → 010](file:///d:/saved/Project/hrm/docs/prd/function-requirement/reports-analytics.md).

---

## 1. Dashboard Báo Cáo Quản Trị Cấp Cao (`/reports/overview` — Screen 59)

### 1.1. Actor & Giá trị
- **Actor:** Ban Giám Đốc, HR Manager.
- **Mục tiêu:** Cung cấp bức tranh toàn cảnh về sức khỏe nhân sự và các xu hướng biến động nguồn nhân lực của doanh nghiệp.

### 1.2. Bố cục Widget & Biểu đồ Trực quan (Anti-Slop Clean Data)
- Áp dụng triệt để nguyên tắc `design-taste-frontend`: Tránh biểu đồ màu mè vô nghĩa; sử dụng màu sắc đồng bộ với palette thương hiệu (Ink, Muted, Pastel accents).
- **Hàng 1: 4 Chỉ số Điều hành Cốt lõi (Executive Metrics):**
  1. Tổng quy mô nhân sự: 184 nhân viên (+8.2% so với cùng kỳ năm trước).
  2. Tỷ lệ nhân sự chính thức: 88.0% (162 chính thức, 22 thử việc).
  3. **Tỷ lệ nghỉ việc (Turnover Rate — FR-REP-009):** 4.3% trong 6 tháng (Nằm trong ngưỡng an toàn < 8%).
  4. Chi phí nhân sự trung bình / nhân viên: 18.5 tr VNĐ / tháng.
- **Hàng 2: Hai Biểu đồ Phân Tích Trọng Điểm:**
  - **Biểu đồ Cột Biến Động Quy Mô (FR-REP-002, 008):** Biểu đồ đường & cột kết hợp thể hiện số lượng nhân sự mới tiếp nhận (Onboarding) và số lượng nghỉ việc (Offboarding) qua 12 tháng.
  - **Biểu đồ Phân Bổ Nhân Lực Theo Phòng Ban (FR-REP-003):** Biểu đồ Donut thanh nhã thể hiện tỷ trọng nhân sự các bộ phận (Kỹ thuật 42%, Kinh doanh 28%, Vận hành 15%, Hành chính & HR 15%).

---

## 2. Báo Cáo Chuyên Cần & Nghỉ Phép (`/reports/attendance-leaves` — Screen 60)

- **Actor:** HR Staff, Department Manager (xem phòng mình).
- **Báo cáo Chấm công (FR-REP-006):**
  - Tỷ lệ đi làm đúng giờ toàn công ty: 95.8%.
  - Thống kê số lượt đi muộn, về sớm theo từng bộ phận và theo từng ngày trong tuần (phát hiện xu hướng đi muộn sáng Thứ Hai).
- **Báo cáo Nghỉ phép (FR-REP-005):**
  - Thống kê tỷ lệ nghỉ phép theo loại (Phép năm, Ốm đau, Không lương).
  - Thống kê quỹ phép năm còn tồn: Cảnh báo số ngày phép tồn vượt quá 5 ngày cần dùng trước 31/03 sang năm.

---

## 3. Báo Cáo Quỹ Lương & Đãi Ngộ (`/reports/payroll` — Screen 61)

- **Actor:** Ban Giám Đốc, HR Manager (Bảo mật nghiêm ngặt).
- **Biểu đồ Quỹ Lương Hàng Tháng (FR-REP-007):**
  - Cơ cấu tổng quỹ lương: Lương cơ bản, Phụ cấp, Thưởng KPI, Chi phí làm thêm giờ OT.
  - Tỷ trọng trích nộp Bảo hiểm xã hội và Thuế thu nhập cá nhân doanh nghiệp nộp thay.
  - So sánh tốc độ tăng trưởng quỹ lương với tăng trưởng doanh thu doanh nghiệp.

---

## 4. Báo Cáo Hiệu Quả Tuyển Dụng (`/reports/recruitment` — Screen 62)

- **Phễu Tuyển Dụng (Recruitment Funnel — FR-REP-004):**
  - Tỷ lệ chuyển đổi qua 5 vòng: Tiếp nhận CV (100%) $\rightarrow$ Sàng lọc (42%) $\rightarrow$ Phỏng vấn (18%) $\rightarrow$ Offer (8%) $\rightarrow$ Nhận việc (6.5%).
  - Thời gian tuyển dụng trung bình (Time-to-Hire): 24 ngày làm việc.
  - Nguồn ứng viên hiệu quả nhất (Giới thiệu nội bộ, Kênh tuyển dụng, Mạng xã hội).

---

## 5. Xuất Báo Cáo Tổng Hợp & Che Dữ Liệu Nhạy Cảm (`/reports/export` — Screen 63)

### 5.1. Công Cụ Trích Xuất Dữ Liệu Đa Chiều (FR-REP-010)
- Bộ lọc tùy biến: Chọn khoảng thời gian (Từ ngày $\rightarrow$ Đến ngày), Chọn phòng ban, Chọn trạng thái nhân sự.
- Tùy chọn định dạng tệp: **Excel (.xlsx)**, **PDF báo cáo tổng hợp**, **CSV**.
- **Kỹ thuật Che Dữ Liệu Nhạy Cảm (Data Masking — Bắt buộc theo NFR-004):**
  - Checkbox *"Che thông tin định danh và tài chính"* (Mặc định bật khi người xuất không phải là Giám Đốc):
    - Số CCCD: Hiển thị dạng `001******892`.
    - Số tài khoản ngân hàng: Hiển thị dạng `**** **** 4829`.
    - Mức lương chi tiết: Ẩn cột hoặc làm tròn theo nhóm bậc lương.
