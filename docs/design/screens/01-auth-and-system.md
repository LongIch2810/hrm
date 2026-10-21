# Thiết Kế Chi Tiết: Xác Thực & Trang Lỗi Hệ Thống (Screens 1 - 7)

Tài liệu thiết kế chi tiết cho phân hệ Xác thực (Auth) và các trang trạng thái lỗi hệ thống.
Tuân thủ [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md) và [Auth Spec](file:///d:/saved/Project/hrm/docs/architecture/auth.md).

---

## 1. Màn hình Đăng Nhập (`/login` — Screen 1)

### 1.1. Mô tả Nghiệp vụ & Đối tượng
- **Actor:** Tất cả người dùng (Admin, HR, Manager, Employee) chưa xác thực.
- **Nghiệp vụ:** Đăng nhập bằng Email công ty và Mật khẩu. Hỗ trợ ghi nhớ tài khoản, khóa tài khoản tạm thời 15 phút nếu nhập sai 5 lần liên tiếp (Brute-force protection).

### 1.2. Bố cục Layout & Responsive (375px / 768px / 1440px)
- **Desktop (1440px):**
  - Split 2 cột tỉ lệ 50:50.
  - Cột trái: Nền `canvas-soft` (`#fafafa`) với Atmospheric Gradient Orb lớn (kết hợp `gradient-mint` và `gradient-peach`), tiêu đề biên tập `display-mega` (EB Garamond 300): *"Hệ thống Quản trị Nhân sự Vòng đời & Tự phục vụ"*, cùng 3 bullet tóm tắt giá trị cốt lõi.
  - Cột phải: Khối form đăng nhập căn giữa, chiều rộng tối đa 420px, viền tóc mảnh 1px bao quanh thẻ `surface-card`, padding 48px.
- **Tablet (768px):**
  - 1 cột căn giữa màn hình, khối form rộng 480px, banner thương hiệu thu gọn phía trên với gradient orb mờ.
- **Mobile (375px):**
  - Chiếm toàn bộ chiều rộng màn hình, padding 20px, logo công ty trên cùng, form tối ưu bàn phím di động (input 44px, nút Đăng nhập full-width w-full cao 44px).

### 1.3. Các Trạng thái Giao diện Bắt buộc
1. **Default / Form State:** Ô nhập Email (placeholder `ten.nv@congty.com.vn`), Ô Mật khẩu có icon mắt ẩn/hiện, checkbox "Ghi nhớ đăng nhập", link "Quên mật khẩu?", nút Primary CTA "Đăng nhập" dạng viên thuốc ink `#292524`.
2. **Loading State:** Nút "Đăng nhập" hiển thị spinner xoay nhẹ, disabled tương tác, chữ đổi thành "Đang xác thực...".
3. **Validation Error State:** Viền đỏ `semantic-error` (`#dc2626`) quanh input sai định dạng, helper text đỏ bên dưới: *"Email công ty không hợp lệ"* hoặc *"Vui lòng nhập mật khẩu"*.
4. **Invalid Credentials Error:** Banner thông báo cảnh báo đỏ trên đầu form: *"Email hoặc mật khẩu không chính xác. Bạn còn 3 lần thử."*
5. **Account Locked State (Edge Case Brute-force):** Banner cảnh báo đỏ nổi bật kèm icon khóa: *"Tài khoản tạm thời bị khóa 15 phút do nhập sai mật khẩu 5 lần liên tiếp. Vui lòng thử lại sau 14:59 hoặc liên hệ IT Administrator."*

---

## 2. Đổi Mật Khẩu Lần Đầu / Kích Hoạt Tài Khoản (`/auth/first-time-password` — Screen 2)

### 2.1. Mô tả Nghiệp vụ
- **Actor:** Người dùng mới được HR/Admin cấp tài khoản đăng nhập lần đầu tiên.
- **Nghiệp vụ:** Bắt buộc đổi mật khẩu tạm thời thành mật khẩu cá nhân mới (`PD-029`, `BR-SYS-001`). Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.

### 2.2. Giao diện & Trạng thái
- **Layout:** Căn giữa, thẻ `surface-card` bo góc `16px`, viền 1px `#e7e5e4`, padding 32px (mobile) / 48px (desktop).
- **Thành phần:**
  - Tiêu đề: `display-sm` (EB Garamond 300) *"Kích hoạt tài khoản & Đổi mật khẩu"*.
  - Ô Mật khẩu tạm thời đã nhận qua email.
  - Ô Mật khẩu mới + Thanh đo độ mạnh mật khẩu (4 mức: Yếu / Trung bình / Khá / Mạnh) bằng màu ngữ nghĩa.
  - Checklist điều kiện bảo mật (tick xanh thời gian thực): $\ge 8$ ký tự, chữ hoa/thường, chữ số, ký tự đặc biệt.
  - Ô Xác nhận mật khẩu mới.
  - Nút Primary "Kích hoạt & Vào hệ thống".

---

## 3. Quên Mật Khẩu & Đặt Lại Mật Khẩu (Screens 3 & 4)

- **Quên mật khẩu (`/auth/forgot-password`):** Nhập email công ty để nhận link reset token. Trạng thái gửi thành công hiển thị thông báo dịu kèm nút "Quay lại Đăng nhập".
- **Đặt lại mật khẩu (`/auth/reset-password?token=...`):** Form nhập mật khẩu mới. Trường hợp token hết hạn (> 15 phút) hiển thị Empty/Error state: *"Đường dẫn đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu lại đường dẫn mới."*

---

## 4. Trang Lỗi 403 Forbidden (`/403` — Screen 5)

### 4.1. Mô tả & Ngữ cảnh
- Xuất hiện khi người dùng cố truy cập đường dẫn vượt thẩm quyền vai trò hoặc Quản lý phòng ban cố tình xem dữ liệu ngoài phạm vi phòng ban mình (`AC-CROSS-001`).
- **Giao diện:**
  - Nền `canvas` (#f5f5f5), căn giữa không gian thoáng đãng.
  - Con số "403" lớn với kiểu chữ `display-mega` mờ thanh lịch màu `muted-soft` (#a8a29e).
  - Tiêu đề `display-md`: *"Quyền truy cập bị từ chối"*.
  - Đoạn mô tả `body-md`: *"Tài khoản của bạn không có quyền thực hiện thao tác này hoặc tài nguyên này thuộc phạm vi phòng ban khác. Nếu bạn cho rằng đây là sự nhầm lẫn, vui lòng liên hệ Quản trị viên hệ thống."*
  - Nút Outline "Quay lại trang trước" và Nút Primary "Về Bảng điều khiển".

---

## 5. Trang Lỗi 404 Not Found (`/404` — Screen 6)

- Tương tự trang 403, con số "404" lớn kiểu dáng biên tập.
- Tiêu đề: *"Không tìm thấy trang"*.
- Mô tả: *"Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang vị trí mới."*
- Nút bấm điều hướng về Dashboard tương ứng của vai trò hiện tại.

---

## 6. Error Boundary Fallback UI (Screen 7)

- **Căn cứ:** [Frontend Layers Spec](file:///d:/saved/Project/hrm/docs/architecture/layers/frontend-react.md#cấu-hình-error-boundary).
- **Quy tắc bắt buộc:**
  - Bắt lỗi render React toàn cục tại `main.tsx`.
  - Thông báo fallback chuẩn xác: *"Đã có lỗi hiển thị. Vui lòng tải lại trang."*
  - Nút Primary viên thuốc "Tải lại trang" (`window.location.reload()`).
  - Tuyệt đối không hiển thị technical stack trace cho người dùng cuối.
