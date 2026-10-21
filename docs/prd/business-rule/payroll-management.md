# Business Rules — Payroll Management

- **Module ID:** PAY
- **Parent Spec:** docs/PRD.md#8.4
- **Traces-To:** docs/prd/function-requirement/payroll-management.md
- **Use Cases:** docs/prd/usecase/payroll-management.md
- **Core Workflow:** docs/prd/workflow/payroll-processing-workflow.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-PAY-001: Công thức tính toán và cấu thành thu nhập

- **Nội dung quy tắc:**
  - Lương thực nhận (Net Salary) được tính theo công thức:
    $$\text{Lương Net} = \text{Tổng thu nhập} - \text{Các khoản trích đóng bảo hiểm} - \text{Thuế TNCN} - \text{Khấu trừ khác}$$
  - **Lương thời gian:** Tính theo tỷ lệ số ngày công thực tế / số ngày công chuẩn trong tháng (Standard working days).
  - **Phụ cấp:** Gồm phụ cấp chịu thuế (phụ cấp trách nhiệm, chức vụ) và phụ cấp miễn thuế theo định mức luật quy định (ăn trưa, xăng xe).
  - **Làm tròn tiền tệ:** Tất cả các giá trị tiền tệ trong bảng lương tính bằng VNĐ và làm tròn đến hàng đơn vị (không có phần thập phân).
- **Hành vi khi vi phạm:** Báo lỗi `CALCULATION_FORMULA_ERROR` hoặc phát hiện âm tiền thực nhận.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-017`).
- **Quy tắc đã chốt:** Định mức phụ cấp áp dụng theo quy định chuẩn: Phụ cấp ăn trưa 730.000 VNĐ/tháng (miễn thuế TNCN), phụ cấp điện thoại/xăng xe theo hợp đồng lao động; toàn bộ tiền tệ tính bằng VNĐ, làm tròn 0 chữ số thập phân.

### BR-PAY-002: Nghĩa vụ thuế TNCN, bảo hiểm bắt buộc và khóa kỳ lương

- **Nội dung quy tắc:**
  - Áp dụng biểu thuế lũy tiến từng phần theo quy định của Luật Thuế TNCN Việt Nam hiện hành; mức giảm trừ bản thân 11.000.000 VNĐ/tháng và giảm trừ người phụ thuộc 4.400.000 VNĐ/người/tháng.
  - Tỷ lệ trích đóng bảo hiểm bắt buộc trừ vào lương nhân viên: BHXH (8%), BHYT (1.5%), BHTN (1%). Mức đóng tối đa áp trần theo lương cơ sở.
  - Kỳ lương chuyển `Draft` → `Approved` khi HR Manager hoặc Giám đốc phê duyệt; HR Staff chuyển `Approved` → `Closed` bằng thao tác khóa kỳ riêng.
  - Sau khi HR Staff khóa kỳ (`Closed`), toàn bộ dữ liệu bảng lương và phiếu lương trở thành bất biến (Read-only).
  - Mọi điều chỉnh truy lĩnh/truy thu phát sinh sau khi khóa kỳ sẽ được cộng/trừ dồn vào kỳ lương của tháng tiếp theo.
- **Hành vi khi vi phạm:** Báo lỗi `PAYROLL_PERIOD_LOCKED` nếu cố tình sửa bảng lương đã khóa.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-018, PD-019`).
- **Quy tắc đã chốt:** Chỉ HR Manager hoặc Ban Giám Đốc mới có thẩm quyền mở khóa kỳ lương (`Unlock Payroll`) và bắt buộc phải nhập lý do giải trình, ghi nhật ký bất biến vào Audit Trail.

### BR-PAY-AUTH-001: Bảo mật và quyền riêng tư bảng lương

- Dữ liệu lương là **Dữ liệu tuyệt mật (Confidential / Sensitive Data)** theo [Quy tắc bảo mật](../../rules/security.md).
- Nhân viên chỉ được xem duy nhất Phiếu lương cá nhân của chính mình.
- Nghiêm cấm Trưởng phòng xem mức lương của nhân viên phòng ban khác, và chỉ xem được tổng chi phí nhân sự nếu được cấp quyền đặc biệt.
- Chỉ Kế toán lương và HR Manager được phân quyền mới có thể truy cập bảng tính chi tiết.
