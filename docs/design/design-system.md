# HRM Design System Specification

Tài liệu đặc tả toàn diện Design System cho hệ thống Quản trị Nhân sự (HRM).
Tuân thủ chuẩn mực từ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md), kết hợp quy tắc [UI Rules](file:///d:/saved/Project/hrm/docs/rules/ui.md) (HeroUI v3 + Tailwind CSS v4) và các bổ sung chuyên biệt cho phần mềm B2B SaaS đã được phê duyệt.

---

## 1. Triết Lý Thiết Kế (Design Philosophy)

1. **Quietly Editorial B2B:** Giao diện quản trị nhân sự mang âm hưởng tạp chí in biên tập (editorial print) tinh tế, tĩnh lặng nhưng cực kỳ chuẩn xác và hiệu năng cao. Sàn trang màu trắng ngà (`#f5f5f5`), chữ và hành động chính mang sắc mực đen ấm (`#292524` / `#0c0a09`).
2. **Không Màu CTA Sặc Sỡ:** Không dùng màu xanh dương công nghệ chói mắt hay màu neon cho nút bấm chính. Nút hành động chính (Primary CTA) duy nhất là khối mực đen dạng viên thuốc (`rounded.pill`).
3. **Atmospheric Gradient Orbs:** Chiều sâu thương hiệu được thể hiện qua các khối gradient orb màu pastel dịu nhẹ (Mint, Peach, Lavender, Sky, Rose) ở nền các banner chào mừng hoặc card nổi bật — tuyệt đối không dùng làm màu nút hay chữ.
4. **Phông Chữ Biên Tập:** Tiêu đề cấp cao sử dụng phông có chân thanh lịch **Waldenburg Light** (thay thế bằng **EB Garamond** chuẩn Google Fonts) luôn ở độ dày `font-weight: 300`. Toàn bộ nội dung dữ liệu, bảng biểu và điều khiển dùng phông **Inter** rõ ràng, hiện đại.
5. **Mobile-First & Touch-Friendly:** Tất cả nút bấm và vùng chạm trên thiết bị di động đều đạt tối thiểu **44×44px** với khoảng cách đệm tối thiểu **8px**, không gây chạm nhầm.

---

## 2. Hệ Thống Token Màu Sắc (Color Tokens)

### 2.1. Brand & Actions
```css
--color-primary: #292524;         /* Ink Primary: Nút CTA chính */
--color-primary-active: #0c0a09;  /* Ink Primary Active: Khi nhấn/hover nút chính */
--color-on-primary: #ffffff;      /* Chữ trên nền nút chính */
```

### 2.2. Canvas & Surface
```css
--color-canvas: #f5f5f5;          /* Nền sàn ứng dụng (Off-white) */
--color-canvas-soft: #fafafa;     /* Dải nền xen kẽ nhẹ */
--color-canvas-deep: #0c0a09;     /* Nền tối (Hero dark mode) */
--color-surface-card: #ffffff;    /* Mặt thẻ Card, Modal, Data Table */
--color-surface-strong: #f0efed;  /* Nền Badge, nền hover, icon plate */
--color-surface-dark: #0c0a09;    /* Mặt card tối */
--color-surface-dark-elevated: #1c1917; /* Card nổi trên nền tối */
```

### 2.3. Text & Typography Colors
```css
--color-ink: #0c0a09;             /* Tiêu đề chính, chữ nổi bật nhất */
--color-body-strong: #292524;     /* Chữ nhấn mạnh, tiêu đề card */
--color-body: #4e4e4e;            /* Chữ nội dung chuẩn, nhãn trường */
--color-muted: #777169;           /* Chữ phụ đề, tiêu đề cột bảng */
--color-muted-soft: #a8a29e;      /* Chữ mờ, placeholder, disabled text */
```

### 2.4. Hairline Borders (Đường Viền Mảnh 1px)
```css
--color-hairline: #e7e5e4;        /* Đường kẻ phân cách mặc định 1px */
--color-hairline-soft: #f0efed;   /* Đường kẻ rất nhẹ trong bảng */
--color-hairline-strong: #d6d3d1; /* Viền khung input, viền card nổi bật */
```

### 2.5. Atmospheric Gradient Orbs (Điểm Nhấn Không Gian)
```css
--gradient-mint: #a7e5d3;
--gradient-peach: #f4c5a8;
--gradient-lavender: #c8b8e0;
--gradient-sky: #a8c8e8;
--gradient-rose: #e8b8c4;
```

### 2.6. Semantic Status Colors (Màu Ngữ Nghĩa Nghiệp Vụ)
```css
/* Chuẩn từ DESIGN.md */
--color-semantic-success: #16a34a; /* Thành công, Hoạt động (Active), Đã duyệt */
--color-semantic-error: #dc2626;   /* Thất bại, Từ chối, Lỗi validation, Khóa */

/* Phần Bổ sung đã được duyệt cho B2B SaaS HRM */
--color-semantic-warning: #d97706; /* Chờ duyệt (Pending), Cảnh báo hết hạn HĐ */
--color-semantic-warning-bg: #fef3c7;
--color-semantic-info: #2563eb;    /* Thử việc (Probation), Đang diễn ra, Thông tin */
--color-semantic-info-bg: #eff6ff;
--color-semantic-neutral: #71717a; /* Bản nháp (Draft), Đã thôi việc (Terminated) */
--color-semantic-neutral-bg: #f4f4f5;
```

---

## 3. Hệ Thống Typography (Typography Tokens)

### 3.1. Display Typography (EB Garamond / Waldenburg — Weight 300)
| Tên Token | Kích Thước | Weight | Line Height | Tracking | Mục Đích Sử Dụng |
|---|---|---|---|---|---|
| `display-mega` | 64px | 300 | 1.05 | -1.92px | Tiêu đề lớn nhất Hero cổng thông tin |
| `display-xl` | 48px | 300 | 1.08 | -0.96px | Tiêu đề chào mừng Dashboard |
| `display-lg` | 36px | 300 | 1.17 | -0.36px | Tiêu đề trang module chính |
| `display-md` | 32px | 300 | 1.13 | -0.32px | Tiêu đề nhóm chức năng / section |
| `display-sm` | 24px | 300 | 1.20 | 0px | Tiêu đề Card lớn / Banner thống kê |

*Nguyên tắc:* Luôn giữ `font-weight: 300`, tuyệt đối không in đậm display copy.

### 3.2. UI Typography (Inter — Weight 400 / 500 / 600)
| Tên Token | Kích Thước | Weight | Line Height | Tracking | Mục Đích Sử Dụng |
|---|---|---|---|---|---|
| `title-md` | 20px | 500 | 1.35 | 0px | Tiêu đề Modal, Card component header |
| `title-sm` | 18px | 500 | 1.44 | +0.18px | Nhãn bảng dữ liệu, nhóm filter |
| `body-md` | 16px | 400 | 1.50 | +0.16px | Nội dung văn bản, label form |
| `body-strong` | 16px | 500 | 1.50 | +0.16px | Nhấn mạnh nội dung, giá trị quan trọng |
| `body-sm` | 15px | 400 | 1.47 | +0.15px | Dữ liệu ô trong Table, ghi chú phụ |
| `caption` | 14px | 400 | 1.50 | 0px | Chữ helper text, mô tả lỗi, placeholder |
| `caption-uppercase`| 12px | 600 | 1.40 | +0.96px | Nhãn trạng thái (Badge/Tag), uppercase |
| `button` | 15px | 500 | 1.00 | 0px | Chữ trong nút bấm CTA |
| `nav-link` | 15px | 500 | 1.40 | 0px | Menu thanh bên và điều hướng |

---

## 4. Spacing, Sizing & Radius

### 4.1. Spacing Scale (4px Increments)
- `xxs`: 4px | `xs`: 8px | `sm`: 12px | `base`: 16px | `md`: 20px | `lg`: 24px | `xl`: 32px | `xxl`: 48px | `section`: 96px

### 4.2. Border Radius Scale
- `rounded-pill`: `9999px` — Nút bấm tương tác, badge trạng thái, search pill.
- `rounded-xl`: `16px` — Khối thẻ Card, Modal hộp thoại, bảng dữ liệu.
- `rounded-lg`: `12px` — Khung nhóm nhỏ, popover, dropdown menu.
- `rounded-md`: `8px` — Ô nhập liệu form (input, select, textarea).
- `rounded-full`: `9999px` — Avatar nhân viên, icon plate tròn 32px/40px.

### 4.3. Elevation & Drop Shadows
- **Card Mặc định:** Nền trắng `#ffffff`, viền 1px `border: 1px solid #e7e5e4`, không đổ bóng gắt.
- **Card Hover:** Đổ bóng viền cực nhẹ `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04)`.
- **Modal / Popover:** Đổ bóng nổi `box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08)`.

---

## 5. Quy Chuẩn Thành Phần Giao Diện (Component Library)

### 5.1. Nút Bấm (Button Variants)
- **`button-primary`:**
  - Nền `#292524`, chữ `#ffffff`, bo góc `9999px`, chiều cao `40px`, padding `10px 20px`.
  - Hover: nền chuyển `#0c0a09`. Focus: viền ngoài 2px `#292524` cách 2px.
- **`button-outline`:**
  - Nền trong suốt, viền 1px `#d6d3d1`, chữ `#0c0a09`, bo góc `9999px`, chiều cao `40px`, padding `9px 19px`.
  - Hover: nền `#f0efed`.
- **`button-ghost`:**
  - Nền trong suốt, không viền, chữ `#4e4e4e`, hover nền `#f0efed`, chữ `#0c0a09`.
- **`button-danger`:**
  - Nền `#dc2626`, chữ trắng, bo góc `9999px`, chiều cao `40px` (Dùng cho Xóa, Khóa, Từ chối).

### 5.2. Huy Hiệu Trạng Thái (Status Badges)
Định dạng: Chữ in hoa `caption-uppercase` (12px / 600 tracking 0.96px), bo góc `rounded-pill`, padding `4px 10px`, kèm chấm tròn màu 6px (status dot):
- **Đang hoạt động (Active / Approved):** Nền `#dcfce7`, chữ `#15803d`, chấm xanh lục.
- **Chờ duyệt (Pending / In Review):** Nền `#fef3c7`, chữ `#b45309`, chấm vàng cam.
- **Thử việc (Probation / In Progress):** Nền `#eff6ff`, chữ `#1d4ed8`, chấm xanh dương.
- **Bản nháp (Draft / Expired):** Nền `#f4f4f5`, chữ `#52525b`, chấm xám.
- **Từ chối / Khóa (Rejected / Terminated):** Nền `#fee2e2`, chữ `#b91c1c`, chấm đỏ.

### 5.3. Trường Nhập Liệu (Form Controls)
- Chiều cao chuẩn `44px` (đáp ứng touch target di động).
- Nền `#ffffff`, viền 1px `#d6d3d1`, bo góc `8px`, padding `10px 14px`.
- Khi focus: Viền chuyển sang 2px `#0c0a09`, outline none.
- Khi invalid/lỗi: Viền chuyển sang 1.5px `#dc2626`, hiển thị text lỗi màu đỏ bên dưới.
- Label: Nằm phía trên ô nhập liệu, phông `Inter` 14px weight 500 màu `#292524`.

### 5.4. Bảng Dữ Liệu (Data Table — HeroUI Table)
- **Header:** Cao 44px, nền `#fafafa`, viền dưới 1px `#e7e5e4`, chữ `muted` 13px in hoa/chữ hoa nhẹ, canh trái (hoặc canh phải cho số liệu/tiền).
- **Body Row:** Cao 56px (desktop) / 64px (nếu có 2 dòng tên + chức vụ), viền dưới 1px `#f0efed`, hover nền `#f8f8f7`.
- **Pagination Footer:** Cao 56px, hiển thị "Hiển thị 1 - 10 trên 148 kết quả", bộ chọn trang nút tròn/pill.

### 5.5. App Shell Layout (Khung Ứng Dụng)
- **Desktop (1440px):**
  - Sidebar cố định bên trái rộng `260px`, nền `#fafafa`, viền phải 1px `#e7e5e4`. Chứa Logo, Nhóm chức năng (Cốt lõi, Quản trị, Cá nhân), chân trang có thông tin người dùng và Đăng xuất.
  - Top Header cao `64px`, nền `#ffffff` hoặc `#f5f5f5`, chứa Breadcrumb, Thanh tìm kiếm toàn cục (Search pill), Nút chuyển theme, Chuông thông báo (In-App) và Avatar.
  - Main Content: Padding `32px`, max-width `1200px` căn giữa sàn trang `#f5f5f5`.
- **Tablet (768px):**
  - Sidebar thu gọn `72px` (chỉ hiển thị icon) hoặc mở qua Drawer trượt từ bên trái.
  - Main Content: Padding `20px`.
- **Mobile (375px):**
  - Sidebar ẩn hoàn toàn, mở qua nút Hamburger góc trái Header.
  - Bottom Navigation Bar cố định đáy cao `64px` gồm 4 nút: `Trang chủ`, `Chấm công`, `Đơn phép`, `Cá nhân`.
  - Main Content: Padding `16px`. Bảng tự động biến đổi thành danh sách Thẻ xếp chồng (Stacked Cards).
