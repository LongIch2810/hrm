# 6.3. Attendance Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Ghi nhận, quản lý và tổng hợp thời gian làm việc, ca làm việc, đi muộn, về sớm và làm thêm giờ (Overtime) của nhân viên.

## Objectives

- Tự động hóa quá trình ghi nhận thời gian làm việc và đối soát chuyên cần.
- Kết xuất dữ liệu công tổng hợp chính xác phục vụ tính lương hàng tháng.

## Actors

- **Employee:** Thực hiện Check-in / Check-out trên Web, xem lịch sử chấm công và bảng công cá nhân; gửi đơn xin làm thêm giờ (OT).
- **Department Manager:** Xem bảng công nhân viên trong phòng ban mình trực tiếp quản lý; duyệt đơn đăng ký làm thêm giờ (OT).
- **HR Staff:** Quản lý ca làm việc, import file Excel dữ liệu máy chấm công, điều chỉnh giải trình công và chốt bảng công tổng hợp tháng.

## Feature List

- FR-ATT-001: Check-in.
- FR-ATT-002: Check-out.
- FR-ATT-003: Theo dõi lịch sử chấm công.
- FR-ATT-004: Quản lý ca làm việc.
- FR-ATT-005: Ghi nhận đi muộn.
- FR-ATT-006: Ghi nhận về sớm.
- FR-ATT-007: Quản lý làm thêm giờ (Overtime).
- FR-ATT-008: Xem bảng công cá nhân.
- FR-ATT-009: Xem bảng công theo phòng ban.
- FR-ATT-010: Tổng hợp dữ liệu chấm công.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-ATT-001 | Hệ thống phải hỗ trợ check-in. | Employee | Thao tác Check-in, IP/thiết bị; giờ do server ghi nhận | Ghi nhận thời gian Check-in thành công. | BR-ATT-001; BR-ATT-AUTH-001 | AC-ATT-001 | Confirmed | Must Have |
| FR-ATT-002 | Hệ thống phải hỗ trợ check-out. | Employee | Thao tác Check-out, IP/thiết bị; giờ do server ghi nhận | Ghi nhận thời gian Check-out và tính số giờ làm việc. | BR-ATT-001; BR-ATT-AUTH-001 | AC-ATT-002 | Confirmed | Must Have |
| FR-ATT-003 | Hệ thống phải hỗ trợ theo dõi lịch sử chấm công. | Employee (cá nhân); HR Staff (toàn bộ) | Khoảng thời gian tra cứu | Hiển thị chi tiết các lần vào/ra và trạng thái ngày công. | BR-ATT-001 | AC-ATT-003 | Confirmed | Must Have |
| FR-ATT-004 | Hệ thống phải hỗ trợ quản lý ca làm việc. | HR Staff | Giờ bắt đầu, kết thúc, nghỉ trưa | Ca chuẩn 08:00 - 17:30 (8h, nghỉ 12:00 - 13:30, T2-T6). | BR-ATT-001 | AC-ATT-004 | Confirmed | Must Have |
| FR-ATT-005 | Hệ thống phải hỗ trợ ghi nhận đi muộn. | Hệ thống tự động | Giờ check-in thực tế | Check-in sau 08:15 tính muộn từ mốc 08:00. | BR-ATT-002 | AC-ATT-005 | Confirmed | Must Have |
| FR-ATT-006 | Hệ thống phải hỗ trợ ghi nhận về sớm. | Hệ thống tự động | Giờ check-out thực tế | Check-out trước 17:30 tính về sớm số phút thực tế. | BR-ATT-002 | AC-ATT-006 | Confirmed | Must Have |
| FR-ATT-007 | Hệ thống phải hỗ trợ quản lý làm thêm giờ (Overtime). | Employee đăng ký; Manager duyệt | Số giờ OT, lý do, công việc | Đơn OT được duyệt mới tính vào giờ công làm thêm. | BR-ATT-002 | AC-ATT-007 | Confirmed | Must Have |
| FR-ATT-008 | Hệ thống phải hỗ trợ xem bảng công cá nhân. | Employee | Tháng cần xem | Hiển thị bảng công tháng, tổng số công, ngày muộn/về sớm. | BR-ATT-001 | AC-ATT-008 | Confirmed | Must Have |
| FR-ATT-009 | Hệ thống phải hỗ trợ xem bảng công theo phòng ban. | Manager (phòng mình); HR Staff | Phòng ban, tháng cần xem | Bảng công chi tiết nhân viên trong phòng ban quản lý. | BR-ATT-AUTH-001 | AC-ATT-009 | Confirmed | Must Have |
| FR-ATT-010 | Hệ thống phải hỗ trợ tổng hợp dữ liệu chấm công. | HR Staff | Tháng chốt công | Tổng hợp ngày công thực tế, ngày nghỉ phép, giờ OT sang PAY. | BR-ATT-002 | AC-ATT-010 | Confirmed | Must Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** ID nhân viên, Ngày làm việc, Giờ Check-in, Giờ Check-out, File Excel máy chấm công (.xlsx, .csv).
- **Output:** Bảng dữ liệu chấm công hàng ngày (Daily Attendance), Bảng tổng hợp công tháng (Monthly Timesheet) gồm: Tổng công chuẩn, Công thực tế, Số lần đi muộn/về sớm, Số giờ làm thêm (OT).
- **Validation:**
  - Không cho phép check-in hai lần liên tiếp; sau khi hoàn tất check-in/out trong ngày, lần check-in tiếp theo bị từ chối và cần gửi giải trình.
  - Giờ Check-out phải sau giờ Check-in.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Attendance Management](../business-rule/attendance-management.md):
  - **BR-ATT-001:** Ghi nhận bằng Web và file máy; từ chối chấm thêm sau khi hoàn tất ngày công, HR đối soát nếu hai nguồn lệch giờ.
  - **BR-ATT-002:** Ca chuẩn 08:00 - 17:30; ân hạn muộn 15 phút; OT cần duyệt trước và làm tròn lên theo block 30 phút.
  - **BR-ATT-AUTH-001:** Manager chỉ xem và duyệt công cho nhân viên thuộc phòng ban mình trực tiếp quản lý.

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Quên Check-out:** Hệ thống đánh dấu cờ `MISSING_CHECKOUT`; nhân viên phải tạo đơn giải trình bổ sung công có Manager xác nhận.
2. **Import trùng lặp dữ liệu từ máy chấm công:** Không tạo ngày công trùng cho `(employee_id, work_date)`; nếu giờ Web và file máy khác nhau, HR đối soát và chọn giờ có hiệu lực.
3. **Làm thêm giờ không có đơn duyệt trước:** Hệ thống không tự động tính công OT nếu thiếu đơn duyệt hợp lệ.

