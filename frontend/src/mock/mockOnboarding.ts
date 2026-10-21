export interface OnboardingItem {
  id: string;
  employeeName: string;
  avatarUrl: string;
  position: string;
  departmentName: string;
  startDate: string;
  progressPercent: number;
  status: 'in_progress' | 'completed';
  tasks: {
    party: 'HR' | 'IT' | 'Bộ Phận' | 'Nhân Viên';
    title: string;
    completed: boolean;
  }[];
}

export interface OffboardingItem {
  id: string;
  employeeName: string;
  avatarUrl: string;
  position: string;
  departmentName: string;
  lastWorkingDate: string;
  progressPercent: number;
  status: 'in_progress' | 'completed';
  tasks: {
    category: 'Bàn giao thiết bị' | 'Bàn giao tài khoản & dữ liệu' | 'Quyết toán công & lương' | 'Phỏng vấn thôi việc (Exit Interview)';
    completed: boolean;
  }[];
}

export const MOCK_ONBOARDING: OnboardingItem[] = [
  {
    id: 'ONB01',
    employeeName: 'Trần Quang Khải',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    position: 'Lập Trình Viên Frontend (Junior)',
    departmentName: 'Khối Công Nghệ',
    startDate: '01/08/2026',
    progressPercent: 75,
    status: 'in_progress',
    tasks: [
      { party: 'HR', title: 'Thu thập hồ sơ lý lịch & ký HĐ thử việc', completed: true },
      { party: 'IT', title: 'Cấp laptop Macbook Pro, email và tài khoản GitHub', completed: true },
      { party: 'Bộ Phận', title: 'Chỉ định Mentor hướng dẫn và bàn giao tài liệu dự án', completed: true },
      { party: 'Nhân Viên', title: 'Hoàn thành khóa học hội nhập văn hóa công ty', completed: false },
    ],
  },
  {
    id: 'ONB02',
    employeeName: 'Đoàn Bảo Ngọc',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    position: 'Chuyên Viên Tuyển Dụng',
    departmentName: 'Phòng Quản Trị Nhân Sự',
    startDate: '01/09/2026',
    progressPercent: 50,
    status: 'in_progress',
    tasks: [
      { party: 'HR', title: 'Ký hợp đồng & kích hoạt tài khoản hệ thống HRM', completed: true },
      { party: 'IT', title: 'Cấp máy tính để bàn & tài khoản LinkedIn Recruiter', completed: true },
      { party: 'Bộ Phận', title: 'Đào tạo quy trình lọc CV và SLA phỏng vấn', completed: false },
      { party: 'Nhân Viên', title: 'Lập kế hoạch mục tiêu thử việc 2 tháng', completed: false },
    ],
  },
];

export const MOCK_OFFBOARDING: OffboardingItem[] = [
  {
    id: 'OFF01',
    employeeName: 'Phạm Hồng Đức',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    position: 'Chuyên Viên Kinh Doanh',
    departmentName: 'Khối Kinh Doanh & Tiếp Thị',
    lastWorkingDate: '30/09/2026',
    progressPercent: 100,
    status: 'completed',
    tasks: [
      { category: 'Bàn giao thiết bị', completed: true },
      { category: 'Bàn giao tài khoản & dữ liệu', completed: true },
      { category: 'Quyết toán công & lương', completed: true },
      { category: 'Phỏng vấn thôi việc (Exit Interview)', completed: true },
    ],
  },
];
