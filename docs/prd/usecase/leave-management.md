# 7.4. Leave Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/leave-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý nghỉ phép (LEAVE).

- **Phạm vi module:** Tạo đơn xin nghỉ phép, phê duyệt 1 cấp trực tiếp, quản lý quỹ số dư phép năm, danh mục loại phép, lịch nghỉ toàn phòng ban và thống kê đối soát nghỉ phép.
- **Actors liên quan:**
  - `Employee`: Tạo đơn xin nghỉ phép, hủy đơn đang chờ, theo dõi tiến độ duyệt, tra cứu số dư ngày phép cá nhân và xem lịch nghỉ.
  - `Department Manager`: Xem xét, phê duyệt hoặc từ chối đơn nghỉ phép của nhân viên thuộc phòng ban mình trực tiếp quản lý; xem lịch nghỉ của phòng ban để điều phối nhân sự.
  - `HR Staff`: Quản lý danh mục loại nghỉ phép, điều chỉnh số dư phép hàng năm (tích lũy thâm niên, chuyển phép tồn sang năm sau), thống kê và xuất báo cáo nghỉ phép.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-LEAVE-001 | As an Employee, I want tạo đơn xin nghỉ phép trực tuyến và chọn loại phép phù hợp (Phép năm, Nghỉ ốm, Việc riêng, Không lương), So that tôi có thể xin nghỉ đúng quy định mà không cần viết đơn giấy. | FR-LEAVE-001 | Hệ thống tự động tính số ngày nghỉ loại trừ Thứ 7, Chủ Nhật và ngày lễ; kiểm tra số dư phép trước khi cho nộp. |
| US-LEAVE-002 | As an Employee / HR Staff, I want xem danh sách lịch sử các đơn nghỉ phép đã gửi qua các kỳ, So that tôi tra cứu được thời gian đã nghỉ và lý do cụ thể. | FR-LEAVE-002 | Hiển thị đầy đủ thông tin: Mã đơn, Loại phép, Thời gian nghỉ, Số ngày, Trạng thái, Người duyệt và Ngày duyệt. |
| US-LEAVE-003 | As an Employee, I want theo dõi trạng thái đơn nghỉ phép theo thời gian thực (Pending, Approved, Rejected, Cancelled) và có thể hủy đơn khi còn chờ duyệt, So that tôi chủ động sắp xếp kế hoạch cá nhân. | FR-LEAVE-003 | Khi hủy đơn ở trạng thái Pending, trạng thái đổi sang Cancelled; nếu đơn đã duyệt muốn hủy phải có xác nhận của Manager. |
| US-LEAVE-004 | As a Department Manager, I want phê duyệt đơn xin nghỉ phép của nhân sự trực thuộc với 1 click, So that đơn được xử lý nhanh chóng, trừ phép ngay và tự động cập nhật vào bảng chấm công. | FR-LEAVE-004 | Duyệt 1 cấp trực tiếp theo `PD-016`; hệ thống tự động trừ quỹ phép năm và ghi nhận ngày nghỉ có lương vào bảng công ATT. |
| US-LEAVE-005 | As a Department Manager, I want từ chối đơn xin nghỉ phép kèm theo lý do giải thích cụ thể, So that nhân viên hiểu rõ lý do (ví dụ: trùng lịch dự án, không có người thay thế) và điều chỉnh lịch nghỉ. | FR-LEAVE-005 | Bắt buộc nhập lý do từ chối (tối thiểu 10 ký tự); đơn chuyển sang `REJECTED`, quỹ phép không bị trừ, gửi thông báo ngay cho nhân viên. |
| US-LEAVE-006 | As a HR Staff, I want quản lý danh mục các loại nghỉ phép (tên, hưởng lương hay không, tỷ lệ % lương, trừ phép năm hay không), So that các chính sách nghỉ phép tuân thủ Luật Lao động Việt Nam. | FR-LEAVE-006 | Hỗ trợ cấu hình: Phép năm (hưởng 100% lương, trừ quỹ), Nghỉ ốm BHXH (hưởng BHXH, không trừ phép năm), Nghỉ không lương (0% lương). |
| US-LEAVE-007 | As an Employee, I want xem chi tiết số dư quỹ phép năm của mình (Tổng phép được cấp, Phép thâm niên, Phép đã dùng, Phép tồn năm trước, Số ngày còn lại khả dụng), So that tôi lên kế hoạch nghỉ phép hợp lý. | FR-LEAVE-007 | Số dư phép năm tính tự động 12 ngày/năm + 1 ngày mỗi 5 năm thâm niên; phép tồn năm trước hết hạn vào ngày 31/03 hàng năm. |
| US-LEAVE-008 | As a Department Manager / Employee, I want xem Lịch nghỉ phép phòng ban dạng Calendar, So that nắm bắt được ai đang nghỉ trong ngày để sắp xếp công việc và không phê duyệt trùng lặp gây thiếu người. | FR-LEAVE-008 | Hiển thị dạng lịch tháng; đánh dấu tên nhân viên và loại nghỉ phép; chỉ xem trong phạm vi phòng ban mình. |
| US-LEAVE-009 | As a HR Staff, I want xuất báo cáo thống kê tình hình nghỉ phép theo tháng/quý/năm của từng bộ phận, So that đánh giá tỷ lệ vắng mặt và phục vụ quyết toán phép cuối năm. | FR-LEAVE-009 | Báo cáo phân tích tổng số ngày nghỉ theo từng loại phép, từng phòng ban; hỗ trợ xuất file Excel (.xlsx). |

