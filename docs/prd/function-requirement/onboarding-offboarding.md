# 6.7. Onboarding & Offboarding

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý toàn diện quy trình tiếp nhận nhân sự mới (Onboarding), phân công nhiệm vụ hội nhập, cấp phát thiết bị/tài khoản và quy trình thôi việc, bàn giao công việc, thu hồi tài sản, thanh lý hợp đồng (Offboarding).

## Objectives

- Tối ưu hóa trải nghiệm ngày đầu đi làm của nhân viên mới thông qua checklist chuẩn hóa.
- Đảm bảo an toàn tài sản, bảo mật thông tin và thu hồi quyền truy cập triệt để khi nhân sự nghỉ việc.

## Actors

- **HR Staff:** Khởi tạo, theo dõi tiến độ checklist Onboarding/Offboarding, hoàn thiện hồ sơ pháp lý, HĐLĐ và quyết toán nghỉ việc.
- **IT Admin:** Cấp phát tài khoản email, phần mềm, laptop và vô hiệu hóa tài khoản, thu hồi quyền truy cập khi nghỉ việc.
- **Department Manager:** Phân công người hướng dẫn (Mentor), theo dõi kế hoạch thử việc và ký xác nhận bàn giao công việc khi nhân viên nghỉ.
- **Employee:** Thực hiện các nhiệm vụ được giao trong checklist tiếp nhận hoặc hoàn tất thủ tục bàn giao trước khi rời công ty.

## Feature List

- FR-ONB-001: Quản lý quy trình tiếp nhận nhân viên mới.
- FR-ONB-002: Tạo checklist tiếp nhận.
- FR-ONB-003: Phân công nhiệm vụ tiếp nhận.
- FR-ONB-004: Theo dõi tiến độ tiếp nhận.
- FR-ONB-005: Quản lý cấp phát trang thiết bị ban đầu.
- FR-ONB-006: Quản lý quy trình nghỉ việc.
- FR-ONB-007: Quản lý bàn giao công việc.
- FR-ONB-008: Theo dõi thu hồi tài sản và quyền truy cập.
- FR-ONB-009: Hoàn tất quy trình thôi việc.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-ONB-001 | Hệ thống phải hỗ trợ quản lý quy trình tiếp nhận nhân viên mới. | HR Staff | Ứng viên trúng tuyển từ REC | Khởi tạo quy trình Onboarding với ngày bắt đầu làm việc. | BR-ONB-001; BR-ONB-AUTH-001 | AC-ONB-001 | Confirmed | Should Have |
| FR-ONB-002 | Hệ thống phải hỗ trợ tạo checklist tiếp nhận. | HR Staff | Mẫu checklist chuẩn theo vị trí/phòng ban | Checklist gồm 3 nhóm: Hồ sơ HR, Công cụ IT, Hội nhập bộ phận. | BR-ONB-001 | AC-ONB-002 | Confirmed | Should Have |
| FR-ONB-003 | Hệ thống phải hỗ trợ phân công nhiệm vụ tiếp nhận. | HR Staff | Đầu việc, người phụ trách (HR, IT, Manager), thời hạn | Nhiệm vụ xuất hiện trong danh sách công việc của từng người. | BR-ONB-001 | AC-ONB-003 | Confirmed | Should Have |
| FR-ONB-004 | Hệ thống phải hỗ trợ theo dõi tiến độ tiếp nhận. | HR Staff; Manager | ID quy trình Onboarding | Thanh tiến độ hiển thị % hoàn thành nhiệm vụ theo thời gian thực. | BR-ONB-001 | AC-ONB-004 | Confirmed | Should Have |
| FR-ONB-005 | Hệ thống phải hỗ trợ quản lý cấp phát trang thiết bị ban đầu. | IT Admin; Hành chính | Danh mục thiết bị (Laptop, Thẻ, Màn hình), Seri | Bản ghi bàn giao thiết bị được tạo và nhân viên ký nhận. | BR-ONB-001 | AC-ONB-005 | Confirmed | Should Have |
| FR-ONB-006 | Hệ thống phải hỗ trợ quản lý quy trình nghỉ việc. | HR Staff; Ban Giám Đốc | Đơn xin thôi việc hoặc Quyết định chấm dứt | Khởi tạo quy trình Offboarding, chốt Ngày làm việc cuối cùng. | BR-ONB-002 | AC-ONB-006 | Confirmed | Should Have |
| FR-ONB-007 | Hệ thống phải hỗ trợ quản lý bàn giao công việc. | Employee; Manager | Danh mục đầu việc, tài liệu, dự án bàn giao | Manager ký điện tử xác nhận hoàn thành bàn giao công việc. | BR-ONB-002; BR-ONB-AUTH-001 | AC-ONB-007 | Confirmed | Should Have |
| FR-ONB-008 | Hệ thống phải hỗ trợ theo dõi thu hồi tài sản và quyền truy cập. | IT Admin; Hành chính | Danh mục tài sản thu hồi, tình trạng thiết bị | Xác nhận đã thu hồi tài sản; tài khoản khóa lúc 23:59:59. | BR-ONB-002 | AC-ONB-008 | Confirmed | Should Have |
| FR-ONB-009 | Hệ thống phải hỗ trợ hoàn tất quy trình thôi việc. | HR Staff | Biên bản bàn giao 4 bên đã đủ chữ ký | Chuyển trạng thái hồ sơ sang `Terminated`, lưu trữ an toàn. | BR-ONB-002 | AC-ONB-009 | Confirmed | Should Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Thông tin ứng viên trúng tuyển, Checklist tiếp nhận, Biên bản bàn giao tài sản, Quyết định thôi việc, Ngày làm việc cuối cùng.
- **Output:** Bảng theo dõi tiến độ Onboarding/Offboarding, Tài khoản người dùng kích hoạt/vô hiệu hóa, Hồ sơ nhân viên cập nhật `Active` hoặc `Terminated`.
- **Validation:**
  - Chỉ chuyển nhân viên sang `Active` khi checklist Onboarding đạt 100%.
  - Chỉ hoàn tất đóng Offboarding khi 100% tài sản được thu hồi và các bên liên quan đã ký duyệt.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Onboarding & Offboarding](../business-rule/onboarding-offboarding.md):
  - **BR-ONB-001:** Kích hoạt tự động từ `REC`; hoàn tất 100% checklist mới chuyển `Active`; thông báo đánh giá thử việc trước 07 ngày làm việc (`PD-021`).
  - **BR-ONB-002:** Chốt Ngày làm việc cuối cùng; tự động khóa tài khoản lúc 23:59:59 của ngày làm việc cuối; bồi hoàn tài sản mất mát khấu trừ vào bảng lương tháng cuối; lưu trữ an toàn hồ sơ thôi việc (`PD-022, PD-031, PD-038`).
  - **BR-ONB-AUTH-001:** Manager ký bàn giao công việc phòng mình; IT Admin phụ trách thiết bị và tài khoản; HR điều phối chung.

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Nhân viên không đạt thử việc:** Đóng quy trình Onboarding và chuyển thẳng sang quy trình kết thúc thử việc, không chuyển trạng thái thành `Active`.
2. **Nghỉ việc đột xuất không bàn giao (Bỏ việc):** Hệ thống cho phép HR Staff và IT Admin thực hiện cưỡng chế khóa tài khoản ngay lập tức và ghi nhận lý do vi phạm hợp đồng vào hồ sơ.
3. **Mất thiết bị công ty:** Hành chính tạo biên bản đền bù; số tiền được tự động đối trừ vào bảng quyết toán lương tháng cuối cùng.

