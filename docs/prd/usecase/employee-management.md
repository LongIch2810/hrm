# 7.1. Employee Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/employee-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý nhân viên (EMP).

- **Phạm vi module:** Quản lý thông tin cá nhân, hồ sơ, lịch sử công tác, trạng thái làm việc và tài liệu của nhân viên.
- **Actors liên quan:**
  - `HR Staff`: Toàn quyền thêm mới, xem, sửa thông tin nghiệp vụ, đổi trạng thái làm việc, quản lý lịch sử công tác và tài liệu số hóa của toàn bộ nhân viên.
  - `Department Manager`: Xem danh sách, tìm kiếm và xem hồ sơ công tác của nhân viên thuộc phòng ban mình trực tiếp phụ trách (không xem các trường nhạy cảm như lương/thuế cá nhân).
  - `Employee`: Xem hồ sơ cá nhân và tự cập nhật thông tin liên lạc (SĐT, địa chỉ, liên hệ khẩn cấp).
  - `System Administrator`: Liên kết tài khoản đăng nhập với mã nhân viên.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-EMP-001 | As a HR Staff, I want quản lý toàn diện hồ sơ nhân viên tập trung trên hệ thống, So that dữ liệu nhân sự luôn chính xác, đồng bộ và sẵn sàng phục vụ cho các phân hệ chấm công, tính lương và phân quyền. | FR-EMP-001 | Dữ liệu nhân viên lưu trữ đầy đủ các trường thông tin cơ bản, công tác, phân quyền, trạng thái. |
| US-EMP-002 | As a HR Staff, I want thêm mới hồ sơ nhân viên với mã định danh tự động sinh dạng `EMP-YYYY-NNNN`, So that hồ sơ nhân viên mới được tiếp nhận chuẩn hóa ngay từ ngày đầu làm việc. | FR-EMP-002 | Hệ thống tự sinh mã NV duy nhất theo năm; kiểm tra trùng lặp email và CCCD; thông báo thành công và ghi audit log. |
| US-EMP-003 | As a HR Staff / Department Manager / Employee, I want xem danh sách và chi tiết hồ sơ nhân viên theo đúng phạm vi phân quyền RBAC, So that thông tin công việc được tra cứu minh bạch và dữ liệu nhạy cảm được bảo mật. | FR-EMP-003 | HR Staff xem toàn công ty; Manager chỉ xem nhân viên phòng ban mình; Employee chỉ xem bản thân; ẩn thông tin nhạy cảm ngoài thẩm quyền. |
| US-EMP-004 | As a HR Staff, I want cập nhật thông tin nghiệp vụ và chức danh của nhân viên, So that hồ sơ luôn phản ánh đúng vị trí và đãi ngộ hiện tại. | FR-EMP-004 | Cho phép sửa các trường nghiệp vụ; lưu vết lịch sử người sửa và thời gian sửa vào audit log. |
| US-EMP-005 | As a HR Staff, I want chuyển đổi trạng thái làm việc của nhân viên (Thử việc, Chính thức, Nghỉ phép dài hạn, Đã nghỉ việc), So that hệ thống tự động khóa tài khoản và ngừng tính công khi nhân viên nghỉ việc. | FR-EMP-005 | Khi đổi sang `Terminated`, hệ thống tự động khóa tài khoản đăng nhập và chặn tạo đơn phép/chấm công mới. |
| US-EMP-006 | As an Employee, I want tự cập nhật số điện thoại, địa chỉ cư trú và người liên hệ khẩn cấp của mình, So that công ty có thể liên lạc kịp thời khi cần thiết mà không phải phiền HR nhập liệu thủ công. | FR-EMP-006 | Nhân viên chỉ được sửa các trường liên hệ cho phép; dữ liệu lưu thành công ngay lập tức. |
| US-EMP-007 | As a HR Staff, I want ghi nhận và truy xuất lịch sử thay đổi phòng ban, chức vụ và cấp bậc công tác, So that quá trình phát triển sự nghiệp của nhân viên được theo dõi đầy đủ. | FR-EMP-007 | Mỗi lần điều chuyển sinh ra 1 bản ghi lịch sử bất biến gồm chức vụ cũ, chức vụ mới, phòng ban cũ, phòng ban mới, ngày hiệu lực và người thực hiện. |
| US-EMP-008 | As a HR Staff, I want tải lên và lưu trữ các tệp số hóa (CV, hợp đồng scan, bằng cấp, CCCD) vào hồ sơ nhân viên, So that giấy tờ pháp lý được lưu trữ tập trung và an toàn. | FR-EMP-008 | Hỗ trợ file PDF/PNG/JPG tối đa 5MB; mã hóa đường dẫn lưu trữ; chỉ HR và chủ hồ sơ được tải xuống. |
| US-EMP-009 | As a HR Staff / Department Manager, I want tìm kiếm theo tên/mã, lọc theo phòng ban/trạng thái và sắp xếp danh sách nhân viên, So that việc tra cứu nhân sự diễn ra nhanh chóng và chính xác. | FR-EMP-009 | Phản hồi dưới 1 giây cho danh sách 300 nhân viên; hỗ trợ phân trang chuẩn 10, 20, 50 bản ghi/trang. |

