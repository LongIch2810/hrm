# Sprint 0: Core Backend & Infrastructure Foundation

Tài liệu kế hoạch Sprint 0 đã được Product Owner duyệt để chuẩn bị triển khai NestJS 12, PostgreSQL 18.6, Docker Compose, Authentication, RBAC và kiểm thử tự động. Quy ước API chung đã duyệt; endpoint và DTO Auth còn chờ contract module.

**Status:** Planned — Sprint 0 đã được duyệt, chưa bắt đầu.

**Status:** TBD (To Be Determined) — Quy ước chung tại [api-spec.md](../docs/api-spec.md) đã duyệt; contract endpoint và DTO module SYS chưa được duyệt. Các endpoint và DTO bên dưới là **Proposal — Pending Approval**; không triển khai phần phụ thuộc trước khi chốt contract module.

- Product Owner có duyệt method, URL, DTO, response và error mapping cho các API trong Sprint 0 không?
- Swagger UI được công bố tại URL nào và bằng cấu hình nào? Phiên bản OpenAPI đã chốt là 3.1.0.

---

## 1. Thông tin Sprint (Sprint Metadata)

| Thuộc tính | Chi tiết |
|---|---|
| **Mã Sprint** | `Sprint 0` |
| **Tên Sprint** | Core Backend & Infrastructure Foundation |
| **Chu kỳ** | 2 tuần (10 ngày làm việc) |
| **Trạng thái** | `Planned — Đã duyệt kế hoạch, chưa bắt đầu; contract endpoint/DTO Auth còn TBD` |
| **Tổng điểm cam kết** | **34 Story Points** (Fibonacci: 8 + 5 + 8 + 8 + 5) |
| **Phân hệ phụ trách** | SYS (Authentication, Access Control và RBAC) |
| **Mục tiêu cốt lõi (Sprint Goal)** | Thiết lập backend NestJS 12, PostgreSQL 18.6 và Docker Compose; triển khai xác thực bằng bcrypt, JWT access/refresh token và RBAC Guard; chuẩn hóa BaseEntity, xử lý lỗi, validation và kiểm thử theo Testing Rules. Phần API/Swagger chờ contract được duyệt. |

---

## 2. Cơ cấu Đội ngũ & Phân công (Team Allocation)

- **Product Owner (PO):** Nghiệm thu DoR, rà soát Swagger API contract, nghiệm thu DoD cuối Sprint.
- **Scrum Master / Tech Lead:** Điều phối nhịp độ, rà soát pull requests, bảo đảm tuân thủ `docs/rules/*`.
- **Backend Developers (Devs & AI Coding Agent):** Triển khai cấu trúc NestJS, TypeORM entities, Auth Service, RBAC Guards, DTOs và Controllers.
- **Quality Assurance (QA / Tester):** Thiết lập môi trường test, viết Integration Tests và kiểm thử tải nhẹ cho luồng Auth.

---

## 3. Danh sách User Stories chi tiết

### US-001: Khởi tạo Cấu trúc Backend NestJS 12 & Docker Compose
- **Story Statement:** *"Là một **Developer**, tôi muốn **khởi tạo khung dự án Backend NestJS 12 với TypeORM 1.1, PostgreSQL 18.6 và Docker Compose**, để **toàn bộ đội ngũ có môi trường phát triển đồng nhất, độc lập và sẵn sàng mở rộng các module nghiệp vụ**."*
- **Story Points:** `8 SP`
- **Độ ưu tiên:** `P0 - Critical`
- **Tài liệu căn cứ:** [backend-nestjs.md](../docs/architecture/layers/backend-nestjs.md), [tech-stack.md](../docs/architecture/tech-stack.md), [folder-structure.md](../docs/architecture/folder-structure.md).
- **Definition of Ready (DoR):**
  - [x] Tech stack đã xác nhận: NestJS 12.1.3, TypeORM 1.1.2, PostgreSQL 18.6, ESM mode.
  - [x] Cấu trúc thư mục theo đúng quy chuẩn `docs/architecture/folder-structure.md`.
