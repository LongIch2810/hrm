# 7.6. Recruitment Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/recruitment-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý tuyển dụng (REC).

- **Phạm vi module:** Quản lý nhu cầu vị trí tuyển dụng, đăng tin, tiếp nhận hồ sơ ứng viên (CV), pipeline trạng thái ứng tuyển (Kanban), lên lịch phỏng vấn, chấm điểm đánh giá, phát hành thư mời nhận việc (Offer Letter) và tự động bàn giao ứng viên trúng tuyển sang phân hệ Onboarding.
- **Actors liên quan:**
  - `HR Staff`: Khởi tạo vị trí, sàng lọc CV, điều phối lịch phỏng vấn, soạn thảo offer và kích hoạt chuyển sang Onboarding.
  - `Interviewer` (Người phỏng vấn / Quản lý chuyên môn): Tham gia phỏng vấn, chấm điểm và ghi nhận đánh giá ứng viên.
  - `Department Manager`: Đề xuất nhu cầu tuyển dụng của phòng ban, tham gia phỏng vấn vòng chuyên môn.
  - `HR Manager / Ban Giám Đốc`: Phê duyệt mở vị trí tuyển dụng và phê duyệt đề xuất Offer Letter.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-REC-001 | As a HR Staff, I want tạo và quản lý các vị trí tuyển dụng (Job Openings) theo đề xuất của phòng ban, So that việc tìm kiếm nhân tài có mục tiêu, ngân sách và tiêu chí tuyển dụng rõ ràng. | FR-REC-001 | Mỗi vị trí có: Chức danh, Phòng ban, Số lượng cần tuyển, Mức lương đề xuất, Hạn nộp hồ sơ, Trạng thái (`Open`, `Closed`). |
| US-REC-002 | As a HR Staff, I want đăng thông tin tuyển dụng lên cổng nội bộ công ty và tạo nội dung chia sẻ cho các mạng xã hội (LinkedIn, TopCV), So that tiếp cận được nhiều ứng viên tiềm năng. | FR-REC-002 | Tin tuyển dụng định dạng chuẩn (Mô tả công việc JD, Yêu cầu, Quyền lợi); tự động sinh link chia sẻ ứng tuyển. |
| US-REC-003 | As a HR Staff, I want tiếp nhận, tải lên tệp CV (PDF/DOCX <= 5MB) và quản lý danh sách hồ sơ ứng viên tập trung, So that không bị thất lạc hồ sơ và dễ dàng tra cứu. | FR-REC-003 | Lưu trữ thông tin cá nhân cơ bản và file CV; tự động phát hiện ứng viên nộp trùng lặp qua Email và Số điện thoại. |
| US-REC-004 | As a HR Staff / Manager, I want theo dõi tiến trình tuyển dụng dạng bảng Kanban trực quan (Ứng tuyển → Sàng lọc → Phỏng vấn → Offer → Trúng tuyển → Từ chối), So that tôi nắm bắt được tỷ lệ chuyển đổi qua từng giai đoạn. | FR-REC-004 | Hỗ trợ kéo thả (Drag-and-drop) ứng viên giữa các cột trạng thái; cập nhật trạng thái thời gian thực. |
| US-REC-005 | As a HR Staff, I want cấu hình số vòng phỏng vấn linh hoạt cho từng vị trí (ví dụ: Vòng 1 HR, Vòng 2 Technical Manager, Vòng 3 Giám đốc), So that quy trình đánh giá phù hợp với độ phức tạp của từng chức danh. | FR-REC-005 | Hỗ trợ cấu hình tối đa 3 vòng phỏng vấn cho mỗi vị trí; xác định người phỏng vấn tương ứng cho từng vòng. |
| US-REC-006 | As a HR Staff, I want lên lịch phỏng vấn và hệ thống tự động gửi thư mời kèm link họp trực tuyến (Google Meet/Teams) hoặc địa điểm cho ứng viên và người phỏng vấn, So that buổi phỏng vấn diễn ra đúng hẹn và chuyên nghiệp. | FR-REC-006 | Gửi email mời phỏng vấn có file đính kèm lịch (`.ics`); hiển thị lịch phỏng vấn trên Calendar của Interviewer. |
| US-REC-007 | As an Interviewer, I want điền phiếu đánh giá ứng viên trực tiếp trên hệ thống theo thang điểm 1-5 và nhận xét chi tiết, So that kết quả phỏng vấn được lưu vết khách quan, hỗ trợ quyết định tuyển dụng. | FR-REC-007 | Đánh giá các tiêu chí: Kiến thức chuyên môn, Kỹ năng giải quyết vấn đề, Giao tiếp, Mức độ phù hợp văn hóa; kết luận Đạt/Không đạt. |
| US-REC-008 | As a HR Staff, I want soạn thảo Thư mời nhận việc (Offer Letter) và trình HR Manager duyệt trước khi gửi ứng viên, So that mức đãi ngộ và thời gian nhận việc được kiểm soát chặt chẽ. | FR-REC-008 | Mẫu offer chuẩn gồm: Vị trí, Mức lương thử việc, Lương chính thức, Ngày bắt đầu, Hạn phản hồi; chỉ gửi đi sau khi Quản lý duyệt. |
| US-REC-009 | As a HR Staff, I want chuyển ứng viên đã chấp thuận offer sang phân hệ Onboarding chỉ bằng 1 click, So that toàn bộ thông tin cá nhân và vị trí trúng tuyển được kế thừa tự động sang quy trình tiếp nhận nhân viên mới. | FR-REC-009 | Đổi trạng thái ứng viên sang `Hired`; tự động sinh bản ghi tiếp nhận và gán Onboarding Checklist trong module `ONB`. |

