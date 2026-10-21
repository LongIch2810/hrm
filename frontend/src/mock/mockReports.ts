export interface ExecutiveKpiSummary {
  totalHeadcount: number;
  probationCount: number;
  monthlyTurnoverRate: number; // percentage
  attendanceRateToday: number; // percentage
  totalPayrollBudget: number;
  openPositions: number;
}

export interface DepartmentHeadcountChart {
  departmentName: string;
  count: number;
  percentage: number;
}

export interface MonthlyAttendanceStat {
  month: string;
  onTimeRate: number;
  lateRate: number;
  leaveRate: number;
}

export const MOCK_EXECUTIVE_KPIS: ExecutiveKpiSummary = {
  totalHeadcount: 184,
  probationCount: 22,
  monthlyTurnoverRate: 1.2,
  attendanceRateToday: 95.6,
  totalPayrollBudget: 4850000000,
  openPositions: 5,
};

export const MOCK_DEPT_DISTRIBUTION: DepartmentHeadcountChart[] = [
  { departmentName: 'Khối Công Nghệ & Kỹ Thuật', count: 24, percentage: 38 },
  { departmentName: 'Khối Kinh Doanh & Tiếp Thị', count: 32, percentage: 40 },
  { departmentName: 'Phòng Quản Trị Nhân Sự', count: 8, percentage: 10 },
  { departmentName: 'Phòng Tài Chính Kế Toán', count: 6, percentage: 7 },
  { departmentName: 'Ban Giám Đốc', count: 4, percentage: 5 },
];

export const MOCK_MONTHLY_ATTENDANCE_STATS: MonthlyAttendanceStat[] = [
  { month: 'T05', onTimeRate: 94.2, lateRate: 4.1, leaveRate: 1.7 },
  { month: 'T06', onTimeRate: 95.1, lateRate: 3.5, leaveRate: 1.4 },
  { month: 'T07', onTimeRate: 93.8, lateRate: 4.5, leaveRate: 1.7 },
  { month: 'T08', onTimeRate: 96.0, lateRate: 2.8, leaveRate: 1.2 },
  { month: 'T09', onTimeRate: 95.4, lateRate: 3.2, leaveRate: 1.4 },
  { month: 'T10', onTimeRate: 95.6, lateRate: 3.0, leaveRate: 1.4 },
];
