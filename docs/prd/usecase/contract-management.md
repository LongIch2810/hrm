# 7.9. Contract Management — Use Cases

[Quay lại Mục lục Use Cases](index.md) | [Xem Yêu cầu chức năng](../function-requirement/contract-management.md)

Tài liệu này đặc tả chi tiết User Stories và kịch bản Use Cases cho phân hệ Quản lý hợp đồng lao động (CON).

- **Phạm vi module:** Quản lý vòng đời hợp đồng lao động, phân loại hợp đồng, thời hạn, phụ lục hợp đồng, cảnh báo gia hạn tự động, lưu trữ scan hợp đồng và truy xuất lịch sử hợp đồng.
- **Actors liên quan:**
  - `HR Staff`: Toàn quyền soạn thảo hợp đồng, tạo phụ lục, cập nhật lương/vị trí trên hợp đồng, tải tài liệu scan và thực thi thủ tục gia hạn/thanh lý.
  - `Department Manager`: Xem thời hạn hợp đồng của nhân viên trong phòng ban để chủ động đề xuất tái ký hoặc kết thúc hợp đồng.
  - `Employee`: Xem chi tiết hợp đồng hiện tại và các phụ lục cá nhân đã ký (Read-only).
  - `Ban Giám Đốc / HR Manager`: Phê duyệt các hợp đồng có mức lương hoặc điều khoản đặc thù.

---

## 1. User Stories

| Mã Story | Nội dung User Story | Mã FR | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| US-CON-001 | As a HR Staff, I want tạo mới hợp đồng lao động với số hợp đồng duy nhất và đầy đủ các điều khoản cơ bản (lương, vị trí, địa điểm), So that việc thiết lập quan hệ lao động hợp pháp và minh bạch. | FR-CON-001 | Số hợp đồng không trùng lặp; mỗi nhân viên chỉ có duy nhất 1 hợp đồng ở trạng thái `Active` tại một thời điểm. |
| US-CON-002 | As a HR Staff, I want quản lý 3 loại hợp đồng chuẩn theo Bộ luật Lao động (Thử việc, Xác định thời hạn, Không xác định thời hạn), So that loại hình hợp đồng tuân thủ đúng khung pháp lý Việt Nam. | FR-CON-002 | Thử việc tối đa 60 ngày cho vị trí chuyên môn, 30 ngày cho vị trí khác; hợp đồng có thời hạn từ 12 đến 36 tháng; hợp đồng không thời hạn không bắt buộc ngày kết thúc. |
| US-CON-003 | As a HR Staff, I want theo dõi chính xác ngày bắt đầu và ngày kết thúc hiệu lực của từng hợp đồng, So that quản lý được thời gian làm việc và quyền lợi tương ứng của nhân viên. | FR-CON-003 | Ngày kết thúc phải lớn hơn ngày bắt đầu; hệ thống hiển thị số ngày còn lại đến hạn hết hợp đồng. |
| US-CON-004 | As a HR Staff, I want tạo phụ lục hợp đồng gắn với hợp đồng gốc khi có thay đổi về mức lương, chức danh hoặc địa điểm làm việc, So that các điều chỉnh đãi ngộ được lưu vết pháp lý chặt chẽ mà không phải ký lại hợp đồng mới. | FR-CON-004 | Phụ lục có số riêng; kế thừa các điều khoản không đổi từ hợp đồng gốc; tự động cập nhật mức lương mới vào hồ sơ nhân sự. |
| US-CON-005 | As a HR Staff và Department Manager, I want hệ thống tự động gửi cảnh báo qua Email và Dashboard khi hợp đồng sắp hết hạn trước 30 ngày, So that chúng tôi kịp thời đánh giá và chuẩn bị thủ tục tái ký hoặc bàn giao. | FR-CON-005 | Job tự động chạy quét hàng ngày lúc 00:00; tạo danh sách cảnh báo tập trung trên Dashboard HR. |
| US-CON-006 | As a HR Staff, I want thực hiện quy trình gia hạn hợp đồng (ký tiếp hợp đồng có thời hạn lần 2 hoặc chuyển sang hợp đồng vô thời hạn), So that nhân viên tiếp tục cống hiến mà không bị gián đoạn quan hệ lao động. | FR-CON-006 | Sau 2 lần ký hợp đồng có thời hạn, hệ thống bắt buộc chuyển sang loại Không xác định thời hạn theo Luật Lao động. |
| US-CON-007 | As a HR Staff, I want tải lên và lưu trữ an toàn tệp PDF scan hợp đồng đã có đầy đủ chữ ký và con dấu pháp nhân, So that hồ sơ pháp lý số hóa có thể đối chiếu bất cứ lúc nào khi thanh tra. | FR-CON-007 | File PDF dung lượng tối đa 5MB; lưu trữ trong private cloud storage; chỉ HR và chủ hợp đồng có quyền xem/tải. |
| US-CON-008 | As a HR Staff và Employee, I want xem toàn bộ lịch sử các đời hợp đồng và phụ lục đã từng ký từ ngày đầu vào làm việc, So that quá trình cống hiến và tăng lương của nhân viên được theo dõi xuyên suốt. | FR-CON-008 | Hiển thị dạng Timeline thời gian từ cũ nhất đến mới nhất; đánh dấu trạng thái `Expired`, `Terminated`, `Active`. |
| US-CON-009 | As a HR Staff, I want quản lý trạng thái hợp đồng (Draft, Active, Expired, Terminated), So that hệ thống phản ánh đúng hiệu lực pháp lý và đồng bộ sang trạng thái nhân viên EMP. | FR-CON-009 | Khi chấm dứt hợp đồng (`Terminated`), trạng thái nhân viên tự động đồng bộ sang chuẩn bị nghỉ việc (`ONB`). |

