# 6.12. System Administration

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý hạ tầng định danh, xác thực (Authentication), phân quyền theo vai trò (RBAC), cấu hình hệ thống, thông báo và nhật ký kiểm toán (Audit Logs).

## Objectives

- Đảm bảo an ninh, tính toàn vẹn và bảo mật dữ liệu tuyệt đối cho toàn bộ hệ thống HRM.
- Quản lý tập trung tài khoản, vai trò phân quyền và truy vết mọi hoạt động quản trị bất biến.

## Actors

- **System Administrator:** Toàn quyền quản trị tài khoản người dùng, vai trò, cấu hình hệ thống và giám sát audit logs.
- **Tất cả các vai trò (Admin, HR Staff, Manager, Employee):** Xác thực danh tính khi đăng nhập và nhận thông báo hệ thống.

## Feature List

- FR-SYS-001: Quản lý tài khoản người dùng.
- FR-SYS-002: Authentication.
- FR-SYS-003: Authorization.
- FR-SYS-004: Role-Based Access Control (RBAC).
- FR-SYS-005: Quản lý vai trò.
- FR-SYS-006: Quản lý quyền truy cập.
- FR-SYS-007: Cấu hình hệ thống.
- FR-SYS-008: Quản lý thông báo.
- FR-SYS-009: Quản lý audit logs.
- FR-SYS-010: Theo dõi các hoạt động quản trị.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-SYS-001 | Hệ thống phải hỗ trợ quản lý tài khoản người dùng. | System Administrator | Email, mật khẩu ban đầu, vai trò | Tạo, kích hoạt, khóa hoặc đặt lại mật khẩu tài khoản. | BR-SYS-001; BR-SYS-002 | AC-SYS-001 | Confirmed | Must Have |
| FR-SYS-002 | Hệ thống phải hỗ trợ authentication. | Tất cả người dùng | Email, mật khẩu | Đăng nhập thành công, cấp phát JWT & Refresh token cookie. | BR-SYS-001 | AC-SYS-002 | Confirmed | Must Have |
| FR-SYS-003 | Hệ thống phải hỗ trợ authorization. | Hệ thống; System Administrator | Request, Token, Resource | Trả 403 khi thiếu quyền thao tác hoặc Manager xem nhân viên ngoài phòng ban; trả 404 với tài nguyên khác ngoài phạm vi. | BR-SYS-002; BR-SYS-AUTH-001 | AC-SYS-003 | Confirmed | Must Have |
| FR-SYS-004 | Hệ thống phải hỗ trợ role-Based Access Control (RBAC). | System Administrator | 4 vai trò chuẩn (Admin, HR, Manager, Employee) | Áp dụng đúng Authorization Matrix đã phê duyệt. | BR-SYS-002 | AC-SYS-004 | Confirmed | Must Have |
| FR-SYS-005 | Hệ thống phải hỗ trợ quản lý vai trò. | System Administrator | Danh mục vai trò, mô tả | Danh mục vai trò được duy trì và gán cho người dùng. | BR-SYS-002 | AC-SYS-005 | Confirmed | Must Have |
| FR-SYS-006 | Hệ thống phải hỗ trợ quản lý quyền truy cập. | System Administrator | Permission key, Module, Thao tác | Gán quyền nghiệp vụ theo nhiệm vụ cho tài khoản trong phạm vi tài nguyên được duyệt. | BR-SYS-002 | AC-SYS-006 | Confirmed | Must Have |
| FR-SYS-007 | Hệ thống phải hỗ trợ cấu hình hệ thống. | System Administrator | Khóa cấu hình, giá trị (Giờ ca, Ngưỡng ân hạn...) | Cấu hình lưu trữ DB, áp dụng ngay trong toàn hệ thống. | BR-SYS-001 | AC-SYS-007 | Confirmed | Must Have |
| FR-SYS-008 | Hệ thống phải hỗ trợ quản lý thông báo. | Hệ thống; Admin; HR Staff | Tiêu đề, nội dung, đối tượng nhận | Gửi thông báo In-App (chuông) và Email tới đúng đối tượng. | BR-SYS-001 | AC-SYS-008 | Confirmed | Must Have |
| FR-SYS-009 | Hệ thống phải hỗ trợ quản lý audit logs. | System Administrator | Sự kiện hệ thống (Đăng nhập, Sửa, Xóa, Cấp quyền) | Ghi nhận nhật ký kiểm toán bất biến (Append-only). | BR-SYS-002 | AC-SYS-009 | Confirmed | Must Have |
| FR-SYS-010 | Hệ thống phải hỗ trợ theo dõi các hoạt động quản trị. | System Administrator | Bộ lọc sự kiện, thời gian, người thực hiện | Truy xuất và xem chi tiết nhật ký thao tác quản trị. | BR-SYS-002 | AC-SYS-010 | Confirmed | Must Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Email công ty, Mật khẩu (tối thiểu 15 ký tự, tối đa 72 byte UTF-8; chấp nhận passphrase và khoảng trắng), Mã vai trò, Cấu hình hệ thống key-value.
- **Output:** JWT Access Token (15 phút, bộ nhớ ứng dụng), JWT Refresh Token (7 ngày, HttpOnly cookie; `Secure` trên HTTPS), Bản ghi nhật ký kiểm toán (Actor, IP, Action, Timestamp, Status).
- **Validation:**
  - Khóa tài khoản 15 phút nếu nhập sai mật khẩu 5 lần liên tiếp.
  - Băm mật khẩu bằng bcrypt trước khi lưu trữ; không bao giờ trả mật khẩu trong response DTO.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — System Administration](../business-rule/system-administration.md):
  - **BR-SYS-001:** Xác thực Email + Mật khẩu an toàn; bắt buộc đổi mật khẩu lần đầu đăng nhập; access token JWT lưu trong bộ nhớ ứng dụng, refresh token JWT lưu trong HttpOnly cookie; tự động thu hồi session khi tài khoản bị khóa (`PD-029`).
  - **BR-SYS-002:** RBAC chuẩn 4 vai trò nền (`Admin`, `HR Staff`, `Manager`, `Employee`) và quyền theo nhiệm vụ; Audit log bất biến (Append-only), lưu trữ tối thiểu 2 năm (`PD-031`).
  - **BR-SYS-AUTH-001:** Admin không được xem chi tiết lương hoặc đánh giá nhân viên nếu không có quyền nghiệp vụ tương ứng (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Tấn công brute-force mật khẩu:** Tự động khóa đăng nhập tài khoản 15 phút sau 5 lần nhập sai liên tiếp.
2. **Cố tình chỉnh sửa hoặc xóa Audit Log:** Database cấm quyền `UPDATE` và `DELETE` trên bảng `audit_logs` ở cấp database role.
3. **Mất phiên hoặc Token hết hạn:** Refresh Token tự động cấp Access Token mới ngầm dưới nền; nếu Refresh Token hết hạn thì chuyển hướng người dùng về trang đăng nhập.

## Acceptance Criteria

- **AC-SYS-001 → FR-SYS-001:** Given Admin tạo tài khoản mới; When lưu thành công; Then hệ thống gửi email kích hoạt kèm hướng dẫn đặt mật khẩu lần đầu.
- **AC-SYS-002 → FR-SYS-002:** Given thông tin đăng nhập đúng; When đăng nhập; Then cấp Cookie an toàn và điều hướng đến Dashboard tương ứng vai trò.
- **AC-SYS-003 → FR-SYS-003:** Given Employee cố tình gọi thao tác quản lý lương không có quyền; Then hệ thống từ chối bằng `403 INSUFFICIENT_PERMISSIONS`. URL cụ thể chờ contract module.
- **AC-SYS-004 → FR-SYS-004:** Given người dùng có vai trò Manager; Then chỉ truy cập được các chức năng duyệt công/phép của phòng ban mình.
- **AC-SYS-005 → FR-SYS-005:** Given danh mục vai trò; Then hiển thị đầy đủ 4 vai trò chuẩn của hệ thống.
- **AC-SYS-006 → FR-SYS-006:** Given Admin cấp thêm quyền cho HR Staff; Then quyền có hiệu lực ngay trong phiên làm việc tiếp theo.
- **AC-SYS-007 → FR-SYS-007:** Given cấu hình giờ ân hạn đổi thành 20 phút; Then hệ thống áp dụng ngay quy tắc tính muộn mới cho các lần chấm công tiếp theo.
- **AC-SYS-008 → FR-SYS-008:** Given đơn nghỉ phép được duyệt; Then hệ thống bắn thông báo chuông In-App tức thời tới nhân viên.
- **AC-SYS-009 → FR-SYS-009:** Given HR Staff cập nhật hồ sơ nhân viên; Then bảng `audit_logs` ghi nhận đầy đủ hành động `UPDATE_EMPLOYEE`.
- **AC-SYS-010 → FR-SYS-010:** Given Admin truy cập màn hình Audit; Then danh sách nhật ký hiển thị phân trang và lọc được theo ngày/người thực hiện.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phục vụ nền tảng xác thực và phân quyền cốt lõi cho toàn bộ 11 phân hệ còn lại của hệ thống HRM.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc quản trị hệ thống và bảo mật đã được chốt tại PD-008, PD-029, PD-030, PD-031, PD-032.
