# Business Rules — Attendance Management

- **Module ID:** ATT
- **Parent Spec:** docs/PRD.md#8.2
- **Traces-To:** docs/prd/function-requirement/attendance-management.md
- **Use Cases:** docs/prd/usecase/attendance-management.md
- **Core Workflow:** docs/prd/workflow/attendance-workflow.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-ATT-001: Ghi nhận thời gian và quản lý ca làm việc

- **Nội dung quy tắc:**
  - **Khung giờ hành chính chuẩn:** 08:00 - 17:30 (nghỉ trưa 12:00 - 13:30, chuẩn 8 giờ làm việc/ngày). Làm việc từ Thứ Hai đến Thứ Sáu, nghỉ Thứ Bảy và Chủ Nhật.
  - **Phương thức ghi nhận:** Kết hợp Check-in/Check-out trực tiếp trên Web và Import file Excel từ máy chấm công.
  - **Chấm công Web:** Ghi IP và thông tin thiết bị; không giới hạn IP công ty hoặc thu thập GPS.
  - **Múi giờ:** Lấy theo giờ máy chủ UTC chuẩn và chuyển đổi theo múi giờ Việt Nam (GMT+7).
  - **Chống trùng lặp:** Nếu có hai lần bấm check-in/out trong vòng 60 giây, hệ thống chỉ giữ lần ghi nhận đầu tiên.
  - **Hoàn tất ngày công:** Từ chối check-in lại sau khi đã check-in và check-out trong ngày; nhân viên gửi giải trình nếu cần sửa công.
  - **OT ngày nghỉ:** Cho phép check-in/out trên Web khi đã có đơn OT được duyệt cho ngày đó.
  - **Lệch nguồn:** Khi giờ Web và file máy khác nhau cho cùng nhân viên/ngày, HR đối soát và chọn giờ có hiệu lực; không tự ghi đè bằng nguồn nhập sau.
- **Hành vi khi vi phạm:** Lượt bấm lặp trong 60 giây báo `RAPID_CHECKIN_DETECTED`; dòng import không hợp lệ bị từ chối.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-013, PD-014).

### BR-ATT-002: Quy tắc tính đi muộn, về sớm và làm thêm giờ (Overtime)

- **Nội dung quy tắc:**
  - **Ân hạn đi muộn (Grace period):** Cho phép ân hạn đi muộn tối đa 15 phút. Check-in từ 08:00 đến 08:15 được coi là đúng giờ; check-in sau 08:15 bị đánh dấu là 'Đi muộn' và số phút muộn được tính từ 08:00.
  - **Về sớm:** Check-out trước 17:30 bị đánh dấu là 'Về sớm'. Số phút về sớm tính từ thời điểm check-out đến 17:30.
  - **Làm thêm giờ (OT):** Bắt buộc phải có 'Đơn đăng ký làm thêm giờ' được Manager trực tiếp phê duyệt trước mới được ghi nhận giờ OT vào bảng công. Mọi thời gian làm ngoài giờ không có đơn duyệt đều không được tính công OT.
  - **Làm tròn thời gian:** Làm tròn lên thời gian OT thực tế theo block 30 phút; 1 giờ 20 phút tính 1 giờ 30 phút.
- **Hành vi khi vi phạm:** Ghi nhận lỗi `UNAUTHORIZED_OVERTIME` nếu không có đơn duyệt.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-014).

### BR-ATT-AUTH-001: Phân quyền dữ liệu chấm công

- **Employee:** Chỉ được xem lịch sử chấm công và bảng công của chính mình.
- **Department Manager:** Được xem bảng công tổng hợp của phòng ban và duyệt đơn giải trình công/OT.
- **HR Staff:** Có quyền đối soát, điều chỉnh bảng công bất thường và chốt kỳ công sang module Lương.
