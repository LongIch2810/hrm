# Sprint [Số]: [Tên Sprint]

**Status:** TBD (To Be Determined) — Biểu mẫu cho Sprint 1–9 là **Proposal — Pending Approval**.

- Product Owner có duyệt cấu trúc, DoR, DoD và vị trí lưu tài liệu Sprint 1–9 không?

<!--
HƯỚNG DẪN DÀNH CHO AGENT KHI SỬ DỤNG TEMPLATE NÀY:
1. Copy file này thành: `sprints/sprint-<xx>-<module-name>.md` (ví dụ: `sprints/sprint-01-organization-employee.md`).
2. Thay thế toàn bộ các phần trong dấu ngoặc vuông `[...]` bằng nội dung cụ thể của Sprint.
3. Tuân thủ nghiêm ngặt nguyên tắc TBD trong AGENTS.md: Không tự ý bịa đặt yêu cầu nghiệp vụ chưa có trong docs/prd/.
4. Các mục Story Points, DoR và DoD là đề xuất cho Sprint chưa được duyệt; ghi TBD nếu chưa có xác nhận.
5. Giữ nguyên cấu trúc các đề mục từ 1 đến 6 để bảo đảm tính nhất quán toàn dự án.
-->

Tài liệu đặc tả chi tiết kế hoạch thực thi Sprint [Số]: [Mô tả ngắn gọn trọng tâm của Sprint].

---

## 1. Thông tin Sprint (Sprint Metadata)

| Thuộc tính | Chi tiết |
|---|---|
| **Mã Sprint** | `Sprint [Số]` (ví dụ: `Sprint 1`) |
| **Tên Sprint** | [Tên đầy đủ của Sprint] |
| **Chu kỳ** | [TBD (To Be Determined) nếu chưa được Product Owner duyệt] |
| **Trạng thái** | `[Draft | Planned | Active | Completed]` |
| **Tổng điểm cam kết** | **[Tổng điểm] Story Points** (ví dụ: `40 SP`) |
| **Phân hệ phụ trách** | [Mã phân hệ theo PRD, ví dụ: M-02 (Employees), M-03 (Departments)] |
| **Mục tiêu cốt lõi (Sprint Goal)** | [1 - 2 câu mô tả mục tiêu kinh doanh/kỹ thuật quan trọng nhất mà Sprint phải đạt được] |

---

## 2. Cơ cấu Đội ngũ & Phân công (Team Allocation)

| Vai trò | Người / Thực thể đảm nhiệm | Trách nhiệm trong Sprint |
|---|---|---|
| **Product Owner (PO)** | [Tên PO] | Nghiệm thu DoR, xác nhận nghiệp vụ, kiểm thử nghiệm thu UAT và chốt DoD. |
| **Scrum Master / Tech Lead** | [Tên SM / Tech Lead] | Điều phối quy trình, gỡ bỏ blocker, rà soát kiến trúc và code review. |
| **Development Team** | [Tên Devs / AI Coding Agent] | Phân tích kỹ thuật, triển khai backend/frontend, viết unit/integration tests. |
| **Quality Assurance (QA)** | [Tên QA / Tester] | Thiết kế test cases, kiểm thử hồi quy, kiểm thử bảo mật và giao diện. |

---

## 3. Danh sách User Stories chi tiết

<!--
Lặp lại cấu trúc dưới đây cho từng User Story trong Sprint.
Quy ước mã Story: US-XXX (ví dụ: US-006, US-007...).
-->

### US-[Mã]: [Tên ngắn gọn của User Story]

- **Story Statement (User Voice):**
  > *"Là một **[Vai trò người dùng: Admin / HR / Manager / Employee]**, tôi muốn **[Hành động / Tính năng mong muốn]**, để **[Giá trị kinh doanh hoặc lợi ích mang lại]**."*

