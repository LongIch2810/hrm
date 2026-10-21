# 7.5. Payroll Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/payroll-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý lương (PAY).

- **Phạm vi module:** Quản lý kỳ lương, thông tin lương cơ bản, tính toán lương tự động từ dữ liệu công/phép, phụ cấp, thưởng, khấu trừ, trích nộp bảo hiểm bắt buộc (10.5%), thuế TNCN lũy tiến, khóa kỳ lương và phát hành phiếu lương (Payslip).
- **Actors liên quan:**
  - `HR Staff` (Payroll Specialist): Thiết lập cấu hình lương, phụ cấp, nhập thưởng/khấu trừ, thực thi tính toán lương dự thảo, đối soát bảng lương.
  - `HR Manager / Ban Giám Đốc`: Rà soát bảng lương tổng hợp, phê duyệt và thực hiện Khóa kỳ lương (`Closed`), duyệt mở khóa khi có sai sót đặc biệt.
  - `Employee`: Xem và tải phiếu lương điện tử cá nhân bảo mật (Read-only, không xem lương của đồng nghiệp).

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-PAY-001 | As a HR Staff, I want cấu hình thông tin lương cơ bản, mức đóng bảo hiểm và tài khoản ngân hàng của nhân viên theo hợp đồng lao động, So that hệ thống có căn cứ tính lương chuẩn xác. | FR-PAY-001 | Dữ liệu lương lưu trữ bảo mật (mã hóa dữ liệu nhạy cảm); chỉ HR có thẩm quyền mới được truy cập xem/sửa. |
| US-PAY-002 | As a HR Staff, I want tạo kỳ lương theo tháng (kỳ công từ ngày 1 đến ngày cuối tháng), So that chu trình tính và trả lương diễn ra đúng hạn vào ngày 5 hàng tháng. | FR-PAY-002 | Kỳ lương hỗ trợ các trạng thái: `Draft` (Dự thảo), `Approved` (Đã duyệt), `Closed` (Đã khóa); không cho phép tạo trùng kỳ lương. |
| US-PAY-003 | As a HR Staff, I want hệ thống tự động tính toán lương Gross, tiền công thực tế, phụ cấp, trích nộp bảo hiểm, thuế TNCN và lương Net, So that giảm thiểu 95% sai sót tính toán thủ công bằng Excel. | FR-PAY-003 | Làm tròn 0 chữ số thập phân (VNĐ); đối soát chính xác theo công thức lương đã được phê duyệt. |
| US-PAY-004 | As a HR Staff, I want quản lý danh mục và gán các khoản phụ cấp (ăn trưa, xăng xe, điện thoại, phụ cấp trách nhiệm), So that các khoản phụ cấp chịu thuế và miễn thuế được phân loại đúng luật. | FR-PAY-004 | Phụ cấp ăn trưa (tối đa 730k/tháng) được miễn thuế TNCN; các khoản phụ cấp khác tính vào thu nhập chịu thuế. |
| US-PAY-005 | As a HR Staff, I want nhập các khoản thưởng (thưởng KPI, thưởng dự án, thưởng lễ tết) cho nhân viên trong kỳ, So that các khoản thu nhập bổ sung được chi trả đầy đủ. | FR-PAY-005 | Tiền thưởng được cộng vào thu nhập trước thuế; lưu trữ căn cứ và quyết định khen thưởng. |
| US-PAY-006 | As a HR Staff, I want ghi nhận các khoản khấu trừ (tạm ứng lương, bồi thường tài sản, công nợ) vào bảng lương của nhân viên, So that các nghĩa vụ tài chính của nhân viên được trừ trực tiếp vào lương Net. | FR-PAY-006 | Khấu trừ không được vượt quá giới hạn theo quy định Luật Lao động; trừ trực tiếp vào thu nhập sau thuế. |
| US-PAY-007 | As a Hệ thống tự động, I want tính thuế thu nhập cá nhân theo biểu thuế lũy tiến từng phần sau khi đã trừ giảm trừ gia cảnh (11tr cho bản thân, 4.4tr/người phụ thuộc), So that nghĩa vụ thuế tuân thủ pháp luật Việt Nam. | FR-PAY-007 | Thuế tính chính xác theo 7 bậc lũy tiến hiện hành; căn cứ vào số lượng người phụ thuộc đã đăng ký hợp lệ. |
| US-PAY-008 | As a Hệ thống tự động, I want trích đóng bảo hiểm bắt buộc người lao động (8% BHXH, 1.5% BHYT, 1% BHTN = tổng 10.5%), So that việc trích nộp BHXH chính xác trên mức lương đóng bảo hiểm. | FR-PAY-008 | Mức trích tối đa không vượt quá 20 lần mức lương cơ sở theo quy định của Luật Bảo hiểm xã hội. |
| US-PAY-009 | As a HR Staff / Hệ thống, I want tự động sinh Phiếu lương điện tử (Payslip) cho từng nhân viên ngay sau khi bảng lương được khóa, So that nhân sự nhận được chi tiết thu nhập minh bạch. | FR-PAY-009 | Phiếu lương hiển thị chi tiết các dòng thu nhập, khấu trừ và lương thực nhận; gửi email hoặc thông báo In-App bảo mật. |
| US-PAY-010 | As an Employee, I want xem và tải phiếu lương cá nhân của các tháng trước đó dưới dạng PDF, So that tôi có thể theo dõi thu nhập và lưu trữ chứng từ tài chính cá nhân. | FR-PAY-010 | Chỉ xem được phiếu lương của chính mình; không thể xem phiếu lương của nhân viên khác kể cả khi đổi tham số URL. |
| US-PAY-011 | As a HR Manager / Giám Đốc, I want xem Bảng lương tổng hợp toàn công ty theo từng phòng ban, So that kiểm soát tổng quỹ lương và phê duyệt chi trả lương hàng tháng. | FR-PAY-011 | Thống kê tổng quỹ lương Gross, tổng bảo hiểm trích đóng, tổng thuế TNCN khấu trừ và tổng tiền Net cần giải ngân. |

