# Thiết Kế Chi Tiết: Tiếp Nhận & Thôi Việc — Phân Hệ ONB (Screens 43 - 46)

Tài liệu thiết kế chi tiết quy trình tiếp nhận nhân viên mới (Onboarding) và quy trình thôi việc (Offboarding) với checklist 4 bên phối hợp chặt chẽ.
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [FR-ONB-001 → 009](file:///d:/saved/Project/hrm/docs/prd/function-requirement/onboarding-offboarding.md).

---

## 1. Bảng Theo Dõi Tiếp Nhận Nhân Sự Mới (`/onboarding` — Screen 43)

### 1.1. Actor & Trọng tâm
- **Actor:** HR Staff, Department Manager, IT Admin.
- **Mục tiêu:** Giám sát danh sách nhân sự mới tiếp nhận, tiến độ hoàn thành các hạng mục tiếp đón trước và trong ngày đầu đi làm.

### 1.2. Bố cục Giao diện
- Header: Tiêu đề `display-lg`: *"Quy Trình Tiếp Nhận Nhân Sự Mới (Onboarding)"*, Nút Primary "+ Tạo quy trình tiếp nhận".
- Data Table:
  - Cột 1: Nhân sự mới (Avatar, Họ tên, Email).
  - Cột 2: Vị trí & Phòng ban.
  - Cột 3: Ngày bắt đầu làm việc (Start Date).
  - Cột 4: Người hướng dẫn (Mentor).
  - Cột 5: **Tiến độ Checklist (%):** Thanh tiến độ bo góc viên thuốc hiển thị phần trăm hoàn thành thời gian thực (Ví dụ: `75% - 6/8 đầu việc`).
  - Cột 6: Trạng thái: Badge xanh dương `IN_PROGRESS` hoặc Badge xanh lá `COMPLETED`.
  - Cột 7: Thao tác: Nút "Xem checklist 4 bên".

---

## 2. Chi Tiết Checklist Tiếp Nhận Nhân Sự (`/onboarding/:id` — Screen 44)

### 2.1. Quy Trình Checklist 4 Bên Bắt Buộc (`PD-021`)
Hiển thị dạng 4 nhóm công việc có phân định rõ người chịu trách nhiệm và ô checkbox xác nhận:
1. **Khối 1: Hành chính & IT (IT Admin phụ trách):**
   - [ ] Tạo tài khoản email công ty và cấp mật khẩu ban đầu (`SYS`).
   - [ ] Cấp phát máy tính laptop, màn hình phụ, thẻ từ ra vào văn phòng (Ghi rõ số Seri thiết bị).
   - [ ] Cài đặt phần mềm làm việc và phân quyền thư mục mạng nội bộ.
2. **Khối 2: Pháp lý & Nhân sự (HR Staff phụ trách):**
   - [ ] Thu thập hồ sơ cá nhân (CCCD, Sơ yếu lý lịch, Bằng cấp công chứng).
   - [ ] Ký kết Hợp đồng lao động thử việc (`CON`).
   - [ ] Đăng ký mã số thuế TNCN và mở tài khoản ngân hàng nhận lương.
3. **Khối 3: Hội nhập Bộ phận (Department Manager phụ trách):**
   - [ ] Phân công Người hướng dẫn trực tiếp (Mentor).
   - [ ] Giới thiệu thành viên phòng ban và phổ biến quy chế làm việc.
   - [ ] Thiết lập Kế hoạch thử việc & Mục tiêu 60 ngày đầu tiên.
4. **Khối 4: Nhân viên mới xác nhận (Employee phụ trách):**
   - [ ] Ký biên bản bàn giao nhận thiết bị và tài sản.
   - [ ] Hoàn tất cập nhật thông tin liên hệ khẩn cấp trên trang cá nhân.
- **Điều kiện hoàn tất:** Khi **100% mục được xác nhận**, nút Primary **"Hoàn tất Onboarding & Kích hoạt nhân viên chính thức (ACTIVE)"** được mở.

---

## 3. Bảng Theo Dõi Thôi Việc (`/offboarding` — Screen 45)

- **Actor:** HR Staff, Department Manager, IT Admin, Ban Giám Đốc.
- Bảng danh sách nhân sự thôi việc: Họ tên, Phòng ban, Lý do thôi việc, Ngày làm việc cuối cùng (Last Working Day), Trạng thái bàn giao (Đang bàn giao / Đã hoàn tất), Tiến độ checklist 4 bên.

---

## 4. Chi Tiết Checklist Bàn Giao Thôi Việc (`/offboarding/:id` — Screen 46)

### 4.1. Quy Trình Thu Hồi & Bàn Giao 4 Bên (`PD-022`)
1. **Quản lý phòng ban (Department Manager):**
   - [ ] Xác nhận bàn giao toàn bộ tài liệu dự án, hồ sơ khách hàng và mã nguồn.
   - [ ] Chỉ định nhân sự tiếp nhận công việc dang dở.
2. **Hành chính & IT (IT Admin):**
   - [ ] Kiểm tra tình trạng và thu hồi laptop, phụ kiện, thẻ từ ra vào.
   - [ ] **Lên lịch khóa tài khoản:** Tự động vô hiệu hóa quyền truy cập hệ thống đúng **23:59:59 của ngày làm việc cuối cùng** (`PD-022`).
3. **Kế toán & Nhân sự (HR Staff):**
   - [ ] Đối soát chốt ngày công thực tế và số ngày phép năm còn tồn.
   - [ ] Tính toán thanh toán lương đợt cuối và trợ cấp thôi việc (nếu có).
   - [ ] Ký kết Biên bản thanh lý hợp đồng lao động và trả sổ BHXH.
4. **Nhân viên thôi việc (Employee):**
   - [ ] Ký nhận hoàn tất biên bản bàn giao tài sản và quyền lợi.
- **Hoàn tất:** Khi 100% checklist hoàn tất, hồ sơ chuyển sang trạng thái `TERMINATED` và lưu trữ an toàn tối thiểu 5 năm phục vụ tra cứu pháp lý (`PD-008`).
