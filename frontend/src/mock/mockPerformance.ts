export interface PerformanceCycle {
  id: string;
  name: string;
  period: string;
  status: 'active' | 'evaluating' | 'completed';
  statusLabel: string;
  completionRate: number;
  deadline: string;
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  weight: number; // percentage
  progress: number; // 0 - 100
  metric: string;
  selfScore?: number; // 1 - 5
  managerScore?: number; // 1 - 5
}

export interface EmployeeReview {
  id: string;
  employeeId: string;
  employeeName: string;
  avatarUrl: string;
  departmentName: string;
  position: string;
  selfRating: 'A' | 'B' | 'C' | 'D' | 'E';
  managerRating: 'A' | 'B' | 'C' | 'D' | 'E';
  finalRating: 'A' | 'B' | 'C' | 'D' | 'E';
  status: 'self_review' | 'manager_review' | 'completed';
  comments: string;
}

export const MOCK_PERF_CYCLES: PerformanceCycle[] = [
  {
    id: 'PERF_2026_Q3',
    name: 'Kỳ Đánh Giá Hiệu Suất Quý 3/2026',
    period: '01/07/2026 - 30/09/2026',
    status: 'evaluating',
    statusLabel: 'Đang Trong Giai Đoạn Đánh Giá (Manager Review)',
    completionRate: 82,
    deadline: '25/10/2026',
  },
  {
    id: 'PERF_2026_Q2',
    name: 'Kỳ Đánh Giá Hiệu Suất Quý 2/2026',
    period: '01/04/2026 - 30/06/2026',
    status: 'completed',
    statusLabel: 'Đã Hoàn Tất Xếp Loại',
    completionRate: 100,
    deadline: '25/07/2026',
  },
];

export const MOCK_GOALS_CURRENT_USER: GoalItem[] = [
  {
    id: 'G01',
    title: 'Phát triển & Tối ưu hóa UI/UX toàn hệ thống HRM',
    description: 'Xây dựng 68 màn hình theo chuẩn Editorial B2B, đạt điểm hiệu năng Lighthouse >= 90.',
    weight: 40,
    progress: 95,
    metric: '68 màn hình & WCAG AA',
    selfScore: 4.8,
    managerScore: 4.7,
  },
  {
    id: 'G02',
    title: 'Giảm 30% thời gian tải trang đầu (FCP)',
    description: 'Áp dụng dynamic import và loại bỏ waterfall rendering theo chuẩn Vercel best practices.',
    weight: 30,
    progress: 85,
    metric: 'FCP < 1.2s',
    selfScore: 4.5,
    managerScore: 4.5,
  },
  {
    id: 'G03',
    title: 'Đào tạo & Hướng dẫn kỹ thuật cho Junior Frontend',
    description: 'Thực hiện 4 buổi chia sẻ kỹ thuật về React 19, Tailwind v4 và Component Design.',
    weight: 30,
    progress: 100,
    metric: '4/4 buổi hoàn thành',
    selfScore: 5.0,
    managerScore: 5.0,
  },
];

export const MOCK_TEAM_REVIEWS: EmployeeReview[] = [
  {
    id: 'REV01',
    employeeId: 'EMP0004',
    employeeName: 'Phạm Văn A',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    position: 'Kỹ Sư Phần Mềm Cao Cấp',
    selfRating: 'A',
    managerRating: 'A',
    finalRating: 'A',
    status: 'completed',
    comments: 'Xuất sắc dẫn dắt nhóm Frontend hoàn thành vượt tiến độ các mốc dự án cốt lõi.',
  },
  {
    id: 'REV02',
    employeeId: 'EMP0005',
    employeeName: 'Nguyễn Thùy Linh',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    position: 'Kỹ Sư Frontend',
    selfRating: 'B',
    managerRating: 'B',
    finalRating: 'B',
    status: 'completed',
    comments: 'Chất lượng giao diện tốt, thẩm mỹ cao, cần chủ động hơn trong các quyết định kiến trúc.',
  },
  {
    id: 'REV03',
    employeeId: 'EMP0006',
    employeeName: 'Hoàng Minh Tuấn',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Khối Công Nghệ',
    position: 'Kỹ Sư Backend Cấp Cao',
    selfRating: 'A',
    managerRating: 'A',
    finalRating: 'A',
    status: 'manager_review',
    comments: 'Hệ thống API ổn định, hiệu năng truy vấn database được tối ưu rõ rệt.',
  },
];