---

## 2. Use Case Đặc tả chi tiết

### UC-EMP-001: Thêm mới hồ sơ nhân viên

- **Mã FR:** FR-EMP-001, FR-EMP-002.
- **Actor chính:** HR Staff.
- **Actor phụ:** System (tự động sinh mã và gửi email).
- **Tiền điều kiện:** HR Staff đã đăng nhập vào hệ thống với vai trò `HR Staff`.
- **Dữ liệu đầu vào (Input Fields):**
  - *Bắt buộc:* Họ và tên, Ngày sinh, Giới tính, Số CCCD/Hộ chiếu, Email công ty, Số điện thoại cá nhân, Phòng ban (`department_id`), Chức vụ (`position_id`), Ngày vào làm (`join_date`), Trạng thái ban đầu (`Probation` hoặc `Active`).
  - *Tùy chọn:* Địa chỉ thường trú, Địa chỉ tạm trú, Trình độ học vấn, Người liên hệ khẩn cấp (Tên, Quan hệ, SĐT), Ảnh thẻ đại diện.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở màn hình "Danh sách nhân viên" và nhấn nút "Thêm nhân viên mới".
  2. Hệ thống hiển thị biểu mẫu tạo mới hồ sơ nhân viên.
  3. HR Staff điền đầy đủ các thông tin bắt buộc và các thông tin tùy chọn nếu có.
  4. HR Staff nhấn nút "Lưu hồ sơ".
  5. Hệ thống kiểm tra hợp lệ dữ liệu (Validation Rules):
     - Họ tên không chứa ký tự đặc biệt không hợp lệ.
     - Email đúng định dạng và chưa tồn tại trong hệ thống.
     - Số CCCD/Hộ chiếu duy nhất trong cơ sở dữ liệu.
     - SĐT gồm 10 chữ số hợp lệ theo định dạng Việt Nam.
     - Ngày sinh đảm bảo nhân viên đủ từ 18 tuổi trở lên.
  6. Hệ thống tự động sinh Mã nhân viên định dạng `EMP-YYYY-NNNN` (Ví dụ: `EMP-2026-0001`).
  7. Hệ thống lưu bản ghi nhân viên vào database với trạng thái được chọn, gán ngày tạo và người tạo.
  8. Hệ thống ghi nhận sự kiện vào `audit_logs` (`action = 'CREATE_EMPLOYEE'`).
  9. Hệ thống hiển thị thông báo thành công cùng mã nhân viên vừa sinh (ví dụ: `EMP-2026-0001`) và điều hướng đến trang chi tiết nhân viên vừa tạo.
- **Luồng rẽ nhánh (Alternative Flows):**
  - *A1 - Tạo hồ sơ từ ứng viên trúng tuyển (Tích hợp REC):* Khi chọn nguồn "Từ ứng viên trúng tuyển", hệ thống tự động điền sẵn các trường Họ tên, Email, SĐT, Vị trí đã được duyệt từ phân hệ Tuyển dụng (`ONB`). HR Staff chỉ cần bổ sung ngày vào làm và phòng ban.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Trùng lặp Email hoặc CCCD:* Hệ thống chặn lưu, giữ nguyên dữ liệu trên form và hiển thị thông báo lỗi `409 CONFLICT` (`DUPLICATE_IDENTIFIER`: "Số CCCD hoặc Email đã tồn tại trên hệ thống").
  - *E2 - Thiếu trường bắt buộc hoặc dữ liệu sai định dạng:* Hệ thống highlight đỏ các trường lỗi và trả về `400 VALIDATION_ERROR` với chi tiết từng field.
- **Hậu điều kiện (Postconditions):** Hồ sơ nhân viên được lưu vào bảng `employees`, hiển thị ngay lập tức trên danh sách nhân viên.

---

### UC-EMP-002: Tra cứu, lọc và xem chi tiết hồ sơ nhân viên

