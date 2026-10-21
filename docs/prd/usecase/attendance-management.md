# 7.3. Attendance Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/attendance-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý chấm công (ATT).

- **Phạm vi module:** Ghi nhận Check-in/Check-out, ca làm việc, tính toán đi muộn/về sớm, quản lý làm thêm giờ (OT), bảng công cá nhân/phòng ban và chốt công tháng chuyển sang tính lương.
- **Actors liên quan:**
  - `Employee`: Thực hiện Check-in / Check-out hàng ngày trên Web; xem bảng công cá nhân; nộp đơn đăng ký làm thêm giờ (OT).
  - `Department Manager`: Xem bảng công nhân viên thuộc phòng ban mình phụ trách; phê duyệt hoặc từ chối đơn đăng ký làm thêm giờ (OT).
  - `HR Staff`: Cấu hình ca làm việc, import file Excel máy chấm công, điều chỉnh giải trình công và chốt bảng công tổng hợp tháng gửi sang module Payroll.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-ATT-001 | As an Employee, I want thực hiện Check-in tại giao diện web với 1 click khi bắt đầu làm việc, So that hệ thống ghi nhận chính xác thời điểm có mặt làm việc của tôi. | FR-ATT-001 | Ghi nhận timestamp chính xác đến giây; lưu IP/User-Agent; hiển thị trạng thái Đúng giờ hoặc Đi muộn. |
| US-ATT-002 | As an Employee, I want thực hiện Check-out khi kết thúc ngày làm việc, So that hệ thống tính toán tổng số giờ làm việc thực tế trong ngày của tôi. | FR-ATT-002 | Giờ check-out phải sau giờ check-in; tự động tính tổng giờ làm việc (trừ giờ nghỉ trưa 1.5h). |
| US-ATT-003 | As an Employee, I want tra cứu lịch sử chấm công chi tiết theo ngày/tuần/tháng, So that tôi có thể theo dõi sự chuyên cần và kịp thời phát hiện sai sót để khiếu nại. | FR-ATT-003 | Hiển thị danh sách các ngày công kèm giờ vào, giờ ra, số phút muộn/sớm và trạng thái công. |
| US-ATT-004 | As a HR Staff, I want cấu hình ca làm việc chuẩn (08:00 - 17:30, nghỉ trưa 12:00 - 13:30, T2 - T6) và quy tắc ân hạn đi muộn, So that hệ thống tự động đối soát giờ làm việc thống nhất. | FR-ATT-004 | Ca chuẩn 8 giờ làm việc; thời gian ân hạn 15 phút (đến 08:15); sau 08:15 tính muộn từ mốc 08:00. |
| US-ATT-005 | As an Employee / System, I want hệ thống tự động phát hiện và ghi nhận số phút đi muộn khi check-in sau thời gian ân hạn, So that dữ liệu kỷ luật lao động được minh bạch. | FR-ATT-005 | Check-in <= 08:15: Không tính muộn; Check-in > 08:15: Số phút muộn = Thời gian check-in - 08:00. |
| US-ATT-006 | As an Employee / System, I want hệ thống tự động ghi nhận số phút về sớm nếu check-out trước giờ tan ca (17:30), So that việc đảm bảo đủ thời lượng làm việc được giám sát chặt chẽ. | FR-ATT-006 | Check-out < 17:30: Ghi nhận trạng thái Về sớm; Số phút sớm = 17:30 - Thời gian check-out. |
| US-ATT-007 | As an Employee, I want tạo đơn đăng ký làm thêm giờ (OT) gửi Manager duyệt trước khi làm việc, So that số giờ OT được tính hợp lệ vào bảng công và bảng lương. | FR-ATT-007 | Làm tròn block 30 phút; chỉ đơn OT được Manager duyệt mới được cộng giờ công làm thêm. |
| US-ATT-008 | As an Employee, I want xem bảng công tổng hợp cá nhân theo từng tháng (tổng công chuẩn, công thực tế, ngày nghỉ phép, giờ OT), So that tôi nắm rõ số công của mình trước khi chốt lương. | FR-ATT-008 | Hiển thị dạng lịch (Calendar view) hoặc bảng chi tiết; thể hiện đầy đủ các loại công. |
| US-ATT-009 | As a Department Manager, I want xem bảng công của toàn bộ nhân viên trong phòng ban mình quản lý, So that tôi giám sát được tình hình chuyên cần của đội ngũ trực thuộc. | FR-ATT-009 | Chỉ hiển thị nhân viên thuộc phòng ban mình; lọc theo ngày/tháng; hỗ trợ xuất bảng đối soát. |
| US-ATT-010 | As a HR Staff, I want tổng hợp dữ liệu chấm công cả tháng thành Bảng tổng hợp công và đồng bộ sang phân hệ Tính lương (PAY), So that việc tính lương được thực hiện tự động và chính xác. | FR-ATT-010 | Tích hợp dữ liệu từ Check-in/out, đơn nghỉ phép (LEAVE) và đơn OT đã duyệt; khóa bảng công sau khi chốt. |

