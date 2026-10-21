Trạng thái: thiết kế dự kiến, chưa có code

# Quy tắc đặt tên

Áp dụng quy tắc này cho code TypeScript, React, NestJS, dữ liệu, API và Git khi các mục tương ứng được xác nhận.

## 1. Nguyên tắc chung

Giữ một tên nhất quán cho mỗi khái niệm trong toàn hệ thống.

- Dùng tiếng Anh cho identifier, tên file và tên API.
- Dùng một tên tiếng Anh chuẩn cho mỗi thuật ngữ nghiệp vụ trong [PRD](../PRD.md).
- Chỉ dùng từ viết tắt kỹ thuật phổ biến hoặc có trong bảng cho phép của tài liệu này.
- Không dùng tiếng Việt không dấu trong tên code.

## 2. Quy ước theo thành phần

Áp dụng bảng theo app; giữ nguyên các file và vị trí đặc biệt tại [Folder Structure](../architecture/folder-structure.md).

- Với tài liệu Markdown, tra quy tắc tên file tại [AGENTS.md](../../AGENTS.md#coding-style--naming-conventions).

### TypeScript chung

Dùng tên thể hiện vai trò và kiểu dữ liệu của identifier.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Biến, tham số, local const | camelCase | `employeeCount` | `employee_count` |
| Hằng cấu hình | UPPER_SNAKE_CASE | `MAX_RETRIES` | `max_retries` |
| Biến môi trường | UPPER_SNAKE_CASE; frontend giữ `VITE_*` | `VITE_EXAMPLE` | `viteExample` |
| Hàm, method | động từ + camelCase | `loadEmployees` | `employeesLoad` |
| Hàm async | động từ + camelCase, không thêm `Async` | `loadEmployees` | `loadEmployeesAsync` |
| Boolean/hàm Boolean | `is`/`has`/`can`/`should` + PascalCase | `isActive` | `activeFlag` |
| Collection | danh từ số nhiều | `employees` | `employeeList` |
| Class, interface, type, enum | PascalCase; interface không thêm `I` | `Employee`, `EmployeeData` | `IEmployee` |
| Enum member | PascalCase | `EmployeeStatus.Active` | `EmployeeStatus.ACTIVE` |

### Backend NestJS

Đặt tên file theo vai trò của class hoặc artifact.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Thư mục module | kebab-case | `employee-records/` | `employeeRecords/` |
| File module | kebab-case`.module.ts` | `employees.module.ts` | `EmployeesModule.ts` |
| File controller | kebab-case`.controller.ts` | `employees.controller.ts` | `employees.ts` |
| File service | kebab-case`.service.ts` | `employees.service.ts` | `EmployeesService.ts` |
| File DTO | kebab-case`.dto.ts` | `create-employee.dto.ts` | `CreateEmployee.ts` |
| File entity | kebab-case`.entity.ts` | `employee.entity.ts` | `Employee.ts` |
| Guard, Pipe, Filter, Interceptor | kebab-case + hậu tố loại | `roles.guard.ts` | `roles.ts` |
| Test backend | cùng tên file nguồn + `.spec.ts` | `employees.service.spec.ts` | `employees.service.test.ts` |
| Test integration backend | hậu tố `.integration.spec.ts` | `employees.integration.spec.ts` | `employees.integration.test.ts` |
| Test E2E backend | hậu tố `.e2e.spec.ts` | `employees.e2e.spec.ts` | `employees.e2e.test.ts` |
| Migration TypeORM | `<timestamp>-<kebab-case>.ts` | `20261015090000-create-employees.ts` | `001CreateEmployees.ts` |

### Frontend React

Phân biệt file component, hook, test và style bằng tên file.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Thư mục feature | kebab-case | `employee-records/` | `EmployeeRecords/` |
| File component | PascalCase`.tsx` | `EmployeeCard.tsx` | `employee-card.tsx` |
| File hook | `use` + PascalCase`.ts` | `useEmployees.ts` | `EmployeesHook.ts` |
| File khác | kebab-case`.ts`/`.tsx` | `employee-api.ts` | `employeeApi.ts` |
| Test frontend | cùng tên file nguồn + `.test.tsx` | `EmployeeCard.test.tsx` | `EmployeeCard.spec.tsx` |
| Test integration frontend | hậu tố `.integration.test.tsx` | `EmployeeCard.integration.test.tsx` | `EmployeeCard.integration.spec.tsx` |
| Test E2E frontend | hậu tố `.e2e.spec.ts` | `employee-login.e2e.spec.ts` | `employee-login.e2e.test.ts` |
| Style riêng | cùng tên component + `.module.css` | `EmployeeCard.module.css` | `employee-card.css` |
| Style chung | Giữ tên đã chốt | `globals.css` | `global.css` |

Dùng tên React theo vai trò của component, hook và props.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Component | PascalCase | `EmployeeCard` | `employeeCard` |
| Hook | `use` + PascalCase | `useEmployees` | `EmployeesHook` |
| Type props | `<Component>Props` | `EmployeeCardProps` | `Props` |
| Prop callback | `on` + PascalCase | `onSave` | `handleSave` |
| Hàm handler | `handle` + PascalCase | `handleSave` | `onSave` |
| Wrapper HeroUI | `App` + tên component | `AppButton` | `Button` |

### Database PostgreSQL

Dùng tên ổn định trong migration; các tên dưới đây chỉ minh họa quy ước, không xác lập schema.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Bảng | snake_case số nhiều | `employees` | `Employee` |
| Bảng liên kết | hai tên bảng theo thứ tự chữ cái, nối `_` | `departments_employees` | `employees_departments` |
| Cột | snake_case | `first_name` | `firstName` |
| Khóa ngoại | `<quan-hệ>_id` | `department_id` | `id_department` |
| Index | `idx_<table>_<columns>` | `idx_employees_department_id` | `idx_001` |
| Unique constraint | `uq_<table>_<columns>` | `uq_employees_email` | `uq_001` |
| Foreign key constraint | `fk_<table>_<columns>` | `fk_employees_department_id` | `fk_001` |

- Khai báo tên bảng và cột tường minh trong TypeORM khi tên Entity/property khác tên database.

### REST API

Giữ quy ước tên chung; chốt resource, quan hệ và endpoint cụ thể trong đặc tả API.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Field JSON | camelCase | `employeeId` | `employee_id` |
| Query parameter | camelCase | `departmentId` | `department_id` |
| Đường dẫn resource | danh từ số nhiều, kebab-case | `/leave-requests` | `/leaveRequest` |

- Tra [REST API Rules](rest-api.md) trước khi định nghĩa endpoint; không suy ra resource từ tên bảng.

### Permission và mã lỗi

Đặt tên theo mẫu chung; xác nhận từng permission và mã lỗi trong tài liệu sở hữu contract.

| Loại | Kiểu viết | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Permission | `<resource>:<action>` chữ thường | `employees:read` | `EMPLOYEE_READ` |
| Mã lỗi | `<DOMAIN>_<REASON>` UPPER_SNAKE_CASE | `EXAMPLE_FAILURE` | `example-failure` |

- Tra [Auth](../architecture/auth.md) cho mô hình quyền; không tự cấp quyền từ mẫu tên.
- Chốt permission và mã lỗi cụ thể trong đặc tả API khi tài liệu đó có.

## 3. Từ vựng nghiệp vụ

Giữ một tên gốc cho từng khái niệm module đã xác nhận trong [PRD](../PRD.md).

| Khái niệm trong PRD | Tên dùng trong code |
|---|---|
| Nhân viên | `employee` |
| Phòng ban | `department` |
| Chấm công | `attendance` |
| Nghỉ phép | `leave` |
| Quản lý lương | `payroll` |
| Tuyển dụng | `recruitment` |
| Tiếp nhận nhân viên | `onboarding` |
| Nghỉ việc | `offboarding` |
| Hiệu suất | `performance` |
| Hợp đồng | `contract` |
| Đào tạo | `training` |
| Báo cáo | `report` |
| Quản trị hệ thống | `administration` |

**Status:** Confirmed

- Thuật ngữ con dùng chung đã được chuẩn hóa trong PRD Phụ lục C (Glossary): `timesheet`, `overtime` (`ot`), `leave_request`, `payslip`, `salary_structure`, `candidate`, `job_posting`, `interview_schedule`, `offer_letter`, `evaluation_period`, `goal`, `kpi_metric`, `okr_key_result`, `course`, `certificate`, `audit_log`.

## 4. Git

Áp dụng mẫu sau khi tạo branch, commit hoặc release tag.

| Loại | Mẫu | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Branch | `<type>/<kebab-name>` | `docs/naming-rules` | `Docs/NamingRules` |
| Commit | `<type>: <verb>...` hoặc `<type>(<scope>): <verb>...` | `docs: add naming rules` | `update naming` |
| Tag | `vMAJOR.MINOR.PATCH` | `v0.1.0` | `0.1.0` |

- Dùng `feat`, `fix`, `docs`, `refactor`, `test` hoặc `chore` cho `<type>` của branch và commit.

## 5. Tên cần tránh và trường hợp đặc biệt

Giữ tên có nghĩa và chỉ dùng viết tắt đã được chấp thuận.

| Trường hợp | Dùng | Tránh |
|---|---|---|
| Viết tắt kỹ thuật | `API`, `HTTP`, `URL`, `ID`, `DTO`, `UI` | Viết tắt tự tạo |
| Viết tắt nghiệp vụ | `HRM`, `RBAC`, `KPI`, `OKR`; tra [Glossary PRD](../PRD.md#phụ-lục-c-glossary) | Viết tắt chưa có trong PRD |
| Tên đơn lẻ mơ hồ | `employeeRecords` | `data`, `info`, `temp`, `foo`, `misc` |
| Acronym trong identifier | `employeeId`, `apiClient`, `RbacGuard` | `employeeID`, `APIClient`, `RBACGuard` |
| Một bản ghi | `employee`, `Employee` | `employees`, `Employees` |
| Tập hợp | `employees` | `employeeList` |

- Dùng số nhiều cho collection, bảng và đường dẫn resource; dùng số ít cho một bản ghi hoặc Entity.

## 6. Kiểm tra tự động

Khi tạo cấu hình ESLint, kiểm tra các quy tắc identifier có thể kiểm tự động.

- Dùng `@typescript-eslint/naming-convention` trong `frontend/eslint.config.mjs` và `backend/eslint.config.mjs`.
- Cấu hình hai file trên chưa tồn tại; không coi quy tắc đã được linter thực thi.
- Kiểm tra tên file, database và API khi review; rule trên không kiểm các tên đó.

## 7. Quyết định Định danh đã xác nhận

**Status:** Confirmed

- Đã xác nhận chuẩn hóa 100% thuật ngữ con qua Phụ lục C của PRD và ma trận Data Classifications.
- Permission, mã lỗi và endpoint cụ thể tuân thủ cấu trúc chuẩn: `<module>:<resource>:<action>` cho permissions (ví dụ `emp:profile:read`, `leave:request:approve`), mã lỗi dạng UPPER_SNAKE_CASE chuẩn RESTful (`EMPLOYEE_NOT_FOUND`, `INVALID_CREDENTIALS`), endpoint danh từ số nhiều `/api/v1/<resources>`.
