import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Activity, FileText, Lock, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { useMock } from '../../mock/MockContext';

export const AdminDashboard: React.FC = () => {
  const { auditLogs } = useMock();

  const metrics = [
    {
      label: 'Tổng Tài Khoản Người Dùng',
      value: '184',
      sub: '172 Hoạt động · 8 Tạm ngừng · 4 Khóa',
      icon: <Users className="w-5 h-5 text-ink" />,
    },
    {
      label: 'Phiên Làm Việc Đồng Thời',
      value: '38',
      sub: 'Đỉnh điểm 62 phiên lúc 09:30',
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
    },
    {
      label: 'Sự Kiện Audit Log (24h)',
      value: '1,429',
      sub: '100% nhật ký đã ký mã hóa',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
    },
    {
      label: 'Đăng Nhập Thất Bại Hôm Nay',
      value: '7',
      sub: '0 tài khoản bị khóa brute-force',
      icon: <Lock className="w-5 h-5 text-amber-600" />,
    },
  ];

  const roleDistribution = [
    { role: 'System Administrator (Admin)', count: 3, percent: 2, color: 'bg-stone-800' },
    { role: 'Chuyên Viên Nhân Sự (HR)', count: 5, percent: 3, color: 'bg-blue-600' },
    { role: 'Trưởng Bộ Phận (Manager)', count: 12, percent: 7, color: 'bg-amber-600' },
    { role: 'Nhân Viên (Employee Portal)', count: 164, percent: 88, color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AppBadge variant="active" withDot>
              Hệ thống an toàn (ISO 27001)
            </AppBadge>
            <span className="text-xs text-muted">Cập nhật 1 phút trước</span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Hạ Tầng & Quản Trị Hệ Thống</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-medium hover:bg-black transition-colors"
          >
            <span>Quản lý phân quyền RBAC</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row 1: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <AppCard key={idx} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted mb-2">
              <span className="text-xs font-medium">{m.label}</span>
              <span className="p-2 rounded-xl bg-canvas-soft border border-hairline">{m.icon}</span>
            </div>
            <div>
              <div className="font-display text-3xl font-light text-ink">{m.value}</div>
              <p className="text-[11px] text-muted mt-1">{m.sub}</p>
            </div>
          </AppCard>
        ))}
      </div>

      {/* Row 2: Split 65:35 Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (65% -> col-span-8): Audit Logs Summary Table */}
        <div className="lg:col-span-8">
          <AppCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-hairline flex items-center justify-between bg-canvas-soft/40">
              <div>
                <h2 className="font-display text-xl font-light text-ink">Nhật Ký Kiểm Toán Bảo Mật Mới Nhất</h2>
                <p className="text-xs text-muted">5 hành vi hệ thống được ghi nhận gần đây</p>
              </div>
              <Link to="/admin" className="text-xs text-ink font-medium hover:underline flex items-center gap-1">
                Xem toàn bộ log →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas-soft border-b border-hairline text-muted uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-5 py-3">Người thực hiện</th>
                    <th className="px-4 py-3">Hành động</th>
                    <th className="px-4 py-3">Phân hệ</th>
                    <th className="px-4 py-3">Địa chỉ IP</th>
                    <th className="px-4 py-3">Thời gian</th>
                    <th className="px-5 py-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {auditLogs.slice(0, 5).map((log) => (
                    <tr key={log.id} className="hover:bg-canvas-soft/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-ink">{log.actorName}</div>
                        <div className="text-[10px] text-muted">{log.actorEmail}</div>
                      </td>
                      <td className="px-4 py-3.5 font-medium text-body">{log.action}</td>
                      <td className="px-4 py-3.5 text-muted">{log.module}</td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-muted-soft">{log.ipAddress}</td>
                      <td className="px-4 py-3.5 text-muted">{log.timestamp}</td>
                      <td className="px-5 py-3.5 text-right">
                        <AppBadge
                          variant={log.status === 'success' ? 'active' : log.status === 'warning' ? 'warning' : 'rejected'}
                        >
                          {log.status === 'success' ? 'Thành công' : log.status === 'warning' ? 'Cảnh báo' : 'Thất bại'}
                        </AppBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AppCard>
        </div>

        {/* Right Column (35% -> col-span-4): Role distribution & Quick shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <AppCard className="p-6">
            <h2 className="font-display text-xl font-light text-ink mb-1">Phân Bổ Vai Trò RBAC</h2>
            <p className="text-xs text-muted mb-4">Tổng cộng 184 tài khoản hoạt động</p>

            <div className="space-y-3.5">
              {roleDistribution.map((r, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink">{r.role}</span>
                    <span className="font-semibold text-muted">
                      {r.count} ({r.percent}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs">
              <span className="text-muted">Chính sách bảo mật:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đang kích hoạt
              </span>
            </div>
          </AppCard>

          <AppCard className="p-6">
            <h3 className="font-display text-lg font-light text-ink mb-3">Lối Tắt Cấu Hình Vận Hành</h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/admin"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-canvas-soft border border-hairline transition-colors"
              >
                <span className="font-medium text-ink">Cấu hình thời gian khóa Brute-force</span>
                <span className="text-muted">15 phút →</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-canvas-soft border border-hairline transition-colors"
              >
                <span className="font-medium text-ink">Số giờ làm việc chuẩn/ngày</span>
                <span className="text-muted">8.0 giờ →</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-canvas-soft border border-hairline transition-colors"
              >
                <span className="font-medium text-ink">Cảnh báo hết hạn hợp đồng</span>
                <span className="text-muted">30 ngày →</span>
              </Link>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
};
