# 7.10. Training Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/training-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý đào tạo nhân sự (TRAIN).

- **Phạm vi module:** Quản lý chương trình phát triển năng lực, danh mục khóa đào tạo, lập lịch học, phân công học viên bắt buộc hoặc mở đăng ký tự do, điểm danh chuyên cần, kiểm tra kết thúc khóa, cấp phát chứng chỉ số hóa và lưu trữ lịch sử đào tạo vào hồ sơ nhân sự.
- **Actors liên quan:**
  - `HR Staff` (Training Coordinator): Lập kế hoạch chương trình, tạo khóa học, lên lịch, phân công nhân viên và phát hành chứng chỉ.
  - `Trainer` (Giảng viên nội bộ hoặc chuyên gia đối tác): Giảng dạy, điểm danh từng buổi học, chấm điểm thi và ghi nhận nhận xét kết quả.
  - `Department Manager`: Đề xuất nhân viên đi học để nâng cao kỹ năng nghiệp vụ; theo dõi kết quả học tập của nhân viên phòng mình.
  - `Employee`: Nhận lịch học, tham gia lớp học, tải tài liệu, xem điểm kiểm tra và tải chứng chỉ cá nhân.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-TRAIN-001 | As a HR Staff, I want quản lý các chương trình đào tạo theo lộ trình phát triển nghề nghiệp (Đào tạo hội nhập, Nâng cao chuyên môn, Kỹ năng lãnh đạo), So that kế hoạch phát triển nhân tài được tổ chức bài bản. | FR-TRAIN-001 | Mỗi chương trình xác định mục tiêu đào tạo, đối tượng áp dụng và danh sách các khóa học con trực thuộc. |
| US-TRAIN-002 | As a HR Staff, I want tạo và quản lý thông tin các khóa học (tên khóa, thời lượng, giảng viên, chi phí, sĩ số tối đa), So that thông tin lớp học được công bố rõ ràng. | FR-TRAIN-002 | Khóa học có các trạng thái: `Draft`, `Open` (Mở đăng ký), `In Progress` (Đang học), `Completed` (Đã hoàn thành). |
| US-TRAIN-003 | As a HR Staff, I want lập lịch đào tạo chi tiết (ngày, giờ bắt đầu/kết thúc, phòng học hoặc link trực tuyến) và gửi thông báo tự động cho học viên, So that các buổi học diễn ra đúng kế hoạch. | FR-TRAIN-003 | Tự động đồng bộ lịch học vào Calendar cá nhân của nhân viên; gửi email nhắc nhở trước buổi học 24 giờ. |
| US-TRAIN-004 | As a HR Staff / Manager, I want phân công nhân viên bắt buộc tham gia hoặc mở cho nhân viên tự đăng ký khóa học, So that đối tượng tham gia đúng theo nhu cầu nâng cao năng lực. | FR-TRAIN-004 | Kiểm tra sĩ số tối đa của lớp học; không cho phép đăng ký nếu lớp đã đủ số lượng học viên. |
| US-TRAIN-005 | As a Trainer / HR Staff, I want thực hiện điểm danh học viên tại từng buổi học, So that theo dõi tỷ lệ chuyên cần và tính kỷ luật của học viên. | FR-TRAIN-005 | Tỷ lệ chuyên cần bắt buộc $\ge 80\%$ tổng thời lượng khóa học mới đủ điều kiện tham gia thi tốt nghiệp. |
| US-TRAIN-006 | As a Trainer, I want chấm điểm bài kiểm tra cuối khóa (thang điểm 10) và ghi nhận kết quả Đạt hoặc Không đạt, So that đánh giá chính xác mức độ tiếp thu kiến thức của nhân viên. | FR-TRAIN-006 | Điểm kiểm tra $\ge 6.0/10$ và chuyên cần $\ge 80\%$ được xếp loại `Pass` (Đạt); ngược lại là `Fail`. |
| US-TRAIN-007 | As a HR Staff, I want hệ thống tự động sinh và cấp phát Chứng chỉ đào tạo số hóa (có mã chứng chỉ duy nhất) cho các học viên đạt yêu cầu, So that ghi nhận sự nỗ lực và chứng nhận năng lực của nhân viên. | FR-TRAIN-007 | Mã chứng chỉ duy nhất; file chứng chỉ định dạng PDF có chữ ký số/con dấu; nhân viên có thể tải về bất cứ lúc nào. |
| US-TRAIN-008 | As an Employee và HR Staff, I want xem toàn bộ lịch sử các khóa đào tạo đã tham gia và các chứng chỉ đạt được ngay trong hồ sơ nhân viên, So that làm căn cứ xét thăng chức và tăng lương. | FR-TRAIN-008 | Tự động lưu bản ghi khóa học vào tab "Đào tạo" trong hồ sơ nhân viên (`EMP`) ngay khi hoàn tất khóa học. |

