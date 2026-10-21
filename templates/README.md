# Project Templates Directory

Thư mục lưu trữ các biểu mẫu chuẩn (Templates) của dự án HRM dành cho Developers và AI Coding Agents.

> [!NOTE]
> **Trạng thái biểu mẫu dành cho AI Agent:**
> **Status:** TBD (To Be Determined). Quy trình Scrum và mẫu Sprint 1–9 chưa được Product Owner duyệt; dùng biểu mẫu như đề xuất để tham khảo.

---

## Danh mục Biểu mẫu chuẩn

| Biểu mẫu | Đường dẫn | Mục đích sử dụng |
|---|---|---|
| **Sprint Plan Template** | [sprint-template.md](sprint-template.md) | Biểu mẫu đề xuất cho Sprint 1–9; vị trí lưu và quy trình còn TBD. |

---

## Hướng dẫn Quy trình Sử dụng Template cho Agent

### Khi chuẩn bị một Sprint mới (Sprint Planning):
1. Đọc lộ trình tổng quan tại [docs/process/sprint-roadmap.md](../docs/process/sprint-roadmap.md) để nắm mục tiêu, phạm vi module và danh sách User Stories cần làm.
2. Sao chép nội dung từ [templates/sprint-template.md](sprint-template.md) sang file đích:
   - Đường dẫn chuẩn: `sprints/sprint-<xx>-<module-slug>.md` (ví dụ: `sprints/sprint-01-organization-employee.md`).
3. Điền đầy đủ thông tin:
   - Không bỏ sót bất kỳ đề mục nào từ mục 1 đến mục 6.
   - Mỗi User Story phải viết theo cấu trúc: *"Là một [vai trò], tôi muốn [hành động], để [giá trị]"*.
   - Khai báo rõ ràng tiêu chuẩn đầu vào (**DoR**) và tiêu chuẩn đầu ra (**DoD**).
   - Phân rã thành các `TASK-XXX-Y` kỹ thuật cụ thể cho CSDL, Backend, API, Frontend và Test.
4. Tuân thủ **Rule: Undefined Requirements & Decisions (TBD)** trong [AGENTS.md](../AGENTS.md):
   - Mọi thông tin nghiệp vụ chưa rõ ràng trong `docs/prd/` phải đánh dấu rõ `TBD (To Be Determined)` và chờ Product Owner xác nhận trước khi code.
