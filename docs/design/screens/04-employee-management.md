# Thiết Kế Chi Tiết: Quản Lý Nhân Viên — Phân Hệ EMP (Screens 14 - 17)

Tài liệu thiết kế chi tiết phân hệ Quản lý hồ sơ nhân viên (`EMP`), phục vụ Master Data cho toàn bộ hệ thống HRM.
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [FR-EMP-001 → 009](file:///d:/saved/Project/hrm/docs/prd/function-requirement/employee-management.md).

---

## 1. Danh Sách Nhân Viên (`/employees` — Screen 14)

### 1.1. Actor & Phạm vi Phân quyền
- **HR Staff:** Xem toàn bộ nhân viên công ty, có nút Thêm mới, Chỉnh sửa, Xuất danh sách Excel.
- **Department Manager:** Chỉ xem nhân viên thuộc phòng ban mình phụ trách (`AC-EMP-003`).

### 1.2. Bố cục & Thành phần Giao diện
- **Header:** Tiêu đề `display-lg` (EB Garamond 300) *"Danh sách Nhân sự"*, tổng số lượng nhân sự (badge xám), Nút Primary "+ Thêm nhân viên" và Nút Outline "Xuất Excel".
- **Thanh công cụ lọc (Filter & Search Bar):**
  - Ô tìm kiếm theo Tên, Mã NV, Email hoặc Số điện thoại.
  - Dropdown chọn Phòng ban (Cây phòng ban đa tầng).
  - Dropdown chọn Trạng thái: `Tất cả`, `Đang làm việc (Active)`, `Thử việc (Probation)`, `Nghỉ phép (OnLeave)`, `Thôi việc (Terminated)`.
  - Dropdown chọn Chức vụ.
- **Bảng dữ liệu chuẩn (Data Table ở Desktop 1440px):**
  - Cột 1: Mã NV (`EMP0001`...)
  - Cột 2: Nhân viên (Avatar tròn 36px, Họ và tên đậm, Email công ty mờ bên dưới)
  - Cột 3: Phòng ban
  - Cột 4: Chức vụ & Cấp bậc
  - Cột 5: Ngày vào làm (DD/MM/YYYY)
  - Cột 6: Trạng thái (Huy hiệu viên thuốc có màu ngữ nghĩa chuẩn: Xanh lá Active, Xanh dương Probation, Vàng cam OnLeave, Xám Terminated)
  - Cột 7: Thao tác (Nút xem chi tiết, Menu 3 chấm: Sửa, Chuyển trạng thái, Đổi mật khẩu)
- **Chuyển đổi Responsive:**
  - **Tablet (768px):** Ghim cột Mã NV và Tên, các cột còn lại cuộn ngang mượt mà.
  - **Mobile (375px):** **Table chuyển thành Danh sách Thẻ (Stacked Cards):**
    - Mỗi thẻ chứa: Avatar, Tên in đậm, Mã NV, Badge trạng thái góc trên phải, Phòng ban & chức vụ, Nút Xem chi tiết toàn chiều rộng (w-full).
- **Các trạng thái bắt buộc:**
  - `Loading State`: Skeleton Table gồm 5 hàng mô phỏng.
  - `Empty State`: Khi bộ lọc không có kết quả, hiển thị hình vẽ phác nét kèm: *"Không tìm thấy nhân viên nào phù hợp với bộ lọc."* và nút "Xóa bộ lọc".

---

## 2. Thêm Nhân Viên Mới (`/employees/new` — Screen 15)

### 2.1. Actor & Quy tắc Nghiệp vụ
- **Actor:** HR Staff.
- **Mã nhân viên:** Tự động sinh tăng dần dạng `EMPxxxx` (`BR-EMP-001`), hiển thị readonly.
- **Ràng buộc:** CCCD/Hộ chiếu duy nhất, Email công ty hợp lệ và duy nhất.

### 2.2. Giao diện Biểu Mẫu (Multi-Tab / Multi-Step Form)
Chia làm 3 bước rõ ràng để người dùng không bị quá tải thông tin:
1. **Bước 1 — Thông tin cá nhân & Định danh:**
   - Họ và tên đầy đủ, Ngày sinh (DatePicker), Giới tính (Radio pills: Nam / Nữ / Khác).
   - Số CCCD/Hộ chiếu, Ngày cấp, Nơi cấp.
   - Số điện thoại (10 chữ số VN), Email cá nhân, Địa chỉ thường trú.
2. **Bước 2 — Phân công công tác:**
   - Phòng ban (Chọn từ danh mục cây), Chức danh / Vị trí, Cấp bậc.
   - Quản lý trực tiếp (Tự động hiển thị Trưởng phòng ban đã chọn).
   - Ngày bắt đầu làm việc, Địa điểm làm việc.
3. **Bước 3 — Tài khoản & Hợp đồng ban đầu:**
   - Email công ty (gợi ý `ho.ten@congty.com.vn`), checkbox "Tự động gửi email kích hoạt tài khoản".
   - Loại hợp đồng ban đầu (Thử việc / Có thời hạn 1 năm), Mức lương cơ bản thỏa thuận.
- **Chân trang Form:** Nút Outline "Hủy / Quay lại" bên trái, Nút Primary "Lưu hồ sơ nhân viên" bên phải.

---

## 3. Chi Tiết Hồ Sơ Nhân Viên (`/employees/:id` — Screen 16)

### 3.1. Bố cục Tổng thể
- **Khung Banner Hồ Sơ (Profile Header Card):**
  - Nền thẻ có gradient orb nhẹ, Avatar 80px, Họ tên in đậm, Mã NV, Badge trạng thái to, Chức vụ và Phòng ban.
  - Các nút hành động theo quyền: "Chỉnh sửa hồ sơ", "Chuyển trạng thái làm việc", "In hồ sơ tóm tắt".
- **Hệ thống Tabs Thông tin Chuyên sâu:**
  - Tab 1: **Tổng quan & Pháp lý:** Chi tiết liên hệ, CCCD, thông tin thuế, người phụ thuộc giảm trừ gia cảnh (FR-EMP-001).
  - Tab 2: **Lịch sử công tác (FR-EMP-007):** Timeline dọc ghi nhận bất biến các đợt điều chuyển phòng ban, thăng chức kèm ngày hiệu lực và người phê duyệt.
  - Tab 3: **Hợp đồng lao động:** Danh sách các đời hợp đồng (Thử việc, Chính thức, Phụ lục) và file scan PDF.
  - Tab 4: **Chấm công & Nghỉ phép:** Thống kê tóm tắt số ngày công tháng này, số ngày phép năm còn lại.
  - Tab 5: **Tài liệu đính kèm (FR-EMP-008):** Kho tài liệu scan (CCCD, Bằng cấp, Giấy khám sức khỏe, HĐLĐ <= 5MB/file), có nút Tải lên và Tải về an toàn.

---

## 4. Chỉnh Sửa Hồ Sơ & Quản Lý Trạng Thái (`/employees/:id/edit` — Screen 17)

- **Cập nhật thông tin:** Form chỉnh sửa với validation server & optimistic locking (cột Version ngăn xung đột ghi đè).
- **Hộp thoại Chuyển trạng thái làm việc (`Change Status Modal`):**
  - Dropdown chọn trạng thái mới: `Active`, `Probation`, `OnLeave` (Nghỉ thai sản/nghỉ dài hạn), `Terminated` (Nghỉ việc).
  - Chọn Ngày hiệu lực.
  - Lý do chuyển đổi trạng thái.
  - Cảnh báo tự động: *"Nếu chuyển sang 'Terminated', tài khoản hệ thống sẽ bị lên lịch khóa lúc 23:59:59 của ngày làm việc cuối cùng và tự động khởi tạo quy trình Offboarding."*
