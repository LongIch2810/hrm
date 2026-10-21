# 6.1. Employee Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý toàn diện hồ sơ, thông tin nhân viên, trạng thái làm việc, tài liệu và lịch sử công tác trong suốt vòng đời làm việc tại doanh nghiệp.

## Objectives

- Số hóa và chuẩn hóa 100% hồ sơ nhân viên trong doanh nghiệp SME (50 - 300 nhân sự).
- Đảm bảo tính nhất quán, phân quyền chặt chẽ và phục vụ làm nguồn dữ liệu gốc (Master Data) cho các phân hệ khác.

## Actors

- **HR Staff:** Toàn quyền thêm mới, cập nhật thông tin nghiệp vụ, quản lý trạng thái, lịch sử công tác và tài liệu hồ sơ.
- **Department Manager:** Xem danh sách và thông tin công tác của nhân viên thuộc đúng phòng ban mình trực tiếp quản lý.
- **Employee:** Xem thông tin cá nhân và tự cập nhật thông tin liên hệ (SĐT, địa chỉ cư trú, người liên hệ khẩn cấp, avatar).
- **System Administrator:** Quản trị tài khoản đăng nhập gắn liền với nhân viên.

## Feature List

- FR-EMP-001: Quản lý hồ sơ nhân viên.
- FR-EMP-002: Thêm nhân viên.
- FR-EMP-003: Xem danh sách và chi tiết nhân viên.
- FR-EMP-004: Cập nhật thông tin nhân viên.
- FR-EMP-005: Quản lý trạng thái làm việc.
- FR-EMP-006: Quản lý thông tin liên hệ.
- FR-EMP-007: Quản lý lịch sử công tác.
- FR-EMP-008: Quản lý tài liệu nhân viên.
- FR-EMP-009: Tìm kiếm, lọc và sắp xếp danh sách nhân viên.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-EMP-001 | Hệ thống phải hỗ trợ quản lý hồ sơ nhân viên. | HR Staff | Hồ sơ nhân viên | Hồ sơ được quản lý và truy xuất theo đúng phân quyền. | BR-EMP-001; BR-EMP-002; BR-AUTH-001 | AC-EMP-001 | Confirmed | Must Have |
| FR-EMP-002 | Hệ thống phải hỗ trợ thêm nhân viên. | HR Staff | Thông tin nhân viên mới | Mã NV tự sinh tăng dần (EMP0001...), hồ sơ lưu thành công. | BR-EMP-001; BR-AUTH-001 | AC-EMP-002 | Confirmed | Must Have |
| FR-EMP-003 | Hệ thống phải hỗ trợ xem danh sách và chi tiết nhân viên. | HR Staff; Manager (phòng mình); Employee (hồ sơ mình) | Phạm vi và ID nhân viên | Danh sách và chi tiết hiển thị đúng phạm vi quyền hạn. | BR-AUTH-001 | AC-EMP-003 | Confirmed | Must Have |
| FR-EMP-004 | Hệ thống phải hỗ trợ cập nhật thông tin nhân viên. | HR Staff; Employee (thông tin liên hệ) | Thông tin cập nhật | Thông tin được lưu vết, ghi nhận audit log. | BR-EMP-001; BR-AUTH-001 | AC-EMP-004 | Confirmed | Must Have |
| FR-EMP-005 | Hệ thống phải hỗ trợ quản lý trạng thái làm việc. | HR Staff | Trạng thái (Probation, Active, OnLeave, Terminated) | Trạng thái cập nhật, đồng bộ phân quyền tài khoản SYS. | BR-EMP-002; BR-AUTH-001 | AC-EMP-005 | Confirmed | Must Have |
| FR-EMP-006 | Hệ thống phải hỗ trợ quản lý thông tin liên hệ. | HR Staff; Employee | SĐT, email cá nhân, địa chỉ, liên hệ khẩn cấp | Thông tin liên hệ cập nhật chính xác. | BR-EMP-001; BR-AUTH-001 | AC-EMP-006 | Confirmed | Must Have |
| FR-EMP-007 | Hệ thống phải hỗ trợ quản lý lịch sử công tác. | HR Staff | Thay đổi chức vụ, phòng ban, ngày hiệu lực | Ghi nhận bản ghi lịch sử công tác bất biến. | BR-EMP-002 | AC-EMP-007 | Confirmed | Must Have |
| FR-EMP-008 | Hệ thống phải hỗ trợ quản lý tài liệu nhân viên. | HR Staff; Employee (xem tài liệu mình) | File đính kèm (PDF/PNG/JPG <= 5MB) | Tài liệu lưu trữ an toàn, truy xuất đúng quyền. | BR-EMP-002 | AC-EMP-008 | Confirmed | Must Have |
| FR-EMP-009 | Hệ thống phải hỗ trợ tìm kiếm, lọc và sắp xếp danh sách nhân viên. | HR Staff; Manager (phòng mình) | Từ khóa, phòng ban, trạng thái, chức vụ | Trả về danh sách phân trang trong phạm vi quản lý. | BR-AUTH-001 | AC-EMP-009 | Confirmed | Must Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Trường thông tin bắt buộc:** Mã NV (tự sinh), Họ và tên, Ngày sinh, Giới tính, Số định danh (CCCD/Hộ chiếu), Email công ty, Phòng ban, Chức vụ, Ngày vào làm.
- **Validation:**
  - CCCD/Hộ chiếu: Duy nhất, không được trùng lặp.
  - Email: Định dạng email hợp lệ, duy nhất trong hệ thống.
  - Số điện thoại: 10 chữ số chuẩn Việt Nam.
  - Tệp đính kèm: Định dạng PDF, PNG, JPG; dung lượng tối đa 5MB/tệp.
