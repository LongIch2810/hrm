import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  Clock,
  User,
  Shield,
  LogOut,
} from 'lucide-react';
import { useMock } from '../../../mock/MockContext';

interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileSidebar }) => {
  const { currentUser, isDark, toggleTheme } = useMock();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 'n1',
      title: 'Đơn xin nghỉ phép đã được duyệt',
      desc: 'Trưởng bộ phận Lê Hoàng Nam đã phê duyệt đơn nghỉ phép của bạn.',
      time: '15 phút trước',
      read: false,
    },
    {
      id: 'n2',
      title: 'Cảnh báo hợp đồng lao động',
      desc: 'Có 3 nhân sự sắp hết hạn hợp đồng trong vòng 30 ngày tới.',
      time: '2 giờ trước',
      read: false,
    },
    {
      id: 'n3',
      title: 'Bảng lương T09/2026 đã ban hành',
      desc: 'Phiếu lương cá nhân tháng 09/2026 đã sẵn sàng để tra cứu.',
      time: '1 ngày trước',
      read: true,
    },
  ];

  return (
    <header className="h-16 w-full bg-surface-card border-b border-hairline px-4 sm:px-6 flex items-center justify-between z-20 sticky top-0">
      {/* Left: Mobile trigger & Search Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-muted hover:text-ink rounded-lg hover:bg-surface-strong cursor-pointer"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Pill */}
        <div className="relative hidden sm:flex items-center">
          <Search className="w-4 h-4 text-muted absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nhân viên, đơn từ, mã số..."
            className="w-64 lg:w-80 h-9 pl-9 pr-8 bg-canvas text-xs sm:text-sm rounded-full border border-hairline transition-all placeholder:text-muted-soft focus:outline-none focus:ring-1 focus:ring-ink focus:w-96"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-muted hover:text-ink text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications, Theme & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-muted hover:text-ink hover:bg-surface-strong rounded-full transition-colors cursor-pointer"
          aria-label={isDark ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}
          title={isDark ? 'Nền sáng' : 'Nền tối'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-muted hover:text-ink hover:bg-surface-strong rounded-full transition-colors cursor-pointer"
            aria-label="Thông báo"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-card rounded-2xl shadow-elevated border border-hairline py-3 z-30">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-hairline">
                <span className="font-semibold text-xs text-ink uppercase tracking-wider">Thông báo</span>
                <span className="text-[11px] text-muted hover:text-ink cursor-pointer">Đánh dấu tất cả đã đọc</span>
              </div>
              <div className="divide-y divide-hairline max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 text-xs hover:bg-canvas-soft transition-colors cursor-pointer ${
                      !n.read ? 'bg-amber-50/30 dark:bg-amber-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-ink">{n.title}</p>
                        <p className="text-muted text-[11px] mt-0.5 line-clamp-2">{n.desc}</p>
                        <span className="text-[10px] text-muted-soft mt-1 inline-block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 px-4 border-t border-hairline text-center">
                <NavLink
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-ink font-medium hover:underline"
                >
                  Xem toàn bộ trung tâm thông báo →
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-surface-strong transition-colors cursor-pointer border border-hairline"
          >
            <span className="hidden sm:inline text-xs font-semibold text-ink">{currentUser.name}</span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {currentUser.role}
            </span>
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <ChevronDown className="w-3.5 h-3.5 text-muted mr-1" />
          </button>

          {/* User Dropdown */}
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-card rounded-2xl shadow-elevated border border-hairline py-2 z-30">
              <div className="px-4 py-2 border-b border-hairline">
                <p className="text-xs font-bold text-ink">{currentUser.name}</p>
                <p className="text-[11px] text-muted truncate">{currentUser.email}</p>
                <p className="text-[10px] text-muted-soft mt-0.5">{currentUser.position}</p>
              </div>
              <div className="py-1">
                <NavLink
                  to="/profile"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-body hover:bg-surface-strong hover:text-ink"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Hồ sơ cá nhân</span>
                </NavLink>
                {currentUser.role === 'ADMIN' && (
                  <NavLink
                    to="/admin"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-body hover:bg-surface-strong hover:text-ink"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Quản trị hệ thống</span>
                  </NavLink>
                )}
              </div>
              <div className="pt-1 border-t border-hairline">
                <NavLink
                  to="/login"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
