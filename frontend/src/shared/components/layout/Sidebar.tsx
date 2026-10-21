import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Network,
  Clock,
  CalendarDays,
  CreditCard,
  UserPlus,
  Compass,
  Award,
  FileText,
  GraduationCap,
  BarChart3,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useMock } from '../../../mock/MockContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { currentUser } = useMock();

  // Navigation items grouped by category
  const navSections = [
    {
      title: 'TỔNG QUAN',
      items: [
        {
          label: 'Bảng Điều Khiển',
          path: '/dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'],
        },
      ],
    },
    {
      title: 'QUẢN LÝ NHÂN SỰ',
      items: [
        {
          label: 'Hồ Sơ Nhân Viên',
          path: '/employees',
          icon: <Users className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER'],
        },
        {
          label: 'Cơ Cấu Phòng Ban',
          path: '/departments',
          icon: <Network className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER'],
        },
        {
          label: 'Hợp Đồng Lao Động',
          path: '/contracts',
          icon: <FileText className="w-4 h-4" />,
          roles: ['ADMIN', 'HR'],
          badge: '3', // 3 contracts expiring soon
        },
      ],
    },
    {
      title: 'CÔNG & PHÉP',
      items: [
        {
          label: 'Chấm Công & Ca Làm',
          path: '/attendance',
          icon: <Clock className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'],
        },
        {
          label: 'Quản Lý Nghỉ Phép',
          path: '/leaves',
          icon: <CalendarDays className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'],
        },
        {
          label: 'Tiền Lương & Thu Nhập',
          path: '/payroll',
          icon: <CreditCard className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'EMPLOYEE'],
        },
      ],
    },
    {
      title: 'PHÁT TRIỂN & VẬN HÀNH',
      items: [
        {
          label: 'Tuyển Dụng (Kanban)',
          path: '/recruitment',
          icon: <UserPlus className="w-4 h-4" />,
          roles: ['ADMIN', 'HR'],
        },
        {
          label: 'Onboarding & Thôi Việc',
          path: '/onboarding',
          icon: <Compass className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER'],
        },
        {
          label: 'Đánh Giá Hiệu Suất',
          path: '/performance',
          icon: <Award className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'],
        },
        {
          label: 'Đào Tạo & Khóa Học',
          path: '/training',
          icon: <GraduationCap className="w-4 h-4" />,
          roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'],
        },
      ],
    },
    {
      title: 'HỆ THỐNG & BÁO CÁO',
      items: [
        {
          label: 'Báo Cáo & Phân Tích',
          path: '/reports',
          icon: <BarChart3 className="w-4 h-4" />,
          roles: ['ADMIN', 'HR'],
        },
        {
          label: 'Quản Trị & Phân Quyền',
          path: '/admin',
          icon: <ShieldCheck className="w-4 h-4" />,
          roles: ['ADMIN'],
        },
      ],
    },
  ];

  return (
    <aside className="w-64 h-full bg-canvas-soft border-r border-hairline flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center gap-3 border-b border-hairline">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-sm shadow-xs">
            HR
          </div>
          <div>
            <h1 className="font-display text-xl font-light text-ink tracking-tight">HRM Platform</h1>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-soft">Enterprise</p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navSections.map((section, sIdx) => {
            // Filter items by current user role
            const visibleItems = section.items.filter((item) =>
              item.roles.includes(currentUser.role)
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={sIdx} className="space-y-1">
                <p className="px-3 text-[11px] font-semibold text-muted tracking-wider uppercase">
                  {section.title}
                </p>
                {visibleItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-surface-card text-ink font-semibold shadow-xs border border-hairline'
                          : 'text-body hover:bg-surface-strong hover:text-ink'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-muted-soft">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-stone-300 dark:text-stone-700 opacity-60" />
                    )}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-hairline bg-canvas-soft/80">
        <NavLink
          to="/profile"
          onClick={onCloseMobile}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-strong transition-colors cursor-pointer"
        >
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border border-hairline"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-ink truncate">{currentUser.name}</p>
            <p className="text-[11px] text-muted truncate">{currentUser.position}</p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
