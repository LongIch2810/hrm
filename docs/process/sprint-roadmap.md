# HRM Sprint Roadmap

Đề xuất lộ trình phát triển hệ thống HRM theo khung Agile Scrum.

**Status:** TBD (To Be Determined) — Lộ trình tổng thể và Sprint 1–9 chưa được duyệt. Sprint 0 đã được duyệt ở trạng thái Planned, chưa bắt đầu.

**Proposal — Pending Approval:** Lịch, thời lượng, thứ tự, Story Points và Story của Sprint 1–9 chờ Product Owner duyệt. Chỉ Sprint 0 đã được duyệt ở trạng thái Planned; chi tiết API trong [Sprint 0](../../sprints/sprint-00-core-backend.md) vẫn phụ thuộc contract TBD.

- Product Owner chọn giữ thứ tự module đề xuất; sau Sprint 8, tính năng MVP gồm `SYS`, `EMP`, `DEPT`, `ATT`, `LEAVE` hoàn tất.
- UAT giữ ở Sprint 9; MVP chỉ đủ điều kiện phát hành sau UAT và các tiêu chí PRD. Lịch phát hành các Phase tiếp tục TBD (To Be Determined).

- Product Owner có duyệt thứ tự, thời lượng và phạm vi Sprint 1–9 như đề xuất không?
- Development Team đã ước lượng và duyệt Story Points nào?
- Story nào thuộc phạm vi từng Sprint và tiêu chí nghiệm thu tương ứng?
- Những lựa chọn còn chưa xác nhận như OTP mở phiếu lương và CI/CD có nằm trong phạm vi không?

> [!NOTE]
> Frontend React có prototype dùng dữ liệu giả lập; độ phủ 68 màn hình và responsive chưa được kiểm chứng. Lộ trình bên dưới đề xuất các bước backend, tích hợp, kiểm thử và triển khai.

## 1. Tổng quan Lộ trình các Sprint

| Sprint | Thời gian | Trọng tâm Phân hệ | Mục tiêu cốt lõi (Sprint Goal) | Story Points |
|---|---|---|---|:---:|
| **Sprint 0 — Planned** | Tuần 1 - 2 | Core Backend & Infrastructure | Khởi tạo NestJS, PostgreSQL, Docker Compose, Base Entity, Auth & RBAC | 34 |
| **Sprint 1** | Tuần 3 - 4 | Organization & Employees | Quản lý Sơ đồ tổ chức, Phòng ban, Chức danh và Hồ sơ nhân sự cốt lõi | 40 |
| **Sprint 2** | Tuần 5 - 6 | Time & Attendance | Chấm công hàng ngày, Phân ca làm việc, Giải trình công và Duyệt OT | 45 |
| **Sprint 3** | Tuần 7 - 8 | Leave Management | Khởi tạo quỹ phép năm, Đơn xin nghỉ phép, Luồng duyệt một cấp bởi Manager trực tiếp | 38 |
| **Sprint 4** | Tuần 9 - 10 | Contracts, On/Offboarding | Hợp đồng lao động (cảnh báo hết hạn 30 ngày), Quy trình 4 bên On/Offboarding | 42 |
| **Sprint 5** | Tuần 11 - 12 | Payroll Engine & Payslip | Động cơ tính lương tự động, Thuế TNCN, Bảo hiểm XH, Xuất phiếu lương | 55 |
| **Sprint 6** | Tuần 13 - 14 | Recruitment & Kanban | Đăng tin tuyển dụng, Kanban ứng viên 6 trạng thái, Chấm điểm phỏng vấn | 36 |
| **Sprint 7** | Tuần 15 - 16 | Performance OKR & Training | Thiết lập mục tiêu OKR, Đánh giá chu kỳ (xếp loại A-E), Đào tạo & Chứng chỉ | 40 |
| **Sprint 8** | Tuần 17 - 18 | Analytics & System Admin | Báo cáo trực quan, Phân quyền ma trận, Audit Logs bảo mật và Tham số hệ thống | 35 |
| **Sprint 9** | Tuần 19 - 20 | E2E Hardening & Release Readiness | Kiểm thử tải, Rà soát bảo mật, Sửa lỗi UAT và chuẩn bị triển khai; lịch phát hành còn TBD | 30 |

