Trạng thái: quy tắc kỹ thuật; frontend có prototype, backend chưa triển khai.

# Quy tắc clean code

Áp dụng cho code TypeScript ở frontend React và backend NestJS khi dự án bắt đầu có code.

## 1. Phạm vi và nguyên tắc chung

Giữ thay đổi đúng yêu cầu và dễ kiểm chứng.

- Bắt buộc giữ đúng hành vi, biên lớp, validation, xử lý lỗi và bảo mật theo tài liệu liên quan.
- Xem giới hạn độ dài là khuyến nghị; giải thích ngắn trong PR khi vượt mà việc tách làm code khó hiểu hơn.
- Giữ code trong feature; chỉ tạo abstraction dùng chung khi có nhu cầu dùng lại thật hoặc trách nhiệm riêng rõ ràng.
- Tra [Naming](naming.md) cho tên code và [Layers](../architecture/layers.md) cho hướng phụ thuộc; không đặt lại quy tắc ở đây.

## 2. Bảng giới hạn

Xem các ngưỡng này là khuyến nghị; đếm dòng có code, bỏ dòng trống và dòng chỉ có comment.

| Chỉ số | Giá trị | Áp dụng cho |
|---|---|---|
| Độ dài hàm | Tối đa 40 dòng | Hàm/method frontend và backend |
| Số tham số | Tối đa 3 | Hàm/method frontend và backend |
| Mức lồng nhau | Tối đa 2 tầng `if`/loop/`try` | Hàm/method; không tính JSX/object literal |
| Độ dài file | Tối đa 300 dòng | File code frontend và backend |

- Khi vượt ngưỡng mà tách làm code khó hiểu hơn, giữ cấu trúc và ghi lý do ngắn trong PR.

## 3. Quy tắc theo nhóm

Áp dụng các quy tắc đã xác nhận; giữ error contract chưa chốt ở mục TODO.

### Hàm và cấu trúc

Giữ mỗi hàm một mục đích và import theo hướng phụ thuộc tại [Layers](../architecture/layers.md).

| Quy tắc | Làm | Không làm |
|---|---|---|
| Một việc | `loadEmployees()` chỉ tải dữ liệu | `loadEmployeesAndSendEmail()` gộp hai mục đích |
| Điều kiện chặn | `if (items.length === 0) return [];` | Bọc toàn bộ nhánh chính trong `if (items.length > 0) { ... }` |
| Side effect | Gọi API từ API client hoặc event/Effect theo [Layers](../architecture/layers.md) | Gọi `fetch()` trong render React |
| Import | Chỉ import symbol dùng; nhóm external trước internal | Import cả module khi chỉ dùng một symbol |
| Type-only import | `import type { Employee } from './employee.js';` | Import runtime chỉ để dùng type |
| Tách file | Tách theo trách nhiệm/component/service khi vượt 300 dòng | Tách theo số dòng thành nhiều file không có ranh giới |

### Lặp, hằng số và cấu hình

Giữ giá trị có nguồn rõ và chỉ tách đoạn lặp khi cùng ý nghĩa, có khả năng sửa cùng nhau.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Code lặp | Tách helper khi cùng hành vi xuất hiện từ 3 nơi | Tạo helper cho một lần dùng |
| Literal | Dùng hằng có tên cho giá trị khó hiểu hoặc lặp | Rải `20` làm page size khi giá trị chưa duyệt |
| Ngoại lệ literal | Giữ `0`/`1` khi nghĩa rõ | Tạo `const ZERO = 0` không thêm ý nghĩa |
| Vị trí hằng | Giữ gần nơi dùng; chuyển sang chung khi nhiều nơi cần | Gom mọi hằng vào một file toàn cục |
| Cấu hình | Đọc tập trung và kiểm biến bắt buộc khi app khởi động | Đọc `process.env` rải trong service |

- Không hard-code quy tắc nghiệp vụ hoặc giá trị cấu hình chưa được duyệt; tra [đặc tả yêu cầu](../prd/index.md) và [Tech Stack](../architecture/tech-stack.md).
- Dùng vị trí cấu hình theo [Folder Structure](../architecture/folder-structure.md); frontend chỉ đưa biến công khai qua `VITE_*`.

### Kiểu dữ liệu và validate

Giữ type rõ ở biên hệ thống và validate đúng lớp đã chốt.

| Quy tắc | Làm | Không làm |
|---|---|---|
| TypeScript | Bật `strict: true` trong cấu hình hai app | Tắt strict để bỏ qua lỗi kiểu |
| Dữ liệu chưa biết | Dùng `unknown`, kiểm kiểu trước khi dùng | Ép thẳng `value as Employee` khi chưa kiểm |
| `any` | Chỉ ngoại lệ khi type thư viện sai, ghi lý do một dòng | Dùng explicit `any` để né type error |
| Return type | Khai báo cho Service public/exported, API client và hook | Để contract public đổi theo suy luận ngoài ý muốn |
| Request backend | Validate input một lần bằng DTO/ValidationPipe tại biên | Lặp cùng validation trong Controller và Service |
| Nghiệp vụ | Kiểm business rule trong Service | Chỉ kiểm ở frontend |

- Tra [Backend Layers](../architecture/layers/backend-nestjs.md) và [REST API Rules](rest-api.md) cho validation request đã chốt.
- Tra [UI Rules](ui.md) cho validation form; không tự đặt quy tắc field chưa được duyệt.

### Xử lý lỗi và log

