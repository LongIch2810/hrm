import { StatusBadgeVariant } from '../shared/types/common';

export interface LeaveBalance {
  standardDays: number;
  seniorityDays: number;
  usedDays: number;
  availableDays: number;
}

export interface LeaveRequest {
  id: string;
  code: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  departmentName: string;
  leaveType: 'Phép năm' | 'Nghỉ ốm (BHXH)' | 'Nghỉ thai sản' | 'Nghỉ việc riêng' | 'Nghỉ không lương';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  handoverPerson?: string;
  approverName: string;
  status: StatusBadgeVariant;
  canCancel: boolean;
  createdAt: string;
}

export interface LeaveCalendarEvent {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  departmentName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  daysCount: number;
}

export const INITIAL_LEAVE_BALANCE: LeaveBalance = {
  standardDays: 12.0,
  seniorityDays: 1.0,
  usedDays: 4.5,
  availableDays: 8.5,
};

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LV01',
    code: 'LV2026-0042',
    employeeId: 'EMP0004',
    employeeName: 'Phạm Văn A',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    leaveType: 'Phép năm',
    startDate: '28/10/2026',
    endDate: '29/10/2026',
    totalDays: 2.0,
    reason: 'Giải quyết việc cá nhân gia đình tại quê.',
    handoverPerson: 'Nguyễn Thùy Linh',
    approverName: 'Lê Hoàng Nam',
    status: 'approved',
    canCancel: true, // Not yet occurred -> can cancel to refund days
    createdAt: '19/10/2026',
  },
  {
    id: 'LV02',
    code: 'LV2026-0038',
    employeeId: 'EMP0005',
    employeeName: 'Nguyễn Thùy Linh',
    employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    leaveType: 'Phép năm',
    startDate: '24/10/2026',
    endDate: '24/10/2026',
    totalDays: 1.0,
    reason: 'Tham gia hội thảo thiết kế phần mềm doanh nghiệp.',
    handoverPerson: 'Phạm Văn A',
    approverName: 'Lê Hoàng Nam',
    status: 'pending',
    canCancel: false,
    createdAt: '20/10/2026',
  },
  {
    id: 'LV03',
    code: 'LV2026-0035',
    employeeId: 'EMP0006',
    employeeName: 'Hoàng Minh Tuấn',
    employeeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    leaveType: 'Nghỉ ốm (BHXH)',
    startDate: '12/10/2026',
    endDate: '13/10/2026',
    totalDays: 2.0,
    reason: 'Khám bệnh và điều trị ngoại trú có giấy chỉ định của bác sĩ.',
    handoverPerson: 'Đặng Đình Khoa',
    approverName: 'Lê Hoàng Nam',
    status: 'approved',
    canCancel: false, // In the past
    createdAt: '11/10/2026',
  },
  {
    id: 'LV04',
    code: 'LV2026-0029',
    employeeId: 'EMP0007',
    employeeName: 'Đoàn Bảo Ngọc',
    employeeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Phòng Quản Trị Nhân Sự',
    leaveType: 'Phép năm',
    startDate: '05/10/2026',
    endDate: '05/10/2026',
    totalDays: 1.0,
    reason: 'Đang trong giai đoạn thử việc chưa tích lũy đủ quỹ phép năm.',
    approverName: 'Trần Thị Thu Thảo',
    status: 'rejected',
    canCancel: false,
    createdAt: '03/10/2026',
  },
];

export const MOCK_LEAVE_CALENDAR: LeaveCalendarEvent[] = [
  { id: 'LC01', employeeName: 'Phạm Văn A', employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', departmentName: 'Khối Công Nghệ', leaveType: 'Phép năm', startDate: '28/10/2026', endDate: '29/10/2026', daysCount: 2 },
  { id: 'LC02', employeeName: 'Nguyễn Thùy Linh', employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', departmentName: 'Khối Công Nghệ', leaveType: 'Hội thảo / Phép', startDate: '24/10/2026', endDate: '24/10/2026', daysCount: 1 },
  { id: 'LC03', employeeName: 'Mai Phương Uyên', employeeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', departmentName: 'Khối Công Nghệ', leaveType: 'Nghỉ thai sản', startDate: '01/10/2026', endDate: '31/03/2027', daysCount: 180 },
];
