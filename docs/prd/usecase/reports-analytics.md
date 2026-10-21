# 7.11. Reports & Analytics — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/reports-analytics.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Báo cáo và Phân tích nhân sự (REP).

- **Phạm vi module:** Bảng điều khiển (Dashboard) KPI nhân sự thời gian thực, báo cáo cơ cấu tổ chức, chấm công, chuyên cần, nghỉ phép, hiệu quả tuyển dụng, chi phí quỹ lương, biến động nhân sự và phân tích tỷ lệ thôi việc (Turnover Rate).
- **Actors liên quan:**
  - `Ban Giám Đốc` (Executive / CEO): Toàn quyền xem Dashboard tổng thể toàn công ty, phân tích chi phí nhân sự và quỹ lương cấp cao.
  - `HR Manager`: Toàn quyền xem, cấu hình và xuất tất cả các báo cáo nhân sự, tuyển dụng, tiền lương và biến động.
  - `Department Manager`: Chỉ xem Dashboard và các báo cáo chấm công, nghỉ phép, biến động thuộc phạm vi nhân viên phòng ban mình trực tiếp quản lý (không xem báo cáo lương chi tiết).
  - `HR Staff`: Tổng hợp dữ liệu và xuất các báo cáo chuyên đề định dạng Excel (.xlsx) và PDF.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-REP-001 | As a Ban Giám Đốc và HR Manager, I want Dashboard tổng quan hiển thị các chỉ số nhân sự cốt lõi thời gian thực (Tổng nhân sự, Có mặt hôm nay, Đang nghỉ phép, Vị trí đang tuyển), So that tôi nắm bắt nhanh sức khỏe tổ chức chỉ trong 5 giây. | FR-REP-001 | Tải trang dưới 1.5 giây; dữ liệu cập nhật theo thời gian thực; widget trực quan với icon và màu sắc rõ ràng. |
| US-REP-002 | As a HR Manager, I want thống kê quy mô và phân bổ nhân sự theo loại hợp đồng (Thử việc, Chính thức) và trạng thái làm việc qua từng tháng, So that theo dõi được sự tăng trưởng lực lượng lao động. | FR-REP-002 | Hiển thị biểu đồ cột hoặc đường biến động quy mô nhân sự qua 12 tháng gần nhất. |
| US-REP-003 | As a Department Manager và HR Manager, I want biểu đồ cơ cấu nhân sự theo từng phòng ban và tỷ lệ Nam/Nữ, So that đánh giá được sự cân đối nguồn lực và đa dạng giới trong doanh nghiệp. | FR-REP-003 | Biểu đồ tròn (Pie chart) phân bổ tỷ trọng nhân lực giữa các phòng ban; Manager chỉ xem phòng mình. |
| US-REP-004 | As a HR Manager, I want báo cáo thống kê tuyển dụng (số lượng CV nhận được, tỷ lệ chuyển đổi qua các vòng, thời gian tuyển trung bình và nguồn tuyển hiệu quả nhất), So that tối ưu hóa chi phí và kênh tuyển dụng. | FR-REP-004 | Biểu đồ hình phễu (Funnel chart) tỷ lệ rớt/đạt qua các vòng; tính chi phí trung bình để tuyển thành công 1 nhân sự. |
| US-REP-005 | As a Department Manager và HR Manager, I want báo cáo thống kê nghỉ phép và phân bổ ngày nghỉ phép theo từng loại phép, So that chủ động bố trí nhân lực và dự phòng mùa cao điểm nghỉ phép. | FR-REP-005 | Thống kê số ngày phép đã dùng, số ngày phép tồn trung bình theo phòng ban và theo tháng. |
| US-REP-006 | As a Department Manager và HR Manager, I want báo cáo chấm công chi tiết về tỷ lệ đi làm đúng giờ, số lần đi muộn, về sớm và tổng số giờ làm thêm OT, So that giám sát kỷ luật lao động và chi phí làm thêm giờ. | FR-REP-006 | Thống kê top nhân viên đi muộn nhiều nhất và tổng số giờ OT theo từng bộ phận; lọc theo khoảng ngày. |
| US-REP-007 | As a Ban Giám Đốc và HR Manager, I want báo cáo phân tích chi phí quỹ lương qua các kỳ (Lương cơ bản, Lương OT, Thưởng, Trích nộp BHXH công ty, Thuế TNCN), So that kiểm soát ngân sách tiền lương của doanh nghiệp. | FR-REP-007 | Bảo mật nghiêm ngặt theo RBAC; chỉ Giám đốc và HR Manager có quyền truy cập; ẩn dữ liệu đối với Department Manager. |
| US-REP-008 | As a HR Manager và Ban Giám Đốc, I want thống kê biến động nhân sự (số lượng nhân sự mới tiếp nhận Onboarding vs số lượng nhân sự thôi việc Offboarding theo từng quý), So that nhận diện xu hướng phát triển tổ chức. | FR-REP-008 | Hiển thị biểu đồ tăng trưởng ròng (Net Headcount Growth = Nhân sự mới - Nhân sự nghỉ). |
| US-REP-009 | As a Ban Giám Đốc và HR Manager, I want phân tích tỷ lệ thôi việc (Turnover Rate) chuẩn hóa theo tháng/quý/năm và phân loại theo lý do nghỉ việc chính, So that có chính sách giữ chân nhân tài kịp thời. | FR-REP-009 | Tính theo công thức chuẩn: (Số nghỉ trong kỳ / Số nhân sự trung bình) * 100%; biểu đồ lý do nghỉ việc (Lương, Môi trường, Cá nhân). |
| US-REP-010 | As a Tất cả các cấp quản lý theo quyền, I want kết xuất các bảng báo cáo ra file Excel (.xlsx) chuẩn form và file PDF có tiêu đề công ty, So that phục vụ lưu trữ quản trị và họp giao ban. | FR-REP-010 | Xuất file nhanh chóng; dữ liệu xuất khớp 100% với bộ lọc trên màn hình; áp dụng che dữ liệu nhạy cảm theo quyền. |

