Trạng thái: thiết kế dự kiến, chưa có code

# Quy tắc UI — HeroUI và Tailwind CSS

## 1. Mục đích và phạm vi

Áp dụng quy tắc này khi tạo hoặc sửa giao diện frontend React.

- Tra phiên bản tại [Tech Stack](../architecture/tech-stack.md); tra trách nhiệm và luồng dữ liệu tại [Frontend Layers](../architecture/layers/frontend-react.md).
- Dùng HeroUI v3 và Tailwind CSS v4; không áp dụng cấu hình HeroUI v2 hoặc MUI.

## 2. Phân vai

Chọn công cụ theo trách nhiệm; không tạo hai cấu hình độc lập cho cùng một token.

| Việc cần làm | Dùng HeroUI | Dùng Tailwind | Ví dụ ngắn |
|---|---|---|---|
| Component tương tác | Button, Dialog, form, Table | Bố trí component | `Button` trong `flex gap-2` |
| Layout và spacing | Giữ hành vi component | Grid, flex, gap, padding | `grid gap-4 md:grid-cols-2` |
| Biến thể component | Ưu tiên props được hỗ trợ | Tinh chỉnh qua `className` khi cần | `variant="primary"`, `className="w-full"` |
| Màu và theme | Token ngữ nghĩa HeroUI | Utility đọc cùng token | `bg-background text-foreground` |
| Typography | Dùng `Typography` | Bố trí phần tử chứa | `<Typography type="h1">…</Typography>` |
| Responsive | Giữ API và accessibility | Breakpoint Tailwind | `flex-col md:flex-row` |

## 3. Design token

Dùng hệ token CSS của HeroUI/Tailwind làm nguồn chuẩn duy nhất.

- Đặt import, biến CSS và ánh xạ `@theme` tùy chỉnh tại `frontend/src/styles/globals.css` khi triển khai.
- Giữ token mặc định HeroUI/Tailwind; chưa tự chọn màu thương hiệu, font ngoài hoặc bộ radius riêng.
- Dùng biến ngữ nghĩa HeroUI cho màu; dùng utility như `bg-surface`, `text-foreground`, `text-muted` và `border-border`.
- Đọc cùng biến CSS qua utility Tailwind; không sao chép giá trị màu sang object theme JavaScript.
- Giữ thang spacing, font, breakpoint và radius mặc định từ stylesheet đã import; không tạo `tailwind.config.js` chỉ để lặp lại chúng.
- Khi có token mới được duyệt, khai báo một lần trong `globals.css`; ánh xạ qua `@theme inline` nếu utility cần đọc biến CSS.
- Không hard-code màu, font hoặc radius trong component; không dùng palette cố định thay token ngữ nghĩa cho màu giao diện.

```css
/* Chỉ minh họa ánh xạ; package đã cung cấp token này. Không chép lặp. */
@theme inline {
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
}
```

## 4. Cấu hình bắt buộc

Áp dụng cấu hình dưới đây khi tạo frontend; các đoạn mã chưa tồn tại trong repo.

```ts
// frontend/vite.config.ts — bổ sung vào cấu hình Vite của ứng dụng
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* frontend/src/styles/globals.css */
@import "tailwindcss";
@import "@heroui/styles";
```

```tsx
// frontend/src/main.tsx — import một lần tại entry point
import "./styles/globals.css";
```

