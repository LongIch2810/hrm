# 6.5. Payroll Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý dữ liệu lương, tính toán lương tự động từ dữ liệu công/phép, trích đóng bảo hiểm, thuế thu nhập cá nhân, phát hành phiếu lương và tổng hợp bảng lương hàng tháng.

## Objectives

- Tự động hóa tính lương chính xác theo quy định pháp luật Việt Nam (Luật Lao động, Luật BHXH, Luật Thuế TNCN).
- Bảo mật tuyệt đối dữ liệu thu nhập cá nhân và tối ưu hóa thời gian tính toán trả lương.

## Actors

- **HR Staff / Kế toán lương (Payroll Specialist):** Thiết lập thông tin lương, phụ cấp, thưởng, thực thi tính toán và kết xuất bảng lương dự thảo.
- **HR Manager / Ban Giám Đốc:** Rà soát và phê duyệt kỳ lương thành `Approved`; HR Staff khóa kỳ thành `Closed` bằng thao tác riêng.
- **Employee:** Xem và tải phiếu lương điện tử bảo mật của chính mình (Read-only).

## Feature List

- FR-PAY-001: Quản lý thông tin lương.
- FR-PAY-002: Quản lý kỳ lương.
- FR-PAY-003: Tính lương.
- FR-PAY-004: Quản lý phụ cấp.
- FR-PAY-005: Quản lý thưởng.
- FR-PAY-006: Quản lý khấu trừ.
- FR-PAY-007: Quản lý các khoản liên quan đến thuế.
- FR-PAY-008: Quản lý các khoản liên quan đến bảo hiểm.
- FR-PAY-009: Tạo phiếu lương.
- FR-PAY-010: Xem lịch sử lương.
- FR-PAY-011: Tổng hợp bảng lương.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-PAY-001 | Hệ thống phải hỗ trợ quản lý thông tin lương. | HR Staff | Lương cơ bản, mức đóng bảo hiểm theo HĐLĐ | Thông tin cấu hình lương nhân viên được lưu an toàn. | BR-PAY-001; BR-PAY-AUTH-001 | AC-PAY-001 | Confirmed | Should Have |
| FR-PAY-002 | Hệ thống phải hỗ trợ quản lý kỳ lương. | HR Staff; HR Manager hoặc Giám đốc (duyệt) | Tháng kỳ lương (ví dụ: Tháng 10/2026) | Kỳ lương chuyển `Draft` → `Approved` khi duyệt, `Approved` → `Closed` khi HR Staff khóa. | BR-PAY-002 | AC-PAY-002 | Confirmed | Should Have |
| FR-PAY-003 | Hệ thống phải hỗ trợ tính lương. | HR Staff | Dữ liệu công, phép, phụ cấp, thưởng | Tính toán tự động lương Net, BHXH và Thuế TNCN chính xác. | BR-PAY-001; BR-PAY-002 | AC-PAY-003 | Confirmed | Should Have |
| FR-PAY-004 | Hệ thống phải hỗ trợ quản lý phụ cấp. | HR Staff | Danh mục phụ cấp (ăn trưa, xăng xe, điện thoại) | Phân loại phụ cấp chịu thuế và miễn thuế theo quy định. | BR-PAY-001 | AC-PAY-004 | Confirmed | Should Have |
| FR-PAY-005 | Hệ thống phải hỗ trợ quản lý thưởng. | HR Staff | Tiền thưởng dự án, KPI, thưởng lễ | Khoản thưởng được cộng vào tổng thu nhập chịu thuế. | BR-PAY-001 | AC-PAY-005 | Confirmed | Should Have |
| FR-PAY-006 | Hệ thống phải hỗ trợ quản lý khấu trừ. | HR Staff | Tạm ứng, đền bù tài sản, khấu trừ khác | Khấu trừ trừ trực tiếp vào thu nhập sau thuế. | BR-PAY-001 | AC-PAY-006 | Confirmed | Should Have |
| FR-PAY-007 | Hệ thống phải hỗ trợ quản lý các khoản liên quan đến thuế. | Hệ thống tự động; HR Staff | Thu nhập chịu thuế, số người phụ thuộc | Tính thuế TNCN theo biểu lũy tiến từng phần chuẩn Việt Nam. | BR-PAY-002 | AC-PAY-007 | Confirmed | Should Have |
| FR-PAY-008 | Hệ thống phải hỗ trợ quản lý các khoản liên quan đến bảo hiểm. | Hệ thống tự động; HR Staff | Mức lương đóng BHXH | Trích đóng BHXH (8%), BHYT (1.5%), BHTN (1%) chính xác. | BR-PAY-002 | AC-PAY-008 | Confirmed | Should Have |
| FR-PAY-009 | Hệ thống phải hỗ trợ tạo phiếu lương. | HR Staff; Hệ thống | Bảng lương đã khóa | Tự động sinh phiếu lương điện tử riêng biệt cho từng nhân sự. | BR-PAY-002; BR-PAY-AUTH-001 | AC-PAY-009 | Confirmed | Should Have |
| FR-PAY-010 | Hệ thống phải hỗ trợ xem lịch sử lương. | Employee (cá nhân); HR Staff | Kỳ lương cần xem | Hiển thị phiếu lương cá nhân an toàn (Read-only). | BR-PAY-AUTH-001 | AC-PAY-010 | Confirmed | Should Have |
| FR-PAY-011 | Hệ thống phải hỗ trợ tổng hợp bảng lương. | HR Staff; HR Manager | Kỳ lương | Bảng tổng hợp quỹ lương toàn công ty hoặc theo phòng ban. | BR-PAY-001; BR-PAY-AUTH-001 | AC-PAY-011 | Confirmed | Should Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** ID nhân viên, Kỳ lương, Mức lương cơ bản (từ HĐLĐ), Số ngày công thực tế (từ ATT), Số ngày nghỉ phép hưởng lương/không lương (từ LEAVE), Số giờ OT, Phụ cấp, Thưởng, Khấu trừ, Số người phụ thuộc giảm trừ gia cảnh.
- **Output:** Bảng tính lương dự thảo (Draft Payroll), Bảng lương chính thức (Closed Payroll), Phiếu lương điện tử (Payslip).
- **Validation:**
  - Tiền tệ: VNĐ, không âm, làm tròn 0 chữ số thập phân (`PD-017`).
  - Dữ liệu công và phép phải được chốt trước khi thực hiện tính toán lương chính thức.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Payroll Management](../business-rule/payroll-management.md):
  - **BR-PAY-001:** Công thức tính lương Net chuẩn: Lương Net = Lương cơ bản * (Công thực tế / Công chuẩn) + Phụ cấp + Thưởng + Lương OT - BHXH (10.5%) - Thuế TNCN - Khấu trừ (`PD-017`).
  - **BR-PAY-002:** Áp dụng biểu thuế TNCN lũy tiến từng phần, giảm trừ bản thân 11.000.000 VNĐ, người phụ thuộc 4.400.000 VNĐ; Khóa kỳ lương (`Closed`) bất biến dữ liệu; chỉ HR Manager/Giám đốc mới có quyền mở khóa kèm giải trình (`PD-018, PD-019`).
  - **BR-PAY-AUTH-001:** Bảo mật cấp cao; nhân viên chỉ thấy phiếu lương mình; cấm Trưởng phòng xem lương nhân viên phòng khác (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Nhân viên vào giữa tháng hoặc nghỉ việc giữa tháng:** Tính lương thời gian theo tỷ lệ ngày công thực tế làm việc trên tổng số ngày công chuẩn trong tháng.
2. **Thu nhập thực nhận sau giảm trừ ra số âm:** Chặn kết xuất phiếu lương và gửi cảnh báo đỏ để kế toán đối soát lại các khoản khấu trừ hoặc tạm ứng.
3. **Sửa đổi dữ liệu sau khi đã khóa kỳ:** Hệ thống chặn cập nhật trực tiếp; các điều chỉnh phát sinh được ghi nhận dưới dạng "Truy lĩnh / Truy thu" vào kỳ lương của tháng tiếp theo.

## Acceptance Criteria

- **AC-PAY-001 → FR-PAY-001:** Given mức lương cơ bản trong HĐLĐ; When HR mở kỳ lương; Then mức lương được tự động điền vào bảng lương.
- **AC-PAY-002 → FR-PAY-002:** Given kỳ lương mới; When tạo; Then kỳ lương ở trạng thái `Draft` và cho phép tính toán thử nghiệm.
- **AC-PAY-003 → FR-PAY-003:** Given bảng công chốt; When thực thi tính lương; Then lương thời gian tính đúng công thức công thực tế / công chuẩn.
- **AC-PAY-004 → FR-PAY-004:** Given phụ cấp ăn trưa 730.000 VNĐ; Then khoản này được trừ khỏi thu nhập chịu thuế TNCN.
- **AC-PAY-005 → FR-PAY-005:** Given khoản thưởng dự án 5.000.000 VNĐ; Then tiền thưởng cộng vào tổng thu nhập.
- **AC-PAY-006 → FR-PAY-006:** Given tạm ứng 2.000.000 VNĐ; Then số tiền trừ vào phần thực lĩnh cuối cùng.
- **AC-PAY-007 → FR-PAY-007:** Given thu nhập tính thuế sau giảm trừ là 10.000.000 VNĐ; Then thuế TNCN được tính đúng theo bậc 1 và bậc 2 của biểu lũy tiến.
- **AC-PAY-008 → FR-PAY-008:** Given lương đóng BH là 10.000.000 VNĐ; Then trích trừ BHXH 800.000 VNĐ, BHYT 150.000 VNĐ, BHTN 100.000 VNĐ.
- **AC-PAY-009 → FR-PAY-009:** Given kỳ lương đã khóa; Then phiếu lương cá nhân tự động xuất hiện trên cổng nhân viên.
- **AC-PAY-010 → FR-PAY-010:** Given Employee xem lịch sử; Then chỉ thấy các phiếu lương thuộc về ID cá nhân mình.
- **AC-PAY-011 → FR-PAY-011:** Given HR Manager; When xem bảng lương tổng hợp; Then hiển thị tổng quỹ lương, tổng thuế và tổng bảo hiểm phải nộp.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Chấm công (`ATT`): Nhận số công thực tế và giờ OT đã chốt.
- Phân hệ Nghỉ phép (`LEAVE`): Nhận số ngày nghỉ có lương và không lương.
- Phân hệ Hợp đồng (`CON`): Cung cấp mức lương cơ bản và thỏa thuận phụ cấp.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc tính lương và chính sách thuế/bảo hiểm đã được chốt tại PD-006, PD-017, PD-018, PD-019.
