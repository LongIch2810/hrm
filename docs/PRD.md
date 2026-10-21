# HRM — Product Overview

Tài liệu này giúp agent nắm sản phẩm cần xây. Tra [mục lục đặc tả yêu cầu](prd/index.md) trước khi thiết kế hoặc triển khai một chức năng.

**Status:** Confirmed — Approved by Product Owner. Toàn bộ 40/40 Pending Decisions đã được chốt và đồng bộ.

## 1. Product Overview

### 1.1. Product Description

HRM là hệ thống quản lý nhân sự tập trung trên web, hỗ trợ vòng đời nhân viên từ tuyển dụng, tiếp nhận, tổ chức nhân sự, chấm công, nghỉ phép, tính lương, đánh giá hiệu suất, đào tạo đến nghỉ việc. Hệ thống hỗ trợ nghiệp vụ giữa nhân viên, quản lý, HR Staff và System Administrator.

### 1.2. Product Vision

Hệ thống quản lý nhân sự tập trung nội bộ cho doanh nghiệp vừa và nhỏ (SME quy mô 50 - 300 nhân sự) tại Việt Nam. Sản phẩm hướng tới số hóa và tự động hóa toàn bộ vòng đời nhân viên, giảm thiểu 80% tác vụ giấy tờ/thủ công, bảo đảm tuân thủ chặt chẽ Bộ luật Lao động Việt Nam và cung cấp dữ liệu tức thời cho ban quản trị.

- **Định vị:** Sản phẩm nội bộ chuyên sâu cho doanh nghiệp (Single-tenant).
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-001).

### 1.3. Product Objectives

- **Tập trung hóa:** Số hóa 100% hồ sơ nhân sự và sơ đồ tổ chức phòng ban trên một nền tảng duy nhất.
- **Tự động hóa vận hành:** Tự động hóa quy trình chấm công, tính phép, tính lương và luồng phê duyệt, loại bỏ 80% thời gian xử lý thủ công bằng giấy tờ/Excel.
- **Minh bạch & Tuân thủ:** Đảm bảo dữ liệu chấm công, nghỉ phép và lương thưởng minh bạch, tuân thủ đúng Bộ luật Lao động Việt Nam.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-003).

### 1.4. Product Context

- **Quy mô doanh nghiệp mục tiêu:** Doanh nghiệp vừa và nhỏ (50 - 300 nhân viên).
- **Mô hình triển khai:** Đơn doanh nghiệp (Single-tenant), triển khai nội bộ hoặc trên hạ tầng đám mây riêng.
- **Địa bàn pháp lý:** Hoạt động tại Việt Nam, tuân thủ Luật Lao động, chính sách Bảo hiểm xã hội và Thuế TNCN hiện hành của Việt Nam.
- **Ngôn ngữ hỗ trợ:** Tiếng Việt (giao diện chính).
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-001).

## 2. Problem Statement

### 2.1. Current Problems

- **Hồ sơ phân tán:** Dữ liệu nhân viên, hợp đồng lưu rải rác trên các file Excel hoặc hồ sơ giấy tờ, dễ thất lạc và khó tra cứu lịch sử thay đổi.
- **Chấm công thủ công:** Đối soát giờ làm, đi muộn, về sớm bằng phương pháp thủ công tốn nhiều ngày công của phòng nhân sự vào mỗi cuối tháng, tỷ lệ sai lệch cao.
- **Phê duyệt chậm trễ:** Đơn nghỉ phép viết tay hoặc gửi qua chat không đồng bộ với bảng công, gây nhầm lẫn khi chốt ngày công.
- **Thiếu bức tranh tổng thể:** Ban giám đốc và các trưởng phòng thiếu dashboard theo dõi tỷ lệ biến động nhân sự và chuyên cần theo thời gian thực.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-001, PD-003).

### 2.2. Proposed Solution

Phát triển hệ thống HRM trên nền tảng Web hiện đại, phân quyền phân cấp đa vai trò (Admin, HR Staff, Department Manager, Employee), tập trung dữ liệu toàn diện và cung cấp cổng tự phục vụ (Self-service) cho toàn thể cán bộ nhân viên.

### 2.3. Expected Benefits

- **Tiết kiệm thời gian:** Giảm từ 3 - 5 ngày làm việc mỗi tháng của HR Staff trong khâu tổng hợp công và duyệt phép xuống dưới 4 giờ.
- **Minh bạch 100%:** Nhân viên tự theo dõi được lịch sử check-in/out, số dư phép năm khả dụng và phiếu lương minh bạch.
- **Dữ liệu chuẩn xác:** Triệt tiêu sai sót do nhập liệu lặp lại giữa các khâu Chấm công $\rightarrow$ Nghỉ phép $\rightarrow$ Tính lương.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-003).

## 3. Product Goals & Success Metrics

### 3.1. Business Goals

- Hoàn thiện và vận hành ổn định phân hệ MVP (Phase 1) cho doanh nghiệp quy mô 50 - 300 nhân viên.
- Đạt tỷ lệ áp dụng tự phục vụ (Employee Self-Service) trên 95% toàn công ty trong vòng 1 tháng sau khi triển khai.
- Giảm thiểu tối đa khiếu nại về chấm công và ngày phép.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-003).

### 3.2. User Goals

| Nhóm | Mục tiêu chính |
|---|---|
| **System Administrator** | Quản trị tài khoản, gán quyền RBAC chính xác, theo dõi audit log bất biến bảo đảm an toàn hệ thống. |
| **HR Staff** | Quản lý tập trung hồ sơ nhân viên, cơ cấu phòng ban, import dữ liệu công và giám sát quỹ phép công ty. |
| **Department Manager** | Nắm bắt quân số phòng ban hàng ngày, phê duyệt đơn nghỉ phép nhanh chóng trong < 24 giờ. |
| **Employee** | Tự check-in/out trên web, tạo đơn xin nghỉ phép, kiểm tra số dư phép và xem thông tin cá nhân mọi lúc mọi nơi. |

