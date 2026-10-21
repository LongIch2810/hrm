import React, { useState } from 'react';
import { FileText, AlertTriangle, Plus, CheckCircle2, RotateCw, Eye } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppSelect } from '../../shared/components/ui/AppSelect';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { MOCK_CONTRACTS, Contract } from '../../mock/mockContracts';

export const ContractPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [filterType, setFilterType] = useState('ALL');
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  // Filter expiring contracts
  const expiringContracts = contracts.filter((c) => c.status === 'expiring_soon');

  const filteredContracts = contracts.filter((c) => {
    if (filterType === 'EXPIRING') return c.status === 'expiring_soon';
    return true;
  });

  const contractColumns: Column<Contract>[] = [
    {
      header: 'Số Hợp Đồng',
      accessorKey: 'contractNumber',
      cell: (c) => <span className="font-mono font-semibold text-xs text-ink">{c.contractNumber}</span>,
    },
    {
      header: 'Nhân Viên',
      cell: (c) => (
        <div className="flex items-center gap-2.5">
          <img src={c.avatarUrl} alt={c.employeeName} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <span className="font-semibold text-xs text-ink block">{c.employeeName}</span>
            <span className="text-[10px] text-muted block">{c.departmentName}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Loại Hợp Đồng',
      accessorKey: 'contractType',
      cell: (c) => <span className="text-xs text-body font-medium">{c.contractType}</span>,
    },
    {
      header: 'Thời Hạn Hiệu Lực',
      cell: (c) => (
        <span className="text-xs text-muted">
          {c.startDate} → {c.endDate || 'Vô thời hạn'}
        </span>
      ),
    },
    {
      header: 'Lương Đóng BHXH',
      align: 'right',
      cell: (c) => (
        <span className="font-semibold text-ink text-xs">
          {c.basicSalary.toLocaleString('vi-VN')} đ
        </span>
      ),
    },
    {
      header: 'Cảnh Báo Hết Hạn (≤ 30d)',
      cell: (c) => {
        if (c.status === 'expiring_soon') {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Còn {c.daysUntilExpiry} ngày</span>
            </span>
          );
        }
        return <AppBadge variant="active">Đang hiệu lực</AppBadge>;
      },
    },
    {
      header: 'Thao Tác',
      align: 'right',
      cell: (c) => (
        <div className="flex items-center justify-end gap-1">
          {c.status === 'expiring_soon' && (
            <button
              onClick={() => {
                alert(`Mở quy trình lập phụ lục tái ký hợp đồng cho ${c.employeeName}`);
              }}
              className="px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-semibold hover:bg-black cursor-pointer"
            >
              Tái ký
            </button>
          )}
          <button
            onClick={() => setSelectedContract(c)}
            className="p-1.5 text-muted hover:text-ink hover:bg-surface-strong rounded-full cursor-pointer"
            title="Xem chi tiết"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
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
              Phân Hệ Hợp Đồng Lao Động (CON)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Quản Lý Hợp Đồng Lao Động</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsNewContractModalOpen(true)}
          >
            Tạo hợp đồng mới
          </AppButton>
        </div>
      </div>

      {/* Critical 30-Day Warning Banner */}
      {expiringContracts.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Cảnh báo: Có {expiringContracts.length} hợp đồng sắp hết hạn trong 30 ngày tới</p>
              <p className="text-red-700 mt-0.5">
                Cần thông báo trước cho người lao động ít nhất 15 ngày theo quy định của Bộ luật Lao động Việt Nam.
              </p>
            </div>
          </div>

          <AppButton
            size="sm"
            variant="outline"
            onClick={() => setFilterType(filterType === 'EXPIRING' ? 'ALL' : 'EXPIRING')}
            className="border-red-300 text-red-800 hover:bg-red-100 shrink-0 self-end sm:self-center"
          >
            {filterType === 'EXPIRING' ? 'Hiện tất cả hợp đồng' : 'Lọc danh sách hết hạn'}
          </AppButton>
        </div>
      )}

      {/* Table */}
      <AppTable
        columns={contractColumns}
        data={filteredContracts}
        keyExtractor={(c) => c.id}
        totalItems={filteredContracts.length}
      />

      {/* Create Modal */}
      <AppModal
        isOpen={isNewContractModalOpen}
        onClose={() => setIsNewContractModalOpen(false)}
        title="Tạo Mới Hợp Đồng Lao Động"
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsNewContractModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton
              variant="primary"
              onClick={() => {
                alert('Tạo hợp đồng lao động mới thành công!');
                setIsNewContractModalOpen(false);
              }}
            >
              Lưu & Ban Hành HĐ
            </AppButton>
          </>
        }
      >
        <form className="space-y-4 text-xs">
          <AppInput label="Số hiệu hợp đồng" placeholder="HDLD-2026-xxxx" required />
          <AppInput label="Mã hoặc tên nhân viên" placeholder="Tìm nhân sự..." required />
          <AppSelect
            label="Loại hợp đồng"
            options={[
              { value: 'PROB', label: 'Hợp đồng thử việc (2 tháng)' },
              { value: 'FIXED_1Y', label: 'Hợp đồng xác định thời hạn (1 năm)' },
              { value: 'FIXED_3Y', label: 'Hợp đồng xác định thời hạn (3 năm)' },
              { value: 'INDEFINITE', label: 'Hợp đồng không xác định thời hạn' },
            ]}
          />
          <div className="grid grid-cols-2 gap-3">
            <AppInput label="Ngày bắt đầu" type="date" required />
            <AppInput label="Ngày kết thúc" type="date" />
          </div>
          <AppInput label="Lương đóng bảo hiểm (VNĐ)" type="number" placeholder="25000000" required />
        </form>
      </AppModal>

      {/* Contract Detail Modal */}
      {selectedContract && (
        <AppModal
          isOpen={Boolean(selectedContract)}
          onClose={() => setSelectedContract(null)}
          title={`Hợp Đồng: ${selectedContract.contractNumber}`}
          subtitle={`Nhân viên: ${selectedContract.employeeName}`}
          footer={
            <AppButton variant="primary" onClick={() => setSelectedContract(null)}>
              Đóng
            </AppButton>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Loại hợp đồng:</span>
                <span className="font-semibold text-ink">{selectedContract.contractType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Thời hạn:</span>
                <span className="text-ink">
                  {selectedContract.startDate} → {selectedContract.endDate || 'Vô thời hạn'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Mức lương cơ bản:</span>
                <span className="font-bold text-emerald-600">
                  {selectedContract.basicSalary.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
          </div>
        </AppModal>
      )}
    </div>
  );
};