---

## 2. Use Case Đặc tả chi tiết

### UC-REC-001: Khởi tạo và quản lý vị trí tuyển dụng

- **Mã FR:** FR-REC-001, FR-REC-002, FR-REC-005.
- **Actor chính:** HR Staff.
- **Actor phụ:** Department Manager (đề xuất), HR Manager (phê duyệt mở vị trí).
- **Tiền điều kiện:** Phòng ban và chức danh tương ứng đã tồn tại trong module `DEPT`.
- **Dữ liệu đầu vào (Input Fields):** Tiêu đề tuyển dụng, Phòng ban, Số lượng cần tuyển, Mức lương đề xuất (Từ - Đến), Mô tả công việc (JD), Yêu cầu ứng viên, Hạn nộp hồ sơ, Cấu hình các vòng phỏng vấn.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở menu "Tuyển dụng" > "Vị trí tuyển dụng" và nhấn "Tạo vị trí mới".
  2. HR Staff điền các thông tin:
     - Chọn Phòng ban và Chức vụ.
     - Nhập số lượng cần tuyển (ví dụ: 2 người).
     - Soạn thảo Mô tả công việc, Yêu cầu năng lực, Chế độ đãi ngộ.
     - Chọn cấu hình vòng tuyển dụng: Vòng 1 (HR Sơ loại), Vòng 2 (Quản lý phỏng vấn chuyên môn).
  3. HR Staff bấm "Lưu và Trình duyệt".
  4. HR Manager nhận thông báo, kiểm tra định biên nhân sự và ngân sách quỹ lương rồi bấm "Phê duyệt".
  5. Vị trí chuyển sang trạng thái `Open` (Đang tuyển).
  6. Hệ thống tự động phát sinh đường link đăng tin nội bộ.
- **Hậu điều kiện:** Vị trí tuyển dụng sẵn sàng tiếp nhận hồ sơ ứng viên.

---

### UC-REC-002: Tiếp nhận và sàng lọc hồ sơ ứng viên

- **Mã FR:** FR-REC-003, FR-REC-004.
- **Actor:** HR Staff.
- **Dữ liệu đầu vào:** Họ tên ứng viên, Email, Số điện thoại, Link LinkedIn/Portfolio, Tệp CV đính kèm (PDF <= 5MB), Nguồn ứng viên (LinkedIn, TopCV, Giới thiệu nội bộ).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở vị trí tuyển dụng đang mở và bấm "Thêm ứng viên".
  2. HR Staff nhập thông tin ứng viên và tải lên tệp CV.
  3. Hệ thống kiểm tra:
     - Định dạng file PDF, DOCX dung lượng <= 5MB.
     - Kiểm tra xem Email hoặc SĐT đã nộp vào vị trí này trong vòng 6 tháng gần nhất chưa để phát hiện nộp trùng lặp.
  4. Hệ thống lưu hồ sơ ứng viên vào bảng `candidates` và gắn vào vị trí tuyển dụng với trạng thái ban đầu là `Applied` (Mới ứng tuyển).
  5. HR Staff mở CV trực tiếp trên trình duyệt để đọc và sàng lọc.
  6. HR Staff kéo thả hoặc chuyển trạng thái ứng viên:
     - "Phù hợp": Chuyển sang cột `Screening` (Đã sàng lọc, sẵn sàng mời phỏng vấn).
     - "Không phù hợp": Chuyển sang cột `Rejected` (Hệ thống cung cấp tùy chọn gửi email từ chối lịch sự tự động).
- **Hậu điều kiện:** Hồ sơ ứng viên được số hóa, gắn liền với vị trí tuyển dụng.

---

### UC-REC-003: Lên lịch và điều phối phỏng vấn

- **Mã FR:** FR-REC-006.
- **Actor:** HR Staff (lên lịch), Interviewer (tham gia), Ứng viên (nhận thư).
- **Tiền điều kiện:** Ứng viên đang ở trạng thái `Screening`.
- **Dữ liệu đầu vào:** Vòng phỏng vấn (Vòng 1 / Vòng 2), Thời gian (Ngày, Giờ bắt đầu, Giờ kết thúc), Hình thức (Trực tiếp / Trực tuyến), Địa điểm phòng họp hoặc Link họp video, Danh sách người phỏng vấn (`interviewer_ids`).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở hồ sơ ứng viên và chọn "Lên lịch phỏng vấn".
  2. HR Staff chọn Vòng phỏng vấn và chọn Người phỏng vấn (Interviewer - ví dụ: Trưởng phòng CNTT).
  3. HR Staff chọn Thời gian và nhập Link họp Google Meet.
  4. HR Staff nhấn "Gửi thư mời phỏng vấn".
  5. Hệ thống:
     - Tạo bản ghi trong bảng `interview_schedules`.
     - Chuyển trạng thái ứng viên sang `Interviewing`.
     - Tự động gửi Email thư mời chuyên nghiệp cho ứng viên kèm đầy đủ thời gian, địa điểm, người liên hệ.
     - Gửi email thông báo và tạo sự kiện lịch cho Interviewer.
