# Business Rules — Employee Management

- **Module ID:** EMP
- **Parent Spec:** docs/PRD.md#8.1
- **Traces-To:** docs/prd/function-requirement/employee-management.md
- **Use Cases:** docs/prd/usecase/employee-management.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-EMP-001: Dữ liệu và định danh hồ sơ nhân viên

- **Nội dung quy tắc:**
  - Mỗi nhân viên phải có một mã định danh duy nhất (Mã NV) và số định danh cá nhân (CCCD/Hộ chiếu).
  - Không cho phép trùng lặp CCCD hoặc Email chính trong toàn bộ hệ thống.
  - Các trường thông tin bắt buộc gồm: Họ và tên, Ngày sinh, Giới tính, Phòng ban, Chức vụ, Ngày bắt đầu làm việc.
- **Hành vi khi vi phạm:** Hệ thống từ chối lưu và trả thông báo lỗi `DUPLICATE_IDENTIFIER` hoặc `MISSING_REQUIRED_FIELD`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-009`).
- **Quy tắc đã chốt:** Mã nhân viên do hệ thống tự động sinh theo mẫu `EMP0001`, `EMP0002`... tăng dần; không được phép chỉnh sửa sau khi tạo. Nhân viên nước ngoài sử dụng số Hộ chiếu thay cho CCCD.

### BR-EMP-002: Trạng thái, lịch sử và tài liệu hồ sơ

- **Nội dung quy tắc:**
  - Vòng đời trạng thái làm việc gồm: `Probation` (Thử việc) $\rightarrow$ `Active` (Chính thức) $\rightarrow$ `OnLeave` (Nghỉ dài hạn) $\rightarrow$ `Terminated` (Đã nghỉ việc).
  - Chỉ HR Staff có thẩm quyền thay đổi trạng thái làm việc của nhân viên.
  - Mọi thay đổi về chức vụ, phòng ban, mức lương phải được ghi nhận vào Lịch sử công tác với ngày hiệu lực rõ ràng.
  - Tệp tài liệu đính kèm (bằng cấp, hợp đồng scan, CCCD) giới hạn dung lượng tối đa 5MB/tệp, định dạng PDF, PNG, JPG.
- **Hành vi khi vi phạm:** Báo lỗi `UNAUTHORIZED_STATUS_CHANGE` hoặc `FILE_SIZE_EXCEEDED`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-010, PD-011`).
- **Quy tắc đã chốt:** Hồ sơ và tài liệu của nhân viên sau khi thôi việc được lưu trữ tối thiểu 5 năm dưới dạng lưu trữ an toàn (Soft-delete), phục vụ kiểm toán và tra cứu theo quy định pháp luật.

### BR-AUTH-001: Phân quyền truy cập hồ sơ nhân viên

- **Employee:** Chỉ được xem hồ sơ của chính mình; chỉ được chỉnh sửa thông tin liên hệ (SĐT, địa chỉ, người liên hệ khẩn cấp).
- **Department Manager:** Chỉ được xem thông tin công tác của nhân viên trực thuộc phòng ban mình; không được xem thông tin tài chính/lương.
- **HR Staff:** Được quản lý toàn bộ hồ sơ trong phạm vi được phân quyền (`PD-008`).
