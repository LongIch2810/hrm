import React, { useState } from 'react';
import { Compass, CheckCircle2, Clock, CheckSquare, Laptop, Shield, UserCheck, ArrowRight } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { MOCK_ONBOARDING, MOCK_OFFBOARDING, OnboardingItem } from '../../mock/mockOnboarding';

export const OnboardingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [selectedOnb, setSelectedOnb] = useState<OnboardingItem>(MOCK_ONBOARDING[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">
            Phân Hệ Tiếp Nhận & Thôi Việc (ONB)
          </span>
        </div>
        <h1 className="font-display text-3xl font-light text-ink">Quy Trình Tiếp Nhận & Bàn Giao Thôi Việc</h1>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'onboarding', label: 'Tiếp Nhận Nhân Viên Mới (Onboarding)', count: MOCK_ONBOARDING.length },
          { id: 'offboarding', label: 'Bàn Giao & Thôi Việc (Offboarding)', count: MOCK_OFFBOARDING.length },
        ]}
      />

      {/* Tab 1: Onboarding with 4-party checklist */}
      {activeTab === 'onboarding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: New Hires List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="font-display text-xl font-light text-ink mb-1">Nhân Sự Mới Đang Onboarding</h2>
            <p className="text-xs text-muted mb-3">Chọn nhân sự để kiểm tra tiến độ checklist 4 bên</p>

            {MOCK_ONBOARDING.map((onb) => {
              const isSelected = selectedOnb.id === onb.id;
              return (
                <div
                  key={onb.id}
                  onClick={() => setSelectedOnb(onb)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface-card border-stone-800 shadow-subtle'
                      : 'bg-canvas-soft border-hairline hover:bg-surface-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={onb.avatarUrl} alt={onb.employeeName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-semibold text-ink text-sm">{onb.employeeName}</h4>
                        <p className="text-xs text-muted">{onb.position}</p>
                      </div>
                    </div>
                    <AppBadge variant={onb.status === 'completed' ? 'active' : 'info'}>
                      {onb.progressPercent}%
                    </AppBadge>
                  </div>

                  <div className="mt-3 pt-2 border-t border-hairline text-xs flex justify-between text-muted">
                    <span>{onb.departmentName}</span>
                    <span>Bắt đầu: {onb.startDate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: 4-Party Checklist Detail (7 cols) */}
          <div className="lg:col-span-7">
            <AppCard className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-hairline">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">CHECKLIST TIẾP NHẬN 4 BÊN</span>
                  <h3 className="font-display text-2xl font-light text-ink mt-0.5">{selectedOnb.employeeName}</h3>
                  <p className="text-xs text-muted">{selectedOnb.position} · {selectedOnb.departmentName}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-light text-ink">{selectedOnb.progressPercent}%</span>
                  <p className="text-[10px] text-muted">Tiến độ hoàn thành</p>
                </div>
              </div>

              {/* Tasks grouped by party */}
              <div className="space-y-4">
                {selectedOnb.tasks.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                      t.completed ? 'bg-emerald-50/20 border-emerald-200' : 'bg-canvas-soft border-hairline'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          t.completed ? 'bg-emerald-600 text-white' : 'border border-stone-400 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-ink text-sm block">{t.title}</span>
                        <span className="text-[10px] text-muted uppercase font-bold">Phụ trách: {t.party}</span>
                      </div>
                    </div>

                    <AppBadge variant={t.completed ? 'active' : 'pending'}>
                      {t.completed ? 'Đã hoàn tất' : 'Chờ xử lý'}
                    </AppBadge>
                  </div>
                ))}
              </div>
            </AppCard>
          </div>
        </div>
      )}

      {/* Tab 2: Offboarding */}
      {activeTab === 'offboarding' && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-light text-ink">Danh Sách Bàn Giao Thôi Việc</h2>
          <p className="text-xs text-muted">Kiểm soát thu hồi thiết bị, khóa tài khoản email và hoàn tất thủ tục thôi việc</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_OFFBOARDING.map((off) => (
              <AppCard key={off.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={off.avatarUrl} alt={off.employeeName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold text-ink text-sm">{off.employeeName}</h4>
                      <p className="text-xs text-muted">{off.position} · {off.departmentName}</p>
                    </div>
                  </div>
                  <AppBadge variant="active">100% Hoàn tất</AppBadge>
                </div>

                <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline text-xs space-y-2">
                  <p className="font-semibold text-ink">Hạng mục bàn giao 4 bước:</p>
                  {off.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{task.category}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs text-muted pt-2 border-t border-hairline">
                  <span>Ngày làm việc cuối: {off.lastWorkingDate}</span>
                  <span className="text-emerald-600 font-semibold">Đã thanh lý HĐ</span>
                </div>
              </AppCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