---

## 2. Use Case Đặc tả chi tiết

### UC-ATT-001: Thực hiện Check-in / Check-out hàng ngày

- **Mã FR:** FR-ATT-001, FR-ATT-002, FR-ATT-005, FR-ATT-006.
- **Actor chính:** Employee.
- **Actor phụ:** System (tự động tính toán số phút muộn/sớm).
- **Tiền điều kiện:** Nhân viên đã đăng nhập vào hệ thống; ngày hiện tại là ngày làm việc hợp lệ.
- **Luồng sự kiện chính (Basic Flow):**
  1. Employee truy cập màn hình chính (Dashboard) hoặc trang "Chấm công".
  2. Hệ thống hiển thị đồng hồ thời gian thực và nút hành động:
     - Nếu chưa check-in trong ngày: Nút "Check-in" hiển thị màu xanh lá.
     - Nếu đã check-in nhưng chưa check-out: Nút "Check-out" hiển thị màu cam kèm thời gian check-in trước đó.
  3. **Thao tác Check-in:**
     - Employee nhấn nút "Check-in".
     - Hệ thống lấy thời gian hiện tại từ Server (không dùng giờ client để chống gian lận).
     - Hệ thống so sánh với ca làm việc chuẩn (08:00):
       - Nếu giờ check-in <= 08:15: Trạng thái = `ON_TIME` (Đúng giờ), số phút muộn = 0.
       - Nếu giờ check-in > 08:15: Trạng thái = `LATE` (Đi muộn), số phút muộn = `(Giờ check-in - 08:00)`.
     - Hệ thống lưu bản ghi vào bảng `attendance_records` với `check_in_time`, IP client, trạng thái.
     - Hiển thị thông báo thành công: "Check-in thành công lúc HH:mm:ss. Trạng thái: [Đúng giờ / Đi muộn X phút]".
  4. **Thao tác Check-out:**
     - Employee nhấn nút "Check-out" vào cuối ngày làm việc.
     - Hệ thống lấy thời gian server làm `check_out_time`.
     - Hệ thống kiểm tra:
       - Nếu `check_out_time` < 17:30: Đánh dấu `EARLY_LEAVE` (Về sớm), số phút về sớm = `(17:30 - check_out_time)`.
     - Hệ thống tính toán tổng thời gian làm việc trong ngày:
       $$\text{Work Hours} = (\text{check\_out\_time} - \text{check\_in\_time}) - \text{Thời gian nghỉ trưa (1.5h nếu làm vắt qua trưa)}$$
     - Cập nhật bản ghi `attendance_records` và hiển thị tóm tắt ngày công.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Check-in nhiều lần:* Nếu người dùng đã Check-in và Check-out trong ngày mà muốn Check-in lại (ví dụ ca làm việc chia nhỏ hoặc quên), hệ thống hỏi: "Bạn đã hoàn tất ngày công, bạn có muốn cập nhật lại lượt check-out không?" hoặc từ chối với lỗi `409 CONFLICT` (`ATTENDANCE_ALREADY_EXISTS`).
  - *E2 - Check-out trước khi Check-in:* Hệ thống chặn nút Check-out khi chưa có Check-in.
- **Hậu điều kiện:** Dữ liệu chấm công được lưu vết tức thời, hiển thị trên bảng công cá nhân.

---

### UC-ATT-002: Đăng ký và phê duyệt làm thêm giờ (Overtime - OT)

- **Mã FR:** FR-ATT-007.
- **Actor:** Employee (tạo đơn), Department Manager (duyệt đơn).
- **Tiền điều kiện:** Nhân viên có tài khoản hoạt động.
- **Dữ liệu đầu vào (Input Fields):** Ngày làm thêm, Giờ bắt đầu OT, Giờ kết thúc OT, Lý do làm thêm, Dự án/Hạng mục công việc.
- **Luồng sự kiện chính (Basic Flow):**
  1. Employee mở form "Đăng ký làm thêm giờ (OT)".
  2. Employee chọn Ngày làm việc, nhập Giờ bắt đầu (ví dụ: 18:00) và Giờ kết thúc (ví dụ: 20:30).
  3. Hệ thống tự động tính thời lượng: 2.5 giờ (150 phút), làm tròn theo block 30 phút (`PD-010`).
  4. Employee nhập lý do và nhấn "Gửi đơn phê duyệt".
  5. Hệ thống lưu đơn với trạng thái `PENDING` và gửi email/thông báo thông chuông đến Department Manager trực tiếp.
  6. Department Manager mở danh sách "Duyệt đơn OT phòng ban", kiểm tra lý do và khối lượng công việc.
  7. Manager chọn:
     - "Phê duyệt" (Approve): Hệ thống đổi trạng thái đơn thành `APPROVED`. Khi chốt công tháng, số giờ OT này được ghi nhận chính thức vào hệ thống tính lương.
     - "Từ chối" (Reject): Manager bắt buộc nhập lý do từ chối. Hệ thống chuyển trạng thái đơn sang `REJECTED` và gửi thông báo lại cho nhân viên.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - OT không có đơn duyệt:* Nếu nhân viên check-out muộn (ví dụ 20:00) nhưng không có đơn OT được duyệt trước, hệ thống coi đây là việc cá nhân và KHÔNG tính giờ làm thêm (`BR-ATT-001`).
