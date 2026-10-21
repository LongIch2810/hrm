# 9. Core Workflows Index

- **Parent Spec:** [docs/PRD.md#9-core-workflows](../../PRD.md#9-core-workflows)
- **Scope:** 11 quy trình nghiệp vụ xuyên suốt (End-to-End Workflows) của toàn bộ hệ thống HRM.
- **Trạng thái:** Confirmed — Approved by Product Owner. Toàn bộ 11 quy trình nghiệp vụ đã được phê duyệt chính thức.

---

## Danh mục 11 Quy trình Nghiệp vụ Cốt lõi

| STT | Quy trình nghiệp vụ (Workflow) | Module tham gia | File quy trình chi tiết |
|:---:|---|---|---|
| 1 | **Quy trình Tuyển dụng nhân sự** | REC, ONB | [recruitment-workflow.md](recruitment-workflow.md) |
| 2 | **Quy trình Tiếp nhận nhân sự mới (Onboarding)** | REC, ONB, EMP, SYS | [onboarding-workflow.md](onboarding-workflow.md) |
| 3 | **Quy trình Chấm công & Quản lý thời gian** | ATT, EMP, DEPT | [attendance-workflow.md](attendance-workflow.md) |
| 4 | **Quy trình Đăng ký & Phê duyệt làm thêm giờ (OT)** | ATT, PAY | [overtime-approval-workflow.md](overtime-approval-workflow.md) |
| 5 | **Quy trình Phê duyệt nghỉ phép (1 cấp trực tiếp)** | LEAVE, ATT, PAY | [leave-approval-workflow.md](leave-approval-workflow.md) |
| 6 | **Quy trình Xử lý & Khóa kỳ lương (Payroll)** | PAY, ATT, LEAVE, CON | [payroll-processing-workflow.md](payroll-processing-workflow.md) |
| 7 | **Quy trình Vòng đời Hợp đồng lao động** | CON, EMP, PAY | [contract-lifecycle-workflow.md](contract-lifecycle-workflow.md) |
| 8 | **Quy trình Điều chuyển công tác & Thăng chức** | EMP, DEPT, CON, SYS | [employee-transfer-workflow.md](employee-transfer-workflow.md) |
| 9 | **Quy trình Đánh giá hiệu suất nhân sự (KPI/OKR)** | PERF, EMP, PAY | [performance-evaluation-workflow.md](performance-evaluation-workflow.md) |
| 10 | **Quy trình Quản lý Đào tạo & Cấp chứng chỉ** | TRAIN, EMP | [training-management-workflow.md](training-management-workflow.md) |
| 11 | **Quy trình Bàn giao & Nghỉ việc (Offboarding)** | ONB, EMP, SYS, PAY | [offboarding-workflow.md](offboarding-workflow.md) |

---

## Nguyên tắc áp dụng cho AI Agents & Lập trình viên

- Tuân thủ nghiêm ngặt thứ tự và các bước chuyển đổi trạng thái của từng State Machine trong mỗi quy trình.
- Không tự ý lập trình nhảy cóc các bước trong quy trình khi điều kiện chuyển trạng thái chưa thỏa mãn.
- **Các điểm chuyển giao dữ liệu liên module đã xác nhận (Confirmed Handover Points):**
  1. `REC` $\rightarrow$ `ONB`: Ứng viên chấp nhận offer (`HIRED`) tự động kích hoạt Onboarding Checklist.
  2. `ONB` $\rightarrow$ `EMP`: Hoàn thành 100% checklist Onboarding kích hoạt trạng thái nhân viên chính thức (`ACTIVE`).
  3. `CON` $\rightarrow$ `PAY`: Mức lương cơ bản và phụ cấp trên HĐLĐ/Phụ lục là nguồn dữ liệu gốc tính lương.
  4. `ATT` & `LEAVE` $\rightarrow$ `PAY`: Dữ liệu ngày công, giờ OT và ngày phép được chốt trước khi tính lương.
  5. `PERF` & `TRAIN` $\rightarrow$ `EMP`: Kết quả xếp loại và chứng chỉ tự động lưu vào hồ sơ nhân sự trọn đời.
  6. `ONB` (Offboarding) $\rightarrow$ `SYS` & `PAY`: Khóa tài khoản lúc 23:59:59 của ngày làm việc cuối cùng và thanh toán phép tồn.