---

## 2. Chi tiết Từng Sprint

### Sprint 0: Core Backend & Infrastructure Foundation
- **Sprint Goal:** Thiết lập nền tảng backend, cơ sở dữ liệu và cơ chế xác thực JWT/RBAC; CI/CD không thuộc Sprint 0.
- **Thời lượng:** 2 tuần (10 ngày làm việc).
- **Phân hệ liên quan:** M-01 (Auth), M-13 (Admin/RBAC nền tảng).
- **Các Story chính:**
  1. `US-001`: Khởi tạo cấu trúc dự án theo phiên bản đã xác nhận tại [Tech Stack](../architecture/tech-stack.md): NestJS 12.1.3, TypeORM 1.1.2, PostgreSQL 18.6 và Docker Compose.
  2. `US-002`: Xây dựng BaseEntity, AuditSubscriber tự động ghi `created_at`, `updated_at`, `created_by`.
  3. `US-003`: Cài đặt Auth Service theo [Auth](../architecture/auth.md) và [Tech Stack](../architecture/tech-stack.md), gồm băm mật khẩu bằng bcrypt.
  4. `US-004`: Cài đặt RBAC Guards & Decorator phân quyền (`@Roles()`, `@Permissions()`).
  5. `US-005`: Tích hợp Swagger/OpenAPI tự động sinh tài liệu REST API.
- **Tiêu chí nghiệm thu đề xuất:** Backend build đạt, chạy Docker local, API Auth và các test hành vi theo [Testing Rules](../rules/testing.md).

---

### Sprint 1: Organization & Employee Management
- **Sprint Goal:** Số hóa hoàn toàn cấu trúc phòng ban và toàn bộ hồ sơ nhân sự vòng đời.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-02 (Employees), M-03 (Departments & Positions).
- **Các Story chính:**
  1. `US-006`: CRUD Phòng ban (hỗ trợ cây phân cấp cha-con), phân bổ chức danh/vị trí công việc.
  2. `US-007`: CRUD Hồ sơ nhân viên đầy đủ thông tin (cá nhân, liên hệ, CCCD, thuế, tài khoản ngân hàng).
  3. `US-008`: Bộ lọc nhân viên đa tiêu chí (phòng ban, trạng thái, vị trí) với phân trang server-side.
  4. `US-009`: Tải lên ảnh đại diện và đính kèm tài liệu cá nhân lên storage an toàn.
  5. `US-010`: Nối API màn hình `EmployeeListPage`, `EmployeeDetailPage`, `DepartmentPage` vào backend.
- **Tiêu chí nghiệm thu (Deliverables):** Quản lý được sơ đồ tổ chức, thêm/sửa/chuyển phòng ban nhân viên và hiển thị dữ liệu thật trên frontend.

---

### Sprint 2: Time & Attendance Tracking
- **Sprint Goal:** Vận hành hệ thống chấm công tự động, phân ca làm việc linh hoạt và duyệt làm thêm giờ (OT).
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-04 (Attendance).
- **Các Story chính:**
  1. `US-011`: Cấu hình danh mục ca làm việc (giờ vào/ra, thời gian nghỉ giữa ca, ca gãy/ca xoay).
  2. `US-012`: API Check-in/Check-out (ghi IP và thiết bị; không giới hạn IP công ty hoặc thu thập GPS).
  3. `US-013`: Bảng tổng hợp công tự động (Timesheet): Tính công chuẩn, đi muộn, về sớm, thiếu giờ.
  4. `US-014`: Luồng gửi và duyệt đơn giải trình công (quên chấm công, công tác ngoài).
  5. `US-015`: Luồng đăng ký và phê duyệt làm thêm giờ (OT ngày thường, cuối tuần, ngày lễ).
- **Tiêu chí nghiệm thu (Deliverables):** Bảng công tháng tính chuẩn xác theo dữ liệu check-in thực tế; luồng duyệt OT thông suốt.

---

