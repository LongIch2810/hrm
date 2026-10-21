# Tech Stack

Tra công nghệ đã xác nhận và trạng thái cấu hình trước khi phát triển HRM.

## 1. Hiện trạng

Phân biệt stack đã chọn với công nghệ đang được triển khai trong repo.

- Product Owner đã xác nhận các công nghệ trong mục 2.
- `frontend/` và `backend/` hiện rỗng; chưa có mã ứng dụng hoặc entry point.
- Chưa có dependency manifest, lockfile, Dockerfile hoặc cấu hình build, lint, format và test.
- Không coi stack đã chọn là bằng chứng ứng dụng đã chạy hoặc các dependency đã tương thích.

## 2. Công nghệ đã xác nhận

Dùng các phiên bản đã được Product Owner xác nhận làm căn cứ cấu hình dự án.

| Thành phần | Công nghệ | Phiên bản đã xác nhận | Trạng thái trong repo |
|---|---|---|---|
| Ngôn ngữ frontend | TypeScript | 6.0.3 | Chưa cấu hình |
| Framework frontend | React | 19.3.1 | Chưa cài đặt |
| Thư viện component UI frontend | HeroUI (@heroui/react) | 3.2.6 | Chưa cài đặt |
| Styles và design token HeroUI | @heroui/styles | 3.2.6 | Chưa cài đặt |
| Icon frontend | lucide-react | 1.57.0 | Chưa cài đặt |
| CSS utility frontend | Tailwind CSS | 4.3.3 | Chưa cài đặt |
| Ngôn ngữ backend | TypeScript | 6.0.3 | Chưa cấu hình |
| Framework backend | NestJS | 12.1.3 | Chưa cài đặt |
| HTTP adapter backend | Express qua @nestjs/platform-express | 12.1.3 | Chưa cài đặt |
| HTTP client frontend | Fetch API có sẵn của trình duyệt | API trình duyệt | Chưa có API client |
| Runtime frontend/backend | Node.js | 22.22.2 | Chưa cấu hình trong repo |
| Cơ sở dữ liệu | PostgreSQL | 18.6 | Chưa cấu hình |
| ORM | TypeORM | 1.1.2 | Chưa cài đặt |
| Tích hợp ORM với NestJS | @nestjs/typeorm | 12.0.2 | Chưa cài đặt |
| Container | Docker | 29.4.3 | Chưa cấu hình trong repo |

