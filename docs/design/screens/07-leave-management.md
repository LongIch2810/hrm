# Thiết Kế Chi Tiết: Quản Lý Nghỉ Phép — Phân Hệ LEAVE (Screens 29 - 33)

Tài liệu thiết kế chi tiết phân hệ Nghỉ phép (`LEAVE`), quy trình phê duyệt đơn 1 cấp và quản lý quỹ phép năm.
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [FR-LEAVE-001 → 009](file:///d:/saved/Project/hrm/docs/prd/function-requirement/leave-management.md).

---

## 1. Quỹ Phép & Lịch Sử Đơn Cá Nhân (`/leaves/my-leaves` — Screen 29)

### 1.1. Actor & Trọng tâm
- **Actor:** Tất cả cán bộ nhân viên.
- **Mục tiêu:** Quản lý số ngày phép còn lại, nộp đơn mới và theo dõi lịch sử các đơn đã nộp.

### 1.2. Bố cục Giao diện
- **4 Thẻ Số Dư Quỹ Phép Năm (Leave Balance Cards):**
  1. Phép tiêu chuẩn trong năm: 12.0 ngày (tích lũy 1 ngày/tháng).
  2. Phép thâm niên bổ sung: +1.0 ngày (mỗi 5 năm làm việc).
  3. Phép đã sử dụng: 4.5 ngày.
  4. **Phép khả dụng còn lại:** Con số lớn nổi bật **8.5 ngày**.
- **Bảng Lịch Sử Đơn Nghỉ Phép:**
  - Cột 1: Mã đơn (`LV2026-0042`)
  - Cột 2: Loại phép (Phép năm, Nghỉ ốm hưởng BHXH, Nghỉ thai sản, Nghỉ việc riêng, Nghỉ không hưởng lương)
  - Cột 3: Thời gian nghỉ (Từ ngày $\rightarrow$ Đến ngày, số ngày trừ quỹ)
  - Cột 4: Người duyệt (Trưởng phòng)
  - Cột 5: Trạng thái (Huy hiệu: `Pending` vàng cam, `Approved` xanh lục, `Rejected` đỏ)
  - Cột 6: Thao tác: Xem chi tiết; **Nút "Hủy đơn"** (chỉ hiển thị khi đơn đã duyệt nhưng ngày nghỉ chưa diễn ra, hoàn lại ngày phép vào quỹ nguyên vẹn theo `PD-015`).

---

## 2. Tạo Đơn Xin Nghỉ Phép (`/leaves/new` — Screen 30)

### 2.1. Giao diện Biểu Mẫu (Modal / Page Form)
- Tiêu đề: *"Tạo đơn xin nghỉ phép"*.
- **Dropdown chọn Loại nghỉ phép:** Phép năm (có lương), Nghỉ ốm đau, Nghỉ cưới hỏi, Nghỉ không lương.
  - *Edge case:* Nếu chọn Phép năm mà số dư = 0, hệ thống cảnh báo đỏ và gợi ý chuyển sang "Nghỉ không hưởng lương" (`UNPAID_LEAVE`).
- **Chọn Thời Gian Nghỉ:**
  - Ngày bắt đầu (DatePicker) và Buổi (Cả ngày / Buổi sáng / Buổi chiều).
  - Ngày kết thúc (DatePicker) và Buổi.
  - *Xem trước số ngày tính toán (Dynamic Live Preview):* Hệ thống tự động tính số ngày nghỉ thực tế, **tự động loại trừ Thứ Bảy, Chủ Nhật và ngày Lễ Tết quốc gia**.
- **Ô nhập Lý do nghỉ phép:** Textarea bắt buộc.
- **Người nhận bàn giao công việc (Tùy chọn):** Chọn đồng nghiệp trong cùng phòng ban để bàn giao đầu việc khẩn cấp.
- **Nút Hành Động:** Nút Hủy và Nút Primary viên thuốc "Gửi đơn nghỉ phép".

---

## 3. Phê Duyệt Đơn Nghỉ Phép Phòng Ban (`/leaves/approvals` — Screen 31)

### 3.1. Actor: Department Manager
- **Quy tắc phân quyền:** Manager chỉ nhận thông báo và duyệt đơn của nhân viên thuộc đúng phòng ban mình trực tiếp quản lý (`AC-LEAVE-004`).
- **Danh sách Đơn chờ duyệt:**
  - Thẻ nhân sự: Avatar, Họ tên, Chức vụ.
  - Chi tiết đơn: Loại phép, Thời gian nghỉ, Số ngày bị trừ quỹ, Quỹ phép còn lại hiện tại của nhân sự đó, Lý do xin nghỉ, Người nhận bàn giao.
  - **Hành động 1 chạm:**
    - Nút Primary "Phê duyệt" $\rightarrow$ Quỹ phép nhân viên tự động bị trừ, lịch nghỉ đồng bộ sang bảng công ngay lập tức.
    - Nút Outline "Từ chối" $\rightarrow$ Bắt buộc mở popup nhập lý do từ chối gửi thông báo lại cho nhân viên.

---

## 4. Lịch Nghỉ Phép Phòng Ban / Công Ty (`/leaves/calendar` — Screen 32)

- **Calendar View:** Lưới lịch tháng trực quan, có bộ lọc theo Phòng ban.
- Hiển thị thanh sự kiện màu pastel dịu nhẹ (theo token gradient của `DESIGN.md`) ghi nhận nhân viên đang nghỉ phép, giúp quản lý và đồng nghiệp sắp xếp lịch họp và bàn giao công việc.

---

## 5. Quản Lý Danh Mục Phép & Quỹ Phép Toàn Công Ty (`/leaves/settings` — Screen 33)

- **Actor: HR Staff.**
- Thiết lập danh mục các loại nghỉ phép, quy định hưởng lương (Y/N), có trừ quỹ phép năm hay không.
- Bảng điều chỉnh quỹ phép nhân viên (cho phép HR cộng thêm ngày phép đặc biệt theo quyết định của Ban Giám Đốc).
- Báo cáo tổng hợp số ngày phép đã sử dụng toàn công ty.
