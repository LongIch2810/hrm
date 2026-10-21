import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Clock, CalendarDays, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navTabs = [
    { label: 'Trang chủ', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Chấm công', path: '/attendance', icon: <Clock className="w-5 h-5" /> },
    { label: 'Đơn phép', path: '/leaves', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'Cá nhân', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-card/95 backdrop-blur-md border-t border-hairline px-2 z-40 flex items-center justify-around">
      {navTabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all ${
              isActive
                ? 'text-ink font-semibold'
                : 'text-muted-soft hover:text-muted'
            }`
          }
        >
          {tab.icon}
          <span className="text-[10px] mt-1">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