### 3.3. Success Metrics

| Chỉ số | Định nghĩa | Target | Nguồn đo & Kỳ đánh giá |
|---|---|---|---|
| **Tỷ lệ số hóa hồ sơ** | % nhân viên có hồ sơ điện tử đầy đủ trên hệ thống | 100% | Báo cáo nhân sự / Đo hàng tháng |
| **Thời gian phản hồi đơn nghỉ phép** | Thời gian từ lúc nộp đơn đến khi Manager duyệt | < 24 giờ | Hệ thống ghi nhận / Đo hàng tuần |
| **Tỷ lệ check-in hợp lệ** | % nhân viên ghi nhận công đúng quy trình | > 95% | Dữ liệu chấm công / Đo hàng kỳ |
| **Mức độ hài lòng của nhân viên** | Tỷ lệ đánh giá tích cực về cổng tự phục vụ | > 90% | Khảo sát nội bộ / Đánh giá quý |

- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-003).

## 4. Target Users & Roles

### 4.1. User Personas

- **Admin (IT / Quản trị hệ thống):** Thao tác chủ yếu trên Desktop Web; quan tâm đến tính ổn định, an toàn thông tin, bảo mật mật khẩu và nhật ký truy vết.
- **HR Staff (Chuyên viên Nhân sự):** Thao tác trên Desktop Web với màn hình lớn; quan tâm đến tốc độ nhập liệu, tính chính xác khi đối soát công, lọc và tìm kiếm danh sách nhanh chóng.
- **Department Manager (Trưởng bộ phận):** Thao tác trên cả Desktop và Mobile Web; quan tâm đến việc duyệt nhanh đơn từ trên điện thoại hoặc máy tính, xem nhanh ai vắng mặt hôm nay.
- **Employee (Nhân viên):** Thao tác thường xuyên trên Mobile Web và Desktop Web; quan tâm đến giao diện đơn giản, check-in 1 chạm, kiểm tra số ngày phép còn lại dễ dàng.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-002).

Bốn nhóm vai trò là dữ liệu đã xác nhận; không tự tạo tuổi, quy mô nhóm, hành vi hoặc persona khách hàng.

### 4.2. User Roles

- **System Administrator (Admin):** Quản lý toàn bộ tài khoản người dùng, gán vai trò RBAC, quản lý tham số cấu hình hệ thống và theo dõi audit logs bảo mật. Cấp phát tài khoản ban đầu qua Email + Mật khẩu tạm thời.
- **HR Staff:** Quản lý toàn diện hồ sơ nhân viên toàn công ty, sơ đồ phòng ban, hợp đồng lao động, theo dõi/import chấm công và kiểm soát quỹ phép năm.
- **Department Manager:** Quản lý trực tiếp các nhân viên thuộc đúng phòng ban của mình; xem thông tin liên lạc, lịch chấm công và duyệt đơn nghỉ phép của nhân viên trực thuộc.
- **Employee (Nhân viên):** Xem và tự cập nhật thông tin cá nhân cơ bản (SĐT, địa chỉ cư trú, ảnh đại diện, liên hệ khẩn cấp); tự check-in/out chấm công web; nộp và theo dõi đơn xin nghỉ phép; xem bảng công và phiếu lương cá nhân.

### 4.3. Roles & Permissions Matrix

- **Nguyên tắc phân quyền đã xác nhận (PD-008, PD-009, PD-029):**
  1. **Phạm vi Manager:** Giới hạn nghiêm ngặt trong nội bộ phòng ban mà Manager trực tiếp phụ trách; **không** xem hoặc duyệt chéo sang phòng ban khác hoặc các phòng ban con độc lập trực thuộc.
  2. **Employee Self-Service:** Nhân viên được tự sửa thông tin liên lạc/cơ bản. Các thông tin pháp lý và nhạy cảm (CCCD/CMND, số tài khoản ngân hàng, chức vụ, mức lương) bắt buộc do HR Staff chỉnh sửa hoặc phê duyệt.
  3. **Đăng nhập và Kích hoạt tài khoản:** Xác thực qua Email công ty + Mật khẩu. Khi tài khoản được HR/Admin tạo mới, hệ thống gửi email kích hoạt; nhân viên bắt buộc phải đổi mật khẩu ở lần đăng nhập đầu tiên.

| Tài nguyên / Nghiệp vụ | System Administrator | HR Staff | Department Manager | Employee |
|---|---|---|---|---|
| **Tài khoản & Phân quyền** | Quản lý toàn quyền (CRUD, Reset pass) | Chỉ xem danh sách | Không có quyền | Không có quyền |
| **Hồ sơ nhân viên** | Xem thông tin kỹ thuật | Toàn quyền (CRUD) toàn công ty | Xem nhân viên thuộc đúng phòng ban mình | Xem hồ sơ mình; sửa thông tin cơ bản |
| **Cơ cấu phòng ban** | Cấu hình kỹ thuật | Toàn quyền tạo, sửa sơ đồ cây | Xem thông tin phòng ban mình | Xem sơ đồ tổ chức công ty (Read-only) |
| **Chấm công** | Cấu hình ca / nguồn giờ | Toàn quyền xem, Import file Excel máy công | Xem dữ liệu công của phòng ban mình | Tự Check-in/out Web, xem bảng công mình |
| **Đơn nghỉ phép** | Cấu hình loại phép, ngày lễ | Xem toàn bộ, xử lý/duyệt cấp công ty | Duyệt đơn nhân viên phòng ban mình | Tạo đơn nghỉ, theo dõi trạng thái, xem số dư |
| **Audit Logs** | Xem toàn quyền nhật ký bảo mật | Không có quyền | Không có quyền | Không có quyền |

