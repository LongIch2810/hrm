# Business Rules — System Administration

- **Module ID:** SYS
- **Parent Spec:** docs/PRD.md#8.8
- **Traces-To:** docs/prd/function-requirement/system-administration.md
- **Use Cases:** docs/prd/usecase/system-administration.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-SYS-001: Chính sách tài khoản, mật khẩu và xác thực danh tính

- **Nội dung quy tắc:**
  - **Mật khẩu an toàn:** Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt. Mật khẩu phải được hash an toàn (Argon2id/Bcrypt) trước khi lưu cơ sở dữ liệu theo [Quy tắc bảo mật](../../rules/security.md).
  - **Khóa tài khoản:** Tự động khóa tạm thời 15 phút nếu nhập sai mật khẩu quá 5 lần liên tiếp để chống tấn công brute-force.
  - **Phiên làm việc (Session):** JWT Access Token có thời hạn tối đa 15 phút; Refresh Token có thời hạn tối đa 7 ngày được lưu trong HttpOnly Secure Cookie theo [Kiến trúc xác thực](../../architecture/auth.md).
  - Khi tài khoản bị vô hiệu hóa (`Disabled`), tất cả các phiên đăng nhập hiện hữu phải bị thu hồi ngay lập tức.
- **Hành vi khi vi phạm:** Báo lỗi `ACCOUNT_LOCKED` hoặc `INVALID_CREDENTIALS`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-029`).
- **Quy tắc đã chốt:** Xác thực danh tính bằng Email công ty + Mật khẩu an toàn; bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên khi tài khoản được kích hoạt; MFA là tính năng nâng cao ngoài phạm vi MVP.

### BR-SYS-002: Quản trị phân quyền (RBAC) và tính bất biến của Audit Log

- **Nội dung quy tắc:**
  - Hệ thống áp dụng mô hình phân quyền dựa trên vai trò (Role-Based Access Control).
  - Mỗi tài khoản người dùng tại một thời điểm được gán ít nhất một vai trò chính thức (`Admin`, `HR Staff`, `Manager`, `Employee`).
  - **Nhật ký kiểm toán (Audit Log):** Mọi hành vi Thêm, Sửa, Xóa dữ liệu nghiệp vụ, cấp phát quyền, đăng nhập thất bại đều phải được ghi log tự động.
  - **Tính toàn vẹn của Audit Log:** Nhật ký kiểm toán là bất biến (Append-only). Không một người dùng nào (kể cả System Administrator) có quyền chỉnh sửa hoặc xóa dữ liệu audit log.
- **Hành vi khi vi phạm:** Báo lỗi `FORBIDDEN_OPERATION` hoặc chặn truy cập không đúng quyền (`BR-AUTH-001`).
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-031`).
- **Quy tắc đã chốt:** Nhật ký kiểm toán (Audit Trail) được lưu trữ tối thiểu 12 tháng phục vụ tra cứu và kiểm toán bảo mật; tự động sao lưu định kỳ hàng ngày cùng cơ sở dữ liệu.

### BR-AUTH-001: Quyền hạn của System Administrator

- Quản trị viên hệ thống có toàn quyền cấu hình kỹ thuật, tài khoản, vai trò và phân quyền.
- **Ngoại lệ dữ liệu nhạy cảm:** Mặc định System Administrator không được tự ý xem chi tiết số tiền lương hoặc nội dung đánh giá nhân viên nếu không được phân bổ vai trò nghiệp vụ tương ứng (`PD-008`).
