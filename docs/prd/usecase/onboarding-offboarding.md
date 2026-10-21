# 7.7. Onboarding & Offboarding — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/onboarding-offboarding.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Tiếp nhận nhân viên mới và Thôi việc (ONB).

- **Phạm vi module:** Quản lý quy trình onboarding, checklist tiếp nhận nhân sự mới, phân công nhiệm vụ chuẩn bị (HR, IT, Manager), cấp phát tài sản; quy trình thôi việc (offboarding), bàn giao công việc, thu hồi thiết bị, đóng quyền truy cập và chuyển trạng thái nhân viên đã nghỉ.
- **Actors liên quan:**
  - `HR Staff`: Chủ trì điều phối quy trình tiếp nhận và thôi việc, phân công nhiệm vụ, tổng kết checklist và quyết toán thôi việc.
  - `IT Admin`: Tiếp nhận nhiệm vụ cấp phát email/thiết bị khi Onboarding; vô hiệu hóa tài khoản và thu hồi quyền truy cập khi Offboarding.
  - `Department Manager`: Phân công người hướng dẫn (Mentor), theo dõi kế hoạch thử việc; ký duyệt bàn giao công việc khi nhân viên nghỉ.
  - `Employee` (Nhân viên mới / Nhân viên thôi việc): Hoàn tất các nhiệm vụ cá nhân trong checklist và ký biên bản bàn giao.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-ONB-001 | As a HR Staff, I want khởi tạo quy trình Onboarding tự động khi ứng viên đồng ý nhận việc từ phân hệ Tuyển dụng, So that các bộ phận liên quan có đủ thời gian chuẩn bị chu đáo trước ngày nhân viên vào làm. | FR-ONB-001 | Tiếp nhận toàn bộ thông tin ứng viên từ module `REC`; thiết lập ngày bắt đầu làm việc chính xác. |
| US-ONB-002 | As a HR Staff, I want áp dụng bộ Onboarding Checklist chuẩn hóa theo từng vị trí và phòng ban, So that không bỏ sót bất kỳ đầu việc chuẩn bị quan trọng nào (hồ sơ nhân sự, công cụ làm việc, đào tạo hội nhập). | FR-ONB-002 | Checklist phân loại theo 3 nhóm: Thủ tục HR, Công cụ IT & Thiết bị, Chuyên môn & Hội nhập phòng ban. |
| US-ONB-003 | As a HR Staff, I want phân công nhiệm vụ tiếp nhận cho từng người phụ trách cụ thể kèm thời hạn hoàn thành (Deadline), So that IT, Hành chính và Quản lý phòng ban chủ động hoàn thành trách nhiệm trước ngày gia nhập. | FR-ONB-003 | Giao IT cấp email/laptop; giao Quản lý chỉ định Mentor; gửi thông báo nhiệm vụ có deadline cụ thể. |
| US-ONB-004 | As a HR Staff và Department Manager, I want theo dõi thanh tiến độ % hoàn thành của Onboarding Checklist theo thời gian thực, So that kịp thời đôn đốc các bên và hỗ trợ nhân viên mới hòa nhập tốt nhất. | FR-ONB-004 | Thanh tiến độ cập nhật % tự động khi từng đầu việc được đánh dấu hoàn thành; cảnh báo việc quá hạn. |
| US-ONB-005 | As an IT Admin / Admin Staff, I want quản lý cấp phát thiết bị làm việc (Laptop, Màn hình, Thẻ nhân viên) và ghi nhận số seri, biên bản bàn giao, So that tài sản công ty được quản lý chặt chẽ ngay từ đầu. | FR-ONB-005 | Ghi nhận chi tiết: Loại thiết bị, Mã tài sản, Số seri, Tình trạng bàn giao; nhân viên mới ký xác nhận online/bằng giấy. |
| US-ONB-006 | As a HR Staff, I want khởi tạo quy trình thôi việc (Offboarding) khi đơn thôi việc được duyệt và xác định Ngày làm việc cuối cùng, So that các thủ tục bàn giao và thanh toán chế độ diễn ra đúng luật. | FR-ONB-006 | Thiết lập ngày làm việc cuối cùng; tự động sinh Offboarding Checklist 4 bên (HR, IT, Manager, Finance). |
| US-ONB-007 | As a Department Manager và Nhân viên nghỉ việc, I want lập và ký duyệt biên bản bàn giao công việc, tài liệu dự án và mã nguồn, So that hoạt động của phòng ban không bị gián đoạn sau khi nhân viên rời đi. | FR-ONB-007 | Liệt kê chi tiết dự án, đầu việc, người tiếp nhận bàn giao; Manager bấm ký duyệt điện tử trên hệ thống. |
| US-ONB-008 | As an IT Admin, I want kiểm tra và xác nhận thu hồi thiết bị, đồng thời tự động đóng tài khoản người dùng vào 23:59:59 của ngày làm việc cuối cùng, So that đảm bảo an toàn tuyệt đối cho dữ liệu công ty. | FR-ONB-008 | Xác nhận thu hồi laptop/thẻ; tài khoản chuyển `is_active = false`; thu hồi toàn bộ token và quyền truy cập. |
| US-ONB-009 | As a HR Staff, I want nhấn "Hoàn tất Offboarding" sau khi cả 4 bên đã ký duyệt đầy đủ, So that hồ sơ nhân viên được chuyển sang trạng thái `Terminated` và lưu trữ an toàn theo chính sách lưu trữ. | FR-ONB-009 | Chỉ cho phép hoàn tất khi 100% checklist đã được ký duyệt; ngừng tính công và chuẩn bị quyết toán trợ cấp thôi việc. |