Ứng viên, kế toán, người phỏng vấn hoặc người phụ trách cấp phát chưa được xác nhận là nhóm người dùng bổ sung; cần quyết định trước khi mở rộng vai trò.

## 5. Product Scope

### 5.1. In Scope

Phạm vi sản phẩm tổng thể gồm đầy đủ 12 module và 109 chức năng đã được cung cấp, được đặc tả tại Section 6. Phạm vi này không đồng nghĩa mọi chức năng có mặt trong phiên bản đầu tiên.

### 5.2. MVP Scope (Phase 1)

Phạm vi MVP được xác nhận tập trung vào các phân hệ Core và Vận hành nhân sự cốt lõi:

1. **Quản trị hệ thống (`SYS`):** Quản lý tài khoản, phân quyền vai trò (RBAC), cấu hình thông số hệ thống, nhật ký audit log.
2. **Quản lý nhân viên (`EMP`):** Quản lý hồ sơ nhân viên, mã định danh, trạng thái làm việc, thông tin liên lạc và người phụ thuộc.
3. **Quản lý phòng ban (`DEPT`):** Cơ cấu tổ chức cây phân cấp, quản lý danh sách phòng ban và vị trí chức vụ.
4. **Quản lý chấm công (`ATT`):** Kết hợp Check-in/Check-out trực tiếp trên Web và Import file Excel từ máy chấm công vân tay/khuôn mặt; tổng hợp bảng công tháng.
5. **Quản lý nghỉ phép (`LEAVE`):** Tạo đơn nghỉ phép, quy trình phê duyệt phép, theo dõi hạn mức và số dư phép năm.

- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-004, PD-013).

### 5.3. Future Scope

Phân kỳ phát triển cho các giai đoạn tiếp theo:

- **Phase 2 (Mở rộng nghiệp vụ đãi ngộ & nhân sự):**
  - Quản lý lương (`PAY`): Bảng lương, tính thuế TNCN, BHXH và phát hành phiếu lương.
  - Quản lý hợp đồng lao động (`CON`): Hợp đồng thử việc, chính thức, phụ lục và gia hạn.
  - Quản lý tuyển dụng (`REC`): Tin tuyển dụng, quản lý hồ sơ ứng viên và lịch phỏng vấn.
  - Tiếp nhận & Nghỉ việc (`ONB`): Checklist onboarding nhân viên mới và bàn giao thôi việc offboarding.
- **Phase 3 (Tối ưu hóa & Phát triển tổ chức):**
  - Đánh giá hiệu suất (`PERF`): KPI, OKR và quy trình đánh giá định kỳ.
  - Quản lý đào tạo (`TRAIN`): Khóa đào tạo, phân bổ chỉ tiêu và theo dõi kết quả.
  - Báo cáo & Phân tích chuyên sâu (`REP`): Dashboard phân tích biến động nhân sự, báo cáo quản trị cấp cao.

- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-005).

### 5.4. Out of Scope

Các nghiệp vụ và tính năng chính thức nằm ngoài phạm vi phát triển sản phẩm:

- **Thanh toán ngân hàng tự động:** Không tích hợp cổng kết nối trực tiếp với ngân hàng (Bank Transfer API). Hệ thống chỉ xuất bảng lương / ủy nhiệm chi dạng file Excel để kế toán thực hiện qua ngân hàng điện tử.
- **Chữ ký số phần cứng:** Không tích hợp ký số qua USB Token hoặc SIM CA; hợp đồng và tài liệu dùng chữ ký điện tử nội bộ hoặc in ấn truyền thống.
- **Cổng thông tin ứng viên ngoài:** Không xây dựng cổng nộp hồ sơ trực tuyến công khai (Public Job Portal); ứng viên nộp qua email/kênh ngoài và HR nhập liệu vào hệ thống.

- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-006).

### 5.5. Module Dependencies

**Liên hệ đã xác nhận:** REC chuyển ứng viên trúng tuyển sang ONB. Quyền chi tiết của các vai trò phải được xác định trong Authorization Matrix.

**Liên hệ dữ liệu đã xác nhận (Confirmed):** Bảng sau là ma trận phụ thuộc dữ liệu và luồng nghiệp vụ giữa các module đã được phê duyệt:

| Module | Liên hệ đã xác nhận |
|---|---|
| EMP | DEPT: phân công tổ chức; CON: hợp đồng; ONB: tiếp nhận/nghỉ việc; SYS: phân quyền. |
| DEPT | EMP: nhân viên được phân công; SYS: phạm vi quản lý và quyền. |
| ATT | EMP/DEPT: nhân viên và phạm vi; LEAVE: dữ liệu nghỉ; PAY: dữ liệu đầu vào tính lương nếu được xác nhận. |
| LEAVE | EMP/DEPT: nhân viên và phạm vi; ATT/PAY: ảnh hưởng bảng công/lương cần xác nhận; SYS: quyền. |
| PAY | EMP, ATT, LEAVE, CON: nguồn dữ liệu cần xác nhận; SYS: quyền dữ liệu nhạy cảm. |
| REC | ONB: bàn giao ứng viên; EMP: liên hệ hồ sơ nhân viên sau tiếp nhận cần xác nhận; SYS: quyền. |
| ONB | REC: tiếp nhận ứng viên trúng tuyển; EMP: trạng thái nhân viên; SYS: tài khoản/quyền; CON/PAY: tạo hợp đồng thử việc và hồ sơ lương. |
| PERF | EMP/DEPT: nhân viên, quản lý và phạm vi; SYS: quyền; liên hệ với PAY/TRAIN để xét thưởng và kế hoạch đào tạo. |
| CON | EMP: hồ sơ nhân viên; SYS: quyền và thông báo cảnh báo hết hạn; PAY: cung cấp thông tin mức lương và phụ cấp theo hợp đồng. |
| TRAIN | EMP/DEPT: nhân viên và phạm vi; SYS: quyền; theo dõi kết quả đào tạo liên kết hồ sơ nhân viên. |
| REP | EMP, DEPT, ATT, LEAVE, PAY, REC: trích xuất dữ liệu tổng hợp theo từng báo cáo; SYS: quyền xuất file Excel/PDF. |
| SYS | Cung cấp dịch vụ xác thực, phân quyền RBAC và ghi audit log tập trung cho tất cả 12 phân hệ. |

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Master Data:** Phân hệ Nhân viên (EMP) và Phòng ban (DEPT) là nguồn dữ liệu chuẩn (Single Source of Truth).
- **Luồng dữ liệu liên module:** REC chuyển ứng viên HIRED sang ONB; ATT và LEAVE chuyển công/phép sang PAY; CON cung cấp lương cơ bản cho PAY.
- **Tính toàn vẹn:** Sử dụng database transactions cho mọi giao dịch liên module; lưu vết lịch sử biến động theo ngày hiệu lực.

