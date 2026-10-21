# 7.12. System Administration — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/system-administration.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản trị hệ thống và Bảo mật (SYS).

- **Phạm vi module:** Quản lý tài khoản, xác thực (Authentication), phân quyền (Authorization / RBAC), cấu hình tham số hệ thống, quản lý thông báo và nhật ký kiểm toán (Audit Logs).
- **Actors liên quan:**
  - `System Administrator`: Toàn quyền quản trị tài khoản người dùng, phân quyền theo vai trò (RBAC), cấu hình hệ thống toàn cục và kiểm tra nhật ký kiểm toán (không xem thông tin lương chi tiết của nhân sự).
  - `Tất cả người dùng (Admin, HR Staff, Department Manager, Employee)`: Đăng nhập, đổi mật khẩu cá nhân, nhận thông báo hệ thống In-App (chuông) và email.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-SYS-001 | As a System Administrator, I want tạo, kích hoạt, khóa và đặt lại mật khẩu cho tài khoản người dùng gắn với mã nhân viên, So that nhân sự có tài khoản truy cập hệ thống đúng thẩm quyền. | FR-SYS-001 | Mỗi nhân viên chỉ liên kết duy nhất 1 tài khoản đang hoạt động; hỗ trợ reset password gửi mail tự động. |
| US-SYS-002 | As a Tất cả người dùng, I want đăng nhập hệ thống an toàn bằng Email và Mật khẩu, nhận JWT Access Token và Refresh Token bảo mật, So that danh tính của tôi được xác thực trước khi làm việc. | FR-SYS-002 | Access Token hết hạn sau 15 phút; Refresh Token 7 ngày lưu trong HttpOnly Cookie; khóa tài khoản 15 phút nếu sai 5 lần. |
| US-SYS-003 | As a Hệ thống, I want từ chối truy cập trái phép, So that dữ liệu doanh nghiệp không bị rò rỉ. | FR-SYS-003 | Trả 403 khi vai trò không được thao tác hoặc Manager xem nhân viên ngoài phòng ban; trả 404 với tài nguyên khác ngoài phạm vi. |
| US-SYS-004 | As a System Administrator, I want áp dụng mô hình phân quyền theo vai trò (RBAC) với 4 vai trò chuẩn hóa (Admin, HR Staff, Manager, Employee), So that việc phân bổ trách nhiệm nghiệp vụ rõ ràng và nhất quán. | FR-SYS-004 | Mỗi tài khoản có 1 vai trò nền theo chức vụ thực tế và quyền nghiệp vụ theo nhiệm vụ trong phạm vi được duyệt. |
| US-SYS-005 | As a System Administrator, I want quản lý danh mục và mô tả chi tiết của 4 vai trò người dùng trong hệ thống, So that chính sách phân quyền luôn được tài liệu hóa và bảo trì dễ dàng. | FR-SYS-005 | Hiển thị mô tả phạm vi trách nhiệm và danh sách tài khoản thuộc từng vai trò. |
| US-SYS-006 | As a System Administrator, I want cấu hình chi tiết các mã quyền (Permissions) theo từng thao tác (Xem, Tạo, Sửa, Xóa, Duyệt, Xuất), So that hệ thống có thể mở rộng quyền hạn linh hoạt khi cần. | FR-SYS-006 | Mã quyền chuẩn dạng `<module>:<resource>:<action>`; cấp cho tài khoản theo nhiệm vụ và giữ phạm vi tài nguyên đã duyệt. |
| US-SYS-007 | As a System Administrator, I want cấu hình các tham số toàn cục của hệ thống (Giờ làm ca chuẩn, Ngưỡng ân hạn chấm công, Tỷ lệ trích BHXH, Ngưỡng giảm trừ gia cảnh), So that hệ thống vận hành linh hoạt theo luật định. | FR-SYS-007 | Các tham số lưu dạng Key-Value trong database; cập nhật có hiệu lực ngay mà không cần khởi động lại server. |
| US-SYS-008 | As an Employee / Manager / HR Staff, I want nhận thông báo In-App (icon chuông) và Email thời gian thực khi có sự kiện liên quan (đơn phép được duyệt, ca làm thay đổi, nhận offer), So that tôi cập nhật tin tức công việc kịp thời. | FR-SYS-008 | Đánh dấu đã đọc/chưa đọc; hiển thị số lượng badge chưa đọc trên icon chuông; gửi mail thông báo quan trọng. |
| US-SYS-009 | As a System Administrator, I want hệ thống tự động ghi nhật ký kiểm toán (Audit Logs) bất biến đối với mọi hành vi nhạy cảm, So that luôn có đầy đủ dấu vết để đối soát và điều tra sự cố bảo mật. | FR-SYS-009 | Ghi nhận: Actor, IP, Action, Timestamp, Status, Target ID; lưu trữ tối thiểu 2 năm; không ai có quyền sửa hoặc xóa log. |
| US-SYS-010 | As a System Administrator, I want tra cứu, lọc và xem chi tiết nhật ký kiểm toán theo thời gian, người thực hiện hoặc loại thao tác, So that dễ dàng kiểm tra hoạt động quản trị khi có yêu cầu thanh tra. | FR-SYS-010 | Hỗ trợ phân trang, lọc theo khoảng ngày, theo Actor ID, theo loại Action (`LOGIN`, `UPDATE_SALARY`, `ASSIGN_ROLE`). |

