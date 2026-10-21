import React, { useState } from 'react';
import { Network, Plus, Users, Building, ChevronRight, Layers } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { useMock } from '../../mock/MockContext';
import { Department, Position } from '../../mock/mockDepartments';

export const DepartmentPage: React.FC = () => {
  const { departments, positions } = useMock();
  const [activeTab, setActiveTab] = useState('chart');
  const [isNewDeptModalOpen, setIsNewDeptModalOpen] = useState(false);

  // New dept form
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptManager, setNewDeptManager] = useState('');

  const deptColumns: Column<Department>[] = [
    {
      header: 'Mã PB',
      accessorKey: 'code',
      cell: (d) => <span className="font-mono font-semibold text-ink text-xs">{d.code}</span>,
    },
    {
      header: 'Tên Phòng Ban',
      accessorKey: 'name',
      cell: (d) => (
        <div>
          <span className="font-semibold text-ink text-sm block">{d.name}</span>
          <span className="text-xs text-muted block">{d.description}</span>
        </div>
      ),
    },
    {
      header: 'Trưởng Bộ Phận',
      accessorKey: 'managerName',
      cell: (d) => <span className="font-medium text-body text-xs">{d.managerName}</span>,
    },
    {
      header: 'Quân Số Hiện Tại',
      accessorKey: 'headcount',
      align: 'right',
      cell: (d) => (
        <span className="font-semibold text-ink text-sm px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800">
          {d.headcount} nhân sự
        </span>
      ),
    },
  ];

  const posColumns: Column<Position>[] = [
    {
      header: 'Mã Vị Trí',
      accessorKey: 'code',
      cell: (p) => <span className="font-mono font-semibold text-ink text-xs">{p.code}</span>,
    },
    {
      header: 'Chức Danh',
      accessorKey: 'title',
      cell: (p) => <span className="font-semibold text-ink text-sm">{p.title}</span>,
    },
    {
      header: 'Cấp Bậc (Level)',
      accessorKey: 'level',
      cell: (p) => <span className="text-xs text-muted">{p.level}</span>,
    },
    {
      header: 'Định Biên Chuẩn',
      align: 'center',
      cell: (p) => <span className="text-xs text-muted">{p.standardHeadcount} người</span>,
    },
    {
      header: 'Thực Tế Đang Có',
      align: 'right',
      cell: (p) => (
        <span
          className={`font-semibold text-xs px-2 py-0.5 rounded-full ${
            p.currentHeadcount >= p.standardHeadcount ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}
        >
          {p.currentHeadcount} / {p.standardHeadcount}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Phân Hệ Cơ Cấu Tổ Chức (DEPT)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Cơ Cấu Phòng Ban & Chức Vụ</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsNewDeptModalOpen(true)}
          >
            Thêm phòng ban mới
          </AppButton>
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'chart', label: 'Sơ Đồ Phân Cấp Org Chart', icon: <Network className="w-4 h-4" /> },
          { id: 'list', label: 'Danh Sách Phòng Ban', icon: <Building className="w-4 h-4" /> },
          { id: 'positions', label: 'Chức Vụ & Cấp Bậc Định Biên', icon: <Layers className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: Org Chart */}
      {activeTab === 'chart' && (
        <div className="space-y-6">
          <AppCard className="p-8 text-center bg-canvas-soft border-hairline overflow-x-auto">
            <h2 className="font-display text-2xl font-light text-ink mb-2">Sơ Đồ Phân Cấp Bộ Máy Doanh Nghiệp</h2>
            <p className="text-xs text-muted mb-8 max-w-lg mx-auto">
              Cơ cấu tổ chức đa tầng từ Hội đồng Ban Giám Đốc tới các khối phòng ban chức năng
            </p>

            {/* Tree nodes visualization */}
            <div className="inline-flex flex-col items-center min-w-[650px] space-y-6">
              {/* Root: Ban Giam Doc */}
              <div className="p-4 px-8 rounded-2xl bg-surface-card border-2 border-stone-800 shadow-subtle text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted">Cấp Điều Hành</span>
                <h3 className="font-display text-xl font-light text-ink">Ban Giám Đốc</h3>
                <p className="text-xs text-body font-medium mt-0.5">Trưởng ban: Nguyễn Văn An</p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-stone-100 text-[10px] text-stone-700 font-semibold mt-1">
                  4 Thành viên
                </span>
              </div>

              {/* Connector line */}
              <div className="w-0.5 h-6 bg-stone-300 dark:bg-stone-700" />

              {/* Second Level */}
              <div className="grid grid-cols-4 gap-4 w-full">
                {/* Khối Công Nghệ */}
                <div className="p-4 rounded-xl bg-surface-card border border-hairline text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-blue-600">Khối Kỹ Thuật</span>
                  <h4 className="font-semibold text-ink text-sm mt-0.5">Khối Công Nghệ</h4>
                  <p className="text-xs text-muted mt-0.5">Trưởng khối: Lê Hoàng Nam</p>
                  <p className="text-xs font-semibold text-ink mt-2">24 nhân sự</p>
                </div>

                {/* Phòng Quản Trị Nhân Sự */}
                <div className="p-4 rounded-xl bg-surface-card border border-hairline text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Khối Vận Hành</span>
                  <h4 className="font-semibold text-ink text-sm mt-0.5">Phòng Quản Trị Nhân Sự</h4>
                  <p className="text-xs text-muted mt-0.5">Trưởng phòng: Trần Thị Thu Thảo</p>
                  <p className="text-xs font-semibold text-ink mt-2">8 nhân sự</p>
                </div>

                {/* Khối Kinh Doanh */}
                <div className="p-4 rounded-xl bg-surface-card border border-hairline text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-amber-600">Khối Doanh Thu</span>
                  <h4 className="font-semibold text-ink text-sm mt-0.5">Khối Kinh Doanh & Tiếp Thị</h4>
                  <p className="text-xs text-muted mt-0.5">Trưởng khối: Vũ Quốc Bảo</p>
                  <p className="text-xs font-semibold text-ink mt-2">32 nhân sự</p>
                </div>

                {/* Phòng Tài Chính */}
                <div className="p-4 rounded-xl bg-surface-card border border-hairline text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-purple-600">Khối Tài Chính</span>
                  <h4 className="font-semibold text-ink text-sm mt-0.5">Phòng Tài Chính Kế Toán</h4>
                  <p className="text-xs text-muted mt-0.5">Kế toán trưởng: Bùi Thị Lan</p>
                  <p className="text-xs font-semibold text-ink mt-2">6 nhân sự</p>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      )}

      {/* Tab 2: Department List */}
      {activeTab === 'list' && (
        <AppTable
          columns={deptColumns}
          data={departments}
          keyExtractor={(d) => d.id}
          totalItems={departments.length}
        />
      )}

      {/* Tab 3: Positions */}
      {activeTab === 'positions' && (
        <AppTable
          columns={posColumns}
          data={positions}
          keyExtractor={(p) => p.id}
          totalItems={positions.length}
        />
      )}

      {/* New Department Modal */}
      <AppModal
        isOpen={isNewDeptModalOpen}
        onClose={() => setIsNewDeptModalOpen(false)}
        title="Thêm Phòng Ban Mới"
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsNewDeptModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton
              variant="primary"
              onClick={() => {
                alert(`Đã tạo phòng ban: ${newDeptName}`);
                setIsNewDeptModalOpen(false);
              }}
            >
              Lưu Phòng Ban
            </AppButton>
          </>
        }
      >
        <form className="space-y-4">
          <AppInput
            label="Tên phòng ban"
            required
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
            placeholder="Ví dụ: Phòng Truyền Thông & Thương Hiệu"
          />
          <AppInput
            label="Mã phòng ban (Viết tắt)"
            required
            value={newDeptCode}
            onChange={(e) => setNewDeptCode(e.target.value)}
            placeholder="Ví dụ: BRAND"
          />
          <AppInput
            label="Trưởng bộ phận chỉ định"
            value={newDeptManager}
            onChange={(e) => setNewDeptManager(e.target.value)}
            placeholder="Họ và tên..."
          />
        </form>
      </AppModal>
    </div>
  );
};
