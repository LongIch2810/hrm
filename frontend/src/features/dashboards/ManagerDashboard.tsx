import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Check, X, Calendar, AlertCircle } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { useMock } from '../../mock/MockContext';
import { MOCK_OT_REQUESTS } from '../../mock/mockAttendance';

export const ManagerDashboard: React.FC = () => {
  const { leaveRequests, approveLeaveRequest, rejectLeaveRequest } = useMock();
  const [activeTab, setActiveTab] = useState('leaves');
  const [otList, setOtList] = useState(MOCK_OT_REQUESTS);

  // Filter department leaves
  const deptPendingLeaves = leaveRequests.filter((r) => r.departmentName.includes('Công Nghệ') && r.status === 'pending');
  const pendingOt = otList.filter((ot) => ot.status === 'pending');

  const handleApproveOt = (id: string) => {
    setOtList(otList.map((ot) => (ot.id === id ? { ...ot, status: 'approved' } : ot)));
  };

  const handleRejectOt = (id: string) => {
    setOtList(otList.map((ot) => (ot.id === id ? { ...ot, status: 'rejected' } : ot)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <AppBadge variant="info">Phạm vi: Khối Công Nghệ & Kỹ Thuật</AppBadge>
          <span className="text-xs text-muted">Trưởng Khối: Lê Hoàng Nam</span>
        </div>
        <h1 className="font-display text-3xl font-light text-ink">Bảng Điều Khiển Quản Lý Bộ Phận</h1>
      </div>

      {/* Row 1: Department Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Tổng Quân Số Phòng Ban</span>
          <div className="font-display text-3xl font-light text-ink mt-2">24</div>
          <p className="text-[11px] text-muted mt-1">22 Kỹ sư · 2 Thực tập sinh</p>
        </AppCard>

        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Có Mặt Làm Việc Hôm Nay</span>
          <div className="font-display text-3xl font-light text-emerald-600 mt-2">21 / 24</div>
          <p className="text-[11px] text-muted mt-1">Tỷ lệ chuyên cần đạt 87.5%</p>
        </AppCard>

        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Nghỉ Phép Có Phê Duyệt</span>
          <div className="font-display text-3xl font-light text-amber-600 mt-2">2</div>
          <p className="text-[11px] text-muted mt-1">1 Phép năm · 1 Thai sản</p>
        </AppCard>

        <AppCard className="p-5">
          <span className="text-xs font-medium text-muted">Đi Muộn Hôm Nay</span>
          <div className="font-display text-3xl font-light text-rose-600 mt-2">1</div>
          <p className="text-[11px] text-muted mt-1">Check-in lúc 08:22 (Muộn 22p)</p>
        </AppCard>
      </div>

      {/* Row 2: Urgent Approval Inbox (SLA < 24h) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <AppCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-hairline">
              <div>
                <h2 className="font-display text-xl font-light text-ink">
                  Hộp Phê Duyệt Cấp Bách (SLA &lt; 24h)
                </h2>
                <p className="text-xs text-muted">Cần phê duyệt kịp thời để đồng bộ bảng công và kế hoạch dự án</p>
              </div>

              <AppTabs
                activeTab={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { id: 'leaves', label: 'Đơn Xin Nghỉ Phép', count: deptPendingLeaves.length },
                  { id: 'ot', label: 'Đơn Làm Thêm Giờ (OT)', count: pendingOt.length },
                ]}
              />
            </div>

            {/* Tab: Leaves */}
            {activeTab === 'leaves' && (
              <div className="space-y-3">
                {deptPendingLeaves.length === 0 ? (
                  <p className="text-xs text-muted text-center py-8">
                    Không có đơn xin nghỉ phép nào đang chờ phê duyệt.
                  </p>
                ) : (
                  deptPendingLeaves.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl border border-hairline bg-canvas-soft/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={req.employeeAvatar}
                          alt={req.employeeName}
                          className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-ink text-sm">{req.employeeName}</span>
                            <AppBadge variant="pending">{req.leaveType}</AppBadge>
                            <span className="text-xs font-semibold text-ink">
                              {req.totalDays} ngày ({req.startDate} - {req.endDate})
                            </span>
                          </div>
                          <p className="text-xs text-body mt-1">Lý do: "{req.reason}"</p>
                          {req.handoverPerson && (
                            <p className="text-[11px] text-muted mt-0.5">
                              Người nhận bàn giao: <span className="font-medium text-ink">{req.handoverPerson}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
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
                          Phê duyệt
                        </AppButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: OT */}
            {activeTab === 'ot' && (
              <div className="space-y-3">
                {pendingOt.length === 0 ? (
                  <p className="text-xs text-muted text-center py-8">
                    Không có đơn làm thêm giờ (OT) nào đang chờ phê duyệt.
                  </p>
                ) : (
                  pendingOt.map((ot) => (
                    <div
                      key={ot.id}
                      className="p-4 rounded-xl border border-hairline bg-canvas-soft/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={ot.employeeAvatar}
                          alt={ot.employeeName}
                          className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-ink text-sm">{ot.employeeName}</span>
                            <AppBadge variant="info">Đăng ký {ot.hours}h OT</AppBadge>
                            <span className="text-xs text-muted">Ngày: {ot.date}</span>
                          </div>
                          <p className="text-xs text-body mt-1">Mục tiêu: "{ot.reason}"</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <AppButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectOt(ot.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Từ chối
                        </AppButton>
                        <AppButton
                          size="sm"
                          variant="primary"
                          onClick={() => handleApproveOt(ot.id)}
                          leftIcon={<Check className="w-3.5 h-3.5" />}
                        >
                          Duyệt OT
                        </AppButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </AppCard>
        </div>

        {/* Right Column (4 cols): Team schedule agenda */}
        <div className="lg:col-span-4 space-y-6">
          <AppCard className="p-6">
            <h3 className="font-display text-xl font-light text-ink mb-1">Lịch Công Tác Tuần Này</h3>
            <p className="text-xs text-muted mb-4">Các nhân sự nghỉ phép hoặc làm thêm giờ 7 ngày tới</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-canvas-soft border border-hairline">
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Hôm nay (21/10)</span>
                  <span className="text-emerald-700">1 OT tối</span>
                </div>
                <p className="text-muted mt-1">Phạm Văn A đăng ký 2.5h OT release bản v2.4.</p>
              </div>

              <div className="p-3 rounded-xl bg-canvas-soft border border-hairline">
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Thứ Sáu (24/10)</span>
                  <span className="text-amber-700">1 Vắng</span>
                </div>
                <p className="text-muted mt-1">Nguyễn Thùy Linh nghỉ phép tham dự hội thảo.</p>
              </div>

              <div className="p-3 rounded-xl bg-canvas-soft border border-hairline">
                <div className="flex items-center justify-between font-semibold text-ink">
                  <span>Thứ Tư (28/10)</span>
                  <span className="text-amber-700">1 Vắng (2 ngày)</span>
                </div>
                <p className="text-muted mt-1">Phạm Văn A nghỉ phép giải quyết việc gia đình.</p>
              </div>
            </div>

            <Link to="/leaves" className="block mt-4">
              <AppButton variant="outline" size="sm" className="w-full">
                Xem lịch toàn bộ phòng ban →
              </AppButton>
            </Link>
          </AppCard>
        </div>
      </div>
    </div>
  );
};
