# Thiếu quy tắc request và lỗi render trong tài liệu React

Tra lỗi này khi viết hoặc review tài liệu phân lớp frontend React.

## Lỗi

Xác định các điểm mô tả chưa đầy đủ trước khi sửa.

- Tài liệu chưa phân biệt gọi API từ event handler hoặc Effect với việc tạo request trong render.
- Luồng đọc dữ liệu chưa nêu cách tránh kết quả request cũ ghi đè dữ liệu hiện tại.
- Phần xử lý lỗi chưa phân biệt lỗi API với lỗi render trong cây component con.

## Cách đã sửa

Áp dụng ba phần bổ sung được Product Owner xác nhận.

- Bổ sung quy tắc render thuần, cleanup và ngăn kết quả request lỗi thời trong [Frontend React](../../docs/architecture/layers/frontend-react.md).
- Bổ sung trách nhiệm Error Boundary, sơ đồ và ví dụ xử lý lỗi render.
- Giữ phạm vi Error Boundary và UI fallback là TODO; không tự chọn thư viện hoặc cấu hình.

## Tránh lặp lại

Đối chiếu cơ chế React khi review trách nhiệm UI, hook và xử lý lỗi.

- Tra tài liệu React được liên kết trong file phân lớp trước khi xác nhận quy tắc gọi API và cleanup.
- Kiểm tra luồng request lỗi thời và phân biệt lỗi API với lỗi render trước khi duyệt tài liệu.
