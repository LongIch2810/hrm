# 6.8. Performance Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý mục tiêu (KPI / OKR), thiết lập trọng số, tổ chức các kỳ đánh giá hiệu suất định kỳ, quy trình tự đánh giá và quản lý đánh giá, khiếu nại và xếp loại nhân sự.

## Objectives

- Chuẩn hóa quy trình đánh giá thành tích định kỳ 3 bước minh bạch, công bằng.
- Tạo cơ sở dữ liệu xác thực phục vụ khen thưởng, tăng lương và quy hoạch đào tạo cán bộ.

## Actors

- **Employee:** Thiết lập mục tiêu cá nhân, tự đánh giá (Self-assessment), xem kết quả và gửi khiếu nại nếu có.
- **Department Manager:** Duyệt mục tiêu, chấm điểm hiệu suất và viết nhận xét phản hồi cho nhân viên phòng mình trực tiếp quản lý.
- **HR Staff / Ban Giám Đốc:** Khởi tạo kỳ đánh giá, giám sát tiến độ, rà soát phân phối điểm và khóa kết quả toàn công ty.

## Feature List

- FR-PERF-001: Quản lý tiêu chí đánh giá.
- FR-PERF-002: Thiết lập mục tiêu (KPI/OKR).
- FR-PERF-003: Quản lý kỳ đánh giá.
- FR-PERF-004: Tự đánh giá hiệu suất.
- FR-PERF-005: Quản lý đánh giá nhân viên.
- FR-PERF-006: Tổng hợp kết quả đánh giá.
- FR-PERF-007: Xếp loại nhân viên.
- FR-PERF-008: Quản lý lịch sử đánh giá.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-PERF-001 | Hệ thống phải hỗ trợ quản lý tiêu chí đánh giá. | HR Staff | Danh mục tiêu chí (chuyên môn, thái độ, tiến độ) | Bộ tiêu chí đánh giá chuẩn hóa theo chức vụ/phòng ban. | BR-PERF-001; BR-PERF-AUTH-001 | AC-PERF-001 | Confirmed | Could Have |
| FR-PERF-002 | Hệ thống phải hỗ trợ thiết lập mục tiêu (KPI/OKR). | Employee thiết lập; Manager duyệt | Mục tiêu, chỉ số đo lường, trọng số (%) | Mục tiêu được xác nhận, tổng trọng số chính xác 100%. | BR-PERF-001 | AC-PERF-002 | Confirmed | Could Have |
| FR-PERF-003 | Hệ thống phải hỗ trợ quản lý kỳ đánh giá. | HR Staff | Tên kỳ (ví dụ: Đánh giá H1/2026), hạn chót các bước | Kỳ đánh giá được mở, gửi thông báo kích hoạt tới nhân sự. | BR-PERF-001; BR-PERF-002 | AC-PERF-003 | Confirmed | Could Have |
| FR-PERF-004 | Hệ thống phải hỗ trợ tự đánh giá hiệu suất. | Employee | Điểm tự chấm (thang 1-5), minh chứng kết quả | Bản tự đánh giá được lưu và chuyển tiếp cho Quản lý. | BR-PERF-002 | AC-PERF-004 | Confirmed | Could Have |
| FR-PERF-005 | Hệ thống phải hỗ trợ quản lý đánh giá nhân viên. | Department Manager | Điểm đánh giá của quản lý, nhận xét chi tiết | Đánh giá của quản lý được ghi nhận, phản hồi cho nhân viên. | BR-PERF-002; BR-PERF-AUTH-001 | AC-PERF-005 | Confirmed | Could Have |
| FR-PERF-006 | Hệ thống phải hỗ trợ tổng hợp kết quả đánh giá. | HR Staff; Hệ thống | Điểm mục tiêu cá nhân và trọng số | Tự động tính điểm tổng kết có trọng số theo công thức chuẩn. | BR-PERF-001; BR-PERF-002 | AC-PERF-006 | Confirmed | Could Have |
| FR-PERF-007 | Hệ thống phải hỗ trợ xếp loại nhân viên. | Hệ thống tự động; HR Staff | Điểm tổng kết | Xếp loại chuẩn 5 mức: Xuất sắc, Tốt, Đạt, Cần cải thiện, Không đạt. | BR-PERF-001 | AC-PERF-007 | Confirmed | Could Have |
| FR-PERF-008 | Hệ thống phải hỗ trợ quản lý lịch sử đánh giá. | Employee (cá nhân); HR Staff | ID nhân viên | Hiển thị toàn bộ lịch sử điểm và xếp loại qua các năm. | BR-PERF-AUTH-001 | AC-PERF-008 | Confirmed | Could Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Danh sách mục tiêu, Trọng số (%), Điểm tự chấm (1.0 - 5.0), Điểm quản lý chấm (1.0 - 5.0), Ý kiến phản hồi.
- **Output:** Bảng tổng kết đánh giá cá nhân, Biểu đồ phân phối xếp loại phòng ban/công ty, Lịch sử đánh giá nhân viên.
- **Validation:**
  - Tổng trọng số các mục tiêu trong kỳ bắt buộc phải bằng chính xác 100%.
  - Thang điểm đánh giá từ 1 đến 5 (bước nhảy 0.1).

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Performance Management](../business-rule/performance-management.md):
  - **BR-PERF-001:** Đánh giá định kỳ 6 tháng hoặc 1 năm; thang điểm 1 đến 5 (5: Xuất sắc, 4: Tốt, 3: Đạt, 2: Cần cải thiện, 1: Không đạt); tổng trọng số 100% (`PD-023`).
  - **BR-PERF-002:** Quy trình 3 bước chuẩn hóa: (1) Nhân viên tự chấm $\rightarrow$ (2) Quản lý trực tiếp chấm điểm & phản hồi $\rightarrow$ (3) HR khóa kết quả; khiếu nại trong vòng 5 ngày làm việc (`PD-024`).
  - **BR-PERF-AUTH-001:** Manager chỉ đánh giá nhân viên phòng mình; nhân viên chỉ thấy điểm cá nhân mình (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Quá hạn đánh giá mà nhân viên chưa tự chấm:** Hệ thống tự động chuyển tiếp hồ sơ sang cấp Quản lý chấm trực tiếp kèm ghi chú quá hạn tự đánh giá.
2. **Khiếu nại điểm đánh giá:** Nhân viên gửi yêu cầu khiếu nại kèm minh chứng; HR đóng vai trò trung gian hòa giải cùng Quản lý trước khi khóa kết quả.
3. **Phân phối điểm lệch chuẩn (Tất cả đều Xuất sắc):** Hệ thống hiển thị cảnh báo phân phối điểm chuông để HR và Ban Giám Đốc rà soát lại trước khi phê duyệt quỹ thưởng.

## Acceptance Criteria

- **AC-PERF-001 → FR-PERF-001:** Given bộ tiêu chí đánh giá; When HR cấu hình theo phòng ban; Then tiêu chí áp dụng đúng cho nhân sự bộ phận đó.
- **AC-PERF-002 → FR-PERF-002:** Given 3 mục tiêu có tổng trọng số 100%; When nhân viên nộp; Then hệ thống chấp nhận lưu mục tiêu.
- **AC-PERF-003 → FR-PERF-003:** Given HR mở kỳ H1/2026; Then toàn bộ nhân sự nhận được thông báo kích hoạt kỳ đánh giá.
- **AC-PERF-004 → FR-PERF-004:** Given nhân viên điền điểm tự chấm; When nhấn nộp; Then trạng thái chuyển sang "Chờ quản lý đánh giá".
- **AC-PERF-005 → FR-PERF-005:** Given Manager chấm điểm nhân viên; When gửi phản hồi; Then nhân viên xem được điểm và nhận xét của quản lý.
- **AC-PERF-006 → FR-PERF-006:** Given điểm thành phần và trọng số; Then hệ thống tính điểm trung bình chính xác đến 1 chữ số thập phân.
- **AC-PERF-007 → FR-PERF-007:** Given điểm tổng kết 4.6/5; Then hệ thống tự động gán xếp loại "Xuất sắc".
- **AC-PERF-008 → FR-PERF-008:** Given nhân viên xem lịch sử; Then hiển thị kết quả của các kỳ đánh giá trước đó.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Nhân viên (`EMP`): Cung cấp danh sách nhân sự tham gia đánh giá.
- Phân hệ Phòng ban (`DEPT`): Xác định Manager trực tiếp phụ trách đánh giá.
- Phân hệ Lương (`PAY`): Nhận kết quả xếp loại để tính thưởng hiệu suất.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc đánh giá hiệu suất đã được chốt tại PD-023, PD-024.