- **Mã FR:** FR-EMP-003, FR-EMP-009.
- **Actor:** HR Staff, Department Manager, Employee.
- **Tiền điều kiện:** Người dùng đã xác thực danh tính qua JWT Token hợp lệ.
- **Dữ liệu đầu vào:** Từ khóa tìm kiếm (Tên, Mã NV, Email), Bộ lọc (Phòng ban, Chức danh, Trạng thái), Tiêu chí sắp xếp, Trang hiện tại (`page`, `pageSize`).
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor truy cập mục "Nhân sự" > "Danh sách nhân viên".
  2. Hệ thống kiểm tra vai trò người dùng (RBAC Data Scope):
     - *HR Staff:* Hệ thống trả về dữ liệu toàn bộ nhân viên công ty.
     - *Department Manager:* Hệ thống tự động thêm điều kiện lọc `department_id = manager.department_id`.
     - *Employee:* Hệ thống chỉ cho phép xem hồ sơ cá nhân (`id = user.employee_id`).
  3. Actor nhập từ khóa tìm kiếm hoặc chọn lọc theo Phòng ban / Trạng thái.
  4. Hệ thống thực hiện truy vấn cơ sở dữ liệu có phân trang (`offset`, `limit`) và trả về danh sách kết quả.
  5. Actor nhấn vào một dòng nhân viên để xem trang chi tiết.
  6. Hệ thống hiển thị các tab theo quyền của actor:
     - Tab 1: Thông tin cá nhân & Liên hệ.
     - Tab 2: Thông tin công tác & Chức vụ.
     - Tab 3: Hợp đồng lao động hiện tại và phụ lục.
     - Tab 4: Lịch sử công tác (điều chuyển, thăng chức).
     - Tab 5: Tài liệu đính kèm.
     - Manager chỉ thấy liên hệ cần thiết và thông tin công tác của nhân viên phòng mình; không thấy dữ liệu pháp lý, lương, hợp đồng hoặc tài liệu đính kèm.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Manager xem nhân viên ngoài phòng ban:* Nếu cố tình nhập ID qua URL và nhân viên thuộc phòng ban khác, hệ thống trả `403 Forbidden` (`INSUFFICIENT_PERMISSIONS`).
  - *E2 - Không tìm thấy nhân viên:* Trả về lỗi `404 NOT_FOUND` (`EMPLOYEE_NOT_FOUND`).
- **Hậu điều kiện:** Dữ liệu hiển thị đúng phân quyền và không để lộ thông tin nhạy cảm.

---

### UC-EMP-003: Chỉnh sửa thông tin hồ sơ nhân viên

- **Mã FR:** FR-EMP-004, FR-EMP-006.
- **Actor:** HR Staff (sửa thông tin nghiệp vụ), Employee (sửa thông tin liên hệ).
- **Tiền điều kiện:** Hồ sơ nhân viên đang ở trạng thái không bị xóa (`deleted_at IS NULL`).
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor mở trang chi tiết nhân viên và bấm nút "Chỉnh sửa".
  2. Hệ thống mở form chỉnh sửa với các quyền hạn tương ứng:
     - *Employee:* Chỉ được sửa các trường: Số điện thoại, Địa chỉ tạm trú, Email cá nhân, Người liên hệ khẩn cấp, Ảnh đại diện. Các trường Phòng ban, Chức vụ, Ngày vào làm, CCCD, Lương bị disabled (chỉ đọc).
     - *HR Staff:* Được sửa tất cả các trường thông tin nghiệp vụ và nhân thân.
  3. Actor điều chỉnh thông tin cần thay đổi và bấm "Cập nhật".
  4. Hệ thống validate dữ liệu mới.
  5. Hệ thống lưu các thay đổi vào DB và tự động cập nhật trường `updated_at`.
  6. Hệ thống ghi audit log gồm: `user_id`, `employee_id`, `old_values`, `new_values`.
  7. Hệ thống hiển thị thông báo "Cập nhật thông tin thành công".
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Employee cố tình gửi payload chứa trường nghiệp vụ (Phòng ban, Lương):* Backend Validation Pipe kích hoạt `forbidNonWhitelisted: true` và từ chối request với mã `400 BAD_REQUEST`.
- **Hậu điều kiện:** Dữ liệu cập nhật có hiệu lực ngay lập tức.

---

### UC-EMP-004: Cập nhật trạng thái làm việc nhân viên