---

## 2. Use Case Đặc tả chi tiết

### UC-PAY-001: Khởi tạo kỳ lương và chạy tính toán lương tự động

- **Mã FR:** FR-PAY-002, FR-PAY-003, FR-PAY-007, FR-PAY-008.
- **Actor:** HR Staff (chuyên viên tính lương).
- **Actor phụ:** System (tính toán toán học).
- **Tiền điều kiện:**
  - Tháng chấm công tương ứng (`ATT`) đã được chốt và khóa (`LOCKED`).
  - Hợp đồng lao động và mức lương cơ bản đã được thiết lập.
- **Dữ liệu đầu vào (Input Fields):** Tháng kỳ lương (`YYYY-MM`), Ngày bắt đầu kỳ (`YYYY-MM-01`), Ngày kết thúc kỳ, Ngày dự kiến chi trả (`mùng 5`).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở mục "Quản lý lương" > "Kỳ lương" và nhấn "Tạo kỳ lương mới".
  2. HR Staff chọn Tháng lương (ví dụ: `2026-10`), hệ thống mặc định chu kỳ từ `2026-10-01` đến `2026-10-31`, ngày chi trả `2026-11-05`.
  3. Hệ thống tạo kỳ lương ở trạng thái `Draft` (Dự thảo).
  4. HR Staff nhấn nút "Chạy tính toán lương".
  5. Hệ thống thực hiện batch processing xử lý tuần tự từng nhân viên đang hoạt động:
     - **Bước 1: Lấy dữ liệu công & phép:**
       - Số ngày công chuẩn của tháng ($W_{std}$, ví dụ: 22 ngày).
       - Số ngày công thực tế ($W_{act}$ từ module `ATT`).
       - Số ngày nghỉ phép hưởng nguyên lương ($L_{paid}$ từ module `LEAVE`).
       - Số giờ làm thêm giờ ($H_{ot}$ từ module `ATT`, phân bổ OT ngày thường x1.5, OT cuối tuần x2.0).
     - **Bước 2: Tính lương thời gian:**
       $$\text{Lương ngày công} = \frac{\text{Lương cơ bản}}{W_{std}} \times (W_{act} + L_{paid})$$
       $$\text{Tiền làm thêm OT} = \left(\frac{\text{Lương cơ bản}}{W_{std} \times 8}\right) \times (\sum H_{ot} \times \text{Hệ số})$$
     - **Bước 3: Cộng phụ cấp và thưởng:**
       $$\text{Tổng thu nhập (Gross)} = \text{Lương ngày công} + \text{Tiền OT} + \text{Tổng phụ cấp} + \text{Tổng thưởng}$$
     - **Bước 4: Trích đóng bảo hiểm (10.5% người lao động):**
       $$\text{BHXH (8\%)} = \text{Lương đóng BH} \times 8\%$$
       $$\text{BHYT (1.5\%)} = \text{Lương đóng BH} \times 1.5\%$$
       $$\text{BHTN (1\%)} = \text{Lương đóng BH} \times 1\%$$
       $$\text{Tổng bảo hiểm} = \text{BHXH} + \text{BHYT} + \text{BHTN}$$
     - **Bước 5: Tính Thuế TNCN lũy tiến:**
       $$\text{Thu nhập chịu thuế} = \text{Tổng thu nhập} - \text{Phụ cấp miễn thuế} - \text{Tổng bảo hiểm} - 11.000.000 - (\text{Số người phụ thuộc} \times 4.400.000)$$
       - Nếu Thu nhập chịu thuế > 0: Áp dụng biểu thuế 7 bậc lũy tiến tính ra số thuế TNCN phải nộp.
       - Nếu <= 0: Thuế TNCN = 0.
     - **Bước 6: Tính Lương thực nhận (Net):**
       $$\text{Lương Net} = \text{Tổng thu nhập} - \text{Tổng bảo hiểm} - \text{Thuế TNCN} - \text{Tổng các khoản khấu trừ}$$
       - Làm tròn tiền đến hàng đơn vị VNĐ (0 chữ số thập phân, `ROUND`).
  6. Hệ thống lưu kết quả tính toán chi tiết vào bảng `payroll_items`.
  7. Hệ thống hiển thị Bảng lương dự thảo và thanh tiến độ hoàn thành tính toán 100%.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Bảng công chưa chốt:* Nếu module ATT của tháng đó chưa chuyển sang `LOCKED`, hệ thống cảnh báo và yêu cầu HR chốt công trước khi tính lương để tránh dữ liệu biến động.
