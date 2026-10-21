# 6.11. Reports & Analytics

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Cung cấp hệ thống báo cáo quản trị, bảng điều khiển (Dashboard) trực quan, phân tích các chỉ số biến động nhân sự, chuyên cần, nghỉ phép, quỹ lương và hỗ trợ xuất dữ liệu phục vụ lãnh đạo ra quyết định.

## Objectives

- Trực quan hóa dữ liệu nhân sự toàn diện giúp Ban Giám Đốc và HR nắm bắt hiện trạng kịp thời.
- Tự động hóa kết xuất các báo cáo nhân sự định kỳ chính xác, tiết kiệm thời gian tổng hợp thủ công.

## Actors

- **Ban Giám Đốc / HR Manager:** Xem toàn bộ Dashboard tổng thể, các chỉ số phân tích chuyên sâu toàn công ty và xuất báo cáo cấp cao.
- **Department Manager:** Xem Dashboard và các báo cáo chuyên cần, nghỉ phép, hiệu suất của phòng ban mình trực tiếp quản lý.
- **HR Staff:** Tạo, tổng hợp và xuất dữ liệu báo cáo chuyên môn (Excel, PDF) theo thẩm quyền phân công.

## Feature List

- FR-REP-001: Dashboard tổng quan nhân sự.
- FR-REP-002: Thống kê số lượng nhân viên.
- FR-REP-003: Thống kê nhân sự theo phòng ban.
- FR-REP-004: Thống kê tuyển dụng.
- FR-REP-005: Thống kê nghỉ phép.
- FR-REP-006: Báo cáo chấm công.
- FR-REP-007: Báo cáo lương.
- FR-REP-008: Thống kê biến động nhân sự.
- FR-REP-009: Phân tích tỷ lệ nghỉ việc.
- FR-REP-010: Tổng hợp dữ liệu phục vụ quản lý.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-REP-001 | Hệ thống phải hỗ trợ dashboard tổng quan nhân sự. | Giám Đốc; HR Manager; Manager | Kỳ báo cáo, phòng ban | Hiển thị các widget chỉ số: Tổng nhân sự, Đi làm hôm nay, Nghỉ phép, Tuyển dụng. | BR-REP-001; BR-AUTH-001 | AC-REP-001 | Confirmed | Could Have |
| FR-REP-002 | Hệ thống phải hỗ trợ thống kê số lượng nhân viên. | HR Staff; Admin; Giám Đốc | Khoảng thời gian tra cứu | Biểu đồ biến động quy mô nhân sự qua các tháng/năm. | BR-REP-001 | AC-REP-002 | Confirmed | Could Have |
| FR-REP-003 | Hệ thống phải hỗ trợ thống kê nhân sự theo phòng ban. | Tất cả vai trò quản lý | Thời điểm thống kê | Biểu đồ phân bổ tỷ trọng nhân lực giữa các phòng ban. | BR-REP-001; BR-AUTH-001 | AC-REP-003 | Confirmed | Could Have |
| FR-REP-004 | Hệ thống phải hỗ trợ thống kê tuyển dụng. | HR Staff; Giám Đốc | Đợt tuyển dụng, kỳ báo cáo | Báo cáo tỷ lệ chuyển đổi các vòng tuyển, thời gian tuyển và chi phí trung bình. | BR-REP-001 | AC-REP-004 | Confirmed | Could Have |
| FR-REP-005 | Hệ thống phải hỗ trợ thống kê nghỉ phép. | Manager (phòng mình); HR Staff | Phòng ban, năm xem | Báo cáo tỷ lệ nghỉ phép, tổng số ngày phép đã dùng và quỹ phép tồn. | BR-REP-001; BR-AUTH-001 | AC-REP-005 | Confirmed | Could Have |
| FR-REP-006 | Hệ thống phải hỗ trợ báo cáo chấm công. | Manager (phòng mình); HR Staff | Tháng, phòng ban | Bảng thống kê tỷ lệ đi làm đúng giờ, đi muộn, về sớm, vắng mặt. | BR-REP-001; BR-AUTH-001 | AC-REP-006 | Confirmed | Could Have |
| FR-REP-007 | Hệ thống phải hỗ trợ báo cáo lương. | Giám Đốc; HR Manager | Kỳ lương, năm tài chính | Báo cáo phân tích tổng quỹ lương, phụ cấp, thưởng, thuế và bảo hiểm. | BR-REP-002; BR-AUTH-001 | AC-REP-007 | Confirmed | Could Have |
| FR-REP-008 | Hệ thống phải hỗ trợ thống kê biến động nhân sự. | HR Staff; Giám Đốc | Kỳ báo cáo | Thống kê số lượng nhân sự mới tiếp nhận và số lượng nhân sự thôi việc. | BR-REP-001 | AC-REP-008 | Confirmed | Could Have |
| FR-REP-009 | Hệ thống phải hỗ trợ phân tích tỷ lệ nghỉ việc. | HR Staff; Giám Đốc | Kỳ báo cáo | Tính tỷ lệ nghỉ việc (Turnover Rate) chuẩn theo công thức quy định. | BR-REP-001 | AC-REP-009 | Confirmed | Could Have |
| FR-REP-010 | Hệ thống phải hỗ trợ tổng hợp dữ liệu phục vụ quản lý. | HR Staff; Giám Đốc | Các tiêu chí lọc báo cáo | Kết xuất dữ liệu tổng hợp đa chiều dưới định dạng Excel hoặc PDF. | BR-REP-002; BR-AUTH-001 | AC-REP-010 | Confirmed | Could Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Kỳ báo cáo (Tháng, Quý, Năm), Phạm vi phòng ban, Loại báo cáo, Định dạng xuất file (Excel, PDF, CSV).
- **Output:** Biểu đồ tương tác trực quan (Bar, Line, Pie charts), Bảng dữ liệu phân trang, Tệp báo cáo xuất khẩu.
- **Validation:**
  - Khoảng thời gian tra cứu hợp lệ (Từ ngày $\le$ Đến ngày).
  - Áp dụng kỹ thuật che dữ liệu nhạy cảm (Data Masking) đối với CCCD, số tài khoản và lương cá nhân khi xuất báo cáo cho các vai trò ngoài Giám Đốc/HR Manager.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Reports & Analytics](../business-rule/reports-analytics.md):
  - **BR-REP-001:** 3 báo cáo cốt lõi chuẩn: Biến động nhân sự (Headcount/Turnover), Chuyên cần & Phép, Chi phí lương; dữ liệu báo cáo lịch sử lưu trữ dưới dạng Snapshot (`PD-027`).
  - **BR-REP-002:** Kiểm soát quyền xuất dữ liệu (Excel/PDF); che dữ liệu nhạy cảm theo phân loại bảo mật; ghi nhật ký kiểm toán cho mỗi lượt xuất dữ liệu (`PD-028, PD-031, PD-038`).
  - **BR-AUTH-001:** Manager chỉ xem báo cáo nhân sự trong phòng ban mình trực tiếp quản lý (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Dữ liệu quá khứ thay đổi hồi tố:** Báo cáo sử dụng dữ liệu Snapshot tại thời điểm chốt kỳ, đảm bảo không bị sai lệch số liệu khi có thay đổi hồ sơ sau đó.
2. **Xuất báo cáo dữ liệu lớn:** Hệ thống phân luồng trích xuất dữ liệu bất đồng bộ hoặc giới hạn phạm vi xuất tối đa 1 năm để tránh gây nghẽn tài nguyên CPU/Memory.
3. **Người dùng không có quyền truy cập số liệu tài chính:** Các biểu đồ và bảng lương tự động ẩn hoàn toàn khỏi giao diện người dùng.

## Acceptance Criteria

- **AC-REP-001 → FR-REP-001:** Given Giám Đốc đăng nhập; When vào trang chủ; Then Dashboard hiển thị tổng số nhân viên, tỷ lệ đi làm hôm nay và các chỉ số nhân sự chính.
- **AC-REP-002 → FR-REP-002:** Given tra cứu biến động 12 tháng; Then biểu đồ đường thể hiện chính xác tăng giảm quy mô nhân sự.
- **AC-REP-003 → FR-REP-003:** Given biểu đồ phòng ban; Then thể hiện rõ số lượng và tỷ lệ % nhân viên của từng bộ phận.
- **AC-REP-004 → FR-REP-004:** Given thống kê tuyển dụng; Then báo cáo số lượng CV nhận được và số ứng viên trúng tuyển.
- **AC-REP-005 → FR-REP-005:** Given Manager phòng ban; When xem thống kê nghỉ phép; Then chỉ hiển thị dữ liệu của phòng mình.
- **AC-REP-006 → FR-REP-006:** Given báo cáo chuyên cần tháng; Then thể hiện tỷ lệ % đi làm đúng giờ của từng nhân viên.
- **AC-REP-007 → FR-REP-007:** Given HR Manager; When mở báo cáo lương; Then hiển thị biểu đồ phân bổ quỹ lương và chi phí bảo hiểm.
- **AC-REP-008 → FR-REP-008:** Given thống kê biến động Quý 1; Then hiển thị danh sách nhân viên vào mới và thôi việc trong quý.
- **AC-REP-009 → FR-REP-009:** Given công thức Turnover Rate; Then hệ thống tính đúng theo công thức số nghỉ việc / trung bình nhân sự.
- **AC-REP-010 → FR-REP-010:** Given HR nhấn "Xuất Excel"; Then tệp tải về có cấu trúc bảng chuẩn, định dạng số rõ ràng và ghi log sự kiện.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Tổng hợp dữ liệu từ tất cả các phân hệ: `EMP`, `DEPT`, `ATT`, `LEAVE`, `PAY`, `REC`, `ONB`.
- Phân hệ Quản trị hệ thống (`SYS`): Kiểm tra quyền hạn xuất file và ghi nhận audit log.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc báo cáo và phân tích đã được chốt tại PD-027, PD-028.