## Acceptance Criteria

- **AC-ATT-001 → FR-ATT-001:** Given Employee nhấn Check-in; When thời gian hiện tại 08:10; Then hệ thống ghi nhận đúng giờ và không đánh dấu đi muộn (trong ân hạn 15p).
- **AC-ATT-002 → FR-ATT-002:** Given Employee nhấn Check-out; When thời gian 17:35; Then hệ thống ghi nhận hoàn thành đủ 8 giờ làm việc tiêu chuẩn.
- **AC-ATT-003 → FR-ATT-003:** Given Employee xem lịch sử; Then hiển thị đầy đủ nhật ký chấm công trong tháng hiện tại.
- **AC-ATT-004 → FR-ATT-004:** Given ca chuẩn; Then thời gian tính công tự động trừ 1.5 giờ nghỉ trưa (12:00 - 13:30).
- **AC-ATT-005 → FR-ATT-005:** Given Check-in lúc 08:20; Then hệ thống ghi nhận đi muộn 20 phút (tính từ 08:00).
- **AC-ATT-006 → FR-ATT-006:** Given Check-out lúc 17:00; Then hệ thống ghi nhận về sớm 30 phút.
- **AC-ATT-007 → FR-ATT-007:** Given đơn OT 2 giờ được Manager duyệt; When làm việc thực tế 2 giờ; Then tính đủ 2 giờ công OT.
- **AC-ATT-008 → FR-ATT-008:** Given bảng công cá nhân; Then số liệu khớp từng ngày với lịch sử check-in/out.
- **AC-ATT-009 → FR-ATT-009:** Given Manager phòng IT; When xem bảng công phòng ban; Then chỉ thấy danh sách nhân sự phòng IT.
- **AC-ATT-010 → FR-ATT-010:** Given HR chốt công tháng; When nhấn tổng hợp; Then dữ liệu công tháng được đồng bộ khóa và sẵn sàng cho phân hệ tính lương.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Nhân viên (`EMP`): Xác định danh sách nhân sự đang hoạt động.
- Phân hệ Nghỉ phép (`LEAVE`): Bù trừ các ngày nghỉ có phép/không phép vào bảng công.
- Phân hệ Lương (`PAY`): Nhận số liệu công chốt để tính lương.

## Open Questions

**Status:** TBD (To Be Determined)

- Endpoint/DTO và mã lỗi cho các thao tác ATT là gì? Cần xác nhận trong contract module trước khi triển khai API.
