# Sprints Index — Hướng dẫn và Mục lục Sprint cho Agent

Tài liệu này là điểm truy cập chính thức (Entry Point) dành cho AI Coding Agent và Developers để tra cứu, theo dõi và lập kế hoạch cho các Sprint trong dự án HRM.

> [!NOTE]
> - Khung Agile Scrum và Sprint 1–9 đang TBD tại [docs/process/agile-scrum.md](../docs/process/agile-scrum.md) và [sprint-roadmap.md](../docs/process/sprint-roadmap.md).
> - Sprint 0 đã được duyệt ở trạng thái Planned; chi tiết API còn TBD.
> - [Sprint template](../templates/sprint-template.md) là mẫu đề xuất cho các Sprint chưa được duyệt.

---

## 1. Danh mục Chi tiết các Sprint

| Sprint | Tên Sprint & Trọng tâm | Trạng thái | Story Points | Tài liệu chi tiết |
|---|---|:---:|:---:|---|
| **Sprint 0** | Core Backend & Infrastructure (NestJS 12, PostgreSQL 18.6, Docker, Auth, RBAC) | `Planned` | 34 | [sprint-00-core-backend.md](sprint-00-core-backend.md) |
| **Sprint 1** | Organization & Employee Management (Phòng ban, Chức danh, Hồ sơ nhân sự) | `TBD` | 40 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 2** | Time & Attendance (Chấm công, Ca làm việc, Phê duyệt OT) | `TBD` | 45 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 3** | Leave Management (Quỹ phép năm, Đơn xin nghỉ phép, Manager trực tiếp duyệt một cấp) | `TBD` | 38 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 4** | Contracts & On/Offboarding (Hợp đồng lao động, Quy trình 4 bên) | `TBD` | 42 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 5** | Payroll Engine & Confidential Payslip (Tính lương, BHXH, Thuế TNCN) | `TBD` | 55 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 6** | Recruitment & Candidate Kanban (Tin tuyển dụng, Kanban 5 bước) | `TBD` | 36 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 7** | Performance OKR & Training (Đánh giá xếp loại A-E, Khóa đào tạo) | `TBD` | 40 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 8** | Analytics & System Admin (Báo cáo, Audit Log, Tham số hệ thống) | `TBD` | 35 đề xuất | *Chờ Product Owner duyệt* |
| **Sprint 9** | E2E Hardening & Release Readiness (Load test, UAT, chuẩn bị triển khai; lịch phát hành còn TBD) | `TBD` | 30 đề xuất | *Chờ Product Owner duyệt* |

---

## 2. Chỉ dẫn Thực thi cho Agent

1. **Trước khi bắt đầu thực hiện một User Story trong Sprint:**
   - Đọc kỹ đặc tả kỹ thuật và Acceptance Criteria (AC) trong file `sprints/sprint-<xx>-<name>.md`.
   - Kiểm tra điều kiện sẵn sàng (**DoR**): Không bắt đầu code nếu còn vướng trạng thái `TBD`.
2. **Trong quá trình thực thi:**
   - Cập nhật tiến độ vào file task tương ứng trong `tasks/active/`.
   - Tuân thủ quy chuẩn kỹ thuật: Clean Code, Coding Style, Security, REST API, Database.
3. **Khi hoàn thành:**
   - Đối soát toàn bộ 9 mục trong **DoD Checklist** của file Sprint.
   - Chỉ báo hoàn thành khi toàn bộ tests pass và được xác nhận bởi Product Owner.