---

## 2. Use Case Đặc tả chi tiết

### UC-LEAVE-001: Tạo và nộp đơn xin nghỉ phép

- **Mã FR:** FR-LEAVE-001, FR-LEAVE-007.
- **Actor chính:** Employee.
- **Actor phụ:** System (tính toán số ngày, kiểm tra số dư).
- **Tiền điều kiện:** Nhân viên đã đăng nhập; có hợp đồng lao động đang hoạt động (`Active`).
- **Dữ liệu đầu vào (Input Fields):**
  - Loại nghỉ phép (`leave_type_id`): Phép năm (Annual Leave), Nghỉ ốm (Sick Leave), Việc riêng có lương (Kết hôn, Tang chế), Nghỉ không lương (Unpaid Leave).
  - Từ ngày (`start_date`) và Đến ngày (`end_date`).
  - Phạm vi thời gian (`duration_type`): Cả ngày (Full day), Buổi sáng (Morning - 0.5 ngày), Buổi chiều (Afternoon - 0.5 ngày).
  - Lý do xin nghỉ (`reason`): Văn bản bắt buộc.
  - Người bàn giao công việc (`handover_employee_id`): Tùy chọn.
  - Tài liệu đính kèm (Giấy khám bệnh/chứng từ y tế nếu nghỉ ốm > 2 ngày): Tùy chọn (PDF/Ảnh <= 5MB).
