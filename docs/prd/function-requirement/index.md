# 6. Functional Requirements Index

- **Parent Spec:** docs/PRD.md#6-functional-requirements
- **Scope:** 109 yêu cầu chức năng (FR) chi tiết cho 12 module HRM.
- **Trạng thái:** Confirmed — Approved by Product Owner. Phân kỳ triển khai: Phase 1 (MVP: SYS, EMP, DEPT, ATT, LEAVE), Phase 2 (PAY, CON, REC, ONB), Phase 3 (PERF, TRAIN, REP).

## Danh mục Module Yêu cầu chức năng

| STT | Module | Mã FR | File đặc tả chức năng |
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

## Lưu ý cho AI Agents

- Mỗi AC (Acceptance Criteria) là tiêu chí kiểm chứng năng lực đã yêu cầu, với điều kiện dữ liệu, actor và quy tắc liên quan được PO xác nhận.
- Inputs & Outputs trong từng FR chỉ là nhóm thông tin nghiệp vụ, không phải database schema.
