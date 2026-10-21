# 12. Assumptions, Dependencies & Risks

[Quay lại PRD](../../PRD.md#12-assumptions-dependencies--risks)

## 12.1. Assumptions

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- Hệ thống phục vụ doanh nghiệp quy mô SME (50 - 300 nhân sự) tại Việt Nam, vận hành theo mô hình đơn doanh nghiệp (Single-tenant) với giao diện tiếng Việt.
- Bốn nhóm vai trò (Admin, HR Staff, Manager, Employee) tương tác trên nền tảng Web-based (Desktop/Mobile Web).
- Nhân viên có email nội bộ để nhận thông báo và kích hoạt tài khoản.
- Không giả định bất kỳ quy tắc nghiệp vụ ngầm nào ngoài các nội dung đã được xác nhận chính thức tại PRD và Business Rules.

## 12.2. Dependencies

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Master Data:** Hồ sơ nhân viên (EMP) và Cơ cấu tổ chức (DEPT) là nguồn dữ liệu gốc (Single Source of Truth) cho tất cả các phân hệ còn lại.
- **Dữ liệu chấm công ngoài:** Phân hệ Chấm công (ATT) tiếp nhận dữ liệu từ file Excel/CSV xuất từ máy chấm công vân tay/khuôn mặt; không yêu cầu kết nối socket/hardware trực tiếp trong Phase 1.
- **Phân hệ Tuyển dụng sang Onboarding:** Ứng viên trúng tuyển (HIRED) trong REC tự động được chuyển thông tin sang phân hệ Onboarding để tạo hồ sơ nhân sự sơ bộ.
- **Chính sách pháp lý:** Áp dụng theo quy định pháp luật lao động, thuế TNCN và bảo hiểm xã hội hiện hành của Việt Nam.

## 12.3. Risks

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

Toàn bộ 8 nhóm rủi ro phân tích đã được phê duyệt phương án kiểm soát chính thức:

| Risk ID | Rủi ro và tác động | Biện pháp kiểm soát đã phê duyệt | Trạng thái |
|---|---|---|---|
| RISK-001 | Sai lệch yêu cầu do thiếu quyết định nghiệp vụ. | Đã chốt toàn bộ 40/40 Pending Decisions; phát triển bám sát 100% PRD và Business Rules đã duyệt. | Confirmed |
| RISK-002 | Sai công thức tính công, phép, lương, thuế. | Đã chuẩn hóa công thức tính theo luật Việt Nam và quy định ân hạn/làm tròn chi tiết trong BR. | Confirmed |
| RISK-003 | Quyền truy cập quá rộng làm rò rỉ dữ liệu nhạy cảm. | Đã phê duyệt Authorization Matrix đa tầng; phân tách rõ quyền Admin, HR, Manager (chỉ phòng trực tiếp), Employee. | Confirmed |
| RISK-004 | Vi phạm quy định pháp lý về thuế, BHXH, bảo vệ dữ liệu. | Tuân thủ Luật Lao động, BHXH, Thuế TNCN và Nghị định 13/2023/NĐ-CP; phân loại dữ liệu nhạy cảm. | Confirmed |
| RISK-005 | Thiếu hoặc trùng lặp dữ liệu biến động nhân sự. | Lưu vết lịch sử biến động (employee_history) theo ngày hiệu lực; bắt buộc ràng buộc toàn vẹn khóa ngoại. | Confirmed |
| RISK-006 | Hiệu năng hệ thống suy giảm khi số lượng nhân sự tăng. | Áp dụng ESR rule cho Index DB, cấm N+1 query, cache cấu hình, giới hạn API <= 500ms (p95). | Confirmed |
| RISK-007 | Thu hồi tài sản và quyền truy cập chưa triệt để khi nghỉ việc. | Tự động hóa checklist Offboarding; vô hiệu hóa tài khoản hệ thống ngay khi quyết định thôi việc có hiệu lực. | Confirmed |
| RISK-008 | Mở rộng phạm vi phát triển vượt tầm kiểm soát (Scope Creep). | Phân kỳ phát triển nghiêm ngặt: Phase 1 (MVP: 5 module cốt lõi), Phase 2 (4 module), Phase 3 (3 module). | Confirmed |

## 12.4. Constraints

**Status:** Confirmed — Approved by Product Owner (2026-10-21)

- **Kỹ thuật:** Backend chạy NestJS (Node.js 22 LTS), TypeORM, PostgreSQL; Frontend chạy React 19, HeroUI, TailwindCSS.
- **Kiến trúc:** Monolith chia module rõ ràng (Modular Monolith), kiến trúc phân lớp Controller - Service - Repository; RESTful API chuẩn JSON.
- **Bảo mật:** Băm mật khẩu bằng bcrypt; access token lưu trong bộ nhớ ứng dụng, refresh token lưu trong HttpOnly cookie; kiểm soát phân quyền theo RBAC Guards.
- **Pháp lý:** Tuân thủ quy định lao động và Nghị định 13/2023/NĐ-CP của Việt Nam về bảo vệ dữ liệu cá nhân.

## 12.5. Open Questions

**Status:** Confirmed / Resolved — All Questions Closed (2026-10-21)

Toàn bộ câu hỏi thuộc 40 nhóm quyết định sản phẩm PD-001 đến PD-040 đã được chốt. Các quyết định kỹ thuật và kế hoạch còn mở được liệt kê ở mục 12.7.

## 12.6. Pending Decisions

Có **40 nhóm quyết định sản phẩm có ID** đã được chốt; mỗi nhóm có thể chứa nhiều câu hỏi chi tiết. Số này không bao gồm các TBD kỹ thuật và kế hoạch.

| Decision ID | Quyết định đã xác nhận | Nội dung quy tắc đã phê duyệt (Recommended) | Phần liên quan | Status | Người xác nhận / bằng chứng |
|---|---|---|---|---|---|
| PD-001 | Bối cảnh và định vị sản phẩm | Doanh nghiệp SME (50 - 300 nhân sự) tại Việt Nam, đơn doanh nghiệp (Single-tenant), giao diện tiếng Việt. | 1, 2, 5, 10 | **Confirmed** | Product Owner (2026-10-21) |
| PD-002 | Persona và môi trường sử dụng | 4 Persona: Admin (Desktop Web quản trị), HR Staff (Desktop Web nghiệp vụ), Manager (Desktop/Mobile Web duyệt), Employee (Mobile/Desktop Web tự phục vụ). | 4, 10.6 | **Confirmed** | Product Owner (2026-10-21) |
| PD-003 | Mục tiêu và success metrics | Giảm 80% thời gian giấy tờ; 100% số hóa hồ sơ & sơ đồ tổ chức; tỷ lệ chấm công đúng hạn và phản hồi duyệt đơn < 24h đạt > 95%. | 1.3, 2, 3 | **Confirmed** | Product Owner (2026-10-21) |
| PD-004 | MVP, ưu tiên và phạm vi release | MVP (Phase 1) gồm 5 module cốt lõi: SYS, EMP, DEPT, ATT, LEAVE. | 5.2, 5.6, 6, 10, 11, 14 | **Confirmed** | Product Owner (2026-10-21) |
| PD-005 | Future scope và roadmap | Phase 2 (PAY, CON, REC, ONB); Phase 3 (PERF, TRAIN, REP). | 5.3, 5.6, 14 | **Confirmed** | Product Owner (2026-10-21) |
| PD-006 | Giới hạn sản phẩm | Không Bank Transfer API, không chữ ký số USB token, không Public Job Portal; xuất bảng lương Excel. | 5.4, 5.6 | **Confirmed** | Product Owner (2026-10-21) |
| PD-007 | Liên hệ dữ liệu và tích hợp | EMP và DEPT là nguồn Master Data chính thức; lưu lịch sử biến động (employee_history) bảo đảm toàn vẹn dữ liệu lịch sử công/lương. | 5.5, 6, 7, 11, 13 | **Confirmed** | Product Owner (2026-10-21) |
| PD-008 | Authorization Matrix | Giữ 4 vai trò nền theo chức vụ thực tế, cấp quyền nghiệp vụ theo nhiệm vụ; Manager chỉ xem/duyệt phòng mình trực tiếp; Employee tự sửa thông tin cơ bản; HR toàn quyền nhân sự; Admin toàn quyền tài khoản/audit. | 4.3, 8.8, 10.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-009 | Hồ sơ và định danh nhân viên | Mã nhân viên tự sinh theo năm (`EMP-YYYY-NNNN`); nhân viên sửa thông tin cơ bản; thông tin nhạy cảm do HR duyệt/sửa. | 6.1, 8.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-010 | Trạng thái và lịch sử nhân viên | 4 trạng thái chuẩn: PROBATION, ACTIVE, ON_LEAVE, TERMINATED; ghi nhận lịch sử công tác kèm ngày hiệu lực khi đổi chức vụ/phòng ban. | 6.1, 7.3, 8.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-011 | Tài liệu nhân viên | Upload file đính kèm (CCCD, bằng cấp, hợp đồng, CV); hỗ trợ PDF, JPG, PNG tối đa 5MB/file; lưu trữ private storage, chỉ HR và chủ hồ sơ được xem. | 6.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-012 | Cơ cấu tổ chức | Cây phân cấp đa tầng linh hoạt (Multi-level Tree), không giới hạn độ sâu; cấm tạo vòng lặp quan hệ cha-con. | 6.2 | **Confirmed** | Product Owner (2026-10-21) |
| PD-013 | Ghi nhận chấm công | Kết hợp Check-in/Check-out trên Web và Import file Excel từ máy chấm công. | 6.3, 8.2, 9.2 | **Confirmed** | Product Owner (2026-10-21) |
| PD-014 | Đi muộn, về sớm và overtime | Ca chuẩn 08:00 - 17:30 (8h, nghỉ trưa 12:00 - 13:30, T2 - T6); ân hạn muộn 15 phút (sau 08:15 tính muộn từ 08:00); OT phải có đơn duyệt trước. | 6.3, 8.2, 9.2 | **Confirmed** | Product Owner (2026-10-21) |
| PD-015 | Chính sách cấp và tính phép | 12 ngày phép/năm (+1 ngày mỗi 5 năm thâm niên), tích lũy 1 ngày/tháng; chuyển tối đa 5 ngày sang năm sau, hạn dùng 31/03; nghỉ tối thiểu 0.5 ngày. | 6.4, 8.3 | **Confirmed** | Product Owner (2026-10-21) |
| PD-016 | Luồng xử lý nghỉ phép | Phê duyệt 1 cấp: Manager trực tiếp duyệt là hoàn tất (trừ quỹ phép và đồng bộ bảng công ngay); HR có quyền xem và giám sát. | 6.4, 8.3, 9.3 | **Confirmed** | Product Owner (2026-10-21) |
| PD-017 | Công thức và chính sách lương | Tiền tệ VNĐ, làm tròn 0 chữ số thập phân; công thức: Lương thực lĩnh = Lương cơ bản * (công thực tế / công chuẩn) + phụ cấp + OT - BHXH - Thuế TNCN. | 6.5, 8.4, 9.4 | **Confirmed** | Product Owner (2026-10-21) |
| PD-018 | Thuế, bảo hiểm và pháp lý | Áp dụng tỷ lệ BHXH (8%), BHYT (1.5%), BHTN (1%) trích từ lương NLĐ; Thuế TNCN lũy tiến từng phần kèm giảm trừ bản thân (11tr) và người phụ thuộc (4.4tr). | 6.5, 8.4, 10.9 | **Confirmed** | Product Owner (2026-10-21) |
| PD-019 | Kỳ lương và phiếu lương | Kỳ lương tính theo tháng dương lịch (01 -> cuối tháng); chốt công ngày 01, chốt lương ngày 05, phát lương ngày 10; phiếu lương bảo mật cá nhân. | 6.5, 9.4 | **Confirmed** | Product Owner (2026-10-21) |
| PD-020 | Quy trình tuyển dụng | 5 bước chuẩn: NEW -> SCREENING -> INTERVIEWING -> OFFERED -> HIRED; ứng viên HIRED tự động chuyển dữ liệu sang phân hệ Onboarding. | 6.6, 8.5, 9.5 | **Confirmed** | Product Owner (2026-10-21) |
| PD-021 | Onboarding | Tự động kích hoạt khi ứng viên HIRED; checklist gồm: cấp tài khoản hệ thống + cấp trang thiết bị + ký hợp đồng thử việc + hội nhập. | 6.7, 9.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-022 | Offboarding | Kích hoạt khi có quyết định thôi việc; checklist: bàn giao công việc + thu hồi thiết bị + quyết toán công/phép/lương + vô hiệu hóa tài khoản đúng ngày. | 6.7, 9.6 | **Confirmed** | Product Owner (2026-10-21) |
| PD-023 | KPI, OKR và tiêu chí hiệu suất | Đánh giá định kỳ 6 tháng hoặc 1 năm; thang điểm 1 đến 5 (Xuất sắc, Tốt, Đạt, Cần cải thiện, Không đạt). | 6.8, 8.7 | **Confirmed** | Product Owner (2026-10-21) |
| PD-024 | Quy trình đánh giá | 3 bước: 1. Nhân viên tự đánh giá -> 2. Quản lý trực tiếp đánh giá và phản hồi -> 3. HR khóa kết quả. | 6.8, 7.3, 8.7 | **Confirmed** | Product Owner (2026-10-21) |
| PD-025 | Hợp đồng | 3 loại: Thử việc, Xác định thời hạn, Không xác định thời hạn; hệ thống tự động cảnh báo trước 30 ngày khi hợp đồng sắp hết hạn. | 6.9, 8.6 | **Confirmed** | Product Owner (2026-10-21) |
| PD-026 | Đào tạo | Quản lý khóa đào tạo nội bộ/ngoài; theo dõi vòng đời: REGISTERED -> IN_PROGRESS -> COMPLETED / FAILED. | 6.10 | **Confirmed** | Product Owner (2026-10-21) |
| PD-027 | Định nghĩa báo cáo và dashboard | 3 báo cáo cốt lõi: Biến động nhân sự (Headcount), Chuyên cần (Attendance/Leave), Bảng tổng hợp chi phí lương (Payroll cost). | 6.11 | **Confirmed** | Product Owner (2026-10-21) |
| PD-028 | Quyền và xuất báo cáo | Xuất báo cáo định dạng Excel và PDF; phân quyền xuất file chỉ dành cho Admin và HR Staff. | 6.11 | **Confirmed** | Product Owner (2026-10-21) |
| PD-029 | Authentication và vòng đời quyền | Xác thực Email + Password, bắt buộc đổi mật khẩu lần đầu; cấp phát tài khoản bởi HR/Admin; JWT + Refresh token cookie. | 6.12, 8.8, 10.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-030 | Cấu hình và thông báo | Cấu hình lưu DB; thông báo đa kênh qua Web In-App (chuông) và Email thông báo sự kiện duyệt phép, kích hoạt tài khoản. | 6.12 | **Confirmed** | Product Owner (2026-10-21) |
| PD-031 | Audit và hoạt động quản trị | Ghi nhật ký bất biến: Đăng nhập, thay đổi quyền, đổi mật khẩu, sửa/xóa hồ sơ nhân viên, duyệt đơn, chốt bảng lương; lưu trữ tối thiểu 2 năm. | 6.12, 10.8 | **Confirmed** | Product Owner (2026-10-21) |
| PD-032 | Tiêu chí security | Mật khẩu băm bằng bcrypt; HTTPS khi triển khai, HTTP loopback chỉ cho local; chống OWASP Top 10 (SQLi, XSS, CSRF); access token lưu trong bộ nhớ ứng dụng, refresh token JWT HS256 lưu trong HttpOnly cookie (`SameSite=Lax`, `Secure` trên HTTPS). | 10.1 | **Confirmed** | Product Owner (2026-10-21) |
| PD-033 | Performance và scalability | Phản hồi API <= 500ms (95th percentile); tải trang web <= 1.5s; chịu tải đồng thời tối thiểu 50 người dùng cho quy mô SME. | 10.2, 10.3 | **Confirmed** | Product Owner (2026-10-21) |
| PD-034 | Reliability và availability | Uptime mục tiêu >= 99.5% trong khung giờ làm việc hành chính; có trang bảo trì khi nâng cấp hệ thống. | 10.4 | **Confirmed** | Product Owner (2026-10-21) |
| PD-035 | Usability, accessibility | Giao diện tiếng Việt chuẩn, Responsive tốt trên Desktop và Mobile trình duyệt hiện đại (Chrome, Edge, Safari). | 10.6, 10.11 | **Confirmed** | Product Owner (2026-10-21) |
| PD-036 | Data integrity và ngoại lệ | Ràng buộc khóa ngoại RESTRICT; bọc transaction cho mọi thao tác ghi nhiều bảng; xử lý triệt để N+1 query. | 6, 7.4, 10.5 | **Confirmed** | Product Owner (2026-10-21) |
| PD-037 | Maintainability | Mã nguồn tuân thủ Clean Code, Coding Style, ESLint, Prettier, viết unit/integration tests cho core service. | 10.7 | **Confirmed** | Product Owner (2026-10-21) |
| PD-038 | Privacy và data protection | Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân; phân loại dữ liệu nhạy cảm theo Security Rules. | 10.9 | **Confirmed** | Product Owner (2026-10-21) |
| PD-039 | Backup và recovery | Tự động sao lưu PostgreSQL hàng ngày (Daily dump), lưu trữ 30 ngày gần nhất; RPO <= 24h, RTO <= 2h. | 10.10 | **Confirmed** | Product Owner (2026-10-21) |
| PD-040 | Nghiệm thu và phát hành | DoD: Code pass TypeScript strict, pass unit test, đúng PRD/BR, được code review và kiểm chứng trên môi trường staging. | 11, 14, phụ lục B | **Confirmed** | Product Owner (2026-10-21) |

**Nhật ký quyết định:** Toàn bộ 40/40 Pending Decisions (PD-001 đến PD-040) đã được Product Owner phê duyệt vào ngày 2026-10-21.

- Product Owner ban đầu xác nhận `crypto.scrypt`, sau đó đổi quyết định băm mật khẩu sang bcrypt ngày 2026-10-21; refresh token JWT HS256 và cookie `SameSite=Lax` giữ nguyên.
- Product Owner chốt `bcrypt` 6.0.0, work factor 12 và mật khẩu tối thiểu 15 ký tự, tối đa 72 byte UTF-8; khi tăng work factor, băm lại sau lần đăng nhập thành công.
- Product Owner chốt tài khoản tạm khóa trả `429 RATE_LIMIT_EXCEEDED` kèm `Retry-After`; endpoint/DTO Auth tiếp tục TBD (To Be Determined).
- Product Owner chốt link tuyển dụng chỉ chia sẻ tin, CV gửi qua email/kênh ngoài để HR nhập; ứng viên bắt đầu ở `New`, offer thu hồi đưa ứng viên sang `Rejected` và lưu lý do.
- Product Owner chốt `Cache-Control: no-store` cho API cần đăng nhập và response chứa token, timeout thông thường 30 giây, kết quả `Idempotency-Key` lưu 24 giờ.
- Product Owner chốt ATT: từ chối chấm thêm sau khi hoàn tất ngày công, HR chọn giờ khi Web/file máy lệch, Web chỉ ghi IP/thiết bị, OT ngày nghỉ có đơn duyệt được chấm Web, giờ OT thực tế làm tròn lên block 30 phút.
- Product Owner thay quyết định ghi đè trước đó: mọi lượt lưu dựa trên bản cũ đều bị từ chối; người dùng phải tải lại trước khi sửa tiếp. Cơ chế API còn TBD (To Be Determined).
- Offer thu hồi sau `Hired` hủy Onboarding chưa hoàn tất và giữ lịch sử; gian lận bị loại khỏi Talent Pool tái liên hệ.
- Tính năng MVP đủ 5 module Phase 1 dự kiến hoàn tất sau Sprint 8; UAT ở Sprint 9 là điều kiện trước phát hành. Lịch phát hành và roadmap Sprint 1–9 tiếp tục TBD (To Be Determined).
- Ứng viên từ chối offer chuyển `Rejected`; offer mang trạng thái `OFFER_DECLINED` và lưu lý do.
- Product Owner xác nhận bảng `user_sessions` lưu hash và trạng thái thu hồi refresh token; logout đánh dấu thu hồi, không xóa bản ghi.
- Product Owner duyệt kế hoạch Sprint 0 ở trạng thái Planned; lộ trình Sprint 1–9 và contract endpoint/DTO từng module tiếp tục TBD. Quy ước API chung đã duyệt tại [API spec](../../api-spec.md).
- Product Owner xác nhận không đặt ngưỡng coverage theo phần trăm; dùng [Testing Rules](../../rules/testing.md).

## 12.7. Quyết định kỹ thuật và kế hoạch còn mở

Theo dõi các quyết định ngoài 40 nhóm PD đã chốt; không triển khai phần phụ thuộc trước khi có xác nhận.

**Status:** TBD (To Be Determined)

- [API spec](../../api-spec.md): Endpoint/DTO từng module, cookie path Auth, cache cho endpoint công khai và operation dùng `Idempotency-Key` là gì?
- [API spec](../../api-spec.md): Truyền phiên bản bản ghi và báo lỗi lượt lưu dựa trên bản cũ bằng cơ chế nào?
- [Architecture Overview](../../architecture/overview.md): Dịch vụ email và private storage nào được chọn khi biết hạ tầng triển khai?
- [Architecture Overview](../../architecture/overview.md): Phase 2 có đồng bộ máy chấm công tự động không; nếu có, dùng model và giao thức nào?
- [Sprint roadmap](../../process/sprint-roadmap.md): Story Points, phạm vi Sprint 1–9 và lịch phát hành các Phase được duyệt như thế nào?