- **Luồng sự kiện chính (Basic Flow):**
  1. Employee truy cập chức năng "Tạo đơn xin nghỉ phép".
  2. Hệ thống hiển thị số dư phép năm hiện tại của nhân viên (Số ngày khả dụng).
  3. Employee chọn Loại nghỉ phép, chọn khoảng thời gian nghỉ và phạm vi buổi nghỉ.
  4. Hệ thống tự động tính toán số ngày nghỉ thực tế (`calculated_days`):
     - Loại bỏ các ngày Thứ Bảy, Chủ Nhật.
     - Loại bỏ các ngày nghỉ Lễ, Tết theo quy định nhà nước.
  5. Employee nhập lý do nghỉ và chọn người bàn giao công việc (nếu có).
  6. Employee nhấn nút "Gửi đơn nghỉ phép".
  7. Hệ thống kiểm tra ràng buộc nghiệp vụ (`BR-LEAVE-001`):
     - Ngày kết thúc >= Ngày bắt đầu.
     - Nếu là loại "Phép năm": Kiểm tra `calculated_days <= available_leave_balance`. Nếu không đủ số dư, chặn lại và thông báo.
     - Kiểm tra không trùng lặp thời gian với các đơn nghỉ phép khác đang ở trạng thái `Pending` hoặc `Approved`.
  8. Hệ thống lưu bản ghi vào bảng `leave_requests` với trạng thái `PENDING`.
  9. Hệ thống gửi thông báo chuông (In-App) và email tới Department Manager phụ trách trực tiếp phòng ban của nhân viên.
  10. Hệ thống hiển thị thông báo thành công: "Đơn xin nghỉ phép đã được gửi tới Quản lý để phê duyệt".
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Không đủ số dư phép năm:* Hệ thống báo lỗi `400 BAD_REQUEST` (`INSUFFICIENT_LEAVE_BALANCE`: "Số ngày phép còn lại (X ngày) không đủ để xin nghỉ (Y ngày). Vui lòng chọn loại Nghỉ không lương hoặc điều chỉnh thời gian").
  - *E2 - Trùng thời gian nghỉ:* Hệ thống báo lỗi `409 CONFLICT` (`OVERLAPPING_LEAVE_REQUEST`: "Bạn đã có đơn nghỉ phép trong khoảng thời gian này").
- **Hậu điều kiện:** Đơn nghỉ phép ở trạng thái `Pending`, xuất hiện trong danh sách chờ duyệt của Manager.

---

### UC-LEAVE-002: Phê duyệt hoặc từ chối đơn nghỉ phép (Luồng 1 cấp)

- **Mã FR:** FR-LEAVE-004, FR-LEAVE-005.
- **Actor:** Department Manager.
- **Tiền điều kiện:** Có đơn xin nghỉ phép ở trạng thái `PENDING` thuộc phòng ban của Manager.
- **Luồng sự kiện chính (Basic Flow):**
  1. Manager nhận thông báo có đơn mới và truy cập "Danh sách đơn cần duyệt".
  2. Manager mở chi tiết đơn: xem họ tên nhân viên, loại phép, thời gian, số ngày, lý do và người bàn giao.
  3. Manager mở tab "Lịch nghỉ phòng ban" để xem trong khoảng thời gian đó có bao nhiêu nhân viên cùng phòng đang nghỉ để đánh giá nguồn lực.
  4. **Kịch bản 1 - Phê duyệt:**
     - Manager nhấn nút "Phê duyệt" (Approve) và nhập ghi chú (tùy chọn).
     - Hệ thống thực hiện transaction:
       - Cập nhật trạng thái đơn thành `APPROVED`, ghi nhận `approved_by` và `approved_at`.
       - Nếu là loại trừ phép năm: Trừ trực tiếp `calculated_days` vào số dư phép của nhân viên trong bảng `employee_leave_balances`.
       - Đồng bộ trạng thái vào bảng chấm công `attendance_records` các ngày tương ứng (đánh dấu công phép có lương `LEAVE_PAID` hoặc không lương `LEAVE_UNPAID`).
     - Gửi email và thông báo In-App cho Employee: "Đơn xin nghỉ phép của bạn đã được phê duyệt".
  5. **Kịch bản 2 - Từ chối:**
     - Manager nhấn nút "Từ chối" (Reject).
     - Hệ thống hiển thị modal yêu cầu nhập lý do từ chối (bắt buộc).
     - Manager nhập lý do và bấm "Xác nhận từ chối".
     - Hệ thống đổi trạng thái đơn thành `REJECTED`, lưu lý do vào `rejection_reason`.
     - Quỹ phép năm của nhân viên không bị trừ.
     - Gửi thông báo cho Employee kèm lý do từ chối.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Phê duyệt đơn ngoài phòng ban quản lý:* Hệ thống từ chối với lỗi `403 FORBIDDEN` (`FORBIDDEN_RESOURCE`).
- **Hậu điều kiện:** Đơn nghỉ phép hoàn tất quy trình phê duyệt, trạng thái công và số dư phép được cập nhật nhất quán.

---

### UC-LEAVE-003: Hủy đơn nghỉ phép

