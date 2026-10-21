# 9. Core Workflows

[Quay lại PRD](../../PRD.md#9-core-workflows)

Tài liệu này tổng hợp **11 quy trình nghiệp vụ cốt lõi** xuyên suốt toàn bộ hệ thống HRM. Toàn bộ các quy trình đã được Product Owner phê duyệt chính thức (**Confirmed**) theo các quyết định kỹ thuật từ `PD-001` đến `PD-040`.

---

## 9.1. Recruitment Workflow (Quy trình Tuyển dụng)

**Liên kết:** FR-REC-001 đến FR-REC-009. Xem chi tiết tại [Recruitment Workflow](recruitment-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-020`)

- **Quy trình 5 bước chuẩn hóa:**
  1. `NEW`: Tạo yêu cầu và đăng tin tuyển dụng.
  2. `SCREENING`: Tiếp nhận và sàng lọc hồ sơ ứng viên (CV).
  3. `INTERVIEWING`: Lên lịch và thực hiện các vòng phỏng vấn (Vòng 1: HR Sơ loại; Vòng 2: Chuyên môn & Department Manager); chấm điểm trực tiếp trên hệ thống.
  4. `OFFERED`: Soạn thảo, phê duyệt và gửi thư mời nhận việc cho ứng viên đạt tiêu chuẩn.
  5. `HIRED`: Ứng viên đồng ý nhận việc $\rightarrow$ Hệ thống tự động chuyển hồ sơ sang phân hệ Onboarding.

---

## 9.2. Employee Onboarding Workflow (Quy trình Tiếp nhận nhân sự mới)

**Liên kết:** FR-REC-009; FR-ONB-001 đến FR-ONB-005. Xem chi tiết tại [Onboarding Workflow](onboarding-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-021`)

- **Kích hoạt:** Tự động khi ứng viên trúng tuyển chấp nhận Offer (trạng thái `HIRED` trong phân hệ Tuyển dụng `REC`).
- **Checklist chuẩn hóa 4 bên:**
  1. IT: Cấp tài khoản hệ thống (Email nội bộ, mật khẩu khởi tạo, phân quyền) và cấp phát laptop/thiết bị.
  2. HR: Ký kết hợp đồng lao động thử việc (`CON`) và thu thập hồ sơ pháp lý.
  3. Quản lý phòng ban: Phân công người hướng dẫn (Mentor) và kế hoạch thử việc theo vị trí (tối đa 60 hoặc 30 ngày).
  4. Nhân viên mới: Hoàn tất hồ sơ cá nhân và ký nhận bàn giao thiết bị.
- **Điều kiện hoàn tất:** 100% mục trong checklist được các bên xác nhận $\rightarrow$ Chuyển trạng thái nhân viên sang `ACTIVE`.

---

## 9.3. Attendance Workflow (Quy trình Chấm công & Quản lý thời gian)

**Liên kết:** FR-ATT-001 đến FR-ATT-010. Xem chi tiết tại [Attendance Workflow](attendance-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-013`, `PD-014`)

- **Phương thức ghi nhận:** Kết hợp Check-in / Check-out trên Web và Import file Excel từ máy chấm công.
- **Lệch giờ giữa Web và file máy:** HR đối soát và chọn giờ có hiệu lực; không tự ưu tiên nguồn nhập sau.
- **OT ngày nghỉ/cuối tuần:** Cho phép Check-in/Check-out trên Web khi có đơn OT được duyệt.
- **Khung giờ chuẩn:** 08:00 - 17:30 (8 giờ làm việc, nghỉ trưa 12:00 - 13:30, từ Thứ Hai đến Thứ Sáu).
- **Quy tắc tính công:**
  - Ân hạn đi muộn: Tối đa 15 phút (check-in sau 08:15 tính muộn từ mốc 08:00).
  - Về sớm: Check-out trước 17:30 tính về sớm theo số phút thực tế.
- **Chốt công kỳ:** Tự động tổng hợp dữ liệu công hàng tháng vào ngày 01 của tháng kế tiếp để chuyển sang phân hệ Lương.

---

## 9.4. Overtime Approval Workflow (Quy trình Làm thêm giờ OT)

**Liên kết:** FR-ATT-007, FR-ATT-010, FR-PAY-003. Xem chi tiết tại [Overtime Approval Workflow](overtime-approval-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-014`)

- **Nguyên tắc bắt buộc:** Phải có đơn đăng ký được Quản lý trực tiếp phê duyệt trước mới được ghi nhận giờ OT vào bảng công. Mọi thời gian ở lại văn phòng không có đơn duyệt đều không được tính tiền OT.
- **Làm tròn thời gian:** Làm tròn lên giờ OT thực tế theo block **30 phút**.
- **Đối soát thực tế:** Lấy $\min(\text{Giờ duyệt}, \text{Giờ OT thực tế đã làm tròn lên})$.
- **Hệ số lương OT:** Ngày thường x1.5, Ngày nghỉ cuối tuần x2.0, Ngày lễ tết x3.0.

---

## 9.5. Leave Approval Workflow (Quy trình Phê duyệt nghỉ phép)

**Liên kết:** FR-LEAVE-001 đến FR-LEAVE-009. Xem chi tiết tại [Leave Approval Workflow](leave-approval-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-015`, `PD-016`)

- **Chính sách phép:** 12 ngày phép năm/năm (+1 ngày mỗi 5 năm thâm niên), tích lũy 1 ngày/tháng; chuyển phép tồn sang năm sau dùng trước 31/03; nghỉ tối thiểu 0.5 ngày (nửa ngày) hoặc nguyên ngày.
- **Quy trình phê duyệt 1 cấp trực tiếp:**
  1. Employee tạo đơn nghỉ phép trên hệ thống (chọn loại phép, thời gian, lý do, người bàn giao).
  2. Department Manager trực tiếp nhận thông báo và phê duyệt/từ chối đơn.
  3. Khi duyệt: Quỹ phép tự động bị trừ, lịch nghỉ đồng bộ sang bảng chấm công ngay lập tức.
  4. Nếu từ chối hoặc hủy đơn (trước ngày nghỉ): Số ngày phép được hoàn lại quỹ nguyên vẹn.

---

## 9.6. Payroll Processing Workflow (Quy trình Xử lý & Khóa kỳ lương)

**Liên kết:** FR-PAY-001 đến FR-PAY-011. Xem chi tiết tại [Payroll Processing Workflow](payroll-processing-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-017`, `PD-018`, `PD-019`)

- **Kỳ lương:** Tính theo tháng dương lịch (từ ngày 01 đến ngày cuối cùng của tháng). Chốt lương ngày 05, chi trả ngày 10 hàng tháng.
- **Công thức tính toán:**
  - Tiền tệ: VNĐ, làm tròn 0 chữ số thập phân.
  - Lương thực lĩnh (Net) = Tổng thu nhập (Lương ngày công + Phụ cấp + Thưởng + Tiền OT) - Trích đóng bảo hiểm bắt buộc người lao động (10.5%) - Thuế TNCN (biểu lũy tiến 7 bậc, giảm trừ bản thân 11tr, người phụ thuộc 4.4tr/người) - Các khoản khấu trừ.
- **Khóa kỳ lương & Phiếu lương:** Giám đốc/HR Manager chuyển kỳ từ `Draft` sang `Approved`; HR Staff khóa kỳ thành `Closed`. Hệ thống phát hành Phiếu lương điện tử (Payslip) riêng tư cho từng nhân viên.

---

## 9.7. Contract Lifecycle Workflow (Quy trình Vòng đời Hợp đồng)

**Liên kết:** FR-CON-001 đến FR-CON-009. Xem chi tiết tại [Contract Lifecycle Workflow](contract-lifecycle-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-025`)

- **Vòng đời hợp đồng:** Ký mới (Thử việc/Có thời hạn) $\rightarrow$ Phụ lục điều chỉnh $\rightarrow$ Cảnh báo tự động trước 30 ngày $\rightarrow$ Tái ký / Gia hạn $\rightarrow$ Thanh lý / Chấm dứt.
- **Quy tắc pháp lý:** Mỗi nhân viên chỉ có 1 hợp đồng `ACTIVE` tại một thời điểm; sau 2 lần ký hợp đồng có thời hạn, hệ thống bắt buộc chuyển sang loại Không xác định thời hạn.

---

## 9.8. Employee Transfer & Promotion Workflow (Quy trình Điều chuyển & Thăng chức)

**Liên kết:** FR-EMP-004, FR-EMP-007, FR-DEPT-004, FR-DEPT-005. Xem chi tiết tại [Employee Transfer Workflow](employee-transfer-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-008`, `PD-012`)

- **Thực thi giao dịch:** Cập nhật phòng ban/chức vụ mới, ghi nhận bản ghi lịch sử công tác bất biến (`employee_job_histories`), tạo phụ lục HĐLĐ điều chỉnh lương.
- **Đồng bộ phân quyền RBAC:** Tự động nâng vai trò thành `Department Manager` khi được bổ nhiệm làm Trưởng phòng (Head) và chuyển giao thẩm quyền duyệt đơn.

---

## 9.9. Performance Evaluation Workflow (Quy trình Đánh giá hiệu suất)

**Liên kết:** FR-PERF-001 đến FR-PERF-008. Xem chi tiết tại [Performance Evaluation Workflow](performance-evaluation-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-023`, `PD-024`)

- **Quy trình 3 bước chuẩn hóa:**
  1. Đầu kỳ: Nhân viên đăng ký mục tiêu KPI/OKR; Quản lý duyệt (tổng trọng số = 100%).
  2. Cuối kỳ: Nhân viên tự chấm điểm (thang 1-5 sao) kèm minh chứng $\rightarrow$ Quản lý trực tiếp chấm điểm & viết nhận xét định tính.
  3. Khóa kết quả: Hệ thống tính điểm có trọng số, xếp loại 5 mức (A, B, C, D, E), HR/Giám Đốc khóa kết quả, công bố và tiếp nhận khiếu nại trong 5 ngày.

---

## 9.10. Training Management Workflow (Quy trình Đào tạo nhân sự)

**Liên kết:** FR-TRAIN-001 đến FR-TRAIN-008. Xem chi tiết tại [Training Management Workflow](training-management-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-026`)

- **Chu trình đào tạo:** Lập kế hoạch $\rightarrow$ Mở khóa học & Lập lịch $\rightarrow$ Phân công học viên $\rightarrow$ Điểm danh từng buổi $\rightarrow$ Kiểm tra cuối khóa $\rightarrow$ Cấp chứng chỉ điện tử.
- **Tiêu chí cấp chứng chỉ:** Chuyên cần $\ge 80\%$ và Điểm thi $\ge 6.0/10$; sinh mã chứng chỉ số hóa duy nhất và đồng bộ vào hồ sơ nhân sự `EMP`.

---

## 9.11. Employee Offboarding Workflow (Quy trình Thôi việc)

**Liên kết:** FR-ONB-006 đến FR-ONB-009. Xem chi tiết tại [Offboarding Workflow](offboarding-workflow.md).

**Status:** Confirmed — Approved by Product Owner (`PD-022`)

- **Kích hoạt:** Khi có quyết định thôi việc hoặc đơn xin nghỉ việc được phê duyệt chính thức.
- **Checklist 4 bên bắt buộc:**
  1. Quản lý phòng ban: Xác nhận bàn giao công việc, tài liệu dự án, mã nguồn.
  2. Hành chính & IT: Thu hồi trang thiết bị, laptop, thẻ từ.
  3. IT Admin: Khóa tài khoản và thu hồi quyền truy cập hệ thống đúng 23:59:59 của ngày làm việc cuối cùng.
  4. Kế toán & HR: Quyết toán ngày công, phép tồn và hoàn tất trợ cấp thôi việc.
- **Hoàn tất:** Khi 100% checklist hoàn thành, hồ sơ chuyển sang `TERMINATED`, lưu trữ dữ liệu an toàn tối thiểu 5 năm phục vụ tra cứu pháp lý.