- **Hậu điều kiện:** Số giờ OT được duyệt sẵn sàng cho bảng tổng hợp công tháng.

---

### UC-ATT-003: Tra cứu lịch sử chấm công và bảng công cá nhân

- **Mã FR:** FR-ATT-003, FR-ATT-008.
- **Actor:** Employee.
- **Tiền điều kiện:** Người dùng đã xác thực.
- **Luồng sự kiện chính (Basic Flow):**
  1. Employee truy cập menu "Bảng công cá nhân".
  2. Hệ thống mặc định tải dữ liệu của tháng hiện tại.
  3. Giao diện hiển thị:
     - Widget tổng quan: Tổng ngày công thực tế, Số ngày nghỉ phép đã duyệt, Số lần đi muộn, Số lần về sớm, Tổng giờ OT.
     - Chế độ xem Lịch (Calendar View): Mỗi ô ngày hiển thị giờ vào/ra và tag màu (Xanh: Đủ công, Vàng: Đi muộn/Về sớm, Đỏ: Vắng mặt, Tím: Nghỉ phép có lương).
     - Chế độ xem Danh sách chi tiết (Table View).
  4. Employee có thể chọn xem các tháng trước đó qua bộ chọn tháng (`YYYY-MM`).
- **Hậu điều kiện:** Dữ liệu cá nhân được phản ánh minh bạch, không truy cập được dữ liệu người khác.

---

### UC-ATT-004: Quản lý bảng công phòng ban

- **Mã FR:** FR-ATT-009.
- **Actor:** Department Manager.
- **Tiền điều kiện:** User có vai trò `Department Manager`.
- **Luồng sự kiện chính (Basic Flow):**
  1. Manager vào mục "Quản lý chấm công" > "Bảng công phòng ban".
  2. Hệ thống kiểm tra vai trò và chỉ truy vấn các bản ghi chấm công của nhân viên thuộc `manager.department_id`.
  3. Bảng công phòng ban hiển thị dạng ma trận tháng (cột: các ngày 1 đến 31; hàng: từng nhân viên).
  4. Manager kiểm tra tỷ lệ chuyên cần, các trường hợp nhân viên vắng mặt không lý do để nhắc nhở.
  5. Manager có thể nhấn nút "Xuất Excel bảng công phòng" để phục vụ họp giao ban.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Truy cập ngoài phạm vi:* Nếu Manager cố tình xem phòng ban khác, hệ thống chặn với lỗi `403 FORBIDDEN` (`FORBIDDEN_RESOURCE`).
- **Hậu điều kiện:** Bảng công được giám sát chặt chẽ ở cấp quản lý trực tiếp.

---

### UC-ATT-005: Nhập file máy chấm công và chốt bảng công tháng

- **Mã FR:** FR-ATT-010.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Đã kết thúc tháng làm việc hoặc định kỳ đối soát.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff vào chức năng "Tổng hợp công tháng".
  2. **Trường hợp import từ máy chấm công:**
     - HR Staff tải tệp Excel/CSV kết xuất từ máy chấm công vân tay/khuôn mặt.
     - Hệ thống đọc file, map mã chấm công với `employee_code`, đối soát và bổ sung giờ check-in/out vào cơ sở dữ liệu.
  3. **Tổng hợp dữ liệu toàn diện:**
     - Hệ thống kết hợp 3 nguồn:
       1. Dữ liệu quẹt thẻ/web check-in (`attendance_records`).
       2. Dữ liệu đơn nghỉ phép đã duyệt từ module LEAVE (`leave_requests`).
       3. Dữ liệu làm thêm giờ đã duyệt (`overtime_requests`).
     - Tự động tính toán cho từng nhân viên:
       - Số công làm việc thực tế.
       - Số ngày nghỉ phép hưởng lương (phép năm, phép lễ).
       - Số ngày nghỉ không lương.
       - Tổng số giờ OT theo hệ số (ngày thường x1.5, cuối tuần x2.0).
  4. HR Staff rà soát, xử lý các trường hợp khiếu nại/quên chấm công (nếu có đơn giải trình hợp lệ).
  5. HR Staff nhấn "Chốt bảng công tháng YYYY-MM".
  6. Hệ thống khóa bảng công (chuyển sang trạng thái `LOCKED`), không cho phép chỉnh sửa thêm và đẩy dữ liệu công sang module Tính lương (PAY).
- **Hậu điều kiện:** Bảng công tháng được chốt bất biến, sẵn sàng cho chu trình tính lương.