---

## 2. Use Case Đặc tả chi tiết

### UC-SYS-001: Đăng nhập và xác thực danh tính (Authentication)

- **Mã FR:** FR-SYS-002, FR-SYS-003.
- **Actor:** Tất cả người dùng (Admin, HR Staff, Manager, Employee).
- **Tiền điều kiện:** Người dùng có tài khoản với trạng thái `is_active = true`.
- **Dữ liệu đầu vào (Input Fields):** Email công ty, Mật khẩu.
- **Luồng sự kiện chính (Basic Flow):**
  1. Người dùng mở trang đăng nhập `/login` và nhập Email cùng Mật khẩu.
  2. Người dùng nhấn nút "Đăng nhập".
  3. Hệ thống kiểm tra số lần đăng nhập sai gần nhất của tài khoản:
     - Nếu số lần sai >= 5 lần trong vòng 15 phút: Hệ thống từ chối ngay lập tức và thông báo "Tài khoản đã bị tạm khóa 15 phút do nhập sai mật khẩu quá 5 lần".

  4. Hệ thống truy vấn tài khoản trong bảng `users` theo Email.
  5. Nếu không tìm thấy hoặc mật khẩu không khớp (kiểm tra hash bcrypt):
     - Hệ thống tăng bộ đếm số lần sai (`failed_login_attempts += 1`).
     - Ghi audit log sự kiện `LOGIN_FAILED`.
     - Trả về thông báo lỗi chung: "Email hoặc mật khẩu không chính xác" (không chỉ rõ email hay pass sai để chống dò quét).
  6. Nếu mật khẩu khớp và tài khoản đang hoạt động:
     - Hệ thống reset bộ đếm `failed_login_attempts = 0`.
     - Sinh Access Token (JWT, payload gồm `userId`, `email`, `role`, `departmentId`, hạn dùng 15 phút).
     - Sinh Refresh Token JWT HS256 (hạn dùng 7 ngày), băm và lưu trạng thái thu hồi vào bảng `user_sessions`.
     - Đặt Refresh Token vào Cookie phản hồi với các thuộc tính: `HttpOnly = true`, `Secure = true` (khi chạy HTTPS), `SameSite = Lax`; cookie path chờ contract Auth.
     - Ghi audit log sự kiện `LOGIN_SUCCESS`.
     - Trả về HTTP 200 kèm Access Token và thông tin tóm tắt người dùng (Họ tên, Avatar, Vai trò).
  7. Frontend lưu Access Token vào bộ nhớ ứng dụng (Memory/State) và điều hướng về Dashboard tương ứng với vai trò.
- **Hậu điều kiện:** Phiên làm việc được thiết lập, người dùng truy cập được các chức năng được cấp quyền.

**Status:** Confirmed — Tài khoản tạm khóa sau 5 lần đăng nhập sai trả `429 RATE_LIMIT_EXCEEDED` kèm `Retry-After` là số giây còn lại trong thời gian khóa 15 phút; không dùng `403 INSUFFICIENT_PERMISSIONS`.

**Status:** TBD (To Be Determined) — Cookie path của refresh token chưa được duyệt trong contract Auth.