- Import Tailwind trước `@heroui/styles`; giữ import đầy đủ để nhận reset, token, component và variant của package.
- Giữ Tailwind Preflight; không thêm reset khác hoặc tắt Preflight theo từng màn hình.
- Giữ thứ tự layer `theme, base, components, utilities` của stylesheet; không đảo layer để xử lý một lỗi hiển thị.
- Không cần `HeroUIProvider` cho HeroUI v3; không thêm plugin HeroUI v2, Emotion hoặc cơ chế `sx`/`styled` của MUI.
- Khi bổ sung plugin Vite khác, giữ plugin cần thiết của ứng dụng; đoạn cấu hình trên chỉ minh họa tích hợp Tailwind.
- Đối chiếu [HeroUI Quick Start](https://heroui.com/en/docs/react/getting-started/quick-start) và [Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite).

## 5. Ghi đè style component

Ưu tiên API công khai và utility thay vì phụ thuộc cấu trúc DOM nội bộ.

- Dùng props như `variant`, `size` nếu component hỗ trợ; chỉ dùng `className` khi cần tinh chỉnh ngoài props.
- Gắn `className` vào đúng component hoặc phần compound component cần chỉnh; tra API đúng phiên bản trước khi dùng.
- Dùng utility theo token; không ghi đè đồng thời cùng thuộc tính qua props tùy chỉnh, class và inline style.
- Utility trong layer `utilities` có thể ghi đè quy tắc thường trong `components`; kiểm tra computed style khi selector hoặc trạng thái khác nhau.
- Không dựa vào thứ tự chuỗi class để giải quyết class xung đột; chỉ giữ một lựa chọn cho mỗi thuộc tính và trạng thái.
- Không dùng `!important`, selector DOM sâu, class nội bộ chưa công bố hoặc sửa stylesheet trong `node_modules`.
- Không tạo CSS riêng từng component hoặc thêm CSS-in-JS; giữ CSS token toàn cục trong file đã quy định.
- Chỉ dùng inline style cho giá trị động không thể biểu diễn bằng class; không dùng cho màu, font hoặc radius tĩnh.
- Giữ focus, disabled, invalid và tương tác bàn phím khi tùy chỉnh; không xóa focus indicator.
- Tra [HeroUI Styling](https://heroui.com/en/docs/react/getting-started/styling) trước khi chỉnh compound component hoặc trạng thái.

## 6. Component dùng chung

Chỉ bọc HeroUI khi có quy ước hoặc hành vi thực sự cần dùng lại.

- Cho phép import HeroUI trực tiếp trong page hoặc feature; không tạo wrapper chỉ để đổi tên một component.
- Đặt wrapper UI dùng chung tại `frontend/src/shared/components/ui/`; giữ component riêng của feature trong feature tương ứng.
- Không tạo sẵn thư viện wrapper cho toàn bộ HeroUI khi chưa có nhu cầu.
- Tra [Naming](naming.md) trước khi đặt tên component, file và props.

**Status:** Confirmed

| Nội dung | Quyết định đã xác nhận |
|---|---|
| Naming wrapper | Dùng tiền tố `App` (ví dụ `AppButton`, `AppModal`), file `AppX.tsx` và type `AppXProps` theo [Naming](naming.md). |
| Props tối thiểu | Mở rộng trực tiếp props của component HeroUI tương ứng (kế thừa `HeroUIComponentProps` và `React.ComponentPropsWithRef`), chuyển tiếp đầy đủ `className`, `children`, `ref` và các props gốc qua rest operator. |

## 7. Theme và thành phần giao diện

Dùng các lựa chọn đã chốt; không thêm thư viện thay thế khi chưa có yêu cầu được xác nhận.

### Dark mode

Dùng một bộ điều khiển theme cho toàn ứng dụng.

- Hỗ trợ `light`, `dark`, `system`; mặc định `system`; chưa triển khai nhiều theme thương hiệu.
- Dùng `useTheme("system")` từ HeroUI tại một nơi; truyền trạng thái và thao tác xuống nơi cần dùng.
- Dùng cơ chế lưu `localStorage` và đồng bộ class/`data-theme` trên `<html>` của hook; không tự tạo bộ lưu theme thứ hai.
- Dùng `bg-background text-foreground` cho app shell để nền và chữ đổi theo cùng theme.
- Ưu tiên utility ngữ nghĩa; chỉ dùng `dark:` khi có khác biệt riêng cần thiết và kiểm tra khi chọn thủ công lẫn theo hệ điều hành.
- Không thêm `next-themes` cho ứng dụng Vite này.

```tsx
import { useTheme } from "@heroui/react";

// Trong component điều khiển theme duy nhất
const { theme, resolvedTheme, setTheme } = useTheme("system");
// Gọi setTheme("light" | "dark" | "system") từ thao tác người dùng.
```

### Responsive

Dùng breakpoint mặc định Tailwind theo hướng mobile-first.

| Utility | Min-width |
|---|---|
| Không prefix | Style nền cho mọi kích thước |
| `sm:` | `40rem` |
| `md:` | `48rem` |
| `lg:` | `64rem` |
| `xl:` | `80rem` |
| `2xl:` | `96rem` |

- Không tự tạo breakpoint khác cho HeroUI hoặc dùng JavaScript để thay layout CSS khi utility đã đáp ứng.

### Icon và typography

Giữ icon và chữ thống nhất theo thư viện đã chọn.

- Import từng icon cần dùng từ `lucide-react`; không thêm bộ icon khác cho cùng giao diện.
- Dùng nhãn truy cập cho nút chỉ có icon; đánh dấu icon trang trí bằng `aria-hidden`.
- Dùng HeroUI `Typography`; giữ font mặc định và cấp heading theo cấu trúc nội dung, không theo kích thước mong muốn.

### Form và bảng

Dùng component HeroUI theo yêu cầu và contract đã được xác nhận.

- Dùng HeroUI `Form` và validation native mặc định; chưa thêm React Hook Form hoặc Zod.
- Chỉ đặt `required`, giới hạn và thông báo validation theo yêu cầu đã chốt; không tự suy ra quy tắc nghiệp vụ.
- Giữ label và thông báo lỗi gắn với trường tương ứng; không dùng placeholder thay label.
- Ánh xạ lỗi backend theo contract được xác nhận; không tự tạo schema lỗi frontend khác.
- Dùng HeroUI `Table`; chưa thêm TanStack Table hoặc thư viện data grid khác.
- Chỉ triển khai sort, filter, pagination hoặc tính năng bảng nâng cao khi có yêu cầu được xác nhận.

## 8. Làm / Không làm

Đối chiếu các ví dụ trước khi thêm style hoặc abstraction.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Token màu | `className="bg-background text-foreground"` | `style={{ color: "#333" }}` |
| Spacing | `className="grid gap-4"` | `style={{ gap: 16 }}` cho layout tĩnh |
| Variant | `<Button variant="primary">Lưu</Button>` | Vừa chọn variant vừa ép màu nền bằng style |
| Responsive | `className="flex flex-col md:flex-row"` | Đọc `window.innerWidth` để đổi flex direction |
| CSS | Import `globals.css` một lần | Import thêm reset trong từng feature |
| Ghi đè | Giữ một class cho mỗi trạng thái | `className="p-2 p-4"` hoặc `!important` |
| Wrapper | Bọc quy ước thực sự dùng lại | Bọc mọi component chỉ để đổi tên |
| Theme | Gọi `setTheme` từ bộ điều khiển chung | Tự sửa `<html>` ở từng màn hình |
| Icon | `<Save aria-hidden="true" />` cạnh chữ “Lưu” | Nút chỉ icon không có tên truy cập |
| Typography | `<Typography type="h1">Nhân sự</Typography>` | Chọn heading chỉ để làm chữ lớn |

## 9. Checklist của agent

Kiểm tra các mục này trước khi hoàn thành thay đổi giao diện.

- [ ] Đọc tài liệu này, Tech Stack và Frontend Layers; không tự nâng dependency hoặc thêm hệ style.
- [ ] Giữ import, Preflight, layer và một bộ điều khiển theme theo mục 4 và 7.
- [ ] Dùng token ngữ nghĩa; không hard-code màu, font hoặc radius.
- [ ] Không có class xung đột, `!important`, CSS riêng component hoặc inline style tĩnh.
- [ ] Kiểm tra light/dark/system, tải lại trang và chọn light khi hệ điều hành đang dark, cùng chiều ngược lại.
- [ ] Kiểm tra layout nhỏ/lớn và quanh breakpoint được sử dụng; giữ nội dung và thao tác truy cập được.
- [ ] Kiểm tra label, keyboard, focus, disabled và invalid của component đã sửa.
- [ ] Dùng form/bảng theo contract; không thêm validation hoặc tính năng chưa xác nhận.
- [ ] Chỉ tạo wrapper khi có nhu cầu dùng lại và các TODO liên quan đã được xác nhận.
- [ ] Khi có toolchain, chạy kiểm tra phù hợp đã cấu hình; không báo build/test đạt nếu chưa chạy.

## 10. Nguồn kiểm chứng

Đối chiếu tài liệu chính thức và package đúng phiên bản khi API hoặc cấu hình thay đổi.

- [HeroUI Theming](https://heroui.com/en/docs/react/getting-started/theming): Tra biến CSS và ánh xạ token.
- [HeroUI Dark Mode](https://heroui.com/en/docs/react/getting-started/dark-mode): Tra hook và đồng bộ theme.
- [HeroUI Typography](https://heroui.com/en/docs/react/components/typography): Tra component chữ.
- [HeroUI Form](https://heroui.com/en/docs/react/components/form): Tra validation và trường nhập liệu.
- [Tailwind Responsive](https://tailwindcss.com/docs/responsive-design): Tra breakpoint.
- [Package React 3.2.6](https://registry.npmjs.org/@heroui/react/-/react-3.2.6.tgz): Đã đối chiếu export `Table`, `Typography` và kiểu `useTheme`.
- [Package styles 3.2.6](https://registry.npmjs.org/@heroui/styles/-/styles-3.2.6.tgz): Đã đối chiếu import, layer và token mặc định.
- Chưa kiểm chứng build, CSS cascade và hành vi theme trong trình duyệt; thực hiện checklist khi có code.