---

## 2. Use Case Đặc tả chi tiết

### UC-ONB-001: Khởi tạo quy trình Onboarding và phân công Checklist

- **Mã FR:** FR-ONB-001, FR-ONB-002, FR-ONB-003.
- **Actor chính:** HR Staff.
- **Actor phụ:** IT Admin, Department Manager, Nhân viên mới.
- **Tiền điều kiện:** Ứng viên trúng tuyển đã được chuyển giao từ module Tuyển dụng (`REC`).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở mục "Tiếp nhận nhân sự" (Onboarding) và thấy hồ sơ ứng viên mới chuyển sang.
  2. HR Staff nhấn nút "Bắt đầu quy trình Onboarding".
  3. Hệ thống hiển thị biểu mẫu khởi tạo:
     - Ngày bắt đầu đi làm chính thức (`join_date`).
     - Chọn Mẫu Checklist áp dụng (ví dụ: `Checklist Khối Công Nghệ`, `Checklist Khối Kinh Doanh`).
  4. Hệ thống nạp danh mục các nhiệm vụ mẫu và HR Staff phân công:
     - **Nhóm 1 - Nhiệm vụ IT:** Cấp email công ty (`@company.com`), cấp quyền truy cập Slack/Jira, chuẩn bị máy tính xách tay (giao cho IT Admin phụ trách).
     - **Nhóm 2 - Nhiệm vụ Phòng ban:** Chỉ định Người hướng dẫn (Mentor), chuẩn bị tài liệu dự án và kế hoạch thử việc 60 ngày (giao cho Trưởng phòng phụ trách).
     - **Nhóm 3 - Nhiệm vụ Nhân sự:** Chuẩn bị hợp đồng thử việc, giới thiệu văn hóa công ty, chụp ảnh thẻ, chuẩn bị bàn ghế làm việc (giao cho HR Staff).
     - **Nhóm 4 - Nhiệm vụ Nhân viên mới:** Bổ sung giấy khám sức khỏe, CCCD công chứng, số tài khoản ngân hàng nhận lương.
  5. HR Staff đặt Deadline cho từng nhiệm vụ (thường trước ngày đi làm 1 ngày).
  6. HR Staff bấm "Kích hoạt Onboarding".
  7. Hệ thống tự động gửi thông báo nhiệm vụ tới từng bên liên quan.
- **Hậu điều kiện:** Quy trình Onboarding được thiết lập, thanh tiến độ ban đầu là 0%.

---

### UC-ONB-002: Bàn giao thiết bị, kích hoạt tài khoản và hoàn tất Onboarding

- **Mã FR:** FR-ONB-004, FR-ONB-005.
- **Actor:** IT Admin, HR Staff, Nhân viên mới.
- **Tiền điều kiện:** Đến ngày làm việc đầu tiên của nhân viên mới.
- **Luồng sự kiện chính (Basic Flow):**
  1. IT Admin chuẩn bị xong thiết bị, mở hệ thống và vào nhiệm vụ "Cấp phát thiết bị".
  2. IT Admin nhập: Mã tài sản (Asset Tag), Số Seri, Loại máy (ví dụ: `MacBook Pro M3`), Tình trạng máy (Mới 100%).
  3. IT Admin bấm "Đã bàn giao cho nhân viên".
  4. Nhân viên mới nhận máy, kiểm tra và nhấn "Xác nhận đã nhận đủ thiết bị" trên ứng dụng web.
  5. Khi mỗi bên hoàn thành đầu việc của mình và nhấn "Hoàn thành", thanh tiến độ Onboarding tự động nhảy % tương ứng (`FR-ONB-004`).
  6. Khi tiến độ đạt 100%:
     - HR Staff bấm nút "Hoàn tất tiếp nhận".
     - Hệ thống chính thức kích hoạt hồ sơ nhân viên trong bảng `employees` với trạng thái `Probation` (Thử việc).
     - Tài khoản đăng nhập được kích hoạt và nhân viên có thể bắt đầu chấm công hàng ngày qua module `ATT`.
