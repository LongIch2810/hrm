# 6.2. Department Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý cơ cấu tổ chức, phòng ban, chức danh chức vụ, cấp bậc và mối quan hệ phân cấp trong doanh nghiệp.

## Objectives

- Mô hình hóa cơ cấu tổ chức trực quan theo dạng cây phân cấp linh hoạt.
- Làm cơ sở xác định phạm vi quản lý và luồng phê duyệt đơn từ (chấm công, nghỉ phép).

## Actors

- **HR Staff / System Admin:** Toàn quyền tạo lập, chỉnh sửa, tái cấu trúc phòng ban, chức vụ và gán người quản lý.
- **Department Manager:** Xem sơ đồ cơ cấu tổ chức của phòng ban mình và các phòng ban trực thuộc.
- **Employee:** Xem sơ đồ tổ chức công ty dạng cây (Read-only).

## Feature List

- FR-DEPT-001: Quản lý phòng ban.
- FR-DEPT-002: Quản lý chức vụ.
- FR-DEPT-003: Quản lý cấp bậc.
- FR-DEPT-004: Phân công nhân viên vào phòng ban.
- FR-DEPT-005: Gán người quản lý phòng ban.
- FR-DEPT-006: Theo dõi cơ cấu tổ chức.
- FR-DEPT-007: Quản lý mối quan hệ giữa các phòng ban.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-DEPT-001 | Hệ thống phải hỗ trợ quản lý phòng ban. | HR Staff; Admin | Mã phòng ban, tên phòng ban, phòng ban cha | Phòng ban được lưu trữ, mã và tên duy nhất. | BR-DEPT-001; BR-DEPT-AUTH-001 | AC-DEPT-001 | Confirmed | Must Have |
| FR-DEPT-002 | Hệ thống phải hỗ trợ quản lý chức vụ. | HR Staff; Admin | Tên chức vụ, mô tả | Danh mục chức vụ được quản lý chuẩn hóa. | BR-DEPT-001 | AC-DEPT-002 | Confirmed | Must Have |
| FR-DEPT-003 | Hệ thống phải hỗ trợ quản lý cấp bậc. | HR Staff; Admin | Tên cấp bậc, hệ số/mức | Danh mục cấp bậc được quản lý. | BR-DEPT-001 | AC-DEPT-003 | Confirmed | Must Have |
| FR-DEPT-004 | Hệ thống phải hỗ trợ phân công nhân viên vào phòng ban. | HR Staff | ID nhân viên, ID phòng ban | Nhân viên được gắn vào đúng phòng ban chính. | BR-DEPT-002 | AC-DEPT-004 | Confirmed | Must Have |
| FR-DEPT-005 | Hệ thống phải hỗ trợ gán người quản lý phòng ban. | HR Staff | ID phòng ban, ID nhân viên quản lý | Gán Trưởng phòng hoặc Phó phòng thành công. | BR-DEPT-002 | AC-DEPT-005 | Confirmed | Must Have |
| FR-DEPT-006 | Hệ thống phải hỗ trợ theo dõi cơ cấu tổ chức. | Tất cả vai trò | Bộ lọc phòng ban | Sơ đồ cây phân cấp tổ chức hiển thị trực quan. | BR-DEPT-001 | AC-DEPT-006 | Confirmed | Must Have |
| FR-DEPT-007 | Hệ thống phải hỗ trợ quản lý mối quan hệ giữa các phòng ban. | HR Staff; Admin | Phòng ban con, phòng ban cha mới | Cập nhật quan hệ phân cấp, ngăn chặn vòng lặp. | BR-DEPT-001 | AC-DEPT-007 | Confirmed | Must Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Trường bắt buộc:** Mã phòng ban (duy nhất, viết hoa không dấu), Tên phòng ban (duy nhất), Phòng ban cha (nullable nếu là Root), Trưởng phòng (Head ID).
- **Validation:** Không cho phép tạo phòng ban trùng mã/tên; kiểm tra thuật toán DFS để phát hiện và ngăn chặn vòng lặp cha-con.
- **Xử lý lỗi:** Trả về lỗi chuẩn `DUPLICATE_DEPARTMENT_CODE`, `CIRCULAR_HIERARCHY_DETECTED`.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Department Management](../business-rule/department-management.md):
  - **BR-DEPT-001:** Cây phân cấp đa tầng (Multi-level Tree), cấm quan hệ vòng lặp cha-con; mô hình đơn doanh nghiệp SME (PD-001, PD-012).
  - **BR-DEPT-002:** Mỗi phòng ban có duy nhất 1 Trưởng phòng và tối đa 2 Phó phòng; nhân viên thuộc 1 phòng ban chính; điều chuyển nhân sự trước khi đóng phòng ban.
  - **BR-DEPT-AUTH-001:** Manager chỉ xem phòng trực tiếp; HR/Admin toàn quyền quản lý.

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Tạo vòng lặp quan hệ (Circular Dependency):** Hệ thống chặn ngay lập tức và báo lỗi `CIRCULAR_HIERARCHY_DETECTED`.
2. **Đóng phòng ban đang còn nhân viên:** Hệ thống yêu cầu điều chuyển toàn bộ nhân viên sang phòng ban khác trước khi cho phép đóng.
3. **Trưởng phòng thôi việc:** Hệ thống cảnh báo phòng ban khuyết Trưởng phòng để HR bổ nhiệm thay thế.

## Acceptance Criteria

- **AC-DEPT-001 → FR-DEPT-001:** Given HR Staff; When tạo phòng ban mới với mã và tên hợp lệ; Then phòng ban xuất hiện trong cây cơ cấu tổ chức.
- **AC-DEPT-002 → FR-DEPT-002:** Given chức vụ mới; When HR lưu; Then chức vụ có sẵn trong danh sách chọn của hồ sơ nhân viên.
- **AC-DEPT-003 → FR-DEPT-003:** Given cấp bậc mới; When HR lưu; Then cấp bậc được ghi nhận vào hệ thống.
- **AC-DEPT-004 → FR-DEPT-004:** Given nhân viên và phòng ban đích; When phân công; Then hồ sơ nhân viên cập nhật phòng ban và ghi nhận lịch sử công tác.
- **AC-DEPT-005 → FR-DEPT-005:** Given phòng ban chưa có trưởng phòng; When gán nhân viên làm Head; Then quyền duyệt đơn của nhân viên đó được kích hoạt trong phạm vi phòng ban.
- **AC-DEPT-006 → FR-DEPT-006:** Given người dùng truy cập trang Sơ đồ tổ chức; Then sơ đồ hiển thị đầy đủ các cấp phòng ban và số lượng nhân sự trực thuộc.
- **AC-DEPT-007 → FR-DEPT-007:** Given chỉnh sửa phòng ban cha; When thay đổi hợp lệ; Then cây tổ chức cập nhật lại nhánh tương ứng.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Nhân viên (`EMP`): Cung cấp nhân sự để gán vào phòng ban và chỉ định quản lý.
- Phân hệ Quản trị hệ thống (`SYS`): Xác định phạm vi dữ liệu phân quyền theo phòng ban trực thuộc.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quyết định về cơ cấu tổ chức đã được chốt tại PD-001, PD-008, PD-012.
