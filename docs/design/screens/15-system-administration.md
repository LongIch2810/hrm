# Thiết Kế Chi Tiết: Quản Trị Hệ Thống & Bảo Mật — Phân Hệ SYS (Screens 64 - 68)

Tài liệu thiết kế chi tiết phân hệ Quản trị hệ thống (`SYS`), kiểm soát tài khoản người dùng, ma trận phân quyền RBAC, cấu hình thông số và nhật ký kiểm toán bất biến (Audit Logs).
Tuân thủ [Design System](../design-system.md) và [FR-SYS-001 → 010](../../prd/function-requirement/system-administration.md).

---

## 1. Quản Lý Tài Khoản Người Dùng (`/admin/users` — Screen 64)

### 1.1. Actor: System Administrator
### 1.2. Bố cục & Chức năng Bắt buộc (FR-SYS-001)
- Header: Tiêu đề `display-lg`: *"Tài Khoản & Định Danh Người Dùng"*, Nút Primary "+ Cấp tài khoản mới".
- Bộ lọc: Theo Vai trò (Admin, HR, Manager, Employee), Theo Trạng thái (`Active`, `Inactive`, `Locked - Khóa bảo vệ`).
- **Data Table Tài Khoản:**
  - Cột 1: Email đăng nhập công ty (Định danh duy nhất).
  - Cột 2: Nhân viên liên kết (Họ tên, Mã NV, Phòng ban).
  - Cột 3: Vai trò chính (Badge: Admin đỏ, HR cam, Manager xanh dương, Employee xám).
  - Cột 4: Đăng nhập gần nhất (Thời gian & IP).
  - Cột 5: Trạng thái tài khoản (Badge: `Active` xanh, `Locked` đỏ do brute-force, `Inactive` xám).
  - Cột 6: Thao tác: Menu 3 chấm:
    - *Đặt lại mật khẩu tạm thời:* Hệ thống sinh mật khẩu ngẫu nhiên và gửi email kích hoạt (`PD-029`).
    - *Mở khóa tài khoản (Unlock):* Mở khóa ngay lập tức nếu bị khóa do nhập sai mật khẩu 5 lần.
    - *Vô hiệu hóa tài khoản (Deactivate).*
- **Modal Cấp Tài Khoản Mới:** Chọn nhân viên chưa có tài khoản $\rightarrow$ Hệ thống tự sinh email `ho.ten@congty.com.vn` $\rightarrow$ Chọn vai trò RBAC $\rightarrow$ Nút Xác nhận gửi email kích hoạt.

---

## 2. Quản Lý Vai Trò & Ma Trận Phân Quyền RBAC (`/admin/roles` — Screen 65)

### 2.1. Ma Trận Phân Quyền Trực Quan (FR-SYS-004, 005, 006)
- **4 Vai trò chuẩn mực đã phê duyệt:**
  1. `System Administrator`
  2. `HR Staff`
  3. `Department Manager`
  4. `Employee`
- **Bảng Ma Trận Phân Quyền (Permission Matrix Table):**
  - Trục dọc: 12 Module nghiệp vụ (`EMP`, `DEPT`, `ATT`, `LEAVE`, `PAY`, `REC`, `ONB`, `PERF`, `CON`, `TRAIN`, `REP`, `SYS`).
  - Trục ngang: 4 Vai trò người dùng.
  - Các quyền chi tiết tại mỗi giao điểm: `Xem (Read)`, `Thêm/Sửa (Write)`, `Xóa (Delete)`, `Phê duyệt (Approve)`, `Toàn công ty / Phòng ban`.
  - Icon Check xanh hiển thị quyền đã được phê duyệt, ổ khóa xám hiển thị quyền chưa được cấp (ví dụ: Admin không mặc định được xem chi tiết lương theo `PD-008`).

---

## 3. Cấu Hình Thông Số Hệ Thống (`/admin/settings` — Screen 66)

