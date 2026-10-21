# Business Rules — Department Management

- **Module ID:** DEPT
- **Parent Spec:** docs/PRD.md#8
- **Traces-To:** docs/prd/function-requirement/department-management.md
- **Use Cases:** docs/prd/usecase/department-management.md

## 1. Danh mục Quy tắc nghiệp vụ

### BR-DEPT-001: Mô hình cơ cấu tổ chức và phòng ban

- **Nội dung quy tắc:**
  - Mô hình tổ chức được thiết lập theo dạng cây phân cấp (Hierarchical Tree).
  - Một phòng ban có thể có một phòng ban cấp trên trực tiếp (Parent Department) hoặc là phòng ban gốc (Root).
  - Nghiêm cấm tạo vòng lặp quan hệ (Circular Dependency, ví dụ: A là cha của B, B lại là cha của A).
  - Tên phòng ban và Mã phòng ban phải là duy nhất trong toàn hệ thống.
- **Hành vi khi vi phạm:** Báo lỗi `CIRCULAR_HIERARCHY_DETECTED` hoặc `DUPLICATE_DEPARTMENT_CODE`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-001, PD-012`).
- **Quy tắc đã chốt:** Hệ thống áp dụng mô hình đơn pháp nhân (Single-company) cho doanh nghiệp SME; cây phân cấp đa tầng linh hoạt (Multi-level Tree), không giới hạn độ sâu; cấm tuyệt đối tạo vòng lặp quan hệ cha-con.

### BR-DEPT-002: Phân công nhân sự và gán quản lý phòng ban

- **Nội dung quy tắc:**
  - Mỗi nhân viên chỉ thuộc về một phòng ban chính tại một thời điểm.
  - Một phòng ban chỉ có duy nhất một Trưởng phòng (Head of Department) và tối đa hai Phó phòng (Deputy Head) tại cùng một thời điểm.
  - Khi phòng ban bị đóng/ngừng hoạt động, hệ thống bắt buộc điều chuyển toàn bộ nhân sự sang phòng ban khác trước khi đóng.
- **Hành vi khi vi phạm:** Báo lỗi `DEPARTMENT_HAS_ACTIVE_EMPLOYEES` hoặc `MANAGER_ALREADY_ASSIGNED`.
- **Status:** Confirmed — Approved by Product Owner (2026-10-21, `PD-012`).
- **Quy tắc đã chốt:** Phòng ban cho phép tối đa 1 Trưởng phòng và 2 Phó phòng; Trưởng phòng có thẩm quyền duyệt đơn chấm công/nghỉ phép cho nhân viên thuộc phòng ban mình.

### BR-DEPT-AUTH-001: Phân quyền quản trị cơ cấu tổ chức

- **Department Manager:** Chỉ được xem sơ đồ phòng ban của mình và các phòng ban cấp dưới trực thuộc.
- **HR Staff / System Admin:** Được phép tạo mới, đổi tên hoặc tái cấu trúc phòng ban.
