export interface JobPosition {
  id: string;
  code: string;
  title: string;
  departmentName: string;
  location: string;
  type: string;
  headcountNeeded: number;
  applicantsCount: number;
  status: 'active' | 'closed';
  salaryRange: string;
  deadline: string;
}

export type CandidateStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired';

export interface Candidate {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  stage: CandidateStage;
  appliedDate: string;
  score?: number; // 1 - 5 stars or 100 scale
  interviewNotes?: string;
  experienceYears: number;
}

export const MOCK_JOBS: JobPosition[] = [
  {
    id: 'JOB01',
    code: 'JOB-ENG-01',
    title: 'Senior Frontend Engineer (React/Tailwind)',
    departmentName: 'Khối Công Nghệ',
    location: 'Hà Nội (Hybrid)',
    type: 'Toàn thời gian',
    headcountNeeded: 2,
    applicantsCount: 18,
    status: 'active',
    salaryRange: '35 - 50 Triệu VNĐ',
    deadline: '15/11/2026',
  },
  {
    id: 'JOB02',
    code: 'JOB-ENG-02',
    title: 'NestJS Backend Developer (PostgreSQL)',
    departmentName: 'Khối Công Nghệ',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    headcountNeeded: 3,
    applicantsCount: 14,
    status: 'active',
    salaryRange: '28 - 42 Triệu VNĐ',
    deadline: '20/11/2026',
  },
  {
    id: 'JOB03',
    code: 'JOB-SALES-01',
    title: 'B2B Enterprise Sales Executive',
    departmentName: 'Khối Kinh Doanh',
    location: 'TP. Hồ Chí Minh',
    type: 'Toàn thời gian',
    headcountNeeded: 2,
    applicantsCount: 8,
    status: 'active',
    salaryRange: '18 - 25 Triệu + Hoa hồng',
    deadline: '30/11/2026',
  },
  {
    id: 'JOB04',
    code: 'JOB-HR-01',
    title: 'HR Generalist (C&B & Quan Hệ Lao Động)',
    departmentName: 'Phòng Quản Trị Nhân Sự',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    headcountNeeded: 1,
    applicantsCount: 6,
    status: 'active',
    salaryRange: '16 - 22 Triệu VNĐ',
    deadline: '10/11/2026',
  },
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'CAN01',
    fullName: 'Lê Minh Khang',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'khang.le@gmail.com',
    phone: '0912003344',
    jobId: 'JOB01',
    jobTitle: 'Senior Frontend Engineer',
    stage: 'applied',
    appliedDate: '20/10/2026',
    experienceYears: 5,
  },
  {
    id: 'CAN02',
    fullName: 'Hoàng Thị Cẩm Tú',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'tu.cam@outlook.com',
    phone: '0988112244',
    jobId: 'JOB01',
    jobTitle: 'Senior Frontend Engineer',
    stage: 'screening',
    appliedDate: '18/10/2026',
    experienceYears: 4,
    score: 85,
  },
  {
    id: 'CAN03',
    fullName: 'Trần Đình Trọng',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'trong.tran@yahoo.com',
    phone: '0933778899',
    jobId: 'JOB01',
    jobTitle: 'Senior Frontend Engineer',
    stage: 'interview',
    appliedDate: '12/10/2026',
    experienceYears: 6,
    score: 92,
    interviewNotes: 'Nắm rất vững React 19, TypeScript và tối ưu Core Web Vitals. Giao tiếp mạch lạc.',
  },
  {
    id: 'CAN04',
    fullName: 'Nguyễn Thị Hải Yến',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'yen.hai@gmail.com',
    phone: '0966445566',
    jobId: 'JOB04',
    jobTitle: 'HR Generalist',
    stage: 'offer',
    appliedDate: '05/10/2026',
    experienceYears: 3,
    score: 88,
    interviewNotes: 'Đã gửi thư mời nhận việc ngày 19/10, chờ phản hồi xác nhận.',
  },
  {
    id: 'CAN05',
    fullName: 'Đỗ Hữu Nghĩa',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'nghia.do@gmail.com',
    phone: '0977223344',
    jobId: 'JOB02',
    jobTitle: 'NestJS Backend Developer',
    stage: 'hired',
    appliedDate: '28/09/2026',
    experienceYears: 4,
    score: 95,
    interviewNotes: 'Đã nhận việc, bắt đầu Onboarding từ ngày 01/11/2026.',
  },
];