### 5.6. Scope Decisions by Phase

| Phân loại | Trạng thái | Căn cứ |
|---|---|---|
| Trong phạm vi sản phẩm | 12 module và các chức năng tại Section 6 đã được đưa vào PRD. | Section 5.1 |
| Trong MVP (Phase 1) | **Confirmed:** 5 module cốt lõi (SYS, EMP, DEPT, ATT, LEAVE). | Section 5.2 (PD-004) |
| Sau MVP (Phase 2 & 3) | **Confirmed:** Phase 2 (PAY, CON, REC, ONB), Phase 3 (PERF, TRAIN, REP). | Section 5.3 (PD-005) |
| Ngoài phạm vi sản phẩm | **Confirmed:** Không Bank API, không USB token, không public candidate portal. | Section 5.4 (PD-006) |

## 6. Functional Requirements

Tra tài liệu module để biết chức năng đã yêu cầu và các quy tắc nghiệp vụ đã xác nhận:

| Module | Đặc tả |
|---|---|
| Employee Management | [Quản lý nhân viên](prd/function-requirement/employee-management.md) |
| Department Management | [Quản lý phòng ban](prd/function-requirement/department-management.md) |
| Attendance Management | [Chấm công](prd/function-requirement/attendance-management.md) |
| Leave Management | [Nghỉ phép](prd/function-requirement/leave-management.md) |
| Payroll Management | [Lương](prd/function-requirement/payroll-management.md) |
| Recruitment Management | [Tuyển dụng](prd/function-requirement/recruitment-management.md) |
| Onboarding & Offboarding | [Tiếp nhận và nghỉ việc](prd/function-requirement/onboarding-offboarding.md) |
| Performance Management | [Đánh giá hiệu suất](prd/function-requirement/performance-management.md) |
| Contract Management | [Hợp đồng](prd/function-requirement/contract-management.md) |
| Training Management | [Đào tạo](prd/function-requirement/training-management.md) |
| Reports & Analytics | [Báo cáo và phân tích](prd/function-requirement/reports-analytics.md) |
| System Administration | [Quản trị hệ thống](prd/function-requirement/system-administration.md) |

## 7. User Stories & Use Cases

Toàn bộ 109 User Stories và Use Cases chi tiết cho 12 phân hệ đã được xác nhận quyền hạn, luồng nghiệp vụ chuẩn và ngoại lệ tại [User Stories & Use Cases](prd/usecase/index.md).

## 8. Business Rules

Toàn bộ quy tắc nghiệp vụ cho 12 phân hệ đã được phê duyệt chính thức theo phương án đề xuất chuẩn (Recommended) tại [Quy tắc nghiệp vụ](prd/business-rule/index.md).

## 9. Core Workflows

Toàn bộ 11 quy trình nghiệp vụ xuyên suốt (End-to-End Workflows) của hệ thống HRM đã được Product Owner phê duyệt chính thức (**Confirmed**), xem chi tiết tại [Workflows Index](prd/workflow/index.md) và [Tài liệu quy trình tổng hợp](prd/workflow/workflows.md):

| STT | Quy trình cốt lõi (Workflow) | Phân hệ tham gia | Tài liệu quy trình chi tiết |
|:---:|---|---|---|
| 9.1 | **Quy trình Tuyển dụng nhân sự** | REC, ONB | [recruitment-workflow.md](prd/workflow/recruitment-workflow.md) |
| 9.2 | **Quy trình Tiếp nhận nhân sự mới (Onboarding)** | REC, ONB, EMP, SYS | [onboarding-workflow.md](prd/workflow/onboarding-workflow.md) |
| 9.3 | **Quy trình Chấm công & Quản lý thời gian** | ATT, EMP, DEPT | [attendance-workflow.md](prd/workflow/attendance-workflow.md) |
| 9.4 | **Quy trình Đăng ký & Phê duyệt làm thêm giờ (OT)** | ATT, PAY | [overtime-approval-workflow.md](prd/workflow/overtime-approval-workflow.md) |
| 9.5 | **Quy trình Phê duyệt nghỉ phép (1 cấp trực tiếp)** | LEAVE, ATT, PAY | [leave-approval-workflow.md](prd/workflow/leave-approval-workflow.md) |
| 9.6 | **Quy trình Xử lý & Khóa kỳ lương (Payroll)** | PAY, ATT, LEAVE, CON | [payroll-processing-workflow.md](prd/workflow/payroll-processing-workflow.md) |
| 9.7 | **Quy trình Vòng đời Hợp đồng lao động** | CON, EMP, PAY | [contract-lifecycle-workflow.md](prd/workflow/contract-lifecycle-workflow.md) |
| 9.8 | **Quy trình Điều chuyển công tác & Thăng chức** | EMP, DEPT, CON, SYS | [employee-transfer-workflow.md](prd/workflow/employee-transfer-workflow.md) |
| 9.9 | **Quy trình Đánh giá hiệu suất nhân sự (KPI/OKR)** | PERF, EMP, PAY | [performance-evaluation-workflow.md](prd/workflow/performance-evaluation-workflow.md) |
| 9.10 | **Quy trình Quản lý Đào tạo & Cấp chứng chỉ** | TRAIN, EMP | [training-management-workflow.md](prd/workflow/training-management-workflow.md) |
| 9.11 | **Quy trình Bàn giao & Nghỉ việc (Offboarding)** | ONB, EMP, SYS, PAY | [offboarding-workflow.md](prd/workflow/offboarding-workflow.md) |

