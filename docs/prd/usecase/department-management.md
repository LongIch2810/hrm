# 7.2. Department Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/department-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý phòng ban và cơ cấu tổ chức (DEPT).

- **Phạm vi module:** Quản lý cấu trúc cây phòng ban phân cấp, danh mục chức vụ, cấp bậc, bổ nhiệm quản lý và trực quan hóa sơ đồ tổ chức (Org Chart).
- **Actors liên quan:**
  - `HR Staff` & `System Administrator`: Toàn quyền khởi tạo, chỉnh sửa phòng ban, cấu hình danh mục chức vụ, cấp bậc và bổ nhiệm cấp quản lý.
  - `Department Manager`: Xem cơ cấu tổ chức và danh sách nhân sự thuộc phòng ban mình phụ trách.
  - `Employee`: Xem sơ đồ tổ chức công ty (chỉ đọc).

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-DEPT-001 | As a HR Staff / Admin, I want tạo mới và quản lý danh mục phòng ban với mã duy nhất và phòng ban cha, So that cơ cấu tổ chức của doanh nghiệp được mô hình hóa chính xác và phân cấp khoa học. | FR-DEPT-001 | Mã phòng ban viết hoa không dấu duy nhất; tên phòng ban duy nhất; hỗ trợ phòng ban đa tầng. |
| US-DEPT-002 | As a HR Staff, I want thiết lập danh mục chức vụ chuẩn hóa trong doanh nghiệp, So that các vị trí công việc có tiêu chuẩn chức danh rõ ràng phục vụ tuyển dụng và bổ nhiệm. | FR-DEPT-002 | Danh mục chức vụ có mã, tên và mô tả vai trò; không cho phép trùng tên chức vụ đang hoạt động. |
| US-DEPT-003 | As a HR Staff, I want quản lý danh mục cấp bậc chuyên môn (Level 1..N) và hệ số bậc, So that lộ trình thăng tiến và khung năng lực nhân sự được định nghĩa minh bạch. | FR-DEPT-003 | Danh mục cấp bậc sắp xếp theo thứ tự cấp độ; liên kết trực tiếp với khung lương và tiêu chuẩn chức danh. |
| US-DEPT-004 | As a HR Staff, I want phân công nhân viên vào đúng phòng ban làm việc chính thức, So that nhân sự thuộc quyền quản lý rõ ràng và chấm công, phê duyệt đúng thẩm quyền. | FR-DEPT-004 | Mỗi nhân viên chỉ thuộc 1 phòng ban chính tại một thời điểm; cập nhật ngay lập tức vào danh sách phòng ban. |
| US-DEPT-005 | As a HR Staff, I want bổ nhiệm Trưởng phòng (Head) và Phó phòng (Deputy Head) cho từng phòng ban, So that xác định đúng người phê duyệt đơn phép, đơn OT và đánh giá KPI cho nhân viên. | FR-DEPT-005 | Mỗi phòng ban có duy nhất 1 Trưởng phòng và tối đa 2 Phó phòng; người quản lý được tự động trao quyền duyệt theo RBAC. |
| US-DEPT-006 | As an Employee / Manager / HR Staff, I want xem sơ đồ tổ chức công ty dạng cây tương tác trực quan, So that tôi dễ dàng tra cứu mối quan hệ phân cấp và liên hệ công tác giữa các bộ phận. | FR-DEPT-006 | Sơ đồ cây phản ánh thời gian thực; hiển thị Trưởng phòng, số lượng nhân sự và danh sách phòng con. |
| US-DEPT-007 | As a HR Staff / Admin, I want điều chỉnh liên kết phòng ban cha - con khi tái cấu trúc công ty, So that cơ cấu tổ chức linh hoạt thay đổi mà không gây xung đột hay vòng lặp phân cấp. | FR-DEPT-007 | Thuật toán DFS phát hiện và chặn đứng mọi vòng lặp cha-con; bảo toàn toàn vẹn dữ liệu các phòng ban con. |

---

## 2. Use Case Đặc tả chi tiết

### UC-DEPT-001: Khởi tạo và cập nhật phòng ban