- **Hậu điều kiện:** Buổi phỏng vấn được lên lịch, các bên nhận được thông báo đồng bộ.

---

### UC-REC-004: Chấm điểm và đánh giá phỏng vấn

- **Mã FR:** FR-REC-007.
- **Actor:** Interviewer / Department Manager.
- **Tiền điều kiện:** Buổi phỏng vấn đã được lên lịch.
- **Luồng sự kiện chính (Basic Flow):**
  1. Sau hoặc trong khi phỏng vấn, Interviewer mở phiếu đánh giá ứng viên trên hệ thống.
  2. Interviewer chấm điểm từ 1 đến 5 sao cho từng tiêu chí chuẩn hóa:
     - Năng lực chuyên môn & Kinh nghiệm thực tế.
     - Khả năng tư duy logic & Giải quyết vấn đề.
     - Kỹ năng giao tiếp & Làm việc nhóm.
     - Thái độ & Mức độ phù hợp với văn hóa công ty.
  3. Interviewer nhập nhận xét ưu điểm nổi bật và các điểm hạn chế.
  4. Interviewer đưa ra kết luận: "Đạt (Pass)" hoặc "Không đạt (Fail)" và đề xuất mức lương nếu có.
  5. Interviewer nhấn "Hoàn thành đánh giá".
  6. Hệ thống khóa phiếu đánh giá của Interviewer, tính điểm trung bình tổng hợp và gửi thông báo kết quả cho HR Staff.
- **Hậu điều kiện:** Kết quả phỏng vấn được ghi vết minh bạch, làm căn cứ duyệt Offer.

---

### UC-REC-005: Soạn thảo, phê duyệt và gửi thư mời nhận việc (Offer Letter)

- **Mã FR:** FR-REC-008.
- **Actor:** HR Staff (soạn), HR Manager (duyệt), Ứng viên (phản hồi).
- **Tiền điều kiện:** Ứng viên đã vượt qua các vòng phỏng vấn bắt buộc.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở hồ sơ ứng viên và chọn "Tạo đề xuất Offer".
  2. HR Staff nhập các điều khoản mời việc:
     - Chức danh công việc, Phòng ban trực thuộc.
     - Mức lương thử việc (thường 85% lương chính thức theo Luật Lao động).
     - Mức lương chính thức sau thử việc.
     - Ngày bắt đầu đi làm dự kiến (`join_date`).
     - Thời hạn phản hồi offer (ví dụ: trong vòng 3 ngày làm việc).
  3. HR Staff bấm "Trình duyệt Offer".
  4. HR Manager mở xem đề xuất và nhấn "Phê duyệt Offer".
  5. Hệ thống sinh tệp PDF Thư mời nhận việc theo mẫu chuẩn của công ty và gửi email chính thức tới hòm thư của ứng viên.
  6. Trạng thái ứng viên chuyển sang `Offered`.
- **Hậu điều kiện:** Offer Letter được phát hành hợp lệ đến ứng viên.

---

### UC-REC-006: Tiếp nhận kết quả offer và chuyển giao sang Onboarding

- **Mã FR:** FR-REC-009.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Ứng viên đang ở trạng thái `Offered`.
- **Luồng sự kiện chính (Basic Flow):**
  1. Khi nhận được phản hồi từ ứng viên:
     - **Nếu ứng viên Từ chối offer:** HR Staff chọn trạng thái "Từ chối offer", nhập lý do (ví dụ: nhận offer khác, lương chưa phù hợp) và kết thúc quy trình.
     - **Nếu ứng viên Đồng ý offer:** HR Staff chọn "Ứng viên đã nhận việc (Hired)".
  2. HR Staff nhấn nút "Chuyển giao sang Onboarding".
  3. Hệ thống tự động thực hiện:
     - Đồng bộ gói dữ liệu ứng viên (Họ tên, Ngày sinh, SĐT, Email, Vị trí, Phòng ban, Lương đề xuất, Ngày gia nhập) sang phân hệ Onboarding & Offboarding (`ONB`).
     - Tự động khởi tạo quy trình tiếp nhận nhân viên mới trong module `ONB`.
     - Tự động gán bộ Checklist Onboarding mẫu tương ứng với chức danh.
  4. Hệ thống hiển thị thông báo thành công: "Đã chuyển ứng viên sang quy trình Onboarding tiếp nhận nhân viên mới".
- **Hậu điều kiện:** Quy trình tuyển dụng khép lại thành công, bắt đầu quy trình hội nhập nhân viên mới.