---

## 2. Use Case Đặc tả chi tiết

### UC-CON-001: Tạo mới và kích hoạt hợp đồng lao động

- **Mã FR:** FR-CON-001, FR-CON-002, FR-CON-003, FR-CON-009.
- **Actor chính:** HR Staff.
- **Tiền điều kiện:** Hồ sơ nhân viên đã tồn tại trên hệ thống.
- **Dữ liệu đầu vào (Input Fields):**
  - Số hợp đồng (`contract_number`): Chuỗi văn bản duy nhất (ví dụ: `HĐLĐ-2026/001`).
  - ID nhân viên (`employee_id`).
  - Loại hợp đồng (`contract_type`): `PROBATION` (Thử việc), `DEFINITE` (Có thời hạn), `INDEFINITE` (Không xác định thời hạn).
  - Ngày ký (`signed_date`), Ngày bắt đầu hiệu lực (`start_date`), Ngày hết hạn (`end_date` - bắt buộc với thử việc và có thời hạn).
  - Chức danh công việc (`job_title`), Phòng ban (`department_id`).
  - Mức lương cơ bản đóng bảo hiểm (`base_salary`), Các khoản phụ cấp cố định.
  - Địa điểm làm việc, Chế độ làm việc (Toàn thời gian).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở hồ sơ nhân viên, chọn tab "Hợp đồng" và nhấn "Tạo hợp đồng mới".
  2. HR Staff nhập số hợp đồng và chọn Loại hợp đồng:
     - Nếu chọn `PROBATION`: Hệ thống giới hạn tối đa 60 ngày cho vị trí chuyên môn, 30 ngày cho vị trí khác.
     - Nếu chọn `DEFINITE`: Hệ thống cho phép chọn thời hạn từ 12 đến 36 tháng.
     - Nếu chọn `INDEFINITE`: Trường ngày hết hạn tự động bị vô hiệu hóa (`null`).
  3. HR Staff nhập các mức đãi ngộ: Lương cơ bản, Phụ cấp, Ngày bắt đầu làm việc.
  4. HR Staff nhấn "Lưu bản thảo" hoặc "Kích hoạt hợp đồng":
     - Nếu "Lưu bản thảo": Hợp đồng ở trạng thái `Draft`, chưa có hiệu lực pháp lý.
     - Nếu "Kích hoạt hợp đồng": Hệ thống kiểm tra:
       - Nhân viên hiện tại chưa có hợp đồng nào đang ở trạng thái `Active`.
       - Số hợp đồng là duy nhất trong toàn hệ thống.
       - Ngày hết hạn phải lớn hơn ngày bắt đầu.
  5. Hệ thống lưu bản ghi vào bảng `contracts`, đặt trạng thái `Active`.
  6. Hệ thống đồng bộ mức lương cơ bản sang hồ sơ lương của nhân viên để sẵn sàng cho module PAY.
  7. Ghi audit log tạo mới hợp đồng lao động.
- **Luồng ngoại lệ (Exception Flows):**
  - *E1 - Nhân viên đã có hợp đồng Active:* Hệ thống từ chối kích hoạt với lỗi `409 CONFLICT` (`ACTIVE_CONTRACT_EXISTS`: "Nhân viên đang có một hợp đồng còn hiệu lực. Vui lòng thanh lý hoặc chuyển hợp đồng cũ sang Expired trước khi kích hoạt hợp đồng mới").
  - *E2 - Trùng số hợp đồng:* Báo lỗi `409 CONFLICT` (`DUPLICATE_CONTRACT_NUMBER`).
- **Hậu điều kiện:** Hợp đồng có hiệu lực pháp lý, làm nguồn dữ liệu chuẩn cho lương và nhân sự.

---

### UC-CON-002: Tạo phụ lục điều chỉnh hợp đồng lao động

