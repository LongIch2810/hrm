Trạng thái: quy tắc kỹ thuật; frontend có prototype, backend chưa triển khai.

# Quy tắc bảo mật

Áp dụng bắt buộc khi viết code xử lý tài khoản, dữ liệu HRM, input bên ngoài hoặc cấu hình môi trường.

## 1. Nguyên tắc chung

Áp dụng quy tắc đã xác nhận; tra [Auth](../architecture/auth.md) cho cơ chế xác thực và quyền.

- Từ chối thao tác khi quyền hoặc phạm vi dữ liệu chưa được xác nhận.
- Chỉ truy cập dữ liệu cần cho tác vụ và quyền đã duyệt.
- Coi mọi input từ bên ngoài là chưa đáng tin cậy; tra [Clean Code](clean-code.md) cho vị trí validate.
- Không đưa bí mật hoặc dữ liệu ngoài quyền vào response, log và bản export.

## 2. Phân loại dữ liệu

Phân loại theo mức bảo vệ; loại dữ liệu công khai chỉ tồn tại khi có nội dung được duyệt để công bố.

| Loại | Ví dụ | Quy tắc lưu/hiển thị/log |
|---|---|---|
| Công khai | Nội dung không gắn cá nhân, nếu được duyệt công bố | Chỉ công bố đúng nội dung đã duyệt; không suy ra hồ sơ HRM là công khai. |
| Nội bộ | Cấu hình, cơ cấu không chứa dữ liệu cá nhân | Giới hạn theo quyền; không log toàn bộ cấu hình. |
| Nhạy cảm | Hồ sơ nhân viên/ứng viên, công/phép, lương, đánh giá, hợp đồng, tài liệu | Mã hóa khi lưu và sao lưu; DTO theo quyền; che bớt trên danh sách theo ma trận field được duyệt; không log payload thô. |
| Bí mật xác thực | Mật khẩu/hash, khóa ký, token, credential hệ thống | Không log; không trả hash, secret hoặc refresh token trong JSON. |

- Chỉ trả field nghiệp vụ nhạy cảm qua DTO và quyền đã duyệt; không trả trực tiếp Entity.
- Không đặt thời hạn lưu hoặc job xóa khi chính sách theo loại dữ liệu và địa bàn pháp lý chưa được xác nhận.

## 3. Mật khẩu và secret

Áp dụng thuật toán đã chốt tại [Auth](../architecture/auth.md); quy tắc ở đây xác định cách dùng trong code.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Băm mật khẩu | Dùng `bcrypt` 6.0.0 với work factor 12; lưu hash có salt và tham số đi kèm. | Lưu mật khẩu bản rõ hoặc hash không salt. |
| Độ mạnh | Nhận tối thiểu 15 ký tự và tối đa 72 byte UTF-8, cả passphrase và khoảng trắng; chặn mật khẩu phổ biến/bị lộ khi có nguồn đã duyệt. | Ép ký tự đặc biệt hoặc đổi định kỳ mặc định. |
| Secret local | Đọc từ `.env` không commit và `.env.example` không có secret thật theo [Tech Stack](../architecture/tech-stack.md). | Hard-code key trong code, image hoặc file mẫu. |
| Secret staging/prod | Lấy từ kho secret của nền tảng triển khai và inject vào backend; giữ secret khỏi repo/image. | Đưa secret vào `VITE_*` hoặc bundle frontend. |
| Xoay khóa ký | Khi xoay, thay khóa một lần và vô hiệu mọi token cũ; yêu cầu đăng nhập lại. | Tiếp tục chấp nhận token ký bằng khóa cũ. |

**Status:** Confirmed — Product Owner chốt `bcrypt` 6.0.0, work factor 12 và giới hạn mật khẩu tối đa 72 byte UTF-8; đo hiệu năng khi triển khai Auth.

- Khi tăng work factor sau này, băm lại sau lần đăng nhập thành công và lưu hash mới.

## 4. Validate và chống tấn công

Chặn dữ liệu không tin cậy tại biên; tra [REST API Rules](rest-api.md) và [Clean Code](clean-code.md) cho vị trí validate.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Field lạ | Dùng DTO/ValidationPipe với `whitelist: true`; bỏ field không khai báo trước khi xử lý. | Trải toàn bộ `req.body` vào Entity. |
| SQL injection | Dùng TypeORM API/QueryBuilder và bind tham số; raw SQL chỉ khi cần và có tham số. | Ghép `employeeId` từ request vào chuỗi SQL. |
| XSS | Hiển thị text bằng JSX escaping; chỉ xét rich text sau khi có sanitizer được duyệt. | Đưa text người dùng vào `dangerouslySetInnerHTML`. |
| CSRF | Bật `enableCsrfProtection()` cho request đổi trạng thái; khai báo chính xác frontend origin tin cậy. | Coi `SameSite=Lax` là bảo vệ duy nhất. |
| SSRF | Không cho backend tải URL do client cung cấp khi chưa có tích hợp được duyệt. | Gọi `fetch(req.body.url)` từ backend. |
| File tải lên | Chỉ triển khai sau khi chốt loại, dung lượng, kiểm nội dung/quét độc hại và nơi lưu. | Chỉ kiểm phần đuôi tên file. |