- **Hậu điều kiện:** Bảng tính lương dự thảo được tạo, sẵn sàng để đối soát.

---

### UC-PAY-002: Quản lý phụ cấp, thưởng và khấu trừ trong kỳ

- **Mã FR:** FR-PAY-004, FR-PAY-005, FR-PAY-006.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Kỳ lương đang ở trạng thái `Draft`.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff vào màn hình chi tiết kỳ lương dự thảo.
  2. Chọn tab "Khoản thu nhập bổ sung & Khấu trừ".
  3. **Thêm Thưởng / Phụ cấp đặc biệt:**
     - HR Staff chọn nhân viên, chọn loại (Thưởng dự án, Thưởng KPI, Phụ cấp công tác xa).
     - Nhập số tiền và ghi chú lý do.
     - Bấm "Lưu".
  4. **Thêm Khấu trừ:**
     - Chọn nhân viên, chọn loại khấu trừ (Tạm ứng trước, Trừ tiền hỏng tài sản).
     - Nhập số tiền khấu trừ.
  5. HR Staff nhấn nút "Cập nhật và tính lại lương" (Recalculate).
  6. Hệ thống chạy lại công thức cho các nhân viên có phát sinh thay đổi và cập nhật lại lương Net.
- **Hậu điều kiện:** Các khoản thưởng, phạt và phụ cấp được đưa vào bảng lương kỳ chính xác.

---

### UC-PAY-003: Phê duyệt, Khóa kỳ lương và xuất báo cáo quỹ lương

- **Mã FR:** FR-PAY-002, FR-PAY-011.
- **Actor:** HR Manager / Ban Giám Đốc.
- **Tiền điều kiện:** Bảng lương dự thảo đã được HR Staff kiểm tra và gửi yêu cầu phê duyệt.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Manager / Giám Đốc mở kỳ lương cần duyệt.
  2. Hệ thống hiển thị Bảng tổng hợp quỹ lương:
     - Tổng số nhân viên hưởng lương trong kỳ.
     - Tổng chi phí lương Gross của công ty.
     - Tổng nghĩa vụ BHXH (phần công ty đóng 21.5% + phần người lao động 10.5%).
     - Tổng thuế TNCN nộp ngân sách nhà nước.
     - Tổng tiền thực chi trả vào tài khoản nhân viên (Net Total).
  3. Cấp quản lý kiểm tra chi tiết bảng lương theo từng phòng ban.
  4. Nếu thông tin chính xác, Manager nhấn nút "Phê duyệt & Khóa kỳ lương" (`Close Payroll`).
  5. Hệ thống yêu cầu xác nhận lần cuối bằng hộp thoại bảo mật.
  6. Sau khi xác nhận:
     - Kỳ lương đổi trạng thái sang `Closed` (Đã khóa).
     - Toàn bộ các bản ghi lương trong kỳ trở thành bất biến (Không ai có thể thêm/sửa/xóa).
     - Tự động kích hoạt job phát sinh Phiếu lương điện tử (`Payslips`) cho từng nhân viên.
     - Ghi audit log chi tiết hành động phê duyệt của Manager.
  7. Manager nhấn "Xuất bảng lương ngân hàng" (file Excel ủy nhiệm chi theo form Vietcombank, Techcombank, MB...) để gửi ngân hàng giải ngân.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Bảng lương chưa cân đối:* Nếu Manager phát hiện sai sót, bấm "Yêu cầu tính lại" kèm ghi chú. Bảng lương quay về trạng thái `Draft` cho HR Staff điều chỉnh.
