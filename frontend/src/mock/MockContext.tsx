import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrentUser, UserRole } from '../shared/types/common';
import { MOCK_USERS } from './mockUsers';
import { Employee, MOCK_EMPLOYEES } from './mockEmployees';
import { Department, MOCK_DEPARTMENTS, Position, MOCK_POSITIONS } from './mockDepartments';
import { AttendanceToday, INITIAL_TODAY_ATTENDANCE } from './mockAttendance';
import { LeaveBalance, INITIAL_LEAVE_BALANCE, LeaveRequest, MOCK_LEAVE_REQUESTS } from './mockLeaves';
import { Candidate, MOCK_CANDIDATES, CandidateStage } from './mockRecruitment';
import { AuditLogItem, MOCK_AUDIT_LOGS } from './mockAdmin';

interface MockContextType {
  currentUser: CurrentUser;
  switchUserRole: (role: UserRole) => void;
  allUsers: CurrentUser[];

  // Employees
  employees: Employee[];
  addEmployee: (emp: Omit<Employee, 'id' | 'code'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;

  // Departments & Positions
  departments: Department[];
  positions: Position[];

  // Attendance
  todayAttendance: AttendanceToday;
  checkIn: () => void;
  checkOut: () => void;

  // Leaves
  leaveBalance: LeaveBalance;
  leaveRequests: LeaveRequest[];
  createLeaveRequest: (req: { leaveType: string; startDate: string; endDate: string; totalDays: number; reason: string; handoverPerson?: string }) => void;
  approveLeaveRequest: (id: string) => void;
  rejectLeaveRequest: (id: string, reason?: string) => void;
  cancelLeaveRequest: (id: string) => void;

  // Candidates
  candidates: Candidate[];
  moveCandidateStage: (candidateId: string, newStage: CandidateStage) => void;

  // Audit Logs
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, module: string, details: string) => void;

  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Active Screen quick jump (for previewing 68 screens)
  activeQuickScreen: string;
  setActiveQuickScreen: (screenId: string) => void;
}

const MockContext = createContext<MockContextType | undefined>(undefined);

