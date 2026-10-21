# Business Rules — Training Management

- **Module ID:** TRAIN
- **Parent Spec:** docs/PRD.md#8
- **Traces-To:** docs/prd/function-requirement/training-management.md
- **Use Cases:** docs/prd/usecase/training-management.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-TRAIN-001: Quản lý khóa học, lịch đào tạo và phân công học viên

- **Nội dung quy tắc:**
  - Khóa đào tạo bắt buộc gồm: Tên khóa, Chương trình trực thuộc, Thời lượng, Giảng viên và Số lượng học viên tối đa.
  - Phân loại khóa học: Bắt buộc (Compliance/Onboarding) hoặc Tự chọn (Nâng cao kỹ năng).
  - Nhân viên được phân công khóa bắt buộc không được tự ý từ chối nếu không có sự phê duyệt của Trưởng phòng.
  - Lịch học không được trùng lặp với các khóa đào tạo bắt buộc khác của cùng một nhân viên.
- **Hành vi khi vi phạm:** Báo lỗi `TRAINING_SCHEDULE_CONFLICT` hoặc `MAX_CAPACITY_EXCEEDED`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-026`).
- **Quy tắc đã chốt:** Đối với khóa học có chi phí được công ty đài thọ có kèm cam kết làm việc, nếu nhân viên nghỉ việc trước hạn cam kết, nhân viên phải bồi hoàn chi phí theo tỷ lệ thời gian chưa hoàn thành cam kết quy định trong Hợp đồng đào tạo.

### BR-TRAIN-002: Tiêu chí hoàn thành, cấp chứng chỉ và lưu trữ lịch sử

- **Nội dung quy tắc:**
  - Tiêu chí Đạt (Pass) khóa học: Tỷ lệ điểm danh tham gia $\ge 80\%$ và điểm kiểm tra cuối khóa $\ge 6.0/10$.
  - Chứng chỉ điện tử được cấp phát có mã số duy nhất và thời hạn hiệu lực (nếu là chứng chỉ định kỳ như an toàn lao động).
  - Khi hoàn thành khóa học, kết quả tự động đồng bộ vào Lịch sử đào tạo của hồ sơ nhân viên trong module `EMP`.
- **Hành vi khi vi phạm:** Không cấp chứng chỉ cho học viên có kết quả không đạt.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-026`).
- **Quy tắc đã chốt:** Quản lý khóa học, học viên và điểm số trực tiếp trên hệ thống; không tích hợp nền tảng LMS E-learning bên thứ ba ngoài phạm vi.

### BR-AUTH-001: Phân quyền quản trị đào tạo

- **Employee:** Xem danh sách khóa học được phân công, tài liệu bài học và chứng chỉ cá nhân.
- **Trainer / HR Staff:** Điểm danh, nhập điểm số, nhận xét và cấp phát chứng chỉ.