- **Đặc tả kỹ thuật:**
  - Khởi tạo thư mục `backend/` dạng ESM module (`"type": "module"` trong `package.json`).
  - Thiết lập `compose.yaml` tại thư mục gốc với service PostgreSQL 18.6 (port 5432) và named volume `postgres-data` theo [Tech Stack](../docs/architecture/tech-stack.md).
  - Cấu hình backend đọc `PORT`, `DATABASE_URL`, `JWT_*`, `CORS_ORIGIN` từ `backend/.env`; cấu hình PostgreSQL đọc `POSTGRES_*` từ `.env` ở root.
  - Kết nối TypeORM qua `@nestjs/typeorm` với dynamic configuration (không bật `synchronize: true` trên môi trường sản xuất).
- **Acceptance Criteria (Tiêu chí nghiệm thu):**
  - [ ] Chạy lệnh `docker compose up -d` khởi động PostgreSQL 18.6 thành công, kiểm tra `docker ps` báo Healthy.
  - [ ] Chạy lệnh `npm run build` trong `backend/` biên dịch TypeScript thành công 0 lỗi.
  - [ ] Chạy lệnh `npm run dev` kết nối thành công đến PostgreSQL, log báo `Nest application successfully started`.
  - [ ] Health endpoint và response được kiểm theo API contract sau khi Product Owner duyệt.
- **Phân rã Technical Tasks:**
  - `TASK-001-1`: Thiết lập `package.json`, `tsconfig.json`, `compose.yaml` cho Backend và PostgreSQL.
  - `TASK-001-2`: Cài đặt `ConfigModule`, `TypeOrmModule` và file biến môi trường mẫu `.env.example`.
  - `TASK-001-3`: Viết module `HealthModule` và kiểm thử kết nối database.

---

### US-002: BaseEntity, AuditSubscriber & TypeORM Migrations
- **Story Statement:** *"Là một **Developer**, tôi muốn **toàn bộ entity trong hệ thống kế thừa BaseEntity chuẩn và tự động ghi vết Audit (created_at, updated_at, deleted_at, created_by)**, để **bảo đảm tính toàn vẹn dữ liệu, hỗ trợ soft delete và phục vụ kiểm toán an ninh**."*
- **Story Points:** `5 SP`
- **Độ ưu tiên:** `P0 - Critical`
- **Tài liệu căn cứ:** [database.md](../docs/rules/database.md), [naming.md](../docs/rules/naming.md).
- **Definition of Ready (DoR):**
  - [x] Quy chuẩn đặt tên bảng, cột và chỉ mục đã xác nhận tại `docs/rules/database.md`.
  - [x] Quy tắc soft-delete đã được phê duyệt.
- **Đặc tả kỹ thuật:**
  - Tạo abstract class `BaseEntity`:
    - `id`: UUID v4 (`@PrimaryGeneratedColumn('uuid')`).
    - `created_at`: `@CreateDateColumn({ type: 'timestamptz' })`.
    - `updated_at`: `@UpdateDateColumn({ type: 'timestamptz' })`.
    - `deleted_at`: `@DeleteDateColumn({ type: 'timestamptz', nullable: true })` (hỗ trợ soft delete).
    - `created_by`: `@Column({ type: 'uuid', nullable: true })`.
    - `updated_by`: `@Column({ type: 'uuid', nullable: true })`.
  - Tạo `AuditSubscriber` (TypeORM Event Subscriber) tự động trích xuất `userId` từ request context để điền vào `created_by` / `updated_by`.
  - Cấu hình TypeORM CLI DataSource để chạy lệnh migration: `npm run migration:generate`, `npm run migration:run`, `npm run migration:revert`.
- **Acceptance Criteria (Tiêu chí nghiệm thu):**
  - [ ] Lệnh tạo migration mới sinh ra file SQL/TypeScript hợp lệ trong thư mục `backend/src/database/migrations/`.
  - [ ] Lệnh `npm run migration:run` thực thi thành công và ghi nhận lịch sử vào bảng `migrations`.
  - [ ] Tạo một entity thử nghiệm kế thừa `BaseEntity`, khi insert tự động sinh UUID, timestamp và khi `softRemove` thì cập nhật `deleted_at` mà không xóa vật lý khỏi database.