## Acceptance Criteria

- **AC-ONB-001 → FR-ONB-001:** Given ứng viên trúng tuyển từ REC; Then quy trình Onboarding tự động sinh ra kèm ngày dự kiến nhận việc.
- **AC-ONB-002 → FR-ONB-002:** Given vị trí Lập trình viên mới; Then hệ thống gán checklist gồm: Máy tính, Cài đặt môi trường, Ký HĐLĐ, Đào tạo nội quy.
- **AC-ONB-003 → FR-ONB-003:** Given nhiệm vụ cấp laptop; Then IT Admin nhận được thông báo công việc kèm thời hạn xử lý.
- **AC-ONB-004 → FR-ONB-004:** Given các bên tick hoàn thành các mục; Then tiến độ hiển thị đúng tỷ lệ % theo thời gian thực.
- **AC-ONB-005 → FR-ONB-005:** Given IT bàn giao laptop; When nhân viên ký nhận trên hệ thống; Then trạng thái thiết bị chuyển sang "Đã cấp phát".
- **AC-ONB-006 → FR-ONB-006:** Given quyết định nghỉ việc ngày 30/11; When HR nhập hệ thống; Then quy trình Offboarding được tạo với Last Working Day là 30/11.
- **AC-ONB-007 → FR-ONB-007:** Given Manager ký biên bản bàn giao công việc; Then mục công việc được đánh dấu hoàn thành.
- **AC-ONB-008 → FR-ONB-008:** Given đến 23:59:59 của ngày 30/11; Then hệ thống tự động khóa tài khoản người dùng, thu hồi toàn bộ token đăng nhập.
- **AC-ONB-009 → FR-ONB-009:** Given 100% mục offboarding đã xong; When HR nhấn "Đóng quy trình"; Then trạng thái nhân viên chuyển thành `Terminated`.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Tuyển dụng (`REC`): Cung cấp nguồn ứng viên trúng tuyển (`PD-020`).
- Phân hệ Nhân viên (`EMP`): Cập nhật trạng thái vòng đời nhân sự (`Probation` -> `Active` -> `Terminated`).
- Phân hệ Quản trị hệ thống (`SYS`): Thực thi cấp mới và khóa tài khoản người dùng.
- Phân hệ Lương (`PAY`): Thực hiện quyết toán lương và đối trừ công nợ/thiết bị tháng cuối.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc tiếp nhận và thôi việc đã được chốt tại PD-021, PD-022.
