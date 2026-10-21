# 6.10. Training Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý chương trình đào tạo, danh mục khóa học nội bộ/bên ngoài, lập lịch đào tạo, phân công học viên, theo dõi tiến độ, kết quả học tập và cấp chứng chỉ đào tạo nhân sự.

## Objectives

- Chuẩn hóa hoạt động nâng cao năng lực và phát triển chuyên môn cho cán bộ nhân viên.
- Lưu trữ minh chứng đào tạo và chứng chỉ gắn liền với hồ sơ nhân sự trọn đời.

## Actors

- **HR Staff / Trainer (Giảng viên):** Tạo chương trình, khóa học, lập lịch, điểm danh học viên, nhập điểm và cấp phát chứng chỉ.
- **Department Manager:** Đề xuất nhân viên tham gia đào tạo nâng cao kỹ năng hoặc phê duyệt đăng ký khóa học.
- **Employee:** Xem danh sách khóa học được phân công, tải tài liệu bài giảng, xem kết quả và chứng chỉ cá nhân.

## Feature List

- FR-TRAIN-001: Quản lý chương trình đào tạo.
- FR-TRAIN-002: Quản lý khóa đào tạo.
- FR-TRAIN-003: Lập lịch đào tạo.
- FR-TRAIN-004: Phân công nhân viên tham gia.
- FR-TRAIN-005: Theo dõi tiến độ đào tạo.
- FR-TRAIN-006: Theo dõi kết quả học tập.
- FR-TRAIN-007: Quản lý chứng chỉ.
- FR-TRAIN-008: Quản lý lịch sử đào tạo.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-TRAIN-001 | Hệ thống phải hỗ trợ quản lý chương trình đào tạo. | HR Staff | Tên chương trình, lộ trình đào tạo, mục tiêu | Chương trình đào tạo được thiết lập và quản lý. | BR-TRAIN-001; BR-TRAIN-AUTH-001 | AC-TRAIN-001 | Confirmed | Could Have |
| FR-TRAIN-002 | Hệ thống phải hỗ trợ quản lý khóa đào tạo. | HR Staff | Tên khóa, thời lượng, giảng viên, sức chứa tối đa | Khóa đào tạo được tạo với trạng thái (`Open`, `In Progress`, `Completed`). | BR-TRAIN-001 | AC-TRAIN-002 | Confirmed | Could Have |
| FR-TRAIN-003 | Hệ thống phải hỗ trợ lập lịch đào tạo. | HR Staff | Khóa học, thời gian học, địa điểm phòng học | Lịch học được tạo, gửi thông báo và tự động thêm vào lịch cá nhân. | BR-TRAIN-001 | AC-TRAIN-003 | Confirmed | Could Have |
| FR-TRAIN-004 | Hệ thống phải hỗ trợ phân công nhân viên tham gia. | HR Staff; Manager | Khóa học, danh sách nhân viên phân công | Nhân viên được thêm vào danh sách học viên của lớp học. | BR-TRAIN-001 | AC-TRAIN-004 | Confirmed | Could Have |
| FR-TRAIN-005 | Hệ thống phải hỗ trợ theo dõi tiến độ đào tạo. | HR Staff; Trainer | Buổi học, điểm danh tham gia (Có mặt / Vắng) | Tỷ lệ chuyên cần của từng học viên được cập nhật tự động. | BR-TRAIN-002 | AC-TRAIN-005 | Confirmed | Could Have |
| FR-TRAIN-006 | Hệ thống phải hỗ trợ theo dõi kết quả học tập. | Trainer; HR Staff | Điểm kiểm tra kết thúc khóa (thang điểm 10) | Điểm số được ghi nhận; xác định kết quả Đạt hoặc Không đạt. | BR-TRAIN-002 | AC-TRAIN-006 | Confirmed | Could Have |
| FR-TRAIN-007 | Hệ thống phải hỗ trợ quản lý chứng chỉ. | HR Staff | Mã chứng chỉ, ngày cấp, hạn hiệu lực (nếu có) | Chứng chỉ điện tử được cấp phát và lưu trong hồ sơ học viên. | BR-TRAIN-002 | AC-TRAIN-007 | Confirmed | Could Have |
| FR-TRAIN-008 | Hệ thống phải hỗ trợ quản lý lịch sử đào tạo. | Employee (cá nhân); HR Staff | ID nhân viên | Hiển thị toàn bộ lịch sử các khóa đã tham gia và chứng chỉ đạt được. | BR-TRAIN-AUTH-001 | AC-TRAIN-008 | Confirmed | Could Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Thông tin chương trình, Khóa đào tạo, Thời khóa biểu, Danh sách học viên, Dữ liệu điểm danh, Điểm thi cuối khóa.
- **Output:** Báo cáo tiến độ đào tạo, Danh sách chứng chỉ đã cấp phát, Lịch sử đào tạo trong hồ sơ nhân viên.
- **Validation:**
  - Số lượng học viên đăng ký không được vượt quá sĩ số tối đa của lớp học.
  - Lịch học không được trùng lặp với các khóa bắt buộc khác của cùng một học viên.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Training Management](../business-rule/training-management.md):
  - **BR-TRAIN-001:** Khóa học bắt buộc (Compliance) hoặc tự chọn; ký cam kết đào tạo và bồi hoàn chi phí nếu nghỉ việc trước hạn cam kết (`PD-026`).
  - **BR-TRAIN-002:** Tiêu chí Đạt: Chuyên cần $\ge 80\%$ và Điểm kiểm tra $\ge 6.0/10$; cấp chứng chỉ điện tử có mã số duy nhất và đồng bộ vào `EMP`; không tích hợp LMS bên thứ ba (`PD-026`).
  - **BR-TRAIN-AUTH-001:** Trainer nhập điểm/điểm danh; nhân viên xem thông tin cá nhân mình (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Học viên vắng mặt quá 20% số buổi:** Hệ thống tự động đánh dấu "Không đủ điều kiện dự thi", học viên phải đăng ký học lại vào khóa sau.
2. **Nhân viên nghỉ việc khi đang theo học khóa học có cam kết:** Kế toán căn cứ Hợp đồng đào tạo để tính chi phí bồi hoàn trừ vào lương tháng cuối.
3. **Chứng chỉ định kỳ sắp hết hạn:** Hệ thống cảnh báo trước 30 ngày cho HR và nhân viên để bố trí đào tạo tái cấp chứng chỉ (ví dụ: an toàn lao động, PCCC).

## Acceptance Criteria

- **AC-TRAIN-001 → FR-TRAIN-001:** Given chương trình đào tạo kỹ năng mềm; When HR tạo; Then chương trình hiển thị trong danh mục.
- **AC-TRAIN-002 → FR-TRAIN-002:** Given khóa học giới hạn 20 người; When đã đủ 20 học viên; Then hệ thống khóa đăng ký khóa học.
- **AC-TRAIN-003 → FR-TRAIN-003:** Given lịch học được công bố; Then học viên nhận được thông báo lịch học trên ứng dụng.
- **AC-TRAIN-004 → FR-TRAIN-004:** Given phân công nhân viên mới vào khóa Hội nhập; Then khóa học xuất hiện trong danh sách đào tạo bắt buộc của nhân viên.
- **AC-TRAIN-005 → FR-TRAIN-005:** Given điểm danh từng buổi; Then hệ thống tự động tính tỷ lệ % tham gia của từng học viên.
- **AC-TRAIN-006 → FR-TRAIN-006:** Given điểm kiểm tra 7.5/10 và tham dự 90%; Then hệ thống xác nhận học viên "Đạt" khóa học.
- **AC-TRAIN-007 → FR-TRAIN-007:** Given học viên đạt yêu cầu; Then hệ thống sinh chứng chỉ PDF có mã số tra cứu duy nhất.
- **AC-TRAIN-008 → FR-TRAIN-008:** Given nhân viên xem mục Đào tạo; Then hiển thị danh sách tất cả các khóa đã hoàn thành và chứng chỉ đạt được.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Nhân viên (`EMP`): Cung cấp danh sách học viên và đồng bộ lịch sử chứng chỉ vào hồ sơ nhân sự.
- Phân hệ Phòng ban (`DEPT`): Xác định nhân sự theo phòng ban để phân công đào tạo nghiệp vụ.

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc quản lý đào tạo đã được chốt tại PD-026.
