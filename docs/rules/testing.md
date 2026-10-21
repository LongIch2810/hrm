Trạng thái: thiết kế dự kiến, chưa có code

# Quy tắc viết test

Dùng tài liệu này khi viết, chạy và đánh giá test cho frontend React, backend NestJS và PostgreSQL.

## 1. Nguyên tắc chung

Kiểm hành vi đã được xác nhận theo đặc tả; không biến suy diễn chủ quan thành expected result trong test.

- Thêm test khi tạo hoặc sửa hành vi, logic nghiệp vụ, xác thực, phân quyền hoặc xử lý dữ liệu.
- Không cần test mới cho thay đổi chỉ về tài liệu hoặc trình bày, nếu không đổi hành vi.
- Với lỗi tự động tái hiện được, viết test thất bại trước khi sửa; sau khi sửa, cho test đó chạy đạt.
- Không đặt ngưỡng độ phủ % toàn dự án; kiểm mọi nhánh cho phép/từ chối và quy tắc đã xác nhận của phần sửa.
- Tra [tiêu chí nghiệm thu trong PRD](../PRD.md#11-acceptance-criteria) cho expected result và [Auth](../architecture/auth.md) cho quyết định quyền đã chốt.

## 2. Loại test

Chọn tầng test theo hành vi cần chứng minh; tra [Layers](../architecture/layers.md) cho ranh giới các thành phần.

| Loại | Kiểm tra gì | Công cụ | Vị trí file | Khi nào bắt buộc |
|---|---|---|---|---|
| Unit backend | Hàm, Service hoặc Guard riêng lẻ | Vitest | Cạnh file nguồn | Khi sửa logic của đơn vị đó |
| Unit frontend | Component hoặc hook riêng lẻ theo hành vi người dùng | Vitest, React Testing Library, jsdom | Cạnh file nguồn | Khi sửa hành vi component/hook |
| Integration backend | DI NestJS, HTTP và các lớp liên quan | Vitest, `@nestjs/testing`, `fetch` Node.js | `backend/test/` | Khi sửa ranh giới module/API/dữ liệu |
| Integration frontend | Component/hook và API client cùng hoạt động | Vitest, React Testing Library, jsdom | `frontend/test/` | Khi sửa giao tiếp giữa các lớp frontend |
| E2E backend | Ứng dụng NestJS qua HTTP | Vitest, `@nestjs/testing`, `fetch` Node.js | `backend/test/` | Khi sửa luồng API quan trọng |
| E2E frontend | Luồng người dùng qua trình duyệt, frontend và backend | Playwright Test | `frontend/test/` | Khi sửa luồng người dùng quan trọng đã duyệt |

- Tra [Naming](naming.md) cho hậu tố unit, integration và E2E; tra [Folder Structure](../architecture/folder-structure.md) cho vị trí.

## 3. Cách viết test

Viết test theo kết quả người dùng hoặc API quan sát được.

| Quy tắc | Làm | Không làm |
|---|---|---|
| Cấu trúc | Dùng Arrange–Act–Assert; mỗi test kiểm một hành vi | Gộp nhiều hành vi vào một test |
| Mô tả | Nêu điều kiện và kết quả: `từ chối khi thiếu quyền` | Chỉ ghi tên method: `authorize()` |
| Giao diện | Tương tác như người dùng; kiểm role, label, text | Kiểm state nội bộ hoặc snapshot toàn trang |

## 4. Mock và dữ liệu test

Giữ ranh giới mock đúng với tầng test.

| Mock | Không mock |
|---|---|
| Phụ thuộc ngoài đơn vị trong unit test | Lớp thật thuộc phạm vi integration test |
| Thời gian, ngẫu nhiên và dịch vụ ngoài bằng giá trị cố định | Database khi đang kiểm persistence |

- Dùng factory/fixture nhỏ theo nghiệp vụ, tạo dữ liệu giả cố định mới cho mỗi test.
- Không để test phụ thuộc thứ tự chạy hoặc sửa fixture dùng chung.

## 5. Database và môi trường test

Dùng môi trường test cô lập để kiểm dữ liệu và quyền.

- Dùng PostgreSQL trong container, cùng major version đã chốt tại [Tech Stack](../architecture/tech-stack.md), cho test persistence.
- Dùng database test riêng; chạy migration trước test và reset dữ liệu nghiệp vụ giữa các test/suite theo fixture.
- Tạo tài khoản giả bằng factory theo vai trò tại [Auth](../architecture/auth.md); integration/E2E đi qua đăng nhập thật.
- Kiểm cả nhánh cho phép và từ chối mặc định đối với quyền đã được duyệt; chỉ kiểm tra các quyền đã được chuẩn hóa trong ma trận RBAC.
- Dùng biến môi trường test và secret giả; không dùng PII thật hoặc gọi dịch vụ ngoài thật, theo [Security](security.md).

## 6. Điều kiện hoàn thành và lệnh chạy

Dùng lệnh theo [Tech Stack](../architecture/tech-stack.md) khi script được tạo; hiện chưa có manifest hoặc script chạy được.

- [ ] Khi tạo code, cấu hình `test:unit`, `test:integration`, `test:e2e`, `test:all` cho từng app; giữ `npm test` chạy Vitest một lượt theo [Tech Stack](../architecture/tech-stack.md).
- [ ] Chạy test liên quan, lint và build thành công; chạy format và rà diff trước khi báo xong.
- [ ] Khi có CI, trên mỗi PR chạy lint, build, unit, integration và E2E cho luồng đã duyệt.
- [ ] Khi test fail hoặc flaky, sửa nguyên nhân và chạy lại; không xóa/skip test hoặc hạ độ phủ để qua.
- [ ] Không sửa kỳ vọng test để khớp hành vi code sai.
- [ ] Nếu chưa tái hiện được lỗi, ghi điều kiện và báo tác vụ chưa đạt; nêu rõ lệnh thiếu hoặc chưa chạy.

## 7. Quyết định Testing đã xác nhận

**Status:** Confirmed

- Đã xác nhận phiên bản tương thích Node.js 20 LTS: `@nestjs/testing` v10.x cho backend, `@testing-library/react` v16.x, `@testing-library/dom` v10.x, `jsdom` v25.x cho frontend component test và `@playwright/test` v1.48.x cho E2E test.
- Expected result bám sát 100% theo các quy tắc nghiệp vụ đã chốt trong [tiêu chí nghiệm thu](../PRD.md#11-acceptance-criteria) và [Auth](../architecture/auth.md).
- Toàn bộ dịch vụ bên ngoài (SMTP gửi mail, Cloud Storage S3/MinIO) được giả lập (mock/stub) hoàn toàn trong automated test suite, đảm bảo test chạy độc lập và ổn định.
