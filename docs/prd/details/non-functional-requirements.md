# 10. Non-Functional Requirements

[Quay lại PRD](../../PRD.md#10-non-functional-requirements)

Tài liệu này đặc tả toàn bộ các yêu cầu phi chức năng (NFR) đã được Product Owner phê duyệt chính thức theo phương án chuẩn cho hệ thống HRM (SME 50 - 300 nhân sự).

- **Trạng thái:** Confirmed — Approved by Product Owner.

---

## 10.1. Security

- **Mã định danh:** NFR-SEC-001
- **Trạng thái:** Confirmed (PD-029, PD-032)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Mật khẩu an toàn:** Băm mật khẩu bằng Argon2id hoặc Bcrypt trước khi lưu vào cơ sở dữ liệu. Bắt buộc độ dài tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.
  - **Quản lý phiên & Token:** Sử dụng Access Token (JWT thời hạn ngắn 15 phút) và Refresh Token (thời hạn 7 ngày) được lưu trữ trong `HttpOnly`, `Secure`, `SameSite=Strict` Cookie để chống tấn công XSS.
  - **Mã hóa đường truyền:** Bắt buộc sử dụng giao thức HTTPS/TLS 1.3 cho toàn bộ kết nối web và API.
  - **Phòng chống lỗ hổng:** Triệt tiêu các lỗ hổng OWASP Top 10: chống SQL Injection qua TypeORM Parameterized Queries, chống XSS qua React DOM Sanitization, chống CSRF qua SameSite cookie và custom header.
- **Tiêu chí nghiệm thu (AC-NFR-SEC-001):** 100% endpoint được bảo vệ bởi Guard xác thực; mật khẩu không bao giờ xuất hiện dưới dạng plain-text trong DB hoặc logs; vượt qua bài quét mã tĩnh (SonarQube/npm audit) không còn lỗ hổng mức High/Critical.

---

## 10.2. Performance

- **Mã định danh:** NFR-PER-001
- **Trạng thái:** Confirmed (PD-033)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Thời gian phản hồi API:** Thời gian phản hồi cho 95% request (p95) $\le 500$ms trong điều kiện tải thông thường.
  - **Thời gian tải trang (Web):** First Contentful Paint (FCP) $\le 1.0$s và Time to Interactive (TTI) $\le 1.5$s trên mạng băng thông tiêu chuẩn.
  - **Thao tác nặng:** Thao tác chốt bảng công hoặc import file chấm công Excel 300 dòng hoàn tất trong vòng $\le 5$ giây.
- **Tiêu chí nghiệm thu (AC-NFR-PER-001):** Đạt điểm Google Lighthouse Performance $\ge 90$ cho các trang chính; không có query database chạy quá 200ms (Slow query).

---

## 10.3. Scalability

- **Mã định danh:** NFR-SCA-001
- **Trạng thái:** Confirmed (PD-001, PD-033)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Quy mô dữ liệu:** Hỗ trợ quản lý dữ liệu cho 50 đến 300 nhân viên hoạt động đồng thời trong vòng đời 5 năm (khoảng 500.000 bản ghi chấm công và 20.000 đơn nghỉ phép).
  - **Tải đồng thời:** Chịu tải đồng thời tối thiểu 50 người dùng cùng lúc (Concurrent Users), đặc biệt vào khung giờ cao điểm check-in đầu giờ sáng (07:50 - 08:15).
- **Tiêu chí nghiệm thu (AC-NFR-SCA-001):** Hệ thống vận hành ổn định không phát sinh lỗi 502/504 khi giả lập 50 request check-in đồng thời trong 1 giây.

---

## 10.4. Reliability & Availability

- **Mã định danh:** NFR-REL-001
- **Trạng thái:** Confirmed (PD-034)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Mức độ sẵn sàng (Availability):** Cam kết Uptime $\ge 99.5\%$ trong khung giờ làm việc hành chính (07:30 - 18:30 từ Thứ Hai đến Thứ Sáu).
  - **Thời gian gián đoạn kế hoạch:** Nâng cấp hệ thống hoặc bảo trì định kỳ chỉ thực hiện ngoài giờ hành chính (sau 20:00 hoặc cuối tuần) và có thông báo trước tối thiểu 24 giờ.
  - **Xử lý sự cố:** Trang web tự động hiển thị thông báo thân thiện (Friendly Maintenance Page) khi backend gặp gián đoạn, ngăn chặn hiển thị màn hình trắng (White Screen of Death).
- **Tiêu chí nghiệm thu (AC-NFR-REL-001):** Tỷ lệ lỗi hệ thống nội bộ (HTTP 500) trên tổng request $\le 0.1\%$.

---

## 10.5. Data Integrity

- **Mã định danh:** NFR-INT-001
- **Trạng thái:** Confirmed (PD-036)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Toàn vẹn quan hệ:** Bắt buộc thiết lập ràng buộc khóa ngoại `FOREIGN KEY` với hành vi mặc định `ON DELETE RESTRICT` để chống xóa mất dữ liệu liên đới.
  - **Quản lý giao dịch (ACID):** Bọc trong Database Transaction cho mọi thao tác ghi trải từ 2 bảng trở lên (duyệt đơn nghỉ phép, chốt công, tạo nhân viên kèm tài khoản).
  - **Khử trùng lặp:** Sử dụng Partial Unique Index (`WHERE deleted_at IS NULL`) để chống tạo trùng email, mã nhân viên khi áp dụng xóa mềm.
- **Tiêu chí nghiệm thu (AC-NFR-INT-001):** Không để lọt bất kỳ dữ liệu mồ côi (Orphan Records) nào trong cơ sở dữ liệu; rollback 100% nếu có lỗi trong transaction.

---

## 10.6. Usability & Accessibility

- **Mã định danh:** NFR-UX-001
- **Trạng thái:** Confirmed (PD-002, PD-035)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Ngôn ngữ:** Giao diện hoàn toàn bằng Tiếng Việt chuẩn mực, thông điệp lỗi rõ ràng và có tính hướng dẫn người dùng.
  - **Thiết kế thích ứng (Responsive):** Tương thích tốt trên màn hình máy tính để bàn (Desktop $\ge 1280$px) cho HR/Admin và màn hình điện thoại di động (Mobile $375$px - $430$px) cho Employee check-in/nộp đơn.
  - **Đơn giản hóa thao tác:** Nhân viên thực hiện Check-in hoặc xem số dư phép chỉ mất tối đa 2 thao tác chạm/click từ màn hình chính.
- **Tiêu chí nghiệm thu (AC-NFR-UX-001):** Người dùng mới có thể thực hiện thành công việc check-in và gửi đơn nghỉ phép trong lần đầu sử dụng mà không cần tài liệu hướng dẫn.

---

## 10.7. Maintainability

- **Mã định danh:** NFR-MAI-001
- **Trạng thái:** Confirmed (PD-037)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Quy chuẩn mã nguồn:** Tuân thủ tuyệt đối [Clean Code](../../rules/clean-code.md), [Coding Style](../../rules/coding-style.md) và bật `strict: true` trong cấu hình TypeScript cho cả hai phía frontend và backend.
  - **Kiểm thử tự động:** Viết Unit Test và Integration Test cho các nghiệp vụ tính toán cốt lõi (tính đi muộn, trừ phép, tính công) với độ bao phủ (Coverage) $\ge 80\%$.
  - **Tài liệu hóa:** Mọi thay đổi schema hoặc API contract đều phải được cập nhật đồng bộ trong thư mục `docs/`.
- **Tiêu chí nghiệm thu (AC-NFR-MAI-001):** Code pass 100% linter ESLint, formatter Prettier và toàn bộ test suites trước khi tạo Pull Request.

---

## 10.8. Logging & Auditability

- **Mã định danh:** NFR-AUD-001
- **Trạng thái:** Confirmed (PD-031)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Nhật ký bảo mật (Audit Log):** Tự động ghi log bất biến cho toàn bộ các hành động nhạy cảm: Đăng nhập/Đăng xuất, Đổi mật khẩu, Thay đổi quyền hạn, Sửa/xóa hồ sơ nhân sự, Phê duyệt đơn nghỉ phép, Chốt bảng công.
  - **Cấu trúc trường log:** Bắt buộc lưu trữ: `id`, `timestamp` (UTC), `actor_id`, `actor_role`, `ip_address`, `action`, `resource`, `status`, `old_value`, `new_value`.
  - **Bảo mật log:** Cấm ghi log mật khẩu plain-text, token hoặc thông tin nhạy cảm. Lưu trữ log tối thiểu 12 tháng.
- **Tiêu chí nghiệm thu (AC-NFR-AUD-001):** Bảng `audit_logs` có cơ chế bảo vệ chống xóa hoặc sửa đổi (Append-only); chỉ System Administrator mới có quyền xem audit log.

---

## 10.9. Privacy & Data Protection

- **Mã định danh:** NFR-PRI-001
- **Trạng thái:** Confirmed (PD-038)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Tuân thủ pháp luật:** Tuân thủ chặt chẽ Nghị định 13/2023/NĐ-CP của Chính phủ Việt Nam về Bảo vệ dữ liệu cá nhân (PDPD).
  - **Phân loại dữ liệu:** Dữ liệu cá nhân nhạy cảm (CCCD/CMND, số tài khoản ngân hàng, thông tin lương) chỉ người có thẩm quyền (HR Staff, chính chủ nhân viên) mới được truy cập.
  - **Quyền của chủ thể dữ liệu:** Nhân viên có quyền xem, yêu cầu đính chính dữ liệu cá nhân không chính xác.
- **Tiêu chí nghiệm thu (AC-NFR-PRI-001):** Dữ liệu tài khoản ngân hàng và số định danh được che (masking) khi hiển thị trên các màn hình công cộng hoặc danh sách tổng hợp.

---

## 10.10. Backup & Recovery

- **Mã định danh:** NFR-BKP-001
- **Trạng thái:** Confirmed (PD-039)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Tần suất sao lưu:** Tự động sao lưu toàn bộ cơ sở dữ liệu PostgreSQL hàng ngày (Daily Backup) vào lúc 02:00 sáng.
  - **Lưu trữ sao lưu:** Lưu trữ tối thiểu 30 bản sao lưu gần nhất trên hạ tầng lưu trữ độc lập.
  - **Chỉ số RPO / RTO:**
    - **RPO (Recovery Point Objective):** $\le 24$ giờ (mức mất mát dữ liệu tối đa chấp nhận được).
    - **RTO (Recovery Time Objective):** $\le 2$ giờ (thời gian tối đa để khôi phục hệ thống hoạt động trở lại).
- **Tiêu chí nghiệm thu (AC-NFR-BKP-001):** Thực hiện diễn tập khôi phục dữ liệu từ bản backup thành công định kỳ hàng quý.

---

## 10.11. Compatibility

- **Mã định danh:** NFR-COM-001
- **Trạng thái:** Confirmed (PD-035)
- **Tiêu chuẩn kỹ thuật đã phê duyệt:**
  - **Trình duyệt máy tính (Desktop):** Tương thích hoàn toàn trên Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari (hỗ trợ 2 phiên bản lớn gần nhất).
  - **Trình duyệt di động (Mobile):** Tương thích tốt trên Mobile Safari (iOS) và Mobile Chrome (Android).
  - **Độ phân giải hiển thị:** Tối ưu hóa từ độ phân giải di động (tối thiểu 375x667px) đến màn hình máy tính Full HD (1920x1080px).
- **Tiêu chí nghiệm thu (AC-NFR-COM-001):** Không bị vỡ layout, tràn màn hình ngang (Horizontal Scrollbar) hoặc lỗi hiển thị phông chữ trên danh sách môi trường hỗ trợ.
