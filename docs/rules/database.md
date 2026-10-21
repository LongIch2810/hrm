Trạng thái: quy tắc kỹ thuật; frontend có prototype, backend chưa triển khai.

# Quy tắc cơ sở dữ liệu (Database Rules)

Tài liệu này quy định các tiêu chuẩn bắt buộc khi thiết kế schema, đánh index, quản lý transaction và tối ưu hóa truy vấn cho PostgreSQL và TypeORM trong dự án HRM.

## 1. Nguyên tắc chung

Bảo đảm tính toàn vẹn dữ liệu, hiệu năng truy vấn và an toàn giao dịch.

- Bắt buộc dùng TypeORM Migration để quản lý schema; cấm bật `synchronize: true` trên môi trường staging và production.
- Mọi thay đổi dữ liệu trải trên nhiều bảng phải được bọc trong database transaction.
- Triệt tiêu lỗi N+1 query bằng cách nạp trước quan hệ (eager/explicit loading) hoặc batch query.
- Đánh index có chủ đích; cân bằng giữa tốc độ đọc (SELECT) và chi phí ghi (INSERT, UPDATE, DELETE).
- Tuân thủ quy ước đặt tên bảng, cột, khóa ngoại và index theo [Naming](naming.md#database-postgresql).

---

## 2. Thiết kế Schema và Migration

Thiết lập bảng và trường dữ liệu chuẩn xác trước khi viết logic truy vấn.

### Bảng chuẩn thiết kế trường dữ liệu

| Loại trường | Kiểu dữ liệu PostgreSQL | Quy ước TypeORM | Ghi chú |
|---|---|---|---|
| Khóa chính (Primary Key) | `UUID` (hoặc `BIGSERIAL`) | `@PrimaryGeneratedColumn('uuid')` | Dùng UUID làm khóa chính mặc định cho các thực thể nghiệp vụ. |
| Thời gian tạo / sửa | `TIMESTAMPTZ` | `@CreateDateColumn()`, `@UpdateDateColumn()` | Bắt buộc lưu kèm múi giờ UTC (`TIMESTAMP WITH TIME ZONE`). |
| Xóa mềm (Soft Delete) | `TIMESTAMPTZ NULL` | `@DeleteDateColumn()` | Cho phép khôi phục dữ liệu; giá trị `NULL` là bản ghi đang hoạt động. |
| Khóa ngoại (Foreign Key) | Khớp kiểu khóa chính | `@ManyToOne()`, `@JoinColumn({ name: '..._id' })` | Đặt tên cột theo mẫu `<entity>_id` (ví dụ `department_id`). |
| Chuỗi văn bản ngắn | `VARCHAR(N)` | `@Column({ type: 'varchar', length: N })` | Luôn giới hạn độ dài hợp lý; không dùng `VARCHAR` không độ dài. |
| Chuỗi văn bản dài | `TEXT` | `@Column({ type: 'text' })` | Dùng cho nội dung mô tả, ghi chú không giới hạn độ dài. |
| Số tiền / Tiền tệ | `NUMERIC(15, 2)` | `@Column({ type: 'decimal', precision: 15, scale: 2 })` | Tuyệt đối không dùng `FLOAT` hoặc `REAL` để lưu số tiền hay lương. |
| Trạng thái / Enum | `VARCHAR(50)` | `@Column({ type: 'varchar', length: 50 })` | Khuyến nghị lưu string enum thay vì Postgres ENUM type để dễ migrate. |
| Dữ liệu JSON | `JSONB` | `@Column({ type: 'jsonb' })` | Dùng `JSONB` thay vì `JSON` để hỗ trợ đánh index và truy vấn trường con. |

### Quy tắc Migration

- Tạo file migration riêng cho từng thay đổi schema; không gộp nhiều tính năng độc lập vào một migration.
- Viết đầy đủ cả hai hàm `up()` và `down()` để bảo đảm khả năng rollback khi xảy ra lỗi triển khai.
- Tuyệt đối không sửa đổi file migration đã được merge hoặc chạy trên bất kỳ môi trường chia sẻ nào.
- Đặt hành vi khóa ngoại mặc định là `ON DELETE RESTRICT` để tránh xóa lan ngoài ý muốn; chỉ dùng `ON DELETE CASCADE` khi quan hệ cha-con gắn liền hữu cơ (ví dụ: `payroll_period` và `payroll_period_details`).

---

## 3. Quy tắc Đánh Index

Đánh index để tối ưu tốc độ đọc và ngăn ngừa quét toàn bộ bảng (Seq Scan).

### Khi nào bắt buộc đánh Index

- **Khóa ngoại (Foreign Keys):** PostgreSQL không tự động index cột khóa ngoại. Bắt buộc tạo index cho toàn bộ các cột `..._id` dùng làm quan hệ.
- **Cột tìm kiếm và lọc thường xuyên:** Các cột xuất hiện liên tục trong mệnh đề `WHERE` (như `email`, `employee_code`, `status`, `department_id`).
- **Cột sắp xếp:** Cột dùng trong `ORDER BY` ở các màn hình danh sách lớn (như `created_at`, `join_date`).

### Chiến lược Index

- **Composite Index (Index tổ hợp):** Tuân thủ quy tắc ESR (Equality -> Sort -> Range). Đặt cột so sánh bằng (`=`) lên đầu, tiếp theo là cột sắp xếp (`ORDER BY`), cuối cùng là cột so sánh khoảng (`<`, `>`, `BETWEEN`).
- **Partial Index (Index có điều kiện):** Dùng Partial Index để giảm dung lượng index khi chỉ truy vấn một tập con dữ liệu:
  - Khi dùng Soft Delete: Tạo unique index kèm điều kiện `WHERE deleted_at IS NULL` (ví dụ: đảm bảo `email` là duy nhất giữa các tài khoản chưa xóa).
  - Khi lọc theo trạng thái đặc thù: Tạo index cho bản ghi chờ xử lý `WHERE status = 'PENDING'`.
- **Tránh Over-indexing:**
  - Không đánh index cho bảng có ít hơn 100 bản ghi.
  - Không đánh index đơn lẻ cho cột có độ chọn lọc thấp (Low Cardinality, ví dụ: cột `gender` chỉ có 2-3 giá trị).
  - Không tạo index trùng lặp (ví dụ: nếu đã có composite index `(department_id, status)` thì không cần tạo thêm index riêng cho `department_id`).

---

## 4. Quản lý Transaction

Bảo đảm tính toàn vẹn dữ liệu nghiệp vụ theo nguyên tắc ACID.

### Khi nào bắt buộc dùng Transaction

- Khi một ca sử dụng (Use Case) thực hiện ghi (INSERT, UPDATE, DELETE) vào từ 2 bảng trở lên.
- Khi cập nhật số dư, hạn mức hoặc trạng thái phụ thuộc lẫn nhau:
  - Phê duyệt đơn nghỉ phép: Cập nhật trạng thái `leave_request` + trừ số ngày phép trong `leave_balance` + tạo bản ghi `attendance_log`.
  - Khóa kỳ lương: Cập nhật trạng thái `payroll_period` + chốt bảng lương `payrolls` + ghi nhật ký audit.
  - Tiếp nhận nhân viên: Tạo bản ghi `employee` + tạo tài khoản `user` + tạo hợp đồng `contract`.

### Quy tắc triển khai Transaction trong TypeORM

- **Dùng DataSource Transaction Runner:**
  ```typescript
  await this.dataSource.transaction(async (manager) => {
    // BẮT BUỘC dùng manager để truy vấn và lưu dữ liệu
    const employee = await manager.getRepository(Employee).findOne({ where: { id: employeeId } });
    await manager.getRepository(LeaveBalance).save(updatedBalance);
  });
  ```
- **Quy tắc cô lập context:** Tuyệt đối KHÔNG gọi `this.employeeRepository` (repository inject từ module) bên trong transaction block; bắt buộc dùng `manager.getRepository(...)` hoặc `manager.save(...)`.
- **Rút ngắn thời gian giữ transaction:**
  - Chuẩn bị dữ liệu, validate input, mã hóa mật khẩu, kiểm tra file trước khi bắt đầu transaction.
  - TUYỆT ĐỐI KHÔNG gọi HTTP API bên ngoài, gửi email, đọc ghi file dung lượng lớn hoặc thực hiện tác vụ nặng bên trong transaction.
- **Kiểm soát tranh chấp (Concurrency & Locking):**
  - Mặc định dùng mức cô lập `READ COMMITTED` của PostgreSQL.
  - Bảo đảm việc xác định bản cũ và ghi dữ liệu là nguyên tử để từ chối lượt lưu từ bản cũ theo [API spec](../api-spec.md).
  - Khi cập nhật dữ liệu tài chính hoặc số dư có nguy cơ Race Condition (như hai đơn nghỉ phép cùng nộp một lúc): Dùng Pessimistic Write Lock (`manager.findOne(LeaveBalance, { where: { id }, lock: { mode: 'pessimistic_write' } })`).

---

## 5. Phòng chống Lỗi N+1 Query

Triệt tiêu việc gửi hàng loạt truy vấn lặp đi lặp lại đến cơ sở dữ liệu.

### Nhận diện lỗi N+1 Query

Lỗi N+1 xảy ra khi ứng dụng tải 1 danh sách cha (1 query), sau đó lặp qua từng phần tử và chạy thêm 1 query cho mỗi phần tử để lấy dữ liệu con (N query). Tổng cộng là $N + 1$ query.

### Quy tắc xử lý

| Tình huống | Cách làm đúng | Cách làm sai (N+1) |
|---|---|---|
| Lấy dữ liệu quan hệ 1-1 hoặc N-1 | Dùng `relations: ['department']` trong `find()` hoặc `.leftJoinAndSelect('emp.department', 'dept')` trong QueryBuilder. | Lặp danh sách nhân viên rồi gọi `departmentRepo.findOne(...)` trong vòng `for`. |
| Lấy dữ liệu quan hệ 1-N số lượng lớn | Tách thành 2 query rõ ràng: Query 1 lấy danh sách cha, Query 2 lấy toàn bộ con bằng `WHERE parent_id IN (...)`, sau đó map dữ liệu trên bộ nhớ. | Join trực tiếp gây nhân bản dòng (Cartesian product) hoặc lặp query con từng dòng. |
| Cấu hình quan hệ TypeORM | Chỉ dùng `eager: true` khi mối quan hệ luôn luôn cần thiết trong mọi ngữ cảnh; mặc định dùng explicit loading. | Bật `lazy: true` (TypeORM lazy loading âm thầm sinh N+1 query khi truy cập property). |
| Chỉ tải trường cần thiết | Dùng `select: ['id', 'full_name', 'email']` để tránh nạp các cột nặng không dùng. | Dùng `SELECT *` mặc định, nạp toàn bộ trường dữ liệu lớn hoặc nhạy cảm. |
| Phân trang danh sách | Bắt buộc có `take`/`limit` và `skip`/`offset` trên mọi endpoint trả về danh sách. | Dùng `.find()` lấy toàn bộ bảng không giới hạn số lượng dòng. |

---

## 6. Bảng kiểm tra nhanh (Do / Don't)

Đối chiếu nhanh trước khi commit mã nguồn liên quan đến cơ sở dữ liệu.

| Hạng mục | Làm (Do) | Không làm (Don't) |
|---|---|---|
| **Migration** | Viết migration có cả `up` và `down` | Bật `synchronize: true` trên môi trường chia sẻ |
| **Khóa chính** | Dùng `UUID` cho các thực thể độc lập | Dùng integer tự tăng cho bảng nhạy cảm |
| **Tiền tệ** | Dùng kiểu `NUMERIC(15, 2)` | Dùng kiểu `FLOAT` hoặc `NUMBER` |
| **Index** | Index mọi khóa ngoại và cột lọc thường xuyên | Bỏ quên index trên cột khóa ngoại `..._id` |
| **Partial Index** | Tạo unique index kèm `WHERE deleted_at IS NULL` | Tạo unique index toàn cục trên bảng có Soft Delete |
| **Transaction** | Mở transaction cho thao tác ghi từ 2 bảng | Chạy nhiều lệnh ghi rời rạc không có bọc transaction |
| **Transaction Body** | Chỉ giữ logic database thuần túy trong transaction | Gọi gửi email, gọi HTTP API bên trong transaction |
| **Entity Manager** | Dùng `manager.getRepository(...)` trong transaction | Dùng repository inject sẵn từ module ngoài transaction |
| **Quan hệ nạp** | Dùng `relations` hoặc `leftJoinAndSelect` | Query trong vòng lặp `for` / `forEach` / `map` |
| **Lazy Loading** | Explicit load quan hệ khi cần thiết | Dùng `@OneToMany({ lazy: true })` |
| **Truy vấn danh sách** | Luôn phân trang với giới hạn tối đa | Cho phép query toàn bộ bảng không có `limit` |

---

## 7. Tài liệu liên quan

- [Naming Conventions](naming.md#database-postgresql): Quy ước đặt tên bảng, cột, khóa ngoại và index.
- [Clean Code](clean-code.md): Quy chuẩn viết code Service và Controller.
- [Tech Stack](../architecture/tech-stack.md): Phiên bản PostgreSQL 18.6 và TypeORM 1.1.2 đã xác nhận.
- [Security Rules](security.md): Quy tắc bảo vệ dữ liệu nhạy cảm và kiểm soát truy cập DB.
