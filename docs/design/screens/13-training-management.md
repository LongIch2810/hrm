# Thiết Kế Chi Tiết: Quản Lý Đào Tạo — Phân Hệ TRAIN (Screens 55 - 58)

Tài liệu thiết kế chi tiết phân hệ Đào tạo nhân sự nội bộ (`TRAIN`), tổ chức khóa học, điểm danh chuyên cần, đánh giá và cấp phát chứng chỉ số.
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [FR-TRAIN-001 → 008](file:///d:/saved/Project/hrm/docs/prd/function-requirement/training-management.md).

---

## 1. Quản Lý Chương Trình & Khóa Đào Tạo (`/training/courses` — Screen 55)

### 1.1. Actor: HR Staff, Giảng viên (Trainer)
- **Mục tiêu:** Quản lý lộ trình đào tạo, danh mục khóa học nâng cao kỹ năng hoặc tuân thủ an toàn/bảo mật thông tin.
- **Bố cục Giao diện:**
  - Header: Tiêu đề `display-lg`: *"Chương Trình & Khóa Đào Tạo"*, Nút Primary "+ Mở khóa đào tạo mới".
  - Bộ lọc: Theo Chương trình đào tạo, Theo Trạng thái (`Sắp diễn ra / Open`, `Đang đào tạo / In Progress`, `Đã kết thúc / Completed`).
  - Lưới Thẻ Khóa Học (Course Cards):
    - Tên khóa học (Ví dụ: *"An Toàn Thông Tin & Bảo Mật Dữ Liệu 2026"*, *"Kỹ Năng Quản Lý Dự Án Nâng Cao"*).
    - Giảng viên phụ trách (Nội bộ hoặc Chuyên gia mời).
    - Thời lượng (Ví dụ: 16 giờ — 4 buổi).
    - Sĩ số học viên (Ví dụ: `24/30 học viên`).
    - Tính chất: Badge xanh "Khóa bắt buộc (Compliance)" hoặc Badge xám "Tự chọn".
    - Tiến độ khóa học: Thanh progress hiển thị số buổi đã học.

---

## 2. Lập Lịch Đào Tạo & Phân Công Học Viên (`/training/courses/:id/schedule` — Screen 56)

### 2.1. Lập Lịch (Schedule Calendar — FR-TRAIN-003)
- Lịch thời khóa biểu chi tiết từng buổi học (Ngày học, Khung giờ 14:00 - 17:30, Địa điểm phòng đào tạo hoặc Link trực tuyến).
- Chức năng tự động kiểm tra trùng lịch học với các khóa bắt buộc khác của cùng học viên.

### 2.2. Phân Công Học Viên (FR-TRAIN-004)
- Giao diện chọn nhân viên tham gia theo Phòng ban hoặc chọn đích danh.
- Cảnh báo sức chứa tối đa: Không cho phép thêm học viên vượt quá sĩ số quy định của lớp học.
- Tự động gửi email thông báo và thêm lịch học vào Lịch cá nhân của nhân sự.

---

## 3. Điểm Danh, Nhập Điểm & Cấp Chứng Chỉ (`/training/courses/:id/attendance-grades` — Screen 57)

### 3.1. Điểm Danh Từng Buổi (FR-TRAIN-005)
- Bảng danh sách học viên trong lớp:
  - Cột 1: Học viên (Mã NV, Họ tên, Phòng ban).
  - Cột các buổi học (Buổi 1, Buổi 2, Buổi 3, Buổi 4): Checkbox hoặc Switch bấm nhanh Có mặt / Vắng.
  - Cột Tỷ lệ chuyên cần (%): Tự động tính toán (Yêu cầu $\ge 80\%$ để đủ điều kiện thi kết thúc khóa theo `PD-026`).

### 3.2. Nhập Điểm Thi & Cấp Chứng Chỉ (FR-TRAIN-006, 007)
- Cột Điểm kiểm tra cuối khóa (Thang điểm 10, bước nhảy 0.5).
- **Quy tắc cấp chứng chỉ tự động (PD-026):**
  - Điều kiện: Chuyên cần $\ge 80\%$ **VÀ** Điểm thi $\ge 6.0/10$.
  - Nếu đạt: Trạng thái hiển thị Badge xanh lá **"ĐỦ ĐIỀU KIỆN CẤP CHỨNG CHỈ"**.
  - Nút Primary "Phát hành chứng chỉ số" $\rightarrow$ Sinh mã chứng chỉ duy nhất dạng `CERT-2026-xxxx` và tự động đồng bộ vào Hồ sơ nhân viên `EMP`.

---

## 4. Khóa Học & Chứng Chỉ Của Tôi (`/training/my-training` — Screen 58)

- **Actor: Toàn bộ Nhân viên.**
- **Tab 1: Khóa học của tôi:** Các khóa học được phân công, lịch học sắp tới, nút tải slide bài giảng và tài liệu PDF.
- **Tab 2: Chứng chỉ đạt được:** Kho chứng chỉ số hóa đã đạt được tại công ty, hiển thị bản xem trước giấy chứng nhận kèm nút Tải chứng chỉ PDF.