---

## 2. Use Case Đặc tả chi tiết

### UC-TRAIN-001: Lập kế hoạch khóa học và phân công học viên

- **Mã FR:** FR-TRAIN-001, FR-TRAIN-002, FR-TRAIN-003, FR-TRAIN-004.
- **Actor:** HR Staff, Department Manager.
- **Tiền điều kiện:** Chương trình đào tạo đã được phê duyệt.
- **Dữ liệu đầu vào (Input Fields):** Tên khóa học, Giảng viên (Họ tên, Đơn vị), Thời lượng (Số giờ), Sĩ số tối đa, Hình thức (Trực tiếp / Online), Lịch học (Các ngày trong tuần, Giờ học), Danh sách học viên được phân công.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff vào menu "Quản lý đào tạo" > "Khóa học" và nhấn "Tạo khóa học mới".
  2. HR Staff điền thông tin chi tiết:
     - Tên khóa học (ví dụ: `Kỹ năng An toàn thông tin doanh nghiệp`).
     - Chọn Giảng viên (nội bộ hoặc đối tác).
     - Đặt sĩ số tối đa (ví dụ: 30 người).
  3. Thiết lập lịch học:
     - Chọn ngày khai giảng và ngày kết thúc.
     - Thêm các buổi học cụ thể (ví dụ: Thứ 3 và Thứ 5, từ 14:00 đến 16:30).
     - Nhập địa điểm phòng đào tạo hoặc link Google Meet.
  4. Phân công học viên:
     - HR Staff chọn phòng ban hoặc lọc theo chức danh để thêm danh sách nhân sự bắt buộc học.
     - Hoặc bật chế độ "Cho phép nhân viên tự đăng ký" kèm hạn chót đăng ký.
  5. HR Staff nhấn "Kích hoạt khóa học".
  6. Hệ thống kiểm tra số lượng học viên không vượt quá sĩ số tối đa.
  7. Hệ thống tự động gửi thông báo thư mời tham gia khóa học kèm lịch trình chi tiết đến từng nhân viên được phân công.
- **Hậu điều kiện:** Khóa học chuyển sang trạng thái `Open`, danh sách học viên được xác nhận.

---

### UC-TRAIN-002: Điểm danh và theo dõi tiến độ chuyên cần

- **Mã FR:** FR-TRAIN-005.
- **Actor:** Trainer (Giảng viên) hoặc HR Staff phụ trách lớp.
- **Tiền điều kiện:** Buổi học đang hoặc vừa diễn ra.
- **Luồng sự kiện chính (Basic Flow):**
  1. Trainer mở trang chi tiết khóa học, chọn buổi học hôm nay và nhấn "Điểm danh".
  2. Hệ thống hiển thị danh sách tất cả học viên của lớp.
  3. Trainer đánh dấu trạng thái cho từng học viên:
     - `Present` (Có mặt)
     - `Absent` (Vắng mặt)
     - `Late` (Đến muộn)
  4. Trainer nhấn "Lưu điểm danh".
  5. Hệ thống tự động tính toán lại Tỷ lệ chuyên cần (Attendance Rate) lũy kế của từng học viên:
     $$\text{Chuyên cần (\%)} = \frac{\text{Số buổi có mặt}}{\text{Tổng số buổi đã diễn ra}} \times 100\%$$
  6. Nếu học viên vắng mặt quá 20% tổng thời lượng: Hệ thống hiển thị cảnh báo đỏ cạnh tên học viên: "Không đủ điều kiện dự thi tốt nghiệp do vắng quá 20%".
