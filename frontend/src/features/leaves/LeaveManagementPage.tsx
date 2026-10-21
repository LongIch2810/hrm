import React, { useState } from 'react';
import { CalendarDays, Plus, Check, X, RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppSelect } from '../../shared/components/ui/AppSelect';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { useMock } from '../../mock/MockContext';
import { LeaveRequest, MOCK_LEAVE_CALENDAR, LeaveCalendarEvent } from '../../mock/mockLeaves';

export const LeaveManagementPage: React.FC = () => {
  const {
    leaveBalance,
    leaveRequests,
    createLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    cancelLeaveRequest,
  } = useMock();

  const [activeTab, setActiveTab] = useState('my-leaves');
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Form states
  const [leaveType, setLeaveType] = useState('Phép năm');
  const [startDate, setStartDate] = useState('2026-10-28');
  const [endDate, setEndDate] = useState('2026-10-29');
  const [reason, setReason] = useState('');
  const [handoverPerson, setHandoverPerson] = useState('Nguyễn Thùy Linh');

  const pendingApprovals = leaveRequests.filter((r) => r.status === 'pending');

  const handleCreateLeave = (e: React.FormEvent) => {
    e.preventDefault();
    createLeaveRequest({
      leaveType,
      startDate: '28/10/2026',
      endDate: '29/10/2026',
      totalDays: 2.0,
      reason,
      handoverPerson,
    });
    setIsLeaveModalOpen(false);
    setReason('');
  };

  const myLeavesColumns: Column<LeaveRequest>[] = [
    {
      header: 'Mã Đơn',
      accessorKey: 'code',
      cell: (r) => <span className="font-mono font-semibold text-ink text-xs">{r.code}</span>,
    },
    {
      header: 'Loại Nghỉ Phép',
      accessorKey: 'leaveType',
      cell: (r) => <span className="font-medium text-ink text-xs">{r.leaveType}</span>,
    },
    {
      header: 'Thời Gian Nghỉ',
      cell: (r) => (
        <span className="text-xs text-body">
          {r.startDate} → {r.endDate} ({r.totalDays} ngày)
        </span>
      ),
    },
    {
      header: 'Người Duyệt',
      accessorKey: 'approverName',
      cell: (r) => <span className="text-xs text-muted">{r.approverName}</span>,
    },
    {
      header: 'Trạng Thái',
      accessorKey: 'status',
      cell: (r) => <AppBadge variant={r.status}>{r.status}</AppBadge>,
    },
    {
      header: 'Thao Tác',
      align: 'right',
      cell: (r) =>
        r.canCancel ? (
          <button
            onClick={() => cancelLeaveRequest(r.id)}
            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
            title="Hủy đơn và hoàn lại quỹ phép"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Hủy đơn</span>
          </button>
        ) : (
          <span className="text-muted-soft text-xs">-</span>
        ),
    },
  ];

  const calendarColumns: Column<LeaveCalendarEvent>[] = [
    {
      header: 'Nhân Viên',
      cell: (c) => (
        <div className="flex items-center gap-2.5">
          <img src={c.employeeAvatar} alt={c.employeeName} className="w-7 h-7 rounded-full object-cover" />
          <span className="font-semibold text-xs text-ink">{c.employeeName}</span>
        </div>
      ),
    },
    {
      header: 'Phòng Ban',
      accessorKey: 'departmentName',
      cell: (c) => <span className="text-xs text-muted">{c.departmentName}</span>,
    },
    {
      header: 'Loại Phép',
      accessorKey: 'leaveType',
      cell: (c) => <AppBadge variant="info">{c.leaveType}</AppBadge>,
    },
    {
      header: 'Khoảng Thời Gian',
      cell: (c) => (
        <span className="text-xs text-body">
          {c.startDate} → {c.endDate}
        </span>
      ),
    },
    {
      header: 'Tổng Số Ngày',
      align: 'right',
      cell: (c) => <span className="font-semibold text-ink text-xs">{c.daysCount} ngày</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Phân Hệ Quản Lý Nghỉ Phép (LEAVE)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Quản Lý Quỹ Phép & Đơn Nghỉ Phép</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsLeaveModalOpen(true)}
          >
            Tạo đơn xin nghỉ phép
          </AppButton>
        </div>
      </div>

      {/* 4 Leave Balance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Phép Tiêu Chuẩn 2026</span>
          <div className="font-display text-3xl font-light text-ink mt-1">{leaveBalance.standardDays}</div>
          <p className="text-[11px] text-muted mt-1">Tích lũy 1 ngày/tháng</p>
        </AppCard>

        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Phép Thâm Niên</span>
          <div className="font-display text-3xl font-light text-emerald-600 mt-1">+{leaveBalance.seniorityDays}</div>
          <p className="text-[11px] text-muted mt-1">Cộng thêm mỗi 5 năm làm việc</p>
        </AppCard>

        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Phép Đã Sử Dụng</span>
          <div className="font-display text-3xl font-light text-rose-600 mt-1">{leaveBalance.usedDays}</div>
          <p className="text-[11px] text-muted mt-1">Đã khấu trừ quỹ chính thức</p>
        </AppCard>

        <AppCard className="p-5 bg-emerald-50/20 border-emerald-200 dark:border-emerald-900">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">Phép Khả Dụng Còn Lại</span>
          <div className="font-display text-3xl font-light text-emerald-900 dark:text-emerald-300 mt-1">
            {leaveBalance.availableDays} ngày
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-500 mt-1">Sẵn sàng để đăng ký</p>
        </AppCard>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'my-leaves', label: 'Lịch Sử Đơn Của Tôi', count: leaveRequests.length },
          { id: 'approvals', label: 'Hộp Phê Duyệt Cấp Quản Lý', count: pendingApprovals.length },
          { id: 'calendar', label: 'Lịch Nghỉ Phép Phòng Ban', icon: <Calendar className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: My Leaves */}
      {activeTab === 'my-leaves' && (
        <AppTable
          columns={myLeavesColumns}
          data={leaveRequests}
          keyExtractor={(r) => r.id}
          totalItems={leaveRequests.length}
        />
      )}

      {/* Tab 2: Approvals */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          {pendingApprovals.length === 0 ? (
            <AppCard className="p-12 text-center text-muted">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-ink">Đã xử lý xong toàn bộ đơn nghỉ phép</p>
              <p className="text-xs text-muted mt-0.5">Không còn đơn nào đang chờ duyệt trong hàng đợi SLA.</p>
            </AppCard>
          ) : (
            pendingApprovals.map((req) => (
              <AppCard key={req.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img src={req.employeeAvatar} alt={req.employeeName} className="w-11 h-11 rounded-full object-cover shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink text-sm sm:text-base">{req.employeeName}</span>
                      <AppBadge variant="pending">{req.leaveType}</AppBadge>
                      <span className="text-xs text-muted">Mã: {req.code}</span>
                    </div>
                    <p className="text-xs font-medium text-ink mt-1">
                      Thời gian: {req.startDate} → {req.endDate} ({req.totalDays} ngày nghỉ)
                    </p>
                    <p className="text-xs text-body mt-0.5">Lý do: "{req.reason}"</p>
                    {req.handoverPerson && (
                      <p className="text-[11px] text-muted mt-0.5">Người bàn giao: {req.handoverPerson}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <AppButton
                    size="sm"
                    variant="outline"
                    onClick={() => rejectLeaveRequest(req.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Từ chối
                  </AppButton>
                  <AppButton
                    size="sm"
                    variant="primary"
                    onClick={() => approveLeaveRequest(req.id)}
                    leftIcon={<Check className="w-3.5 h-3.5" />}
                  >
                    Phê duyệt ngay
                  </AppButton>
                </div>
              </AppCard>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Calendar */}
      {activeTab === 'calendar' && (
        <AppTable
          columns={calendarColumns}
          data={MOCK_LEAVE_CALENDAR}
          keyExtractor={(c) => c.id}
          totalItems={MOCK_LEAVE_CALENDAR.length}
        />
      )}

      {/* Create Leave Modal */}
      <AppModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Tạo Đơn Xin Nghỉ Phép"
        subtitle="Hệ thống tự động loại trừ Thứ 7, Chủ Nhật và ngày lễ Tết quốc gia."
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsLeaveModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton variant="primary" onClick={handleCreateLeave}>
              Gửi Đơn Nghỉ Phép
            </AppButton>
          </>
        }
      >
        <form onSubmit={handleCreateLeave} className="space-y-4 text-xs">
          <AppSelect
            label="Loại nghỉ phép"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            options={[
              { value: 'Phép năm', label: 'Phép năm (Có hưởng lương)' },
              { value: 'Nghỉ ốm (BHXH)', label: 'Nghỉ ốm đau (Hưởng trợ cấp BHXH)' },
              { value: 'Nghỉ việc riêng', label: 'Nghỉ việc riêng (Hiếu, hỷ)' },
              { value: 'Nghỉ không lương', label: 'Nghỉ không hưởng lương' },
            ]}
          />

          <div className="grid grid-cols-2 gap-3">
            <AppInput
              label="Từ ngày"
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <AppInput
              label="Đến ngày"
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="p-3 rounded-xl bg-canvas-soft border border-hairline flex items-center justify-between text-xs">
            <span className="text-muted">Tổng số ngày nghỉ tính toán:</span>
            <span className="font-semibold text-ink text-sm">2.0 ngày</span>
          </div>

          <div>
            <label className="text-sm font-medium text-body-strong mb-1 block">
              Lý do xin nghỉ <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do chi tiết..."
              className="w-full p-3 bg-surface-card border border-hairline-strong rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
            />
          </div>

          <AppInput
            label="Người nhận bàn giao công việc"
            value={handoverPerson}
            onChange={(e) => setHandoverPerson(e.target.value)}
            placeholder="Tên đồng nghiệp cùng phòng ban..."
          />
        </form>
      </AppModal>
    </div>
  );
};
