# 6.9. Contract Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý toàn diện vòng đời hợp đồng lao động, phụ lục hợp đồng, điều khoản đãi ngộ, cảnh báo gia hạn và lưu trữ tài liệu hợp đồng ký kết.

## Objectives

- Đảm bảo tính tuân thủ pháp luật lao động Việt Nam về loại hình và thời hạn hợp đồng.
- Cảnh báo chủ động thời hạn hợp đồng, ngăn ngừa rủi ro pháp lý và tranh chấp lao động.

## Actors

- **HR Staff:** Soạn thảo, cập nhật hợp đồng, phụ lục, tải file scan hợp đồng và theo dõi tiến độ ký kết/gia hạn.
- **Department Manager:** Theo dõi thời hạn hợp đồng của nhân viên trực thuộc phòng ban mình để lập kế hoạch nhân sự.
- **Employee:** Xem hợp đồng và các phụ lục hợp đồng lao động của chính mình (Read-only).
- **Ban Giám Đốc:** Phê duyệt các điều khoản hợp đồng đặc biệt hoặc quyết định gia hạn cấp quản lý.

## Feature List

- FR-CON-001: Quản lý hợp đồng lao động.
- FR-CON-002: Quản lý loại hợp đồng.
- FR-CON-003: Quản lý thời hạn hợp đồng.
- FR-CON-004: Quản lý phụ lục hợp đồng.
- FR-CON-005: Cảnh báo hợp đồng sắp hết hạn.
- FR-CON-006: Gia hạn hợp đồng.
- FR-CON-007: Lưu trữ tài liệu hợp đồng.
- FR-CON-008: Xem lịch sử hợp đồng.
- FR-CON-009: Quản lý trạng thái hợp đồng.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-CON-001 | Hệ thống phải hỗ trợ quản lý hợp đồng lao động. | HR Staff | Thông tin HĐLĐ (Số HĐ, Ngày ký, Lương, Vị trí) | Bản ghi hợp đồng được tạo và gắn với hồ sơ nhân viên. | BR-CON-001; BR-AUTH-001 | AC-CON-001 | Confirmed | Should Have |
| FR-CON-002 | Hệ thống phải hỗ trợ quản lý loại hợp đồng. | HR Staff | 3 loại chuẩn: Thử việc, Có thời hạn, Không thời hạn | Danh mục loại hợp đồng tuân thủ Bộ luật Lao động. | BR-CON-001 | AC-CON-002 | Confirmed | Should Have |
| FR-CON-003 | Hệ thống phải hỗ trợ quản lý thời hạn hợp đồng. | HR Staff | Ngày bắt đầu, Ngày kết thúc hiệu lực | Thời hạn hợp đồng được ghi nhận và theo dõi chính xác. | BR-CON-001 | AC-CON-003 | Confirmed | Should Have |
| FR-CON-004 | Hệ thống phải hỗ trợ quản lý phụ lục hợp đồng. | HR Staff | Số phụ lục, Ngày hiệu lực, Nội dung điều chỉnh | Phụ lục được liên kết chặt chẽ với hợp đồng chính. | BR-CON-001 | AC-CON-004 | Confirmed | Should Have |
| FR-CON-005 | Hệ thống phải hỗ trợ cảnh báo hợp đồng sắp hết hạn. | Hệ thống tự động | Hợp đồng còn hiệu lực <= 30 ngày | Bắn thông báo cảnh báo In-App và Email cho HR và Manager. | BR-CON-002 | AC-CON-005 | Confirmed | Should Have |
| FR-CON-006 | Hệ thống phải hỗ trợ gia hạn hợp đồng. | HR Staff | Hợp đồng mới hoặc quyết định gia hạn | Tạo hợp đồng mới tiếp nối, hợp đồng cũ chuyển `Expired`. | BR-CON-002 | AC-CON-006 | Confirmed | Should Have |
| FR-CON-007 | Hệ thống phải hỗ trợ lưu trữ tài liệu hợp đồng. | HR Staff | File scan PDF hợp đồng có chữ ký/dấu (<= 5MB) | Tài liệu lưu an toàn trong private storage. | BR-CON-002 | AC-CON-007 | Confirmed | Should Have |
| FR-CON-008 | Hệ thống phải hỗ trợ xem lịch sử hợp đồng. | HR Staff; Employee (cá nhân) | ID nhân viên | Hiển thị toàn bộ các đời hợp đồng từ khi vào làm việc. | BR-AUTH-001 | AC-CON-008 | Confirmed | Should Have |
| FR-CON-009 | Hệ thống phải hỗ trợ quản lý trạng thái hợp đồng. | HR Staff | Trạng thái (`Draft`, `Active`, `Expired`, `Terminated`) | Trạng thái hợp đồng phản ánh chính xác hiệu lực pháp lý. | BR-CON-001; BR-CON-002 | AC-CON-009 | Confirmed | Should Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Số hợp đồng (duy nhất), ID nhân viên, Loại hợp đồng, Ngày ký, Ngày bắt đầu, Ngày kết thúc, Mức lương cơ bản, Phụ cấp, File scan PDF.
- **Output:** Hồ sơ hợp đồng điện tử, Cảnh báo hết hạn (30 ngày), Lịch sử hợp đồng nhân viên.
- **Validation:**
  - Số hợp đồng không được trùng lặp.
  - Mỗi nhân viên chỉ có duy nhất 1 hợp đồng ở trạng thái `Active` tại một thời điểm.
  - Hợp đồng không thời hạn thì trường Ngày kết thúc để trống (`null`).

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Contract Management](../business-rule/contract-management.md):
  - **BR-CON-001:** 3 loại hợp đồng chuẩn; chỉ 1 hợp đồng `Active` tại một thời điểm; không giới hạn số lượng phụ lục nhưng phụ lục không được làm đổi loại hợp đồng trái luật (`PD-025`).
  - **BR-CON-002:** Tự động cảnh báo trước 30 ngày; lưu trữ file scan PDF có chữ ký/dấu; không dùng USB token ký số phần cứng (`PD-006, PD-025`).
  - **BR-AUTH-001:** Employee xem hợp đồng cá nhân; HR Staff toàn quyền quản trị (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Hợp đồng hết hạn mà chưa có quyết định mới:** Hệ thống hiển thị cờ cảnh báo đỏ `CONTRACT_OVERDUE` trên dashboard của HR để xử lý tái ký hoặc thanh lý.
2. **Ký trùng thời gian hợp đồng:** Hệ thống chặn lưu và báo lỗi `CONTRACT_OVERLAP_DETECTED` nếu thời gian hợp đồng mới giao thoa với hợp đồng đang `Active`.
3. **Thanh lý hợp đồng trước hạn:** Gắn liền với quy trình thôi việc (`Offboarding`), chuyển trạng thái hợp đồng thành `Terminated` kèm số quyết định thôi việc.

## Acceptance Criteria

- **AC-CON-001 → FR-CON-001:** Given HR tạo hợp đồng mới; When nhập đầy đủ thông tin hợp lệ; Then hợp đồng được tạo và liên kết đúng mã nhân viên.
- **AC-CON-002 → FR-CON-002:** Given danh mục loại hợp đồng; Then chỉ cho phép chọn 1 trong 3 loại chuẩn: Thử việc, Xác định thời hạn, Không xác định thời hạn.
- **AC-CON-003 → FR-CON-003:** Given hợp đồng xác định thời hạn 12 tháng; When nhập ngày bắt đầu 01/01/2026; Then ngày kết thúc tự động gợi ý 31/12/2026.
- **AC-CON-004 → FR-CON-004:** Given phụ lục điều chỉnh lương; When tạo mới; Then phụ lục gắn đúng số HĐ chính và cập nhật mức lương mới.
- **AC-CON-005 → FR-CON-005:** Given hợp đồng còn 30 ngày hết hạn; Then xuất hiện cảnh báo trên chuông thông báo của HR Staff.
- **AC-CON-006 → FR-CON-006:** Given tạo hợp đồng mới gia hạn; When kích hoạt; Then hợp đồng cũ tự động chuyển sang `Expired`.
- **AC-CON-007 → FR-CON-007:** Given file PDF hợp đồng scan 3MB; When HR tải lên; Then file được lưu trữ và cho phép xem lại trực tiếp trên Web.
- **AC-CON-008 → FR-CON-008:** Given nhân viên xem mục Hợp đồng; Then hiển thị danh sách đầy đủ tất cả các hợp đồng từng ký kết.
- **AC-CON-009 → FR-CON-009:** Given trạng thái hợp đồng thay đổi; Then hệ thống ghi nhận thời điểm và người thực hiện vào audit log.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Nhân viên (`EMP`): Cung cấp thông tin nhân sự để tạo và lưu trữ hợp đồng.
- Phân hệ Lương (`PAY`): Lấy mức lương cơ bản và phụ cấp đóng bảo hiểm từ hợp đồng `Active`.
- Phân hệ Onboarding (`ONB`): Khởi tạo hợp đồng thử việc khi tiếp nhận nhân viên mới.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc hợp đồng lao động đã được chốt tại PD-006, PD-025.
