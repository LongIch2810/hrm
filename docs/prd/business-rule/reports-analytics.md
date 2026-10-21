# Business Rules — Reports & Analytics

- **Module ID:** REP
- **Parent Spec:** docs/PRD.md#8
- **Traces-To:** docs/prd/function-requirement/reports-analytics.md
- **Use Cases:** docs/prd/usecase/reports-analytics.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-REP-001: Tính toán chỉ số nhân sự và báo cáo biến động

- **Nội dung quy tắc:**
  - **Tỷ lệ thôi việc (Turnover Rate):** Tính theo công thức chuẩn:
    $$\text{Tỷ lệ thôi việc} = \frac{\text{Số nhân viên nghỉ việc trong kỳ}}{\frac{\text{Tổng NV đầu kỳ} + \text{Tổng NV cuối kỳ}}{2}} \times 100\%$$
  - **Dữ liệu Snapshot:** Các báo cáo thống kê cuối tháng/năm phải được lưu dưới dạng ảnh chụp dữ liệu (Snapshot) để đối soát lịch sử, không bị thay đổi hồi tố khi dữ liệu nhân viên hiện hành biến động.
  - Số lượng nhân viên báo cáo chỉ tính các nhân viên ở trạng thái `Active` hoặc `Probation` (không tính tài khoản đã `Terminated`).
- **Hành vi khi vi phạm:** Báo lỗi `INVALID_DATE_RANGE` nếu khoảng thời gian tra cứu không hợp lệ.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-027`).
- **Quy tắc đã chốt:** 3 báo cáo cốt lõi chuẩn hóa: Biến động nhân sự (Headcount & Turnover), Chuyên cần & Phép (Attendance & Leave), Chi phí lương tổng hợp (Payroll summary); Chi phí tuyển dụng trung bình = Tổng chi phí tuyển dụng trong kỳ / Số ứng viên trúng tuyển (HIRED).

### BR-REP-002: Kiểm soát quyền xuất dữ liệu và che dấu thông tin (Masking)

- **Nội dung quy tắc:**
  - Quyền xuất báo cáo (Excel, PDF, CSV) bị kiểm soát nghiêm ngặt; mọi lượt xuất file phải ghi nhận vào Audit Log.
  - **Che thông tin nhạy cảm (Data Masking):** Khi xuất báo cáo cho cấp quản lý bộ phận, số tài khoản ngân hàng, số CCCD và mức lương cá nhân bắt buộc phải được che dạng `******1234` hoặc ẩn cột (`PD-028, PD-038`).
  - Ban Giám Đốc và HR Manager được xem số liệu đầy đủ theo ma trận quyền.
- **Hành vi khi vi phạm:** Báo lỗi `EXPORT_PERMISSION_DENIED` nếu người dùng không có quyền trích xuất dữ liệu.

### BR-AUTH-001: Phân quyền xem báo cáo

- **Department Manager:** Chỉ được xem báo cáo hiệu suất, chấm công và cơ cấu nhân sự của phòng ban mình.
- **Executive / HR Manager:** Được xem báo cáo toàn diện và báo cáo tài chính nhân sự toàn công ty.
