import React, { useState } from 'react';
import { Shield, Users, Sliders, Bell, FileText, Check, AlertTriangle, Plus } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { useMock } from '../../mock/MockContext';
import {
  MOCK_AUDIT_LOGS,
  AuditLogItem,
  MOCK_SYSTEM_PARAMS,
  SystemParameter,
  MOCK_RBAC_MATRIX,
  RolePermissionRow,
} from '../../mock/mockAdmin';
import { CurrentUser } from '../../shared/types/common';

export const AdminPage: React.FC = () => {
  const { allUsers, auditLogs } = useMock();
  const [activeTab, setActiveTab] = useState('rbac');
  const [rbacMatrix, setRbacMatrix] = useState<RolePermissionRow[]>(MOCK_RBAC_MATRIX);
  const [params, setParams] = useState<SystemParameter[]>(MOCK_SYSTEM_PARAMS);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Toggle RBAC cell
  const handleToggleRbac = (
    moduleCode: string,
    role: 'admin' | 'hr' | 'manager' | 'employee',
    action: 'read' | 'write' | 'approve' | 'delete'
  ) => {
    setRbacMatrix(
      rbacMatrix.map((row) => {
        if (row.moduleCode === moduleCode) {
          const currentVal = row[role][action];
          return {
            ...row,
            [role]: {
              ...row[role],
              [action]: !currentVal,
            },
          };
        }
        return row;
      })
    );
  };

  const userColumns: Column<CurrentUser>[] = [
    {
      header: 'Mã NV',
      accessorKey: 'code',
      cell: (u) => <span className="font-mono font-semibold text-xs text-ink">{u.code}</span>,
    },
    {
      header: 'Họ & Tên',
      cell: (u) => (
        <div className="flex items-center gap-2.5">
          <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <span className="font-semibold text-xs text-ink block">{u.name}</span>
            <span className="text-[10px] text-muted block">{u.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Phòng Ban',
      accessorKey: 'departmentName',
      cell: (u) => <span className="text-xs text-body">{u.departmentName}</span>,
    },
    {
      header: 'Chức Danh',
      accessorKey: 'position',
      cell: (u) => <span className="text-xs text-muted">{u.position}</span>,
    },
    {
      header: 'Vai Trò RBAC',
      accessorKey: 'role',
      cell: (u) => (
        <AppBadge variant={u.role === 'ADMIN' ? 'active' : u.role === 'HR' ? 'info' : 'warning'}>
          {u.role}
        </AppBadge>
      ),
    },
    {
      header: 'Trạng Thái',
      cell: () => <AppBadge variant="active">Hoạt động</AppBadge>,
    },
  ];

  const auditColumns: Column<AuditLogItem>[] = [
    {
      header: 'Thời Gian',
      accessorKey: 'timestamp',
      cell: (a) => <span className="font-mono text-xs text-muted">{a.timestamp}</span>,
    },
    {
      header: 'Người Thực Hiện',
      cell: (a) => (
        <div>
          <span className="font-semibold text-xs text-ink block">{a.actorName}</span>
          <span className="text-[10px] text-muted block">{a.actorEmail}</span>
        </div>
      ),
    },
    {
      header: 'Hành Động',
      accessorKey: 'action',
      cell: (a) => <span className="font-medium text-xs text-ink">{a.action}</span>,
    },
    {
      header: 'Phân Hệ',
      accessorKey: 'module',
      cell: (a) => <span className="text-xs text-muted">{a.module}</span>,
    },
    {
      header: 'Chi Tiết & Ghi Chú',
      accessorKey: 'details',
      cell: (a) => <span className="text-xs text-body line-clamp-1">{a.details}</span>,
    },
    {
      header: 'Trạng Thái',
      cell: (a) => <AppBadge variant={a.status === 'success' ? 'active' : 'warning'}>{a.status}</AppBadge>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Phân Hệ Quản Trị Hệ Thống (SYS)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Quản Trị Phân Quyền & Cấu Hình</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Bell className="w-4 h-4" />}
            onClick={() => setIsBroadcastModalOpen(true)}
          >
            Phát thông báo toàn công ty
          </AppButton>
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'rbac', label: 'Ma Trận Phân Quyền RBAC', icon: <Shield className="w-4 h-4" /> },
          { id: 'users', label: 'Tài Khoản Người Dùng', count: allUsers.length, icon: <Users className="w-4 h-4" /> },
          { id: 'settings', label: 'Tham Số Cấu Hình Toàn Cục', icon: <Sliders className="w-4 h-4" /> },
          { id: 'audit', label: 'Nhật Ký Kiểm Toán (Audit Logs)', count: auditLogs.length, icon: <FileText className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: RBAC Matrix */}
      {activeTab === 'rbac' && (
        <AppCard className="p-0 overflow-hidden">
          <div className="p-5 border-b border-hairline flex items-center justify-between bg-canvas-soft/40">
            <div>
              <h2 className="font-display text-xl font-light text-ink">Ma Trận Quyền Hạn (Role-Based Access Control)</h2>
              <p className="text-xs text-muted">Nhấp vào từng ô để bật/tắt quyền thao tác của từng vai trò</p>
            </div>
            <AppButton size="sm" variant="outline" onClick={() => alert('Đã lưu cấu hình phân quyền RBAC thành công!')}>
              Lưu Cấu Hình
            </AppButton>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-canvas-soft border-b border-hairline text-muted uppercase tracking-wider font-semibold">
                  <th className="px-4 py-3">Phân Hệ Nghiệp Vụ</th>
                  <th className="px-3 py-3 text-center border-l border-hairline">Admin</th>
                  <th className="px-3 py-3 text-center border-l border-hairline">HR Staff</th>
                  <th className="px-3 py-3 text-center border-l border-hairline">Manager</th>
                  <th className="px-3 py-3 text-center border-l border-hairline">Employee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {rbacMatrix.map((row) => (
                  <tr key={row.moduleCode} className="hover:bg-canvas-soft/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-ink">
                      {row.moduleName} <span className="text-muted font-mono font-normal">({row.moduleCode})</span>
                    </td>

                    {/* Admin */}
                    <td className="px-3 py-3 border-l border-hairline text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                          Toàn quyền
                        </span>
                      </div>
                    </td>

                    {/* HR */}
                    <td className="px-3 py-3 border-l border-hairline text-center">
                      <div className="flex items-center justify-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.hr.read}
                            onChange={() => handleToggleRbac(row.moduleCode, 'hr', 'read')}
                            className="w-3.5 h-3.5 text-primary rounded"
                          />
                          <span className="text-[10px]">Đọc</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.hr.write}
                            onChange={() => handleToggleRbac(row.moduleCode, 'hr', 'write')}
                            className="w-3.5 h-3.5 text-primary rounded"
                          />
                          <span className="text-[10px]">Ghi</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.hr.approve}
                            onChange={() => handleToggleRbac(row.moduleCode, 'hr', 'approve')}
                            className="w-3.5 h-3.5 text-primary rounded"
                          />
                          <span className="text-[10px]">Duyệt</span>
                        </label>
                      </div>
                    </td>

                    {/* Manager */}
                    <td className="px-3 py-3 border-l border-hairline text-center">
                      <div className="flex items-center justify-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.manager.read}
                            onChange={() => handleToggleRbac(row.moduleCode, 'manager', 'read')}
                            className="w-3.5 h-3.5 text-primary rounded"
                          />
                          <span className="text-[10px]">Đọc</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.manager.approve}
                            onChange={() => handleToggleRbac(row.moduleCode, 'manager', 'approve')}
                            className="w-3.5 h-3.5 text-primary rounded"
                          />
                          <span className="text-[10px]">Duyệt</span>
                        </label>
                      </div>
                    </td>

                    {/* Employee */}
                    <td className="px-3 py-3 border-l border-hairline text-center">
                      <div className="flex items-center justify-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.employee.read}
                            onChange={() => handleToggleRbac(row.moduleCode, 'employee', 'read')}
                            className="w-3.5 h-3.5 text-primary rounded"
                          />
                          <span className="text-[10px]">Tự phục vụ</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppCard>
      )}

      {/* Tab 2: Users */}
      {activeTab === 'users' && (
        <AppTable
          columns={userColumns}
          data={allUsers}
          keyExtractor={(u) => u.id}
          totalItems={allUsers.length}
        />
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <AppCard className="p-6 sm:p-8 space-y-6 max-w-4xl">
          <h2 className="font-display text-xl font-light text-ink mb-1">Cấu Hình Thông Số Toàn Hệ Thống</h2>
          <p className="text-xs text-muted mb-4">Các tham số toàn cục áp dụng cho toàn bộ quy trình nghiệp vụ HRM</p>

          <div className="space-y-4">
            {params.map((param) => (
              <div key={param.key} className="p-4 rounded-xl bg-canvas-soft border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink text-sm">{param.name}</span>
                    <AppBadge variant="info">{param.category}</AppBadge>
                  </div>
                  <p className="text-muted mt-0.5">{param.description}</p>
                  <span className="font-mono text-[10px] text-muted-soft">{param.key}</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setParams(params.map((p) => (p.key === param.key ? { ...p, value: val } : p)));
                    }}
                    className="w-24 h-9 px-3 bg-surface-card border border-hairline-strong rounded-lg font-mono font-bold text-ink text-center"
                  />
                  <AppButton size="sm" variant="outline" onClick={() => alert(`Đã cập nhật ${param.name}`)}>
                    Lưu
                  </AppButton>
                </div>
              </div>
            ))}
          </div>
        </AppCard>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'audit' && (
        <AppTable
          columns={auditColumns}
          data={auditLogs}
          keyExtractor={(a) => a.id}
          totalItems={auditLogs.length}
        />
      )}

      {/* Broadcast Modal */}
      <AppModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        title="Phát Thông Báo Toàn Công Ty"
        subtitle="Thông báo sẽ được gửi tức thời đến toàn bộ 184 cán bộ nhân viên."
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsBroadcastModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton
              variant="primary"
              onClick={() => {
                alert('Đã gửi thông báo phát thanh tới toàn bộ nhân viên!');
                setIsBroadcastModalOpen(false);
                setBroadcastMessage('');
              }}
            >
              Gửi Thông Báo
            </AppButton>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-sm font-medium text-body-strong mb-1 block">Nội dung thông báo phát thanh</label>
            <textarea
              rows={4}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Nhập thông điệp gửi tới toàn thể công ty..."
              className="w-full p-3 bg-surface-card border border-hairline-strong rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
            />
          </div>
        </div>
      </AppModal>
    </div>
  );
};
