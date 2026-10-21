# 7. User Stories & Use Cases Index

- **Parent Spec:** docs/PRD.md#7-user-stories--use-cases
- **Scope:** 109 User Stories và Use Cases chi tiết cho 12 module HRM.
- **Traceability:** Ánh xạ 1-1 với 109 FR trong `docs/prd/function-requirement/`.
- **Status:** Confirmed — Approved by Product Owner. Toàn bộ kịch bản Use Cases đã được phê duyệt.

## Danh mục Use Cases theo Module

| STT | Module | Mã FR | Tài liệu Use Case chi tiết |
|:---:|---|:---:|---|
| 1 | Employee Management | FR-EMP-001 → 009 | [employee-management.md](employee-management.md) |
| 2 | Department Management | FR-DEPT-001 → 007 | [department-management.md](department-management.md) |
| 3 | Attendance Management | FR-ATT-001 → 010 | [attendance-management.md](attendance-management.md) |
| 4 | Leave Management | FR-LEAVE-001 → 009 | [leave-management.md](leave-management.md) |
| 5 | Payroll Management | FR-PAY-001 → 011 | [payroll-management.md](payroll-management.md) |
| 6 | Recruitment Management | FR-REC-001 → 009 | [recruitment-management.md](recruitment-management.md) |
| 7 | Onboarding & Offboarding | FR-ONB-001 → 009 | [onboarding-offboarding.md](onboarding-offboarding.md) |
| 8 | Performance Management | FR-PERF-001 → 008 | [performance-management.md](performance-management.md) |
| 9 | Contract Management | FR-CON-001 → 009 | [contract-management.md](contract-management.md) |
| 10 | Training Management | FR-TRAIN-001 → 008 | [training-management.md](training-management.md) |
| 11 | Reports & Analytics | FR-REP-001 → 010 | [reports-analytics.md](reports-analytics.md) |
| 12 | System Administration | FR-SYS-001 → 010 | [system-administration.md](system-administration.md) |

## Nguyên tắc áp dụng cho AI Agents

- Tra cứu Use Case theo đúng module đang xử lý để lấy kịch bản kiểm thử và điều kiện ràng buộc.
- Không tự ý thay đổi quyền hạn hoặc tự thêm bước thao tác ngoài phạm vi đặc tả.
- Khi gặp trường hợp ngoại lệ chưa có kịch bản xử lý, đánh dấu `TBD (To Be Determined)` và xin ý kiến PO.