- **Mã FR:** FR-DEPT-001, FR-DEPT-007.
- **Actor chính:** HR Staff, System Administrator.
- **Tiền điều kiện:** Người dùng có quyền quản trị phòng ban (`BR-DEPT-AUTH-001`).
- **Dữ liệu đầu vào (Input Fields):**
  - Mã phòng ban (`code`): Viết hoa không dấu, duy nhất (VD: `DEPT-TECH`, `DEPT-HR`).
  - Tên phòng ban (`name`): Chuỗi văn bản tiếng Việt duy nhất (VD: `Phòng Công Nghệ Thông Tin`).
  - Phòng ban cha (`parent_id`): ID của phòng ban cấp trên trực tiếp (để trống nếu là Root / Ban Giám Đốc).
  - Mô tả chức năng nhiệm vụ (`description`): Tùy chọn.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor vào mục "Cơ cấu tổ chức" > chọn "Thêm phòng ban mới".
  2. Hệ thống mở modal/trang tạo phòng ban.
  3. Actor nhập Mã phòng ban, Tên phòng ban, chọn Phòng ban cha từ danh sách dropdown và nhập Mô tả.
  4. Actor nhấn nút "Lưu phòng ban".
  5. Hệ thống kiểm tra:
     - Mã phòng ban và Tên phòng ban chưa tồn tại trong bảng `departments`.
     - Nếu có chọn `parent_id`, kiểm tra phòng ban cha có tồn tại và đang ở trạng thái `Active`.
  6. Hệ thống lưu bản ghi mới với trạng thái `Active`, sinh UUIDv4.
  7. Hệ thống ghi audit log tạo mới phòng ban.
  8. Hệ thống làm mới sơ đồ cây và hiển thị thông báo thành công.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Trùng mã hoặc tên phòng ban:* Hệ thống báo lỗi `409 CONFLICT` (`DUPLICATE_DEPARTMENT_CODE` / `DUPLICATE_DEPARTMENT_NAME`).
  - *E2 - Tạo vòng lặp phân cấp (Circular Hierarchy):* Khi chỉnh sửa phòng ban cha mà phòng ban cha được chọn lại là chính nó hoặc là phòng ban con cháu của nó, hệ thống kích hoạt kiểm tra DFS và từ chối với lỗi `400 BAD_REQUEST` (`CIRCULAR_HIERARCHY_DETECTED`: "Không thể chọn phòng ban con hoặc chính nó làm phòng ban cha").
- **Hậu điều kiện:** Phòng ban mới xuất hiện trên cây cơ cấu tổ chức.

---

### UC-DEPT-002: Bổ nhiệm người quản lý phòng ban (Trưởng phòng / Phó phòng)

- **Mã FR:** FR-DEPT-005.
- **Actor chính:** HR Staff.
- **Tiền điều kiện:** Phòng ban và nhân viên được chọn đều đang ở trạng thái `Active`.
- **Dữ liệu đầu vào:** ID phòng ban, ID nhân viên, Vai trò quản lý (`HEAD` hoặc `DEPUTY_HEAD`).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở trang chi tiết của phòng ban, chọn tab "Ban quản lý phòng".
  2. HR Staff nhấn "Bổ nhiệm quản lý".
  3. HR Staff tìm kiếm nhân viên trong danh sách nhân sự và chọn vai trò:
     - `Trưởng phòng` (Head of Department)
     - `Phó phòng` (Deputy Head)
  4. HR Staff nhấn "Xác nhận bổ nhiệm".
  5. Hệ thống kiểm tra ràng buộc nghiệp vụ (`BR-DEPT-002`):
     - Mỗi phòng ban chỉ có tối đa 1 Trưởng phòng đang đương nhiệm. Nếu đã có Trưởng phòng cũ, hệ thống yêu cầu xác nhận thay thế hoặc miễn nhiệm Trưởng phòng cũ.
     - Mỗi phòng ban có tối đa 2 Phó phòng.
  6. Hệ thống cập nhật:
     - Cập nhật trường `manager_id` trong bảng `departments` (đối với Head).
     - Ghi nhận lịch sử chức danh vào bảng `department_managers`.
     - Đồng bộ vai trò người dùng trong hệ thống (gán role `Department Manager` cho tài khoản nếu đang là `Employee`).
  7. Hệ thống gửi thông báo chúc mừng bổ nhiệm đến nhân viên và toàn thể phòng ban.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Quá số lượng Phó phòng cho phép:* Hệ thống báo lỗi `400 BAD_REQUEST` (`MAX_DEPUTY_EXCEEDED`: "Phòng ban đã có đủ 2 Phó phòng, vui lòng miễn nhiệm trước khi bổ nhiệm mới").
