# HRM UI/UX Design Documentation — Index & Directory

Hệ thống tài liệu thiết kế UI/UX hoàn chỉnh cho dự án Quản trị Nhân sự (HRM).
Được xây dựng dựa trên [frontend/DESIGN.md](file:///d:/saved/Project/hrm/frontend/DESIGN.md), [PRD.md](file:///d:/saved/Project/hrm/docs/PRD.md), [UI Rules](file:///d:/saved/Project/hrm/docs/rules/ui.md) và [Auth Spec](file:///d:/saved/Project/hrm/docs/architecture/auth.md).

---

## 1. Mục Lục Tài Liệu Cốt Lõi

1. **[Design System Specification](design-system.md):** Quy chuẩn toàn diện về triết lý biên tập, bảng màu, phông chữ EB Garamond 300 / Inter, kích thước, bo góc viên thuốc, quy chuẩn thành phần (Button, Input, Table, Card, Modal, Badges) và khả năng tiếp cận (Accessibility WCAG AA).
2. **[Design Tokens CSS (globals)](design-tokens.css):** Toàn bộ biến CSS và các lớp tiện ích sẵn sàng để import và áp dụng trong ứng dụng frontend.
3. **Interactive Design Showcase & Responsive Prototype:** **Status:** TBD (To Be Determined). Bản preview chưa có trong repository; cần xác nhận đường dẫn project OpenDesign và kết quả kiểm tra responsive.

---

## 2. Danh Mục 68 Màn Hình Chi Tiết Theo Phân Hệ

| Nhóm Màn Hình | File Đặc Tả Thiết Kế | Danh Sách Màn Hình Chi Tiết |
|---|---|---|
| **01. Xác Thực & Lỗi Hệ Thống** | [01-auth-and-system.md](screens/01-auth-and-system.md) | `Screen 1`: Đăng nhập `/login`<br>`Screen 2`: Đổi pass lần đầu `/auth/first-time-password`<br>`Screen 3`: Quên mật khẩu `/auth/forgot-password`<br>`Screen 4`: Đặt lại mật khẩu `/auth/reset-password`<br>`Screen 5`: Lỗi 403 Forbidden `/403`<br>`Screen 6`: Lỗi 404 Not Found `/404`<br>`Screen 7`: Error Boundary Fallback |
| **02. Dashboards Theo Vai Trò** | [02-dashboards.md](screens/02-dashboards.md) | `Screen 8`: Dashboard Admin `/admin/dashboard`<br>`Screen 9`: Dashboard HR `/hr/dashboard`<br>`Screen 10`: Dashboard Manager `/manager/dashboard`<br>`Screen 11`: Portal Nhân viên `/portal/dashboard` |
| **03. Cá Nhân & Thông Báo** | [03-profile-and-notifications.md](screens/03-profile-and-notifications.md) | `Screen 12`: Hồ sơ cá nhân `/profile`<br>`Screen 13`: Trung tâm thông báo `/notifications` |
| **04. Quản Lý Nhân Viên (`EMP`)** | [04-employee-management.md](screens/04-employee-management.md) | `Screen 14`: Danh sách nhân viên `/employees`<br>`Screen 15`: Thêm nhân viên mới `/employees/new`<br>`Screen 16`: Chi tiết hồ sơ `/employees/:id`<br>`Screen 17`: Chỉnh sửa & Đổi trạng thái `/employees/:id/edit` |
| **05. Cơ Cấu Phòng Ban (`DEPT`)** | [05-department-management.md](screens/05-department-management.md) | `Screen 18`: Sơ đồ cây Org Chart `/departments/org-chart`<br>`Screen 19`: Danh sách phòng ban `/departments`<br>`Screen 20`: Thêm/Sửa phòng ban `/departments/new`<br>`Screen 21`: Chức vụ & Cấp bậc `/departments/positions` |
| **06. Chấm Công & Thời Gian (`ATT`)** | [06-attendance-management.md](screens/06-attendance-management.md) | `Screen 22`: Chấm công cá nhân `/attendance/my-attendance`<br>`Screen 23`: Bảng công tháng cá nhân `/attendance/my-timesheet`<br>`Screen 24`: Đơn làm thêm giờ (OT) `/attendance/my-overtime`<br>`Screen 25`: Phê duyệt OT `/attendance/overtime/approvals`<br>`Screen 26`: Bảng công phòng ban `/attendance/department-timesheet`<br>`Screen 27`: Bảng công công ty & Import `/attendance/timesheets`<br>`Screen 28`: Thiết lập ca làm việc `/attendance/shifts` |
| **07. Quản Lý Nghỉ Phép (`LEAVE`)** | [07-leave-management.md](screens/07-leave-management.md) | `Screen 29`: Quỹ phép & Đơn cá nhân `/leaves/my-leaves`<br>`Screen 30`: Tạo đơn xin nghỉ phép `/leaves/new`<br>`Screen 31`: Phê duyệt đơn nghỉ phép `/leaves/approvals`<br>`Screen 32`: Lịch nghỉ phép `/leaves/calendar`<br>`Screen 33`: Danh mục & Quỹ phép `/leaves/settings` |
| **08. Quản Lý Tiền Lương (`PAY`)** | [08-payroll-management.md](screens/08-payroll-management.md) | `Screen 34`: Quản lý kỳ lương `/payroll/cycles`<br>`Screen 35`: Chi tiết bảng lương `/payroll/cycles/:id`<br>`Screen 36`: Cấu hình Lương, Thuế, BHXH `/payroll/settings`<br>`Screen 37`: Phiếu lương cá nhân (Payslip) `/payroll/my-payslip` |
| **09. Tuyển Dụng Nhân Sự (`REC`)** | [09-recruitment-management.md](screens/09-recruitment-management.md) | `Screen 38`: Vị trí & Tin tuyển dụng `/recruitment/jobs`<br>`Screen 39`: Cổng tin tuyển dụng nội bộ `/recruitment/internal-jobs`<br>`Screen 40`: Kanban Pipeline ứng viên `/recruitment/candidates`<br>`Screen 41`: Chi tiết CV & Chấm điểm `/recruitment/candidates/:id`<br>`Screen 42`: Quản lý Offer & Chuyển Onboarding `/recruitment/offers` |
| **10. Tiếp Nhận & Thôi Việc (`ONB`)**| [10-onboarding-offboarding.md](screens/10-onboarding-offboarding.md) | `Screen 43`: Bảng theo dõi tiếp nhận `/onboarding`<br>`Screen 44`: Checklist tiếp nhận 4 bên `/onboarding/:id`<br>`Screen 45`: Bảng theo dõi thôi việc `/offboarding`<br>`Screen 46`: Checklist bàn giao thôi việc `/offboarding/:id` |
| **11. Đánh Giá Hiệu Suất (`PERF`)** | [11-performance-management.md](screens/11-performance-management.md) | `Screen 47`: Quản lý kỳ đánh giá `/performance/cycles`<br>`Screen 48`: Thiết lập & Duyệt mục tiêu `/performance/goals`<br>`Screen 49`: Tự chấm điểm Self-Review `/performance/my-reviews`<br>`Screen 50`: Quản lý đánh giá nhân viên `/performance/team-reviews`<br>`Screen 51`: Tổng kết & Xếp loại A-E `/performance/summary` |
| **12. Hợp Đồng Lao Động (`CON`)** | [12-contract-management.md](screens/12-contract-management.md) | `Screen 52`: Danh sách & Cảnh báo hạn 30 ngày `/contracts`<br>`Screen 53`: Tạo mới / Tái ký hợp đồng `/contracts/new`<br>`Screen 54`: Chi tiết hợp đồng & Phụ lục `/contracts/:id` |
| **13. Quản Lý Đào Tạo (`TRAIN`)** | [13-training-management.md](screens/13-training-management.md) | `Screen 55`: Danh mục chương trình & Khóa `/training/courses`<br>`Screen 56`: Lập lịch & Phân công học viên `/training/courses/:id/schedule`<br>`Screen 57`: Điểm danh, Điểm số, Cấp chứng chỉ `/training/courses/:id/attendance-grades`<br>`Screen 58`: Khóa học & Chứng chỉ của tôi `/training/my-training` |
| **14. Báo Cáo & Phân Tích (`REP`)** | [14-reports-analytics.md](screens/14-reports-analytics.md) | `Screen 59`: Dashboard Quản trị cấp cao `/reports/overview`<br>`Screen 60`: Báo cáo chuyên cần & Phép `/reports/attendance-leaves`<br>`Screen 61`: Báo cáo quỹ lương & Chi phí `/reports/payroll`<br>`Screen 62`: Báo cáo phễu tuyển dụng `/reports/recruitment`<br>`Screen 63`: Xuất dữ liệu có che nhạy cảm `/reports/export` |
| **15. Quản Trị Hệ Thống (`SYS`)** | [15-system-administration.md](screens/15-system-administration.md) | `Screen 64`: Quản lý tài khoản `/admin/users`<br>`Screen 65`: Ma trận phân quyền RBAC `/admin/roles`<br>`Screen 66`: Cấu hình thông số toàn cục `/admin/settings`<br>`Screen 67`: Quản lý thông báo phát thanh `/admin/notifications-manager`<br>`Screen 68`: Nhật ký kiểm toán bảo mật `/admin/audit-logs` |

---

## 3. Độ Phủ & Mức Độ Tuân Thủ

- **Độ phủ chức năng (PRD Coverage):** 100% bao phủ toàn bộ 109 yêu cầu chức năng (FR-EMP-001 đến FR-SYS-010) và 11 quy trình cốt lõi xuyên suốt.
- **Độ phủ màn hình:** 68/68 màn hình chi tiết, không thiếu bất kỳ trang nghiệp vụ, trang lỗi hoặc cổng tự phục vụ nào.
- **Tuân thủ DESIGN.md:**
  - Ink Primary `#292524` và viên thuốc `rounded.pill` cho toàn bộ nút hành động chính.
  - Sàn trang off-white `#f5f5f5` và thẻ trắng tinh khôi `#ffffff` với viền tóc mảnh 1px `#e7e5e4`.
  - Phông hiển thị EB Garamond 300 thanh lịch biên tập, kết hợp Inter cho toàn bộ bảng biểu và form.
  - Atmospheric gradient orbs làm điểm nhấn không gian dịu nhẹ.
  - Bổ sung 3 token trạng thái nghiệp vụ chuẩn B2B SaaS: Warning (`#d97706`), Info (`#2563eb`), Neutral (`#71717a`).
- **Responsive chuẩn mực:** Kiểm chứng layout tại 3 mốc kích thước: **375px (Mobile Phone)**, **768px (Tablet)** và **1440px (Desktop)** với chuyển đổi Table sang Stacked Cards và Bottom Navigation Bar tiện lợi.