- Refresh token cookie áp dụng cho những endpoint Auth nào?

---

### UC-SYS-002: Quản lý tài khoản người dùng và phân quyền

- **Mã FR:** FR-SYS-001, FR-SYS-004, FR-SYS-005.
- **Actor:** System Administrator.
- **Tiền điều kiện:** System Admin đã đăng nhập.
- **Luồng sự kiện chính (Basic Flow):**
  1. Admin mở mục "Quản trị hệ thống" > "Tài khoản người dùng".
  2. Hệ thống hiển thị danh sách tài khoản kèm trạng thái và vai trò hiện tại.
  3. **Tạo tài khoản mới:**
     - Admin nhấn "Thêm tài khoản", chọn nhân viên liên kết từ danh sách nhân sự (EMP) chưa có tài khoản.
     - Email tự động điền theo email công ty của nhân viên.
     - Admin gán vai trò: `System Administrator`, `HR Staff`, `Department Manager`, hoặc `Employee`.
     - Hệ thống tự động sinh mật khẩu tạm thời ngẫu nhiên mạnh và gửi email kích hoạt cho nhân viên kèm liên kết đổi mật khẩu lần đầu.
  4. **Khóa / Mở khóa tài khoản:**
     - Admin chọn tài khoản và nhấn "Khóa tài khoản" khi nhân viên có dấu hiệu vi phạm hoặc nghỉ việc.
     - Hệ thống đổi `is_active = false`, lập tức thu hồi toàn bộ Refresh Token của tài khoản đó, buộc đăng xuất ngay trên mọi thiết bị.
  5. **Đặt lại mật khẩu (Reset Password):**
     - Khi nhân viên quên mật khẩu, Admin nhấn "Gửi yêu cầu reset mật khẩu".
     - Hệ thống sinh mã token một lần (OTP/Reset token có thời hạn 15 phút) và gửi mail đến hòm thư của nhân viên.
- **Hậu điều kiện:** Trạng thái tài khoản và vai trò được cập nhật, ghi audit log đầy đủ.

---

### UC-SYS-003: Cấu hình tham số hệ thống toàn cục

- **Mã FR:** FR-SYS-007.
- **Actor:** System Administrator.
- **Tiền điều kiện:** Admin có quyền cấu hình hệ thống.
- **Dữ liệu đầu vào:** Danh sách key-value các cấu hình nghiệp vụ.
- **Luồng sự kiện chính (Basic Flow):**
  1. Admin vào trang "Cấu hình hệ thống".
  2. Hệ thống hiển thị các nhóm tham số được phân loại rõ ràng:
     - *Nhóm 1 - Chấm công:* Giờ bắt đầu ca chuẩn (08:00), Giờ kết thúc ca (17:30), Thời gian ân hạn đi muộn (15 phút), Block làm tròn OT (30 phút).
     - *Nhóm 2 - Phép năm:* Số ngày phép chuẩn hàng năm (12 ngày), Thời hạn dùng phép tồn năm trước (31/03).
     - *Nhóm 3 - Lương & Thuế:* Tỷ lệ trích BHXH người lao động (10.5%), Mức giảm trừ bản thân (11.000.000 đ), Mức giảm trừ người phụ thuộc (4.400.000 đ/người).
     - *Nhóm 4 - Bảo mật:* Thời gian hết hạn Access Token (15m), Số lần đăng nhập sai tối đa (5 lần).
  3. Admin chỉnh sửa giá trị cần cập nhật và nhấn "Lưu cấu hình".
  4. Hệ thống kiểm tra tính hợp lệ của giá trị (ví dụ: giờ phải đúng định dạng `HH:mm`, số tiền phải > 0).
  5. Hệ thống lưu cấu hình vào bảng `system_settings`.
  6. Hệ thống làm mới cache cấu hình trong bộ nhớ server.
  7. Ghi audit log ghi nhận: `user_id`, `changed_keys`, `old_values`, `new_values`.
- **Hậu điều kiện:** Các module liên quan lập tức áp dụng tham số mới cho các tính toán tiếp theo.

---

### UC-SYS-004: Quản lý và nhận thông báo hệ thống

