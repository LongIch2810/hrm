# 8. Business Rules Index

- **Parent Spec:** docs/PRD.md#8-business-rules
- **Scope:** Quy tắc nghiệp vụ chi tiết cho 12 module và quy tắc phân quyền chung.
- **Status:** Confirmed — Approved by Product Owner. Toàn bộ chính sách và quy tắc nghiệp vụ đã được phê duyệt.

## Danh mục Business Rules theo Module

| STT | Module | Mã quy tắc | File đặc tả chi tiết |
|:---:|---|:---:|---|
| 1 | Employee Management | BR-EMP-001, 002 | [employee-management.md](employee-management.md) |
| 2 | Department Management | BR-DEPT-001, 002 | [department-management.md](department-management.md) |
| 3 | Attendance Management | BR-ATT-001, 002 | [attendance-management.md](attendance-management.md) |
| 4 | Leave Management | BR-LEAVE-001, 002 | [leave-management.md](leave-management.md) |
| 5 | Payroll Management | BR-PAY-001, 002 | [payroll-management.md](payroll-management.md) |
| 6 | Recruitment Management | BR-REC-001, 002 | [recruitment-management.md](recruitment-management.md) |
| 7 | Onboarding & Offboarding | BR-ONB-001, 002 | [onboarding-offboarding.md](onboarding-offboarding.md) |
| 8 | Performance Management | BR-PERF-001, 002 | [performance-management.md](performance-management.md) |
| 9 | Contract Management | BR-CON-001, 002 | [contract-management.md](contract-management.md) |
| 10 | Training Management | BR-TRAIN-001, 002 | [training-management.md](training-management.md) |
| 11 | Reports & Analytics | BR-REP-001, 002 | [reports-analytics.md](reports-analytics.md) |
| 12 | System Administration | BR-SYS-001, 002 | [system-administration.md](system-administration.md) |

## Quy tắc áp dụng cho AI Agents

- Mỗi module dùng mã phân quyền riêng `BR-<MODULE>-AUTH-001`; tra quy tắc trong file business rule của module đó và ma trận vai trò tại PRD.
- Không tự ý sinh công thức tính toán hoặc giá trị mặc định khi chưa có quyết định phê duyệt chính thức.
- Khi điều kiện nghiệp vụ vi phạm, hệ thống phải trả thông báo lỗi chính xác theo mã BR tương ứng.