### Sprint 3: Leave Management
- **Sprint Goal:** Tự động hóa tính toán quỹ phép năm và quy trình gửi/duyệt đơn nghỉ phép một cấp.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-05 (Leaves).
- **Các Story chính:**
  1. `US-016`: Cấu hình loại nghỉ phép (phép năm, phép ốm, thai sản, việc riêng có/không hưởng lương).
  2. `US-017`: Động cơ cộng dồn phép năm tự động theo thâm niên làm việc (12 ngày/năm + thâm niên).
  3. `US-018`: Luồng gửi đơn xin nghỉ phép, kiểm tra số dư khả dụng tức thời trước khi submit.
  4. `US-019`: Manager trực tiếp duyệt đơn là hoàn tất; HR Staff xem và giám sát, kèm thông báo theo PRD.
  5. `US-020`: Lịch nghỉ phép chung toàn công ty (Company Leave Calendar).
- **Tiêu chí nghiệm thu (Deliverables):** Nhân viên gửi đơn trừ đúng quỹ phép; quản lý duyệt đơn trên web; dữ liệu đồng bộ sang bảng chấm công.

---

### Sprint 4: Labor Contracts & Onboarding / Offboarding
- **Sprint Goal:** Quản lý vòng đời hợp đồng lao động và quy trình tiếp nhận/bàn giao nhân sự 4 bên.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-08 (Onboarding/Offboarding), M-10 (Contracts).
- **Các Story chính:**
  1. `US-021`: Quản lý hợp đồng (thử việc, xác định/không xác định thời hạn), đính kèm file hợp đồng số.
  2. `US-022`: Job tự động cảnh báo hợp đồng sắp hết hạn trước 30 ngày (email + dashboard alert).
  3. `US-023`: Danh mục checklist tiếp nhận nhân viên mới (HR, IT, Trưởng phòng, Nhân viên).
  4. `US-024`: Quy trình thôi việc & bàn giao tài sản, tài khoản, công nợ 4 bên trước khi tất toán.
- **Tiêu chí nghiệm thu (Deliverables):** Cảnh báo hợp đồng hoạt động chuẩn; quy trình On/Offboarding cập nhật tiến độ realtime.

---

### Sprint 5: Payroll Engine & Payslips
- **Sprint Goal:** Tự động hóa tính lương tháng dựa trên bảng công, chính sách bảo hiểm và thuế TNCN Việt Nam.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-06 (Payroll).
- **Các Story chính:**
  1. `US-025`: Cấu hình thang bảng lương, phụ cấp, mức trích nộp BHXH/BHYT/BHTN và giảm trừ gia cảnh.
  2. `US-026`: Động cơ tổng hợp lương: Kết hợp ngày công thực tế + OT + Thưởng/Phạt $\rightarrow$ Tổng thu nhập.
  3. `US-027`: Tính thuế TNCN lũy tiến từng phần theo quy định pháp luật Việt Nam.
  4. `US-028`: Chốt bảng lương tháng (Khóa dữ liệu, phân quyền xem theo cấp bậc).
  5. `US-029`: Sinh phiếu lương cá nhân (mật khẩu mở file / OTP xác thực) và thông báo đến nhân viên.
- **Tiêu chí nghiệm thu (Deliverables):** Bảng lương tính khớp từng đồng so với công thức kiểm thử chuẩn; nhân viên xem được phiếu lương bảo mật.

---

### Sprint 6: Recruitment & Candidate Kanban
- **Sprint Goal:** Quản trị quy trình tuyển dụng từ đăng tin tuyển dụng đến chấm điểm phỏng vấn ứng viên.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-07 (Recruitment).
- **Các Story chính:**
  1. `US-030`: Tạo và quản lý tin tuyển dụng (Job Postings), yêu cầu vị trí, mức lương dự kiến.
  2. `US-031`: Bảng Kanban theo 6 trạng thái đã xác nhận: New, Screening, Interviewing, Offered, Hired, Rejected.
  3. `US-032`: Đặt lịch phỏng vấn và gửi email thư mời tự động cho ứng viên.
  4. `US-033`: Biểu mẫu đánh giá và chấm điểm phỏng vấn theo thang tiêu chí chuẩn hóa.
  5. `US-034`: Chuyển đổi trạng thái ứng viên trúng tuyển trực tiếp thành nhân viên mới (Onboarding).