- **Hậu điều kiện:** Kỳ lương được khóa vĩnh viễn, dữ liệu sẵn sàng chuyển giao thanh toán.

---

### UC-PAY-004: Phát hành và tra cứu phiếu lương cá nhân (Payslip)

- **Mã FR:** FR-PAY-009, FR-PAY-010.
- **Actor:** Employee (xem của mình), HR Staff (xem toàn bộ).
- **Tiền điều kiện:** Kỳ lương đã ở trạng thái `Closed`.
- **Luồng sự kiện chính (Basic Flow):**
  1. Khi kỳ lương được khóa, hệ thống tự động sinh bản ghi phiếu lương trong bảng `payslips` và gửi thông báo chuông In-App cùng email: "Phiếu lương tháng YYYY-MM của bạn đã có, vui lòng kiểm tra".
  2. Employee đăng nhập vào tài khoản của mình và vào menu "Phiếu lương cá nhân".
  3. Hệ thống hiển thị danh sách các kỳ lương đã nhận.
  4. Employee chọn kỳ lương muốn xem.
  5. Màn hình Phiếu lương chi tiết hiển thị:
     - **Thông tin nhân sự:** Họ tên, Mã NV, Chức vụ, Phòng ban, Số tài khoản.
     - **Bảng công tháng:** Số công chuẩn, Số công thực tế, Số giờ OT, Ngày nghỉ phép.
     - **Khoản thu nhập (Cột cộng):** Lương cơ bản, Lương ngày công, Lương làm thêm giờ, Phụ cấp ăn trưa, Phụ cấp khác, Tiền thưởng.
     - **Khoản khấu trừ (Cột trừ):** BHXH (8%), BHYT (1.5%), BHTN (1%), Thuế TNCN, Tạm ứng/khấu trừ khác.
     - **Lương thực nhận (Net):** Số tiền lớn, bôi đậm màu xanh nổi bật.
  6. Employee có thể nhấn nút "Tải phiếu lương (PDF)" để lưu trữ.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Truy cập trái phép phiếu lương người khác:* Nếu Employee đổi tham số `payslip_id` trên URL hoặc API để xem lương đồng nghiệp, hệ thống kiểm tra quyền sở hữu (`payslip.employee_id == currentUser.employee_id`) và từ chối ngay lập tức với mã `403 FORBIDDEN` (`FORBIDDEN_RESOURCE`).
- **Hậu điều kiện:** Nhân viên nắm bắt chi tiết thu nhập của mình một cách hoàn toàn riêng tư và bảo mật.

---

### UC-PAY-005: Mở khóa kỳ lương đặc biệt khi có giải trình

- **Mã FR:** FR-PAY-002.
- **Actor:** Ban Giám Đốc / HR Manager.
- **Tiền điều kiện:** Kỳ lương đang ở trạng thái `Closed` nhưng phát hiện sai sót nghiêm trọng sau khi chốt.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor có thẩm quyền cấp cao chọn chức năng "Mở khóa kỳ lương đặc biệt".
  2. Hệ thống hiển thị cảnh báo rủi ro bảo mật tài chính: "Mở khóa kỳ lương sẽ cho phép tính toán lại dữ liệu và ảnh hưởng đến phiếu lương đã phát hành."
  3. Actor bắt buộc nhập Văn bản giải trình lý do mở khóa và xác thực bằng mật khẩu quản trị.
  4. Hệ thống chuyển trạng thái kỳ lương về lại `Draft`.
  5. Hệ thống ghi một bản ghi Audit log mức độ cảnh báo cao (`HIGH_SEVERITY_AUDIT`) lưu lại ID người mở khóa, thời gian và toàn văn lý do giải trình.
- **Hậu điều kiện:** Kỳ lương được mở để sửa chữa, toàn bộ quy trình được giám sát nghiêm ngặt.
