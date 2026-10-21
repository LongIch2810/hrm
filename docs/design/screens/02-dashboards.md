# Thiết Kế Chi Tiết: Bảng Điều Khiển Theo Từng Vai Trò (Screens 8 - 11)

Tài liệu thiết kế chi tiết 4 Dashboard độc lập theo 4 nhóm vai trò RBAC: System Administrator, HR Staff, Department Manager và Employee Portal.
Tuân thủ [Design System](../design-system.md) và [PRD Section 4.1](../../PRD.md#41-user-personas).

---

## 1. Dashboard Quản Trị Hệ Thống (`/admin/dashboard` — Screen 8)

### 1.1. Actor & Trọng tâm công việc
- **Actor:** System Administrator (IT / Vận hành).
- **Mục tiêu:** Giám sát trạng thái an toàn hệ thống, tài khoản hoạt động, phân bổ quyền RBAC và các sự kiện bảo mật tức thời.

### 1.2. Bố cục & Thành phần Giao diện
- **Header:** Lời chào biên tập `display-md`: *"Hạ Tầng & Quản Trị Hệ Thống"*, trạng thái bảo mật hệ thống (Badge xanh "Hệ thống an toàn").
- **Hàng 1: Thẻ chỉ số tổng quan (4 Metric Cards):**
  1. Tổng tài khoản: 184 (Active: 172, Inactive: 8, Locked: 4).
  2. Phiên làm việc đồng thời: 38 active sessions.
  3. Sự kiện Audit Log 24h: 1,429 bản ghi.
  4. Lần thử đăng nhập thất bại hôm nay: 7 lần (0 tài khoản brute-force lock).
- **Hàng 2 (Split 65:35 ở Desktop, 1 cột ở Mobile):**
  - Cột trái: Bảng tóm tắt **Nhật ký kiểm toán bảo mật mới nhất** (5 bản ghi gần nhất: Actor, Hành động, IP, Thời gian, Trạng thái), link xem toàn bộ `/admin/audit-logs`.
  - Cột phải: Khối **Phân bổ vai trò người dùng** (Biểu đồ phân bổ 4 vai trò: Admin 3, HR 5, Manager 12, Employee 164) và Lối tắt cấu hình hệ thống nhanh.

### 1.3. Responsive
- **1440px:** 4 thẻ KPI dàn hàng ngang, layout 2 cột thông thoáng.
- **768px:** 4 thẻ KPI bố trí grid 2x2, bảng và biểu đồ xếp dọc.
- **375px:** 4 thẻ KPI xếp dọc 1 cột, bảng rút gọn thành các thẻ sự kiện bảo mật thu gọn.

---

## 2. Dashboard Tổng Quan Nhân Sự (`/hr/dashboard` — Screen 9)

### 2.1. Actor & Trọng tâm công việc
- **Actor:** HR Staff (Chuyên viên Nhân sự).
- **Mục tiêu:** Bức tranh toàn cảnh về quy mô, tình hình chuyên cần hôm nay, cảnh báo hợp đồng sắp hết hạn và các việc cần xử lý trong ngày.

### 2.2. Bố cục & Thành phần
- **Banner chào mừng:** Nền `card-orb` với atmospheric gradient mint & sky dịu mát, tiêu đề `display-lg`: *"Xin chào, Thu Thảo"*, phụ đề: *"Hôm nay có 4 đơn nghỉ phép và 2 hợp đồng cần rà soát."*
- **Hàng chỉ số vận hành (Quick Stats):**
  1. Quân số toàn công ty: 184 nhân sự (162 chính thức, 22 thử việc).
  2. Chuyên cần hôm nay: 176 / 184 có mặt (4 nghỉ phép, 3 đi muộn, 1 vắng).
  3. Hợp đồng sắp hết hạn (<= 30 ngày): 3 hợp đồng cần tái ký.
  4. Tuyển dụng đang mở: 5 vị trí (42 hồ sơ ứng viên đang xử lý).
- **Khu vực Tác vụ Ưu tiên (Action Queue):**
  - Danh sách Đơn nghỉ phép cấp công ty chờ rà soát.
  - Danh sách Ứng viên phỏng vấn hôm nay.
  - Cảnh báo Hợp đồng lao động đến hạn 30 ngày.

---

## 3. Dashboard Quản Lý Bộ Phận (`/manager/dashboard` — Screen 10)

### 3.1. Actor & Trọng tâm công việc
- **Actor:** Department Manager (Trưởng bộ phận).
- **Phạm vi dữ liệu:** Giới hạn nghiêm ngặt trong phòng ban trực tiếp quản lý (Ví dụ: Phòng Kỹ thuật Công nghệ — 24 nhân sự).
- **Mục tiêu:** Nắm bắt ai đi làm/vắng mặt hôm nay, xử lý phê duyệt đơn nghỉ phép và đơn OT trong vòng 24 giờ.

### 3.2. Bố cục & Thành phần
- **Thẻ Quân số Phòng ban Hôm nay:**
  - Tổng nhân sự: 24 người.
  - Có mặt: 21 người.
  - Nghỉ phép có duyệt: 2 người (Hiển thị avatar và lý do nghỉ: Nghỉ phép năm).
  - Đi muộn hôm nay: 1 người (Check-in lúc 08:22, muộn 22 phút).
- **Hộp Phê Duyệt Cấp Bách (Approval Inbox — SLA < 24h):**
  - Tab 1: Đơn xin nghỉ phép cần duyệt (Tên nhân viên, Loại phép, Ngày nghỉ, Lý do, Người bàn giao, Nút Duyệt / Từ chối nhanh).
  - Tab 2: Đơn làm thêm giờ (OT) cần duyệt (Ngày làm, Số giờ dự kiến, Mục tiêu công việc, Nút Duyệt).
- **Lịch Công Tác Phòng Ban Tuần Này:** Agenda danh sách nhân sự nghỉ phép hoặc làm OT trong 7 ngày tới.

---

## 4. Cổng Tự Phục Vụ Nhân Viên (`/portal/dashboard` — Screen 11)

### 4.1. Actor & Trọng tâm công việc
- **Actor:** Employee (Nhân viên).
- **Thiết bị chính:** Tối ưu hóa đặc biệt cho **Mobile Web (375px)** và Desktop.
- **Mục tiêu:** Check-in/out 1 chạm, kiểm tra ngày phép còn lại, xem ca làm việc và phiếu lương.

### 4.2. Bố cục & Thành phần
- **Card Chấm Công 1 Chạm (Hero Quick Action):**
  - Đồng hồ số thời gian thực (Giờ:Phút:Giây) với typography Inter rõ ràng.
  - Ngày tháng hiện tại và Ca làm việc: *"Ca hành chính (08:00 - 17:30)"*.
  - Nút bấm lớn hình viên thuốc (`rounded.pill`):
    - Nếu chưa vào: Nút Ink `#292524` nổi bật **"Check-in Vào ca"**.
    - Nếu đã vào: Nút Outline viền tóc **"Check-out Tan ca"** (ghi nhận thời gian đã làm: 5h 12p).
  - Thông báo trạng thái: *"Bạn đã check-in lúc 08:08 (Đúng giờ)"*.
- **Thẻ Quỹ Phép Năm Khả Dụng (Leave Balance Card):**
  - Số ngày phép còn lại: Con số lớn `display-lg` (Ví dụ: **7.5** ngày).
  - Thanh phân bổ trực quan: Đã dùng 4.5 ngày, Phép cơ bản 12 ngày, Thâm niên +1 ngày.
  - Nút Primary nhỏ: **"+ Tạo đơn xin nghỉ"** (mở modal tạo đơn nhanh).
- **Lối tắt Tiện ích Cá nhân:**
  - Thẻ tóm tắt Ngày công tháng này: 21.5 / 22 công chuẩn.
  - Phiếu lương mới nhất (Tháng 09/2026): Nút xem chi tiết bảo mật.
  - Lịch công ty & Ngày nghỉ lễ kế tiếp.
