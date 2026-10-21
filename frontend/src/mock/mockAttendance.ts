export interface AttendanceToday {
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  shiftName: string;
  shiftHours: string;
  workDurationFormatted: string;
  statusText: string;
  statusVariant: 'active' | 'warning' | 'info';
}

export interface TimesheetDay {
  date: string;
  dayOfWeek: string;
  checkIn: string;
  checkOut: string;
  standardWorkHours: number;
  actualWorkHours: number;
  otHours: number;
  statusCode: 'X' | 'P' | 'O' | 'M' | 'V' | 'OFF';
  statusLabel: string;
}

export interface OvertimeRequest {
  id: string;
  code: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  departmentName: string;
  date: string;
  hours: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approverName: string;
  submittedAt: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  workDays: string;
  isFlexible: boolean;
}

export const INITIAL_TODAY_ATTENDANCE: AttendanceToday = {
  isCheckedIn: true,
  isCheckedOut: false,
  checkInTime: '08:08:24',
  checkOutTime: null,
  shiftName: 'Ca Hành Chính',
  shiftHours: '08:00 - 17:30 (Nghỉ trưa: 12:00 - 13:30)',
  workDurationFormatted: '5 giờ 42 phút',
  statusText: 'Đúng giờ (Check-in lúc 08:08)',
  statusVariant: 'active',
};

export const MOCK_TIMESHEET_DAYS: TimesheetDay[] = [
  { date: '01/10/2026', dayOfWeek: 'T5', checkIn: '08:04', checkOut: '17:35', standardWorkHours: 8, actualWorkHours: 8, otHours: 0, statusCode: 'X', statusLabel: 'Đủ công' },
  { date: '02/10/2026', dayOfWeek: 'T6', checkIn: '08:02', checkOut: '19:30', standardWorkHours: 8, actualWorkHours: 8, otHours: 2, statusCode: 'O', statusLabel: 'Làm thêm giờ (2h OT)' },
  { date: '03/10/2026', dayOfWeek: 'T7', checkIn: '--:--', checkOut: '--:--', standardWorkHours: 0, actualWorkHours: 0, otHours: 0, statusCode: 'OFF', statusLabel: 'Nghỉ cuối tuần' },
  { date: '04/10/2026', dayOfWeek: 'CN', checkIn: '--:--', checkOut: '--:--', standardWorkHours: 0, actualWorkHours: 0, otHours: 0, statusCode: 'OFF', statusLabel: 'Nghỉ cuối tuần' },
  { date: '05/10/2026', dayOfWeek: 'T2', checkIn: '08:05', checkOut: '17:32', standardWorkHours: 8, actualWorkHours: 8, otHours: 0, statusCode: 'X', statusLabel: 'Đủ công' },
  { date: '06/10/2026', dayOfWeek: 'T3', checkIn: '08:22', checkOut: '17:30', standardWorkHours: 8, actualWorkHours: 7.6, otHours: 0, statusCode: 'M', statusLabel: 'Đi muộn (22 phút)' },
  { date: '07/10/2026', dayOfWeek: 'T4', checkIn: '--:--', checkOut: '--:--', standardWorkHours: 8, actualWorkHours: 0, otHours: 0, statusCode: 'P', statusLabel: 'Nghỉ phép năm (Có phép)' },
  { date: '08/10/2026', dayOfWeek: 'T5', checkIn: '08:00', checkOut: '17:30', standardWorkHours: 8, actualWorkHours: 8, otHours: 0, statusCode: 'X', statusLabel: 'Đủ công' },
  { date: '09/10/2026', dayOfWeek: 'T6', checkIn: '07:58', checkOut: '17:31', standardWorkHours: 8, actualWorkHours: 8, otHours: 0, statusCode: 'X', statusLabel: 'Đủ công' },
  { date: '10/10/2026', dayOfWeek: 'T7', checkIn: '--:--', checkOut: '--:--', standardWorkHours: 0, actualWorkHours: 0, otHours: 0, statusCode: 'OFF', statusLabel: 'Nghỉ cuối tuần' },
];

export const MOCK_OT_REQUESTS: OvertimeRequest[] = [
  {
    id: 'OT01',
    code: 'OT2026-0012',
    employeeId: 'EMP0004',
    employeeName: 'Phạm Văn A',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    date: '22/10/2026',
    hours: 2.5,
    reason: 'Triển khai bản phát hành Release v2.4 cho khách hàng doanh nghiệp.',
    status: 'pending',
    approverName: 'Lê Hoàng Nam',
    submittedAt: '20/10/2026 14:30',
  },
  {
    id: 'OT02',
    code: 'OT2026-0011',
    employeeId: 'EMP0006',
    employeeName: 'Hoàng Minh Tuấn',
    employeeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    date: '18/10/2026',
    hours: 3.0,
    reason: 'Khắc phục sự cố tắc nghẽn hàng đợi thông báo.',
    status: 'approved',
    approverName: 'Lê Hoàng Nam',
    submittedAt: '17/10/2026 10:15',
  },
];

export const MOCK_SHIFTS: Shift[] = [
  { id: 'SH01', name: 'Ca Hành Chính Chuẩn', startTime: '08:00', endTime: '17:30', breakTime: '12:00 - 13:30 (90 phút)', workDays: 'Thứ 2 - Thứ 6', isFlexible: false },
  { id: 'SH02', name: 'Ca Linh Hoạt Kỹ Thuật', startTime: '09:00', endTime: '18:30', breakTime: '12:00 - 13:30 (90 phút)', workDays: 'Thứ 2 - Thứ 6', isFlexible: true },
  { id: 'SH03', name: 'Ca Trực Vận Hành Cuối Tuần', startTime: '08:30', endTime: '16:30', breakTime: '12:00 - 13:00 (60 phút)', workDays: 'Thứ 7 - Chủ Nhật', isFlexible: false },
];