---

## 2. Use Case Đặc tả chi tiết

### UC-REP-001: Khai thác Dashboard tổng quan nhân sự

- **Mã FR:** FR-REP-001, FR-REP-002, FR-REP-003.
- **Actor:** Ban Giám Đốc, HR Manager, Department Manager (theo phạm vi phòng ban).
- **Tiền điều kiện:** Người dùng có quyền truy cập báo cáo tổng quan.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor truy cập màn hình chính "Báo cáo tổng quan" (Dashboard).
  2. Hệ thống kiểm tra vai trò người dùng (`PD-028`):
     - *Ban Giám Đốc / HR Manager:* Hệ thống tính toán trên toàn bộ dữ liệu công ty.
     - *Department Manager:* Hệ thống tự động gắn điều kiện lọc `department_id = manager.department_id`.
  3. Màn hình hiển thị các thẻ chỉ số chính (KPI Cards):
     - **Tổng nhân sự:** Số lượng nhân viên đang hoạt động (`Active` + `Probation`).
     - **Chuyên cần hôm nay:** Tỷ lệ nhân viên đã check-in / Tổng số nhân viên phải đi làm.
     - **Nghỉ phép hôm nay:** Số nhân viên có đơn nghỉ phép được duyệt trong ngày.
     - **Vị trí đang tuyển:** Số lượng Job Openings đang mở (dành cho HR/Giám Đốc).
  4. Hiển thị các biểu đồ trực quan:
     - Biểu đồ tròn: Phân bổ nhân sự theo phòng ban.
     - Biểu đồ cột: Biến động nhân sự qua 6 tháng gần nhất.
     - Biểu đồ donut: Cơ cấu nhân sự theo độ tuổi và thâm niên.
  5. Actor có thể chọn bộ lọc Thời gian (Tháng này, Quý này, Năm nay) để hệ thống tự động làm mới các widget.
- **Hậu điều kiện:** Lãnh đạo nắm bắt được bức tranh tổng thể nguồn nhân lực thời gian thực.

---

### UC-REP-002: Báo cáo chuyên cần và chấm công phòng ban

- **Mã FR:** FR-REP-005, FR-REP-006.
- **Actor:** Department Manager, HR Manager.
- **Tiền điều kiện:** Dữ liệu chấm công và nghỉ phép được ghi nhận.
- **Dữ liệu đầu vào (Input Fields):** Khoảng thời gian (Từ ngày - Đến ngày), Phòng ban, Loại báo cáo (Đi muộn / Về sớm / Làm thêm giờ OT / Nghỉ phép).
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor chọn mục "Báo cáo chuyên cần & Chấm công".
  2. Chọn tháng cần phân tích và chọn phòng ban.
  3. Hệ thống tổng hợp dữ liệu từ module `ATT` và `LEAVE`, hiển thị:
     - **Tỷ lệ đúng giờ (On-time Rate):** Phần trăm ngày công đúng giờ của toàn bộ phận.
     - **Top đi muộn:** Danh sách nhân viên có số lần đi muộn nhiều nhất kèm số phút muộn lũy kế.
     - **Tổng giờ OT:** Tổng số giờ làm thêm đã được phê duyệt trong tháng theo từng nhóm việc.
     - **Phân bổ ngày nghỉ:** Số ngày phép năm đã sử dụng, số ngày nghỉ ốm, số ngày nghỉ không lương.
  4. Actor có thể nhấn vào từng dòng nhân viên để xem bảng công chi tiết từng ngày.
  5. Actor nhấn "Xuất báo cáo chuyên cần (Excel)" để lưu trữ.
- **Hậu điều kiện:** Quản lý có căn cứ số liệu chính xác để chấn chỉnh kỷ luật lao động và đánh giá KPI.