- **Hậu điều kiện:** Nhân viên mới hoàn tất hội nhập, sẵn sàng làm việc chính thức.

---

### UC-ONB-003: Khởi tạo quy trình Thôi việc (Offboarding)

- **Mã FR:** FR-ONB-006.
- **Actor:** HR Staff, Department Manager, Ban Giám Đốc.
- **Tiền điều kiện:** Nhân viên nộp đơn xin thôi việc và đã được Ban Giám Đốc phê duyệt, hoặc công ty có quyết định chấm dứt hợp đồng.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở mục "Quản lý thôi việc" > nhấn "Tạo quy trình Offboarding mới".
  2. HR Staff chọn Nhân viên thôi việc và nhập:
     - Lý do nghỉ việc (Nghỉ việc theo nguyện vọng, Chấm dứt hợp đồng, Hết hạn hợp đồng không tái ký).
     - Ngày làm việc cuối cùng (`last_working_day`).
     - Ngày bắt đầu bàn giao.
  3. HR Staff bấm "Khởi tạo Offboarding".
  4. Hệ thống tự động sinh bộ Checklist 4 bên:
     - **Bên 1 - Phòng ban chuyên môn:** Bàn giao tài liệu, source code, quyền quản trị các dịch vụ phòng ban, các dự án đang dở dang (Trưởng phòng duyệt).
     - **Bên 2 - Bộ phận IT & Hành chính:** Thu hồi laptop, sạc, màn hình, thẻ nhân viên, chìa khóa tủ (IT duyệt).
     - **Bên 3 - Bộ phận Kế toán / Lương:** Đối soát các khoản tạm ứng, công nợ, tính toán số ngày phép năm còn tồn chưa nghỉ để chi trả (Payroll duyệt).
     - **Bên 4 - Bộ phận Nhân sự:** Trả sổ BHXH, hoàn tất quyết định nghỉ việc và thanh lý hợp đồng lao động (HR duyệt).
  5. Hệ thống gửi thông báo và lịch trình bàn giao đến nhân viên và 4 bộ phận liên quan.
- **Hậu điều kiện:** Quy trình thôi việc được khởi động và theo dõi minh bạch.

---

### UC-ONB-004: Thu hồi tài sản, đóng quyền truy cập và hoàn tất thôi việc

- **Mã FR:** FR-ONB-007, FR-ONB-008, FR-ONB-009.
- **Actor:** IT Admin, Department Manager, HR Staff.
- **Tiền điều kiện:** Đến ngày làm việc cuối cùng của nhân viên.
- **Luồng sự kiện chính (Basic Flow):**
  1. Trưởng phòng ban kiểm tra hoàn thành bàn giao chuyên môn và bấm "Xác nhận bàn giao công việc xong" (`FR-ONB-007`).
  2. IT Admin thu hồi lại máy tính, kiểm tra tình trạng máy và bấm "Xác nhận đã thu hồi toàn bộ tài sản" (`FR-ONB-008`).
  3. Đúng 23:59:59 của Ngày làm việc cuối cùng:
     - Hệ thống tự động kích hoạt tiến trình vô hiệu hóa tài khoản (`users.is_active = false`).
     - Hủy toàn bộ phiên làm việc (Session Tokens) của nhân viên trên tất cả thiết bị.
  4. Sau khi tất cả các bên đã ký xác nhận trên checklist (đạt 100%):
     - HR Staff mở chi tiết Offboarding và nhấn "Hoàn tất quy trình thôi việc" (`FR-ONB-009`).
     - Hệ thống đổi trạng thái hồ sơ nhân viên trong bảng `employees` thành `Terminated`.
     - Chuyển hợp đồng lao động hiện tại sang `Terminated`.
     - Ngừng tính công trong module `ATT` kể từ ngày tiếp theo.
     - Dữ liệu phép tồn được kết xuất sang module `PAY` để thanh toán tiền phép thừa trong kỳ lương cuối cùng.
     - Hồ sơ nhân viên được đưa vào danh mục lưu trữ hồ sơ đã nghỉ việc (bảo toàn dữ liệu để tra cứu pháp lý tối thiểu 5 năm).
- **Hậu điều kiện:** Nhân viên rời công ty an toàn, bảo vệ dữ liệu và tài sản doanh nghiệp tuyệt đối.
