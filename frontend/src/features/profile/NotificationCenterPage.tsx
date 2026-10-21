import React, { useState } from 'react';
import { Bell, CheckCircle2, Clock, Filter, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppBadge } from '../../shared/components/ui/AppBadge';

export const NotificationCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: '1',
      title: 'Đơn xin nghỉ phép đã được phê duyệt',
      body: 'Trưởng bộ phận Lê Hoàng Nam đã phê duyệt đơn nghỉ phép LV2026-0042 (2 ngày: 28/10 - 29/10/2026).',
      time: '15 phút trước (21/10/2026 10:20)',
      category: 'LEAVE',
      read: false,
    },
    {
      id: '2',
      title: 'Nhắc nhở chấm công: Hoàn thành check-in đúng giờ',
      body: 'Hệ thống ghi nhận bạn đã check-in lúc 08:08:24 sáng nay.',
      time: '2 giờ trước (21/10/2026 08:08)',
      category: 'ATT',
      read: false,
    },
    {
      id: '3',
      title: 'Cảnh báo hợp đồng lao động sắp hết hạn',
      body: 'Có 3 nhân viên trong danh sách phụ trách có hợp đồng hết hạn trong vòng 30 ngày.',
      time: '1 ngày trước (20/10/2026 14:30)',
      category: 'CON',
      read: true,
    },
    {
      id: '4',
      title: 'Phát hành bảng lương tháng 09/2026',
      body: 'Phiếu lương chính thức đã được phòng Kế toán hoàn tất và chuyển khoản vào tài khoản Techcombank.',
      time: '5 ngày trước (16/10/2026 09:00)',
      category: 'PAY',
      read: true,
    },
    {
      id: '5',
      title: 'Thông báo khóa học nội bộ mới: React 19 & Tailwind v4',
      body: 'Khóa đào tạo chuyên sâu do Tech Lead Phạm Văn A đứng lớp sẽ bắt đầu từ 05/11/2026.',
      time: '1 tuần trước (14/10/2026 11:15)',
      category: 'TRAIN',
      read: true,
    },
  ];

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="font-display text-3xl font-light text-ink">Trung Tâm Thông Báo</h1>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Tổng hợp tin nhắn vận hành, phê duyệt đơn từ và cảnh báo hệ thống
          </p>
        </div>

        <AppTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'all', label: 'Tất cả', count: notifications.length },
            { id: 'unread', label: 'Chưa đọc', count: notifications.filter((n) => !n.read).length },
            { id: 'read', label: 'Đã đọc' },
          ]}
        />
      </div>

      <AppCard className="p-0 overflow-hidden">
        <div className="divide-y divide-hairline">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted">
              <Bell className="w-8 h-8 text-muted-soft mx-auto mb-2" />
              <p className="text-sm">Không có thông báo nào trong mục này.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-5 sm:p-6 transition-colors hover:bg-canvas-soft/50 ${
                  !item.read ? 'bg-amber-50/20 dark:bg-amber-950/10' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        !item.read ? 'bg-amber-500' : 'bg-transparent'
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink text-sm sm:text-base">{item.title}</span>
                        <AppBadge variant={!item.read ? 'warning' : 'neutral'}>
                          {item.category}
                        </AppBadge>
                      </div>
                      <p className="text-xs sm:text-sm text-body mt-1 leading-relaxed">{item.body}</p>
                      <span className="text-[11px] text-muted-soft mt-2 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </AppCard>
    </div>
  );
};
