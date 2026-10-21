# Thiết Kế Chi Tiết: Chấm Công & Quản Lý Thời Gian — Phân Hệ ATT (Screens 22 - 28)

Tài liệu thiết kế chi tiết phân hệ Chấm công (`ATT`), quy trình ghi nhận giờ làm, giải trình công, đăng ký/phê duyệt làm thêm giờ (OT) và bảng công tháng.
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [FR-ATT-001 → 010](file:///d:/saved/Project/hrm/docs/prd/function-requirement/attendance-management.md).

---

## 1. Chấm Công Cá Nhân & Lịch Sử Vào/Ra (`/attendance/my-attendance` — Screen 22)

### 1.1. Actor & Trọng tâm
- **Actor:** Tất cả cán bộ nhân viên.
- **Mục tiêu:** Thao tác Check-in / Check-out hàng ngày và tra cứu chi tiết giờ quẹt thẻ trong ngày.

### 1.2. Bố cục & Thành phần
- **Thẻ Chấm Công Trọng Tâm (Hero Punch Clock Card):**
  - Đồng hồ hiển thị thời gian số lớn (hh:mm:ss).
  - Khung giờ ca chuẩn: 08:00 - 17:30 (Nghỉ trưa 12:00 - 13:30).
  - Trạng thái ca: *"Đúng giờ"* (trước 08:15 nhờ ân hạn 15p) hoặc *"Đi muộn xx phút"* (sau 08:15 tính muộn từ mốc 08:00).
  - Nút Check-in / Check-out dạng viên thuốc Ink Primary to bản, chiều cao 48px trên mobile.
  - Ghi chú: Địa chỉ IP và thiết bị truy cập được ghi nhận tự động.
- **Bảng Nhật Ký Vào/Ra Trong Ngày:**
  - Lịch sử các lần quẹt thẻ trong ngày (Lần 1 Check-in, Lần 2 Check-out...).
  - Tổng số giờ làm việc thực tế được làm tròn theo quy tắc chuẩn.
- **Nút Hành Động Phụ:** "Gửi đơn giải trình quên check-out" (mở modal giải trình có Manager duyệt).

---

## 2. Bảng Công Cá Nhân Hàng Tháng (`/attendance/my-timesheet` — Screen 23)

### 2.1. Giao diện Lưới Công Tháng (Monthly Timesheet Grid)
- Bộ chọn Tháng/Năm (Tháng 10/2026) kèm nút Tiến/Lùi.
- **Thẻ Tóm Tắt Chỉ Số Chuyên Cần Tháng:**
  - Tổng công chuẩn: 22 ngày.
  - Công thực tế đạt được: 21.5 công.
  - Số lần đi muộn / Về sớm: 2 lần (tổng 28 phút).
  - Giờ làm thêm (OT) đã duyệt: 4.5 giờ.
  - Số ngày nghỉ phép hưởng lương: 0.5 ngày.
- **Lưới Chấm Công Chi Tiết Từng Ngày (Calendar Grid / Table):**
  - Mỗi ô ngày: Thứ, Ngày, Giờ vào, Giờ ra, Số giờ làm việc, Trạng thái (Đủ công - Badge xanh, Đi muộn - Badge vàng, Vắng mặt - Badge đỏ, Nghỉ phép - Badge xanh dương).
  - Cho phép nhấp vào 1 ngày để xem chi tiết log quẹt thẻ hoặc nộp giải trình.

---

## 3. Quản Lý Đơn Làm Thêm Giờ (OT) Của Tôi (`/attendance/my-overtime` — Screen 24)

### 3.1. Nghiệp vụ & Ràng buộc (PD-010, PD-014)
- **Quy tắc:** Bắt buộc phải có đơn đăng ký được duyệt trước mới được tính công OT.
- **Làm tròn thời gian:** Theo block **30 phút**.
- **Hệ số tính:** Ngày thường x1.5, Cuối tuần x2.0, Lễ Tết x3.0.

### 3.2. Màn hình & Modal Tạo Đơn
- Bảng danh sách các đơn OT cá nhân: Ngày đăng ký, Giờ bắt đầu - Giờ kết thúc, Số giờ quy đổi, Mục tiêu công việc, Trạng thái (`Pending`, `Approved`, `Rejected`), Giờ quẹt thẻ thực tế đối soát.
- **Modal "+ Đăng Ký Làm Thêm Giờ (OT)":**
  - Chọn Ngày làm OT.
  - Khung giờ: Từ giờ $\rightarrow$ Đến giờ (Dropdown bước nhảy 30 phút).
  - Dự án / Mục tiêu công việc cần làm thêm.
  - Người duyệt: Tự động điền Trưởng phòng trực tiếp.

---

## 4. Phê Duyệt Làm Thêm Giờ Phòng Ban (`/attendance/overtime/approvals` — Screen 25)

### 4.1. Actor & Giao diện
- **Actor:** Department Manager.
- Bảng duyệt đơn OT của nhân viên trong phòng ban:
  - Cột 1: Nhân viên (Avatar, Tên, Mã NV).
  - Cột 2: Ngày OT & Số giờ đăng ký.
  - Cột 3: Nội dung công việc.
  - Cột 4: Nút "Duyệt" (Primary pill) và "Từ chối" (Outline/Danger pill) kèm popup nhập lý do từ chối.

---

## 5. Bảng Công Phòng Ban (`/attendance/department-timesheet` — Screen 26)

- **Actor:** Department Manager.
- **Giao diện:** Ma trận bảng công toàn bộ nhân viên phòng ban trong tháng (Các cột ngày 1 đến 31).
- Hiển thị ký hiệu chuẩn: `X` (Đủ công), `M` (Đi muộn), `P` (Nghỉ phép), `KP` (Nghỉ không phép), `OT` (Làm thêm giờ).

---

## 6. Quản Lý Bảng Công Toàn Công Ty & Import File Excel (`/attendance/timesheets` — Screen 27)

### 6.1. Actor: HR Staff
### 6.2. Thành phần Bảng Công Tổng Hợp
- Bảng công tháng của toàn thể 184 nhân sự công ty.
- **Nút Import File Máy Chấm Công:**
  - Hộp thoại tải lên file Excel (.xlsx) xuất từ máy quẹt vân tay / nhận diện khuôn mặt.
  - Chức năng Xem trước đối soát (Preview & Validation): Báo cáo số dòng hợp lệ, số dòng lỗi, tự động Upsert dữ liệu dựa trên cặp khóa `(employee_id, work_date)`.
- **Nút "Chốt Công Tháng":** Khóa toàn bộ dữ liệu chấm công tháng, chuyển giao dữ liệu an toàn sang Phân hệ Tính Lương (`PAY`).

---

## 7. Thiết Lập Ca Làm Việc (`/attendance/shifts` — Screen 28)

- Danh mục ca làm việc (Ca hành chính chuẩn, Ca làm ca kíp nếu có).
- Form cấu hình: Giờ bắt đầu (08:00), Giờ kết thúc (17:30), Thời gian nghỉ trưa (12:00 - 13:30), Thời gian ân hạn đi muộn (15 phút).
