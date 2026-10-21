# Business Rules — Recruitment Management

- **Module ID:** REC
- **Parent Spec:** docs/PRD.md#8.5
- **Traces-To:** docs/prd/function-requirement/recruitment-management.md
- **Use Cases:** docs/prd/usecase/recruitment-management.md
- **Core Workflow:** docs/prd/workflow/recruitment-workflow.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-REC-001: Trạng thái và điều kiện các vòng tuyển dụng

- **Nội dung quy tắc:**
  - Vòng đời ứng viên: `New` $\rightarrow$ `Screening` $\rightarrow$ `Interviewing` (Vòng 1, Vòng 2...) $\rightarrow$ `Offered` $\rightarrow$ `Hired` / `Rejected`.
  - Một ứng viên chỉ được chuyển sang vòng phỏng vấn tiếp theo khi có tối thiểu một đánh giá đạt yêu cầu (`Pass`) từ người phỏng vấn của vòng trước.
  - Cho phép một ứng viên nộp hồ sơ vào nhiều vị trí tuyển dụng khác nhau, nhưng hệ thống phải gắn cờ nhận diện hồ sơ trùng lặp qua Email/SĐT.
- **Hành vi khi vi phạm:** Báo lỗi `CANDIDATE_NOT_ELIGIBLE_FOR_NEXT_ROUND`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-020`).
- **Quy tắc đã chốt:** Hồ sơ ứng viên bị từ chối được lưu trữ tối đa 12 tháng trong Talent Pool để tái liên hệ khi có vị trí phù hợp; sau 12 tháng tự động chuyển sang lưu trữ ẩn tuân thủ quy định bảo vệ dữ liệu cá nhân.
- Ứng viên bị từ chối do gian lận hồ sơ không nằm trong danh sách tái liên hệ; vẫn giữ lịch sử theo chính sách dữ liệu đã duyệt.

### BR-REC-002: Quản lý Offer và chuyển giao Onboarding

- **Nội dung quy tắc:**
  - Thư mời nhận việc (Offer Letter) bắt buộc phải qua phê duyệt của HR Manager hoặc Ban Giám Đốc trước khi gửi ứng viên.
  - Khi ứng viên xác nhận đồng ý nhận việc (`Offer Accepted`), ứng viên được đánh dấu là `Hired` (Trúng tuyển).
  - Khi ứng viên từ chối, trạng thái ứng viên là `Rejected`, trạng thái offer là `OFFER_DECLINED` và lưu lý do.
  - **Liên hệ đã xác nhận:** Hệ thống tự động tạo hồ sơ tiếp nhận trong phân hệ Onboarding (`ONB`) từ dữ liệu ứng viên trúng tuyển (`FR-REC-009`).
- **Hành vi khi vi phạm:** Ngăn chặn chuyển sang Onboarding nếu ứng viên chưa chấp thuận Offer chính thức.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-020`).
- **Quy tắc đã chốt:** HR Manager hoặc Ban Giám Đốc có quyền hủy thư mời nhận việc (Revoke Offer) trước khi ứng viên phản hồi hoặc khi phát hiện gian lận bằng cấp/hồ sơ; hệ thống ghi log lý do, đặt trạng thái offer là `OFFER_REVOKED` và trạng thái ứng viên là `Rejected`.
- Nếu đã tạo hồ sơ Onboarding từ ứng viên `Hired`, hủy quy trình Onboarding chưa hoàn tất, ghi lý do và giữ lịch sử.

### BR-REC-AUTH-001: Phân quyền dữ liệu tuyển dụng

- **Interviewer:** Chỉ được xem hồ sơ ứng viên và điền phiếu đánh giá cho các ứng viên được phân công phỏng vấn.
- **HR Staff:** Quản lý toàn bộ vị trí, hồ sơ và gửi offer.
