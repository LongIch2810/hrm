import React, { useState } from 'react';
import { useMock } from '../../mock/MockContext';
import { AdminDashboard } from './AdminDashboard';
import { HrDashboard } from './HrDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { EmployeePortal } from './EmployeePortal';
import { AppTabs } from '../../shared/components/ui/AppTabs';

export const DashboardRouter: React.FC = () => {
  const { currentUser } = useMock();
  const [selectedDashboard, setSelectedDashboard] = useState<string>('ROLE_DEFAULT');

  // Match default dashboard to user role
  const activeDashboard =
    selectedDashboard === 'ROLE_DEFAULT' ? currentUser.role : selectedDashboard;

  return (
    <div className="space-y-6">
      {/* Quick Dashboard Viewer Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-card rounded-2xl border border-hairline shadow-xs">
        <span className="text-xs text-muted font-medium px-2">
          Góc nhìn Dashboard hiện tại ({currentUser.role}):
        </span>

        <AppTabs
          activeTab={activeDashboard}
          onChange={(id) => setSelectedDashboard(id)}
          tabs={[
            { id: 'ADMIN', label: 'Admin (Hạ Tầng & Audit)' },
            { id: 'HR', label: 'HR (Quân Số & Tuyển Dụng)' },
            { id: 'MANAGER', label: 'Manager (Phòng Ban & Duyệt Đơn)' },
            { id: 'EMPLOYEE', label: 'Employee Portal (Chấm Công & Phép)' },
          ]}
        />
      </div>

      {/* Render the matching dashboard */}
      {activeDashboard === 'ADMIN' && <AdminDashboard />}
      {activeDashboard === 'HR' && <HrDashboard />}
      {activeDashboard === 'MANAGER' && <ManagerDashboard />}
      {activeDashboard === 'EMPLOYEE' && <EmployeePortal />}
    </div>
  );
};