- NestJS 12.1.3 là phiên bản được xác nhận sau khi kiểm tra [npm registry](https://registry.npmjs.org/@nestjs%2fcore/latest).
- Không tự nâng phiên bản đã xác nhận theo thay đổi của tag `latest`.
- Dùng Docker cho cả frontend, backend và PostgreSQL ở môi trường local theo xác nhận của Product Owner.
- Dùng ESM cho backend NestJS.
- Giữ TypeScript 6.0.3; typescript-eslint 8.71.2 khai báo hỗ trợ TypeScript từ 4.8.4 đến dưới 6.1.0.

## 3. Công cụ đã xác nhận

Áp dụng công cụ đã được Product Owner xác nhận khi bổ sung toolchain.

| Hạng mục | Công cụ | Phiên bản | Trạng thái trong repo |
|---|---|---|---|
| Package manager | npm cho frontend và backend | 10.9.7 | Chưa có manifest hoặc lockfile |
| Build frontend | Vite với React và TypeScript | 8.3.4 | Chưa cấu hình |
| Tích hợp Tailwind với Vite | @tailwindcss/vite | 4.3.3 | Chưa cấu hình |
| Linter | ESLint + typescript-eslint cho cả hai phía | 10.12.0 + 8.71.2 | Chưa cấu hình |
| Formatter | Prettier cho cả hai phía | 3.9.10 | Chưa cấu hình |
| Kiểm tra lỗ hổng phụ thuộc | npm audit, có sẵn trong npm | 10.9.7 | Chưa có manifest hoặc lockfile |
| Test runner | Vitest cho cả hai phía | 5.0.4 | Chưa cấu hình |
| NestJS test module | @nestjs/testing cho backend | 12.1.3 | Chưa cài đặt |
| React component test | @testing-library/react cho frontend | 16.3.2 | Chưa cài đặt |
| Testing Library DOM | @testing-library/dom cho frontend | 10.4.1 | Chưa cài đặt |
| DOM test environment | jsdom cho frontend | 26.1.1 | Chưa cài đặt |
| Browser E2E test | @playwright/test cho frontend | 1.52.0 | Chưa cài đặt |
| Validation backend | class-validator + class-transformer | 0.14.1 + 0.5.1 | Chưa cài đặt |
| Xác thực JWT | @nestjs/jwt; tra [Auth](auth.md) | 12.0.3 | Chưa cài đặt |
| Băm mật khẩu và phân quyền | crypto.scrypt của Node.js; Guard NestJS | Node.js 22.22.2; NestJS 12.1.3 | Chưa triển khai |
| Rate limit backend | @nestjs/throttler; tra [Security](../rules/security.md) | 6.4.0 | Chưa cài đặt |
| Chạy Docker local | Docker Compose | 5.1.3 | Chưa có cấu hình |

- Đặt manifest và lockfile riêng trong `frontend/` và `backend/`.
- Đặt `compose.yaml` ở root với ba service `frontend`, `backend` và `postgres`.

### Cấu hình local đã xác nhận

Áp dụng các port, vị trí cấu hình và cách lưu dữ liệu đã được Product Owner xác nhận.

| Thành phần | Địa chỉ truy cập từ máy local | Port |
|---|---|---|
| Frontend | `127.0.0.1` | 5173 |
| Backend | `127.0.0.1` | 3000 |
| PostgreSQL | `127.0.0.1` | 5432 |

- Chỉ công khai các port local trên `127.0.0.1`; đây là địa chỉ phía máy host, không phải hostname giao tiếp giữa container.
- Đặt `.env` và `.env.example` riêng ở root, `frontend/` và `backend/`.
- Dùng `.env` ở root cho Docker Compose; dùng `.env` tại mỗi app cho cấu hình của app tương ứng.
- Commit `.env.example` với giá trị mẫu; không commit `.env` thực tế hoặc bí mật.
- Chỉ đưa cấu hình công khai vào biến frontend `VITE_*`; không đưa secret vào bundle.
- Dùng named volume `postgres-data` cho PostgreSQL để giữ dữ liệu khi tạo lại container.
- PostgreSQL dùng image chính thức theo phiên bản đã xác nhận; không tạo Dockerfile riêng.
- Tra vị trí Dockerfile và cấu hình công cụ tại [Folder Structure](folder-structure.md).

### Các thông số kỹ thuật đã xác nhận

Áp dụng đầy đủ các công cụ và phiên bản tương thích đã được phê duyệt.

**Status:** Confirmed

| Hạng mục | Quyết định đã xác nhận |
|---|---|
| HTTP adapter | `@nestjs/platform-express` v12.1.3 tương thích với NestJS 12.1.3. |
| Validation backend | `class-validator` v0.14.1 và `class-transformer` v0.5.1 cho validation DTOs. |
| Công cụ test | `@nestjs/testing` v12.1.3, `@testing-library/react` v16.3.2, `@testing-library/dom` v10.4.1, `jsdom` v26.1.1, `@playwright/test` v1.52.0. |
| Rate limiting backend | `@nestjs/throttler` v6.4.0 (100 req/min cho public, 5 req/min cho login). |
| Danh mục biến môi trường | Đã chuẩn hóa qua `.env.example` tại root (`POSTGRES_*`), `backend/` (`PORT`, `DATABASE_URL`, `JWT_*`, `CORS_ORIGIN`) và `frontend/` (`VITE_API_BASE_URL`). |

## 4. Lệnh phát triển

Dùng các quy ước lệnh đã được Product Owner xác nhận khi tạo cấu hình dự án.

- Các lệnh dưới đây chưa được cấu hình hoặc kiểm chứng trong repo; không coi chúng là lệnh đang chạy được.
- Lệnh npm chạy riêng trong `frontend/` hoặc `backend/`; lệnh Docker Compose chạy tại root.

| Thao tác | Thư mục | Lệnh đã xác nhận | Điều kiện hoặc hành vi |
|---|---|---|---|
| Tạo/cập nhật dependency | `frontend/` hoặc `backend/` | `npm install` | Cần manifest; tạo hoặc cập nhật lockfile. |
| Cài theo lockfile | `frontend/` hoặc `backend/` | `npm ci` | Cần manifest và lockfile đồng bộ. |
| Chạy ứng dụng local | `frontend/` hoặc `backend/` | `npm run dev` | Cần script `dev`; cập nhật khi sửa code. |
| Build | `frontend/` hoặc `backend/` | `npm run build` | Cần script `build`; build ứng dụng tương ứng. |
| Lint | `frontend/` hoặc `backend/` | `npm run lint` | Cần script `lint`; kiểm tra, không tự sửa. |
| Format | `frontend/` hoặc `backend/` | `npm run format` | Cần script `format`; ghi thay đổi vào file. |
| Test | `frontend/` hoặc `backend/` | `npm test` | Cần script `test`; chạy Vitest một lượt, không watch. |
| Unit test | `frontend/` hoặc `backend/` | `npm run test:unit` | Cần script; chạy unit test tương ứng. |
| Integration test | `frontend/` hoặc `backend/` | `npm run test:integration` | Cần script; dùng database test riêng khi kiểm persistence. |
| E2E test | `frontend/` hoặc `backend/` | `npm run test:e2e` | Cần script; frontend chạy Playwright Test, backend chạy Vitest qua HTTP. |
| Toàn bộ test | `frontend/` hoặc `backend/` | `npm run test:all` | Cần script; frontend gồm Vitest và Playwright Test. |
| Kiểm tra lỗ hổng | `frontend/` hoặc `backend/` | `npm audit --audit-level=high` | Cần manifest/lockfile; chặn high/critical, rà moderate/low. |
| Chạy cả ba service | Root | `docker compose up -d --build` | Cần `compose.yaml` và cấu hình build; chạy nền. |
| Chỉ chạy PostgreSQL | Root | `docker compose up -d postgres` | Cần service `postgres` và cấu hình tương ứng. |
| Dừng và gỡ container | Root | `docker compose down` | Không thêm `-v`. |

- Không coi lệnh mặc định của framework là lệnh có sẵn trong repo.

## 5. Tài liệu liên quan

Tra nguồn yêu cầu và quy tắc trước khi bổ sung cấu hình.

- [UI Rules](../rules/ui.md): Dùng HeroUI cho component và Tailwind CSS cho layout; tra token, theme và cấu hình dùng chung.
- [PRD](../PRD.md): Tra yêu cầu sản phẩm; không suy ra công nghệ từ chi tiết nghiệp vụ chưa xác nhận.
- [REST API Rules](../rules/rest-api.md): Tra quy tắc thiết kế và triển khai REST API.
- [AGENTS.md](../../AGENTS.md): Tra quy tắc tài liệu và cách xử lý quyết định chưa xác nhận.