- **Tiêu chí nghiệm thu (Deliverables):** Thao tác kéo thả Kanban mượt mà, lưu lịch sử đánh giá ứng viên đầy đủ.

---

### Sprint 7: Performance Review (OKR/KPI) & Training
- **Sprint Goal:** Thiết lập mục tiêu hiệu suất, chu kỳ đánh giá xếp loại và quản lý đào tạo nhân viên.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-09 (Performance), M-11 (Training).
- **Các Story chính:**
  1. `US-035`: Thiết lập mục tiêu OKR/KPI theo quý/năm cho từng phòng ban và cá nhân.
  2. `US-036`: Khởi tạo kỳ đánh giá hiệu suất định kỳ (tự đánh giá + quản lý đánh giá xếp hạng A-E).
  3. `US-037`: Bảng tổng hợp kết quả đánh giá toàn doanh nghiệp và phân bổ tỷ lệ xếp loại.
  4. `US-038`: Quản lý danh mục khóa đào tạo nội bộ/bên ngoài, ghi nhận nhân viên tham gia.
  5. `US-039`: Theo dõi chứng chỉ, hạn chứng chỉ nghề nghiệp của nhân viên.
- **Tiêu chí nghiệm thu (Deliverables):** Hoàn tất một chu kỳ đánh giá thử nghiệm và cấp phát chứng chỉ đào tạo.

---

### Sprint 8: Reports, System Administration & Audit Logs
- **Sprint Goal:** Hoàn thiện báo cáo điều hành, ma trận phân quyền RBAC và hệ thống ghi vết kiểm toán an ninh.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** M-12 (Reports), M-13 (Admin & System Parameters).
- **Các Story chính:**
  1. `US-040`: Báo cáo chỉ số nhân sự: Tỷ lệ biến động (turnover rate), thâm niên, phân bổ độ tuổi/giới tính.
  2. `US-041`: Báo cáo chuyên cần: Tỷ lệ đi muộn, nghỉ phép theo tháng, phòng ban.
  3. `US-042`: Xuất dữ liệu báo cáo ra Excel/PDF hỗ trợ che thông tin nhạy cảm (data masking).
  4. `US-043`: Ma trận phân quyền chi tiết (Role-Permission Matrix) cho từng vai trò và tính năng.
  5. `US-044`: Hệ thống ghi log kiểm toán (Audit Trail) ghi vết hành động xem/thay đổi dữ liệu trọng yếu.
- **Tiêu chí nghiệm thu (Deliverables):** Dashboard hiển thị dữ liệu thống kê trực quan; Audit log ghi nhận mọi thay đổi dữ liệu nhạy cảm.

---

### Sprint 9: E2E Integration, Hardening & Release Readiness
- **Sprint Goal:** Kiểm thử toàn diện đầu cuối (E2E), tối ưu hiệu năng, rà soát an toàn thông tin và chuẩn bị phát hành theo lịch còn TBD.
- **Thời lượng:** 2 tuần.
- **Phân hệ liên quan:** Toàn bộ 15 phân hệ.
- **Các Story chính:**
  1. `US-045`: Kiểm thử tích hợp toàn diện luồng nghiệp vụ xuyên suốt: Tuyển dụng $\rightarrow$ Tiếp nhận $\rightarrow$ Chấm công $\rightarrow$ Nghỉ phép $\rightarrow$ Tính lương $\rightarrow$ Đánh giá $\rightarrow$ Thôi việc.
  2. `US-046`: Kiểm thử tải (Load test) kịch bản 300 nhân sự đồng thời check-in đầu giờ.
  3. `US-047`: Rà soát lỗ hổng bảo mật (OWASP Top 10, SQL Injection, IDOR, XSS, rate limiting).
  4. `US-048`: Hoàn thiện tài liệu hướng dẫn sử dụng cho 4 vai trò người dùng (Admin, HR, Manager, Employee).
  5. `US-049`: Đóng gói Docker Compose Production và kịch bản sao lưu dữ liệu tự động định kỳ.
- **Tiêu chí nghiệm thu (Deliverables):** Hệ thống sẵn sàng trình phê duyệt phát hành, không còn lỗi blocker/critical, được Product Owner ký nghiệm thu UAT.