- **Phân rã Technical Tasks:**
  - `TASK-002-1`: Viết `BaseEntity` và cấu hình DataSource cho TypeORM CLI.
  - `TASK-002-2`: Cài đặt `AuditSubscriber` và tích hợp AsyncLocalStorage để lấy context người dùng.
  - `TASK-002-3`: Tạo migration khởi tạo đầu tiên (InitSchema) và kiểm tra rollback (`migration:revert`).

---

### US-003: Dịch vụ Xác thực người dùng (bcrypt, JWT & Token Rotation)
- **Story Statement:** *"Là một **Người dùng nội bộ (Admin, HR, Manager, Employee)**, tôi muốn **đăng nhập an toàn bằng email và mật khẩu để nhận Access Token và Refresh Token**, để **tôi có thể sử dụng các chức năng của hệ thống theo đúng phiên làm việc**."*
- **Story Points:** `8 SP`
- **Độ ưu tiên:** `P0 - Critical`
- **Tài liệu căn cứ:** [auth.md](../docs/architecture/auth.md), [security.md](../docs/rules/security.md), [rest-api.md](../docs/rules/rest-api.md).
- **Definition of Ready (DoR):**
  - [x] Thời hạn token đã chốt: Access token 15 phút, Refresh token 7 ngày.
  - [x] Lưu Refresh token ở HttpOnly Cookie (`SameSite=Lax`, `Secure` trên production).
  - [x] Thuật toán băm mật khẩu bcrypt đã được Product Owner xác nhận.
  - [x] Thư viện `bcrypt` 6.0.0 và work factor 12 được Product Owner xác nhận.
  - [ ] API contract cho endpoint, DTO, response và lỗi được Product Owner xác nhận.
- **Đặc tả kỹ thuật:**
  - Entity `User`: Email (unique), password_hash, role, status (`ACTIVE`, `INACTIVE`, `SUSPENDED`), last_login_at.
  - Entity `UserSession` lưu tại bảng `user_sessions`: user_id, token_hash, expires_at, is_revoked, replaced_by_token, family_id (phát hiện token dùng lại).
  - Băm mật khẩu bằng `bcrypt` 6.0.0, work factor 12 theo [Security Rules](../docs/rules/security.md); đo hiệu năng khi triển khai.
  - Cấp phát cặp token:
    - **Access Token:** HS256, payload `{ sub: userId, email, role }`, thời hạn 15m, gửi qua response body hoặc header.
    - **Refresh Token:** HS256, payload `{ sub: userId, tokenId, familyId }`, thời hạn 7d, gửi qua HttpOnly cookie `refresh_token`.
  - **Token Rotation & Tái sử dụng (Reuse Detection):** Mỗi lần refresh token sẽ sinh cặp token mới và thu hồi token cũ. Nếu phát hiện một token đã bị thu hồi mà tiếp tục được gửi lên, lập tức thu hồi toàn bộ token thuộc `familyId` đó (cảnh báo nguy cơ rò rỉ).
  - **REST API Endpoints — Proposal — Pending Approval:**
    - `POST /api/v1/auth/login`: Nhận `{ email, password }`, trả về Access Token và set-cookie Refresh Token.
    - `POST /api/v1/auth/refresh`: Đọc cookie Refresh Token, kiểm tra hợp lệ, xoay token mới.
    - `POST /api/v1/auth/logout`: Thu hồi Refresh Token trong DB và xóa cookie ở client.
    - `GET /api/v1/auth/me`: Lấy thông tin user hiện tại từ token.
