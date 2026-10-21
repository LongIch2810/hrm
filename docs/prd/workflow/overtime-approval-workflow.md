# 9.4. Overtime Approval Workflow

[Quay lại Mục lục Workflows](index.md) | [Xem Use Cases Chấm công](../usecase/attendance-management.md)

Tài liệu này đặc tả quy trình đăng ký, phê duyệt và đối soát giờ làm thêm (Overtime - OT) trong hệ thống HRM.

- **Liên kết chức năng:** FR-ATT-007, FR-ATT-010, FR-PAY-003.
- **Trạng thái:** Confirmed — Approved by Product Owner (`PD-010`, `PD-014`). Làm tròn thời gian làm thêm theo block 30 phút; bắt buộc phải có đơn đăng ký được Quản lý trực tiếp phê duyệt trước mới được ghi nhận giờ OT vào bảng công và bảng lương.

---

## 1. Sơ đồ quy trình (Workflow Diagram)

```mermaid
flowchart TD
    A["Phát sinh nhu cầu làm thêm giờ theo yêu cầu dự án/công việc"] --> B["Employee tạo Đơn đăng ký làm thêm giờ (OT) trước giờ làm"]
    B --> C["Nhập: Ngày làm thêm, Giờ bắt đầu, Giờ kết thúc, Lý do & Hạng mục việc"]
    C --> D["Hệ thống làm tròn dự kiến theo block 30 phút & gửi thông báo tới Manager"]
    D --> E["Department Manager rà soát tính cần thiết & khối lượng việc"]
    E --> F{"Manager phê duyệt đơn OT?"}
    F -- "Từ chối (Reject)" --> G["Đơn chuyển sang REJECTED kèm lý do; Gửi thông báo cho nhân viên"]
    G --> H["Thời gian làm ngoài giờ không được tính công OT"]
    F -- "Phê duyệt (Approve)" --> I["Đơn chuyển sang APPROVED; Sẵn sàng đối soát thực tế"]
    I --> J["Đến ngày làm thêm: Nhân viên thực hiện Check-in / Check-out"]
    J --> K["Hệ thống đối soát giữa Giờ OT đăng ký và Giờ quẹt thẻ thực tế"]
    K --> L["Tính số giờ OT thực tế hợp lệ (Lấy min giữa giờ duyệt và giờ làm thực tế)"]
    L --> M["Làm tròn block 30 phút & áp dụng hệ số (Ngày thường x1.5, Cuối tuần x2.0)"]
    M --> N["Tổng hợp vào Bảng công tháng (ATT) & Chốt chuyển sang Bảng lương (PAY)"]
```

---

## 2. Các giai đoạn nghiệp vụ chi tiết

### Giai đoạn 1: Đăng ký đơn làm thêm giờ
1. Trước khi làm việc ngoài giờ quy định (sau 17:30 ngày làm việc hoặc vào các ngày Thứ Bảy, Chủ Nhật), Employee mở form "Đăng ký làm thêm giờ (OT)".
2. Employee chọn Ngày làm việc, nhập Giờ bắt đầu, Giờ kết thúc, Lý do làm thêm và Dự án/Hạng mục phụ trách.
3. Hệ thống tự động tính thời lượng dự kiến và làm tròn theo block 30 phút (ví dụ: làm từ 18:00 đến 19:40 được tính là 1.5 giờ / 90 phút; 10 phút lẻ bỏ qua).
4. Employee bấm "Gửi đơn phê duyệt". Đơn ở trạng thái `PENDING`.

### Giai đoạn 2: Quản lý phòng ban phê duyệt
1. Department Manager nhận được thông báo In-App và Email có đơn OT mới.
2. Manager xem xét khối lượng công việc, tính cấp bách và thời lượng làm thêm.
3. Manager đưa ra quyết định:
   - **Phê duyệt (`APPROVED`):** Đơn được chấp thuận, kích hoạt cơ chế theo dõi chấm công OT.
   - **Từ chối (`REJECTED`):** Bắt buộc nhập lý do từ chối. Nhân viên nhận thông báo và thời gian làm ngoài giờ sẽ không được tính tiền OT.

### Giai đoạn 3: Đối soát chấm công thực tế & Tổng hợp tính lương
1. Vào ngày làm thêm, nhân viên phải thực hiện Check-in và Check-out đầy đủ trên hệ thống hoặc máy chấm công.
2. Hệ thống chạy thuật toán đối soát:
   - Số giờ OT ghi nhận = $\min(\text{Số giờ theo đơn được duyệt}, \text{Số giờ quẹt thẻ thực tế})$.
   - Nếu nhân viên về sớm hơn giờ đăng ký: Chỉ tính theo thời gian quẹt thẻ thực tế.
   - Nếu nhân viên về muộn hơn giờ đăng ký: Chỉ tính tối đa bằng số giờ đã được Manager duyệt trước đó.
3. Cuối tháng, hệ thống tự động tổng hợp toàn bộ số giờ OT đã đối soát vào Bảng tổng hợp công tháng (`ATT`), phân loại theo hệ số lương:
   - Làm thêm ngày thường: Nhân hệ số 150% (x1.5).
   - Làm thêm ngày nghỉ cuối tuần (Thứ 7, CN): Nhân hệ số 200% (x2.0).
   - Làm thêm ngày lễ, tết: Nhân hệ số 300% (x3.0).
4. Số giờ OT này được khóa cùng bảng công và tự động đẩy sang module Tính lương (`PAY`) để chi trả trong kỳ lương.
