# Folder Structure

Tra cây thư mục hiện tại và quy tắc đặt file mới trước khi thêm tài liệu hoặc code.

## 1. Cấu trúc hiện tại

Đọc cây dưới đây như hiện trạng repo, không phải cấu trúc ứng dụng đã triển khai.

```text
hrm/
├── .agents/
│   └── skills/
├── .codex/
│   └── agents/
├── .git/
├── backend/                    # Rỗng
├── frontend/                   # Ứng dụng React với dữ liệu giả lập
├── docs/
│   ├── PRD.md
│   ├── prd/
│   │   ├── index.md
│   │   ├── business-rule/        # Chi tiết quy tắc nghiệp vụ 12 module (có index.md)
│   │   ├── details/
│   │   ├── function-requirement/ # Chi tiết 12 module (có index.md)
│   │   ├── usecase/              # Use cases 12 module (có index.md)
│   │   └── workflow/             # Workflows quy trình (có index.md)
│   ├── architecture/
│   │   ├── index.md
│   │   ├── tech-stack.md
│   │   ├── folder-structure.md
│   │   ├── layers.md
│   │   ├── layers/
│   │   │   ├── backend-nestjs.md
│   │   │   └── frontend-react.md
│   │   └── overview.md
│   ├── design/                   # UI/UX Design System, tokens và 68 đặc tả màn hình
│   │   ├── README.md
│   │   ├── design-system.md
│   │   ├── design-tokens.css
│   │   └── screens/              # 15 file đặc tả 68 màn hình
│   ├── process/                  # Đề xuất quy trình, chờ Product Owner duyệt
│   │   ├── agile-scrum.md        # Đề xuất Scrum, vai trò, DoR, DoD
│   │   └── sprint-roadmap.md     # Đề xuất lộ trình Sprint
│   └── rules/
│       ├── index.md
│       ├── clean-code.md
│       ├── coding-style.md
│       ├── database.md
│       ├── git.md
│       ├── naming.md
│       ├── rest-api.md
│       ├── security.md
│       ├── testing.md
│       └── ui.md
├── history/
│   └── error/
│       ├── incomplete-react-request-and-error-handling.md
│       └── missing-nestjs-interceptor.md
├── plans/
│   ├── active/
│   └── completed/
├── tasks/
│   ├── active/
│   └── completed/
├── AGENTS.md
└── README.md                   # Rỗng (cho git repository)
```

- Frontend có prototype dùng dữ liệu giả lập tại `frontend/`; độ phủ 68 màn hình chưa được kiểm chứng.
- Backend NestJS và Docker Compose chưa được khởi tạo.
- Index kiến trúc đã sẵn sàng tại [docs/architecture/index.md](index.md).

## 2. Vai trò thư mục

Đặt nội dung theo vai trò đã được xác nhận hoặc hiện diện trong repo.

| Thư mục | Nội dung |
|---|---|
| `frontend/` | Ứng dụng React với mock store; độ phủ màn hình chưa được kiểm chứng. |
| `backend/` | Ứng dụng NestJS; hiện rỗng. |
| `docs/` | Tài liệu dự án, gồm PRD, kiến trúc, quy trình và quy tắc. |
| `docs/prd/function-requirement/` | Chi tiết yêu cầu của 12 module; tra mục 6 trong [PRD](../PRD.md). |
| `docs/prd/business-rule/` | Quy tắc nghiệp vụ chi tiết của 12 module; tra mục 8 trong [PRD](../PRD.md). |
| `docs/prd/index.md` | Mục lục các đặc tả chi tiết; tra [PRD](../PRD.md) cho tổng quan và nghiệm thu. |
| `docs/prd/details/` | Quy tắc nghiệp vụ, NFR, giả định/rủi ro và dữ liệu khái quát theo từng file. |
| `docs/prd/usecase/` | User stories, use cases và các luồng liên quan; tra mục 7 trong [PRD](../PRD.md). |
| `docs/prd/workflow/` | Các workflow đã biết; tra mục 9 trong [PRD](../PRD.md). |
| `docs/design/` | Hệ thống thiết kế UI/UX, tokens và 68 tài liệu màn hình. |
| `docs/process/` | Đề xuất quy trình Agile Scrum và lộ trình Sprint đang chờ duyệt. |
| `docs/architecture/index.md` | Mục lục tài liệu kiến trúc kỹ thuật của hệ thống. |
| `docs/architecture/` | Công nghệ, cấu trúc thư mục, phân lớp và bức tranh tổng thể. |
| `docs/architecture/layers/` | Tài liệu phân lớp riêng cho frontend React và backend NestJS. |
| `docs/rules/` | Quy tắc kỹ thuật cho lập trình viên và agent (clean code, coding style, naming, API, security, UI, test, git; có index.md). |
| `plans/active/` | Kế hoạch đang thực hiện. |
| `plans/completed/` | Kế hoạch đã hoàn tất. |
| `tasks/active/` | Công việc kỹ thuật đang thực hiện. |
| `tasks/completed/` | Công việc kỹ thuật đã hoàn tất. |
| `history/` | Lưu ghi chép lỗi tại `history/error/` để agent sau tra cứu. |
| `.agents/skills/` | Các skill cục bộ của dự án. |
| `.codex/agents/` | Thư mục dành cho cấu hình agent Codex; hiện rỗng. |
| `.git/` | Metadata Git; không đặt code hoặc tài liệu dự án tại đây. |

