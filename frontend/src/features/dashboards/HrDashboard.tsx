import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, AlertTriangle, Briefcase, Calendar, Check, ArrowRight } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { useMock } from '../../mock/MockContext';

export const HrDashboard: React.FC = () => {
  const { leaveRequests, approveLeaveRequest } = useMock();

  const pendingLeaves = leaveRequests.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Atmospheric Mint-Sky Orb */}
      <AppCard variant="orb-sky" className="p-8 sm:p-10 relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
            Bảng Điều Khiển Nhân Sự (HR Generalist)
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-ink">
            Xin chào, Thu Thảo
          </h1>
          <p className="text-body text-sm sm:text-base leading-relaxed">
            Hôm nay có <span className="font-semibold text-ink">{pendingLeaves.length} đơn nghỉ phép</span> và <span className="font-semibold text-red-600">3 hợp đồng lao động</span> cần rà soát trong tuần này.
          </p>
        </div>
      </AppCard>

      {/* Row 1: 4 Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AppCard className="p-5">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Quân Số Toàn Công Ty</span>
            <Users className="w-4 h-4 text-ink" />
          </div>
          <div className="font-display text-3xl font-light text-ink">184</div>
          <p className="text-[11px] text-muted mt-1">162 Chính thức · 22 Thử việc</p>
        </AppCard>

        <AppCard className="p-5">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Chuyên Cần Hôm Nay</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display text-3xl font-light text-ink">176 / 184</div>
          <p className="text-[11px] text-muted mt-1">4 Nghỉ phép · 3 Đi muộn · 1 Vắng</p>
        </AppCard>

        <AppCard className="p-5 border-amber-200 dark:border-amber-900 bg-amber-50/20">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold">Cảnh Báo Hết Hạn HĐ (≤ 30d)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-display text-3xl font-light text-amber-900 dark:text-amber-400">3</div>
          <p className="text-[11px] text-amber-700 dark:text-amber-500 mt-1">Cần lập thủ tục tái ký hoặc thanh lý</p>
        </AppCard>

        <AppCard className="p-5">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Vị Trí Tuyển Dụng Đang Mở</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-display text-3xl font-light text-ink">5 Vị trí</div>
          <p className="text-[11px] text-muted mt-1">42 Hồ sơ ứng viên đang xử lý</p>
        </AppCard>
      </div>

      {/* Row 2: Priority Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Leave Approvals & Interviews */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pending Leaves Queue */}
          <AppCard className="p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-hairline">
              <div>
                <h2 className="font-display text-xl font-light text-ink">Đơn Nghỉ Phép Chờ Duyệt (HR SLA &lt; 24h)</h2>
                <p className="text-xs text-muted">Danh sách đơn từ các bộ phận đã được trưởng phòng xác nhận</p>
              </div>
              <Link to="/leaves" className="text-xs text-ink font-medium hover:underline">
                Xem tất cả ({pendingLeaves.length}) →
              </Link>
            </div>

            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-muted text-center py-6">Không có đơn nghỉ phép nào đang chờ duyệt.</p>
            ) : (
              <div className="space-y-3">
                {pendingLeaves.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-hairline bg-canvas-soft/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img src={req.employeeAvatar} alt={req.employeeName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-ink text-sm">{req.employeeName}</span>
                          <AppBadge variant="pending">{req.leaveType}</AppBadge>
                        </div>
                        <p className="text-xs text-muted mt-0.5">
                          {req.departmentName} · {req.startDate} đến {req.endDate} ({req.totalDays} ngày)
                        </p>
                        <p className="text-[11px] text-muted-soft italic mt-0.5">"{req.reason}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <AppButton
                        size="sm"
                        variant="primary"
                        onClick={() => approveLeaveRequest(req.id)}
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                      >
                        Duyệt
                      </AppButton>
                      <Link to="/leaves">
                        <AppButton size="sm" variant="outline">
                          Chi tiết
                        </AppButton>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AppCard>

          {/* Today's Interviews */}
          <AppCard className="p-6">
            <h2 className="font-display text-xl font-light text-ink mb-1">Lịch Phỏng Vấn Tuyển Dụng Hôm Nay</h2>
            <p className="text-xs text-muted mb-4">2 buổi phỏng vấn chuyên môn với Trưởng bộ phận Kỹ thuật</p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-hairline bg-canvas-soft flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-bold">
                    <span>14:30</span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Trần Đình Trọng — Senior Frontend Engineer</p>
                    <p className="text-muted mt-0.5">Hội đồng: Lê Hoàng Nam, Phạm Văn A (Phòng Họp 02)</p>
                  </div>
                </div>
                <AppBadge variant="info">Vòng 2 Kỹ Thuật</AppBadge>
              </div>

              <div className="p-3.5 rounded-xl border border-hairline bg-canvas-soft flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-bold">
                    <span>16:00</span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Hoàng Thị Cẩm Tú — Senior Frontend Engineer</p>
                    <p className="text-muted mt-0.5">Hội đồng: Lê Hoàng Nam, Trần Thị Thu Thảo (Phòng Họp 01)</p>
                  </div>
                </div>
                <AppBadge variant="info">Vòng 2 Kỹ Thuật</AppBadge>
              </div>
            </div>
          </AppCard>
        </div>

        {/* Right Column (4 cols): Contract alerts & Quick actions */}
        <div className="lg:col-span-4 space-y-6">
          <AppCard className="p-6 border-red-200 dark:border-red-900 bg-red-50/20">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Cảnh Báo Hợp Đồng Đến Hạn</span>
            </div>
            <h3 className="font-display text-xl font-light text-ink mb-1">Cần Tái Ký & Gia Hạn</h3>
            <p className="text-xs text-muted mb-4">Các nhân viên có hợp đồng hết hạn trong vòng 30 ngày:</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-surface-card border border-hairline">
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Nguyễn Thùy Linh</span>
                  <span className="text-red-600">Còn 10 ngày</span>
                </div>
                <p className="text-muted text-[11px] mt-0.5">HĐ 1 năm · Hết hạn 31/10/2026</p>
              </div>

              <div className="p-3 rounded-lg bg-surface-card border border-hairline">
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Đoàn Bảo Ngọc</span>
                  <span className="text-red-600">Còn 10 ngày</span>
                </div>
                <p className="text-muted text-[11px] mt-0.5">HĐ Thử việc · Hết hạn 31/10/2026</p>
              </div>

              <div className="p-3 rounded-lg bg-surface-card border border-hairline">
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Trần Quang Khải</span>
                  <span className="text-red-600">Còn 9 ngày</span>
                </div>
                <p className="text-muted text-[11px] mt-0.5">HĐ Thử việc · Hết hạn 30/10/2026</p>
              </div>
            </div>

            <Link to="/contracts" className="block mt-4">
              <AppButton variant="outline" size="sm" className="w-full">
                Xử lý tái ký hợp đồng →
              </AppButton>
            </Link>
          </AppCard>

          <AppCard className="p-6">
            <h3 className="font-display text-lg font-light text-ink mb-3">Thao Tác Nhanh Nhân Sự</h3>
            <div className="space-y-2 text-xs">
              <Link to="/employees/new">
                <AppButton variant="primary" size="sm" className="w-full justify-start">
                  + Thêm mới hồ sơ nhân sự
                </AppButton>
              </Link>
              <Link to="/recruitment">
                <AppButton variant="outline" size="sm" className="w-full justify-start">
                  Đăng tin tuyển dụng mới
                </AppButton>
              </Link>
              <Link to="/payroll">
                <AppButton variant="outline" size="sm" className="w-full justify-start">
                  Kiểm tra kỳ tính lương T10
                </AppButton>
              </Link>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
};