- **Story Points:** `[Điểm theo dãy Fibonacci: 1, 2, 3, 5, 8]`
- **Độ ưu tiên:** `[P0 - Critical | P1 - High | P2 - Medium | P3 - Low]`
- **Tài liệu căn cứ:**
  - Yêu cầu chức năng: [docs/prd/function-requirement/...md](../docs/prd/)
  - Quy tắc nghiệp vụ: [docs/prd/business-rule/...md](../docs/prd/)
  - Thiết kế giao diện: [docs/design/screens/...md](../docs/design/screens/)
  - Quy tắc kỹ thuật: [docs/rules/clean-code.md](../docs/rules/clean-code.md), [rest-api.md](../docs/rules/rest-api.md)...

- **Definition of Ready (DoR Checklist) — Điều kiện để BẮT ĐẦU:**
  - [ ] Yêu cầu nghiệp vụ không còn trạng thái `TBD`.
  - [ ] Thiết kế màn hình / UI components tương ứng đã sẵn sàng.
  - [ ] API contract sơ bộ và cấu trúc dữ liệu đã được thống nhất.
  - [ ] Story Points đã được đồng thuận bởi Development Team.

- **Đặc tả Kỹ thuật Chi tiết (Technical Specifications):**
  - **Mô hình Dữ liệu (Database Schema / TypeORM Entity):**
    - Bảng liên quan: `[tên_bảng]` (kế thừa `BaseEntity`).
    - Các trường chính:
      - `[tên_cột_1]`: `[Kiểu dữ liệu SQL/TypeORM]`, `[Ràng buộc: nullable / unique / default...]`.
      - `[tên_cột_2]`: `[Kiểu dữ liệu SQL/TypeORM]`, `[Ràng buộc...]`.
    - Quan hệ (Relationships): `[OneToOne / OneToMany / ManyToOne]` với `[Entity khác]`.
  - **Data Transfer Objects (DTO) & Validation Rules:**
    - `[Action]Dto`: Các trường input, decorators kiểm tra kiểu (`@IsString()`, `@IsNotEmpty()`, `@IsEmail()`...).
  - **REST API Endpoints:**
    | Method | Endpoint | Quyền hạn (RBAC) | Mô tả & HTTP Status |
    |---|---|---|---|
    | `GET` | `/api/v1/[resource]` | `[Role được phép]` | Lấy danh sách (HTTP 200) |
    | `POST` | `/api/v1/[resource]` | `[Role được phép]` | Tạo mới (HTTP 201) |
    | `PUT/PATCH` | `/api/v1/[resource]/:id` | `[Role được phép]` | Cập nhật (HTTP 200) |
    | `DELETE` | `/api/v1/[resource]/:id` | `[Role được phép]` | Xóa mềm (HTTP 204/200) |
  - **Logic Nghiệp vụ & Ngoại lệ:**
    - [Mô tả luồng xử lý chính trong Service].
    - [Các trường hợp lỗi cần ném ngoại lệ: ví dụ EntityNotFoundException, BadRequestException].

- **Acceptance Criteria (Tiêu chí Nghiệm thu - AC):**
  - [ ] **Kịch bản thành công:** [Mô tả chi tiết kết quả khi người dùng thao tác đúng].
  - [ ] **Kịch bản thất bại / Validation:** [Mô tả phản hồi của hệ thống khi nhập sai hoặc thiếu dữ liệu].
  - [ ] **Phân quyền:** [Chỉ đúng vai trò được cấu hình mới thao tác được; các vai trò khác bị trả HTTP 403].
  - [ ] **Tác động dữ liệu:** [Dữ liệu được lưu trữ / cập nhật đúng đắn vào CSDL, có ghi nhận audit].

- **Phân rã Technical Tasks (Nhiệm vụ kỹ thuật con):**
  - `TASK-[Mã]-1`: [Task CSDL: Viết Entity, Migration, quan hệ].
  - `TASK-[Mã]-2`: [Task Backend: Viết Service logic, DTO validation, xử lý nghiệp vụ].
  - `TASK-[Mã]-3`: [Task API/Controller: Viết Controller, RBAC Guard, Swagger docs].
  - `TASK-[Mã]-4`: [Task Frontend: Nối API từ mock sang backend thật qua API client].
  - `TASK-[Mã]-5`: [Task Testing: Viết Unit Test cho Service và E2E Test cho Endpoint].