---

### UC-REP-003: Phân tích tỷ lệ thôi việc (Turnover Rate) và biến động nhân sự

- **Mã FR:** FR-REP-008, FR-REP-009.
- **Actor:** Ban Giám Đốc, HR Manager.
- **Tiền điều kiện:** Dữ liệu tiếp nhận nhân sự (`ONB`) và thôi việc (`ONB`) đã được ghi nhận qua các tháng.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor mở mục "Báo cáo biến động nhân sự & Tỷ lệ thôi việc".
  2. Chọn Khoảng thời gian phân tích (ví dụ: Năm tài chính 2026).
  3. Hệ thống tính toán công thức chuẩn hóa theo `PD-027`:
     $$\text{Số nhân sự TB trong kỳ} = \frac{\text{Số nhân sự đầu kỳ} + \text{Số nhân sự cuối kỳ}}{2}$$
     $$\text{Turnover Rate (\%)} = \frac{\text{Tổng số nhân sự thôi việc trong kỳ}}{\text{Số nhân sự TB trong kỳ}} \times 100\%$$
  4. Hệ thống trực quan hóa:
     - Biểu đồ đường kép (Double Line Chart): Đường màu xanh (Nhân sự mới gia nhập), Đường màu đỏ (Nhân sự thôi việc) theo từng tháng.
     - Biểu đồ cột: Tỷ lệ thôi việc theo từng phòng ban (để nhận diện bộ phận nào có tỷ lệ nghỉ việc bất thường).
     - Biểu đồ phân tích lý do nghỉ việc (Career growth, Compensation, Management, Personal reason).
  5. Lãnh đạo dựa vào số liệu để đưa ra các biện pháp giữ chân nhân tài và điều chỉnh chính sách đãi ngộ.
- **Hậu điều kiện:** Cung cấp thông tin chiến lược quan trọng cho Ban Điều Hành.

---

### UC-REP-004: Báo cáo phân tích chi phí quỹ lương và bảo hiểm

- **Mã FR:** FR-REP-007.
- **Actor:** Ban Giám Đốc, HR Manager.
- **Tiền điều kiện:** Các kỳ lương đã được chốt và khóa (`Closed`).
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor mở mục "Báo cáo tài chính nhân sự & Quỹ lương".
  2. Hệ thống kiểm tra quyền: Nếu là `Department Manager` hoặc `Employee` truy cập, hệ thống chặn ngay với mã `403 FORBIDDEN` (`FORBIDDEN_RESOURCE`).
  3. Với Giám Đốc và HR Manager, hệ thống hiển thị:
     - Biểu đồ cột chồng (Stacked Bar Chart) biến động chi phí lương qua 12 tháng:
       - Phần lương cơ bản.
       - Phần tiền làm thêm giờ (OT).
       - Phần phụ cấp và thưởng.
       - Phần chi phí bảo hiểm công ty đóng (21.5%).
     - Bảng cơ cấu chi phí lương theo từng phòng ban và tỷ trọng % trên tổng quỹ lương.
     - Dự báo chi phí quỹ lương cho quý tiếp theo dựa trên kế hoạch tuyển dụng.
  4. Actor nhấn "Xuất báo cáo quỹ lương (PDF)" có chữ ký số để nộp cho Hội Đồng Quản Trị.
- **Hậu điều kiện:** Chi phí nhân sự được kiểm soát chặt chẽ, tối ưu hóa ngân sách hoạt động.

---

### UC-REP-005: Xuất dữ liệu báo cáo đa chiều định dạng Excel / PDF

- **Mã FR:** FR-REP-010.
- **Actor:** Ban Giám Đốc, HR Manager, Department Manager.
- **Tiền điều kiện:** Đang xem một bảng dữ liệu báo cáo cụ thể.
- **Luồng sự kiện chính (Basic Flow):**
  1. Actor tùy chỉnh bộ lọc dữ liệu trên màn hình (Khoảng ngày, Phòng ban, Trạng thái).
  2. Actor nhấn nút "Xuất dữ liệu" và chọn định dạng:
     - `Excel (.xlsx)`: Phục vụ tính toán và tổng hợp dữ liệu nâng cao.
     - `PDF (.pdf)`: Phục vụ in ấn, báo cáo giao ban với header logo công ty và bảng dữ liệu căn chỉnh trang chuẩn A4.
  3. Hệ thống xử lý:
     - Áp dụng kỹ thuật Masking: Che giấu số CCCD, tài khoản ngân hàng và mức lương chi tiết nếu người xuất không có quyền tài chính.
     - Sinh tệp tin hoàn chỉnh và kích hoạt tải xuống trình duyệt của người dùng.
     - Ghi audit log sự kiện `EXPORT_REPORT` kèm tên báo cáo và các điều kiện lọc.
- **Hậu điều kiện:** Tệp báo cáo được xuất thành công, dữ liệu an toàn và chính xác.
