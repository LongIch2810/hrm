# Agile Scrum Framework

Tài liệu này ghi đề xuất khung làm việc Agile Scrum cho dự án HRM.

**Status:** TBD (To Be Determined)

**Proposal — Pending Approval:** Khung Scrum chung, vai trò, nghi thức, DoR, DoD và cách tổ chức backlog dưới đây chưa là quy định dự án. Product Owner chỉ duyệt kế hoạch [Sprint 0](../../sprints/sprint-00-core-backend.md) ở trạng thái Planned. Tiếp tục dùng [Git Rules](../rules/git.md) và [Testing Rules](../rules/testing.md) đã được xác nhận.

- Product Owner có chọn Scrum và Sprint 2 tuần không?
- Ai đảm nhiệm Scrum Master, QA, và phê duyệt DoR/DoD?
- Nghi thức, Story Points và vị trí lưu Sprint backlog cần điều chỉnh thế nào?
- Chiến lược nhánh cho Sprint có cần bổ sung vào Git Rules không?

## 1. Nguyên tắc cốt lõi (Core Principles)

Đề xuất Scrum kết hợp cộng tác giữa Product Owner, nhóm phát triển và AI Coding Agent.

- Duy trì nhịp độ lặp cố định: Timebox 2 tuần/Sprint.
- Tôn trọng nguyên tắc TBD: Không tự ý quyết định thay Product Owner đối với yêu cầu chưa chốt.
- Luôn kiểm thử và tích hợp liên tục sau mỗi User Story.
- Bàn giao sản phẩm tăng trưởng (Potentially Shippable Increment) có thể kiểm thử thực tế cuối mỗi Sprint.

## 2. Cơ cấu Đội ngũ (Scrum Roles)

Phân định trách nhiệm rõ ràng giữa các vai trò trong chu trình phát triển.

| Vai trò | Thực thể đảm nhiệm | Trách nhiệm chính |
|---|---|---|
| **Product Owner (PO)** | Khách hàng / Đại diện doanh nghiệp | Quản lý Product Backlog, duyệt DoR/DoD, chốt quyết định nghiệp vụ, nghiệm thu Sprint. |
| **Scrum Master (SM)** | Lead Engineer / Technical Lead | Hướng dẫn tuân thủ quy trình, gỡ bỏ blocker kỹ thuật, bảo đảm tuân thủ `docs/rules/*`. |
| **Development Team** | Developers & AI Coding Agents | Phân tích kỹ thuật, viết code, viết tests, bảo đảm chất lượng theo coding standards. |
| **Quality Assurance (QA)** | QA / Test Engineer | Kiểm thử tích hợp, kiểm thử giao diện cross-device, rà soát lỗ hổng bảo mật và UAT. |

## 3. Các Nghi thức Scrum (Ceremonies & Timeboxes)

Mỗi Sprint kéo dài đúng 2 tuần (10 ngày làm việc).

```text
Tuần 1                                      Tuần 2
[Planning] ──> [Daily Sync] ──────────────> [Refinement] ──> [Daily Sync] ──> [Review & Demo] ──> [Retro]
(Ngày 1)       (Mỗi ngày 15p)               (Giữa Sprint)     (Mỗi ngày 15p)   (Ngày 10)           (Ngày 10)
```

### 3.1. Sprint Planning (Kế hoạch Sprint)
- **Thời điểm & Thời lượng:** Sáng Thứ Hai đầu Sprint, 2 - 4 giờ.
- **Mục tiêu:** Xác định Sprint Goal và chốt danh sách User Stories đưa vào Sprint Backlog.
- **Đầu ra:** Sprint Backlog chi tiết và file kế hoạch tại `plans/active/sprint-<xx>.md`.

### 3.2. Daily Scrum / Sync (Họp đồng bộ hàng ngày)
- **Thời điểm & Thời lượng:** Đầu mỗi ngày làm việc, tối đa 15 phút.
- **Nội dung:** Báo cáo 3 câu hỏi (Hôm qua làm gì, hôm nay làm gì, có trở ngại/blocker gì).
- **Đối với AI Agent:** Cập nhật nhật ký công việc trong task tương ứng tại `tasks/active/`.