- **Acceptance Criteria (Tiêu chí nghiệm thu):**
  - [ ] Đăng nhập với thông tin chính xác trả về HTTP 200, access token hợp lệ và cookie `refresh_token` có cờ `HttpOnly`.
  - [ ] Sau 5 lần nhập sai mật khẩu liên tiếp, tài khoản bị khóa tạm thời theo [BR-SYS-001](../docs/prd/business-rule/system-administration.md#br-sys-001-chính-sách-tài-khoản-mật-khẩu-và-xác-thực-danh-tính).
  - [ ] Gửi token hết hạn lên `/api/v1/auth/refresh` thì cấp token mới thành công; gửi lại token cũ đã dùng thì bị từ chối HTTP 401 và toàn bộ phiên của tài khoản bị đăng xuất.
  - [ ] Mật khẩu trong database không lưu plain text, chỉ lưu hash bcrypt.
- **Phân rã Technical Tasks:**
  - `TASK-003-1`: Viết `User` entity, `UserSession` entity và migration tương ứng.
  - `TASK-003-2`: Xây dựng `HashingService` dùng bcrypt với unit tests kiểm tra hash/verify và giới hạn 72 byte UTF-8.
  - `TASK-003-3`: Cài đặt `AuthService` (đăng nhập, xoay token, thu hồi token, kiểm tra reuse).
  - `TASK-003-4`: Viết `AuthController` với các endpoint Login, Refresh, Logout, Me.

---

### US-004: Phân quyền RBAC, Guards & Chuẩn hóa Response / Exception Filter
- **Story Statement:** *"Là một **Quản trị viên hệ thống**, tôi muốn **hệ thống tự động kiểm tra vai trò người dùng qua RBAC Guards và chuẩn hóa toàn bộ cấu trúc lỗi/phản hồi**, để **dữ liệu được bảo vệ an toàn và client nhận được thông báo lỗi nhất quán**."*
- **Story Points:** `8 SP`
- **Độ ưu tiên:** `P0 - Critical`
- **Tài liệu căn cứ:** [auth.md](../docs/architecture/auth.md), [rest-api.md](../docs/rules/rest-api.md), [backend-nestjs.md](../docs/architecture/layers/backend-nestjs.md).
- **Definition of Ready (DoR):**
  - [x] Ma trận 4 vai trò (`ADMIN`, `HR`, `MANAGER`, `EMPLOYEE`) đã phê duyệt 100%.
  - [x] Định dạng lỗi và response chung được xác nhận trong [API spec](../docs/api-spec.md); endpoint/DTO Auth còn TBD.
- **Đặc tả kỹ thuật:**
  - Enum `UserRole`: `ADMIN`, `HR`, `MANAGER`, `EMPLOYEE`.
  - Custom Decorators:
    - `@Public()`: Đánh dấu route không yêu cầu JWT (login, healthcheck).
    - `@Roles(...roles: UserRole[])`: Khai báo các vai trò được phép truy cập.
    - `@CurrentUser()`: Lấy thông tin user đã xác thực từ `request.user`.
  - Guards toàn ứng dụng:
    - `JwtAuthGuard`: Kiểm tra Bearer token trong Header `Authorization`, giải mã và gắn vào `request.user`. Bỏ qua nếu có `@Public()`.
    - `RolesGuard`: So khớp `request.user.role` với danh sách trong `@Roles()`. Trả về HTTP 403 `INSUFFICIENT_PERMISSIONS` nếu không đủ quyền.
  - **Global Exception Filter (`AllExceptionsFilter`) — schema phản hồi đã xác nhận:**
    - Bắt mọi lỗi từ Controller/Service.
    - Trả về JSON chuẩn theo [rest-api.md](../docs/rules/rest-api.md):
      ```json
      {
        "error": {
          "code": "INSUFFICIENT_PERMISSIONS",
          "message": "Bạn không có quyền thực hiện thao tác này.",
          "details": []
        },
        "meta": {"requestId": "request-id", "timestamp": "21/10/2026 15:30:00"}
      }
      ```
  - **Global ValidationPipe:** Cấu hình chuẩn `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true` theo `backend-nestjs.md`.
- **Acceptance Criteria (Tiêu chí nghiệm thu):**
  - [ ] Route có `@Roles(UserRole.ADMIN)` chỉ cho phép tài khoản Admin truy cập; Employee truy cập trả về đúng HTTP 403 với `error.code: INSUFFICIENT_PERMISSIONS`.
  - [ ] Gửi body thừa trường hoặc sai kiểu dữ liệu bị `ValidationPipe` từ chối ngay lập tức với HTTP 400 và danh sách chi tiết trường lỗi.
  - [ ] Lỗi chưa dự liệu (Uncaught exception) được filter bắt lại, ghi log server và trả về HTTP 500 với thông điệp an toàn, không để lộ stack trace ra ngoài.
- **Phân rã Technical Tasks:**
  - `TASK-004-1`: Tạo Decorators `@Roles`, `@Public`, `@CurrentUser` và enum `UserRole`.
  - `TASK-004-2`: Cài đặt `JwtAuthGuard` và `RolesGuard`, đăng ký làm Guard toàn cục.
  - `TASK-004-3`: Xây dựng `AllExceptionsFilter` và gắn vào ứng dụng qua `APP_FILTER`.
  - `TASK-004-4`: Cấu hình `ValidationPipe` và viết test kiểm chứng các trường hợp 400, 401, 403, 500.

---

### US-005: Swagger/OpenAPI Documentation & Bộ Kiểm thử Tự động (Testing Suite)
- **Story Statement:** *"Là một **Developer và QA**, tôi muốn **hệ thống tự động sinh tài liệu Swagger UI và có bộ kiểm thử tự động (Unit & E2E Tests)**, để **chúng tôi có thể kiểm thử luồng Auth và tích hợp trơn tru với ứng dụng Frontend**."*
- **Story Points:** `5 SP`
- **Độ ưu tiên:** `P1 - High`
- **Tài liệu căn cứ:** [testing.md](../docs/rules/testing.md), [tech-stack.md](../docs/architecture/tech-stack.md).
- **Definition of Ready (DoR):**
  - [x] Lựa chọn test runner Vitest đã xác nhận tại [Tech Stack](../docs/architecture/tech-stack.md).
  - [x] Quy ước chung OpenAPI 3.1.0 đã được Product Owner xác nhận tại [openapi.yaml](../docs/openapi.yaml); endpoint/DTO Auth còn TBD.
- **Đặc tả kỹ thuật:**
  - Tích hợp `@nestjs/swagger`:
    - Đường dẫn tài liệu: `http://localhost:3000/api/docs`.
    - Cấu hình Bearer Auth: `addBearerAuth()`.
    - Gắn `@ApiTags()`, `@ApiOperation()`, `@ApiResponse()` cho toàn bộ endpoint Auth.
  - Viết Unit Tests với Mock Repository:
    - `auth.service.spec.ts`: Test case đăng nhập thành công, sai mật khẩu, tài khoản bị khóa, xoay token, reuse token.
    - `hashing.service.spec.ts`: Test hash và verify với bcrypt.
    - `roles.guard.spec.ts`: Test kiểm tra quyền hạn các vai trò.
  - Viết backend E2E tests với Vitest, `@nestjs/testing` và `fetch` của Node.js theo [Testing Rules](../docs/rules/testing.md):
    - `auth.e2e.test.ts`: Kiểm tra luồng đăng nhập $\rightarrow$ lấy profile $\rightarrow$ xoay token $\rightarrow$ đăng xuất sau khi API contract được duyệt.
- **Acceptance Criteria (Tiêu chí nghiệm thu):**
  - [ ] Mở trình duyệt truy cập `http://localhost:3000/api/docs` hiển thị giao diện Swagger UI đầy đủ các schema DTO và nút bấm Authorize.
  - [ ] Chạy lệnh `npm test` chạy toàn bộ Unit Tests pass.
  - [ ] Chạy lệnh `npm run test:e2e` kiểm tra luồng Auth integration pass 100%.
  - [ ] Kiểm đủ các nhánh xác thực, xoay token và từ chối truy cập theo [Testing Rules](../docs/rules/testing.md); không đặt ngưỡng coverage theo phần trăm.
- **Phân rã Technical Tasks:**
  - `TASK-005-1`: Thiết lập Swagger UI trong `main.ts` và gắn Swagger decorators cho Auth module.
  - `TASK-005-2`: Viết Unit Tests cho `AuthService`, `HashingService`, `RolesGuard`.
  - `TASK-005-3`: Viết E2E Integration Tests cho các kịch bản đăng nhập, làm mới token và đăng xuất.

---

## 4. Kế hoạch Thực thi 10 Ngày (Day-by-Day Timeline)

```text
Tuần 1: Khởi tạo Hạ tầng & CSDL
├── Ngày 1: Sprint Planning, khởi tạo NestJS 12, TypeScript, compose.yaml, kết nối PostgreSQL (US-001)
├── Ngày 2: BaseEntity, AuditSubscriber, cấu hình TypeORM CLI DataSource (US-002)
├── Ngày 3: Migration khởi tạo đầu tiên, Global Exception Filter, ValidationPipe (US-002, US-004)
├── Ngày 4: User Entity, UserSession Entity, Enum UserRole, HashingService với bcrypt (US-003)
└── Ngày 5: AuthService & AuthController: Đăng nhập email/pass, sinh JWT Access & Refresh Token (US-003)

Tuần 2: Phân quyền, Hoàn thiện & Nghiệm thu
├── Ngày 6: Cơ chế Refresh Token Rotation và Token Reuse Detection, Logout endpoint (US-003)
├── Ngày 7: JwtAuthGuard, RolesGuard, Decorator @Roles, @Public, @CurrentUser (US-004)
├── Ngày 8: Cấu hình Swagger/OpenAPI documentation tại /api/docs (US-005)
├── Ngày 9: Viết toàn bộ Unit Tests và E2E Tests cho Auth Module, đo độ phủ (US-005)
└── Ngày 10: Rà soát bảo mật, chạy Docker kiểm thử toàn diện, Sprint Review & Demo, Sprint Retrospective
```

---

## 5. Rủi ro Kỹ thuật & Biện pháp Giảm thiểu (Risks & Mitigation)

| Rủi ro | Mức độ | Biện pháp giảm thiểu |
|---|:---:|---|
| **ESM Module compatibility** trong NestJS và TypeORM | Trung bình | Đã có tài liệu tiền đề trong `history/error/`, dùng cấu hình `tsconfig.json` và TypeORM DataSource chuẩn ESM. |
| **Xung đột CORS / Cookie** giữa Frontend (port 5173) và Backend (port 3000) | Cao | Dùng origin `http://127.0.0.1:5173` theo [Tech Stack](../docs/architecture/tech-stack.md), gửi cookie với credentials và `SameSite=Lax`. |
| **Rò rỉ Refresh Token** | Nghiêm trọng | Lưu Refresh token trong DB dưới dạng hash; bắt buộc thu hồi cả chuỗi nếu phát hiện token cũ được sử dụng lại. |

---

## 6. Definition of Done (DoD) Checklist cho Sprint 0

Trước khi đóng Sprint 0 và di chuyển kế hoạch sang `plans/completed/`, toàn bộ các mục sau bắt buộc phải được đánh dấu hoàn thành:

- [ ] Toàn bộ mã nguồn backend tuân thủ [Clean Code](../docs/rules/clean-code.md) và [Coding Style](../docs/rules/coding-style.md).
- [ ] Lệnh `npm run build` trong `backend/` hoàn tất thành công 0 lỗi.
- [ ] Lệnh `docker compose up -d` khởi động PostgreSQL và backend hoạt động ổn định.
- [ ] Lệnh `npm run migration:run` thực thi thành công cấu trúc bảng ban đầu.
- [ ] Bộ test tự động (`npm test` và `npm run test:e2e`) chạy pass; kiểm đủ nhánh quan trọng theo [Testing Rules](../docs/rules/testing.md).
- [ ] Không có cảnh báo bảo mật nghiêm trọng nào khi quét bằng `npm audit`.
- [ ] Swagger API hiển thị trực quan tại `http://localhost:3000/api/docs`.
- [ ] Mã nguồn được commit và tạo Pull Request theo đúng chuẩn [Git Rules](../docs/rules/git.md).
- [ ] Product Owner kiểm tra trực tiếp luồng đăng nhập, cấp token trên Swagger UI và ký duyệt nghiệm thu.
