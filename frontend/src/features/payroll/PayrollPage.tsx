import React, { useState } from 'react';
import { CreditCard, Eye, Download, ShieldCheck, CheckCircle2, FileSpreadsheet, Lock } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { useMock } from '../../mock/MockContext';
import { MOCK_PAYROLL_CYCLES, PayrollCycle, MOCK_CURRENT_USER_PAYSLIP } from '../../mock/mockPayroll';

export const PayrollPage: React.FC = () => {
  const { currentUser } = useMock();
  const [activeTab, setActiveTab] = useState(currentUser.role === 'EMPLOYEE' ? 'payslip' : 'cycles');
  const [selectedCycle, setSelectedCycle] = useState<PayrollCycle | null>(null);
  const [showPayslipModal, setShowPayslipModal] = useState(false);

  const cycleColumns: Column<PayrollCycle>[] = [
    {
      header: 'Tên Kỳ Lương',
      accessorKey: 'name',
      cell: (c) => (
        <div>
          <span className="font-semibold text-ink text-sm block">{c.name}</span>
          <span className="text-xs text-muted block">{c.period}</span>
        </div>
      ),
    },
    {
      header: 'Số Nhân Sự',
      accessorKey: 'totalEmployees',
      align: 'center',
      cell: (c) => <span className="text-xs font-semibold text-ink">{c.totalEmployees} người</span>,
    },
    {
      header: 'Tổng Quỹ Lương (Gross)',
      align: 'right',
      cell: (c) => (
        <span className="font-semibold text-ink text-xs">
          {c.totalGross.toLocaleString('vi-VN')} đ
        </span>
      ),
    },
    {
      header: 'Thực Chi (Net)',
      align: 'right',
      cell: (c) => (
        <span className="font-bold text-emerald-600 text-xs">
          {c.totalNet.toLocaleString('vi-VN')} đ
        </span>
      ),
    },
    {
      header: 'Ngày Chuyển Khoản',
      accessorKey: 'payDate',
      cell: (c) => <span className="text-xs text-muted">{c.payDate}</span>,
    },
    {
      header: 'Trạng Thái',
      cell: (c) => (
        <AppBadge variant={c.status === 'paid' ? 'active' : 'warning'}>{c.statusLabel}</AppBadge>
      ),
    },
    {
      header: 'Thao Tác',
      align: 'right',
      cell: (c) => (
        <button
          onClick={() => {
            setSelectedCycle(c);
            setShowPayslipModal(true);
          }}
          className="p-1.5 text-muted hover:text-ink hover:bg-surface-strong rounded-full cursor-pointer"
          title="Xem chi tiết bảng lương"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const payslip = MOCK_CURRENT_USER_PAYSLIP;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Phân Hệ Quản Lý Tiền Lương (PAY)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Bảng Lương & Phiếu Lương Nhân Viên</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="outline"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Đang tải phiếu lương PDF cá nhân có chữ ký điện tử...')}
          >
            Tải PDF Phiếu Lương
          </AppButton>
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'cycles', label: 'Quản Lý Các Kỳ Lương', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'payslip', label: 'Phiếu Lương Cá Nhân (Payslip)', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'settings', label: 'Quy Chuẩn Thuế & BHXH', icon: <ShieldCheck className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: Cycles */}
      {activeTab === 'cycles' && (
        <div className="space-y-4">
          <AppTable
            columns={cycleColumns}
            data={MOCK_PAYROLL_CYCLES}
            keyExtractor={(c) => c.id}
            totalItems={MOCK_PAYROLL_CYCLES.length}
          />
        </div>
      )}

      {/* Tab 2: Confidential Payslip */}
      {activeTab === 'payslip' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <AppCard className="p-8 sm:p-10 border border-hairline shadow-subtle">
            {/* Header of Payslip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-muted">
                  PHIẾU THANH TOÁN TIỀN LƯƠNG
                </span>
                <h2 className="font-display text-2xl font-light text-ink mt-1">{payslip.cyclePeriod}</h2>
                <p className="text-xs text-muted mt-0.5">Mã số thuế & bảo hiểm đã mã hóa an toàn</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-muted block">Thực Lĩnh Chuyển Khoản:</span>
                <span className="font-display text-3xl sm:text-4xl font-light text-emerald-600 block">
                  {payslip.netSalary.toLocaleString('vi-VN')} đ
                </span>
                <span className="text-[10px] text-muted-soft block mt-0.5">
                  {payslip.bankName} · {payslip.bankAccount}
                </span>
              </div>
            </div>

            {/* Employee Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-hairline text-xs">
              <div>
                <span className="text-muted block">Nhân viên:</span>
                <span className="font-semibold text-ink block mt-0.5">{payslip.employeeName}</span>
              </div>
              <div>
                <span className="text-muted block">Mã nhân sự:</span>
                <span className="font-mono font-semibold text-ink block mt-0.5">{payslip.employeeCode}</span>
              </div>
              <div>
                <span className="text-muted block">Phòng ban:</span>
                <span className="font-medium text-ink block mt-0.5">{payslip.departmentName}</span>
              </div>
              <div>
                <span className="text-muted block">Ngày công thực tế:</span>
                <span className="font-semibold text-ink block mt-0.5">
                  {payslip.actualWorkDays} / {payslip.standardWorkDays} ngày
                </span>
              </div>
            </div>

            {/* Income breakdown */}
            <div className="py-4 space-y-3 border-b border-hairline text-xs">
              <h3 className="font-semibold text-ink uppercase tracking-wider text-[11px]">
                I. Các Khoản Thu Nhập (Gross)
              </h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-body">
                  <span>Lương cơ bản chức danh:</span>
                  <span className="font-medium text-ink">{payslip.basicSalary.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Phụ cấp chức vụ & trách nhiệm:</span>
                  <span className="font-medium text-ink">{payslip.positionAllowance.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Phụ cấp ăn trưa:</span>
                  <span className="font-medium text-ink">{payslip.lunchAllowance.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Tiền làm thêm giờ (OT):</span>
                  <span className="font-medium text-blue-600">+{payslip.otPay.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Thưởng hiệu suất dự án:</span>
                  <span className="font-medium text-emerald-600">+{payslip.bonus.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between font-bold text-ink pt-2 border-t border-hairline-soft text-sm">
                  <span>Tổng Thu Nhập (Gross Income):</span>
                  <span>{payslip.grossSalary.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>
            </div>

            {/* Deductions breakdown */}
            <div className="py-4 space-y-3 border-b border-hairline text-xs">
              <h3 className="font-semibold text-ink uppercase tracking-wider text-[11px]">
                II. Các Khoản Khấu Trừ Bắt Buộc
              </h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-body">
                  <span>Bảo hiểm xã hội (BHXH 8%):</span>
                  <span className="text-rose-600">-{payslip.bhxhDeduction.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Bảo hiểm y tế (BHYT 1.5%):</span>
                  <span className="text-rose-600">-{payslip.bhytDeduction.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Bảo hiểm thất nghiệp (BHTN 1%):</span>
                  <span className="text-rose-600">-{payslip.bhtnDeduction.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Thuế thu nhập cá nhân (TNCN):</span>
                  <span className="text-rose-600">-{payslip.personalIncomeTax.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between font-bold text-ink pt-2 border-t border-hairline-soft text-sm">
                  <span>Tổng Khấu Trừ:</span>
                  <span className="text-rose-600">-{payslip.totalDeductions.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight */}
            <div className="pt-6 flex items-center justify-between">
              <span className="text-sm font-bold text-ink uppercase">III. Thực Lĩnh (Net Take-home):</span>
              <span className="font-display text-3xl font-light text-emerald-600">
                {payslip.netSalary.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </AppCard>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <AppCard className="p-8 max-w-2xl mx-auto space-y-6">
          <h2 className="font-display text-xl font-light text-ink mb-1">Cấu Hình Quy Chuẩn Trừ BHXH & Thuế</h2>
          <p className="text-xs text-muted">Tỷ lệ trích đóng theo Luật Lao động và Luật Thuế TNCN hiện hành</p>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline flex justify-between items-center">
              <div>
                <p className="font-semibold text-ink">Bảo hiểm xã hội (BHXH)</p>
                <p className="text-muted mt-0.5">Người lao động 8.0% · Doanh nghiệp 17.5%</p>
              </div>
              <span className="font-mono font-bold text-sm text-ink">8.0%</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline flex justify-between items-center">
              <div>
                <p className="font-semibold text-ink">Bảo hiểm y tế (BHYT)</p>
                <p className="text-muted mt-0.5">Người lao động 1.5% · Doanh nghiệp 3.0%</p>
              </div>
              <span className="font-mono font-bold text-sm text-ink">1.5%</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline flex justify-between items-center">
              <div>
                <p className="font-semibold text-ink">Bảo hiểm thất nghiệp (BHTN)</p>
                <p className="text-muted mt-0.5">Người lao động 1.0% · Doanh nghiệp 1.0%</p>
              </div>
              <span className="font-mono font-bold text-sm text-ink">1.0%</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline flex justify-between items-center">
              <div>
                <p className="font-semibold text-ink">Giảm trừ gia cảnh bản thân</p>
                <p className="text-muted mt-0.5">Căn cứ tính thuế Thu nhập cá nhân</p>
              </div>
              <span className="font-mono font-bold text-sm text-ink">11,000,000 đ/tháng</span>
            </div>
          </div>
        </AppCard>
      )}

      {/* Cycle Detail Modal */}
      {selectedCycle && (
        <AppModal
          isOpen={showPayslipModal}
          onClose={() => setShowPayslipModal(false)}
          title={`Chi Tiết: ${selectedCycle.name}`}
          subtitle={`Khoảng thời gian: ${selectedCycle.period}`}
          maxWidth="lg"
          footer={
            <AppButton variant="primary" onClick={() => setShowPayslipModal(false)}>
              Đóng
            </AppButton>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-canvas-soft border border-hairline text-center">
              <div>
                <span className="text-muted block">Tổng Gross</span>
                <span className="font-bold text-ink text-sm block mt-1">
                  {selectedCycle.totalGross.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div>
                <span className="text-muted block">Tổng Khấu Trừ</span>
                <span className="font-bold text-red-600 text-sm block mt-1">
                  -{selectedCycle.totalDeductions.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div>
                <span className="text-muted block">Thực Chi Net</span>
                <span className="font-bold text-emerald-600 text-sm block mt-1">
                  {selectedCycle.totalNet.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <p className="text-muted">
              Đã bao gồm 184 nhân sự chính thức và thử việc. Bảng lương đã được phê duyệt bởi Giám đốc Tài chính và Kế toán trưởng.
            </p>
          </div>
        </AppModal>
      )}
    </div>
  );
};
