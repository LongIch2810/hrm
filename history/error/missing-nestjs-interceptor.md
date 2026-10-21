# Thiếu Interceptor trong tài liệu phân lớp NestJS

Tra lỗi này khi viết hoặc review tài liệu vòng đời request NestJS.

## Lỗi

Xác định phần mô tả chưa đầy đủ trước khi sửa.

- `backend-nestjs.md` có Guard, Pipe, Controller, Service, Repository và Exception Filter nhưng thiếu Interceptor.
- Sơ đồ và ví dụ request chưa thể hiện phần xử lý trước/sau handler của Interceptor.

## Cách đã sửa

Áp dụng phần bổ sung được Product Owner xác nhận.

- Thêm Interceptor vào bảng trách nhiệm, sơ đồ và ví dụ request trong [Backend NestJS](../../docs/architecture/layers/backend-nestjs.md).
- Giữ mục đích cụ thể và phạm vi áp dụng là TODO; không tự quyết định logging, cache hoặc response envelope.

## Tránh lặp lại

Đối chiếu cơ chế framework khi review tài liệu luồng request.

- Tra [NestJS Request Lifecycle](https://docs.nestjs.com/faq/request-lifecycle) trước khi xác nhận thứ tự xử lý.
- Kiểm tra bảng trách nhiệm, sơ đồ và ví dụ cùng mô tả Interceptor trước/sau handler khi thành phần này thuộc phạm vi tài liệu.
