# Thiết Kế Chi Tiết: Cơ Cấu Tổ Chức & Phòng Ban — Phân Hệ DEPT (Screens 18 - 21)

Tài liệu thiết kế chi tiết phân hệ Quản lý Cơ cấu tổ chức và Phòng ban (`DEPT`).
Tuân thủ [Design System](../design-system.md) và [FR-DEPT-001 → 007](../../prd/function-requirement/department-management.md).

---

## 1. Sơ Đồ Cây Cơ Cấu Tổ Chức (`/departments/org-chart` — Screen 18)

### 1.1. Actor & Trải nghiệm Người Dùng
- **Actor:**
  - Employee & Department Manager: Xem toàn công ty (Read-only) để hiểu rõ cấu trúc tổ chức và các đầu mối liên hệ.
  - HR Staff & System Admin: Chế độ tương tác, cho phép thêm nhánh, điều chỉnh phòng ban cha, gán trưởng phòng.

### 1.2. Bố cục & Tương tác Trực quan
- **Vùng Canvas Cây Phân Cấp (Interactive Tree Canvas):**
  - Hỗ trợ Phóng to / Thu nhỏ (Zoom in/out từ 50% đến 150%) và Kéo rê (Pan) mượt mà.
  - Các node phòng ban (`department-node-card`): Thẻ nền trắng bo góc `16px`, viền tóc 1px `#e7e5e4`, chứa Tên phòng ban (`title-sm`), Mã phòng, Avatar + Tên Trưởng phòng (Head of Dept), và Badge đếm số lượng nhân sự trực thuộc (Ví dụ: *"24 nhân sự"*).
  - Đường nối phân cấp (Connecting Lines): Nét vẽ 1.5px màu `hairline-strong` (#d6d3d1) vuông góc rõ ràng.
- **Tương tác Click Node:** Nhấp vào 1 node mở **Drawer bên phải (Detail Slide-over)**:
  - Danh sách toàn bộ nhân viên thuộc phòng ban đó.
  - Thông tin Trưởng phòng và 2 Phó phòng (nếu có).
  - Nút chuyển đến Danh sách nhân viên đã lọc theo phòng ban đó.
- **Chuyển đổi Responsive Di Động (375px):**
  - Không ép cuộn 2 chiều trên canvas; **tự động chuyển thành Danh sách Accordion dạng cây (Tree Accordion List)** có thể chạm mở/thu gọn từng cấp phòng ban dễ dàng.

---

## 2. Danh Sách Phòng Ban (`/departments` — Screen 19)

### 2.1. Bố cục Bảng Dữ Liệu
- Header: Tiêu đề `display-lg` *"Danh Mục Phòng Ban"*, Nút Primary "+ Thêm phòng ban", nút chuyển đổi nhanh sang dạng Sơ đồ cây (Org Chart).
- Data Table:
  - Cột 1: Mã phòng ban (Ví dụ: `TECH`, `HR`, `SALES` — chữ in hoa không dấu).
  - Cột 2: Tên phòng ban (Hỗ trợ hiển thị thụt đầu dòng theo cấp bậc phân tầng cha-con).
  - Cột 3: Phòng ban cha (Nếu là phòng cao nhất thì hiển thị badge "Cấp cao nhất / Root").
  - Cột 4: Trưởng phòng (Avatar tròn + Họ tên).
  - Cột 5: Phó phòng (Tối đa 2 người).
  - Cột 6: Số lượng nhân sự (Badge viên thuốc xám).
  - Cột 7: Thao tác (Sửa, Thêm phòng ban con, Đóng phòng ban).

---

## 3. Thêm / Chỉnh Sửa Phòng Ban (`/departments/new`, `/departments/:id/edit` — Screen 20)

### 3.1. Giao diện Hộp Thoại (Modal Form)
- Tiêu đề modal: *"Thêm mới phòng ban"* hoặc *"Chỉnh sửa phòng ban"*.
- Ô nhập Mã phòng ban: Viết hoa không dấu, validate duy nhất.
- Ô nhập Tên phòng ban: Validate duy nhất toàn công ty.
- Dropdown Phòng ban cha: Chọn từ cây danh mục. Áp dụng kiểm tra thuật toán DFS ngay tại client để **loại trừ chính phòng ban đó và tất cả phòng ban con của nó khỏi danh sách chọn**, triệt tiêu nguy cơ vòng lặp phân cấp (`CIRCULAR_HIERARCHY_DETECTED`).
- Dropdown chọn Trưởng phòng (Head): Chọn từ danh sách nhân viên đang `Active`.
- Dropdown chọn Phó phòng (Deputy Head): Chọn tối đa 2 nhân sự.
- Mô tả chức năng nhiệm vụ của phòng ban.
- Validation & Cảnh báo: Nếu đóng phòng ban đang còn nhân viên, hệ thống chặn lưu và yêu cầu điều chuyển nhân sự trước (`PD-012`).

---

## 4. Quản Lý Chức Vụ & Cấp Bậc (`/departments/positions` — Screen 21)

### 4.1. Bố cục 2 Tabs
- **Tab 1: Danh Mục Chức Vụ (Job Positions — FR-DEPT-002):**
  - Bảng danh mục: Mã chức vụ, Tên chức vụ (Frontend Dev, HR Executive, Accountant...), Phòng ban phụ trách, Mô tả công việc, Số lượng nhân sự đang giữ chức vụ.
  - Modal thêm/sửa chức vụ nhanh.
- **Tab 2: Danh Mục Cấp Bậc (Job Levels / Grades — FR-DEPT-003):**
  - Bảng danh mục cấp bậc chuẩn: Level 1 (Junior/Fresher), Level 2 (Mid-level), Level 3 (Senior), Level 4 (Lead/Principal), Level 5 (Director).
  - Hệ số/Khoảng lương tham chiếu chuẩn của từng bậc.