### 3.1. Form Thiết Lập Toàn Cục (FR-SYS-007)
Bố trí dạng các thẻ Card nhóm chức năng rõ ràng:
1. **Thông số Chấm Công & Ca Làm Việc:**
   - Giờ vào ca: `08:00` | Giờ tan ca: `17:30` | Nghỉ trưa: `12:00 - 13:30`.
   - Thời gian ân hạn đi muộn: `15 phút` (Check-in sau 08:15 tính muộn từ 08:00).
   - Block làm tròn giờ làm thêm OT: `30 phút`.
2. **Thông số Nghỉ Phép & Thâm Niên:**
   - Ngày phép năm cơ bản: `12 ngày`.
   - Chu kỳ cộng phép thâm niên: `1 ngày / mỗi 5 năm`.
   - Giới hạn ngày phép tồn chuyển năm sau: `5 ngày` (Hạn chót sử dụng: `31/03`).
3. **Chính Sách Bảo Mật Tài Khoản:**
   - Số lần nhập sai mật khẩu tối đa trước khi khóa: `5 lần`.
   - Thời gian khóa tài khoản tự động: `15 phút`.
   - Thời hạn phiên làm việc Access Token: `15 phút` (Refresh token HttpOnly Cookie 7 ngày).

---

## 4. Quản Lý Thông Báo Hệ Thống (`/admin/notifications-manager` — Screen 67)

- **Actor:** System Admin, HR Staff.
- Danh sách thông báo đã phát hành toàn công ty hoặc theo phòng ban.
- **Form Soạn Thông Báo Mới (Broadcast Notification):**
  - Tiêu đề thông báo.
  - Nội dung thông báo (hỗ trợ rich text đơn giản).
  - Đối tượng nhận: `Toàn thể công ty` hoặc `Phòng ban cụ thể` hoặc `Nhóm vai trò`.
  - Kênh phát: `Thông báo In-App (Chuông)` và `Email nội bộ`.
  - Nút Primary viên thuốc "Gửi thông báo ngay".

---

## 5. Nhật Ký Kiểm Toán Bảo Mật — Audit Logs (`/admin/audit-logs` — Screen 68)

### 5.1. Ràng Buộc Kỹ Thuật Nghiêm Ngặt (`PD-031`, `BR-SYS-002`)
- **Nguyên tắc:** Bất biến (Append-only). Database cấm hoàn toàn quyền `UPDATE` và `DELETE` trên bảng `audit_logs`.
  - **Thời hạn lưu trữ:** Tối thiểu **2 năm**.

### 5.2. Giao diện Bảng Nhật Ký & Drawer So Sánh Thay Đổi
- **Data Table Nhật Ký Kiểm Toán:**
  - Cột 1: Thời gian ghi nhận (Timestamp chính xác đến giây: `2026-10-21 12:15:32`).
  - Cột 2: Người thực hiện (Actor: Tên, Mã NV, Email, Vai trò).
  - Cột 3: Hành động nghiệp vụ (Badge: `LOGIN`, `LOGOUT`, `CREATE_USER`, `UPDATE_EMPLOYEE`, `APPROVE_LEAVE`, `LOCK_PAYROLL`, `CHANGE_ROLE`...).
  - Cột 4: Đối tượng ảnh hưởng (Resource ID, Module).
  - Cột 5: Địa chỉ IP & Thiết bị (Ví dụ: `192.168.1.45 (Windows Chrome)`).
  - Cột 6: Trạng thái: `SUCCESS` (Badge xanh) hoặc `FAILURE` (Badge đỏ).
  - Cột 7: Nút "Xem chi tiết thay đổi".
- **Drawer Chi Tiết So Sánh (Diff Slide-over):**
  - Mở ra khi nhấp xem chi tiết: Hiển thị bảng đối chiếu **Dữ liệu trước (Before)** và **Dữ liệu sau (After)** được highlight rõ ràng theo từng trường bị chỉnh sửa, giúp truy vết an ninh hoàn hảo.
