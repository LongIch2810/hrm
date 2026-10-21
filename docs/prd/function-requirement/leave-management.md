# 6.4. Leave Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý toàn diện quy trình xin nghỉ phép, phê duyệt đơn nghỉ, theo dõi quỹ phép tồn và tổng hợp dữ liệu nghỉ phép sang bảng công.

## Objectives

- Tự động hóa tính toán quỹ phép năm theo thâm niên và thời gian làm việc thực tế.
- Tối ưu hóa quy trình phê duyệt nghỉ phép 1 cấp nhanh chóng, giảm thiểu tối đa thủ tục giấy tờ.

## Actors

- **Employee:** Tạo đơn xin nghỉ phép, theo dõi trạng thái phê duyệt, xem quỹ ngày phép còn lại và xem lịch nghỉ cá nhân.
- **Department Manager:** Nhận thông báo và thực hiện phê duyệt / từ chối đơn nghỉ phép của nhân viên trực thuộc phòng ban mình.
- **HR Staff:** Quản lý danh mục loại nghỉ phép, điều chỉnh quỹ phép, theo dõi lịch nghỉ toàn công ty và thống kê dữ liệu phép.

## Feature List

- FR-LEAVE-001: Tạo đơn xin nghỉ phép.
- FR-LEAVE-002: Xem lịch sử đơn nghỉ phép.
- FR-LEAVE-003: Theo dõi trạng thái đơn.
- FR-LEAVE-004: Phê duyệt đơn.
- FR-LEAVE-005: Từ chối đơn.
- FR-LEAVE-006: Quản lý các loại nghỉ phép.
- FR-LEAVE-007: Quản lý số ngày phép còn lại.
- FR-LEAVE-008: Xem lịch nghỉ phép.
- FR-LEAVE-009: Thống kê nghỉ phép.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-LEAVE-001 | Hệ thống phải hỗ trợ tạo đơn xin nghỉ phép. | Employee | Loại phép, ngày bắt đầu/kết thúc, lý do | Đơn tạo thành công ở trạng thái `Pending`, gửi thông báo Manager. | BR-LEAVE-001; BR-LEAVE-002 | AC-LEAVE-001 | Confirmed | Must Have |
| FR-LEAVE-002 | Hệ thống phải hỗ trợ xem lịch sử đơn nghỉ phép. | Employee (cá nhân); HR Staff (toàn bộ) | Khoảng thời gian tra cứu | Danh sách đơn nghỉ phép hiển thị chi tiết theo thẩm quyền. | BR-AUTH-001 | AC-LEAVE-002 | Confirmed | Must Have |
| FR-LEAVE-003 | Hệ thống phải hỗ trợ theo dõi trạng thái đơn. | Employee | ID đơn nghỉ phép | Hiển thị trạng thái thời gian thực (`Pending`, `Approved`, `Rejected`). | BR-LEAVE-002 | AC-LEAVE-003 | Confirmed | Must Have |
| FR-LEAVE-004 | Hệ thống phải hỗ trợ phê duyệt đơn. | Department Manager | ID đơn, ghi chú duyệt | Trạng thái chuyển `Approved`, trừ quỹ phép, đồng bộ bảng công. | BR-LEAVE-002; BR-AUTH-001 | AC-LEAVE-004 | Confirmed | Must Have |
| FR-LEAVE-005 | Hệ thống phải hỗ trợ từ chối đơn. | Department Manager | ID đơn, lý do từ chối | Trạng thái chuyển `Rejected`, thông báo lý do tới nhân viên. | BR-LEAVE-002; BR-AUTH-001 | AC-LEAVE-005 | Confirmed | Must Have |
| FR-LEAVE-006 | Hệ thống phải hỗ trợ quản lý các loại nghỉ phép. | HR Staff | Tên loại, hưởng lương (Y/N), trừ quỹ | Danh mục loại phép (Phép năm, Ốm đau, Thai sản, Không lương). | BR-LEAVE-001 | AC-LEAVE-006 | Confirmed | Must Have |
| FR-LEAVE-007 | Hệ thống phải hỗ trợ quản lý số ngày phép còn lại. | Tất cả vai trò theo quyền | ID nhân viên | Hiển thị chính xác: Phép tiêu chuẩn, Phép thâm niên, Đã dùng, Còn lại. | BR-LEAVE-001 | AC-LEAVE-007 | Confirmed | Must Have |
| FR-LEAVE-008 | Hệ thống phải hỗ trợ xem lịch nghỉ phép. | Tất cả vai trò | Tháng, phòng ban | Calendar hiển thị lịch nghỉ của phòng ban trực thuộc. | BR-AUTH-001 | AC-LEAVE-008 | Confirmed | Must Have |
| FR-LEAVE-009 | Hệ thống phải hỗ trợ thống kê nghỉ phép. | HR Staff; Manager (phòng mình) | Kỳ báo cáo | Thống kê tỷ lệ nghỉ phép, tổng ngày nghỉ theo loại và bộ phận. | BR-LEAVE-001; BR-AUTH-001 | AC-LEAVE-009 | Confirmed | Must Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** ID nhân viên, Loại nghỉ phép, Ngày bắt đầu, Ngày kết thúc, Buổi nghỉ (Sáng / Chiều / Cả ngày), Lý do nghỉ, Người nhận bàn giao công việc (tùy chọn).
- **Output:** Bản ghi đơn nghỉ phép, Thông báo thông tri In-App và Email, Bảng số dư phép (Leave Balance) cập nhật.
- **Validation:**
  - Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.
  - Số ngày xin nghỉ không được vượt quá số ngày phép còn lại (đối với phép năm hưởng lương).
  - Đơn nghỉ phép phải nộp trước thời điểm nghỉ tối thiểu 01 ngày (trừ trường hợp nghỉ ốm đột xuất).

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Leave Management](../business-rule/leave-management.md):
  - **BR-LEAVE-001:** Cấp 12 ngày phép năm/năm (+1 ngày mỗi 5 năm thâm niên), tích lũy 1 ngày/tháng; chuyển tối đa 5 ngày sang năm sau (hạn dùng 31/03); nghỉ tối thiểu 0.5 ngày (nửa ngày).
  - **BR-LEAVE-002:** Quy trình phê duyệt 1 cấp trực tiếp bởi Department Manager; trừ quỹ phép và đồng bộ bảng công ngay khi duyệt; hoàn phép nguyên vẹn nếu hủy đơn trước ngày nghỉ.
  - **BR-AUTH-001:** Manager chỉ duyệt đơn nhân viên phòng ban mình; HR Staff giám sát toàn quyền.

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Hết ngày phép năm:** Hệ thống chặn nộp đơn nghỉ phép năm, gợi ý nhân viên chọn loại "Nghỉ không hưởng lương" (`UNPAID_LEAVE`).
2. **Hủy đơn sau khi đã duyệt:** Nếu ngày nghỉ chưa diễn ra, nhân viên được phép gửi yêu cầu hủy đơn; Manager xác nhận hủy thì hệ thống hoàn lại ngày phép vào quỹ.
3. **Nghỉ trùng ngày nghỉ lễ hoặc cuối tuần:** Hệ thống tự động loại trừ các ngày Thứ Bảy, Chủ Nhật và ngày Lễ Tết quốc gia khi tính tổng số ngày nghỉ bị trừ.