- **Mã FR:** FR-EMP-005.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Nhân viên tồn tại trong hệ thống.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff vào trang chi tiết nhân viên, chọn mục "Quản lý trạng thái".
  2. Hệ thống hiển thị trạng thái hiện tại (ví dụ: `Active`) và danh sách trạng thái đích cho phép: `Probation` (Thử việc), `Active` (Chính thức), `OnLeave` (Nghỉ thai sản/không lương), `Terminated` (Đã nghỉ việc).
  3. HR Staff chọn trạng thái mới, chọn Ngày hiệu lực và nhập Lý do thay đổi.
  4. HR Staff nhấn "Xác nhận chuyển trạng thái".
  5. Hệ thống cập nhật trường `status` của nhân viên.
  6. Xử lý đồng bộ theo trạng thái:
     - Nếu chuyển sang `Terminated`: Hệ thống tự động kích hoạt vô hiệu hóa tài khoản người dùng tương ứng (`users.is_active = false`), hủy các phiên đăng nhập hiện tại và thông báo cho IT Admin thu hồi quyền truy cập.
     - Nếu chuyển sang `Active`: Ghi nhận hoàn thành thử việc, sẵn sàng tham gia đánh giá và tính phép năm chính thức.
  7. Hệ thống ghi audit log thay đổi trạng thái nhân sự.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Chuyển trạng thái bất hợp lệ:* Nếu nhân viên đã ở trạng thái `Terminated` mà muốn chuyển ngược về `Active` mà không qua quy trình tái ký hợp đồng mới, hệ thống trả về lỗi `400 BAD_REQUEST` (`INVALID_STATUS_TRANSITION`).
- **Hậu điều kiện:** Trạng thái nhân viên thay đổi, tài khoản hệ thống được đồng bộ tương ứng.

---

### UC-EMP-005: Điều chuyển phòng ban, chức vụ và lưu vết lịch sử

- **Mã FR:** FR-EMP-007.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Phòng ban mới và chức vụ mới đang hoạt động (`Active`).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff chọn chức năng "Điều chuyển công tác / Thăng chức" trong hồ sơ nhân viên.
  2. Form hiển thị: Phòng ban hiện tại, Chức vụ hiện tại.
  3. HR Staff chọn: Phòng ban mới, Chức vụ mới, Ngày có hiệu lực, Số quyết định bổ nhiệm/điều chuyển, Ghi chú.
  4. HR Staff bấm "Lưu quyết định".
  5. Hệ thống thực hiện transaction database:
     - Thêm 1 bản ghi vào bảng `employee_job_histories` (lưu lại snapshot: phòng ban cũ, phòng ban mới, chức vụ cũ, chức vụ mới, ngày bắt đầu hiệu lực, ghi chú).
     - Cập nhật trường `department_id` và `position_id` trong bảng `employees`.
  6. Hệ thống gửi thông báo nội bộ cho Quản lý phòng ban cũ và Quản lý phòng ban mới.
- **Hậu điều kiện:** Nhân viên được chuyển sang phòng ban mới, lịch sử công tác được bảo toàn bất biến.

---

### UC-EMP-006: Quản lý tài liệu đính kèm hồ sơ

- **Mã FR:** FR-EMP-008.
- **Actor:** HR Staff, Employee (chỉ xem/tải tài liệu của mình).
- **Tiền điều kiện:** File upload hợp lệ theo quy định bảo mật.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở tab "Tài liệu đính kèm" trong hồ sơ nhân viên và bấm "Tải lên tài liệu".
  2. HR Staff chọn Loại tài liệu (Hợp đồng scan, CCCD scan, Sơ yếu lý lịch, Bằng đại học, Chứng chỉ nghề) và chọn tệp từ máy tính.
  3. Hệ thống kiểm tra:
     - Dung lượng tệp <= 5 MB.
     - Định dạng tệp thuộc whitelist: `.pdf`, `.png`, `.jpg`, `.jpeg`.
     - Kiểm tra mã MIME và magic bytes để ngăn chặn mã độc.
  4. Hệ thống tải tệp lên Cloud Storage / S3 / MinIO với tên tệp ngẫu nhiên UUIDv4.
  5. Hệ thống lưu metadata vào bảng `employee_documents` (Tên gốc, Đường dẫn mã hóa, Loại tài liệu, Kích thước, Người tải lên, Ngày tải).
  6. Tài liệu xuất hiện trong danh sách tài liệu của nhân viên.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - File vượt quá 5MB:* Hệ thống trả về `400 BAD_REQUEST` (`FILE_SIZE_EXCEEDED`: "Dung lượng tệp vượt quá giới hạn cho phép 5MB").
  - *E2 - File sai định dạng:* Hệ thống trả về `400 BAD_REQUEST` (`INVALID_FILE_TYPE`: "Chỉ chấp nhận định dạng PDF, PNG, JPG").
- **Hậu điều kiện:** Tệp được lưu trữ an toàn, liên kết chặt chẽ với ID nhân viên.