## 3. Quy tắc đặt file mới

Áp dụng các vị trí đã được Product Owner xác nhận khi tạo file; các đường dẫn ứng dụng dưới đây chưa tồn tại.

| Loại file | Vị trí |
|---|---|
| Code frontend thuộc tính năng | `frontend/src/features/<feature>/` |
| Code backend thuộc module | `backend/src/modules/<module>/` |
| Entry point frontend | `frontend/src/main.tsx` |
| Component gốc frontend | `frontend/src/App.tsx` |
| Code dùng chung frontend | `frontend/src/shared/` |
| API client chung | `frontend/src/shared/api/client.ts` |
| Component dùng chung | `frontend/src/shared/components/` |
| Wrapper UI dùng chung khi cần | `frontend/src/shared/components/ui/`; tra [UI Rules](../rules/ui.md). |
| Styles và design token frontend | `frontend/src/styles/globals.css` |
| Error Boundary gốc | `frontend/src/shared/components/ErrorBoundary.tsx` |
| Hook dùng chung | `frontend/src/shared/hooks/` |
| Component, hook, type riêng của feature | `components/`, `hooks/`, `types/` trong feature khi cần. |
| Bootstrap backend | `backend/src/main.ts` |
| Module gốc backend | `backend/src/app.module.ts` |
| Guard/Pipe/Filter/Interceptor dùng chung | Các thư mục `guards/`, `pipes/`, `filters/`, `interceptors/` trong `backend/src/common/`. |
| Cấu hình ứng dụng backend | `backend/src/config/` |
| File module/controller/service | Gốc thư mục module tương ứng trong `backend/src/modules/<module>/`. |
| DTO riêng của module | `dto/` trong module tương ứng. |
| Entity thuộc module | `entities/` trong module sở hữu Entity. |
| TypeORM DataSource | `backend/src/database/data-source.ts` |
| Migration | `backend/src/database/migrations/` |
| Unit test | Cạnh file nguồn được kiểm thử. |
| Test tích hợp/E2E frontend | `frontend/test/` khi bổ sung. |
| Test tích hợp/E2E backend | `backend/test/` khi bổ sung. |
| Manifest và lockfile frontend | Trong `frontend/`. |
| Manifest và lockfile backend | Trong `backend/`. |
| Cấu hình ESLint, Prettier, Vitest | `eslint.config.mjs`, `prettier.config.mjs`, `vitest.config.ts` tại gốc mỗi app. |
| Cấu hình Vite | `frontend/vite.config.ts` |
| Cấu hình TypeScript | Các file `tsconfig*.json` tại gốc app tương ứng. |
| Dockerfile frontend | `frontend/Dockerfile` |
| Dockerfile backend | `backend/Dockerfile` |
| Cấu hình Docker Compose local | `compose.yaml` tại root. |
| Biến môi trường và file mẫu cho Compose | `.env`, `.env.example` tại root. |
| Biến môi trường và file mẫu frontend | `frontend/.env`, `frontend/.env.example`. |
| Biến môi trường và file mẫu backend | `backend/.env`, `backend/.env.example`. |
| Tài liệu kiến trúc | `docs/architecture/` |
| Chi tiết module PRD | `docs/prd/function-requirement/` |
| Tài liệu quy tắc | `docs/rules/` |
| Ghi chép lỗi và cách đã sửa | `history/error/` khi bổ sung. |

- Tra [Naming](../rules/naming.md) trước khi đặt tên file hoặc thư mục; giữ các tên cố định trong bảng trên.
- Đặt kế hoạch và công việc vào `active/` hoặc `completed/` theo trạng thái tương ứng.
- Commit `.env.example` với giá trị mẫu; không commit `.env` thực tế hoặc bí mật.
- Ghi lại lỗi gặp khi review hoặc thực hiện công việc, kèm cách đã sửa, tại `history/error/`.
- Dùng ghi chép tại `history/error/` để agent sau tra cứu và tránh lặp lại lỗi đã gặp.
- Tuân thủ [Layers](layers.md) khi đặt Controller, Service, API client và hook; không suy ra thư mục con chưa được xác nhận.
- Service dùng Repository có sẵn của TypeORM; không tạo lớp Repository riêng hoặc thư mục dành cho Repository riêng.
- PostgreSQL dùng image chính thức; không tạo Dockerfile riêng.
- Tra công cụ, phiên bản và lệnh tại [Tech Stack](tech-stack.md).

## 4. Các mục cần xác nhận

Kiểm tra trạng thái xác nhận trước khi thêm vị trí file ngoài quy tắc hiện tại.

- Không còn mục vị trí file chờ xác nhận trong phạm vi đã phỏng vấn.
- Khi cần vị trí ngoài bảng quy tắc, ghi `TODO: cần xác nhận` và hỏi Product Owner trước khi tạo file phụ thuộc.

## 5. Tài liệu liên quan

Tra chi tiết trước khi thay đổi cấu trúc hoặc trách nhiệm code.

- [Overview](overview.md): Tra thành phần chính và kết nối hệ thống.
- [Layers](layers.md): Tra trách nhiệm và hướng gọi giữa các lớp.
- [Tech Stack](tech-stack.md): Tra stack và quy ước công cụ.
- [AGENTS.md](../../AGENTS.md): Tra quy tắc tài liệu và cách xử lý quyết định còn thiếu.
