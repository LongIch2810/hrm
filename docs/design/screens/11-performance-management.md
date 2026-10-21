# Thiết Kế Chi Tiết: Đánh Giá Hiệu Suất — Phân Hệ PERF (Screens 47 - 51)

Tài liệu thiết kế chi tiết quy trình đánh giá thành tích hiệu suất (`PERF`) chuẩn 3 bước định kỳ (6 tháng / 1 năm) theo thang điểm 1-5 và xếp loại 5 bậc (A, B, C, D, E).
Tuân thủ [Design System](../design-system.md) và [FR-PERF-001 → 008](../../prd/function-requirement/performance-management.md).

---

## 1. Quản Lý Kỳ Đánh Giá Hiệu Suất (`/performance/cycles` — Screen 47)

### 1.1. Actor & Quy trình 3 bước chuẩn hóa (`PD-023`, `PD-024`)
- **Actor:** HR Staff, Ban Giám Đốc.
- **Kỳ đánh giá:** Định kỳ 6 tháng một lần (H1: Tháng 01 - 06, H2: Tháng 07 - 12) hoặc Đánh giá Năm.
- **Tiến trình 3 bước trực quan:**
  1. `Bước 1: Tự đánh giá` (Nhân viên tự chấm điểm và gửi minh chứng).
  2. `Bước 2: Quản lý đánh giá` (Trưởng phòng chấm điểm và viết phản hồi).
  3. `Bước 3: Tổng kết & Khóa kết quả` (HR tính điểm có trọng số, xếp loại và công bố).
- **Giao diện:** Danh sách các kỳ đánh giá, thanh đo tiến độ nộp bài của toàn công ty (% nhân viên đã hoàn thành), Nút Mở kỳ mới, Nút Khóa kết quả kỳ.

---

## 2. Thiết Lập & Duyệt Mục Tiêu KPI / OKR (`/performance/goals` — Screen 48)

### 2.1. Actor: Nhân viên thiết lập, Quản lý phê duyệt
- **Ràng buộc nghiệp vụ (PD-023):** Tổng trọng số (%) của tất cả các mục tiêu trong một kỳ **bắt buộc phải bằng chính xác 100%**.
- **Giao diện Bảng Mục Tiêu:**
  - Danh sách mục tiêu cá nhân trong kỳ (Tên mục tiêu, Chỉ số đo lường kết quả, Trọng số %, Thời hạn hoàn thành, Trạng thái duyệt).
  - Thanh tổng trọng số thời gian thực (Nếu $\ne 100\%$ hiển thị màu đỏ cảnh báo; nếu $= 100\%$ hiển thị màu xanh lục và cho phép gửi duyệt).
  - Modal thêm/sửa mục tiêu: Tên mục tiêu, Mô tả hành động, Kết quả then chốt (Key Result), Trọng số (10% - 50%).
  - Quản lý có nút "Duyệt mục tiêu" hoặc "Yêu cầu điều chỉnh".

---

## 3. Tự Đánh Giá Hiệu Suất — Self-Review (`/performance/my-reviews` — Screen 49)

### 3.1. Actor: Toàn bộ Nhân viên
- Giao diện Phiếu Tự Chấm Điểm:
  - Hiển thị danh sách các mục tiêu KPI đã được duyệt từ đầu kỳ.
  - Mỗi mục tiêu gồm: Tên mục tiêu (Trọng số 30%), Kết quả thực tế đạt được, Ô đính kèm tài liệu minh chứng (Link / File).
  - **Thang điểm tự chấm:** Thanh trượt (Slider) hoặc Rating sao từ **1.0 đến 5.0** (bước nhảy 0.1).
  - Ô nhận xét bản thân: Những thành tựu nổi bật và điểm cần cải thiện.
  - Nút Primary "Nộp bản tự đánh giá cho Quản lý".

---

## 4. Quản Lý Đánh Giá Nhân Viên Phòng Ban (`/performance/team-reviews` — Screen 50)

### 4.1. Actor: Department Manager
- **Quy tắc phân quyền:** Manager chỉ đánh giá các nhân sự thuộc phòng ban mình phụ trách (`AC-PERF-005`).
- **Giao diện:**
  - Danh sách nhân viên phòng ban kèm trạng thái nộp bài (Đã nộp tự đánh giá / Chưa nộp).
  - Màn hình chấm điểm chi tiết đối chiếu song song:
    - Cột 1: Mục tiêu & Điểm tự chấm của nhân viên.
    - Cột 2: Ô nhập điểm của Quản lý (thang 1.0 - 5.0) kèm lý do tăng/giảm điểm.
    - Cột 3: Trọng số quy đổi.
  - Ô nhận xét định tính bắt buộc của Quản lý (Điểm mạnh, Điểm hạn chế, Đề xuất nâng lương/thưởng hoặc đào tạo).
  - Nút "Lưu nháp" và Nút "Xác nhận gửi kết quả lên HR".

---

## 5. Tổng Kết Kết Quả & Xếp Loại Nhân Sự (`/performance/summary` — Screen 51)

### 5.1. Bảng Xếp Loại 5 Mức Chuẩn (`PD-023`)
- **Điểm tổng kết có trọng số:** $\text{Điểm tổng} = \sum (\text{Điểm mục tiêu} \times \text{Trọng số})$.
- **Xếp loại chuẩn:**
  - **Hạng A (Xuất sắc):** Điểm từ 4.5 đến 5.0 (Tối đa 15% quân số toàn công ty).
  - **Hạng B (Tốt):** Điểm từ 3.8 đến dưới 4.5.
  - **Hạng C (Đạt):** Điểm từ 3.0 đến dưới 3.8.
  - **Hạng D (Cần cải thiện):** Điểm từ 2.0 đến dưới 3.0.
  - **Hạng E (Không đạt):** Điểm dưới 2.0.
- **Biểu đồ hình chuông (Bell Curve):** Phân phối xếp loại phòng ban và toàn công ty.
- **Xử lý khiếu nại (Appeals — PD-024):** Cửa sổ tiếp nhận khiếu nại trong vòng **5 ngày làm việc** kể từ ngày công bố kết quả. Màn hình quản lý khiếu nại dành cho HR và Giám Đốc rà soát lại điểm số.
