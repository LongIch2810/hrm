export type UserRole = 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export interface CurrentUser {
  id: string;
  code: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId: string;
  departmentName: string;
  position: string;
  avatarUrl?: string;
  isFirstLogin?: boolean;
}

export type StatusBadgeVariant =
  | 'active'
  | 'probation'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'onleave'
  | 'terminated'
  | 'draft'
  | 'warning'
  | 'info'
  | 'neutral';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}