## 5. Giao tiếp và cấu hình

Giới hạn truy cập từ trình duyệt và request theo môi trường; tra [Auth](../architecture/auth.md) cho nơi lưu token/cookie.

| Quy tắc | Làm | Không làm |
|---|---|---|
| HTTPS | Chỉ cho HTTP dev trên loopback; bắt buộc HTTPS tại staging/prod. | Truyền dữ liệu nhạy cảm qua HTTP ngoài local. |
| CORS | Chỉ cho origin frontend chính xác theo môi trường; cho credential để gửi refresh cookie. | Dùng origin `*` cùng credential. |
| Header | Gọi `app.useSecurityHeaders()` của NestJS 12.1; kiểm CSP/HSTS theo môi trường, tắt HSTS trên HTTP local. | Tắt header bảo vệ để bỏ qua lỗi giao diện. |
| Body JSON | Giới hạn request JSON tối đa 1 MiB; giới hạn upload chờ đặc tả. | Dùng body parser không giới hạn. |
| Rate limit | Dùng `@nestjs/throttler`: đăng nhập 5 lần/15 phút theo email+IP; refresh 30/phút/IP; API khác 120/phút/IP. | Chỉ dựa vào UI để hạn chế lượt gọi. |
| Debug | Tắt debug và stack trace trong response tại staging/prod. | Trả lỗi nội bộ đầy đủ cho client. |

## 6. Phụ thuộc, log và sự cố

Kiểm soát dependency và ghi dấu vết đủ để điều tra mà không lộ dữ liệu nhạy cảm.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Dependency | Ghi phiên bản trực tiếp chính xác, commit lockfile và dùng `npm ci`; tra [Clean Code](clean-code.md) trước khi thêm gói. | Dùng `^`/`~` hoặc tự thêm thư viện. |
| Lỗ hổng | Chạy `npm audit --audit-level=high` ở mỗi app khi đổi dependency và trước phát hành; chặn high/critical, rà và ghi nhận moderate/low. | Tự chạy `npm audit fix` rồi đổi phiên bản đã chốt. |
| Sự kiện bảo mật | Ghi đăng nhập thành/bại, refresh token dùng lại, đổi mật khẩu/quyền, từ chối truy cập, export nhạy cảm và đổi cấu hình. | Log mọi request/payload. |
| Nội dung log | Chỉ ghi metadata cần thiết: actor, thời gian, sự kiện, đối tượng, kết quả; không ghi payload hoặc giá trị trước/sau nhạy cảm. | Ghi password/hash, token, secret, lương/tài liệu thô. |
| Audit | Chỉ cho ứng dụng ghi thêm; giới hạn quyền đọc; sửa/xóa chỉ theo chính sách retention đã duyệt. | Cho sửa audit log như bản ghi nghiệp vụ. |

## 7. Cấu hình theo môi trường

**Status:** Confirmed

| Thông số | Dev | Staging | Prod |
|---|---|---|---|
| Giao tiếp | HTTP trên loopback (`127.0.0.1`); cookie theo [Auth](../architecture/auth.md) | HTTPS (TLS 1.3); cookie Secure/SameSite theo Auth | HTTPS (TLS 1.3); cookie Secure/SameSite theo Auth |
| CORS origin | `http://127.0.0.1:5173`, `http://localhost:5173` | `https://staging-hrm.example.com` (qua biến `FRONTEND_URL`) | `https://hrm.example.com` (qua biến `FRONTEND_URL`) |
| Security headers | Bật Helmet; HSTS tắt trên HTTP local | Bật Helmet đầy đủ; CSP và HSTS nghiêm ngặt | Bật Helmet đầy đủ; CSP và HSTS nghiêm ngặt |
| Body JSON/rate limit | 1 MiB; các ngưỡng ở mục 5 | 1 MiB; các ngưỡng ở mục 5 | 1 MiB; các ngưỡng ở mục 5 |
| Mã hóa dữ liệu/bản sao lưu | Local dev không bắt buộc | Bắt buộc mã hóa ổ đĩa AES-256; bản sao lưu mã hóa GPG | Bắt buộc mã hóa ổ đĩa AES-256; bản sao lưu mã hóa GPG |
| Nơi cấp secret | `.env` local không commit vào Git | Docker Secrets / Secret Manager nền tảng inject runtime | Cloud KMS / Secret Manager nền tảng inject runtime |
| Debug/stack trace trong response | Chỉ hiển thị môi trường local | Tắt hoàn toàn (chỉ trả error code chuẩn) | Tắt hoàn toàn (chỉ trả error code chuẩn) |

