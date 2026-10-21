# HRM API Specification

Tóm tắt quy ước REST API đã được Product Owner xác nhận. Dùng [OpenAPI 3.1.0](openapi.yaml) làm nguồn contract chính thức; khi hai tài liệu khác nhau, sửa Markdown theo OpenAPI.

## Cấu trúc đặc tả

**Status:** Confirmed

- Ghi quy ước chung tại `docs/openapi.yaml`; giữ file này làm mục lục và bản giải thích ngắn.
- Ghi mô tả nghiệp vụ, FR/BR/AC của từng module tại `docs/api-spec/<module>.md` khi đặc tả module đó.
- Ghi mọi endpoint và schema đã duyệt của các module trong cùng một `docs/openapi.yaml`.
- Không tạo endpoint từ ví dụ trong Sprint hoặc từ giao diện mock khi chưa duyệt contract module.

## Danh mục contract theo module

**Status:** TBD (To Be Determined)

- Chưa có contract endpoint hoặc DTO của module nào được Product Owner duyệt.
- Module nào cần đặc tả đầu tiên, và ai duyệt từng contract?

## 1. Tổng quan

**Status:** Confirmed — Quy ước chung áp dụng cho cả 12 module.

- Dùng OpenAPI 3.1.0 tại [openapi.yaml](openapi.yaml) làm nguồn chính thức.
- Áp dụng [REST API Rules](rules/rest-api.md) khi thiết kế và triển khai.
- Mọi thay đổi contract phải cập nhật OpenAPI và bản tóm tắt liên quan cùng lúc.

## 2. Base URL và versioning

**Status:** Confirmed

- Đặt mọi endpoint dưới `/api/v1`; không dùng header hoặc query để chọn version.
- URL thiếu version hoặc dùng version chưa hỗ trợ trả `404 RESOURCE_NOT_FOUND`; không chuyển hướng hoặc tự đoán version.
- Giữ field, status và ý nghĩa đã công bố trong `/api/v1`; thay đổi phá vỡ contract phải dùng `/api/v2` sau khi được duyệt.
- Host theo từng môi trường nằm trong cấu hình triển khai, không cố định trong contract chung.

## 3. Xác thực và phân quyền

**Status:** Confirmed cho cơ chế chung; endpoint và DTO Auth còn TBD (To Be Determined).