### 3.3. Backlog Refinement (Làm mịn Backlog)
- **Thời điểm & Thời lượng:** Giữa Sprint (Thứ Tư/Năm tuần 1), 1 - 2 giờ.
- **Nội dung:** Làm rõ Acceptance Criteria, kiểm tra DoR, phân tách story lớn và chấm Story Points.
- **Quy ước Story Points:** Áp dụng dãy số Fibonacci (1, 2, 3, 5, 8). Story $\ge 13$ điểm bắt buộc tách nhỏ.

### 3.4. Sprint Review & Demo (Trình diễn & Đánh giá)
- **Thời điểm & Thời lượng:** Chiều ngày cuối Sprint, 1 - 2 giờ.
- **Nội dung:** Demo Increment sản phẩm chạy thực tế trước Product Owner.
- **Đầu ra:** Biên bản nghiệm thu và danh sách phản hồi/góp ý từ Product Owner.

### 3.5. Sprint Retrospective (Cải tiến quy trình)
- **Thời điểm & Thời lượng:** Ngay sau Sprint Review, 1 giờ.
- **Nội dung:** Đánh giá những điểm làm tốt, điểm còn hạn chế và 1-2 hành động cải tiến cho Sprint tới.

## 4. Tiêu chuẩn Chất lượng (Quality Gates)

### 4.1. Definition of Ready (DoR) - Tiêu chuẩn sẵn sàng thực hiện
Một User Story chỉ được đưa vào Sprint Backlog khi đáp ứng toàn bộ điều kiện sau:

- Viết đúng định dạng User Story: *"Là [vai trò], tôi muốn [hành động], để [mục đích]"*.
- Có danh sách Acceptance Criteria (AC) rõ ràng, có thể kiểm thử (testable).
- Đặc tả màn hình liên quan đã sẵn sàng tại [docs/design/screens/](../design/screens/).
- Quy tắc nghiệp vụ liên quan không còn trạng thái TBD (`docs/prd/business-rule/`).
- API contract và schema dữ liệu sơ bộ đã thống nhất.
- Đã được gán Story Points bởi Development Team.

### 4.2. Definition of Done (DoD) - Tiêu chuẩn hoàn thành
Một User Story hoặc Task chỉ được coi là Done và đóng khi thỏa mãn:

- Mã nguồn tuân thủ [Clean Code](../rules/clean-code.md) và [Coding Style](../rules/coding-style.md).
- TypeScript compile thành công 0 lỗi (`npm run build`).
- Viết đủ Unit Tests và Integration Tests theo quy định tại [Testing Rules](../rules/testing.md).
- Không có lỗi bảo mật nghiêm trọng theo [Security Rules](../rules/security.md).
- Code được review, tạo Pull Request và merge theo [Git Rules](../rules/git.md).
- Tài liệu liên quan (API spec, PRD status) được cập nhật đồng bộ.
- Được Product Owner nghiệm thu trực tiếp trên môi trường kiểm thử.

## 5. Quản lý Artifacts & Thư mục (Backlog, Plans & Tasks)

Đề xuất cách quản lý file kế hoạch và công việc trong dự án:

| Hạng mục | Vị trí lưu trữ | Quy tắc quản lý |
|---|---|---|
| **Product Backlog** | `docs/PRD.md` & `docs/prd/` | Nguồn sự thật duy nhất cho toàn bộ tính năng và yêu cầu nghiệp vụ. |
| **Sprint Plan** | `plans/active/sprint-<xx>.md` | Chứa Sprint Goal, danh sách User Stories và phân bổ nguồn lực. |
| **Completed Plan** | `plans/completed/sprint-<xx>.md` | Di chuyển file kế hoạch sang đây khi kết thúc Sprint. |
| **Task chi tiết** | `tasks/active/task-<id>-<name>.md` | Mô tả các đầu việc kỹ thuật cụ thể trong Sprint. |
| **Completed Task** | `tasks/completed/task-<id>-<name>.md` | Di chuyển task sang đây khi hoàn tất DoD. |

## 6. Quy ước Nhánh Git trong Sprint

**Status:** TBD (To Be Determined)

Chiến lược nhánh riêng cho Sprint chưa được Product Owner xác nhận. Đề xuất thêm quy ước Sprint vào [Git Rules](../rules/git.md) sau khi chốt nhánh gốc và quy trình review; hiện dùng mẫu nhánh, commit và điều kiện merge đã xác nhận ở đó.

- Có cần nhánh `develop` hay tiếp tục tạo nhánh từ nhánh chính theo Git Rules hiện tại?
- Có cần tên nhánh chứa số Sprint và mã phân hệ không?
