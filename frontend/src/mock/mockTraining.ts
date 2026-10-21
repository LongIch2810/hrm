export interface TrainingCourse {
  id: string;
  code: string;
  title: string;
  category: string;
  instructor: string;
  durationHours: number;
  startDate: string;
  endDate: string;
  enrolledCount: number;
  maxParticipants: number;
  status: 'upcoming' | 'in_progress' | 'completed';
  description: string;
}

export interface MyCourseCertificate {
  courseId: string;
  courseTitle: string;
  completedDate: string;
  score: number;
  certificateCode: string;
  status: 'passed' | 'studying';
}

export const MOCK_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'TR01',
    code: 'TR-DEV-01',
    title: 'Kiến Trúc React 19 & Tailwind CSS v4 Chuyên Sâu',
    category: 'Kỹ Thuật Phần Mềm',
    instructor: 'Phạm Văn A (Tech Lead)',
    durationHours: 16,
    startDate: '05/11/2026',
    endDate: '12/11/2026',
    enrolledCount: 14,
    maxParticipants: 20,
    status: 'upcoming',
    description: 'Nắm vững Server Actions, useOptimistic, CSS Themes inline và chuẩn tối ưu hiệu năng.',
  },
  {
    id: 'TR02',
    code: 'TR-SEC-01',
    title: 'An Toàn Thông Tin & Phòng Chống Tấn Công Brute-force',
    category: 'Bảo Mật & Tuân Thủ',
    instructor: 'Nguyễn Văn An (Head of IT)',
    durationHours: 8,
    startDate: '15/10/2026',
    endDate: '16/10/2026',
    enrolledCount: 38,
    maxParticipants: 40,
    status: 'completed',
    description: 'Quy tắc quản lý mật khẩu, MFA, phân quyền RBAC và an ninh dữ liệu nhân sự.',
  },
  {
    id: 'TR03',
    code: 'TR-LEAD-01',
    title: 'Kỹ Năng Quản Lý Hiệu Suất & Đánh Giá OKR Nhân Viên',
    category: 'Lãnh Đạo & Quản Trị',
    instructor: 'Trần Thị Thu Thảo (HR Lead)',
    durationHours: 12,
    startDate: '20/10/2026',
    endDate: '24/10/2026',
    enrolledCount: 12,
    maxParticipants: 15,
    status: 'in_progress',
    description: 'Phương pháp phân bổ mục tiêu, phản hồi 1-on-1 và xếp loại nhân sự công bằng.',
  },
];

export const MOCK_MY_CERTIFICATES: MyCourseCertificate[] = [
  {
    courseId: 'TR02',
    courseTitle: 'An Toàn Thông Tin & Phòng Chống Tấn Công Brute-force',
    completedDate: '16/10/2026',
    score: 96,
    certificateCode: 'CERT-SEC-2026-089',
    status: 'passed',
  },
];