## 8. Checklist trước khi báo hoàn thành

Kiểm tra phần code đã sửa theo các quyết định trong tài liệu này.

- [ ] Kiểm tra quyền và phạm vi từng response/export theo [Auth](../architecture/auth.md); không lộ field ngoài DTO.
- [ ] Kiểm tra input ngoài, truy vấn SQL, XSS, CSRF và giới hạn request ở biên liên quan.
- [ ] Kiểm tra secret và dữ liệu nhạy cảm không xuất hiện trong code, bundle, log hoặc thông báo lỗi.
- [ ] Kiểm tra cấu hình HTTPS, CORS, security headers và debug theo môi trường bị ảnh hưởng.
- [ ] Kiểm tra sự kiện audit bắt buộc khi sửa xác thực, quyền, export hoặc cấu hình.
- [ ] Khi có manifest/lockfile, chạy `npm audit --audit-level=high` ở app bị ảnh hưởng; ghi rõ kết quả và mức còn lại.

## 9. Khi nghi lộ thông tin

Thực hiện theo thứ tự để giới hạn ảnh hưởng và giữ thông tin phục vụ điều tra.

1. Dừng nguồn lộ và giới hạn quyền truy cập liên quan; không xóa dấu vết trước khi lưu bằng chứng tối thiểu.
2. Thu hồi/xoay credential bị ảnh hưởng và vô hiệu phiên liên quan; khóa ký thay một lần theo mục 3.
3. Báo Product Owner và người phụ trách sự cố được chỉ định; không đưa secret hoặc dữ liệu thô vào thông báo.
4. Xác định phạm vi dữ liệu, thời điểm và tài khoản bị ảnh hưởng; xử lý nghĩa vụ thông báo theo chính sách pháp lý được duyệt.

## 10. Nguồn kiểm chứng

Tra tài liệu chính thức khi triển khai; không coi ví dụ trong nguồn là cấu hình đã được duyệt cho HRM.

- [OWASP Top 10:2025](https://top10.owasp.org/2025/0x00_2025-Introduction/) và [OWASP ASVS](https://owasp.org/projects/asvs): đối chiếu nhóm rủi ro và kiểm chứng bảo mật.
- [NestJS Security Headers](https://docs.nestjs.com/techniques/security/cors), [CSRF](https://docs.nestjs.com/security/csrf), [Validation](https://docs.nestjs.com/techniques/validation): đối chiếu API của NestJS 12.1.
- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): đối chiếu cách dùng bcrypt sau khi chốt thư viện và work factor.
- [TypeORM QueryBuilder](https://typeorm.io/docs/query-builder/select-query-builder/) và [npm audit v10](https://docs.npmjs.com/cli/v10/commands/npm-audit/): đối chiếu truy vấn và kiểm dependency.
- [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) và [Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html): đối chiếu audit và ứng phó.

## 11. Quyết định Bảo mật đã xác nhận

**Status:** Confirmed

- Địa bàn pháp lý & tuân thủ: Áp dụng cho doanh nghiệp SME tại Việt Nam, tuân thủ nghiêm ngặt Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân (PDPD).
- Mã hóa dữ liệu: Bắt buộc mã hóa lưu trữ ở mức ổ đĩa (AES-256) và bản sao lưu (GPG encryption); bảo vệ đường truyền HTTPS TLS 1.3 cho toàn bộ môi trường Staging và Production.
- Quản lý Secret: Phân tách rõ `.env` local không commit vào Git; Staging/Prod sử dụng Docker Secrets / Cloud KMS Secret Manager inject trực tiếp vào runtime của container.
- Upload tệp: Giới hạn tối đa 5 MB/tệp cho các luồng hiện có; chỉ nhận định dạng được module cho phép (CV chỉ PDF); kiểm tra MIME-type và magic bytes tại server; đổi tên tệp ngẫu nhiên UUID để chống Path Traversal.
- Rate limiting: Dùng `@nestjs/throttler` v6.4.0; API thường 120 request/phút/IP, login 5 lần/15 phút/email+IP, refresh 30 request/phút/IP theo [API spec](../api-spec.md#7-rate-limit-timeout-retry-và-idempotency).
- Audit logging: Lưu trữ bất biến (Append-only) trong bảng `audit_logs` tối thiểu 2 năm; phân quyền chặt chẽ chỉ System Administrator có quyền tra cứu.
