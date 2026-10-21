export interface AuditLogItem {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
}

export interface SystemParameter {
  key: string;
  name: string;
  value: string;
  description: string;
  category: 'Bảo Mật' | 'Chấm Công' | 'Nghỉ Phép' | 'Email';
}

export interface RolePermissionRow {
  moduleName: string;
  moduleCode: string;
  admin: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  hr: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  manager: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  employee: { read: boolean; write: boolean; approve: boolean; delete: boolean };
}

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'AUD001',
    actorName: 'Nguyễn Văn An',
    actorEmail: 'admin@hrm.company.vn',
    action: 'Cập nhật phân quyền vai trò',
    module: 'SYS (Quản trị)',
    ipAddress: '192.168.1.10',
    timestamp: '21/10/2026 10:45:12',
    status: 'success',
    details: 'Thay đổi quyền xem bảng lương cho vai trò HR Lead.',
  },
  {
    id: 'AUD002',
    actorName: 'Hệ thống tự động',
    actorEmail: 'system@hrm.company.vn',
    action: 'Cảnh báo đăng nhập thất bại',
    module: 'AUTH (Xác thực)',
    ipAddress: '14.161.42.18',
    timestamp: '21/10/2026 09:12:05',
    status: 'warning',
    details: 'Tài khoản thao.tran@hrm.company.vn nhập sai mật khẩu 3 lần liên tiếp.',
  },
  {
    id: 'AUD003',
    actorName: 'Lê Hoàng Nam',
    actorEmail: 'nam.le@hrm.company.vn',
    action: 'Phê duyệt đơn nghỉ phép',
    module: 'LEAVE (Nghỉ phép)',
    ipAddress: '192.168.1.45',
    timestamp: '20/10/2026 16:30:00',
    status: 'success',
    details: 'Duyệt đơn LV2026-0042 của Phạm Văn A (2 ngày).',
  },
  {
    id: 'AUD004',
    actorName: 'Trần Thị Thu Thảo',
    actorEmail: 'thao.tran@hrm.company.vn',
    action: 'Tạo hồ sơ nhân viên mới',
    module: 'EMP (Nhân sự)',
    ipAddress: '192.168.1.28',
    timestamp: '20/10/2026 14:15:22',
    status: 'success',
    details: 'Tạo mã hồ sơ EMP0012 cho Trần Quang Khải.',
  },
  {
    id: 'AUD005',
    actorName: 'Phạm Văn A',
    actorEmail: 'a.pham@hrm.company.vn',
    action: 'Đổi mật khẩu người dùng',
    module: 'AUTH (Xác thực)',
    ipAddress: '192.168.1.55',
    timestamp: '19/10/2026 08:35:10',
    status: 'success',
    details: 'Người dùng đổi mật khẩu cá nhân thành công.',
  },
];

export const MOCK_SYSTEM_PARAMS: SystemParameter[] = [
  { key: 'AUTH_MAX_FAILED_ATTEMPTS', name: 'Số lần đăng nhập sai tối đa', value: '5', description: 'Tài khoản sẽ bị khóa tạm thời 15 phút nếu vượt quá số lần này.', category: 'Bảo Mật' },
  { key: 'AUTH_LOCKOUT_MINUTES', name: 'Thời gian khóa tài khoản tạm thời', value: '15', description: 'Số phút tài khoản bị khóa do tấn công brute-force.', category: 'Bảo Mật' },
  { key: 'ATT_STANDARD_WORK_HOURS', name: 'Số giờ làm việc chuẩn mỗi ngày', value: '8.0', description: 'Căn cứ tính công chuẩn 1 công.', category: 'Chấm Công' },
  { key: 'ATT_LATE_GRACE_MINUTES', name: 'Số phút ân hạn đi muộn cho phép', value: '15', description: 'Check-in trong khoảng này không bị tính vi phạm.', category: 'Chấm Công' },
  { key: 'LEAVE_STANDARD_DAYS_PER_YEAR', name: 'Quỹ phép năm cơ bản', value: '12', description: 'Số ngày phép năm tiêu chuẩn cấp cho nhân viên chính thức.', category: 'Nghỉ Phép' },
  { key: 'CONTRACT_EXPIRY_ALERT_DAYS', name: 'Cảnh báo hợp đồng sắp hết hạn', value: '30', description: 'Số ngày cảnh báo đỏ trước khi hợp đồng lao động kết thúc.', category: 'Bảo Mật' },
];

export const MOCK_RBAC_MATRIX: RolePermissionRow[] = [
  {
    moduleName: 'Quản Lý Nhân Sự (EMP)',
    moduleCode: 'EMP',
    admin: { read: true, write: true, approve: true, delete: true },
    hr: { read: true, write: true, approve: true, delete: false },
    manager: { read: true, write: false, approve: false, delete: false },
    employee: { read: false, write: false, approve: false, delete: false },
  },
  {
    moduleName: 'Chấm Công & Thời Gian (ATT)',
    moduleCode: 'ATT',
    admin: { read: true, write: true, approve: true, delete: true },
    hr: { read: true, write: true, approve: true, delete: false },
    manager: { read: true, write: true, approve: true, delete: false },
    employee: { read: true, write: true, approve: false, delete: false },
  },
  {
    moduleName: 'Quản Lý Nghỉ Phép (LEAVE)',
    moduleCode: 'LEAVE',
    admin: { read: true, write: true, approve: true, delete: true },
    hr: { read: true, write: true, approve: true, delete: false },
    manager: { read: true, write: true, approve: true, delete: false },
    employee: { read: true, write: true, approve: false, delete: false },
  },
  {
    moduleName: 'Quản Lý Tiền Lương (PAY)',
    moduleCode: 'PAY',
    admin: { read: true, write: true, approve: true, delete: true },
    hr: { read: true, write: true, approve: false, delete: false },
    manager: { read: false, write: false, approve: false, delete: false },
    employee: { read: true, write: false, approve: false, delete: false }, // Chỉ xem phiếu lương cá nhân
  },
  {
    moduleName: 'Tuyển Dụng & Ứng Viên (REC)',
    moduleCode: 'REC',
    admin: { read: true, write: true, approve: true, delete: true },
    hr: { read: true, write: true, approve: true, delete: true },
    manager: { read: true, write: true, approve: false, delete: false },
    employee: { read: true, write: false, approve: false, delete: false },
  },
  {
    moduleName: 'Quản Trị Hệ Thống (SYS)',
    moduleCode: 'SYS',
    admin: { read: true, write: true, approve: true, delete: true },
    hr: { read: false, write: false, approve: false, delete: false },
    manager: { read: false, write: false, approve: false, delete: false },
    employee: { read: false, write: false, approve: false, delete: false },
  },
];
