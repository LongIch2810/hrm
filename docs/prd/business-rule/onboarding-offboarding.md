# Business Rules — Onboarding & Offboarding

- **Module ID:** ONB
- **Parent Spec:** docs/PRD.md#8
- **Traces-To:** docs/prd/function-requirement/onboarding-offboarding.md
- **Use Cases:** docs/prd/usecase/onboarding-offboarding.md
- **Core Workflows:** docs/prd/workflow/onboarding-workflow.md, docs/prd/workflow/offboarding-workflow.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-ONB-001: Quy trình tiếp nhận và Onboarding Checklist

- **Nội dung quy tắc:**
  - Quy trình Onboarding được kích hoạt tự động khi ứng viên trúng tuyển từ module Tuyển dụng (`REC`).
  - Checklist Onboarding gồm 3 nhóm bắt buộc: Hồ sơ pháp lý (HR), Cấp phát công cụ làm việc (IT), và Đào tạo hội nhập (Phòng ban).
  - Trạng thái hồ sơ nhân sự chỉ được chuyển từ `Onboarding` sang `Active` khi tỷ lệ hoàn thành checklist đạt 100%.
  - Phải có người chịu trách nhiệm cụ thể gắn với từng đầu việc trong checklist.
- **Hành vi khi vi phạm:** Báo lỗi `ONBOARDING_INCOMPLETE` nếu cố tình kích hoạt tài khoản chính thức trước hạn.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-021`).
- **Quy tắc đã chốt:** Thủ tục đánh giá thử việc được hệ thống tự động thông báo trước 07 ngày làm việc so với ngày hết hạn thử việc; kết quả đánh giá (Đạt/Không đạt) bắt buộc chốt trước ngày kết thúc hợp đồng thử việc.

### BR-ONB-002: Quy trình thôi việc, bàn giao và thu hồi tài sản (Offboarding)

- **Nội dung quy tắc:**
  - Quy trình Offboarding chỉ được khởi tạo khi có Đơn xin thôi việc đã được Ban Giám Đốc ký duyệt hoặc có Quyết định chấm dứt HĐLĐ.
  - Phải chốt Ngày làm việc cuối cùng (Last Working Day) làm căn cứ khóa tài khoản và tính trợ cấp.
  - **Thu hồi quyền truy cập:** Hệ thống tự động vô hiệu hóa tài khoản người dùng vào lúc 23:59:59 của ngày làm việc cuối cùng.
  - Không được phép đóng quy trình Offboarding nếu biên bản bàn giao tài sản hoặc biên bản bàn giao mã nguồn/tài liệu chưa được ký xác nhận đầy đủ.
- **Hành vi khi vi phạm:** Báo lỗi `OFFBOARDING_TASKS_PENDING`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-022`).
- **Quy tắc đã chốt:** Trường hợp mất mát hoặc hư hỏng tài sản công ty, Hành chính lập biên bản khấu trừ theo giá trị còn lại; số tiền đền bù được đối trừ vào bảng quyết toán lương tháng cuối sau khi có chữ ký cam kết của nhân viên.

### BR-ONB-AUTH-001: Phân quyền điều phối tiếp nhận và nghỉ việc

- **Department Manager:** Ký xác nhận bàn giao công việc của nhân viên trong phòng ban mình.
- **IT Admin:** Xác nhận thu hồi thiết bị và ngắt quyền truy cập hệ thống.
- **HR Staff:** Quyết toán hồ sơ và lưu trữ dữ liệu.
