# Business Rules — Performance Management

- **Module ID:** PERF
- **Parent Spec:** docs/PRD.md#8.7
- **Traces-To:** docs/prd/function-requirement/performance-management.md
- **Use Cases:** docs/prd/usecase/performance-management.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-PERF-001: Thiết lập mục tiêu, trọng số và thang đo hiệu suất

- **Nội dung quy tắc:**
  - Mục tiêu cá nhân (KPI hoặc OKR) phải được thiết lập và chốt trong vòng 15 ngày đầu tiên của kỳ đánh giá.
  - Tổng trọng số của tất cả các chỉ số KPI trong một kỳ đánh giá phải bằng chính xác 100%.
  - Thang điểm đánh giá chuẩn hóa từ 1 đến 5, quy đổi thành 5 mức (Xuất sắc, Tốt, Đạt, Cần cải thiện, Không đạt).
  - Mục tiêu sau khi đã qua bước "Xác nhận kỳ" giữa Quản lý và Nhân viên thì không được tự ý sửa đổi (trừ khi có phê duyệt mở lại từ HR).
- **Hành vi khi vi phạm:** Báo lỗi `TOTAL_WEIGHT_MUST_BE_100` hoặc `GOALS_LOCKED`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-023`).
- **Quy tắc đã chốt:** Đánh giá định kỳ 6 tháng hoặc 1 năm; thang điểm chuẩn 1 đến 5 (5: Xuất sắc >= 90%, 4: Tốt 80-89%, 3: Đạt 70-79%, 2: Cần cải thiện 50-69%, 1: Không đạt < 50%); hệ số thưởng tính theo xếp loại do Ban Giám Đốc ban hành theo từng kỳ.

### BR-PERF-002: Quy trình đánh giá, khiếu nại và bảo mật kết quả

- **Nội dung quy tắc:**
  - Quy trình đánh giá gồm 3 bước chuẩn hóa: (1) Nhân viên tự đánh giá $\rightarrow$ (2) Quản lý trực tiếp chấm điểm và phản hồi $\rightarrow$ (3) HR rà soát và khóa kết quả.
  - Nhân viên có quyền phản hồi hoặc khiếu nại kết quả trong vòng 5 ngày làm việc sau khi kết quả được công bố.
  - Sau thời hạn khiếu nại, kết quả đánh giá được khóa vĩnh viễn và làm căn cứ xét thưởng, tăng lương hoặc đào tạo.
- **Hành vi khi vi phạm:** Báo lỗi `ASSESSMENT_PERIOD_EXPIRED` nếu đánh giá quá hạn.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-024`).
- **Quy tắc đã chốt:** Áp dụng luồng đánh giá trực tiếp 2 cấp (Nhân viên tự đánh giá & Quản lý trực tiếp chấm); đánh giá 360 độ từ đồng nghiệp là tính năng nâng cao không bắt buộc trong giai đoạn này.

### BR-PERF-AUTH-001: Phân quyền xem kết quả đánh giá

- **Employee:** Được xem mục tiêu cá nhân, điểm tự chấm và kết quả cuối cùng đã công bố của mình; không được xem điểm của người khác.
- **Department Manager:** Đánh giá và xem kết quả của toàn bộ nhân viên trong phòng ban mình quản lý.
- **HR Staff & Management:** Được xem báo cáo phân phối điểm và xếp hạng toàn công ty.
