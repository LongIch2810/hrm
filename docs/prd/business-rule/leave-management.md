# Business Rules — Leave Management

- **Module ID:** LEAVE
- **Parent Spec:** docs/PRD.md#8.3
- **Traces-To:** docs/prd/function-requirement/leave-management.md
- **Use Cases:** docs/prd/usecase/leave-management.md
- **Core Workflow:** docs/prd/workflow/leave-approval-workflow.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-LEAVE-001: Cấp phát, tích lũy và tính toán số ngày nghỉ phép

- **Nội dung quy tắc:**
  - **Hạn mức chuẩn:** 12 ngày phép năm/năm theo Luật Lao động Việt Nam, cộng thêm 1 ngày mỗi 5 năm thâm niên làm việc liên tục.
  - **Cơ chế tích lũy:** Tích lũy dần 1 ngày/tháng làm việc thực tế.
  - **Chuyển phép năm cũ:** Cho phép chuyển tối đa 5 ngày phép còn thừa sang năm sau; hạn chót sử dụng là hết ngày 31/03 năm kế tiếp, sau thời điểm này số phép tồn tự động hủy.
  - **Đơn vị nghỉ tối thiểu:** Cho phép nghỉ 0.5 ngày (nửa ngày buổi sáng hoặc buổi chiều) hoặc nguyên ngày (1.0 ngày).
  - **Ngày không trừ phép:** Ngày nghỉ hàng tuần (Thứ Bảy, Chủ Nhật) và các ngày lễ, tết theo quy định nhà nước không bị tính trừ vào số ngày nghỉ phép năm.
- **Hành vi khi vi phạm:** Báo lỗi `INSUFFICIENT_LEAVE_BALANCE` nếu số ngày xin nghỉ vượt quá số dư khả dụng.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-015).

### BR-LEAVE-002: Quy trình phê duyệt và xử lý trạng thái đơn

- **Nội dung quy tắc:**
  - **Vòng đời trạng thái đơn:** `Draft` $\rightarrow$ `Pending` $\rightarrow$ `Approved` / `Rejected` / `Cancelled`.
  - **Cơ chế phê duyệt 1 cấp:** Quản lý trực tiếp (Department Manager) của nhân viên là người duy nhất phê duyệt; khi Manager nhấn `Approved`, hệ thống lập tức trừ quỹ phép và tự động ghi nhận vào bảng chấm công; HR Staff có quyền xem và giám sát toàn công ty.
  - **Tạm giữ số dư (Hold balance):** Khi đơn ở trạng thái `Pending`, số ngày phép tương ứng bị tạm giữ để ngăn chặn tạo nhiều đơn vượt quá số dư.
  - **Hoàn trả số dư:** Nếu đơn bị `Rejected` hoặc `Cancelled` trước thời điểm nghỉ, số ngày phép tạm giữ được hoàn trả 100% vào số dư khả dụng.
  - **Hủy đơn:** Nhân viên chỉ được tự hủy đơn khi đơn ở trạng thái `Pending` hoặc trước ngày nghỉ bắt đầu; không cho phép tự hủy đơn trong quá khứ.
- **Hành vi khi vi phạm:** Báo lỗi `CANNOT_CANCEL_PAST_LEAVE` nếu nhân viên hủy đơn sau ngày đã nghỉ.
- **Trạng thái xác nhận:** Confirmed bởi Product Owner (PD-016).

### BR-AUTH-001: Phân quyền duyệt đơn nghỉ phép

- **Employee:** Chỉ được tạo đơn, hủy đơn của mình trước khi duyệt, và xem số dư phép cá nhân.
- **Department Manager:** Duyệt/từ chối đơn của nhân viên cấp dưới trực tiếp.
- **HR Staff:** Xem toàn bộ lịch nghỉ toàn công ty và quản lý danh mục loại nghỉ phép.