- **Mã FR:** FR-LEAVE-003.
- **Actor:** Employee (hủy đơn cá nhân), Department Manager (hủy đơn đã duyệt nếu nhân viên đi làm lại).
- **Tiền điều kiện:** Đơn nghỉ phép tồn tại trong hệ thống.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor mở đơn nghỉ phép cần hủy.
  2. **Trường hợp đơn đang ở trạng thái `PENDING`:**
     - Employee chỉ cần nhấn nút "Hủy đơn".
     - Hệ thống chuyển trạng thái đơn sang `CANCELLED`.
     - Thông báo cho Manager rằng nhân viên đã tự rút đơn.
  3. **Trường hợp đơn đã ở trạng thái `APPROVED` (nhân viên thay đổi kế hoạch và đi làm lại):**
     - Employee nhấn "Yêu cầu hủy đơn đã duyệt" kèm lý do.
     - Yêu cầu được gửi đến Department Manager để xác nhận.
     - Khi Manager xác nhận đồng ý hủy:
       - Trạng thái đơn đổi thành `CANCELLED`.
       - Hệ thống hoàn trả lại số ngày phép đã trừ vào quỹ phép của nhân viên (`leave_balance += calculated_days`).
       - Xóa đánh dấu ngày nghỉ phép trong bảng chấm công `attendance_records` để nhân viên chấm công bình thường.
- **Hậu điều kiện:** Số dư phép và bảng chấm công được hoàn nguyên chính xác.

---

### UC-LEAVE-004: Theo dõi quỹ số dư phép năm cá nhân

- **Mã FR:** FR-LEAVE-007.
- **Actor:** Employee, HR Staff.
- **Tiền điều kiện:** Người dùng đã xác thực.
- **Luồng sự kiện chính (Basic Flow):**
  1. Người dùng mở mục "Quỹ ngày phép".
  2. Hệ thống hiển thị bảng đồng hồ chỉ số trực quan:
     - **Tổng ngày phép năm hiện hành:** 12 ngày (chuẩn Luật Lao động).
     - **Ngày phép thâm niên:** +1 ngày cho mỗi đủ 5 năm công tác.
     - **Ngày phép chuyển từ năm trước:** (Phép tồn năm trước, có hạn dùng đến 31/03 năm nay).
     - **Tổng số ngày phép được hưởng:** Tổng các mục trên.
     - **Số ngày đã sử dụng:** Tổng số ngày trong các đơn `APPROVED`.
     - **Số ngày đang chờ duyệt:** Tổng số ngày trong các đơn `PENDING`.
     - **Số ngày phép còn lại khả dụng:** (Tổng được hưởng - Đã dùng - Chờ duyệt).
  3. Hiển thị bảng chi tiết lịch sử cộng/trừ ngày phép theo thời gian thực.
- **Hậu điều kiện:** Nhân viên nắm rõ quyền lợi ngày nghỉ của mình.

---

### UC-LEAVE-005: Xem lịch nghỉ phép phòng ban (Team Calendar)

- **Mã FR:** FR-LEAVE-008.
- **Actor:** Tất cả nhân viên trong phòng ban, Department Manager.
- **Tiền điều kiện:** Thuộc một phòng ban xác định.
- **Luồng sự kiện chính (Basic Flow):**
  1. Người dùng vào mục "Lịch nghỉ phép phòng ban".
  2. Hệ thống tải dữ liệu các đơn nghỉ phép đã được duyệt (`APPROVED`) của tất cả các đồng nghiệp trong cùng phòng ban.
  3. Hiển thị dạng Calendar tháng:
     - Mỗi ngày hiển thị danh sách các nhân viên nghỉ phép.
     - Nhấp vào một sự kiện để xem người bàn giao công việc và khoảng thời gian nghỉ (Buổi sáng / Chiều / Cả ngày).
  4. Quản lý sử dụng lịch này để cân đối phân công công việc khi duyệt đơn mới.
- **Hậu điều kiện:** Kế hoạch vận hành và công việc nhóm không bị gián đoạn.