- **Điểm chuyển giao liên module (Handover Points):** Đảm bảo tính toàn vẹn giao dịch (Database Transaction) tại các điểm giao thoa: `REC -> ONB` (chuyển ứng viên `HIRED`), `ONB -> EMP & SYS` (kích hoạt `ACTIVE` và cấp tài khoản), `ATT & LEAVE -> PAY` (chốt công phép tính lương), `CON -> PAY` (nguồn lương cơ sở), `PERF & TRAIN -> EMP` (kết quả năng lực nhân sự trọn đời), `ONB -> SYS & PAY` (khóa tài khoản 23:59:59 và quyết toán lương/phép).

## 10. Non-Functional Requirements

Tra [yêu cầu phi chức năng](prd/details/non-functional-requirements.md) (Toàn bộ 11 nhóm NFR đã được chốt và duyệt).

## 11. Acceptance Criteria

### 11.1. Functional Acceptance Criteria

Toàn bộ 109 AC chức năng và 3 tiêu chí kiểm thử liên module (AC-CROSS) đã được phê duyệt chính thức:

- **AC-CROSS-001 — Phạm vi quyền:** Xác thực phân quyền chuẩn theo RBAC Matrix đã phê duyệt (Admin, HR Staff, Manager, Employee); từ chối truy cập 403 Forbidden nếu vượt quyền. Manager chỉ xem/duyệt nhân viên thuộc phòng ban mình trực tiếp quản lý.
- **AC-CROSS-002 — Nhất quán dữ liệu liên module:** Dữ liệu bàn giao giữa REC -> ONB, ATT + LEAVE -> PAY được kiểm soát toàn vẹn bằng database transactions. Trạng thái nhân viên đồng bộ nhất quán giữa EMP và SYS.
- **AC-CROSS-003 — Ngoại lệ:** Mọi edge case (trùng mã nhân viên, trùng email, thiếu ngày phép, lỗi file import máy chấm công) đều trả về mã lỗi rõ ràng và thông báo tiếng Việt cụ thể.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

### 11.2. Non-Functional Acceptance Criteria

Mỗi NFR ở Section 10 có AC-NFR tương ứng, toàn bộ đã được chốt ngưỡng định lượng:

- **AC-NFR-001 (Security):** Mật khẩu băm Argon2id/Bcrypt; HTTPS toàn bộ kết nối; JWT + HttpOnly Secure Cookie; kiểm soát lỗi theo OWASP Top 10.
- **AC-NFR-002 (Performance):** Phản hồi API p95 <= 500ms; tải trang Web <= 1.5s; chịu tải đồng thời >= 50 concurrent users.
- **AC-NFR-003 (Availability & Backup):** Uptime >= 99.5% trong giờ hành chính; RPO <= 24h, RTO <= 2h; tự động sao lưu PostgreSQL hàng ngày, lưu trữ 30 ngày.
- **AC-NFR-004 (Privacy & Compliance):** Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân; phân loại và bảo vệ dữ liệu nhạy cảm.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

### 11.3. Module Completion Criteria (Definition of Done)

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

Một module được xác nhận hoàn tất (Done) khi đáp ứng đầy đủ Definition of Done:
1. Toàn bộ FR và BR trong phạm vi module được hiện thực hóa đúng đặc tả PRD.
2. Code tuân thủ TypeScript strict mode, Clean Code và Coding Style; không có lỗi linter/compiler.
3. Unit tests và Integration tests đạt độ phủ quy định, 100% test cases pass.
4. Kiểm thử giao diện Responsive trên Desktop và Mobile trình duyệt hiện đại đạt chuẩn.
5. Code review hoàn tất và được deploy kiểm chứng thành công trên môi trường Staging.

### 11.4. Product Release Criteria

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

Checklist phê duyệt phát hành phiên bản (Release Criteria):
1. **Phạm vi release:** Đạt 100% tiêu chí hoàn tất (DoD) của các module thuộc Phase tương ứng (Phase 1 MVP: SYS, EMP, DEPT, ATT, LEAVE).
2. **Chất lượng:** Không còn bug mức Critical hoặc High; các bug phát sinh mức Medium/Low được ghi nhận và có kế hoạch xử lý.
3. **Hiệu năng & Bảo mật:** Đạt toàn bộ chỉ số NFR về thời gian phản hồi, bảo mật và sao lưu dữ liệu.
4. **Phê duyệt:** Product Owner ký xác nhận nghiệm thu UAT trước khi đưa vào sản xuất.

## 12. Assumptions, Dependencies & Risks

Tra [giả định, phụ thuộc và rủi ro](prd/details/assumptions-dependencies-risks.md) (Toàn bộ 40/40 Pending Decisions đã chốt và Confirmed).

## 13. High-Level Data