export const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user defaults to Admin (or Employee based on switcher)
  const [currentUser, setCurrentUser] = useState<CurrentUser>(MOCK_USERS[0]);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [positions] = useState<Position[]>(MOCK_POSITIONS);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceToday>(INITIAL_TODAY_ATTENDANCE);
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance>(INITIAL_LEAVE_BALANCE);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(MOCK_AUDIT_LOGS);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeQuickScreen, setActiveQuickScreen] = useState<string>('01_LOGIN');

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return next;
    });
  };

  // Switch role
  const switchUserRole = (role: UserRole) => {
    const found = MOCK_USERS.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
    }
  };

  // Attendance actions
  const checkIn = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setTodayAttendance({
      ...todayAttendance,
      isCheckedIn: true,
      isCheckedOut: false,
      checkInTime: timeStr,
      statusText: `Đúng giờ (Check-in lúc ${timeStr})`,
      statusVariant: 'active',
    });
    addAuditLog('Chấm công Check-in', 'ATT', `${currentUser.name} thực hiện check-in vào ca.`);
  };

  const checkOut = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setTodayAttendance({
      ...todayAttendance,
      isCheckedOut: true,
      checkOutTime: timeStr,
      statusText: `Đã hoàn thành ca làm (Tan ca lúc ${timeStr})`,
      statusVariant: 'info',
    });
    addAuditLog('Chấm công Check-out', 'ATT', `${currentUser.name} thực hiện check-out kết thúc ca.`);
  };

  // Employee actions
  const addEmployee = (empData: Omit<Employee, 'id' | 'code'>) => {
    const nextCodeNum = employees.length + 1;
    const newCode = `EMP${String(nextCodeNum).padStart(4, '0')}`;
    const newEmp: Employee = {
      ...empData,
      id: newCode,
      code: newCode,
    };
    setEmployees([newEmp, ...employees]);
    addAuditLog('Thêm nhân viên mới', 'EMP', `Tạo hồ sơ cho ${newEmp.fullName} (${newEmp.code}).`);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    addAuditLog('Cập nhật nhân sự', 'EMP', `Cập nhật thông tin nhân viên ${id}.`);
  };

  // Leave actions
  const createLeaveRequest = (req: {
    leaveType: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    reason: string;
    handoverPerson?: string;
  }) => {
    const newCode = `LV2026-${String(leaveRequests.length + 45).padStart(4, '0')}`;
    const newReq: LeaveRequest = {
      id: newCode,
      code: newCode,
      employeeId: currentUser.code,
      employeeName: currentUser.name,
      employeeAvatar: currentUser.avatarUrl || '',
      departmentName: currentUser.departmentName,
      leaveType: req.leaveType as any,
      startDate: req.startDate,
      endDate: req.endDate,
      totalDays: req.totalDays,
      reason: req.reason,
      handoverPerson: req.handoverPerson,
      approverName: 'Lê Hoàng Nam',
      status: 'pending',
      canCancel: true,
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };
    setLeaveRequests([newReq, ...leaveRequests]);
    addAuditLog('Tạo đơn nghỉ phép', 'LEAVE', `Nhân viên ${currentUser.name} nộp đơn ${newCode}.`);
  };

  const approveLeaveRequest = (id: string) => {
    setLeaveRequests(
      leaveRequests.map((r) => {
        if (r.id === id) {
          // Deduct from balance
          setLeaveBalance((prev) => ({
            ...prev,
            usedDays: prev.usedDays + r.totalDays,
            availableDays: Math.max(0, prev.availableDays - r.totalDays),
          }));
          return { ...r, status: 'approved' };
        }
        return r;
      })
    );
    addAuditLog('Phê duyệt đơn nghỉ phép', 'LEAVE', `Phê duyệt thành công đơn ${id}.`);
  };

  const rejectLeaveRequest = (id: string, reason?: string) => {
    setLeaveRequests(
      leaveRequests.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    addAuditLog('Từ chối đơn nghỉ phép', 'LEAVE', `Từ chối đơn ${id}. Lý do: ${reason || 'Không phù hợp'}.`);
  };

  const cancelLeaveRequest = (id: string) => {
    setLeaveRequests(
      leaveRequests.map((r) => {
        if (r.id === id) {
          // Refund days
          if (r.status === 'approved') {
            setLeaveBalance((prev) => ({
              ...prev,
              usedDays: Math.max(0, prev.usedDays - r.totalDays),
              availableDays: prev.availableDays + r.totalDays,
            }));
          }
          return { ...r, status: 'rejected', canCancel: false };
        }
        return r;
      })
    );
    addAuditLog('Hủy đơn nghỉ phép', 'LEAVE', `Hủy và hoàn lại ngày phép cho đơn ${id}.`);
  };

  // Candidates actions
  const moveCandidateStage = (candidateId: string, newStage: CandidateStage) => {
    setCandidates(
      candidates.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
    addAuditLog('Chuyển giai đoạn ứng viên', 'REC', `Chuyển ứng viên ${candidateId} sang ${newStage}.`);
  };

  // Audit Log actions
  const addAuditLog = (action: string, module: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `AUD${Date.now().toString().slice(-4)}`,
      actorName: currentUser.name,
      actorEmail: currentUser.email,
      action,
      module,
      ipAddress: '192.168.1.100',
      timestamp: new Date().toLocaleString('vi-VN'),
      status: 'success',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 40)]);
  };

  return (
    <MockContext.Provider
      value={{
        currentUser,
        switchUserRole,
        allUsers: MOCK_USERS,
        employees,
        addEmployee,
        updateEmployee,
        departments,
        positions,
        todayAttendance,
        checkIn,
        checkOut,
        leaveBalance,
        leaveRequests,
        createLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        cancelLeaveRequest,
        candidates,
        moveCandidateStage,
        auditLogs,
        addAuditLog,
        isDark,
        toggleTheme,
        activeQuickScreen,
        setActiveQuickScreen,
      }}
    >
      {children}
    </MockContext.Provider>
  );
};

export const useMock = () => {
  const context = useContext(MockContext);
  if (!context) {
    throw new Error('useMock must be used within a MockProvider');
  }
  return context;
};
