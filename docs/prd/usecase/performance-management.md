# 7.8. Performance Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/performance-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Đánh giá hiệu suất nhân sự (PERF).

- **Phạm vi module:** Thiết lập mục tiêu công việc (KPI định lượng và OKR định tính), phê duyệt mục tiêu đầu kỳ, tổ chức kỳ đánh giá định kỳ (6 tháng/1 năm), quy trình 3 bước (Tự đánh giá → Quản lý đánh giá → Khóa kết quả), tính điểm trọng số, xếp loại và lưu trữ lịch sử đánh giá.
- **Actors liên quan:**
  - `Employee`: Đăng ký mục tiêu đầu kỳ, cập nhật tiến độ, tự chấm điểm (Self-assessment), xem phản hồi và gửi khiếu nại nếu có.
  - `Department Manager`: Duyệt mục tiêu nhân viên đầu kỳ, chấm điểm hiệu suất, viết nhận xét phản hồi ưu/nhược điểm cho nhân viên thuộc phòng mình.
  - `HR Staff / Ban Giám Đốc`: Khởi tạo kỳ đánh giá, giám sát tiến độ, cân đối tỷ lệ phân bổ xếp loại toàn công ty và khóa kết quả đánh giá.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-PERF-001 | As a HR Staff, I want quản lý danh mục tiêu chí đánh giá chuẩn hóa theo từng khối/vị trí (năng lực chuyên môn, tiến độ công việc, thái độ hợp tác), So that việc đánh giá có thước đo thống nhất. | FR-PERF-001 | Danh mục tiêu chí phân loại rõ ràng; gán thang điểm chuẩn từ 1 đến 5 sao. |
| US-PERF-002 | As an Employee và Department Manager, I want cùng thống nhất thiết lập các mục tiêu KPI/OKR đầu kỳ với tổng trọng số đúng 100%, So that nhân viên nắm rõ mục tiêu trọng tâm cần đạt được. | FR-PERF-002 | Hệ thống kiểm tra tổng trọng số bắt buộc = 100%; Manager bấm duyệt để khóa mục tiêu kỳ. |
| US-PERF-003 | As a HR Staff, I want mở các kỳ đánh giá định kỳ (nửa năm hoặc cuối năm) kèm thời hạn cụ thể cho từng bước, So that toàn thể nhân sự thực hiện đánh giá đồng bộ và đúng tiến độ. | FR-PERF-003 | Thiết lập deadline cho bước Tự đánh giá (5 ngày), Quản lý đánh giá (7 ngày), Tiếp nhận khiếu nại (5 ngày). |
| US-PERF-004 | As an Employee, I want tự chấm điểm hiệu suất của bản thân (thang điểm 1.0 - 5.0) và đính kèm minh chứng kết quả đạt được, So that tôi chủ động nhìn nhận lại đóng góp của mình trong kỳ. | FR-PERF-004 | Bắt buộc nhập nhận xét giải trình cho các mục tiêu tự chấm điểm cao (>= 4.5) hoặc thấp (<= 2.0). |
| US-PERF-005 | As a Department Manager, I want chấm điểm và viết nhận xét chi tiết điểm mạnh, điểm cần cải thiện cho từng nhân viên phòng mình, So that việc đánh giá mang tính xây dựng và công tâm. | FR-PERF-005 | Chỉ hiển thị nhân viên thuộc phòng ban mình; lưu vết lịch sử chấm điểm; không để lộ trước khi công bố. |
| US-PERF-006 | As a Hệ thống tự động, I want tính toán điểm tổng hợp có trọng số giữa điểm tự đánh giá và điểm của quản lý theo công thức chuẩn, So that kết quả tổng kết chính xác tuyệt đối. | FR-PERF-006 | Điểm tổng kết = $\sum (\text{Điểm tiêu chí} \times \text{Trọng số})$; làm tròn 2 chữ số thập phân. |
| US-PERF-007 | As a HR Staff / Hệ thống, I want tự động xếp loại nhân viên thành 5 mức chuẩn (Xuất sắc, Tốt, Đạt, Cần cải thiện, Không đạt), So that làm căn cứ xét thưởng, tăng lương và quy hoạch nhân sự. | FR-PERF-007 | Thang xếp loại: A (Xuất sắc >= 4.5), B (Tốt 3.8 - 4.4), C (Đạt 3.0 - 3.7), D (Cải thiện 2.0 - 2.9), E (Không đạt < 2.0). |
| US-PERF-008 | As an Employee và HR Staff, I want xem toàn bộ lịch sử điểm và xếp loại qua các năm kèm nhận xét của quản lý, So that theo dõi được biểu đồ tăng trưởng năng lực của nhân sự. | FR-PERF-008 | Hiển thị dạng biểu đồ đường phát triển năng lực qua các năm; bảo mật chỉ nhân viên và HR/Manager xem được. |

