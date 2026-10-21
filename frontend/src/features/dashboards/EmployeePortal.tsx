import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, CreditCard, ChevronRight, CheckCircle2, Plus } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppSelect } from '../../shared/components/ui/AppSelect';
import { useMock } from '../../mock/MockContext';

export const EmployeePortal: React.FC = () => {
  const {
    currentUser,
    todayAttendance,
    checkIn,
    checkOut,
    leaveBalance,
    createLeaveRequest,
  } = useMock();

  // Digital clock
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('vi-VN'));
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Form states for leave modal
  const [leaveType, setLeaveType] = useState('Phép năm');
  const [startDate, setStartDate] = useState('2026-10-28');
  const [endDate, setEndDate] = useState('2026-10-29');
  const [reason, setReason] = useState('');
  const [handoverPerson, setHandoverPerson] = useState('Nguyễn Thùy Linh');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('vi-VN'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Profile Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
            Cổng Thông Tin Tự Phục Vụ (Employee Self-Service)
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-ink">
            Xin chào, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Mã NV: <span className="font-mono font-semibold text-ink">{currentUser.code}</span> · {currentUser.departmentName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AppButton
            variant="primary"
            onClick={() => setIsLeaveModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Tạo đơn xin nghỉ phép
          </AppButton>
        </div>
      </div>

      {/* Row 1: 1-Touch Check-in Card (Hero) & Leave Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 1-Touch Check-in Card (col-span-7) */}
        <div className="md:col-span-7">
          <AppCard className="p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden bg-canvas-soft border-hairline">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-muted uppercase tracking-wider">
                  Chấm Công Trực Tuyến
                </span>
                <p className="text-xs text-body font-semibold mt-0.5">{todayAttendance.shiftName}</p>
                <p className="text-[11px] text-muted-soft">{todayAttendance.shiftHours}</p>
              </div>

              <div className="text-right">
                <span className="font-mono text-2xl sm:text-3xl font-light text-ink tracking-tight">
                  {currentTime}
                </span>
                <p className="text-[10px] text-muted uppercase tracking-wider">Thời gian thực</p>
              </div>
            </div>

            {/* Central 1-Touch Button */}
            <div className="my-8 text-center">
              {!todayAttendance.isCheckedIn ? (
                <button
                  onClick={checkIn}
                  className="w-full sm:w-72 h-16 rounded-full bg-primary text-white font-semibold text-base shadow-elevated hover:bg-black active:scale-98 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
                >
                  <Clock className="w-5 h-5" />
                  <span>Check-in Vào Ca</span>
                </button>
              ) : !todayAttendance.isCheckedOut ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{todayAttendance.statusText}</span>
                  </div>
                  <div>
                    <button
                      onClick={checkOut}
                      className="w-full sm:w-72 h-14 rounded-full bg-surface-card border-2 border-hairline-strong text-ink font-semibold text-sm hover:bg-surface-strong active:scale-98 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                    >
                      <Clock className="w-4 h-4 text-muted" />
                      <span>Check-out Tan Ca</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center max-w-sm mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-blue-900">{todayAttendance.statusText}</p>
                  <p className="text-[11px] text-blue-700 mt-0.5">Chúc bạn một buổi tối thư thái!</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-hairline">
              <span>Định vị: Trụ sở chính (192.168.1.1)</span>
              <Link to="/attendance" className="font-medium text-ink hover:underline">
                Xem bảng công tháng →
              </Link>
            </div>
          </AppCard>
        </div>

        {/* Leave Balance Card (col-span-5) */}
        <div className="md:col-span-5">
          <AppCard className="p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Quỹ Phép Năm 2026</span>
                <AppBadge variant="active">Hợp lệ</AppBadge>
              </div>

              <div className="mb-4">
                <div className="font-display text-5xl font-light text-ink tracking-tight">
                  {leaveBalance.availableDays} <span className="text-2xl font-sans text-muted font-normal">ngày</span>
                </div>
                <p className="text-xs text-muted mt-1">Số ngày phép năm khả dụng có thể đăng ký</p>
              </div>

              <div className="space-y-2 py-3 border-t border-hairline text-xs">
                <div className="flex items-center justify-between text-muted">
                  <span>Phép tiêu chuẩn trong năm:</span>
                  <span className="font-semibold text-ink">{leaveBalance.standardDays} ngày</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Phép thâm niên bổ sung:</span>
                  <span className="font-semibold text-emerald-600">+{leaveBalance.seniorityDays} ngày</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Phép đã sử dụng:</span>
                  <span className="font-semibold text-rose-600">{leaveBalance.usedDays} ngày</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline">
              <AppButton
                variant="outline"
                size="sm"
                onClick={() => setIsLeaveModalOpen(true)}
                className="w-full"
              >
                + Đăng ký nghỉ phép mới
              </AppButton>
            </div>
          </AppCard>
        </div>
      </div>

      {/* Row 2: Personal Shortcuts & Important Records */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Timesheet Summary */}
        <Link to="/attendance">
          <AppCard className="p-5 hover:bg-canvas-soft transition-colors cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-ink">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">Công Chuẩn Tháng 10</p>
                <p className="font-display text-xl font-light text-ink mt-0.5">21.5 / 22 ngày công</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted" />
          </AppCard>
        </Link>

        {/* Payslip Shortcut */}
        <Link to="/payroll">
          <AppCard className="p-5 hover:bg-canvas-soft transition-colors cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-emerald-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">Phiếu Lương Gần Nhất (T09)</p>
                <p className="font-display text-xl font-light text-ink mt-0.5">38,510,000 đ (Net)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted" />
          </AppCard>
        </Link>

        {/* Company Calendar */}
        <Link to="/leaves">
          <AppCard className="p-5 hover:bg-canvas-soft transition-colors cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">Lịch Nghỉ Lễ Kế Tiếp</p>
                <p className="font-display text-xl font-light text-ink mt-0.5">Tết Dương Lịch 01/01</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted" />
          </AppCard>
        </Link>
      </div>

      {/* Leave Request Modal */}
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
