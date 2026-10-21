# Business Rules — Contract Management

- **Module ID:** CON
- **Parent Spec:** docs/PRD.md#8.6
- **Traces-To:** docs/prd/function-requirement/contract-management.md
- **Use Cases:** docs/prd/usecase/contract-management.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-CON-001: Loại hợp đồng, thời hạn và tính hợp lệ

- **Nội dung quy tắc:**
  - Hợp đồng lao động tuân thủ Bộ luật Lao động Việt Nam gồm các loại chính:
    1. Hợp đồng thử việc (Tối đa 60 ngày đối với vị trí chuyên môn, 30 ngày cho vị trí khác).
    2. Hợp đồng lao động xác định thời hạn (Từ 12 đến 36 tháng; chỉ được ký tối đa 2 lần liên tiếp).
    3. Hợp đồng lao động không xác định thời hạn (Bắt buộc chuyển đổi sau khi hết lần 2 của HĐ có thời hạn).
  - Một nhân viên chỉ có duy nhất **một Hợp đồng lao động chính đang có hiệu lực (`Active`)** tại một thời điểm.
  - Phụ lục hợp đồng không được phép làm thay đổi loại hợp đồng hoặc rút ngắn thời hạn trái luật.
- **Hành vi khi vi phạm:** Báo lỗi `CONTRACT_OVERLAP_DETECTED` hoặc `INVALID_CONTRACT_TERM`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-025`).
- **Quy tắc đã chốt:** Không giới hạn số lượng phụ lục cho mỗi hợp đồng chính; mỗi phụ lục phải có số hiệu, ngày hiệu lực và nội dung điều chỉnh rõ ràng, không làm thay đổi loại hợp đồng lao động đã ký.

### BR-CON-002: Quy tắc cảnh báo hết hạn và gia hạn hợp đồng

- **Nội dung quy tắc:**
  - Hệ thống tự động kích hoạt cảnh báo hợp đồng sắp hết hạn trước **30 ngày**.
  - Thông báo cảnh báo được gửi định kỳ hàng tuần cho HR Staff và Trưởng bộ phận phụ trách qua chuông In-App và Email.
  - Khi gia hạn hợp đồng mới, hợp đồng cũ tự động chuyển trạng thái sang `Expired` vào đúng ngày hết hạn.
  - Tệp scan hợp đồng lưu trữ bắt buộc là PDF có đầy đủ chữ ký và con dấu của các bên (tối đa 5MB).
- **Hành vi khi vi phạm:** Cảnh báo đỏ nếu hợp đồng đã quá hạn mà chưa có quyết định gia hạn hoặc thôi việc.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-006, PD-025`).
- **Quy tắc đã chốt:** Hệ thống không tích hợp USB token ký số phần cứng (Out of scope); sử dụng quy trình upload file scan PDF hợp đồng đã ký tay/đóng dấu để quản lý và lưu trữ hồ sơ hợp đồng.

### BR-CON-AUTH-001: Phân quyền quản lý hợp đồng

- **Employee:** Được xem hợp đồng và phụ lục của chính mình (chế độ Read-only).
- **HR Staff:** Soạn thảo, cập nhật, theo dõi gia hạn và tải tài liệu hợp đồng.
- **Ban Giám Đốc:** Phê duyệt các điều khoản hợp đồng đặc biệt hoặc hợp đồng lãnh đạo.