- **Mã FR:** FR-SYS-008.
- **Actor:** Tất cả người dùng (người nhận), Hệ thống (bên kích hoạt).
- **Luồng sự kiện chính (Basic Flow):**
  1. Khi một sự kiện nghiệp vụ xảy ra (ví dụ: Đơn phép được duyệt, Bảng lương đã tính, Có ca làm việc mới):
     - Dịch vụ Notification tạo một bản ghi thông báo trong bảng `notifications`: `recipient_id`, `title`, `content`, `type`, `reference_url`, `is_read = false`.
     - Nếu sự kiện quan trọng: Gửi thêm email thông báo qua SMTP Server.
  2. Người dùng nhìn thấy số lượng thông báo mới (Badge đỏ) trên icon Quả chuông ở góc trên màn hình.
  3. Người dùng nhấp vào icon chuông để mở danh sách thông báo.
  4. Người dùng nhấp vào một thông báo:
     - Hệ thống đánh dấu bản ghi thành `is_read = true`.
     - Điều hướng người dùng trực tiếp đến trang chi tiết tài nguyên (ví dụ: chuyển đến trang đơn nghỉ phép tương ứng).
  5. Người dùng có thể nhấn nút "Đánh dấu tất cả là đã đọc".
- **Hậu điều kiện:** Trạng thái đọc của thông báo được lưu trữ chính xác.

---

### UC-SYS-005: Tra cứu và giám sát nhật ký kiểm toán (Audit Logs)

- **Mã FR:** FR-SYS-009, FR-SYS-010.
- **Actor:** System Administrator.
- **Tiền điều kiện:** Admin có quyền truy cập nhật ký bảo mật.
- **Luồng sự kiện chính (Basic Flow):**
  1. Admin mở trang "Nhật ký kiểm toán" (Audit Logs).
  2. Hệ thống hiển thị bảng danh sách các sự kiện mới nhất xếp theo thời gian giảm dần:
     - Thời gian hiển thị theo định dạng `DD/MM/YYYY HH:mm:ss` giờ Việt Nam UTC+7 trong [API spec](../../api-spec.md#4-quy-ước-requestresponse-chung).
     - Người thực hiện (Actor: Họ tên, Email, Vai trò).
     - Địa chỉ IP & User Agent.
     - Hành động (`Action`: `LOGIN`, `LOGOUT`, `CREATE_EMPLOYEE`, `UPDATE_SALARY`, `APPROVE_LEAVE`, v.v.).
     - Đối tượng tác động (`Target Entity` & `Target ID`).
     - Trạng thái (`SUCCESS` hoặc `FAILED`).
  3. Admin có thể lọc theo: Khoảng thời gian (Từ ngày - Đến ngày), Loại hành vi, Actor ID hoặc kết quả.
  4. Nhấn vào một dòng để mở Drawer xem chi tiết Payload thay đổi (`old_values` vs `new_values` - ẩn các trường secret/password).
  5. Hệ thống khóa cứng dữ liệu, không cung cấp bất kỳ API hoặc nút bấm nào cho phép sửa hoặc xóa log (Append-only).
- **Hậu điều kiện:** Hoạt động quản trị được giám sát minh bạch, hỗ trợ truy vết khi có tranh chấp hoặc sự cố an ninh.

---

### UC-SYS-006: Đăng xuất và thu hồi phiên làm việc (Logout)

- **Mã FR:** FR-SYS-002.
- **Actor:** Tất cả người dùng.
- **Tiền điều kiện:** Người dùng đang trong phiên đăng nhập hợp lệ.
- **Luồng sự kiện chính (Basic Flow):**
  1. Người dùng bấm vào menu đại diện (Avatar) và chọn "Đăng xuất".
  2. Frontend gửi request `POST /api/v1/auth/logout` kèm Cookie chứa Refresh Token.
  3. Backend xử lý:
     - Tìm và đánh dấu thu hồi bản ghi phiên làm việc trong bảng `user_sessions` tương ứng với Refresh Token này.
     - Xóa Cookie Refresh Token bằng cách đặt `Max-Age = 0`.
     - Ghi audit log sự kiện `LOGOUT`.
  4. Frontend xóa Access Token khỏi bộ nhớ (Memory/State) và chuyển hướng người dùng về trang `/login`.
- **Hậu điều kiện:** Phiên làm việc kết thúc hoàn toàn; token cũ không thể tái sử dụng để truy cập API.
