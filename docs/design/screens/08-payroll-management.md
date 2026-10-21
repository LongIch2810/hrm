# Thiết Kế Chi Tiết: Quản Lý Tiền Lương — Phân Hệ PAY (Screens 34 - 37)

Tài liệu thiết kế chi tiết phân hệ Tính Lương (`PAY`), bảo mật thu nhập, tính thuế TNCN 7 bậc và phát hành phiếu lương điện tử.
Tuân thủ [Design System](../design-system.md) và [FR-PAY-001 → 011](../../prd/function-requirement/payroll-management.md).

---

## 1. Quản Lý Kỳ Lương Công Ty (`/payroll/cycles` — Screen 34)

### 1.1. Actor & Quy trình
- **Actor:** HR Staff lập và khóa kỳ; HR Manager hoặc Giám đốc duyệt kỳ theo quyền nghiệp vụ được cấp.
- **Kỳ lương chuẩn:** Tính theo tháng dương lịch (01 đến ngày cuối tháng), chốt lương ngày 05 và chi trả ngày 10 hàng tháng (`PD-019`).
- **Quy trình 3 trạng thái:**
  1. `Draft` (Kỳ lương nháp): Dành cho HR kiểm tra, đối soát công phép và chạy tính toán lương tự động.
  2. `Approved` (Đã duyệt): HR Manager hoặc Giám đốc phê duyệt bảng lương để HR Staff khóa kỳ.
  3. `Closed` (Đã khóa): HR Staff khóa kỳ bằng thao tác riêng; hệ thống phát hành phiếu lương riêng tư cho từng nhân viên.

### 1.2. Bố cục Giao diện
- Header: Tiêu đề `display-lg` *"Bảng Lương & Kỳ Lương"*, Nút Primary "+ Mở kỳ lương mới".
- Danh sách các kỳ lương (Cards / Table):
  - Tên kỳ lương (Ví dụ: *"Kỳ lương Tháng 10/2026"*).
  - Trạng thái: Badge xám `DRAFT`, Badge xanh dương `APPROVED` hoặc Badge xanh lá `CLOSED`.
  - Tổng quỹ lương ròng (Net): Được làm mờ (Masking) chỉ hiển thị khi có quyền hoặc nhấp icon mắt.
  - Tổng số nhân sự trong kỳ: 184 nhân viên.
  - Ngày chi trả dự kiến: 10/11/2026.
  - Thao tác theo quyền và trạng thái: HR Staff vào tính toán khi `Draft`; HR Manager hoặc Giám đốc nhấn "Phê duyệt" để chuyển sang `Approved`; HR Staff nhấn "Khóa kỳ lương" để chuyển sang `Closed` và xuất file ngân hàng khi có quyền.

---

## 2. Chi Tiết Bảng Lương Kỳ (`/payroll/cycles/:id` — Screen 35)

### 2.1. Bảng Tính Lương Đa Cột Chi Tiết (Data Table)
- **Công cụ trên bảng:** Nút Primary "Thực thi tính toán tự động" (tự động kéo dữ liệu từ `ATT` bảng công chốt, `LEAVE` ngày phép, `CON` lương cơ bản), Nút Xuất Excel, Bộ lọc theo Phòng ban.
- **Cấu trúc cột chuẩn theo Luật Việt Nam (PD-017, PD-019):**
  - Cột 1: Mã NV & Họ tên nhân viên.
  - Cột 2: Lương cơ bản theo HĐLĐ (VNĐ).
  - Cột 3: Ngày công chuẩn / Công thực tế.
  - Cột 4: Tiền lương ngày công thực tế.
  - Cột 5: Phụ cấp (Ăn trưa, xăng xe, điện thoại...).
  - Cột 6: Thưởng (KPI, dự án, lễ tết).
  - Cột 7: Tiền làm thêm giờ OT.
  - Cột 8: **Tổng thu nhập gộp (Gross).**
  - Cột 9: Trích đóng BHXH (8%), BHYT (1.5%), BHTN (1%) — Tổng 10.5%.
  - Cột 10: Giảm trừ gia cảnh (Bản thân 11tr + 4.4tr/người phụ thuộc).
  - Cột 11: Thuế TNCN (Tính theo biểu lũy tiến từng phần 7 bậc).
  - Cột 12: Khấu trừ khác (Tạm ứng, đền bù...).
  - Cột 13: **Lương thực lĩnh (Net) — Nổi bật in đậm.**

---

## 3. Cấu Hình Lương, Phụ Cấp & Thuế/Bảo Hiểm (`/payroll/settings` — Screen 36)

- **4 Tabs Cấu hình Chuyên sâu:**
  - Tab 1: **Phụ cấp (FR-PAY-004):** Danh mục phụ cấp, quy định mức tiền và tính chất Chịu thuế hay Miễn thuế theo Luật.
  - Tab 2: **Khoản thưởng (FR-PAY-005):** Danh mục thưởng định kỳ, thưởng thành tích.
  - Tab 3: **Khấu trừ (FR-PAY-006):** Các khoản khấu trừ nội bộ.
  - Tab 4: **Biểu Thuế & Bảo Hiểm (FR-PAY-007, 008):** Tỷ lệ đóng BHXH 10.5%, Biểu thuế lũy tiến 7 bậc (5%, 10%, 15%, 20%, 25%, 30%, 35%), mức giảm trừ bản thân và người phụ thuộc.

---

## 4. Phiếu Lương Điện Tử Cá Nhân (`/payroll/my-payslip` — Screen 37)

### 4.1. Actor: Tất cả Cán bộ Nhân viên
### 4.2. Giao diện Phiếu Lương (Payslip Card)
- **Bảo mật:** Nhân viên chỉ xem được phiếu lương của chính mình sau khi kỳ lương đã chuyển sang trạng thái `Closed` (`AC-PAY-010`).
- Bộ chọn Kỳ lương cần xem (Tháng 09/2026, Tháng 08/2026...).
- Thẻ Card thiết kế dạng phiếu lương biên tập trang nhã:
  - Header: Logo công ty, Tiêu đề *"PHIẾU LƯƠNG NHÂN VIÊN"*, Kỳ lương, Mã NV, Họ tên, Chức danh, Phòng ban.
  - Bảng 3 phần rõ ràng:
    - **I. CÁC KHOẢN THU NHẬP:** Lương ngày công, Phụ cấp, Tiền thưởng, Tiền OT $\rightarrow$ *Tổng thu nhập*.
    - **II. CÁC KHOẢN GIẢM TRỪ:** Trích nộp BHXH/BHYT/BHTN (10.5%), Thuế TNCN, Khấu trừ khác $\rightarrow$ *Tổng giảm trừ*.
    - **III. THỰC LĨNH (NET):** Con số lớn nổi bật (VNĐ, làm tròn 0 chữ số thập phân) kèm diễn giải bằng chữ.
  - Chân phiếu: Nút Primary viên thuốc "Tải Phiếu Lương PDF" có chữ ký điện tử nội bộ của công ty.