## Acceptance Criteria

- **AC-LEAVE-001 → FR-LEAVE-001:** Given Employee còn 5 ngày phép; When tạo đơn nghỉ 1 ngày hợp lệ; Then đơn tạo thành công ở trạng thái `Pending`.
- **AC-LEAVE-002 → FR-LEAVE-002:** Given Employee truy cập lịch sử; Then hiển thị đầy đủ danh sách các đơn đã nộp trong năm.
- **AC-LEAVE-003 → FR-LEAVE-003:** Given đơn được duyệt; Then trạng thái đổi sang `Approved` kèm thông báo chuông In-App cho Employee.
- **AC-LEAVE-004 → FR-LEAVE-004:** Given Manager nhấn "Duyệt"; Then quỹ phép nhân viên bị trừ 1 ngày và ngày đó hiển thị trạng thái "Nghỉ phép" trên bảng công.
- **AC-LEAVE-005 → FR-LEAVE-005:** Given Manager từ chối kèm lý do; Then đơn chuyển trạng thái `Rejected`, quỹ phép không bị thay đổi.
- **AC-LEAVE-006 → FR-LEAVE-006:** Given HR tạo loại phép mới; Then loại phép hiển thị trong dropdown tạo đơn.
- **AC-LEAVE-007 → FR-LEAVE-007:** Given nhân viên có thâm niên 6 năm; Then tổng quỹ phép năm là 13 ngày (12 cơ bản + 1 thâm niên).
- **AC-LEAVE-008 → FR-LEAVE-008:** Given Manager xem lịch nghỉ; Then calendar hiển thị toàn bộ nhân viên trong phòng đang nghỉ phép.
- **AC-LEAVE-009 → FR-LEAVE-009:** Given HR Staff; When xuất báo cáo nghỉ phép; Then bảng dữ liệu tổng hợp chính xác số ngày nghỉ theo từng phòng ban.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Nhân viên (`EMP`): Cung cấp thông tin nhân sự và ngày bắt đầu làm việc để tính thâm niên.
- Phân hệ Phòng ban (`DEPT`): Xác định Manager trực tiếp có thẩm quyền duyệt đơn.
- Phân hệ Chấm công (`ATT`): Nhận dữ liệu ngày nghỉ được duyệt để đánh dấu ngày công hợp lệ.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc nghỉ phép đã được chốt tại PD-015, PD-016.
