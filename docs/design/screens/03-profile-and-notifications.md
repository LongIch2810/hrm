# Thiết Kế Chi Tiết: Hồ Sơ Cá Nhân & Trung Tâm Thông Báo (Screens 12 - 13)

Tài liệu thiết kế chi tiết cổng tự cập nhật hồ sơ cá nhân (Employee Self-Service Profile) và Trung tâm thông báo hệ thống In-App.
Tuân thủ [Design System](../design-system.md) và [PRD PD-009, PD-029](../../PRD.md#43-roles--permissions-matrix).

---

## 1. Màn hình Hồ Sơ Cá Nhân (`/profile` — Screen 12)

### 1.1. Mô tả Nghiệp vụ & Quyền Hạn
- **Actor:** Tất cả người dùng (Admin, HR, Manager, Employee).
- **Quy tắc phân quyền (PD-009):**
  - **Nhân viên được tự sửa:** Số điện thoại cá nhân, địa chỉ thường trú/tạm trú, người liên hệ khẩn cấp, ảnh đại diện (avatar).
  - **Nhân viên CHỈ XEM (Read-only, do HR quản lý):** Mã nhân viên, Họ và tên, CCCD/Hộ chiếu, Email công ty, Phòng ban, Chức vụ, Ngày vào làm, Mức lương cơ sở, Số tài khoản ngân hàng.

### 1.2. Bố cục & Responsive
- **Desktop (1440px):**
  - Cột trái (320px): Thẻ Card tóm tắt: Avatar tròn 96px có nút đổi ảnh, Mã nhân viên (`EMP-2026-0142`), Họ tên, Chức vụ, Badge trạng thái `ACTIVE` màu xanh lá, Nút đổi mật khẩu.
  - Cột phải (Phần còn lại): Hệ thống 3 Tabs:
    - Tab 1: **Thông tin Liên hệ (Cho phép chỉnh sửa):** SĐT (10 số VN), Email cá nhân, Địa chỉ hiện tại, Thông tin người liên hệ khẩn cấp (Họ tên, quan hệ, SĐT). Nút Primary "Lưu thay đổi".
    - Tab 2: **Thông tin Pháp lý & Công tác (Read-only):** CCCD, Ngày cấp, Nơi cấp, Mã số thuế cá nhân, Số sổ BHXH, Ngày vào làm, Phòng ban, Hợp đồng hiện tại.
    - Tab 3: **Bảo mật & Phiên đăng nhập:** Lịch sử đăng nhập gần nhất (Thiết bị, IP, thời gian), nút "Đăng xuất khỏi tất cả thiết bị".
- **Mobile (375px):**
  - Thẻ tóm tắt căn giữa trên cùng, avatar 80px, các tab chuyển thành nút phân đoạn hoặc cuộn ngang. Form 1 cột w-full, nút Lưu cố định chân trang.

---

## 2. Trung Tâm Thông Báo Hệ Thống (`/notifications` — Screen 13)

### 2.1. Nghiệp vụ & Luồng thông báo
- **Actor:** Tất cả người dùng.
- **Phân loại thông báo (FR-SYS-008):**
  1. Phê duyệt (Approval): Đơn nghỉ phép/OT được duyệt hoặc bị từ chối kèm lý do.
  2. Vận hành (Operational): Nhắc nhở check-in/out, cảnh báo hợp đồng đến hạn 30 ngày, mở kỳ đánh giá KPI.
  3. Toàn công ty (Broadcast): Thông báo nghỉ lễ, sự kiện nội bộ từ HR.

### 2.2. Giao diện & Trạng thái
- **Trạng thái mở nhanh (Dropdown Popover):** Nhấp icon chuông ở Top Header mở popover rộng 380px, hiển thị 5 thông báo chưa đọc, nút "Đánh dấu tất cả đã đọc" và link "Xem toàn bộ thông báo".
- **Trang danh sách đầy đủ (`/notifications`):**
  - Tabs bộ lọc: "Tất cả", "Chưa đọc", "Phê duyệt", "Hệ thống".
  - Mỗi hàng thông báo (`notification-row`): Icon nhận diện loại thông báo trong khối tròn 36px, Tiêu đề đậm `body-strong`, nội dung tóm tắt, thời gian tương đối (ví dụ: *"15 phút trước"*), chấm xanh đánh dấu chưa đọc.
  - Hover hàng hiển thị nút "Đánh dấu đã đọc" hoặc "Xóa".
- **Empty State:** Khi không có thông báo nào, hiển thị icon chuông phác nét mảnh kèm thông điệp: *"Bạn đã cập nhật hết thông báo mới."*
- **Loading State:** Skeleton hiển thị các thanh xám nhấp nháy mô phỏng danh sách thông báo.