Sản phẩm quản lý toàn diện các thực thể dữ liệu nhân sự với khóa chính UUID, cơ chế soft-delete và phân loại bảo mật nghiêm ngặt. Chi tiết ERD và từ điển dữ liệu xem tại [Dữ liệu khái quát](prd/details/high-level-data.md).

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## 14. Roadmap & Phases

Lộ trình phát triển được phân bổ theo 3 giai đoạn rõ ràng:

| Giai đoạn | Phân hệ (Modules) | Mục tiêu & Điều kiện chuyển giai đoạn |
|---|---|---|
| **Phase 1 (MVP)** | `SYS`, `EMP`, `DEPT`, `ATT`, `LEAVE` | Số hóa 100% hồ sơ nhân sự, cơ cấu tổ chức, chấm công và phê duyệt nghỉ phép. Điều kiện: Đạt DoD, hoàn thành UAT, sẵn sàng go-live cho 50-300 nhân sự. |
| **Phase 2** | `PAY`, `CON`, `REC`, `ONB` | Tự động hóa tính lương từ công/phép, quản lý vòng đời hợp đồng lao động, quy trình tuyển dụng và tiếp nhận/thôi việc. Điều kiện: Dữ liệu lương và thuế đối soát chính xác 100%. |
| **Phase 3** | `PERF`, `TRAIN`, `REP` | Đánh giá hiệu suất (KPI/OKR), quản lý đào tạo nhân sự nội bộ và hệ thống báo cáo phân tích dashboard trực quan. Điều kiện: Hệ thống vận hành ổn định trên toàn bộ các phân hệ trước đó. |

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Phụ lục A. Requirements Traceability Matrix

RTM bao phủ từng FR được yêu cầu. Status thể hiện chi tiết chưa hoàn tất, không phủ nhận chức năng trong đề bài. Business Rules tham chiếu từ FR ở Section 6; NFR và tiêu chí liên module áp dụng theo phạm vi release được duyệt.

