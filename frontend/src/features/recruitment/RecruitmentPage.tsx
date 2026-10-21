import React, { useState } from 'react';
import { UserPlus, Plus, Briefcase, Star, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { useMock } from '../../mock/MockContext';
import { JobPosition, MOCK_JOBS, Candidate, CandidateStage } from '../../mock/mockRecruitment';

export const RecruitmentPage: React.FC = () => {
  const { candidates, moveCandidateStage } = useMock();
  const [activeTab, setActiveTab] = useState('kanban');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const stages: { stage: CandidateStage; label: string; color: string }[] = [
    { stage: 'applied', label: '1. Nộp Hồ Sơ', color: 'border-stone-300' },
    { stage: 'screening', label: '2. Sơ Loại CV', color: 'border-blue-400' },
    { stage: 'interview', label: '3. Phỏng Vấn', color: 'border-amber-400' },
    { stage: 'offer', label: '4. Thư Mời (Offer)', color: 'border-purple-400' },
    { stage: 'hired', label: '5. Đã Nhận Việc', color: 'border-emerald-500' },
  ];

  const jobColumns: Column<JobPosition>[] = [
    {
      header: 'Mã Vị Trí',
      accessorKey: 'code',
      cell: (j) => <span className="font-mono font-semibold text-xs text-ink">{j.code}</span>,
    },
    {
      header: 'Tiêu Đề Tuyển Dụng',
      accessorKey: 'title',
      cell: (j) => (
        <div>
          <span className="font-semibold text-ink text-sm block">{j.title}</span>
          <span className="text-xs text-muted block">{j.departmentName} · {j.location}</span>
        </div>
      ),
    },
    {
      header: 'Mức Lương',
      accessorKey: 'salaryRange',
      cell: (j) => <span className="text-xs font-medium text-emerald-600">{j.salaryRange}</span>,
    },
    {
      header: 'Chỉ Tiêu',
      align: 'center',
      cell: (j) => <span className="text-xs font-semibold text-ink">{j.headcountNeeded} người</span>,
    },
    {
      header: 'Số Hồ Sơ',
      align: 'center',
      cell: (j) => <span className="text-xs font-bold text-blue-600">{j.applicantsCount} CV</span>,
    },
    {
      header: 'Hạn Nộp',
      accessorKey: 'deadline',
      cell: (j) => <span className="text-xs text-muted">{j.deadline}</span>,
    },
    {
      header: 'Trạng Thái',
      cell: (j) => <AppBadge variant={j.status === 'active' ? 'active' : 'neutral'}>{j.status}</AppBadge>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Phân Hệ Tuyển Dụng Nhân Sự (REC)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Tuyển Dụng & Phễu Ứng Viên (Kanban)</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => alert('Mở form tạo vị trí tuyển dụng mới...')}
          >
            Đăng tin tuyển dụng mới
          </AppButton>
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'kanban', label: 'Bảng Kanban Ứng Viên (Pipeline)', count: candidates.length },
          { id: 'jobs', label: 'Danh Sách Vị Trí Đang Tuyển', count: MOCK_JOBS.length },
          { id: 'internal', label: 'Cổng Tuyển Dụng Nội Bộ' },
        ]}
      />

      {/* Tab 1: Kanban Pipeline */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map((st) => {
            const stageCandidates = candidates.filter((c) => c.stage === st.stage);
            return (
              <div
                key={st.stage}
                className="bg-canvas-soft rounded-2xl p-3 border border-hairline flex flex-col min-w-[220px]"
              >
                {/* Column Header */}
                <div className={`p-2.5 pb-3 border-b-2 ${st.color} mb-3 flex items-center justify-between`}>
                  <span className="font-semibold text-xs text-ink">{st.label}</span>
                  <span className="w-5 h-5 rounded-full bg-surface-card border border-hairline flex items-center justify-center text-[10px] font-bold text-muted">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-2.5 flex-1">
                  {stageCandidates.length === 0 ? (
                    <div className="h-24 flex items-center justify-center text-xs text-muted-soft italic">
                      Trống
                    </div>
                  ) : (
                    stageCandidates.map((can) => (
                      <div
                        key={can.id}
                        onClick={() => setSelectedCandidate(can)}
                        className="p-3 bg-surface-card rounded-xl border border-hairline shadow-subtle hover:border-stone-400 transition-all cursor-pointer space-y-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={can.avatarUrl}
                            alt={can.fullName}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs text-ink truncate">{can.fullName}</h4>
                            <p className="text-[10px] text-muted truncate">{can.jobTitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-muted pt-1 border-t border-hairline-soft">
                          <span>{can.experienceYears} năm KN</span>
                          {can.score ? (
                            <span className="font-bold text-amber-600 flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              {can.score}/100
                            </span>
                          ) : (
                            <span>Chưa chấm</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Jobs Table */}
      {activeTab === 'jobs' && (
        <AppTable
          columns={jobColumns}
          data={MOCK_JOBS}
          keyExtractor={(j) => j.id}
          totalItems={MOCK_JOBS.length}
        />
      )}

      {/* Tab 3: Internal Jobs */}
      {activeTab === 'internal' && (
        <AppCard className="p-8 max-w-2xl mx-auto text-center space-y-3">
          <Briefcase className="w-8 h-8 text-blue-600 mx-auto" />
          <h2 className="font-display text-2xl font-light text-ink">Cơ Hội Thăng Tiến Nội Bộ</h2>
          <p className="text-xs text-muted">
            Ưu tiên xét tuyển cán bộ nhân viên công ty đang có nhu cầu luân chuyển hoặc thăng chức trước khi tuyển dụng bên ngoài.
          </p>
          <div className="pt-4">
            <AppButton variant="outline">Xem chính sách thăng tiến</AppButton>
          </div>
        </AppCard>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <AppModal
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          title={selectedCandidate.fullName}
          subtitle={`Ứng tuyển vị trí: ${selectedCandidate.jobTitle}`}
          footer={
            <div className="flex items-center justify-between w-full">
              {/* Move to next stage button */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Chuyển giai đoạn:</span>
                <select
                  value={selectedCandidate.stage}
                  onChange={(e) => {
                    moveCandidateStage(selectedCandidate.id, e.target.value as CandidateStage);
                    setSelectedCandidate({ ...selectedCandidate, stage: e.target.value as CandidateStage });
                  }}
                  className="h-8 px-2.5 bg-canvas text-xs rounded-lg border border-hairline cursor-pointer"
                >
                  <option value="applied">1. Nộp hồ sơ</option>
                  <option value="screening">2. Sơ loại CV</option>
                  <option value="interview">3. Phỏng vấn</option>
                  <option value="offer">4. Thư mời Offer</option>
                  <option value="hired">5. Đã nhận việc</option>
                </select>
              </div>

              <AppButton variant="primary" onClick={() => setSelectedCandidate(null)}>
                Đóng
              </AppButton>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-canvas-soft border border-hairline">
              <img
                src={selectedCandidate.avatarUrl}
                alt={selectedCandidate.fullName}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-ink text-sm">{selectedCandidate.fullName}</h3>
                <p className="text-muted mt-0.5">Email: {selectedCandidate.email} · SĐT: {selectedCandidate.phone}</p>
                <p className="text-muted">Kinh nghiệm: {selectedCandidate.experienceYears} năm</p>
              </div>
            </div>

            {selectedCandidate.interviewNotes && (
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                <span className="font-semibold text-amber-900 block mb-1">Nhận xét phỏng vấn:</span>
                <p className="text-amber-800">{selectedCandidate.interviewNotes}</p>
              </div>
            )}
          </div>
        </AppModal>
      )}
    </div>
  );
};
