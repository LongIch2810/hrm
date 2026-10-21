import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Navigation, ChevronUp, ChevronDown, Check, Sun, Moon } from 'lucide-react';
import { useMock } from '../../../mock/MockContext';
import { UserRole } from '../../types/common';

export const DevToolbar: React.FC = () => {
  const { currentUser, switchUserRole, isDark, toggleTheme } = useMock();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Quick jump targets covering 15 modules and screens
  const quickScreens = [
    { label: '--- 01. XÁC THỰC & HỆ THỐNG ---', path: '' },
    { label: 'Screen 1: Đăng nhập (/login)', path: '/login' },
    { label: 'Screen 2: Đổi pass lần đầu (/auth/first-time-password)', path: '/auth/first-time-password' },
    { label: 'Screen 3: Quên mật khẩu (/auth/forgot-password)', path: '/auth/forgot-password' },
    { label: 'Screen 4: Đặt lại mật khẩu (/auth/reset-password)', path: '/auth/reset-password' },
    { label: 'Screen 5: Lỗi 403 Forbidden (/403)', path: '/403' },
    { label: 'Screen 6: Lỗi 404 Not Found (/404)', path: '/404' },
    { label: '--- 02. DASHBOARDS THEO VAI TRÒ ---', path: '' },
    { label: 'Screen 8: Admin Dashboard (/admin/dashboard)', path: '/admin/dashboard' },
    { label: 'Screen 9: HR Dashboard (/hr/dashboard)', path: '/hr/dashboard' },
    { label: 'Screen 10: Manager Dashboard (/manager/dashboard)', path: '/manager/dashboard' },
    { label: 'Screen 11: Employee Portal (/portal/dashboard)', path: '/portal/dashboard' },
    { label: '--- 03. CÁ NHÂN & THÔNG BÁO ---', path: '' },
    { label: 'Screen 12: Hồ sơ cá nhân (/profile)', path: '/profile' },
    { label: 'Screen 13: Trung tâm thông báo (/notifications)', path: '/notifications' },
    { label: '--- 04. QUẢN LÝ NHÂN VIÊN ---', path: '' },
    { label: 'Screen 14: Danh sách nhân viên (/employees)', path: '/employees' },
    { label: 'Screen 15: Thêm nhân viên mới (/employees/new)', path: '/employees/new' },
    { label: 'Screen 16: Chi tiết nhân sự (/employees/EMP0004)', path: '/employees/EMP0004' },
    { label: '--- 05. CƠ CẤU PHÒNG BAN ---', path: '' },
    { label: 'Screen 18: Sơ đồ Org Chart (/departments)', path: '/departments' },
    { label: '--- 06. CHẤM CÔNG & CA LÀM ---', path: '' },
    { label: 'Screen 22: Chấm công & Bảng công (/attendance)', path: '/attendance' },
    { label: '--- 07. QUẢN LÝ NGHỈ PHÉP ---', path: '' },
    { label: 'Screen 29: Quỹ phép & Phê duyệt (/leaves)', path: '/leaves' },
    { label: '--- 08. TIỀN LƯƠNG & THU NHẬP ---', path: '' },
    { label: 'Screen 34: Quản lý kỳ lương & Phiếu lương (/payroll)', path: '/payroll' },
    { label: '--- 09. TUYỂN DỤNG NHÂN SỰ ---', path: '' },
    { label: 'Screen 38: Tuyển dụng & Kanban ứng viên (/recruitment)', path: '/recruitment' },
    { label: '--- 10. ONBOARDING & THÔI VIỆC ---', path: '' },
    { label: 'Screen 43: Tiếp nhận & Thôi việc (/onboarding)', path: '/onboarding' },
    { label: '--- 11. ĐÁNH GIÁ HIỆU SUẤT ---', path: '' },
    { label: 'Screen 47: Kỳ đánh giá & OKR mục tiêu (/performance)', path: '/performance' },
    { label: '--- 12. HỢP ĐỒNG LAO ĐỘNG ---', path: '' },
    { label: 'Screen 52: Hợp đồng & Cảnh báo hạn 30 ngày (/contracts)', path: '/contracts' },
    { label: '--- 13. QUẢN LÝ ĐÀO TẠO ---', path: '' },
    { label: 'Screen 55: Khóa học & Chứng chỉ (/training)', path: '/training' },
    { label: '--- 14. BÁO CÁO & PHÂN TÍCH ---', path: '' },
    { label: 'Screen 59: Dashboard báo cáo điều hành (/reports)', path: '/reports' },
    { label: '--- 15. QUẢN TRỊ HỆ THỐNG ---', path: '' },
    { label: 'Screen 64: Quản trị & Ma trận RBAC (/admin)', path: '/admin' },
  ];

  const roles: { role: UserRole; label: string; name: string }[] = [
    { role: 'ADMIN', label: 'Admin', name: 'Nguyễn Văn An' },
    { role: 'HR', label: 'HR Lead', name: 'Trần Thị Thu Thảo' },
    { role: 'MANAGER', label: 'Trưởng Phòng', name: 'Lê Hoàng Nam' },
    { role: 'EMPLOYEE', label: 'Nhân Viên', name: 'Phạm Văn A' },
  ];

  return (
    <div className="fixed bottom-20 md:bottom-5 right-4 z-50">
      <div className="bg-stone-900/90 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-stone-700/60 transition-all duration-200 overflow-hidden text-xs">
        {/* Toggle Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 cursor-pointer hover:text-amber-400 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HRM Preview Toolbar</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Active Role indicator */}
          <span className="px-2 py-0.5 rounded-full bg-stone-800 text-[10px] text-amber-300 font-mono">
            {currentUser.role}
          </span>
        </div>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="p-4 pt-2 border-t border-stone-800 space-y-3.5 w-80 sm:w-96">
            {/* Role Switcher */}
            <div>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                <span>Chuyển Vai Trò Kiểm Thử (4 Personas)</span>
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {roles.map((r) => {
                  const isCurrent = currentUser.role === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => switchUserRole(r.role)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                          : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-medium text-[11px]">{r.label}</div>
                        <div className="text-[10px] text-stone-400 truncate">{r.name}</div>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Screen Jump Dropdown */}
            <div>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Navigation className="w-3 h-3" />
                <span>Nhảy Nhanh 68 Màn Hình</span>
              </p>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    navigate(e.target.value);
                  }
                }}
                className="w-full h-8 px-2.5 bg-stone-800 text-white text-[11px] rounded-lg border border-stone-700 focus:outline-none focus:border-amber-400 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Chọn màn hình cần xem trực tiếp --
                </option>
                {quickScreens.map((sc, idx) => (
                  <option
                    key={idx}
                    value={sc.path}
                    disabled={!sc.path}
                    className={!sc.path ? 'font-bold bg-stone-900 text-amber-400' : 'bg-stone-800 text-white'}
                  >
                    {sc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme & Reset */}
            <div className="flex items-center justify-between pt-1 border-t border-stone-800 text-[11px] text-stone-400">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 hover:text-white cursor-pointer"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>Giao diện: {isDark ? 'Tối (Dark)' : 'Sáng (Light)'}</span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="hover:text-amber-400 cursor-pointer"
              >
                Về Login →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