- **Hậu điều kiện:** Dữ liệu chuyên cần được cập nhật theo thời gian thực.

---

### UC-TRAIN-003: Chấm điểm kết thúc khóa và xác định xếp loại

- **Mã FR:** FR-TRAIN-006.
- **Actor:** Trainer / HR Staff.
- **Tiền điều kiện:** Khóa học đã hoàn thành các buổi giảng dạy lý thuyết và bài kiểm tra/đồ án cuối khóa.
- **Luồng sự kiện chính (Basic Flow):**
  1. Trainer mở tab "Kết quả kiểm tra" của khóa học.
  2. Hệ thống hiển thị danh sách học viên đủ điều kiện dự thi (chuyên cần $\ge 80\%$).
  3. Trainer nhập Điểm thi cuối khóa (Thang điểm từ 0.0 đến 10.0) và nhận xét năng lực cho từng học viên.
  4. Trainer nhấn "Lưu kết quả".
  5. Hệ thống tự động xét duyệt theo quy tắc `BR-TRAIN-002`:
     - Nếu $\text{Điểm} \ge 6.0$ VÀ $\text{Chuyên cần} \ge 80\%$: Xếp loại `PASS` (Đạt).
     - Nếu $\text{Điểm} < 6.0$ HOẶC $\text{Chuyên cần} < 80\%$: Xếp loại `FAIL` (Không đạt).
  6. Hệ thống hiển thị bảng tổng kết kết quả toàn lớp để HR Staff rà soát.
- **Hậu điều kiện:** Kết quả học tập được chốt, sẵn sàng cấp chứng chỉ.

---

### UC-TRAIN-004: Cấp phát chứng chỉ số hóa và đồng bộ hồ sơ nhân sự

- **Mã FR:** FR-TRAIN-007, FR-TRAIN-008.
- **Actor:** HR Staff (cấp phát), Employee (nhận chứng chỉ).
- **Tiền điều kiện:** Kết quả kiểm tra đã được chấm và chốt danh sách học viên Đạt (`PASS`).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở khóa học đã hoàn tất và nhấn nút "Cấp phát chứng chỉ tự động".
  2. Hệ thống tự động duyệt qua danh sách các học viên Đạt:
     - Tự động sinh Mã chứng chỉ duy nhất dạng `CERT-YYYY-NNNN` (ví dụ: `CERT-2026-0042`).
     - Tự động sinh tệp PDF Chứng chỉ hoàn thành khóa học (Certificate of Completion) chứa: Họ tên học viên, Tên khóa học, Thời lượng, Ngày cấp, Mã chứng chỉ và con dấu/chữ ký điện tử của công ty.
     - Lưu bản ghi vào bảng `employee_certificates`.
     - Tự động thêm một bản ghi vào bảng `employee_training_histories` trong hồ sơ nhân viên (`EMP`).
  3. Khóa học được chuyển trạng thái sang `Completed`.
  4. Hệ thống phát thông báo In-App và Email chúc mừng kèm tệp chứng chỉ PDF tới từng học viên Đạt.
  5. Employee vào mục "Hồ sơ của tôi" > tab "Chứng chỉ & Đào tạo" để xem và tải về chứng chỉ của mình.
- **Hậu điều kiện:** Chứng chỉ được cấp phát chính thức, thành tích đào tạo được ghi nhận vĩnh viễn vào hồ sơ nghề nghiệp của nhân viên.
