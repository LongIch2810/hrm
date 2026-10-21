# REST API Design Rules

Áp dụng các quy tắc này khi thiết kế, viết và review REST API của HRM.

- **Version:** 1.0
- **Last Updated:** 2026-10-21
- **Hiệu lực:** Bắt buộc khi code; contract tuân thủ chặt chẽ đặc tả API trong [api-spec.md](../api-spec.md).
- **Căn cứ:** Hướng dẫn kỹ thuật từ [Microsoft Azure REST API Guidelines](#16-references); yêu cầu sản phẩm từ [PRD](../PRD.md).

## 1. Purpose & Scope

Giữ implementation nhất quán với contract đã được xác nhận.

### REST-001: Implement the approved contract

- Đọc global contract trong [api-spec.md](../api-spec.md) và đặc tả module liên quan trước khi code.
- Không tự tạo endpoint, quyền, schema hoặc giá trị mặc định chưa được xác nhận.
- Khi thiếu quyết định ảnh hưởng implementation, áp dụng [quy tắc TBD](../../AGENTS.md#rule-undefined-requirements--decisions-tbd).
- Tra các lựa chọn chưa chốt tại [Các mục cần xác nhận](../api-spec.md#1-tổng-quan); không định nghĩa lại trong file này.

## 2. Resource Design

Biểu diễn resource và thao tác theo contract, giữ chi tiết implementation khỏi giao diện công khai.

### REST-002: Model resource operations

- Xác định resource, định danh và tác động của operation từ yêu cầu đã được xác nhận.
- Không suy ra resource công khai từ tên bảng, controller hoặc cấu trúc lưu trữ.
- Không biến quy trình nghiệp vụ chưa được xác nhận thành operation API.

### REST-003: Use consistent resource names

- Dùng [Naming](naming.md) cho casing và tên resource số nhiều; dùng contract đã chốt cho ID và quan hệ resource.
- Không tự chọn nesting hoặc tiền tố riêng cho từng module.
- Giữ tên resource nhất quán giữa URL, schema và tài liệu.

## 3. HTTP Methods

Giữ đúng ý nghĩa của method trong implementation và tài liệu.

### REST-004: Preserve method semantics

| Method | Quy tắc khi code |
|---|---|
| GET | Đọc resource; không dùng để thực hiện thay đổi nghiệp vụ được yêu cầu bởi client. |
| POST | Thực hiện thao tác tạo hoặc action theo contract; không mặc định có thể retry an toàn. |
| PUT | Thay thế biểu diễn resource theo contract; không xử lý như cập nhật một phần không được công bố. |
| PATCH | Cập nhật một phần theo định dạng và semantics đã được xác nhận. |
| DELETE | Thực hiện ngữ nghĩa xóa theo contract; không tự suy ra hard delete hay soft delete. |

- Không coi mọi method là idempotent; tra quy tắc retry tại REST-020.
- Dùng tên HTTP method viết hoa trong đặc tả và ví dụ.

### REST-005: Enforce the partial-update contract

- Chỉ hỗ trợ PATCH khi contract xác định format, trường được sửa và cách xử lý absent, null, lỗi giữa cập nhật.
- Không diễn giải omitted field thành yêu cầu xóa hoặc đặt lại giá trị nếu contract không quy định.
- Không bỏ qua trường bất biến hoặc lỗi cập nhật trái với contract.

## 4. HTTP Status Codes

Trả status phản ánh kết quả xử lý thực tế.

### REST-006: Return meaningful HTTP status

- Dùng mapping đã xác nhận tại [Shared HTTP Status Codes](../api-spec.md#6-mã-lỗi-chung).
- Không trả `200` kèm cờ lỗi để thay thế HTTP error status.
- Không trả `202` như xác nhận công việc đã hoàn tất.
- Không gửi response body khi trả `204`.
- Không dùng `201` cho thao tác không tạo resource.

### REST-007: Preserve failure signals

- Phân biệt lỗi input, truy cập, trạng thái resource và lỗi server theo mapping chung.
- Không chuyển lỗi precondition thành thành công hoặc tiếp tục ghi khi điều kiện bắt buộc không đạt.
- Chỉ trả tín hiệu throttling, retry và precondition khi cơ chế tương ứng đã được đặc tả.
- Không tự chọn giữa `403` và `404` khi policy che giấu sự tồn tại resource chưa rõ.

## 5. Request Design

Nhận dữ liệu đúng định dạng, vị trí và kiểu được công bố.

### REST-008: Match headers and media types

- Xử lý headers và media types theo [Common Request Headers](../api-spec.md#4-quy-ước-requestresponse-chung).
- Giữ `Content-Type` của response khớp representation thực tế.
- Không tự mặc định JSON, Bearer token hoặc custom header khi contract chưa chọn.
- Không xử lý tên HTTP header như giá trị phân biệt chữ hoa, chữ thường.

### REST-009: Enforce the request contract

- Đọc path, query, headers và body từ đúng vị trí được đặc tả.
- Giữ nguyên semantics của required, optional, absent, null và empty.
- Chỉ nhận trường có quyền ghi; không bind trực tiếp input thành toàn bộ đối tượng lưu trữ.
- Không tự ép kiểu, bổ sung default hoặc đổi đơn vị dữ liệu ngoài contract.

## 6. Request Validation

Chặn input không hợp lệ trước khi thay đổi dữ liệu nghiệp vụ.

### REST-010: Validate at trust boundaries

- Kiểm tra kiểu, định dạng, miền giá trị và ràng buộc đã xác nhận cho mọi nguồn input.
- Kiểm tra business rules phía server; không dựa riêng vào validation của client.
- Xử lý unknown fields và lỗi validation theo contract chung.
- Không tiếp tục thao tác phụ thuộc khi input bắt buộc không hợp lệ.

## 7. Response Design

Chỉ trả dữ liệu và cấu trúc được contract cho phép.

### REST-011: Match the response schema

- Trả đúng schema, kiểu dữ liệu và biến thể response cho từng kết quả.
- Dùng [Common Response Format](../api-spec.md#5-response-thành-công-và-lỗi); không tự thêm envelope hoặc metadata.
- Không trả trực tiếp đối tượng nội bộ nếu chứa trường ngoài response contract.
- Giữ semantics của null, trường vắng mặt và collection rỗng theo đặc tả.

## 8. Error Handling

Giữ cách biểu diễn lỗi thống nhất để client xử lý được.

### REST-012: Use the shared error contract

- Dùng [Global Error Response Schema](../api-spec.md#5-response-thành-công-và-lỗi); không tạo format lỗi riêng theo module.
- Giữ mã lỗi máy đọc được ổn định theo contract; không yêu cầu client phân tích thông báo dành cho người đọc.
- Không trả stack trace, câu truy vấn hoặc bí mật nội bộ trong lỗi.
- Không tự chọn Problem Details hoặc error envelope của Azure.

## 9. Pagination, Filtering & Sorting

Thực hiện truy vấn collection theo khả năng và giới hạn đã công bố.

### REST-013: Preserve collection traversal

- Dùng [Pagination Contract](../api-spec.md#4-quy-ước-requestresponse-chung); không tự đặt strategy, parameter hoặc page size.
- Giữ filter và sort nhất quán khi chuyển trang.
- Áp dụng phạm vi quyền dữ liệu cho mọi trang; không dùng continuation token để bỏ qua kiểm tra quyền.
- Trả tín hiệu kết thúc và xử lý token sai theo contract.

### REST-014: Bound supported queries

- Chỉ hỗ trợ fields, operators, sort directions và tổ hợp query đã được đặc tả.
- Không chuyển trực tiếp query của client thành câu truy vấn lưu trữ.
- Áp dụng giới hạn đã xác nhận; không âm thầm bỏ qua filter hoặc sort không được hỗ trợ.
- Tra cú pháp và lỗi tại [Filtering & Sorting Contract](../api-spec.md#4-quy-ước-requestresponse-chung).

## 10. Authentication & Authorization

Kiểm tra danh tính và quyền trên server trước khi đọc hoặc thay đổi dữ liệu được bảo vệ.

### REST-015: Enforce access at each boundary

- Dùng cơ chế tại [Authentication Mechanism](../api-spec.md#3-xác-thực-và-phân-quyền) và quyền tại [Authorization Model](../api-spec.md#3-xác-thực-và-phân-quyền).
- Kiểm tra quyền gọi operation, quyền trên resource đích và quyền đọc hoặc ghi từng nhóm trường được bảo vệ.
- Không suy ra quyền từ ID do client gửi hoặc việc client ẩn nút trên giao diện.
- Không mặc định Admin hoặc HR có toàn quyền; tuân thủ Authorization Matrix đã xác nhận.

## 11. Security

Bảo vệ dữ liệu HRM tại ranh giới request, response và log.

### REST-016: Enforce the security contract

- Áp dụng [Security Contract](../api-spec.md#4-quy-ước-requestresponse-chung) cho browser access và cache; tra giới hạn tại [mục 7](../api-spec.md#7-rate-limit-timeout-retry-và-idempotency).
- Không đưa dữ liệu ngoài phạm vi quyền vào response, export hoặc log.
- Không log toàn bộ payload theo mặc định.
- Không tự tạo tenant header hoặc coi hệ thống là multi-tenant khi chưa có yêu cầu.

### REST-017: Protect credentials

- Tra [Security](security.md) cho credential không được trả về hoặc ghi log.
- Không coi việc chọn JWT, session hoặc OAuth là đủ để cấp quyền truy cập.
- Không tự chọn cơ chế authentication thay cho quyết định trong global contract.

## 12. Versioning & Compatibility

Giữ client đang được hỗ trợ hoạt động theo contract đã công bố.

### REST-018: Follow the selected versioning strategy

- Dùng base URL và version selector tại [API Base URL & Versioning](../api-spec.md#2-base-url-và-versioning).
- Không tự thêm `/v1`, query version hoặc version header.
- Xử lý version thiếu, sai hoặc hết hỗ trợ theo contract chung.

### REST-019: Review observable compatibility

- Kiểm tra tác động đến client trước khi đổi field, kiểu, enum, required input, status hoặc semantics.
- Không âm thầm xóa, đổi tên hoặc đổi ý nghĩa thành phần contract đã công bố.
- Áp dụng contract compatibility tại [Quy ước request/response chung](../api-spec.md#4-quy-ước-requestresponse-chung).
- Không coi mọi thay đổi bổ sung field hoặc enum là tự động tương thích.

## 13. Idempotency & Concurrency

Giữ tác động của retry và cập nhật đồng thời đúng với contract.

### REST-020: Honor retry and concurrency guarantees

- Giữ hiệu ứng idempotent của PUT và DELETE; response giữa các lần gọi có thể khác nhau.
- Không mặc định POST hoặc PATCH chống trùng khi retry.
- Chỉ dùng idempotency key, ETag hoặc conditional headers theo cơ chế đã được xác nhận.
- Khi hỗ trợ precondition, kiểm tra trước khi ghi; không âm thầm bỏ qua.
- Không tự đặt key expiry, retry count hoặc chính sách giải quyết xung đột.

## 14. Contract Documentation

Giữ đặc tả và implementation thống nhất khi sửa API.

### REST-021: Reuse shared definitions

- Tham chiếu schema và quy ước chung từ [api-spec.md](../api-spec.md); không sao chép sang từng module.
- Dùng định dạng và phiên bản công cụ đặc tả đã được xác nhận.
- Không tự chọn OpenAPI version hoặc tạo shared field chưa được duyệt.

### REST-022: Keep module contracts traceable

- Khi được giao sửa API module, cập nhật đúng đặc tả của module và liên kết requirement liên quan.
- Ghi đúng method, input, output, permission và lỗi đã được xác nhận.
- Đồng bộ đặc tả khi implementation thay đổi contract; không để tài liệu mô tả hành vi khác code.

## 15. Code Review Checklist

Kiểm tra các điểm sau cho phần API được thêm hoặc sửa.

- Đối chiếu resource, method, status, input và output với contract.
- Kiểm tra validation, quyền trên object và trường nhạy cảm.
- Kiểm tra lỗi, retry, precondition và compatibility nếu thay đổi có liên quan.
- Không xác nhận phần implementation chưa vượt qua toàn bộ unit/integration test là hoàn tất.

## 16. References

Tra nguồn kỹ thuật khi cần hiểu căn cứ của các quy tắc.

- **S1:** [Microsoft Azure REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md), Microsoft; nhánh `vNext`, đã kiểm tra ngày 2026-10-15.
- Tra các mục REST, HTTP Request / Response Pattern, Resource Schema & Field Mutability, Handling Errors, Collections, Conditional Requests.
- Xem S1 là engineering guideline cho Azure; không coi convention riêng của Azure là chuẩn HTTP hoặc contract HRM.
