export interface Contract {
  id: string;
  contractNumber: string;
  employeeId: string;
  employeeName: string;
  avatarUrl: string;
  departmentName: string;
  contractType: 'Thử việc' | 'Xác định thời hạn 1 năm' | 'Xác định thời hạn 3 năm' | 'Không xác định thời hạn';
  startDate: string;
  endDate: string | null;
  basicSalary: number;
  status: 'active' | 'expiring_soon' | 'expired' | 'terminated';
  daysUntilExpiry?: number;
}

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'CON01',
    contractNumber: 'HDLD-2023-0042',
    employeeId: 'EMP0005',
    employeeName: 'Nguyễn Thùy Linh',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    contractType: 'Xác định thời hạn 1 năm',
    startDate: '01/11/2025',
    endDate: '31/10/2026',
    basicSalary: 25000000,
    status: 'expiring_soon',
    daysUntilExpiry: 10, // <= 30 days alert!
  },
  {
    id: 'CON02',
    contractNumber: 'HDTV-2026-0018',
    employeeId: 'EMP0007',
    employeeName: 'Đoàn Bảo Ngọc',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Phòng Quản Trị Nhân Sự',
    contractType: 'Thử việc',
    startDate: '01/09/2026',
    endDate: '31/10/2026',
    basicSalary: 16000000,
    status: 'expiring_soon',
    daysUntilExpiry: 10, // <= 30 days alert!
  },
  {
    id: 'CON03',
    contractNumber: 'HDTV-2026-0019',
    employeeId: 'EMP0012',
    employeeName: 'Trần Quang Khải',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    contractType: 'Thử việc',
    startDate: '01/08/2026',
    endDate: '30/10/2026',
    basicSalary: 14000000,
    status: 'expiring_soon',
    daysUntilExpiry: 9, // <= 30 days alert!
  },
  {
    id: 'CON04',
    contractNumber: 'HDLD-2021-0015',
    employeeId: 'EMP0004',
    employeeName: 'Phạm Văn A',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    contractType: 'Xác định thời hạn 3 năm',
    startDate: '10/08/2024',
    endDate: '09/08/2027',
    basicSalary: 38000000,
    status: 'active',
  },
  {
    id: 'CON05',
    contractNumber: 'HDLD-2020-0001',
    employeeId: 'EMP0003',
    employeeName: 'Lê Hoàng Nam',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    contractType: 'Không xác định thời hạn',
    startDate: '01/06/2020',
    endDate: null,
    basicSalary: 55000000,
    status: 'active',
  },
];