- **Xử lý lỗi:** Trả về mã lỗi chuẩn `DUPLICATE_IDENTIFIER`, `VALIDATION_FAILED`, `FILE_SIZE_EXCEEDED` kèm thông báo tiếng Việt.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Employee Management](../business-rule/employee-management.md):
  - **BR-EMP-001:** Dữ liệu và định danh hồ sơ nhân viên (Mã tự sinh `EMP0001`...).
  - **BR-EMP-002:** Trạng thái làm việc 4 bước chuẩn (`Probation` -> `Active` -> `OnLeave` -> `Terminated`); lưu trữ hồ sơ thôi việc tối thiểu 5 năm (Soft-delete).
  - **BR-AUTH-001:** Phân quyền ma trận nhân sự (Manager chỉ xem phòng trực tiếp; Employee chỉ sửa thông tin liên hệ).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Trùng CCCD hoặc Email:** Hệ thống chặn lưu, giữ lại dữ liệu form và hiển thị thông báo lỗi cụ thể.
2. **Cập nhật đồng thời (Concurrent Update):** Sử dụng cơ chế Version column (Optimistic Locking), thông báo người dùng tải lại khi có xung đột.
3. **Tài liệu không hợp lệ hoặc quá dung lượng:** Chặn ở client và validate ở server, trả về lỗi `INVALID_FILE_TYPE` hoặc `FILE_TOO_LARGE`.
4. **Nhân viên chuyển trạng thái Terminated:** Tự động kích hoạt vô hiệu hóa tài khoản và checklist Offboarding.

## Acceptance Criteria

- **AC-EMP-001 → FR-EMP-001:** Given HR Staff đã đăng nhập; When truy cập hồ sơ nhân viên; Then hiển thị đầy đủ thông tin cá nhân, công tác, hợp đồng theo thẩm quyền.
- **AC-EMP-002 → FR-EMP-002:** Given thông tin nhân viên mới hợp lệ; When HR Staff tạo mới; Then hệ thống sinh mã `EMPxxxx` tự động và lưu thành công.
- **AC-EMP-003 → FR-EMP-003:** Given Manager đăng nhập; When xem danh sách nhân viên; Then chỉ hiển thị các nhân viên thuộc phòng ban mình trực tiếp quản lý.
- **AC-EMP-004 → FR-EMP-004:** Given Employee đăng nhập; When chỉnh sửa SĐT/địa chỉ; Then thông tin được cập nhật và ghi nhận audit log.
- **AC-EMP-005 → FR-EMP-005:** Given HR Staff thay đổi trạng thái nhân viên; When xác nhận thay đổi; Then trạng thái cập nhật và đồng bộ quyền tài khoản tương ứng.
- **AC-EMP-006 → FR-EMP-006:** Given thông tin liên hệ cập nhật; When lưu; Then dữ liệu mới hiển thị chính xác ở lần truy vấn sau.
- **AC-EMP-007 → FR-EMP-007:** Given điều chuyển phòng ban hoặc thăng chức; When HR lưu; Then một bản ghi lịch sử công tác mới được thêm với ngày hiệu lực.
- **AC-EMP-008 → FR-EMP-008:** Given file scan hợp đồng hợp lệ <= 5MB; When HR upload; Then file được lưu vào private storage an toàn.
- **AC-EMP-009 → FR-EMP-009:** Given bộ lọc theo phòng ban và trạng thái; When tìm kiếm; Then danh sách trả về chính xác trong thời gian <= 500ms.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Phòng ban (`DEPT`): Cung cấp danh mục phòng ban và cấp bậc tổ chức.
- Phân hệ Hợp đồng (`CON`): Liên kết hợp đồng lao động đang hiệu lực.
- Phân hệ Quản trị hệ thống (`SYS`): Đồng bộ tài khoản người dùng và vai trò phân quyền.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các câu hỏi về hồ sơ nhân viên đã được giải quyết tại các quyết định PD-008, PD-009, PD-010, PD-011.