---

## 2. Use Case Đặc tả chi tiết

### UC-PERF-001: Thiết lập và phê duyệt mục tiêu đầu kỳ (KPI / OKR)

- **Mã FR:** FR-PERF-001, FR-PERF-002.
- **Actor:** Employee (soạn mục tiêu), Department Manager (phê duyệt).
- **Tiền điều kiện:** Đầu kỳ đánh giá (Tháng 1 hoặc Tháng 7 hàng năm).
- **Dữ liệu đầu vào (Input Fields):**
  - Tên mục tiêu / Kết quả then chốt (Key Result).
  - Loại mục tiêu (Định lượng - KPI hoặc Định tính - OKR).
  - Chỉ số đo lường (Chỉ tiêu, Đơn vị tính, Deadline).
  - Trọng số phần trăm (`weight_percentage`: từ 10% đến 40% mỗi mục).
- **Luồng sự kiện chính (Basic Flow):**
  1. Employee mở mục "Đánh giá hiệu suất" > chọn "Mục tiêu kỳ mới".
  2. Employee tạo từ 3 đến 5 mục tiêu trọng tâm trong kỳ.
  3. Employee phân bổ trọng số cho từng mục tiêu (ví dụ: Mục tiêu 1: 30%, Mục tiêu 2: 30%, Mục tiêu 3: 40%).
  4. Hệ thống kiểm tra: $\sum \text{weight} == 100\%$.
  5. Employee nhấn "Gửi Quản lý duyệt mục tiêu".
  6. Department Manager nhận thông báo, mở xem danh sách mục tiêu và trao đổi với nhân viên nếu cần điều chỉnh.
  7. Manager nhấn "Phê duyệt mục tiêu".
  8. Hệ thống khóa danh sách mục tiêu của nhân viên trong kỳ đó (chuyển sang `Confirmed`).
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Tổng trọng số khác 100%:* Hệ thống chặn gửi và cảnh báo: "Tổng trọng số hiện tại là X%, vui lòng điều chỉnh để đạt chính xác 100%".
- **Hậu điều kiện:** Mục tiêu kỳ được khóa, làm căn cứ chấm điểm vào cuối kỳ.

---

### UC-PERF-002: Khởi tạo và điều phối kỳ đánh giá hiệu suất

- **Mã FR:** FR-PERF-003.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Đến thời điểm đánh giá định kỳ (kết thúc quý 2 hoặc kết thúc năm).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff vào menu "Kỳ đánh giá" và nhấn "Tạo kỳ đánh giá mới".
  2. HR Staff nhập: Tên kỳ (ví dụ: `Đánh giá hiệu suất năm 2026`), Năm đánh giá, Phạm vi áp dụng (Toàn công ty).
  3. Thiết lập các mốc thời gian:
     - Hạn chót Nhân viên tự đánh giá: Ngày DD/MM/YYYY.
     - Hạn chót Quản lý hoàn thành đánh giá: Ngày DD/MM/YYYY.
     - Thời hạn tiếp nhận khiếu nại: 5 ngày làm việc kể từ ngày công bố.
  4. HR Staff nhấn "Kích hoạt kỳ đánh giá".
  5. Hệ thống gửi thông báo In-App và Email đồng loạt cho toàn bộ nhân viên: "Kỳ đánh giá hiệu suất đã mở, vui lòng hoàn tất tự đánh giá trước hạn chót".
- **Hậu điều kiện:** Kỳ đánh giá ở trạng thái `Active`, toàn bộ nhân viên có thể vào điền phiếu.

---

### UC-PERF-003: Nhân viên thực hiện Tự đánh giá (Self-Assessment)

