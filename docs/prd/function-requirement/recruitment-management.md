# 6.6. Recruitment Management

[Quay lại PRD](../../PRD.md#6-functional-requirements)

## Module Overview

Quản lý nhu cầu tuyển dụng, đăng tin nội bộ, tiếp nhận và sàng lọc hồ sơ ứng viên (CV), điều phối lịch phỏng vấn, đánh giá kết quả, phát hành thư mời nhận việc (Offer) và bàn giao ứng viên trúng tuyển sang Onboarding.

## Objectives

- Chuẩn hóa quy trình tuyển dụng nhân tài 5 bước minh bạch, chuyên nghiệp.
- Tự động hóa kết nối dữ liệu ứng viên trúng tuyển sang hồ sơ tiếp nhận nhân viên mới.

## Actors

- **HR Staff:** Tạo và quản lý vị trí tuyển dụng, sàng lọc CV, lên lịch phỏng vấn, gửi Offer Letter và điều phối quy trình.
- **Interviewer / Department Manager:** Tham gia phỏng vấn, chấm điểm và nhận xét đánh giá ứng viên trên hệ thống; rà soát điều khoản offer.
- **HR Manager / Ban Giám Đốc:** Phê duyệt đề xuất tuyển dụng và thư mời nhận việc.

## Feature List

- FR-REC-001: Quản lý vị trí tuyển dụng.
- FR-REC-002: Đăng tin tuyển dụng.
- FR-REC-003: Quản lý hồ sơ ứng viên.
- FR-REC-004: Theo dõi trạng thái ứng viên.
- FR-REC-005: Quản lý các vòng tuyển dụng.
- FR-REC-006: Lên lịch phỏng vấn.
- FR-REC-007: Đánh giá ứng viên.
- FR-REC-008: Quản lý offer.
- FR-REC-009: Chuyển ứng viên trúng tuyển sang onboarding.

## Functional Requirements

| Requirement ID | Chức năng bắt buộc | Actor | Input | Expected result | Business Rules | Acceptance Criteria | Status | Priority |
|---|---|---|---|---|---|---|---|---|
| FR-REC-001 | Hệ thống phải hỗ trợ quản lý vị trí tuyển dụng. | HR Staff | Tên vị trí, Phòng ban, Số lượng, Yêu cầu, Mức lương | Vị trí tuyển dụng được tạo và quản lý trạng thái (`Open`, `Closed`). | BR-REC-001; BR-REC-AUTH-001 | AC-REC-001 | Confirmed | Should Have |
| FR-REC-002 | Hệ thống phải hỗ trợ đăng tin tuyển dụng. | HR Staff | Nội dung tin đăng, kênh đăng nội bộ | Tin tuyển dụng hiển thị trên cổng thông tin nội bộ của công ty. | BR-REC-001 | AC-REC-002 | Confirmed | Should Have |
| FR-REC-003 | Hệ thống phải hỗ trợ quản lý hồ sơ ứng viên. | HR Staff | Họ tên, Email, SĐT, File CV (PDF <= 5MB) | Hồ sơ ứng viên được lưu trữ và liên kết với vị trí ứng tuyển. | BR-REC-001 | AC-REC-003 | Confirmed | Should Have |
| FR-REC-004 | Hệ thống phải hỗ trợ theo dõi trạng thái ứng viên. | HR Staff; Manager | Trạng thái (New, Screening, Interviewing, Offered, Hired, Rejected) | Cập nhật và hiển thị trực quan trạng thái ứng viên trên Kanban/List. | BR-REC-001 | AC-REC-004 | Confirmed | Should Have |
| FR-REC-005 | Hệ thống phải hỗ trợ quản lý các vòng tuyển dụng. | HR Staff | 2 vòng chuẩn: Vòng 1 Sơ loại/HR, Vòng 2 Chuyên môn | Cấu hình vòng phỏng vấn cho từng vị trí tuyển dụng. | BR-REC-001 | AC-REC-005 | Confirmed | Should Have |
| FR-REC-006 | Hệ thống phải hỗ trợ lên lịch phỏng vấn. | HR Staff | Ứng viên, Người phỏng vấn, Thời gian, Địa điểm/Link | Lịch phỏng vấn được tạo, gửi email tự động cho các bên. | BR-REC-001 | AC-REC-006 | Confirmed | Should Have |
| FR-REC-007 | Hệ thống phải hỗ trợ đánh giá ứng viên. | Interviewer; Manager | Phiếu đánh giá (tiêu chí, điểm số 1-5, nhận xét) | Điểm đánh giá được lưu vết, hỗ trợ quyết định tuyển dụng. | BR-REC-001; BR-REC-AUTH-001 | AC-REC-007 | Confirmed | Should Have |
| FR-REC-008 | Hệ thống phải hỗ trợ quản lý offer. | HR Staff soạn; HR Manager duyệt | Mức lương, ngày nhận việc, hạn phản hồi | Offer Letter được gửi tới ứng viên sau khi được cấp quản lý duyệt. | BR-REC-002 | AC-REC-008 | Confirmed | Should Have |
| FR-REC-009 | Hệ thống phải hỗ trợ chuyển ứng viên trúng tuyển sang onboarding. | Hệ thống tự động; HR Staff | Ứng viên trạng thái `Hired` (chấp nhận Offer) | Tự động khởi tạo hồ sơ nhân sự sơ bộ trong phân hệ Onboarding. | BR-REC-002 | AC-REC-009 | Confirmed | Should Have |

## Inputs & Outputs

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Input:** Thông tin vị trí tuyển dụng, Hồ sơ ứng viên (CV, Email, SĐT, Kinh nghiệm), Lịch phỏng vấn, Phiếu đánh giá, Thư mời nhận việc (Offer).
- **Output:** Kanban theo dõi ứng viên, Lịch phỏng vấn, Thư mời nhận việc (PDF/Email), Bản ghi tiếp nhận trong Onboarding.
- **Validation:**
  - Email và SĐT ứng viên là định danh nhận diện trùng lặp trong cùng một đợt tuyển dụng.
  - File CV đính kèm chỉ nhận PDF, dung lượng tối đa 5MB.

## Business Rules

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Áp dụng đầy đủ quy tắc tại [Business Rules — Recruitment Management](../business-rule/recruitment-management.md):
  - **BR-REC-001:** 5 bước tuyển dụng chuẩn hóa (`NEW` $\rightarrow$ `SCREENING` $\rightarrow$ `INTERVIEWING` $\rightarrow$ `OFFERED` $\rightarrow$ `HIRED`); lưu hồ sơ bị từ chối tối đa 12 tháng trong Talent Pool, trừ gian lận khỏi danh sách tái liên hệ (`PD-020`).
  - **BR-REC-002:** Thư mời nhận việc bắt buộc qua phê duyệt; ứng viên `HIRED` tự động kích hoạt tạo dữ liệu Onboarding; quyền thu hồi offer khi phát hiện sai phạm (`PD-020`).
  - **BR-REC-AUTH-001:** Người phỏng vấn chỉ xem hồ sơ và chấm điểm các ứng viên mình được phân công (`PD-008`).

## Edge Cases

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

1. **Ứng viên nộp trùng hồ sơ:** Hệ thống nhận diện qua Email/SĐT và hiển thị cờ cảnh báo hồ sơ trùng để HR gộp dữ liệu.
2. **Ứng viên từ chối Offer:** Chuyển trạng thái ứng viên sang `Rejected`, trạng thái offer sang `OFFER_DECLINED`, lưu lý do và đóng quy trình.
3. **Thu hồi Offer:** Cấp quản lý Revoke Offer kèm lý do; ứng viên chuyển `Rejected`. Nếu Onboarding chưa hoàn tất, hủy quy trình và giữ lịch sử; gian lận không vào danh sách tái liên hệ.

## Acceptance Criteria

- **AC-REC-001 → FR-REC-001:** Given vị trí tuyển dụng mới; When HR tạo; Then vị trí hiển thị ở trạng thái `Open`.
- **AC-REC-002 → FR-REC-002:** Given tin tuyển dụng nội bộ; When phát hành; Then nhân viên trong công ty có thể xem thông tin.
- **AC-REC-003 → FR-REC-003:** Given CV ứng viên hợp lệ; When tải lên; Then hồ sơ lưu vào danh sách ứng viên của vị trí đó.
- **AC-REC-004 → FR-REC-004:** Given ứng viên vượt qua vòng CV; When HR kéo thả trên Kanban; Then trạng thái chuyển sang `Interviewing`.
- **AC-REC-005 → FR-REC-005:** Given cấu hình 2 vòng phỏng vấn; Then hệ thống cho phép tạo lịch riêng cho từng vòng.
- **AC-REC-006 → FR-REC-006:** Given lên lịch phỏng vấn; When xác nhận; Then hệ thống gửi email mời kèm file lịch .ics cho ứng viên và người phỏng vấn.
- **AC-REC-007 → FR-REC-007:** Given buổi phỏng vấn kết thúc; When người phỏng vấn chấm điểm 4.5/5 và chọn "Pass"; Then trạng thái ứng viên đủ điều kiện sang vòng tiếp theo hoặc gửi Offer.
- **AC-REC-008 → FR-REC-008:** Given Offer được HR Manager duyệt; When gửi; Then ứng viên nhận được thư mời làm việc chính thức.
- **AC-REC-009 → FR-REC-009:** Given ứng viên chấp nhận Offer (chuyển `Hired`); Then hệ thống tự động sinh bản ghi mới trong module `ONB` với đầy đủ họ tên, email, vị trí.

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

## Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Phân hệ Phòng ban (`DEPT`): Xác định phòng ban có nhu cầu tuyển dụng và người phỏng vấn.
- Phân hệ Onboarding (`ONB`): Tiếp nhận dữ liệu ứng viên trúng tuyển để bắt đầu quy trình hội nhập (`PD-007, PD-020`).

## Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ các quy tắc tuyển dụng đã được chốt tại PD-006, PD-020.
