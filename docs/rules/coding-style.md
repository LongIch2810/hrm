Trạng thái: thiết kế dự kiến, chưa có code

# Quy ước coding style

Dùng tài liệu này cho cách trình bày code TypeScript của frontend React và backend NestJS.

## 1. Nguyên tắc

Dùng cấu hình công cụ làm nguồn chính khi bắt đầu có code.

- Dùng Prettier để định dạng; dùng ESLint để kiểm cú pháp và quy tắc code.
- Tra [Naming](naming.md) cho đặt tên và [Clean Code](clean-code.md) cho thiết kế code.
- Tra [Folder Structure](../architecture/folder-structure.md) cho vị trí cấu hình và [Tech Stack](../architecture/tech-stack.md) cho phiên bản, lệnh chạy.

## 2. Công cụ và lệnh

Các file cấu hình và script dưới đây chưa có trong repo.

| Công cụ | Cấu hình | Lệnh |
|---|---|---|
| Prettier | `frontend/prettier.config.mjs`, `backend/prettier.config.mjs` | `npm run format` tại app liên quan; ghi file |
| ESLint + typescript-eslint | `frontend/eslint.config.mjs`, `backend/eslint.config.mjs` | `npm run lint` tại app liên quan; chỉ kiểm tra |

- Chưa cài hook trước commit; agent chạy format và lint khi script đã tồn tại.

## 3. Bảng quy ước

| Mục | Quy tắc | Ví dụ đúng | Ví dụ sai |
|---|---|---|---|
| Thụt lề | Dùng `tabWidth: 2`, `useTabs: false`. | `if (ready) {` rồi thụt 2 spaces | Thụt 4 spaces |
| Độ rộng dòng | Đặt `printWidth: 100` làm mục tiêu, không coi là giới hạn cứng. | Prettier ngắt object dài | Ép ngắt URL giữa chuỗi |
| Dấu nháy | Dùng `singleQuote: true`, `jsxSingleQuote: false`. | `const name = 'An';` | `const name = "An";` |
| Chấm phẩy | Dùng `semi: true` trong TS/TSX. | `const ready = true;` | `const ready = true` |
| Phẩy cuối | Dùng `trailingComma: 'all'` trong TS/TSX. | Dòng cuối object nhiều dòng: `name: 'An',` | Bỏ phẩy cuối ở danh sách nhiều dòng |
| Cuối file | Kết thúc bằng đúng một newline. | Dòng cuối kết thúc `\n` | Thiếu newline hoặc dư dòng trống |
| Import | Dùng nhóm tại [Clean Code](clean-code.md); xếp alphabet trong từng nhóm. | `@nestjs/common` trước `@nestjs/jwt` | `@nestjs/jwt` trước `@nestjs/common` |
| Đường dẫn import | Dùng relative trong feature/module; chỉ dùng alias cho shared khi đã cấu hình. | `./employee.service.js` | `@/shared/api` khi chưa cấu hình alias |
| Biến | Dùng `const` mặc định, `let` khi gán lại; không dùng `var`. | `const count = 1;` | `var count = 1;` |
| Promise | Dùng `async/await` cho chuỗi; dùng `Promise.all` khi tác vụ độc lập. | `const data = await load();` | Chuỗi `.then()` nhiều bước |
| Kiểu TypeScript | Dùng `interface` cho object contract có thể mở rộng; `type` cho union/tuple/composition. | `type State = 'idle' \| 'busy';` | `interface State = 'idle';` |

## 4. Theo framework

Áp dụng cách trình bày dưới đây; tra [Layers](../architecture/layers.md) cho trách nhiệm và [Folder Structure](../architecture/folder-structure.md) cho vị trí file.

### Backend NestJS

- Đặt decorator sát class, method hoặc tham số mà nó áp dụng; dùng constructor injection với `private readonly`.
- Đặt import trước khai báo class; không dùng property injection cho dependency thông thường.

### Frontend React

- Dùng function declaration cho component; khai báo props type/interface có tên và destructure ở tham số.
- Đặt hook ở đầu component, trước early return; giữ thứ tự state/ref → custom hook → memo/effect.
- Tra [UI Rules](ui.md) cho trường hợp `ErrorBoundary` cần class.

### SQL, JSON, YAML, Markdown

- Dùng Prettier cho JSON, YAML và Markdown; JSON dùng nháy kép, không thêm comment.
- Viết SQL keyword chữ HOA; đặt identifier theo [Naming](naming.md).
- Tra [AGENTS.md](../../AGENTS.md) cho quy tắc viết Markdown của agent.

## 5. Quy tắc cho agent

- Khi có script, chạy `npm run format` rồi `npm run lint` trong app liên quan trước khi báo hoàn thành.
- Không tắt rule lint bằng comment khi chưa được phép.

## 6. TODO còn lại

- TODO: tạo cấu hình và script đã chốt khi bắt đầu có code.