- **Mã FR:** FR-CON-004.
- **Actor:** HR Staff.
- **Tiền điều kiện:** Hợp đồng chính đang ở trạng thái `Active`.
- **Dữ liệu đầu vào:** ID hợp đồng gốc, Số phụ lục, Ngày ký phụ lục, Ngày hiệu lực, Nội dung điều chỉnh (Mức lương mới, Chức vụ mới, hoặc Gia hạn thêm thời gian).
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở hợp đồng đang hoạt động của nhân viên và chọn "Thêm phụ lục hợp đồng".
  2. HR Staff nhập Số phụ lục (ví dụ: `PLHĐ-01/2026/001`) và Ngày hiệu lực.
  3. HR Staff chọn loại điều chỉnh:
     - "Điều chỉnh lương": Nhập mức lương cơ bản mới.
     - "Điều chỉnh chức danh/phòng ban": Chọn chức danh mới.
     - "Gia hạn thời gian": Chọn ngày kết thúc mới.
  4. HR Staff nhập tóm tắt lý do điều chỉnh và bấm "Lưu phụ lục".
  5. Hệ thống lưu bản ghi vào bảng `contract_appendices` liên kết với `contract_id`.
  6. Nếu có thay đổi lương: Hệ thống tự động cập nhật mức lương mới vào hồ sơ nhân viên kể từ ngày phụ lục có hiệu lực.
  7. Ghi audit log tạo phụ lục hợp đồng.
- **Hậu điều kiện:** Phụ lục được gắn chặt chẽ vào hợp đồng gốc, các phân hệ tính lương tự động cập nhật mức hưởng mới.

---

### UC-CON-003: Cảnh báo tự động và gia hạn hợp đồng

- **Mã FR:** FR-CON-005, FR-CON-006.
- **Actor:** Hệ thống (tự động cảnh báo), HR Staff (xử lý gia hạn), Department Manager (nhận thông báo).
- **Luồng sự kiện chính (Basic Flow):**
  1. Hàng ngày lúc 00:00, Cron Job hệ thống quét toàn bộ các hợp đồng có trạng thái `Active` và loại `DEFINITE` hoặc `PROBATION`.
  2. Hệ thống tính số ngày còn lại: $\text{Days Remaining} = \text{end\_date} - \text{current\_date}$.
  3. Nếu $\text{Days Remaining} = 30$:
     - Hệ thống phát thông báo cảnh báo In-App và Email tới HR Staff và Department Manager trực tiếp của nhân viên.
     - Đưa nhân viên vào widget "Hợp đồng sắp hết hạn" trên Dashboard HR.
  4. **Quy trình gia hạn:**
     - HR Staff và Department Manager trao đổi và thống nhất tái ký hợp đồng.
     - HR Staff mở chi tiết hợp đồng sắp hết hạn và bấm "Gia hạn hợp đồng".
     - Hệ thống kiểm tra số lần đã ký hợp đồng có thời hạn của nhân viên:
       - Nếu đã ký 2 lần hợp đồng có thời hạn: Hệ thống cảnh báo theo Bộ luật Lao động 2019 và tự động khóa lựa chọn sang "Hợp đồng không xác định thời hạn".
     - HR Staff nhập số hợp đồng mới, mức lương mới (nếu có tăng lương) và ngày hiệu lực tiếp nối (ngày bắt đầu của HĐ mới = ngày hết hạn HĐ cũ + 1 ngày).
     - Hợp đồng cũ tự động chuyển trạng thái sang `Expired`.
     - Hợp đồng mới được kích hoạt sang `Active`.
- **Hậu điều kiện:** Hợp đồng được nối dài liên tục, không xảy ra khoảng trống pháp lý.

---

### UC-CON-004: Tải lên và tra cứu tài liệu hợp đồng số hóa

- **Mã FR:** FR-CON-007, FR-CON-008.
- **Actor:** HR Staff (tải lên/xem), Employee (xem của mình).
- **Tiền điều kiện:** Hợp đồng đã được ký giấy hoặc ký số hai bên.
- **Luồng sự kiện chính (Basic Flow):**
  1. HR Staff mở hợp đồng tương ứng, chọn tab "Tài liệu đính kèm" và nhấn "Tải lên bản scan HĐ".
  2. HR Staff chọn file PDF bản scan hợp đồng có con dấu pháp nhân từ máy tính.
  3. Hệ thống kiểm tra: Định dạng `.pdf`, dung lượng <= 5MB.
  4. Hệ thống mã hóa tên file bằng UUIDv4 và lưu vào private cloud storage.
  5. Cập nhật trường `document_url` trong bảng `contracts`.
  6. Nhân viên mở tài khoản cá nhân, vào mục "Hợp đồng của tôi" để xem bản scan PDF trực tiếp trên trình duyệt hoặc tải về máy.
- **Hậu điều kiện:** Văn bản hợp đồng được số hóa an toàn, sẵn sàng đối chiếu khi cần.