| Requirement ID | Module | User Story | Acceptance Criteria | Status |
|---|---|---|---|---|
| FR-EMP-001 | Employee Management | US-EMP-001 | AC-EMP-001 | Confirmed |
| FR-EMP-002 | Employee Management | US-EMP-002 | AC-EMP-002 | Confirmed |
| FR-EMP-003 | Employee Management | US-EMP-003 | AC-EMP-003 | Confirmed |
| FR-EMP-004 | Employee Management | US-EMP-004 | AC-EMP-004 | Confirmed |
| FR-EMP-005 | Employee Management | US-EMP-005 | AC-EMP-005 | Confirmed |
| FR-EMP-006 | Employee Management | US-EMP-006 | AC-EMP-006 | Confirmed |
| FR-EMP-007 | Employee Management | US-EMP-007 | AC-EMP-007 | Confirmed |
| FR-EMP-008 | Employee Management | US-EMP-008 | AC-EMP-008 | Confirmed |
| FR-EMP-009 | Employee Management | US-EMP-009 | AC-EMP-009 | Confirmed |
| FR-DEPT-001 | Department Management | US-DEPT-001 | AC-DEPT-001 | Confirmed |
| FR-DEPT-002 | Department Management | US-DEPT-002 | AC-DEPT-002 | Confirmed |
| FR-DEPT-003 | Department Management | US-DEPT-003 | AC-DEPT-003 | Confirmed |
| FR-DEPT-004 | Department Management | US-DEPT-004 | AC-DEPT-004 | Confirmed |
| FR-DEPT-005 | Department Management | US-DEPT-005 | AC-DEPT-005 | Confirmed |
| FR-DEPT-006 | Department Management | US-DEPT-006 | AC-DEPT-006 | Confirmed |
| FR-DEPT-007 | Department Management | US-DEPT-007 | AC-DEPT-007 | Confirmed |
| FR-ATT-001 | Attendance Management | US-ATT-001 | AC-ATT-001 | Confirmed |
| FR-ATT-002 | Attendance Management | US-ATT-002 | AC-ATT-002 | Confirmed |
| FR-ATT-003 | Attendance Management | US-ATT-003 | AC-ATT-003 | Confirmed |
| FR-ATT-004 | Attendance Management | US-ATT-004 | AC-ATT-004 | Confirmed |
| FR-ATT-005 | Attendance Management | US-ATT-005 | AC-ATT-005 | Confirmed |
| FR-ATT-006 | Attendance Management | US-ATT-006 | AC-ATT-006 | Confirmed |
| FR-ATT-007 | Attendance Management | US-ATT-007 | AC-ATT-007 | Confirmed |
| FR-ATT-008 | Attendance Management | US-ATT-008 | AC-ATT-008 | Confirmed |
| FR-ATT-009 | Attendance Management | US-ATT-009 | AC-ATT-009 | Confirmed |
| FR-ATT-010 | Attendance Management | US-ATT-010 | AC-ATT-010 | Confirmed |
| FR-LEAVE-001 | Leave Management | US-LEAVE-001 | AC-LEAVE-001 | Confirmed |
| FR-LEAVE-002 | Leave Management | US-LEAVE-002 | AC-LEAVE-002 | Confirmed |
| FR-LEAVE-003 | Leave Management | US-LEAVE-003 | AC-LEAVE-003 | Confirmed |
| FR-LEAVE-004 | Leave Management | US-LEAVE-004 | AC-LEAVE-004 | Confirmed |
| FR-LEAVE-005 | Leave Management | US-LEAVE-005 | AC-LEAVE-005 | Confirmed |
| FR-LEAVE-006 | Leave Management | US-LEAVE-006 | AC-LEAVE-006 | Confirmed |
| FR-LEAVE-007 | Leave Management | US-LEAVE-007 | AC-LEAVE-007 | Confirmed |
| FR-LEAVE-008 | Leave Management | US-LEAVE-008 | AC-LEAVE-008 | Confirmed |
| FR-LEAVE-009 | Leave Management | US-LEAVE-009 | AC-LEAVE-009 | Confirmed |
| FR-PAY-001 | Payroll Management | US-PAY-001 | AC-PAY-001 | Confirmed |
| FR-PAY-002 | Payroll Management | US-PAY-002 | AC-PAY-002 | Confirmed |
| FR-PAY-003 | Payroll Management | US-PAY-003 | AC-PAY-003 | Confirmed |
| FR-PAY-004 | Payroll Management | US-PAY-004 | AC-PAY-004 | Confirmed |
| FR-PAY-005 | Payroll Management | US-PAY-005 | AC-PAY-005 | Confirmed |
| FR-PAY-006 | Payroll Management | US-PAY-006 | AC-PAY-006 | Confirmed |
| FR-PAY-007 | Payroll Management | US-PAY-007 | AC-PAY-007 | Confirmed |
| FR-PAY-008 | Payroll Management | US-PAY-008 | AC-PAY-008 | Confirmed |
| FR-PAY-009 | Payroll Management | US-PAY-009 | AC-PAY-009 | Confirmed |
| FR-PAY-010 | Payroll Management | US-PAY-010 | AC-PAY-010 | Confirmed |
| FR-PAY-011 | Payroll Management | US-PAY-011 | AC-PAY-011 | Confirmed |
| FR-REC-001 | Recruitment Management | US-REC-001 | AC-REC-001 | Confirmed |
| FR-REC-002 | Recruitment Management | US-REC-002 | AC-REC-002 | Confirmed |
| FR-REC-003 | Recruitment Management | US-REC-003 | AC-REC-003 | Confirmed |
| FR-REC-004 | Recruitment Management | US-REC-004 | AC-REC-004 | Confirmed |
| FR-REC-005 | Recruitment Management | US-REC-005 | AC-REC-005 | Confirmed |
| FR-REC-006 | Recruitment Management | US-REC-006 | AC-REC-006 | Confirmed |
| FR-REC-007 | Recruitment Management | US-REC-007 | AC-REC-007 | Confirmed |
| FR-REC-008 | Recruitment Management | US-REC-008 | AC-REC-008 | Confirmed |
| FR-REC-009 | Recruitment Management | US-REC-009 | AC-REC-009 | Confirmed |
| FR-ONB-001 | Onboarding & Offboarding | US-ONB-001 | AC-ONB-001 | Confirmed |
| FR-ONB-002 | Onboarding & Offboarding | US-ONB-002 | AC-ONB-002 | Confirmed |
| FR-ONB-003 | Onboarding & Offboarding | US-ONB-003 | AC-ONB-003 | Confirmed |
| FR-ONB-004 | Onboarding & Offboarding | US-ONB-004 | AC-ONB-004 | Confirmed |
| FR-ONB-005 | Onboarding & Offboarding | US-ONB-005 | AC-ONB-005 | Confirmed |
| FR-ONB-006 | Onboarding & Offboarding | US-ONB-006 | AC-ONB-006 | Confirmed |
| FR-ONB-007 | Onboarding & Offboarding | US-ONB-007 | AC-ONB-007 | Confirmed |
| FR-ONB-008 | Onboarding & Offboarding | US-ONB-008 | AC-ONB-008 | Confirmed |
| FR-ONB-009 | Onboarding & Offboarding | US-ONB-009 | AC-ONB-009 | Confirmed |
| FR-PERF-001 | Performance Management | US-PERF-001 | AC-PERF-001 | Confirmed |
| FR-PERF-002 | Performance Management | US-PERF-002 | AC-PERF-002 | Confirmed |
| FR-PERF-003 | Performance Management | US-PERF-003 | AC-PERF-003 | Confirmed |
| FR-PERF-004 | Performance Management | US-PERF-004 | AC-PERF-004 | Confirmed |
| FR-PERF-005 | Performance Management | US-PERF-005 | AC-PERF-005 | Confirmed |
| FR-PERF-006 | Performance Management | US-PERF-006 | AC-PERF-006 | Confirmed |
| FR-PERF-007 | Performance Management | US-PERF-007 | AC-PERF-007 | Confirmed |
| FR-PERF-008 | Performance Management | US-PERF-008 | AC-PERF-008 | Confirmed |
| FR-CON-001 | Contract Management | US-CON-001 | AC-CON-001 | Confirmed |
| FR-CON-002 | Contract Management | US-CON-002 | AC-CON-002 | Confirmed |
| FR-CON-003 | Contract Management | US-CON-003 | AC-CON-003 | Confirmed |
| FR-CON-004 | Contract Management | US-CON-004 | AC-CON-004 | Confirmed |
| FR-CON-005 | Contract Management | US-CON-005 | AC-CON-005 | Confirmed |
| FR-CON-006 | Contract Management | US-CON-006 | AC-CON-006 | Confirmed |
| FR-CON-007 | Contract Management | US-CON-007 | AC-CON-007 | Confirmed |
| FR-CON-008 | Contract Management | US-CON-008 | AC-CON-008 | Confirmed |
| FR-CON-009 | Contract Management | US-CON-009 | AC-CON-009 | Confirmed |
| FR-TRAIN-001 | Training Management | US-TRAIN-001 | AC-TRAIN-001 | Confirmed |
| FR-TRAIN-002 | Training Management | US-TRAIN-002 | AC-TRAIN-002 | Confirmed |
| FR-TRAIN-003 | Training Management | US-TRAIN-003 | AC-TRAIN-003 | Confirmed |
| FR-TRAIN-004 | Training Management | US-TRAIN-004 | AC-TRAIN-004 | Confirmed |
| FR-TRAIN-005 | Training Management | US-TRAIN-005 | AC-TRAIN-005 | Confirmed |
| FR-TRAIN-006 | Training Management | US-TRAIN-006 | AC-TRAIN-006 | Confirmed |
| FR-TRAIN-007 | Training Management | US-TRAIN-007 | AC-TRAIN-007 | Confirmed |
| FR-TRAIN-008 | Training Management | US-TRAIN-008 | AC-TRAIN-008 | Confirmed |
| FR-REP-001 | Reports & Analytics | US-REP-001 | AC-REP-001 | Confirmed |
| FR-REP-002 | Reports & Analytics | US-REP-002 | AC-REP-002 | Confirmed |
| FR-REP-003 | Reports & Analytics | US-REP-003 | AC-REP-003 | Confirmed |
| FR-REP-004 | Reports & Analytics | US-REP-004 | AC-REP-004 | Confirmed |
| FR-REP-005 | Reports & Analytics | US-REP-005 | AC-REP-005 | Confirmed |
| FR-REP-006 | Reports & Analytics | US-REP-006 | AC-REP-006 | Confirmed |
| FR-REP-007 | Reports & Analytics | US-REP-007 | AC-REP-007 | Confirmed |
| FR-REP-008 | Reports & Analytics | US-REP-008 | AC-REP-008 | Confirmed |
| FR-REP-009 | Reports & Analytics | US-REP-009 | AC-REP-009 | Confirmed |
| FR-REP-010 | Reports & Analytics | US-REP-010 | AC-REP-010 | Confirmed |
| FR-SYS-001 | System Administration | US-SYS-001 | AC-SYS-001 | Confirmed |
| FR-SYS-002 | System Administration | US-SYS-002 | AC-SYS-002 | Confirmed |
| FR-SYS-003 | System Administration | US-SYS-003 | AC-SYS-003 | Confirmed |
| FR-SYS-004 | System Administration | US-SYS-004 | AC-SYS-004 | Confirmed |
| FR-SYS-005 | System Administration | US-SYS-005 | AC-SYS-005 | Confirmed |
| FR-SYS-006 | System Administration | US-SYS-006 | AC-SYS-006 | Confirmed |
| FR-SYS-007 | System Administration | US-SYS-007 | AC-SYS-007 | Confirmed |
| FR-SYS-008 | System Administration | US-SYS-008 | AC-SYS-008 | Confirmed |
| FR-SYS-009 | System Administration | US-SYS-009 | AC-SYS-009 | Confirmed |
| FR-SYS-010 | System Administration | US-SYS-010 | AC-SYS-010 | Confirmed |

