# Thiết Kế Chi Tiết: Tuyển Dụng Nhân Sự — Phân Hệ REC (Screens 38 - 42)

Tài liệu thiết kế chi tiết phân hệ Tuyển dụng (`REC`), quy trình 5 bước tuyển dụng chuẩn hóa từ đăng tin đến sàng lọc, phỏng vấn, offer và bàn giao Onboarding.
Tuân thủ [Design System](../design-system.md) và [FR-REC-001 → 009](../../prd/function-requirement/recruitment-management.md).

---

## 1. Quản Lý Vị Trí & Tin Tuyển Dụng (`/recruitment/jobs` — Screen 38)

### 1.1. Actor & Giao diện
- **Actor:** HR Staff, Department Manager (xem các vị trí thuộc phòng ban mình).
- **Thành phần:**
  - Tiêu đề `display-lg`: *"Kế Hoạch & Vị Trí Tuyển Dụng"*, Nút Primary "+ Tạo vị trí tuyển dụng mới".
  - Data Table: Mã vị trí (`REC-2026-04`), Tên vị trí tuyển dụng, Phòng ban, Số lượng cần tuyển (Ví dụ: 02/03), Hạn nộp hồ sơ, Trạng thái (Huy hiệu: `Đang mở tuyển / Open`, `Tạm dừng`, `Đã đóng`), Số lượng CV đã nhận.
  - Form tạo/sửa tin tuyển dụng: Mô tả công việc (JD), Yêu cầu chuyên môn, Mức lương dự kiến, Người phỏng vấn vòng 1 & vòng 2.

---

## 2. Cổng Tin Tuyển Dụng Nội Bộ (`/recruitment/internal-jobs` — Screen 39)

- **Actor:** Tất cả nhân viên trong công ty.
- **Mục tiêu:** Tra cứu các cơ hội thăng tiến hoặc giới thiệu bạn bè/ứng viên cho công ty (Employee Referral Program).
- **Giao diện:** Lưới các thẻ Card vị trí tuyển dụng thiết kế thanh lịch, kèm mức thưởng giới thiệu nhân tài, nút "Xem chi tiết JD" và hướng dẫn gửi CV qua email/kênh ngoài để HR nhập hồ sơ.

---

## 3. Quản Lý Ứng Viên — Bảng Kanban Pipeline (`/recruitment/candidates` — Screen 40)

### 3.1. Bảng Kanban 6 Cột Chuẩn Hóa (`PD-020`)
1. **Mới nộp (New / Received):** CV mới tiếp nhận từ email/kênh tuyển dụng do HR nhập liệu.
2. **Sàng lọc (Screening):** HR rà soát hồ sơ, kiểm tra độ phù hợp yêu cầu.
3. **Phỏng vấn (Interview):** Lên lịch phỏng vấn Vòng 1 (HR) hoặc Vòng 2 (Chuyên môn / Manager).
4. **Đề xuất nhận việc (Offer):** Đang soạn thảo hoặc đã gửi thư mời nhận việc.
5. **Trúng tuyển (Hired):** Ứng viên chấp thuận Offer $\rightarrow$ Hệ thống tự động tạo hồ sơ Onboarding.
6. **Không phù hợp (Rejected):** Gồm cả ứng viên từ chối offer hoặc có offer bị thu hồi; lưu lý do. Gian lận không nằm trong danh sách Talent Pool tái liên hệ.

### 3.2. Thẻ Ứng Viên (Candidate Card)
- Họ và tên ứng viên, Email, SĐT, Vị trí ứng tuyển, Đánh giá trung bình (1-5 sao), File CV đính kèm (icon PDF), Ngày nộp.
- Hỗ trợ kéo thả (Drag and drop) giữa các cột ở Desktop/Tablet.
- **Mobile (375px):** Chuyển đổi thành Tabs chọn từng trạng thái hoặc danh sách dọc có bộ lọc trạng thái.

---

## 4. Chi Tiết Ứng Viên & Phiếu Chấm Phỏng Vấn (`/recruitment/candidates/:id` — Screen 41)

### 4.1. Bố cục 2 Cột Chuyên Nghiệp
- **Cột Trái (CV Viewer — 50%):** Trình xem file PDF CV của ứng viên trực tiếp trên trình duyệt, không cần tải về máy.
- **Cột Phải (Thông tin & Phiếu Đánh Giá):**
  - Thông tin ứng viên & Lịch sử trao đổi.
  - **Phiếu Chấm Điểm Phỏng Vấn (Scorecard — FR-REC-007):**
    - Vòng phỏng vấn (Vòng 1: HR Sơ loại; Vòng 2: Department Manager).
    - Các tiêu chí chấm điểm (Kiến thức chuyên môn, Kỹ năng mềm, Thái độ, Độ phù hợp văn hóa) — đánh giá thang điểm 1 đến 5 sao.
    - Nhận xét chi tiết của người phỏng vấn.
    - Kết luận: `Đạt` / `Cần cân nhắc` / `Không đạt`.

---

## 5. Quản Lý Thư Mời Nhận Việc (Offer) & Chuyển Onboarding (`/recruitment/offers` — Screen 42)

- Bảng danh sách Offer đã phát hành: Họ tên ứng viên, Vị trí, Mức lương đề xuất, Ngày bắt đầu làm việc dự kiến, Hạn phản hồi, Trạng thái (`Chờ duyệt`, `Đã gửi ứng viên`, `Đã chấp thuận / Hired`, `Từ chối`).
- **Chuyển giao tự động (FR-REC-009):** Khi ứng viên chuyển sang `Hired`, hệ thống tạo bản ghi tiếp nhận nhân sự sơ bộ trong phân hệ Onboarding (`ONB`), đồng bộ Họ tên, Email, Vị trí, Mức lương thỏa thuận và Ngày bắt đầu làm việc.
- Khi offer bị thu hồi sau `Hired`, hiển thị quy trình Onboarding chưa hoàn tất là đã hủy, kèm lý do và lịch sử.
