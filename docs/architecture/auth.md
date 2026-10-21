Trạng thái: thiết kế dự kiến, chưa có code

# Xác thực và phân quyền

## Cơ chế xác thực

Dùng JWT bearer cho bốn nhóm người dùng nội bộ; đăng nhập bằng email và mật khẩu do HRM quản lý.

| Đối tượng | Cơ chế | Phương thức đăng nhập |
|---|---|---|
| System Administrator | JWT bearer | Email và mật khẩu |
| HR Staff | JWT bearer | Email và mật khẩu |
| Department Manager | JWT bearer | Email và mật khẩu |
| Employee | JWT bearer | Email và mật khẩu |

## Token

Áp dụng JWT HS256 cho access token và refresh token.

| Thông số | Access token | Refresh token |
|---|---|---|
| Thời hạn | 15 phút | 7 ngày |
| Nơi lưu ở client | Bộ nhớ ứng dụng | Cookie HttpOnly |
| Thuật toán | HS256 | HS256 |

- Cookie refresh token dùng `HttpOnly`, `SameSite=Lax`; bật `Secure` trên HTTPS, bỏ `Secure` khi chạy local qua HTTP.
- Xoay refresh token mỗi lần dùng; lưu trạng thái phía server để thu hồi khi đăng xuất hoặc đổi mật khẩu.
- Nếu refresh token đã dùng bị dùng lại, thu hồi cả chuỗi token của lần đăng nhập đó.

## Phân quyền

Dùng RBAC với một vai trò cho mỗi tài khoản; kiểm tra quyền tại backend theo [PRD](../PRD.md#43-roles--permissions-matrix).

- Vai trò: System Administrator, HR Staff, Department Manager, Employee.
- Chỉ cấp quyền theo đúng ma trận RBAC đã xác nhận trong PRD.

**Status:** Confirmed

- Quyền chi tiết đã được chuẩn hóa và phê duyệt 100% trong ma trận RBAC tại [PRD](../PRD.md#43-roles--permissions-matrix) và các tài liệu [Function Requirement](../prd/function-requirement/):
  - `System Administrator`: Toàn quyền tài khoản người dùng, phân quyền vai trò, tham số hệ thống, audit logs; không can thiệp/sửa dữ liệu lương chi tiết.
  - `HR Staff`: Toàn quyền thao tác nghiệp vụ hồ sơ nhân sự, hợp đồng, chấm công, bảng lương, tuyển dụng, đào tạo toàn công ty.
  - `Department Manager`: Duyệt công, đơn phép, làm thêm OT và đánh giá KPI của nhân viên trong phạm vi phòng ban mình trực tiếp quản lý; xem báo cáo tổng hợp phòng ban.
  - `Employee`: Chấm công, nộp đơn phép/OT, xem bảng công và phiếu lương cá nhân, tự cập nhật thông tin liên hệ.

## Thư viện và Mã lỗi

Dùng `@nestjs/jwt` 12.0.3 cho JWT, `crypto.scrypt` của Node.js để băm mật khẩu và Guard NestJS cho quyền; tra [Tech Stack](tech-stack.md) và [Security](../rules/security.md) cho quy tắc dùng trong code.

- **Mã lỗi chuẩn hóa:**
  - `401 Unauthorized`: `AUTH_UNAUTHORIZED` (chưa đăng nhập hoặc token không hợp lệ), `AUTH_TOKEN_EXPIRED` (access token hết hạn).
  - `403 Forbidden`: `FORBIDDEN_RESOURCE` (truy cập tài nguyên ngoài phạm vi phòng ban), `INSUFFICIENT_PERMISSIONS` (vai trò không đủ quyền thực hiện thao tác).
