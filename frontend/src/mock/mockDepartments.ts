export interface Department {
  id: string;
  code: string;
  name: string;
  managerName: string;
  headcount: number;
  parentId?: string;
  description: string;
}

export interface Position {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  level: string;
  standardHeadcount: number;
  currentHeadcount: number;
}

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'DEPT_BOD',
    code: 'BOD',
    name: 'Ban Giám Đốc',
    managerName: 'Nguyễn Văn An',
    headcount: 4,
    description: 'Hội đồng quản trị và điều hành chiến lược toàn công ty.',
  },
  {
    id: 'DEPT_ENG',
    code: 'ENG',
    name: 'Khối Công Nghệ & Kỹ Thuật',
    managerName: 'Lê Hoàng Nam',
    headcount: 24,
    parentId: 'DEPT_BOD',
    description: 'Nghiên cứu, phát triển sản phẩm phần mềm và hạ tầng điện toán đám mây.',
  },
  {
    id: 'DEPT_ENG_FE',
    code: 'ENG_FE',
    name: 'Nhóm Phát Triển Frontend',
    managerName: 'Phạm Văn A',
    headcount: 8,
    parentId: 'DEPT_ENG',
    description: 'Thiết kế kiến trúc và phát triển giao diện web ứng dụng.',
  },
  {
    id: 'DEPT_ENG_BE',
    code: 'ENG_BE',
    name: 'Nhóm Phát Triển Backend & API',
    managerName: 'Trịnh Quang Minh',
    headcount: 10,
    parentId: 'DEPT_ENG',
    description: 'Phát triển dịch vụ RESTful API, microservices và cơ sở dữ liệu.',
  },
  {
    id: 'DEPT_ENG_QA',
    code: 'ENG_QA',
    name: 'Nhóm Đảm Bảo Chất Lượng (QA/QC)',
    managerName: 'Đỗ Thúy Hằng',
    headcount: 6,
    parentId: 'DEPT_ENG',
    description: 'Kiểm thử chức năng, tự động hóa và đảm bảo an toàn hệ thống.',
  },
  {
    id: 'DEPT_HR',
    code: 'HR',
    name: 'Phòng Quản Trị Nhân Sự',
    managerName: 'Trần Thị Thu Thảo',
    headcount: 8,
    parentId: 'DEPT_BOD',
    description: 'Tuyển dụng, đào tạo, C&B, văn hóa doanh nghiệp và quan hệ lao động.',
  },
  {
    id: 'DEPT_SALES',
    code: 'SALES',
    name: 'Khối Kinh Doanh & Tiếp Thị',
    managerName: 'Vũ Quốc Bảo',
    headcount: 32,
    parentId: 'DEPT_BOD',
    description: 'Tìm kiếm khách hàng doanh nghiệp, chăm sóc đối tác và truyền thông.',
  },
  {
    id: 'DEPT_FIN',
    code: 'FIN',
    name: 'Phòng Tài Chính Kế Toán',
    managerName: 'Bùi Thị Lan',
    headcount: 6,
    parentId: 'DEPT_BOD',
    description: 'Quản trị dòng tiền, hạch toán kế toán và quyết toán thuế.',
  },
];

export const MOCK_POSITIONS: Position[] = [
  { id: 'POS01', code: 'DEV_SR', title: 'Kỹ Sư Phần Mềm Cao Cấp', departmentId: 'DEPT_ENG', level: 'Senior (L4)', standardHeadcount: 10, currentHeadcount: 8 },
  { id: 'POS02', code: 'DEV_MID', title: 'Kỹ Sư Phần Mềm', departmentId: 'DEPT_ENG', level: 'Mid-level (L3)', standardHeadcount: 12, currentHeadcount: 10 },
  { id: 'POS03', code: 'HR_SR', title: 'Chuyên Viên Nhân Sự Cấp Cao', departmentId: 'DEPT_HR', level: 'Senior (L4)', standardHeadcount: 3, currentHeadcount: 2 },
  { id: 'POS04', code: 'HR_REC', title: 'Chuyên Viên Tuyển Dụng', departmentId: 'DEPT_HR', level: 'Mid-level (L3)', standardHeadcount: 4, currentHeadcount: 3 },
  { id: 'POS05', code: 'QA_AUTO', title: 'Kỹ Sư Kiểm Thử Tự Động', departmentId: 'DEPT_ENG_QA', level: 'Mid-level (L3)', standardHeadcount: 4, currentHeadcount: 4 },
  { id: 'POS06', code: 'SALES_B2B', title: 'Chuyên Viên Kinh Doanh B2B', departmentId: 'DEPT_SALES', level: 'Mid-level (L3)', standardHeadcount: 15, currentHeadcount: 14 },
];
