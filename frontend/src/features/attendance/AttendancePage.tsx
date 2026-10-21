import React, { useState } from 'react';
import { Clock, Calendar, Check, AlertCircle, Plus, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { useMock } from '../../mock/MockContext';
import { MOCK_TIMESHEET_DAYS, TimesheetDay, MOCK_OT_REQUESTS, OvertimeRequest, MOCK_SHIFTS, Shift } from '../../mock/mockAttendance';

export const AttendancePage: React.FC = () => {
  const { todayAttendance, checkIn, checkOut, currentUser } = useMock();
  const [activeTab, setActiveTab] = useState('timesheet');
  const [otList, setOtList] = useState(MOCK_OT_REQUESTS);
  const [isOtModalOpen, setIsOtModalOpen] = useState(false);

  // OT form state
  const [otDate, setOtDate] = useState('2026-10-22');
  const [otHours, setOtHours] = useState(2.0);
  const [otReason, setOtReason] = useState('');

  const handleCreateOt = (e: React.FormEvent) => {
    e.preventDefault();
    const newOt: OvertimeRequest = {
      id: `OT${Date.now()}`,
      code: `OT2026-00${otList.length + 15}`,
      employeeId: currentUser.code,
      employeeName: currentUser.name,
      employeeAvatar: currentUser.avatarUrl || '',
      departmentName: currentUser.departmentName,
      date: otDate,
      hours: Number(otHours),
      reason: otReason,
      status: 'pending',
      approverName: 'Lê Hoàng Nam',
      submittedAt: new Date().toLocaleString('vi-VN'),
    };
    setOtList([newOt, ...otList]);
    setIsOtModalOpen(false);
    setOtReason('');
  };

  const timesheetColumns: Column<TimesheetDay>[] = [
    {
      header: 'Ngày',
      cell: (d) => (
        <span className="font-semibold text-ink text-xs">
          {d.date} <span className="text-muted font-normal">({d.dayOfWeek})</span>
        </span>
      ),
    },
    {
      header: 'Giờ Vào',
      accessorKey: 'checkIn',
      cell: (d) => <span className="font-mono text-xs">{d.checkIn}</span>,
    },
    {
      header: 'Giờ Ra',
      accessorKey: 'checkOut',
      cell: (d) => <span className="font-mono text-xs">{d.checkOut}</span>,
    },
    {
      header: 'Giờ Chuẩn',
      align: 'center',
      cell: (d) => <span className="text-xs">{d.standardWorkHours}h</span>,
    },
    {
      header: 'Giờ Thực Tế',
      align: 'center',
      cell: (d) => <span className="text-xs font-semibold text-ink">{d.actualWorkHours}h</span>,
    },
    {
      header: 'Làm Thêm (OT)',
      align: 'center',
      cell: (d) => (
        <span className={`text-xs ${d.otHours > 0 ? 'font-bold text-blue-600' : 'text-muted-soft'}`}>
          {d.otHours > 0 ? `+${d.otHours}h` : '-'}
        </span>
      ),
    },
    {
      header: 'Ký Hiệu & Trạng Thái',
      cell: (d) => {
        const variantMap: Record<string, any> = {
          X: 'active',
          P: 'warning',
          O: 'info',
          M: 'rejected',
          OFF: 'neutral',
        };
        return <AppBadge variant={variantMap[d.statusCode] || 'neutral'}>{d.statusLabel}</AppBadge>;
      },
    },
  ];

  const otColumns: Column<OvertimeRequest>[] = [
    {
      header: 'Mã Đơn',
      accessorKey: 'code',
      cell: (ot) => <span className="font-mono font-semibold text-xs text-ink">{ot.code}</span>,
    },
    {
      header: 'Nhân Viên',
      cell: (ot) => (
        <div className="flex items-center gap-2">
          <img src={ot.employeeAvatar} alt={ot.employeeName} className="w-7 h-7 rounded-full object-cover" />
          <span className="font-semibold text-xs text-ink">{ot.employeeName}</span>
        </div>
      ),
    },
    {
      header: 'Ngày Đăng Ký',
      accessorKey: 'date',
      cell: (ot) => <span className="text-xs text-muted">{ot.date}</span>,
    },
    {
      header: 'Số Giờ OT',
      accessorKey: 'hours',
      align: 'center',
      cell: (ot) => <span className="font-bold text-xs text-blue-600">+{ot.hours} giờ</span>,
    },
    {
      header: 'Lý Do & Mục Tiêu',
      accessorKey: 'reason',
      cell: (ot) => <span className="text-xs text-body line-clamp-1">{ot.reason}</span>,
    },
    {
      header: 'Trạng Thái',
      accessorKey: 'status',
      cell: (ot) => <AppBadge variant={ot.status}>{ot.status}</AppBadge>,
    },
  ];

  const shiftColumns: Column<Shift>[] = [
    {
      header: 'Tên Ca Làm Việc',
      accessorKey: 'name',
      cell: (s) => <span className="font-semibold text-ink text-sm">{s.name}</span>,
    },
    {
      header: 'Khung Giờ',
      cell: (s) => (
        <span className="font-mono text-xs text-body">
          {s.startTime} - {s.endTime}
        </span>
      ),
    },
    {
      header: 'Nghỉ Giữa Ca',
      accessorKey: 'breakTime',
      cell: (s) => <span className="text-xs text-muted">{s.breakTime}</span>,
    },
    {
      header: 'Ngày Áp Dụng',
      accessorKey: 'workDays',
      cell: (s) => <span className="text-xs text-body">{s.workDays}</span>,
    },
    {
      header: 'Chính Sách Linh Hoạt',
      cell: (s) => (
        <AppBadge variant={s.isFlexible ? 'info' : 'neutral'}>
          {s.isFlexible ? 'Linh hoạt 60p' : 'Cố định'}
        </AppBadge>
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
              Phân Hệ Chấm Công & Thời Gian (ATT)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Quản Lý Chấm Công & Ca Làm Việc</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsOtModalOpen(true)}
          >
            Đăng ký làm thêm giờ (OT)
          </AppButton>
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'timesheet', label: 'Bảng Công Tháng 10 Cá Nhân', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'ot', label: 'Đơn Làm Thêm Giờ (OT)', count: otList.filter((o) => o.status === 'pending').length, icon: <Clock className="w-4 h-4" /> },
          { id: 'shifts', label: 'Thiết Lập Ca Làm Việc', icon: <Calendar className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: Timesheet */}
      {activeTab === 'timesheet' && (
        <div className="space-y-4">
          {/* Quick Timesheet KPI banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <AppCard className="p-4">
              <span className="text-xs text-muted">Công Chuẩn Đã Đạt</span>
              <p className="font-display text-2xl font-light text-ink mt-1">21.5 / 22</p>
            </AppCard>
            <AppCard className="p-4">
              <span className="text-xs text-muted">Tổng Giờ Làm Thêm OT</span>
              <p className="font-display text-2xl font-light text-blue-600 mt-1">+4.5 giờ</p>
            </AppCard>
            <AppCard className="p-4">
              <span className="text-xs text-muted">Số Lần Đi Muộn</span>
              <p className="font-display text-2xl font-light text-amber-600 mt-1">1 lần (22p)</p>
            </AppCard>
            <AppCard className="p-4">
              <span className="text-xs text-muted">Ngày Nghỉ Có Phép</span>
              <p className="font-display text-2xl font-light text-emerald-600 mt-1">1.0 ngày</p>
            </AppCard>
          </div>

          <AppTable
            columns={timesheetColumns}
            data={MOCK_TIMESHEET_DAYS}
            keyExtractor={(d) => d.date}
            totalItems={MOCK_TIMESHEET_DAYS.length}
          />
        </div>
      )}

      {/* Tab 2: Overtime List */}
      {activeTab === 'ot' && (
        <div className="space-y-4">
          <AppTable
            columns={otColumns}
            data={otList}
            keyExtractor={(ot) => ot.id}
            totalItems={otList.length}
          />
        </div>
      )}

      {/* Tab 3: Shifts */}
      {activeTab === 'shifts' && (
        <div className="space-y-4">
          <AppTable
            columns={shiftColumns}
            data={MOCK_SHIFTS}
            keyExtractor={(s) => s.id}
            totalItems={MOCK_SHIFTS.length}
          />
        </div>
      )}

      {/* Create OT Modal */}
      <AppModal
        isOpen={isOtModalOpen}
        onClose={() => setIsOtModalOpen(false)}
        title="Đăng Ký Làm Thêm Giờ (Overtime)"
        subtitle="Đơn làm thêm giờ cần được Trưởng bộ phận phê duyệt trước khi diễn ra."
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsOtModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton variant="primary" onClick={handleCreateOt}>
              Gửi Đơn Đăng Ký OT
            </AppButton>
          </>
        }
      >
        <form onSubmit={handleCreateOt} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <AppInput
              label="Ngày làm OT"
              type="date"
              required
              value={otDate}
              onChange={(e) => setOtDate(e.target.value)}
            />
            <AppInput
              label="Số giờ dự kiến (h)"
              type="number"
              step="0.5"
              required
              value={otHours}
              onChange={(e) => setOtHours(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-body-strong mb-1 block">
              Mục tiêu & Hạng mục công việc <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={otReason}
              onChange={(e) => setOtReason(e.target.value)}
              placeholder="Mô tả cụ thể nhiệm vụ cần làm thêm giờ..."
              className="w-full p-3 bg-surface-card border border-hairline-strong rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
            />
          </div>
        </form>
      </AppModal>
    </div>
  );
};