- **Hậu điều kiện:** Nhân viên được gán quyền duyệt đơn và quản lý nhân sự thuộc phòng ban tương ứng.

---

### UC-DEPT-003: Phân công nhân viên vào phòng ban

- **Mã FR:** FR-DEPT-004.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Nhân viên và phòng ban tồn tại và hoạt động.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở màn hình phòng ban, chọn "Thêm thành viên".
  2. HR Staff chọn một hoặc nhiều nhân viên chưa có phòng ban hoặc muốn điều chuyển sang.
  3. Chọn Chức vụ và Ngày bắt đầu phân công.
  4. Bấm "Lưu phân công".
  5. Hệ thống cập nhật `department_id` của nhân viên trong bảng `employees`.
  6. Hệ thống tự động ghi nhận vào lịch sử công tác (`employee_job_histories`).
  7. Danh sách thành viên phòng ban hiển thị thêm nhân viên vừa gán.
- **Hậu điều kiện:** Nhân sự thuộc danh sách quản lý của Trưởng phòng ban đó trong module ATT, LEAVE.

---

### UC-DEPT-004: Trực quan hóa sơ đồ tổ chức (Org Chart)

- **Mã FR:** FR-DEPT-006.
- **Actor:** Tất cả người dùng (Employee, Manager, HR Staff, Admin).
- **Tiền điều kiện:** Đã đăng nhập vào hệ thống.
- **Luồng sự kiện chính (Basic Flow):**
  1. Người dùng bấm vào mục "Sơ đồ tổ chức" trên thanh menu chính.
  2. Hệ thống truy vấn toàn bộ cây phòng ban `departments` kèm thông tin Trưởng phòng và số lượng nhân sự trực thuộc (`COUNT(employees)`).
  3. Hệ thống render giao diện biểu đồ cây phân nhánh trực quan (Tree Chart):
     - Node gốc: Ban Giám Đốc.
     - Các node con: Các Khối/Phòng/Ban chuyên môn.
  4. Người dùng có thể phóng to, thu nhỏ, kéo rê (Pan/Zoom) và nhấn vào từng phòng ban để mở rộng (Expand) hoặc thu gọn (Collapse) các nhánh con.
  5. Khi nhấn vào một node phòng ban, hệ thống hiển thị drawer bên phải chứa: Tên Trưởng phòng, Phó phòng, số lượng thành viên và danh sách nhân sự tóm tắt.
- **Hậu điều kiện:** Người dùng tra cứu được cơ cấu tổ chức một cách nhanh chóng và trực quan.

---

### UC-DEPT-005: Đóng hoặc giải thể phòng ban

- **Mã FR:** FR-DEPT-001.
- **Actor:** HR Staff / System Administrator.
- **Tiền điều kiện:** Phòng ban đang ở trạng thái `Active`.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor chọn phòng ban cần đóng và nhấn "Đóng / Giải thể phòng ban".
  2. Hệ thống kiểm tra điều kiện an toàn dữ liệu (`BR-DEPT-002`):
     - Kiểm tra số lượng nhân viên hiện tại đang thuộc phòng ban (`COUNT(employees) WHERE status != 'Terminated'`).
     - Kiểm tra xem phòng ban có đang chứa các phòng ban con trực thuộc hay không.
  3. Nếu phòng ban còn nhân viên hoặc còn phòng ban con:
     - Hệ thống từ chối đóng và hiển thị cảnh báo: "Không thể giải thể phòng ban. Vui lòng điều chuyển hết [X] nhân viên và chuyển các phòng ban con sang nhánh khác trước khi đóng."
  4. Nếu phòng ban không còn nhân viên và không có phòng con:
     - Hệ thống yêu cầu Actor nhập lý do giải thể và xác nhận bằng mật khẩu.
     - Hệ thống cập nhật trạng thái phòng ban sang `Inactive` (hoặc `soft delete`).
     - Ghi audit log giải thể phòng ban.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Còn nhân viên trong phòng:* Trả về lỗi `400 BAD_REQUEST` (`DEPARTMENT_NOT_EMPTY`: "Phòng ban vẫn còn nhân viên đang làm việc").
- **Hậu điều kiện:** Phòng ban ngừng hoạt động, không thể phân công nhân viên mới vào.