---

## 4. Kế hoạch Thực thi 10 Ngày (Day-by-Day Timeline)

```text
Tuần 1: Xây dựng Nền tảng Dữ liệu & Backend Logic
├── Ngày 1: Họp Sprint Planning, rà soát DoR, tạo nhánh feature/sprint-[Số]-...
├── Ngày 2: Viết Entities, TypeORM Migrations, cấu trúc bảng CSDL
├── Ngày 3: Viết DTOs, Validation Pipes và tầng Service xử lý nghiệp vụ chính
├── Ngày 4: Hoàn thiện Controllers, gắn RBAC Guards và tài liệu Swagger
└── Ngày 5: Viết Unit Tests cho các Service, kiểm tra luồng nghiệp vụ Backend

Tuần 2: Tích hợp Frontend, Kiểm thử & Nghiệm thu
├── Ngày 6: Họp Backlog Refinement cho Sprint tiếp theo; Bắt đầu tích hợp Frontend
├── Ngày 7: Nối API Frontend thật với Backend, xử lý trạng thái Loading/Error
├── Ngày 8: Viết Integration Tests theo Testing Rules, kiểm thử giao diện Cross-browser nếu thuộc phạm vi Sprint
├── Ngày 9: Khắc phục lỗi phát sinh (Bug fixes), tối ưu hóa hiệu năng truy vấn DB
└── Ngày 10: Chạy toàn bộ test suite; Họp Sprint Review & Demo với PO; Sprint Retrospective
```

---

## 5. Rủi ro Kỹ thuật & Biện pháp Giảm thiểu (Risks & Mitigation)

| Rủi ro tiềm ẩn | Mức độ | Khả năng xảy ra | Biện pháp phòng ngừa & xử lý |
|---|:---:|:---:|---|
| [Rủi ro 1: ví dụ logic tính toán phức tạp / phụ thuộc bên thứ 3] | `[Cao / TB / Thấp]` | `[Cao / TB / Thấp]` | [Kế hoạch xử lý / dự phòng cụ thể] |
| [Rủi ro 2: ví dụ hiệu năng truy vấn khi dữ liệu lớn] | `[Cao / TB / Thấp]` | `[Cao / TB / Thấp]` | [Đánh index đúng chuẩn, phân trang server-side] |

---

## 6. Definition of Done (DoD) Checklist cho Sprint [Số]

Một Sprint chỉ được đóng và di chuyển tài liệu sang `plans/completed/` khi thỏa mãn **toàn bộ 100%** checklist dưới đây:

- [ ] **Mã nguồn:** Toàn bộ code tuân thủ [Clean Code](../docs/rules/clean-code.md) và [Coding Style](../docs/rules/coding-style.md).
- [ ] **Biên dịch:** TypeScript compile thành công 0 lỗi trên cả `backend/` và `frontend/` (`npm run build`).
- [ ] **CSDL:** Mọi thay đổi schema đều thông qua TypeORM Migration, không dùng `synchronize: true`.
- [ ] **Kiểm thử:** Chạy các test liên quan và kiểm đủ nhánh quan trọng theo [Testing Rules](../docs/rules/testing.md); không đặt ngưỡng coverage theo phần trăm.
- [ ] **Bảo mật:** Tuân thủ [Security Rules](../docs/rules/security.md), không để lộ secrets, có RBAC guard, input được sanitize.
- [ ] **API Standard:** Toàn bộ REST APIs tuân thủ [REST API Rules](../docs/rules/rest-api.md) và có Swagger docs đầy đủ.
- [ ] **Git Workflow:** Tuân thủ [Git Rules](../docs/rules/git.md); chiến lược nhánh riêng cho Sprint còn TBD.
- [ ] **Tài liệu:** Cập nhật đồng bộ các tài liệu liên quan trong `docs/` nếu có thay đổi kiến trúc hoặc nghiệp vụ.
- [ ] **Nghiệm thu thực tế (PO Sign-off):** Demo chạy thực tế trước Product Owner, toàn bộ User Stories trong Sprint được PO ký duyệt nghiệm thu.