Giữ nguyên nhân lỗi khi truyền qua các lớp; chỉ ghi log vận hành cần thiết.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Phát hiện lỗi | Ném lỗi rõ nghĩa tại nơi phát hiện | Trả `null`/`false` cho mọi lỗi |
| Catch | Chỉ catch để phục hồi hoặc thêm ngữ cảnh rồi ném lại | Dùng `catch {}` hoặc catch rộng ở mọi Service |
| HTTP response | Để Exception Filter chung ánh xạ theo contract | Tạo format lỗi riêng trong từng Controller |
| Log `error` | Ghi lỗi bất ngờ và ngữ cảnh theo [Security](security.md) | Ghi dữ liệu cấm tại Security |
| Log `warn` | Ghi tình huống có thể phục hồi | Ghi mọi thao tác bình thường thành cảnh báo |
| Log `log`/`debug` | Dùng `log` cho vòng đời app; `debug` chỉ local | Bật `debug` ở mọi môi trường |

- Không tạo class lỗi riêng nếu chưa có nhu cầu thực; tra [Backend Layers](../architecture/layers/backend-nestjs.md) cho Exception Filter chung.
- Tra [Frontend Layers](../architecture/layers/frontend-react.md) cho lỗi API và lỗi render; không bắt lỗi render bằng API client.
- Tra [Security](security.md) cho dữ liệu cấm ghi log và audit event; error contract tuân thủ chuẩn hóa trong [REST API Rules](rest-api.md).

### Comment và thay đổi

Giữ comment hữu ích và diff trong đúng phạm vi tác vụ.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Comment | Giải thích lý do/ràng buộc khó thấy | Viết `// increase count` cho `count++` |
| JSDoc | Giải thích contract công khai khi type chưa đủ | Lặp lại type đã rõ trong JSDoc |
| Code bỏ lại | Xóa code không dùng | Giữ code bị comment trong file |
| TODO/FIXME | `TODO: <việc cụ thể>`; `FIXME: <lỗi cụ thể>`; thêm mã việc nếu có | Để `TODO: fix later` không có hành động |
| Phạm vi sửa | Sửa code, caller và test cần thiết cho tác vụ | Refactor phần khác khi chưa được yêu cầu |
| Thư viện | Dùng công cụ đã chốt; xin xác nhận gói mới và cập nhật [Tech Stack](../architecture/tech-stack.md) | Tự thêm dependency để tránh vài dòng code |

- Không để TODO/FIXME làm placeholder cho hành vi bắt buộc trước khi báo hoàn thành.
- Khi gói mới được xác nhận, cập nhật manifest và lockfile của app liên quan theo [Folder Structure](../architecture/folder-structure.md).

## 4. Kiểm tra bằng linter

Khi tạo `frontend/eslint.config.mjs` và `backend/eslint.config.mjs`, dùng rule phù hợp với mức bắt buộc/khuyến nghị đã chốt.

| Mục kiểm | Rule | Mức |
|---|---|---|
| `any` rõ ràng | `@typescript-eslint/no-explicit-any` | error; ngoại lệ type thư viện sai cần lý do |
| Import type | `@typescript-eslint/consistent-type-imports` | error |
| Import/biến không dùng | `@typescript-eslint/no-unused-vars` | error |
| Catch rỗng | `no-empty` | error |
| Độ dài hàm/file | `max-lines-per-function`, `max-lines` | warn; bỏ dòng trống/comment |
| Số tham số/lồng nhánh | `max-params`, `max-depth` | warn |

- Bật `strict: true` trong `tsconfig*.json` của hai app khi có code; đây là kiểm tra TypeScript, không phải ESLint.
- Các file cấu hình và script lint chưa tồn tại; không báo các rule đã chạy.
- Review thủ công một việc mỗi hàm, side effect, import order, hướng phụ thuộc và `try` lồng nhau; linter trên không kiểm đủ.

## 5. Checklist tự kiểm

Kiểm tra phần đã sửa trước khi báo hoàn thành; tra lệnh và trạng thái cấu hình tại [Tech Stack](../architecture/tech-stack.md).

- [ ] Đối chiếu hành vi với yêu cầu/PRD, hướng gọi với [Layers](../architecture/layers.md) và tên với [Naming](naming.md).
- [ ] Kiểm tra caller và cấu hình bị ảnh hưởng; tra [Testing](testing.md) cho test cần chạy.
- [ ] Kiểm tra input, quyền, lỗi và log; không ghi dữ liệu nhạy cảm theo [REST API Rules](rest-api.md).
- [ ] Khi script đã có, chạy `npm run lint`, `npm run format` và `npm run build` trong app liên quan; kiểm tra diff sau format. Tra [Testing](testing.md) cho lệnh test.
- [ ] Ghi rõ lệnh chưa chạy hoặc lỗi còn lại; không báo kiểm tra đạt khi chưa chạy.

## 6. Quyết định Clean Code đã xác nhận

**Status:** Confirmed

- Error contract chuẩn hóa toàn hệ thống theo [API spec](../api-spec.md#5-response-thành-công-và-lỗi):
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Dữ liệu không hợp lệ",
      "details": [{"field": "pageSize", "code": "INVALID_VALUE", "message": "pageSize phải từ 1 đến 100"}]
    },
    "meta": {"requestId": "request-id", "timestamp": "21/10/2026 15:30:00"}
  }
  ```
- Tra [Security](security.md) cho quy tắc bảo mật và [Testing](testing.md) cho quy tắc test.
