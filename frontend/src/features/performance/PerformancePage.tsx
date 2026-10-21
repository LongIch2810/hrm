import React, { useState } from 'react';
import { Award, Target, CheckCircle2, Star, TrendingUp, BarChart, ChevronRight } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { MOCK_PERF_CYCLES, PerformanceCycle, MOCK_GOALS_CURRENT_USER, GoalItem, MOCK_TEAM_REVIEWS, EmployeeReview } from '../../mock/mockPerformance';

export const PerformancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-goals');
  const [goals, setGoals] = useState(MOCK_GOALS_CURRENT_USER);
  const [reviews, setReviews] = useState(MOCK_TEAM_REVIEWS);

  const cycleColumns: Column<PerformanceCycle>[] = [
    {
      header: 'Kỳ Đánh Giá',
      accessorKey: 'name',
      cell: (c) => (
        <div>
          <span className="font-semibold text-ink text-sm block">{c.name}</span>
          <span className="text-xs text-muted block">{c.period}</span>
        </div>
      ),
    },
    {
      header: 'Tiến Độ Đánh Giá',
      align: 'center',
      cell: (c) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-20 h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${c.completionRate}%` }} />
          </div>
          <span className="text-xs font-semibold text-ink">{c.completionRate}%</span>
        </div>
      ),
    },
    {
      header: 'Hạn Chót',
      accessorKey: 'deadline',
      cell: (c) => <span className="text-xs text-muted">{c.deadline}</span>,
    },
    {
      header: 'Trạng Thái',
      cell: (c) => <AppBadge variant={c.status === 'completed' ? 'active' : 'info'}>{c.statusLabel}</AppBadge>,
    },
  ];

  const reviewColumns: Column<EmployeeReview>[] = [
    {
      header: 'Nhân Viên',
      cell: (r) => (
        <div className="flex items-center gap-2.5">
          <img src={r.avatarUrl} alt={r.employeeName} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <span className="font-semibold text-xs text-ink block">{r.employeeName}</span>
            <span className="text-[10px] text-muted block">{r.position}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Tự Chấm',
      align: 'center',
      cell: (r) => <span className="font-bold text-xs text-ink">{r.selfRating}</span>,
    },
    {
      header: 'Quản Lý Chấm',
      align: 'center',
      cell: (r) => <span className="font-bold text-xs text-blue-600">{r.managerRating}</span>,
    },
    {
      header: 'Xếp Loại Chung (A-E)',
      align: 'center',
      cell: (r) => (
        <span
          className={`font-mono font-bold text-xs px-2.5 py-1 rounded-full ${
            r.finalRating === 'A'
              ? 'bg-emerald-100 text-emerald-800'
              : r.finalRating === 'B'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-stone-100 text-stone-800'
          }`}
        >
          Hạng {r.finalRating}
        </span>
      ),
    },
    {
      header: 'Nhận Xét & Đánh Giá',
      accessorKey: 'comments',
      cell: (r) => <span className="text-xs text-body line-clamp-1">{r.comments}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">
            Phân Hệ Đánh Giá Hiệu Suất (PERF)
          </span>
        </div>
        <h1 className="font-display text-3xl font-light text-ink">Quản Lý Mục Tiêu & Đánh Giá Hiệu Suất</h1>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'my-goals', label: 'Mục Tiêu OKR & Tự Đánh Giá Cá Nhân', icon: <Target className="w-4 h-4" /> },
          { id: 'team-reviews', label: 'Đánh Giá Đội Ngũ & Xếp Loại A-E', count: reviews.length, icon: <Award className="w-4 h-4" /> },
          { id: 'cycles', label: 'Các Kỳ Đánh Giá Toàn Công Ty', icon: <TrendingUp className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: My Goals & Self Review */}
      {activeTab === 'my-goals' && (
        <div className="space-y-6 max-w-4xl">
          <AppCard className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  KỲ ĐÁNH GIÁ QUÝ 3/2026
                </span>
                <h2 className="font-display text-2xl font-light text-ink mt-0.5">Bảng Mục Tiêu & Tự Chấm Điểm</h2>
                <p className="text-xs text-muted">Trọng số các mục tiêu cần đảm bảo tổng cộng đúng 100%</p>
              </div>

              <div className="text-right">
                <span className="font-display text-3xl font-light text-ink">4.7 / 5.0</span>
                <p className="text-[10px] text-muted">Điểm đánh giá trung bình</p>
              </div>
            </div>

            <div className="space-y-5">
              {goals.map((goal) => (
                <div key={goal.id} className="p-5 rounded-2xl bg-canvas-soft border border-hairline space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink text-sm sm:text-base">{goal.title}</span>
                        <AppBadge variant="info">Trọng số: {goal.weight}%</AppBadge>
                      </div>
                      <p className="text-xs text-body mt-1">{goal.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-ink">{goal.progress}%</span>
                      <p className="text-[10px] text-muted">Hoàn thành</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${goal.progress}%` }} />
                  </div>

                  {/* Scores */}
                  <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs">
                    <span className="text-muted">Chỉ số: {goal.metric}</span>
                    <div className="flex items-center gap-4">
                      <span>Tự chấm: <strong className="text-ink">{goal.selfScore} / 5.0</strong></span>
                      <span>Quản lý chấm: <strong className="text-emerald-600">{goal.managerScore} / 5.0</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-hairline flex justify-end">
              <AppButton variant="primary" onClick={() => alert('Đã lưu bảng tự đánh giá hiệu suất Q3!')}>
                Lưu Bảng Tự Đánh Giá
              </AppButton>
            </div>
          </AppCard>
        </div>
      )}

      {/* Tab 2: Team Reviews */}
      {activeTab === 'team-reviews' && (
        <div className="space-y-4">
          <AppTable
            columns={reviewColumns}
            data={reviews}
            keyExtractor={(r) => r.id}
            totalItems={reviews.length}
          />
        </div>
      )}

      {/* Tab 3: Cycles */}
      {activeTab === 'cycles' && (
        <AppTable
          columns={cycleColumns}
          data={MOCK_PERF_CYCLES}
          keyExtractor={(c) => c.id}
          totalItems={MOCK_PERF_CYCLES.length}
        />
      )}
    </div>
  );
};
