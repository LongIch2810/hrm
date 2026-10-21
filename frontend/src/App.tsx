import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './shared/components/layout/AppShell';

// Auth Pages
import { LoginPage } from './features/auth/LoginPage';
import { FirstTimePasswordPage } from './features/auth/FirstTimePasswordPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './features/auth/ResetPasswordPage';
import { Forbidden403Page } from './features/auth/Forbidden403Page';
import { NotFound404Page } from './features/auth/NotFound404Page';

// Feature Pages
import { DashboardRouter } from './features/dashboards/DashboardRouter';
import { AdminDashboard } from './features/dashboards/AdminDashboard';
import { HrDashboard } from './features/dashboards/HrDashboard';
import { ManagerDashboard } from './features/dashboards/ManagerDashboard';
import { EmployeePortal } from './features/dashboards/EmployeePortal';

import { UserProfilePage } from './features/profile/UserProfilePage';
import { NotificationCenterPage } from './features/profile/NotificationCenterPage';

import { EmployeeListPage } from './features/employees/EmployeeListPage';
import { EmployeeFormPage } from './features/employees/EmployeeFormPage';
import { EmployeeDetailPage } from './features/employees/EmployeeDetailPage';

import { DepartmentPage } from './features/departments/DepartmentPage';
import { AttendancePage } from './features/attendance/AttendancePage';
import { LeaveManagementPage } from './features/leaves/LeaveManagementPage';
import { PayrollPage } from './features/payroll/PayrollPage';
import { RecruitmentPage } from './features/recruitment/RecruitmentPage';
import { OnboardingPage } from './features/onboarding/OnboardingPage';
import { PerformancePage } from './features/performance/PerformancePage';
import { ContractPage } from './features/contracts/ContractPage';
import { TrainingPage } from './features/training/TrainingPage';
import { ReportsPage } from './features/reports/ReportsPage';
import { AdminPage } from './features/admin/AdminPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth & Error Pages outside AppShell */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/first-time-password" element={<FirstTimePasswordPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/403" element={<Forbidden403Page />} />
        <Route path="/404" element={<NotFound404Page />} />

        {/* Protected App Routes inside AppShell */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboards */}
          <Route path="dashboard" element={<DashboardRouter />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="hr/dashboard" element={<HrDashboard />} />
          <Route path="manager/dashboard" element={<ManagerDashboard />} />
          <Route path="portal/dashboard" element={<EmployeePortal />} />

          {/* Profile & Notifications */}
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="notifications" element={<NotificationCenterPage />} />

          {/* Employees */}
          <Route path="employees" element={<EmployeeListPage />} />
          <Route path="employees/new" element={<EmployeeFormPage />} />
          <Route path="employees/:id" element={<EmployeeDetailPage />} />

          {/* Modules */}
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leaves" element={<LeaveManagementPage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="recruitment" element={<RecruitmentPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="contracts" element={<ContractPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
