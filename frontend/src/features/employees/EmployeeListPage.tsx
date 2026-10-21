import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Download, Filter, MoreHorizontal, Eye, Edit, Shield } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppTable, Column } from '../../shared/components/ui/AppTable';
import { AppSelect } from '../../shared/components/ui/AppSelect';
import { useMock } from '../../mock/MockContext';
import { Employee } from '../../mock/mockEmployees';

export const EmployeeListPage: React.FC = () => {
  const { employees, departments } = useMock();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Filter logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm);

    const matchesDept = selectedDept === 'ALL' || emp.departmentId === selectedDept;
    const matchesStatus = selectedStatus === 'ALL' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const columns: Column<Employee>[] = [
    {
      header: 'Mã NV',
      accessorKey: 'code',
      cell: (emp) => <span className="font-mono font-semibold text-ink text-xs">{emp.code}</span>,
    },
    {
      header: 'Nhân Viên',
      cell: (emp) => (
        <div className="flex items-center gap-3">
          <img src={emp.avatarUrl} alt={emp.fullName} className="w-9 h-9 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <div className="font-semibold text-ink text-sm truncate">{emp.fullName}</div>
            <div className="text-xs text-muted truncate">{emp.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Phòng Ban',
      accessorKey: 'departmentName',
      cell: (emp) => <span className="text-xs text-body">{emp.departmentName}</span>,
    },
    {
      header: 'Chức Vụ',
      accessorKey: 'position',
      cell: (emp) => <span className="text-xs text-body font-medium">{emp.position}</span>,
    },
    {
      header: 'Ngày Vào Làm',
      accessorKey: 'joinDate',
      cell: (emp) => <span className="text-xs text-muted">{emp.joinDate}</span>,
    },
    {
      header: 'Trạng Thái',
      cell: (emp) => {
        const labels: Record<string, string> = {
          active: 'Đang làm việc',
          probation: 'Thử việc',
          onleave: 'Nghỉ phép',
          terminated: 'Đã thôi việc',
        };
        return <AppBadge variant={emp.status}>{labels[emp.status] || emp.status}</AppBadge>;
      },
    },
    {
      header: 'Thao Tác',
      align: 'right',
      cell: (emp) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => navigate(`/employees/${emp.id}`)}
            className="p-1.5 text-muted hover:text-ink hover:bg-surface-strong rounded-full cursor-pointer"
            title="Xem chi tiết"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
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
              Phân Hệ Quản Lý Nhân Sự (EMP)
            </span>
            <AppBadge variant="neutral">{filteredEmployees.length} Nhân Sự</AppBadge>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Danh Sách Nhân Sự</h1>
        </div>

        <div className="flex items-center gap-2.5">
          <AppButton
            variant="outline"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Đang xuất danh sách nhân viên ra tệp Excel (.xlsx)...')}
          >
            Xuất Excel
          </AppButton>
          <Link to="/employees/new">
            <AppButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Thêm nhân viên mới
            </AppButton>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-card p-4 rounded-2xl border border-hairline shadow-subtle grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, mã NV, email, SĐT..."
            className="w-full h-10 pl-9 pr-4 bg-canvas text-xs sm:text-sm rounded-lg border border-hairline focus:outline-none focus:ring-1 focus:ring-ink"
          />
        </div>

        {/* Dept filter */}
        <div className="sm:col-span-4">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full h-10 px-3 bg-canvas text-xs sm:text-sm rounded-lg border border-hairline focus:outline-none focus:ring-1 focus:ring-ink cursor-pointer"
          >
            <option value="ALL">-- Tất cả phòng ban --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full h-10 px-3 bg-canvas text-xs sm:text-sm rounded-lg border border-hairline focus:outline-none focus:ring-1 focus:ring-ink cursor-pointer"
          >
            <option value="ALL">-- Tất cả trạng thái --</option>
            <option value="active">Đang làm việc (Active)</option>
            <option value="probation">Thử việc (Probation)</option>
            <option value="onleave">Nghỉ phép (OnLeave)</option>
            <option value="terminated">Đã thôi việc (Terminated)</option>
          </select>
        </div>
      </div>

      {/* Employee Table with responsive mobile stacked card view */}
      <AppTable
        columns={columns}
        data={filteredEmployees}
        keyExtractor={(emp) => emp.id}
        totalItems={filteredEmployees.length}
        emptyMessage="Không tìm thấy nhân viên nào phù hợp với bộ lọc tìm kiếm."
        mobileCardRender={(emp) => (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={emp.avatarUrl} alt={emp.fullName} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="font-semibold text-ink text-sm">{emp.fullName}</h3>
                  <span className="font-mono text-xs text-muted">{emp.code}</span>
                  <p className="text-xs text-muted mt-0.5">{emp.email}</p>
                </div>
              </div>
              <AppBadge variant={emp.status}>{emp.status}</AppBadge>
            </div>

            <div className="text-xs text-muted space-y-1 pt-2 border-t border-hairline">
              <div className="flex justify-between">
                <span>Phòng ban:</span>
                <span className="font-medium text-ink">{emp.departmentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Chức vụ:</span>
                <span className="font-medium text-ink">{emp.position}</span>
              </div>
              <div className="flex justify-between">
                <span>Ngày vào:</span>
                <span className="text-ink">{emp.joinDate}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/employees/${emp.id}`)}
              className="w-full h-10 rounded-full border border-hairline-strong text-xs font-semibold text-ink hover:bg-surface-strong transition-colors cursor-pointer"
            >
              Xem Chi Tiết Hồ Sơ →
            </button>
          </div>
        )}
      />
    </div>
  );
};