- Gửi access token JWT HS256 qua `Authorization: Bearer <token>`; thời hạn 15 phút.
- Gửi refresh token JWT HS256 qua cookie HttpOnly; thời hạn 7 ngày, `SameSite=Lax`, `Secure` trên HTTPS.
- Dùng RBAC và phạm vi dữ liệu theo [Auth](architecture/auth.md) và [ma trận PRD](PRD.md#43-roles--permissions-matrix).
- Trả `403 INSUFFICIENT_PERMISSIONS` khi vai trò không được thực hiện thao tác hoặc Manager xem nhân viên ngoài phòng ban.
- Trả `404 RESOURCE_NOT_FOUND` khi tài nguyên khác nằm ngoài phạm vi truy cập; không tiết lộ sự tồn tại.

**Status:** TBD (To Be Determined) — Endpoint và DTO Auth chưa được duyệt.

- Endpoint, payload, cookie path và quyền riêng từng operation là gì?

## 4. Quy ước request/response chung

**Status:** Confirmed cho các quy ước dưới đây.

- Dùng JSON UTF-8 với `Content-Type: application/json` cho request có JSON body và `Accept: application/json`; endpoint tệp khai báo media type riêng.
- Server tạo `requestId` cho mỗi request, trả trong `meta.requestId` và header `X-Request-Id`.
- Biểu diễn ngày trong JSON request/response bằng `DD/MM/YYYY`; thời điểm bằng `DD/MM/YYYY HH:mm:ss` theo giờ Việt Nam UTC+7.
- Với `PATCH`, field vắng mặt giữ nguyên; `null` xóa giá trị nếu field đó cho phép null.
- Trong response, field thuộc schema nhưng chưa có giá trị được trả `null` nếu schema cho phép; không tự lược bỏ field.
- Từ chối query parameter hoặc JSON field ngoài contract bằng `400 VALIDATION_ERROR`, nêu tên field sai.
- Dùng `page` bắt đầu từ 1 và `pageSize` mặc định 20, tối đa 100 cho danh sách phân trang.
- Trả `400 VALIDATION_ERROR` cho `page` hoặc `pageSize` sai kiểu, sai phạm vi; không âm thầm sửa giá trị.
- Dùng `sortBy=<field>&sortOrder=asc|desc`; dùng query trực tiếp cho filter, ví dụ `departmentId=...&status=...`.
- Mỗi module công bố field filter, sort được phép và giá trị mặc định riêng nếu có.
- Trang vượt quá trang cuối trả `200` với `data: []` và tổng thực; danh sách rỗng có `totalItems: 0`, `totalPages: 0`.

**Status:** Confirmed — Response chứa token và mọi response API cần đăng nhập dùng `Cache-Control: no-store`.

**Status:** TBD (To Be Determined) — Chính sách cache cho response API công khai, nếu có, chưa được duyệt.

- Endpoint công khai nào được phép cache và trong bao lâu?

## 5. Response thành công và lỗi

**Status:** Confirmed

- Mọi response có body thành công dùng `{data,meta}`; response lỗi dùng `{error:{code,message,details},meta}`.
- `meta` luôn có `requestId` và `timestamp`; danh sách phân trang thêm `page`, `pageSize`, `totalItems`, `totalPages`.
- `error.details` là mảng `{field,code,message}` cho lỗi từng field; dùng `[]` nếu không có lỗi field.
- `error.code` dùng `UPPER_SNAKE_CASE`; mã chung ở mục 6, mã nghiệp vụ ở contract module.
- `204 No Content` không có response body; vẫn trả `X-Request-Id`.

```json
{
  "data": [],
  "meta": {
    "requestId": "request-id",
    "timestamp": "21/10/2026 15:30:00",
    "page": 1,
    "pageSize": 20,
    "totalItems": 0,
    "totalPages": 0
  }
}
```

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

Các giá trị trong ví dụ chỉ minh họa cấu trúc, không xác nhận DTO hay endpoint module.

## 6. Mã lỗi chung

**Status:** Confirmed

| HTTP | `error.code` | Trường hợp chung |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Input sai hoặc field ngoài contract. |
| 401 | `AUTH_UNAUTHORIZED` | Thiếu hoặc sai thông tin xác thực. |
| 401 | `AUTH_TOKEN_EXPIRED` | Access token hết hạn. |
| 403 | `INSUFFICIENT_PERMISSIONS` | Vai trò không có quyền thao tác hoặc Manager xem nhân viên ngoài phòng ban. |
| 404 | `RESOURCE_NOT_FOUND` | Không tìm thấy tài nguyên, tài nguyên khác ngoài phạm vi truy cập hoặc URL/version không hỗ trợ. |
| 409 | `RESOURCE_CONFLICT` | Xung đột trạng thái tài nguyên. |
| 429 | `RATE_LIMIT_EXCEEDED` | Vượt giới hạn request hoặc tài khoản tạm khóa sau 5 lần đăng nhập sai. |
| 500 | `INTERNAL_ERROR` | Lỗi server; không lộ chi tiết nội bộ. |

- Dùng `200` cho đọc/sửa, `201` cho tạo và `204` cho xóa theo operation đã duyệt.
- Contract module khai báo mã lỗi nghiệp vụ và các status bổ sung nếu cần.

## 7. Rate limit, timeout, retry và idempotency

**Status:** Confirmed cho giới hạn và tín hiệu retry.

- API thường: 120 request/phút/IP; login: 5 lần/15 phút/email+IP; refresh: 30 request/phút/IP.
- Khi trả `429 RATE_LIMIT_EXCEEDED`, gửi `Retry-After` là số giây chờ; với tài khoản tạm khóa, dùng số giây còn lại trong thời gian khóa 15 phút.
- Client chỉ tự retry GET hoặc request có `Idempotency-Key` sau khi nhận `429`.
- Dùng header `Idempotency-Key` cho operation POST được contract module chỉ rõ; không tự áp dụng cho mọi POST.
- Lưu kết quả theo `Idempotency-Key` trong 24 giờ; cùng key và payload trả lại kết quả đã lưu, cùng key nhưng khác payload trả `409 RESOURCE_CONFLICT`.
- Timeout xử lý HTTP thông thường là 30 giây; operation đặc biệt phải được khai báo trong contract module.
- Với mọi dữ liệu có thể sửa, server từ chối lượt lưu dựa trên bản cũ; client yêu cầu người dùng tải lại dữ liệu trước khi sửa tiếp.
- Kiểm tra quyền, trạng thái nghiệp vụ và bản đang sửa tại thời điểm lưu; `PATCH` vẫn giữ nguyên field vắng mặt.
- EMP đã xác nhận cột Version để phát hiện bản cũ; cách truyền phiên bản qua API vẫn cần xác nhận trong contract module.

**Status:** TBD (To Be Determined)

- Operation nào yêu cầu `Idempotency-Key`?
- Operation nào có timeout khác mức 30 giây?
- Contract module truyền phiên bản bản ghi bằng `ETag`/`If-Match` hay field khác; HTTP status và `error.code` nào báo bản cũ?