- **Mã FR:** FR-PERF-004.
- **Actor:** Employee.
- **Tiền điều kiện:** Kỳ đánh giá đang mở; nhân viên đã có mục tiêu được duyệt.
- **Luồng sự kiện chính (Basic Flow):**
  1. Employee mở phiếu tự đánh giá của kỳ hiện tại.
  2. Hệ thống hiển thị danh sách các mục tiêu KPI/OKR đã được duyệt đầu kỳ kèm trọng số.
  3. Đối với từng mục tiêu:
     - Employee chọn điểm tự chấm (Thang điểm 1.0 đến 5.0, bước nhảy 0.1).
     - Employee nhập báo cáo tóm tắt kết quả đạt được thực tế so với chỉ tiêu ban đầu và tải lên link/tệp minh chứng nếu có.
  4. Employee tự đánh giá phần Kỹ năng & Thái độ làm việc.
  5. Employee nhấn "Hoàn thành và Gửi đánh giá".
  6. Hệ thống khóa phiếu của nhân viên (không thể tự sửa điểm) và gửi thông báo cho Department Manager.
- **Hậu điều kiện:** Bản tự đánh giá được chuyển giao cho Manager chấm điểm tiếp theo.

---

### UC-PERF-004: Quản lý trực tiếp chấm điểm và phản hồi hiệu suất

- **Mã FR:** FR-PERF-005, FR-PERF-006, FR-PERF-007.
- **Actor:** Department Manager.
- **Tiền điều kiện:** Nhân viên đã hoàn tất gửi phiếu tự đánh giá.
- **Luồng sự kiện chính (Basic Flow):**
  1. Manager mở danh sách nhân viên cần đánh giá của phòng mình.
  2. Manager chọn một nhân viên để mở phiếu đánh giá.
  3. Giao diện hiển thị đối chiếu 2 cột:
     - Cột 1: Điểm và minh chứng tự đánh giá của Nhân viên.
     - Cột 2: Cột chấm điểm của Quản lý.
  4. Manager nhập điểm đánh giá của mình cho từng mục tiêu (1.0 - 5.0).
  5. Manager bắt buộc nhập nhận xét định tính:
     - **Ưu điểm & Đóng góp nổi bật:** Những thành tích và điểm mạnh trong kỳ.
     - **Điểm cần cải thiện & Khắc phục:** Những hạn chế cần khắc phục trong kỳ tới.
     - **Kế hoạch phát triển năng lực:** Khóa đào tạo hoặc kỹ năng cần trau dồi.
  6. Manager nhấn "Lưu và Hoàn tất đánh giá".
  7. Hệ thống tự động tính toán Điểm tổng kết:
     $$\text{Điểm cuối cùng} = \sum (\text{Điểm Manager} \times \text{Trọng số})$$
  8. Hệ thống tự động gán Xếp loại sơ bộ (A, B, C, D, E) theo ngưỡng điểm chuẩn.
- **Hậu điều kiện:** Kết quả đánh giá của phòng ban hoàn thành, gửi về HR Staff để tổng hợp toàn công ty.

---

### UC-PERF-005: Khóa kỳ đánh giá và công bố kết quả

- **Mã FR:** FR-PERF-006, FR-PERF-007, FR-PERF-008.
- **Actor:** HR Staff, Ban Giám Đốc.
- **Tiền điều kiện:** 100% các phòng ban đã hoàn thành chấm điểm.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở Bảng phân phối xếp loại toàn công ty (Kiểm tra biểu đồ hình chuông: Tỷ lệ loại A Xuất sắc khoảng 10-15%, loại B khoảng 40-50%, loại C khoảng 30-40%, loại D/E dưới 5%).
  2. Ban Giám Đốc rà soát lần cuối và nhấn "Khóa kỳ đánh giá & Công bố kết quả".
  3. Hệ thống đổi trạng thái kỳ đánh giá sang `Closed`.
  4. Hệ thống gửi thông báo riêng tư tới từng nhân viên: "Kết quả đánh giá hiệu suất kỳ [X] đã được công bố, vui lòng xem chi tiết".
  5. Nhân viên mở xem điểm tổng kết, xếp loại chính thức và toàn văn nhận xét của Quản lý.
  6. Nếu nhân viên không đồng ý với kết quả: Nhân viên có 5 ngày làm việc để nhấn nút "Gửi khiếu nại đánh giá" kèm lý do và chứng cứ để HR và Quản lý đối chất xử lý.
- **Hậu điều kiện:** Kết quả hiệu suất được lưu trữ vĩnh viễn vào hồ sơ nhân sự, phục vụ trực tiếp cho xét tăng lương và thưởng cuối năm.
