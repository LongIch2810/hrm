# 7. User Stories & Use Cases

[Quay lại PRD](../../PRD.md#7-user-stories--use-cases)

Tài liệu này tổng hợp **109 User Stories** chuẩn mực và các Use Cases cốt lõi cho toàn bộ 12 phân hệ HRM. Toàn bộ các User Stories, vai trò người dùng (Actors), luồng sự kiện chính, luồng rẽ nhánh và luồng ngoại lệ đã được phê duyệt chính thức (**Confirmed**) theo Authorization Matrix và các quyết định kỹ thuật từ `PD-001` đến `PD-040`.

---

## Mục lục đặc tả chi tiết 12 Phân hệ

Để xem kịch bản Use Case chi tiết (tiền điều kiện, luồng chính, luồng phụ, luồng ngoại lệ, mã lỗi và hậu điều kiện), truy cập các liên kết dưới đây:

1. [7.1. Employee Management (EMP)](employee-management.md) — 9 FRs, 6 Use Cases
2. [7.2. Department Management (DEPT)](department-management.md) — 7 FRs, 5 Use Cases
3. [7.3. Attendance Management (ATT)](attendance-management.md) — 10 FRs, 5 Use Cases
4. [7.4. Leave Management (LEAVE)](leave-management.md) — 9 FRs, 5 Use Cases
5. [7.5. Payroll Management (PAY)](payroll-management.md) — 11 FRs, 5 Use Cases
6. [7.6. Recruitment Management (REC)](recruitment-management.md) — 9 FRs, 6 Use Cases
7. [7.7. Onboarding & Offboarding (ONB)](onboarding-offboarding.md) — 9 FRs, 4 Use Cases
8. [7.8. Performance Management (PERF)](performance-management.md) — 8 FRs, 5 Use Cases
9. [7.9. Contract Management (CON)](contract-management.md) — 9 FRs, 4 Use Cases
10. [7.10. Training Management (TRAIN)](training-management.md) — 8 FRs, 4 Use Cases
11. [7.11. Reports & Analytics (REP)](reports-analytics.md) — 10 FRs, 5 Use Cases
12. [7.12. System Administration (SYS)](system-administration.md) — 10 FRs, 6 Use Cases

---

## 7.1. Bảng tổng hợp 109 User Stories

Cấu trúc chuẩn: `As a <Actor>, I want <Hành động chức năng cụ thể>, So that <Mục đích và giá trị nghiệp vụ mang lại>`.

| User Story ID | Nội dung User Story | Requirement ID |
|---|---|---|
| **Phân hệ 1: EMP — Employee Management** | | |
| US-EMP-001 | As a HR Staff, I want quản lý toàn diện hồ sơ nhân viên tập trung trên hệ thống, So that dữ liệu nhân sự luôn chính xác, đồng bộ và sẵn sàng cho các nghiệp vụ chấm công, tính lương và phân quyền. | FR-EMP-001 |
| US-EMP-002 | As a HR Staff, I want thêm mới hồ sơ nhân viên với mã định danh tự động sinh dạng `EMP-YYYY-NNNN`, So that hồ sơ nhân viên mới được tiếp nhận chuẩn hóa ngay từ ngày đầu làm việc. | FR-EMP-002 |
| US-EMP-003 | As a HR Staff / Department Manager / Employee, I want xem danh sách và chi tiết hồ sơ nhân viên theo đúng phạm vi phân quyền RBAC, So that thông tin công việc được tra cứu minh bạch và dữ liệu nhạy cảm được bảo mật. | FR-EMP-003 |
| US-EMP-004 | As a HR Staff, I want cập nhật thông tin nghiệp vụ và chức danh của nhân viên, So that hồ sơ luôn phản ánh đúng vị trí và đãi ngộ hiện tại. | FR-EMP-004 |
| US-EMP-005 | As a HR Staff, I want chuyển đổi trạng thái làm việc của nhân viên (Thử việc, Chính thức, Nghỉ phép dài hạn, Đã nghỉ việc), So that hệ thống tự động khóa tài khoản và ngừng tính công khi nhân viên nghỉ việc. | FR-EMP-005 |
| US-EMP-006 | As an Employee, I want tự cập nhật số điện thoại, địa chỉ cư trú và người liên hệ khẩn cấp của mình, So that công ty có thể liên lạc kịp thời khi cần thiết mà không phải phiền HR nhập liệu thủ công. | FR-EMP-006 |
| US-EMP-007 | As a HR Staff, I want ghi nhận và truy xuất lịch sử thay đổi phòng ban, chức vụ và cấp bậc công tác, So that quá trình phát triển sự nghiệp của nhân viên được theo dõi đầy đủ. | FR-EMP-007 |
| US-EMP-008 | As a HR Staff, I want tải lên và lưu trữ các tệp số hóa (CV, hợp đồng scan, bằng cấp, CCCD) vào hồ sơ nhân viên, So that giấy tờ pháp lý được lưu trữ tập trung và an toàn. | FR-EMP-008 |
| US-EMP-009 | As a HR Staff / Department Manager, I want tìm kiếm theo tên/mã, lọc theo phòng ban/trạng thái và sắp xếp danh sách nhân viên, So that việc tra cứu nhân sự diễn ra nhanh chóng và chính xác. | FR-EMP-009 |
| **Phân hệ 2: DEPT — Department Management** | | |
| US-DEPT-001 | As a HR Staff / Admin, I want tạo mới và quản lý danh mục phòng ban với mã duy nhất và phòng ban cha, So that cơ cấu tổ chức của doanh nghiệp được mô hình hóa chính xác và phân cấp khoa học. | FR-DEPT-001 |
| US-DEPT-002 | As a HR Staff, I want thiết lập danh mục chức vụ chuẩn hóa trong doanh nghiệp, So that các vị trí công việc có tiêu chuẩn chức danh rõ ràng phục vụ tuyển dụng và bổ nhiệm. | FR-DEPT-002 |
| US-DEPT-003 | As a HR Staff, I want quản lý danh mục cấp bậc chuyên môn (Level 1..N) và hệ số bậc, So that lộ trình thăng tiến và khung năng lực nhân sự được định nghĩa minh bạch. | FR-DEPT-003 |
| US-DEPT-004 | As a HR Staff, I want phân công nhân viên vào đúng phòng ban làm việc chính thức, So that nhân sự thuộc quyền quản lý rõ ràng và chấm công, phê duyệt đúng thẩm quyền. | FR-DEPT-004 |
| US-DEPT-005 | As a HR Staff, I want bổ nhiệm Trưởng phòng (Head) và Phó phòng (Deputy Head) cho từng phòng ban, So that xác định đúng người phê duyệt đơn phép, đơn OT và đánh giá KPI cho nhân viên. | FR-DEPT-005 |
| US-DEPT-006 | As an Employee / Manager / HR Staff, I want xem sơ đồ tổ chức công ty dạng cây tương tác trực quan, So that tôi dễ dàng tra cứu mối quan hệ phân cấp và liên hệ công tác giữa các bộ phận. | FR-DEPT-006 |
| US-DEPT-007 | As a HR Staff / Admin, I want điều chỉnh liên kết phòng ban cha - con khi tái cấu trúc công ty, So that cơ cấu tổ chức linh hoạt thay đổi mà không gây xung đột hay vòng lặp phân cấp. | FR-DEPT-007 |
| **Phân hệ 3: ATT — Attendance Management** | | |
| US-ATT-001 | As an Employee, I want thực hiện Check-in tại giao diện web với 1 click khi bắt đầu làm việc, So that hệ thống ghi nhận chính xác thời điểm có mặt làm việc của tôi. | FR-ATT-001 |
| US-ATT-002 | As an Employee, I want thực hiện Check-out khi kết thúc ngày làm việc, So that hệ thống tính toán tổng số giờ làm việc thực tế trong ngày của tôi. | FR-ATT-002 |
| US-ATT-003 | As an Employee, I want tra cứu lịch sử chấm công chi tiết theo ngày/tuần/tháng, So that tôi có thể theo dõi sự chuyên cần và kịp thời phát hiện sai sót để khiếu nại. | FR-ATT-003 |
| US-ATT-004 | As a HR Staff, I want cấu hình ca làm việc chuẩn (08:00 - 17:30, nghỉ trưa 12:00 - 13:30, T2 - T6) và quy tắc ân hạn đi muộn, So that hệ thống tự động đối soát giờ làm việc thống nhất. | FR-ATT-004 |
| US-ATT-005 | As an Employee / System, I want hệ thống tự động phát hiện và ghi nhận số phút đi muộn khi check-in sau thời gian ân hạn, So that dữ liệu kỷ luật lao động được minh bạch. | FR-ATT-005 |
| US-ATT-006 | As an Employee / System, I want hệ thống tự động ghi nhận số phút về sớm nếu check-out trước giờ tan ca (17:30), So that việc đảm bảo đủ thời lượng làm việc được giám sát chặt chẽ. | FR-ATT-006 |
| US-ATT-007 | As an Employee, I want tạo đơn đăng ký làm thêm giờ (OT) gửi Manager duyệt trước khi làm việc, So that số giờ OT được tính hợp lệ vào bảng công và bảng lương. | FR-ATT-007 |
| US-ATT-008 | As an Employee, I want xem bảng công tổng hợp cá nhân theo từng tháng (tổng công chuẩn, công thực tế, ngày nghỉ phép, giờ OT), So that tôi nắm rõ số công của mình trước khi chốt lương. | FR-ATT-008 |
| US-ATT-009 | As a Department Manager, I want xem bảng công của toàn bộ nhân viên trong phòng ban mình quản lý, So that tôi giám sát được tình hình chuyên cần của đội ngũ trực thuộc. | FR-ATT-009 |
| US-ATT-010 | As a HR Staff, I want tổng hợp dữ liệu chấm công cả tháng thành Bảng tổng hợp công và đồng bộ sang phân hệ Tính lương (PAY), So that việc tính lương được thực hiện tự động và chính xác. | FR-ATT-010 |
| **Phân hệ 4: LEAVE — Leave Management** | | |
| US-LEAVE-001 | As an Employee, I want tạo đơn xin nghỉ phép trực tuyến và chọn loại phép phù hợp (Phép năm, Nghỉ ốm, Việc riêng, Không lương), So that tôi có thể xin nghỉ đúng quy định mà không cần viết đơn giấy. | FR-LEAVE-001 |
| US-LEAVE-002 | As an Employee / HR Staff, I want xem danh sách lịch sử các đơn nghỉ phép đã gửi qua các kỳ, So that tôi tra cứu được thời gian đã nghỉ và lý do cụ thể. | FR-LEAVE-002 |
| US-LEAVE-003 | As an Employee, I want theo dõi trạng thái đơn nghỉ phép theo thời gian thực (Pending, Approved, Rejected, Cancelled) và có thể hủy đơn khi còn chờ duyệt, So that tôi chủ động sắp xếp kế hoạch cá nhân. | FR-LEAVE-003 |
| US-LEAVE-004 | As a Department Manager, I want phê duyệt đơn xin nghỉ phép của nhân sự trực thuộc với 1 click, So that đơn được xử lý nhanh chóng, trừ phép ngay và tự động cập nhật vào bảng chấm công. | FR-LEAVE-004 |
| US-LEAVE-005 | As a Department Manager, I want từ chối đơn xin nghỉ phép kèm theo lý do giải thích cụ thể, So that nhân viên hiểu rõ lý do và điều chỉnh lịch nghỉ phù hợp. | FR-LEAVE-005 |
| US-LEAVE-006 | As a HR Staff, I want quản lý danh mục các loại nghỉ phép (tên, hưởng lương hay không, tỷ lệ % lương, trừ phép năm hay không), So that các chính sách nghỉ phép tuân thủ Luật Lao động Việt Nam. | FR-LEAVE-006 |
| US-LEAVE-007 | As an Employee, I want xem chi tiết số dư quỹ phép năm của mình (Tổng phép được cấp, Phép thâm niên, Phép đã dùng, Phép tồn năm trước, Số ngày còn lại khả dụng), So that tôi lên kế hoạch nghỉ phép hợp lý. | FR-LEAVE-007 |
| US-LEAVE-008 | As a Department Manager / Employee, I want xem Lịch nghỉ phép phòng ban dạng Calendar, So that nắm bắt được ai đang nghỉ trong ngày để sắp xếp công việc và không phê duyệt trùng lặp gây thiếu người. | FR-LEAVE-008 |
| US-LEAVE-009 | As a HR Staff, I want xuất báo cáo thống kê tình hình nghỉ phép theo tháng/quý/năm của từng bộ phận, So that đánh giá tỷ lệ vắng mặt và phục vụ quyết toán phép cuối năm. | FR-LEAVE-009 |
| **Phân hệ 5: PAY — Payroll Management** | | |
| US-PAY-001 | As a HR Staff, I want cấu hình thông tin lương cơ bản, mức đóng bảo hiểm và tài khoản ngân hàng của nhân viên theo hợp đồng lao động, So that hệ thống có căn cứ tính lương chuẩn xác. | FR-PAY-001 |
| US-PAY-002 | As a HR Staff, I want tạo kỳ lương theo tháng (kỳ công từ ngày 1 đến ngày cuối tháng), So that chu trình tính và trả lương diễn ra đúng hạn vào ngày 5 hàng tháng. | FR-PAY-002 |
| US-PAY-003 | As a HR Staff, I want hệ thống tự động tính toán lương Gross, tiền công thực tế, phụ cấp, trích nộp bảo hiểm, thuế TNCN và lương Net, So that giảm thiểu 95% sai sót tính toán thủ công bằng Excel. | FR-PAY-003 |
| US-PAY-004 | As a HR Staff, I want quản lý danh mục và gán các khoản phụ cấp (ăn trưa, xăng xe, điện thoại, phụ cấp trách nhiệm), So that các khoản phụ cấp chịu thuế và miễn thuế được phân loại đúng luật. | FR-PAY-004 |
| US-PAY-005 | As a HR Staff, I want nhập các khoản thưởng (thưởng KPI, thưởng dự án, thưởng lễ tết) cho nhân viên trong kỳ, So that các khoản thu nhập bổ sung được chi trả đầy đủ. | FR-PAY-005 |
| US-PAY-006 | As a HR Staff, I want ghi nhận các khoản khấu trừ (tạm ứng lương, bồi thường tài sản, công nợ) vào bảng lương của nhân viên, So that các nghĩa vụ tài chính của nhân viên được trừ trực tiếp vào lương Net. | FR-PAY-006 |
| US-PAY-007 | As a Hệ thống tự động, I want tính thuế thu nhập cá nhân theo biểu thuế lũy tiến từng phần sau khi đã trừ giảm trừ gia cảnh (11tr cho bản thân, 4.4tr/người phụ thuộc), So that nghĩa vụ thuế tuân thủ pháp luật Việt Nam. | FR-PAY-007 |
| US-PAY-008 | As a Hệ thống tự động, I want trích đóng bảo hiểm bắt buộc người lao động (8% BHXH, 1.5% BHYT, 1% BHTN = tổng 10.5%), So that việc trích nộp BHXH chính xác trên mức lương đóng bảo hiểm. | FR-PAY-008 |
| US-PAY-009 | As a HR Staff / Hệ thống, I want tự động sinh Phiếu lương điện tử (Payslip) cho từng nhân viên ngay sau khi bảng lương được khóa, So that nhân sự nhận được chi tiết thu nhập minh bạch. | FR-PAY-009 |
| US-PAY-010 | As an Employee, I want xem và tải phiếu lương cá nhân của các tháng trước đó dưới dạng PDF, So that tôi có thể theo dõi thu nhập và lưu trữ chứng từ tài chính cá nhân. | FR-PAY-010 |
| US-PAY-011 | As a HR Manager / Giám Đốc, I want xem Bảng lương tổng hợp toàn công ty theo từng phòng ban, So that kiểm soát tổng quỹ lương và phê duyệt chi trả lương hàng tháng. | FR-PAY-011 |
| **Phân hệ 6: REC — Recruitment Management** | | |
| US-REC-001 | As a HR Staff, I want tạo và quản lý các vị trí tuyển dụng (Job Openings) theo đề xuất của phòng ban, So that việc tìm kiếm nhân tài có mục tiêu, ngân sách và tiêu chí tuyển dụng rõ ràng. | FR-REC-001 |
| US-REC-002 | As a HR Staff, I want đăng thông tin tuyển dụng lên cổng nội bộ công ty và tạo nội dung chia sẻ cho các mạng xã hội (LinkedIn, TopCV), So that tiếp cận được nhiều ứng viên tiềm năng. | FR-REC-002 |
| US-REC-003 | As a HR Staff, I want tiếp nhận, tải lên tệp CV (PDF/DOCX <= 5MB) và quản lý danh sách hồ sơ ứng viên tập trung, So that không bị thất lạc hồ sơ và dễ dàng tra cứu. | FR-REC-003 |
| US-REC-004 | As a HR Staff / Manager, I want theo dõi tiến trình tuyển dụng dạng bảng Kanban trực quan (Ứng tuyển → Sàng lọc → Phỏng vấn → Offer → Trúng tuyển → Từ chối), So that tôi nắm bắt được tỷ lệ chuyển đổi qua từng giai đoạn. | FR-REC-004 |
| US-REC-005 | As a HR Staff, I want cấu hình số vòng phỏng vấn linh hoạt cho từng vị trí, So that quy trình đánh giá phù hợp với độ phức tạp của từng chức danh. | FR-REC-005 |
| US-REC-006 | As a HR Staff, I want lên lịch phỏng vấn và hệ thống tự động gửi thư mời kèm link họp trực tuyến (Google Meet/Teams) hoặc địa điểm cho ứng viên và người phỏng vấn, So that buổi phỏng vấn diễn ra đúng hẹn và chuyên nghiệp. | FR-REC-006 |
| US-REC-007 | As an Interviewer, I want điền phiếu đánh giá ứng viên trực tiếp trên hệ thống theo thang điểm 1-5 và nhận xét chi tiết, So that kết quả phỏng vấn được lưu vết khách quan, hỗ trợ quyết định tuyển dụng. | FR-REC-007 |
| US-REC-008 | As a HR Staff, I want soạn thảo Thư mời nhận việc (Offer Letter) và trình HR Manager duyệt trước khi gửi ứng viên, So that mức đãi ngộ và thời gian nhận việc được kiểm soát chặt chẽ. | FR-REC-008 |
| US-REC-009 | As a HR Staff, I want chuyển ứng viên đã chấp thuận offer sang phân hệ Onboarding chỉ bằng 1 click, So that toàn bộ thông tin cá nhân và vị trí trúng tuyển được kế thừa tự động sang quy trình tiếp nhận nhân viên mới. | FR-REC-009 |
| **Phân hệ 7: ONB — Onboarding & Offboarding** | | |
| US-ONB-001 | As a HR Staff, I want khởi tạo quy trình Onboarding tự động khi ứng viên đồng ý nhận việc từ phân hệ Tuyển dụng, So that các bộ phận liên quan có đủ thời gian chuẩn bị chu đáo trước ngày nhân viên vào làm. | FR-ONB-001 |
| US-ONB-002 | As a HR Staff, I want áp dụng bộ Onboarding Checklist chuẩn hóa theo từng vị trí và phòng ban, So that không bỏ sót bất kỳ đầu việc chuẩn bị quan trọng nào. | FR-ONB-002 |
| US-ONB-003 | As a HR Staff, I want phân công nhiệm vụ tiếp nhận cho từng người phụ trách cụ thể kèm thời hạn hoàn thành (Deadline), So that IT, Hành chính và Quản lý phòng ban chủ động hoàn thành trách nhiệm trước ngày gia nhập. | FR-ONB-003 |
| US-ONB-004 | As a HR Staff và Department Manager, I want theo dõi thanh tiến độ % hoàn thành của Onboarding Checklist theo thời gian thực, So that kịp thời đôn đốc các bên và hỗ trợ nhân viên mới hòa nhập tốt nhất. | FR-ONB-004 |
| US-ONB-005 | As an IT Admin / Admin Staff, I want quản lý cấp phát thiết bị làm việc (Laptop, Màn hình, Thẻ nhân viên) và ghi nhận số seri, biên bản bàn giao, So that tài sản công ty được quản lý chặt chẽ ngay từ đầu. | FR-ONB-005 |
| US-ONB-006 | As a HR Staff, I want khởi tạo quy trình thôi việc (Offboarding) khi đơn thôi việc được duyệt và xác định Ngày làm việc cuối cùng, So that các thủ tục bàn giao và thanh toán chế độ diễn ra đúng luật. | FR-ONB-006 |
| US-ONB-007 | As a Department Manager và Nhân viên nghỉ việc, I want lập và ký duyệt biên bản bàn giao công việc, tài liệu dự án và mã nguồn, So that hoạt động của phòng ban không bị gián đoạn sau khi nhân viên rời đi. | FR-ONB-007 |
| US-ONB-008 | As an IT Admin, I want kiểm tra và xác nhận thu hồi thiết bị, đồng thời tự động đóng tài khoản người dùng vào 23:59:59 của ngày làm việc cuối cùng, So that đảm bảo an toàn tuyệt đối cho dữ liệu công ty. | FR-ONB-008 |
| US-ONB-009 | As a HR Staff, I want nhấn "Hoàn tất Offboarding" sau khi cả 4 bên đã ký duyệt đầy đủ, So that hồ sơ nhân viên được chuyển sang trạng thái `Terminated` và lưu trữ an toàn theo chính sách lưu trữ. | FR-ONB-009 |
| **Phân hệ 8: PERF — Performance Management** | | |
| US-PERF-001 | As a HR Staff, I want quản lý danh mục tiêu chí đánh giá chuẩn hóa theo từng khối/vị trí, So that việc đánh giá có thước đo thống nhất. | FR-PERF-001 |
| US-PERF-002 | As an Employee và Department Manager, I want cùng thống nhất thiết lập các mục tiêu KPI/OKR đầu kỳ với tổng trọng số đúng 100%, So that nhân viên nắm rõ mục tiêu trọng tâm cần đạt được. | FR-PERF-002 |
| US-PERF-003 | As a HR Staff, I want mở các kỳ đánh giá định kỳ (nửa năm hoặc cuối năm) kèm thời hạn cụ thể cho từng bước, So that toàn thể nhân sự thực hiện đánh giá đồng bộ và đúng tiến độ. | FR-PERF-003 |
| US-PERF-004 | As an Employee, I want tự chấm điểm hiệu suất của bản thân (thang điểm 1.0 - 5.0) và đính kèm minh chứng kết quả đạt được, So that tôi chủ động nhìn nhận lại đóng góp của mình trong kỳ. | FR-PERF-004 |
| US-PERF-005 | As a Department Manager, I want chấm điểm và viết nhận xét chi tiết điểm mạnh, điểm cần cải thiện cho từng nhân viên phòng mình, So that việc đánh giá mang tính xây dựng và công tâm. | FR-PERF-005 |
| US-PERF-006 | As a Hệ thống tự động, I want tính toán điểm tổng hợp có trọng số giữa điểm tự đánh giá và điểm của quản lý theo công thức chuẩn, So that kết quả tổng kết chính xác tuyệt đối. | FR-PERF-006 |
| US-PERF-007 | As a HR Staff / Hệ thống, I want tự động xếp loại nhân viên thành 5 mức chuẩn (Xuất sắc, Tốt, Đạt, Cần cải thiện, Không đạt), So that làm căn cứ xét thưởng, tăng lương và quy hoạch nhân sự. | FR-PERF-007 |
| US-PERF-008 | As an Employee và HR Staff, I want xem toàn bộ lịch sử điểm và xếp loại qua các năm kèm nhận xét của quản lý, So that theo dõi được biểu đồ tăng trưởng năng lực của nhân sự. | FR-PERF-008 |
| **Phân hệ 9: CON — Contract Management** | | |
| US-CON-001 | As a HR Staff, I want tạo mới hợp đồng lao động với số hợp đồng duy nhất và đầy đủ các điều khoản cơ bản (lương, vị trí, địa điểm), So that việc thiết lập quan hệ lao động hợp pháp và minh bạch. | FR-CON-001 |
| US-CON-002 | As a HR Staff, I want quản lý 3 loại hợp đồng chuẩn theo Bộ luật Lao động (Thử việc, Xác định thời hạn, Không xác định thời hạn), So that loại hình hợp đồng tuân thủ đúng khung pháp lý Việt Nam. | FR-CON-002 |
| US-CON-003 | As a HR Staff, I want theo dõi chính xác ngày bắt đầu và ngày kết thúc hiệu lực của từng hợp đồng, So that quản lý được thời gian làm việc và quyền lợi tương ứng của nhân viên. | FR-CON-003 |
| US-CON-004 | As a HR Staff, I want tạo phụ lục hợp đồng gắn với hợp đồng gốc khi có thay đổi về mức lương, chức danh hoặc địa điểm làm việc, So that các điều chỉnh đãi ngộ được lưu vết pháp lý chặt chẽ. | FR-CON-004 |
| US-CON-005 | As a HR Staff và Department Manager, I want hệ thống tự động gửi cảnh báo qua Email và Dashboard khi hợp đồng sắp hết hạn trước 30 ngày và 45 ngày, So that chúng tôi kịp thời đánh giá và chuẩn bị thủ tục tái ký hoặc bàn giao. | FR-CON-005 |
| US-CON-006 | As a HR Staff, I want thực hiện quy trình gia hạn hợp đồng (ký tiếp hợp đồng có thời hạn lần 2 hoặc chuyển sang hợp đồng vô thời hạn), So that nhân viên tiếp tục cống hiến mà không bị gián đoạn quan hệ lao động. | FR-CON-006 |
| US-CON-007 | As a HR Staff, I want tải lên và lưu trữ an toàn tệp PDF scan hợp đồng đã có đầy đủ chữ ký và con dấu pháp nhân, So that hồ sơ pháp lý số hóa có thể đối chiếu bất cứ lúc nào khi thanh tra. | FR-CON-007 |
| US-CON-008 | As a HR Staff và Employee, I want xem toàn bộ lịch sử các đời hợp đồng và phụ lục đã từng ký từ ngày đầu vào làm việc, So that quá trình cống hiến và tăng lương của nhân viên được theo dõi xuyên suốt. | FR-CON-008 |
| US-CON-009 | As a HR Staff, I want quản lý trạng thái hợp đồng (Draft, Active, Expired, Terminated), So that hệ thống phản ánh đúng hiệu lực pháp lý và đồng bộ sang trạng thái nhân viên EMP. | FR-CON-009 |
| **Phân hệ 10: TRAIN — Training Management** | | |
| US-TRAIN-001 | As a HR Staff, I want quản lý các chương trình đào tạo theo lộ trình phát triển nghề nghiệp, So that kế hoạch phát triển nhân tài được tổ chức bài bản. | FR-TRAIN-001 |
| US-TRAIN-002 | As a HR Staff, I want tạo và quản lý thông tin các khóa học (tên khóa, thời lượng, giảng viên, chi phí, sĩ số tối đa), So that thông tin lớp học được công bố rõ ràng. | FR-TRAIN-002 |
| US-TRAIN-003 | As a HR Staff, I want lập lịch đào tạo chi tiết (ngày, giờ bắt đầu/kết thúc, phòng học hoặc link trực tuyến) và gửi thông báo tự động cho học viên, So that các buổi học diễn ra đúng kế hoạch. | FR-TRAIN-003 |
| US-TRAIN-004 | As a HR Staff / Manager, I want phân công nhân viên bắt buộc tham gia hoặc mở cho nhân viên tự đăng ký khóa học, So that đối tượng tham gia đúng theo nhu cầu nâng cao năng lực. | FR-TRAIN-004 |
| US-TRAIN-005 | As a Trainer / HR Staff, I want thực hiện điểm danh học viên tại từng buổi học, So that theo dõi tỷ lệ chuyên cần và tính kỷ luật của học viên. | FR-TRAIN-005 |
| US-TRAIN-006 | As a Trainer, I want chấm điểm bài kiểm tra cuối khóa (thang điểm 10) và ghi nhận kết quả Đạt hoặc Không đạt, So that đánh giá chính xác mức độ tiếp thu kiến thức của nhân viên. | FR-TRAIN-006 |
| US-TRAIN-007 | As a HR Staff, I want hệ thống tự động sinh và cấp phát Chứng chỉ đào tạo số hóa cho các học viên đạt yêu cầu, So that ghi nhận sự nỗ lực và chứng nhận năng lực của nhân viên. | FR-TRAIN-007 |
| US-TRAIN-008 | As an Employee và HR Staff, I want xem toàn bộ lịch sử các khóa đào tạo đã tham gia và các chứng chỉ đạt được ngay trong hồ sơ nhân viên, So that làm căn cứ xét thăng chức và tăng lương. | FR-TRAIN-008 |
| **Phân hệ 11: REP — Reports & Analytics** | | |
| US-REP-001 | As a Ban Giám Đốc và HR Manager, I want Dashboard tổng quan hiển thị các chỉ số nhân sự cốt lõi thời gian thực, So that tôi nắm bắt nhanh sức khỏe tổ chức chỉ trong 5 giây. | FR-REP-001 |
| US-REP-002 | As a HR Manager, I want thống kê quy mô và phân bổ nhân sự theo loại hợp đồng và trạng thái làm việc qua từng tháng, So that theo dõi được sự tăng trưởng lực lượng lao động. | FR-REP-002 |
| US-REP-003 | As a Department Manager và HR Manager, I want biểu đồ cơ cấu nhân sự theo từng phòng ban và tỷ lệ Nam/Nữ, So that đánh giá được sự cân đối nguồn lực và đa dạng giới trong doanh nghiệp. | FR-REP-003 |
| US-REP-004 | As a HR Manager, I want báo cáo thống kê tuyển dụng (số lượng CV, tỷ lệ chuyển đổi, thời gian tuyển trung bình), So that tối ưu hóa chi phí và kênh tuyển dụng. | FR-REP-004 |
| US-REP-005 | As a Department Manager và HR Manager, I want báo cáo thống kê nghỉ phép và phân bổ ngày nghỉ phép theo từng loại phép, So that chủ động bố trí nhân lực và dự phòng mùa cao điểm nghỉ phép. | FR-REP-005 |
| US-REP-006 | As a Department Manager và HR Manager, I want báo cáo chấm công chi tiết về tỷ lệ đi làm đúng giờ, số lần đi muộn, về sớm và tổng số giờ làm thêm OT, So that giám sát kỷ luật lao động và chi phí làm thêm giờ. | FR-REP-006 |
| US-REP-007 | As a Ban Giám Đốc và HR Manager, I want báo cáo phân tích chi phí quỹ lương qua các kỳ (Lương cơ bản, Lương OT, Thưởng, BHXH công ty, Thuế TNCN), So that kiểm soát ngân sách tiền lương của doanh nghiệp. | FR-REP-007 |
| US-REP-008 | As a HR Manager và Ban Giám Đốc, I want thống kê biến động nhân sự (số lượng tiếp nhận Onboarding vs số lượng thôi việc Offboarding), So that nhận diện xu hướng phát triển tổ chức. | FR-REP-008 |
| US-REP-009 | As a Ban Giám Đốc và HR Manager, I want phân tích tỷ lệ thôi việc (Turnover Rate) chuẩn hóa theo tháng/quý/năm và phân loại theo lý do nghỉ việc chính, So that có chính sách giữ chân nhân tài kịp thời. | FR-REP-009 |
| US-REP-010 | As a Tất cả các cấp quản lý theo quyền, I want kết xuất các bảng báo cáo ra file Excel (.xlsx) chuẩn form và file PDF có tiêu đề công ty, So that phục vụ lưu trữ quản trị và họp giao ban. | FR-REP-010 |
| **Phân hệ 12: SYS — System Administration** | | |
| US-SYS-001 | As a System Administrator, I want tạo, kích hoạt, khóa và đặt lại mật khẩu cho tài khoản người dùng gắn với mã nhân viên, So that nhân sự có tài khoản truy cập hệ thống đúng thẩm quyền. | FR-SYS-001 |
| US-SYS-002 | As a Tất cả người dùng, I want đăng nhập hệ thống an toàn bằng Email và Mật khẩu, nhận JWT Access Token và Refresh Token bảo mật, So that danh tính của tôi được xác thực trước khi làm việc. | FR-SYS-002 |
| US-SYS-003 | As a Hệ thống, I want tự động chặn đứng các truy cập trái phép bằng HTTP 403 Forbidden nếu người dùng không đủ quyền trên endpoint hoặc tài nguyên, So that dữ liệu doanh nghiệp không bị rò rỉ. | FR-SYS-003 |
| US-SYS-004 | As a System Administrator, I want áp dụng mô hình phân quyền theo vai trò (RBAC) với 4 vai trò chuẩn hóa (Admin, HR Staff, Manager, Employee), So that việc phân bổ trách nhiệm nghiệp vụ rõ ràng và nhất quán. | FR-SYS-004 |
| US-SYS-005 | As a System Administrator, I want quản lý danh mục và mô tả chi tiết của 4 vai trò người dùng trong hệ thống, So that chính sách phân quyền luôn được tài liệu hóa và bảo trì dễ dàng. | FR-SYS-005 |
| US-SYS-006 | As a System Administrator, I want cấu hình chi tiết các mã quyền (Permissions) theo từng thao tác, So that hệ thống có thể mở rộng quyền hạn linh hoạt khi cần. | FR-SYS-006 |
| US-SYS-007 | As a System Administrator, I want cấu hình các tham số toàn cục của hệ thống (Giờ ca chuẩn, Ngưỡng ân hạn chấm công, Tỷ lệ trích BHXH, Ngưỡng giảm trừ gia cảnh), So that hệ thống vận hành linh hoạt theo luật định. | FR-SYS-007 |
| US-SYS-008 | As an Employee / Manager / HR Staff, I want nhận thông báo In-App (icon chuông) và Email thời gian thực khi có sự kiện liên quan, So that tôi cập nhật tin tức công việc kịp thời. | FR-SYS-008 |
| US-SYS-009 | As a System Administrator, I want hệ thống tự động ghi nhật ký kiểm toán (Audit Logs) bất biến đối với mọi hành vi nhạy cảm, So that luôn có đầy đủ dấu vết để đối soát và điều tra sự cố bảo mật. | FR-SYS-009 |
| US-SYS-010 | As a System Administrator, I want tra cứu, lọc và xem chi tiết nhật ký kiểm toán theo thời gian, người thực hiện hoặc loại thao tác, So that dễ dàng kiểm tra hoạt động quản trị khi có yêu cầu thanh tra. | FR-SYS-010 |

---

## 7.2. Primary Use Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

| UC ID | Phân hệ & Actor chính | FR liên quan | Mô tả tác vụ chính và kết quả mong đợi |
|---|---|---|---|
| [UC-EMP-001](employee-management.md#uc-emp-001-thêm-mới-hồ-sơ-nhân-viên) | EMP — HR Staff | FR-EMP-001, FR-EMP-002 | Tạo hồ sơ nhân viên mới, tự sinh mã `EMP-YYYY-NNNN`, kiểm tra trùng lặp email/CCCD. |
| [UC-DEPT-001](department-management.md#uc-dept-001-khởi-tạo-và-cập-nhật-phòng-ban) | DEPT — HR Staff / Admin | FR-DEPT-001, FR-DEPT-007 | Khởi tạo cấu trúc phòng ban phân cấp, kiểm tra thuật toán DFS ngăn chặn vòng lặp cha-con. |
| [UC-ATT-001](attendance-management.md#uc-att-001-thực-hiện-check-in--check-out-hàng-ngày) | ATT — Employee & System | FR-ATT-001, FR-ATT-002, FR-ATT-005 | Check-in/Check-out web 1 click, ân hạn 15 phút (sau 08:15 tính muộn từ 08:00), tính giờ làm việc. |
| [UC-LEAVE-001](leave-management.md#uc-leave-001-tạo-và-nộp-đơn-xin-nghỉ-phép) | LEAVE — Employee | FR-LEAVE-001, FR-LEAVE-007 | Nộp đơn xin nghỉ trực tuyến, kiểm tra số dư phép khả dụng, tự loại trừ Thứ 7/CN và ngày lễ. |
| [UC-LEAVE-002](leave-management.md#uc-leave-002-phê-duyệt-hoặc-từ-chối-đơn-nghỉ-phép-luồng-1-cấp) | LEAVE — Department Manager | FR-LEAVE-004, FR-LEAVE-005 | Quy trình duyệt phép 1 cấp trực tiếp, tự động trừ số dư ngày phép và đồng bộ bảng công ATT. |
| [UC-PAY-001](payroll-management.md#uc-pay-001-khởi-tạo-kỳ-lương-và-chạy-tính-toán-lương-tự-động) | PAY — HR Staff (Payroll) | FR-PAY-002, FR-PAY-003, FR-PAY-007 | Tính toán tự động lương Net, BHXH (10.5%), Thuế TNCN biểu lũy tiến, làm tròn 0 chữ số VNĐ. |
| [UC-PAY-003](payroll-management.md#uc-pay-003-phê-duyệt-khóa-kỳ-lương-và-xuất-báo-cáo-quỹ-lương) | PAY — HR Manager / Giám Đốc | FR-PAY-002, FR-PAY-011 | Rà soát quỹ lương toàn công ty, khóa kỳ lương bất biến và phát hành phiếu lương điện tử Payslip. |
| [UC-REC-001](recruitment-management.md#uc-rec-001-khởi-tạo-và-quản-lý-vị-trí-tuyển-dụng) | REC — HR Staff | FR-REC-001, FR-REC-002, FR-REC-005 | Quản lý vị trí tuyển dụng, đăng tin, quản lý pipeline tuyển dụng 5 vòng dạng bảng Kanban. |
| [UC-REC-006](recruitment-management.md#uc-rec-006-tiếp-nhận-kết-quả-offer-và-chuyển-giao-sang-onboarding) | REC — HR Staff | FR-REC-009 | Bàn giao ứng viên trúng tuyển sang module ONB, tự động kế thừa hồ sơ và gán checklist tiếp nhận. |
| [UC-ONB-001](onboarding-offboarding.md#uc-onb-001-khởi-tạo-quy-trình-onboarding-và-phân-công-checklist) | ONB — HR Staff, IT, Manager | FR-ONB-001, FR-ONB-002, FR-ONB-003 | Phân công checklist Onboarding 4 bên, cấp phát laptop/email và theo dõi tiến độ % hoàn thành. |
| [UC-ONB-004](onboarding-offboarding.md#uc-onb-004-thu-hồi-tài-sản-đóng-quyền-truy-cập-và-hoàn-tất-thôi-việc) | ONB — IT Admin & HR Staff | FR-ONB-007, FR-ONB-008, FR-ONB-009 | Bàn giao công việc, thu hồi thiết bị, đóng quyền truy cập lúc 23:59:59 và chuyển trạng thái Terminated. |
| [UC-PERF-001](performance-management.md#uc-perf-001-thiết-lập-và-phê-duyệt-mục-tiêu-đầu-kỳ-kpi--okr) | PERF — Employee & Manager | FR-PERF-001, FR-PERF-002 | Thống nhất mục tiêu KPI/OKR đầu kỳ với tổng trọng số bắt buộc = 100%. |
| [UC-PERF-004](performance-management.md#uc-perf-004-quản-lý-trực-tiếp-chấm-điểm-và-phản-hồi-hiệu-suất) | PERF — Department Manager | FR-PERF-005, FR-PERF-006, FR-PERF-007 | Quản lý chấm điểm hiệu suất, viết nhận xét định tính và xếp loại nhân viên theo 5 mức (A, B, C, D, E). |
| [UC-CON-001](contract-management.md#uc-con-001-tạo-mới-và-kích-hoạt-hợp-đồng-lao-động) | CON — HR Staff | FR-CON-001, FR-CON-002, FR-CON-009 | Quản lý 3 loại hợp đồng chuẩn, gắn mức lương cơ bản, cảnh báo hết hạn tự động trước 30 và 45 ngày. |
| [UC-TRAIN-001](training-management.md#uc-train-001-lập-kế-hoạch-khóa-học-và-phân-công-học-viên) | TRAIN — HR Staff & Trainer | FR-TRAIN-001, FR-TRAIN-003, FR-TRAIN-004 | Lập lịch khóa học, điểm danh chuyên cần $\ge 80\%$, kiểm tra $\ge 6.0/10$ và cấp chứng chỉ số hóa. |
| [UC-REP-001](reports-analytics.md#uc-rep-001-khai-thác-dashboard-tổng-quan-nhân-sự) | REP — Giám Đốc, HR Manager | FR-REP-001, FR-REP-007, FR-REP-009 | Báo cáo trực quan Dashboard KPI, tỷ lệ thôi việc Turnover Rate, xuất báo cáo Excel/PDF bảo mật. |
| [UC-SYS-001](system-administration.md#uc-sys-001-đăng-nhập-và-xác-thực-danh-tính-authentication) | SYS — Tất cả người dùng | FR-SYS-002, FR-SYS-003 | Đăng nhập an toàn, cấp JWT 15m + Refresh Token Cookie 7d, chống Brute-force khóa sau 5 lần sai. |

---

## 7.3. Luồng rẽ nhánh chuẩn hóa (Alternative Flows)

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Nhân viên tự cập nhật thông tin liên hệ (`UC-EMP-003`):** Nhân viên tự sửa số điện thoại, địa chỉ cư trú, người liên hệ khẩn cấp mà không cần qua duyệt; hệ thống tự động ghi nhật ký audit log.
2. **Quản lý từ chối đơn nghỉ phép (`UC-LEAVE-002`):** Quản lý bắt buộc nhập lý do từ chối (tối thiểu 10 ký tự); đơn chuyển sang `REJECTED`, quỹ ngày phép của nhân viên không bị trừ.
3. **Hủy đơn nghỉ phép trước hạn (`UC-LEAVE-003`):** Nhân viên hủy đơn `PENDING` ngay lập tức; với đơn đã `APPROVED`, cần Manager xác nhận hủy để hoàn lại ngày phép và cập nhật lại bảng chấm công.
4. **Tiếp nhận nhân sự không qua tuyển dụng (`UC-EMP-001`):** HR Staff có thể tạo trực tiếp hồ sơ nhân viên trong `EMP` cho các trường hợp tuyển thẳng hoặc lãnh đạo cấp cao bổ nhiệm mà không cần qua pipeline REC.
5. **Mở khóa kỳ lương đặc biệt (`UC-PAY-005`):** Chỉ HR Manager hoặc Ban Giám Đốc mới có quyền mở khóa kỳ lương đã đóng; bắt buộc nhập văn bản giải trình và ghi nhận audit log mức độ nghiêm trọng cao.

---

## 7.4. Luồng xử lý ngoại lệ & Mã lỗi (Exception Flows)

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Trùng lặp mã định danh (`409 CONFLICT`):**
   - Trùng CCCD hoặc Email công ty trong `EMP`: `DUPLICATE_IDENTIFIER`.
   - Trùng Mã phòng ban trong `DEPT`: `DUPLICATE_DEPARTMENT_CODE`.
   - Trùng Số hợp đồng trong `CON`: `DUPLICATE_CONTRACT_NUMBER`.
2. **Truy cập ngoài thẩm quyền phân quyền (`403 FORBIDDEN`):**
   - Department Manager cố tình truy vấn nhân sự hoặc bảng lương ngoài phòng ban mình phụ trách: `FORBIDDEN_RESOURCE`.
   - Employee cố tình sửa trường nghiệp vụ (Lương, Chức vụ, Phòng ban): `INSUFFICIENT_PERMISSIONS`.
3. **Số dư phép không đủ (`400 BAD_REQUEST`):**
   - Nhân viên nộp đơn phép năm vượt quá số dư phép năm khả dụng: `INSUFFICIENT_LEAVE_BALANCE`.
4. **Vi phạm cấu trúc phân cấp (`400 BAD_REQUEST`):**
   - Chọn phòng ban con hoặc chính nó làm phòng ban cha: `CIRCULAR_HIERARCHY_DETECTED`.
5. **Thao tác trên dữ liệu đã khóa (`400 BAD_REQUEST`):**
   - Sửa đổi bảng công hoặc dữ liệu lương khi kỳ đã `Closed`/`Locked`: `PAYROLL_LOCKED` / `TIMESHEET_LOCKED`.
6. **Lỗi tệp đính kèm (`400 BAD_REQUEST`):**
   - File vượt quá 5MB: `FILE_SIZE_EXCEEDED`.
   - File sai định dạng whitelist: `INVALID_FILE_TYPE`.