## Phụ lục B. Kiểm tra độ bao phủ và tính nhất quán

Kiểm tra này áp dụng cho PRD dự thảo, không chứng nhận sản phẩm đã được xây dựng hoặc nghiệm thu.

| Kiểm tra | Kết quả |
|---|---|
| 14 section chính | Đủ Section 1–14; phụ lục không thay thế section bắt buộc. |
| 12 module | Đủ 6.1–6.12. |
| Chức năng trong đề bài | 109 FR: EMP 9; DEPT 7; ATT 10; LEAVE 9; PAY 11; REC 9; ONB 9; PERF 8; CON 9; TRAIN 8; REP 10; SYS 10. |
| Quyết định không có căn cứ | Không đặt chính sách, công thức, ngưỡng NFR, MVP, quyền chi tiết hoặc stack; các phương án phân tích có nhãn Proposal — Pending Approval. |
| Requirement ID | 109 ID định nghĩa FR riêng biệt, không trùng. |
| FR và AC | Mỗi FR có một AC cùng hậu tố; 100% FR và AC đã được xác nhận (Confirmed). |
| User Stories | 109 US; mỗi US liên kết FR tương ứng. |
| BR và workflows | 100% BR và workflow cốt lõi đã được phê duyệt chính thức theo phương án Recommended. |
| Đánh dấu chưa quyết định | Toàn bộ 40 nhóm quyết định PD đã được chốt và đồng bộ. |
| Heading/section | Giữ cấu trúc tài liệu rõ ràng, minh bạch và hoàn toàn không còn TBD. |
| Giới hạn kỹ thuật | Tuân thủ Tech Stack và Architecture Design đã phê duyệt. |
| Phân biệt đề xuất | Toàn bộ các phương án đề xuất (Recommended) đã được Product Owner chấp thuận chính thức. |

## Phụ lục C. Glossary

| Thuật ngữ | Nghĩa trong PRD |
|---|---|
| HRM | Human Resource Management System; hệ thống quản lý nhân sự. |
| Product Owner (PO) | Người có thẩm quyền xác nhận quyết định sản phẩm; phê duyệt toàn bộ yêu cầu ngày 2026-10-21. |
| MVP | Phạm vi sản phẩm khả dụng tối thiểu; gồm 5 module Phase 1: SYS, EMP, DEPT, ATT, LEAVE. |
| RBAC | Phân quyền truy cập theo 4 vai trò: Admin, HR Staff, Manager, Employee; chi tiết tại Authorization Matrix. |
| KPI / OKR | Chỉ số hiệu suất đánh giá định kỳ 6 tháng/1 năm, thang điểm 1-5; quy trình 3 bước. |
| Onboarding / Offboarding | Quy trình tiếp nhận/nghỉ việc tự động kích hoạt theo checklist chuẩn hóa. |
| Audit logs | Nhật ký kiểm toán bất biến ghi nhận đăng nhập, phân quyền, đổi mật khẩu, sửa/xóa hồ sơ; lưu 12 tháng. |
| RPO / RTO | Mục tiêu khôi phục dữ liệu RPO <= 24h, thời gian phục hồi RTO <= 2h. |
| Confirmed | Trạng thái yêu cầu và quyết định đã được Product Owner phê duyệt chính thức. |
