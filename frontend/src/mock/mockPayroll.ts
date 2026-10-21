export interface PayrollCycle {
  id: string;
  name: string;
  period: string;
  status: 'draft' | 'pending' | 'approved' | 'paid';
  statusLabel: string;
  totalEmployees: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  payDate: string;
}

export interface PayslipDetail {
  id: string;
  employeeCode: string;
  employeeName: string;
  departmentName: string;
  position: string;
  cyclePeriod: string;
  standardWorkDays: number;
  actualWorkDays: number;
  basicSalary: number;
  positionAllowance: number;
  lunchAllowance: number;
  otPay: number;
  bonus: number;
  grossSalary: number;
  bhxhDeduction: number;
  bhytDeduction: number;
  bhtnDeduction: number;
  taxableIncome: number;
  personalIncomeTax: number;
  totalDeductions: number;
  netSalary: number;
  bankAccount: string;
  bankName: string;
}

export const MOCK_PAYROLL_CYCLES: PayrollCycle[] = [
  {
    id: 'CYCLE_2026_10',
    name: 'Bảng Lương Tháng 10/2026',
    period: '01/10/2026 - 31/10/2026',
    status: 'draft',
    statusLabel: 'Đang Tính Toán (Bản Nháp)',
    totalEmployees: 184,
    totalGross: 4850000000,
    totalDeductions: 512000000,
    totalNet: 4338000000,
    payDate: '05/11/2026',
  },
  {
    id: 'CYCLE_2026_09',
    name: 'Bảng Lương Tháng 09/2026',
    period: '01/09/2026 - 30/09/2026',
    status: 'paid',
    statusLabel: 'Đã Thanh Toán Hoàn Tất',
    totalEmployees: 182,
    totalGross: 4790000000,
    totalDeductions: 505000000,
    totalNet: 4285000000,
    payDate: '05/10/2026',
  },
  {
    id: 'CYCLE_2026_08',
    name: 'Bảng Lương Tháng 08/2026',
    period: '01/08/2026 - 31/08/2026',
    status: 'paid',
    statusLabel: 'Đã Thanh Toán Hoàn Tất',
    totalEmployees: 180,
    totalGross: 4710000000,
    totalDeductions: 498000000,
    totalNet: 4212000000,
    payDate: '05/09/2026',
  },
];

export const MOCK_CURRENT_USER_PAYSLIP: PayslipDetail = {
  id: 'SLIP_EMP0004_202609',
  employeeCode: 'EMP0004',
  employeeName: 'Phạm Văn A',
  departmentName: 'Khối Công Nghệ & Kỹ Thuật',
  position: 'Kỹ Sư Phần Mềm Cao Cấp (Team Lead)',
  cyclePeriod: 'Tháng 09/2026 (01/09 - 30/09/2026)',
  standardWorkDays: 22,
  actualWorkDays: 22,
  basicSalary: 38000000,
  positionAllowance: 3000000,
  lunchAllowance: 1100000,
  otPay: 1850000,
  bonus: 2000000,
  grossSalary: 45950000,
  bhxhDeduction: 3040000, // 8% of 38m
  bhytDeduction: 570000,  // 1.5%
  bhtnDeduction: 380000,  // 1%
  taxableIncome: 30960000,
  personalIncomeTax: 3450000,
  totalDeductions: 7440000,
  netSalary: 38510000,
  bankAccount: '1903****8899',
  bankName: 'Techcombank - Chi nhánh Thăng Long',
};
