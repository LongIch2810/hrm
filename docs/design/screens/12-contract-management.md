# Thiết Kế Chi Tiết: Quản Lý Hợp Đồng Lao Động — Phân Hệ CON (Screens 52 - 54)

Tài liệu thiết kế chi tiết phân hệ Hợp đồng lao động (`CON`), cảnh báo thời hạn tự động trước 30 ngày và quản lý phụ lục điều chỉnh.
Tuân thủ [Design System](../design-system.md) và [FR-CON-001 → 009](../../prd/function-requirement/contract-management.md).

---

## 1. Danh Sách Hợp Đồng & Cảnh Báo Hết Hạn (`/contracts` — Screen 52)

### 1.1. Actor & Ràng buộc Pháp lý (PD-025)
- **Actor:** HR Staff (quản lý toàn bộ), Department Manager (theo dõi thời hạn nhân viên phòng mình).
- **Quy tắc pháp lý:**
  - Mỗi nhân viên chỉ có **duy nhất 1 hợp đồng ở trạng thái `ACTIVE`** tại một thời điểm (`PD-025`).
  - Sau tối đa 2 lần ký hợp đồng có thời hạn, hệ thống bắt buộc chuyển sang loại Không xác định thời hạn theo Bộ luật Lao động Việt Nam.

### 1.2. Bố cục Giao diện
- **Hàng Thẻ Tóm Tắt:**
  - Tổng số hợp đồng hiệu lực: 184 HĐ.
  - Hợp đồng không thời hạn: 112 HĐ.
  - Hợp đồng có thời hạn: 50 HĐ.
  - Hợp đồng thử việc: 22 HĐ.
  - **Cảnh báo sắp hết hạn (<= 30 ngày): 3 HĐ** (Thẻ viền cam cảnh báo, có nút lọc nhanh).
- **Tabs Bộ Lọc:** "Tất cả", "Sắp hết hạn (<= 30 ngày)", "Đang hiệu lực (Active)", "Thử việc", "Đã hết hạn/Thanh lý".
- **Bảng Dữ Liệu Hợp Đồng (Data Table):**
  - Cột 1: Số HĐ (Ví dụ: `HĐLĐ-2026/089` — duy nhất).
  - Cột 2: Nhân viên (Avatar, Tên, Mã NV, Phòng ban).
  - Cột 3: Loại HĐ (Thử việc / Có thời hạn 12 tháng / Không xác định thời hạn).
  - Cột 4: Ngày ký & Ngày hiệu lực.
  - Cột 5: Ngày hết hạn (Nếu có thời hạn; nếu không thời hạn hiển thị "Vô thời hạn").
  - Cột 6: Mức lương cơ sở theo HĐ (VNĐ).
  - Cột 7: Trạng thái (Huy hiệu viên thuốc: `Active` xanh lục, `Expired` xám, `Terminated` đỏ).
  - Cột 8: Thao tác (Xem chi tiết, Tái ký / Gia hạn, Tải scan PDF).

---

## 2. Tạo Mới / Tái Ký & Gia Hạn Hợp Đồng (`/contracts/new`, `/contracts/:id/renew` — Screen 53)

### 2.1. Giao diện Biểu Mẫu (Form)
- Tiêu đề: *"Soạn thảo hợp đồng lao động"* hoặc *"Tái ký / Gia hạn hợp đồng"*.
- **Thông tin nhân viên:** Chọn nhân viên từ danh sách `EMP` (hệ thống tự động kiểm tra số lần đã ký hợp đồng có thời hạn để gợi ý loại HĐ hợp lệ).
- **Số hợp đồng:** Nhập số định danh duy nhất (VD: `HĐLĐ-2026/xxx`).
- **Loại hợp đồng:** 3 loại chuẩn: `Thử việc (02 tháng)`, `Có xác định thời hạn (12 - 36 tháng)`, `Không xác định thời hạn`.
- **Thời hạn hiệu lực:** Ngày bắt đầu và Ngày kết thúc (bắt buộc kiểm tra Ngày kết thúc $\ge$ Ngày bắt đầu; với HĐ vô thời hạn thì để trống).
- **Điều khoản đãi ngộ:** Mức lương đóng bảo hiểm, Phụ cấp cố định hàng tháng, Chức danh công việc, Địa điểm làm việc.
- **Tải lên tệp scan PDF hợp đồng (FR-CON-007):** Khung kéo thả file scan PDF có chữ ký 2 bên (giới hạn $\le 5\text{MB}$).
- **Nút Hành Động:** Nút Hủy và Nút Primary "Lưu & Kích hoạt hợp đồng".

---

## 3. Chi Tiết Hợp Đồng & Phụ Lục HĐLĐ (`/contracts/:id` — Screen 54)

### 3.1. Bố cục 2 Phần
- **Phần 1: Thông tin Hợp đồng & Trình xem PDF:**
  - Tóm tắt pháp lý của hợp đồng, trạng thái hiệu lực.
  - Khung PDF Viewer xem trực tiếp bản scan có con dấu và chữ ký.
- **Phần 2: Danh Sách Phụ Lục Hợp Đồng (Appendices — FR-CON-004):**
  - Bảng ghi nhận các phụ lục điều chỉnh (Số phụ lục, Ngày hiệu lực, Nội dung điều chỉnh: Tăng lương định kỳ, Thăng chức, Thay đổi địa điểm làm việc).
  - Nút "+ Thêm phụ lục điều chỉnh" (mở modal nhập phụ lục mới).
