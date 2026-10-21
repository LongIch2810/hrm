import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, ShieldAlert, CheckCircle2, User, FileText, Phone, Mail, Building2, Calendar } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppModal } from '../../shared/components/ui/AppModal';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppSelect } from '../../shared/components/ui/AppSelect';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { useMock } from '../../mock/MockContext';

export const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useMock();

  // Find employee by ID or default to EMP0004
  const emp = employees.find((e) => e.id === id) || employees[3];

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Edit fields
  const [phone, setPhone] = useState(emp.phone);
  const [position, setPosition] = useState(emp.position);
  const [newStatus, setNewStatus] = useState(emp.status);

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee(emp.id, { phone, position });
    setIsEditModalOpen(false);
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee(emp.id, { status: newStatus as any });
    setIsStatusModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/employees"
            className="p-2 text-muted hover:text-ink rounded-full hover:bg-surface-strong cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-light text-ink">
              Hồ Sơ Nhân Sự: {emp.fullName}
            </h1>
            <p className="text-xs text-muted">
              Mã NV: <span className="font-mono font-semibold text-ink">{emp.code}</span> · {emp.departmentName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AppButton
            variant="outline"
            size="sm"
            onClick={() => setIsStatusModalOpen(true)}
          >
            Đổi trạng thái
          </AppButton>
          <AppButton
            variant="primary"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            leftIcon={<Edit3 className="w-4 h-4" />}
          >
            Chỉnh sửa
          </AppButton>
        </div>
      </div>

      {/* Hero Profile Card */}
      <AppCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={emp.avatarUrl}
              alt={emp.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-hairline shadow-subtle"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-2xl font-light text-ink">{emp.fullName}</h2>
                <AppBadge variant={emp.status}>{emp.status}</AppBadge>
              </div>
              <p className="text-sm font-medium text-body">{emp.position}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {emp.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {emp.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline text-xs space-y-1">
            <span className="text-muted block">Ngày vào làm chính thức:</span>
            <span className="font-semibold text-ink block">{emp.joinDate}</span>
            <span className="text-muted-soft block">Quản lý: {emp.managerName}</span>
          </div>
        </div>
      </AppCard>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'profile', label: 'Thông Tin Lý Lịch & Định Danh' },
          { id: 'contract', label: 'Hợp Đồng & Chế Độ Lương' },
          { id: 'timeline', label: 'Lịch Sử Công Tác & Đánh Giá' },
        ]}
      />

      {/* Tab 1: Profile & Identity */}
      {activeTab === 'profile' && (
        <AppCard className="p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-xl font-light text-ink pb-2 border-b border-hairline">
            Dữ Liệu Cá Nhân & Thẻ Căn Cước
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted">Số Căn cước công dân (CCCD):</span>
              <p className="font-mono font-semibold text-ink text-sm mt-0.5">{emp.cccd}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted">Ngày sinh & Giới tính:</span>
              <p className="font-semibold text-ink text-sm mt-0.5">{emp.birthDate} · {emp.gender}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted">Số điện thoại liên lạc:</span>
              <p className="font-semibold text-ink text-sm mt-0.5">{emp.phone}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted">Email công ty:</span>
              <p className="font-semibold text-ink text-sm mt-0.5">{emp.email}</p>
            </div>
          </div>
        </AppCard>
      )}

      {/* Tab 2: Contract & Salary */}
      {activeTab === 'contract' && (
        <AppCard className="p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-xl font-light text-ink pb-2 border-b border-hairline">
            Hợp Đồng Lao Động & Chế Độ Đãi Ngộ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted">Loại hợp đồng:</span>
              <p className="font-semibold text-ink text-sm mt-0.5">{emp.contractType}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted">Lương cơ bản đóng BHXH:</span>
              <p className="font-semibold text-ink text-sm mt-0.5">
                {emp.basicSalary.toLocaleString('vi-VN')} VNĐ/tháng
              </p>
            </div>
          </div>
        </AppCard>
      )}

      {/* Tab 3: Timeline */}
      {activeTab === 'timeline' && (
        <AppCard className="p-6 sm:p-8 space-y-4">
          <h3 className="font-display text-xl font-light text-ink pb-2 border-b border-hairline">
            Lịch Sử Thay Đổi Nhân Sự
          </h3>

          <div className="space-y-4 text-xs pl-2 border-l-2 border-hairline-strong ml-2">
            <div className="relative pl-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[21px] top-1" />
              <p className="font-semibold text-ink">{emp.joinDate} — Tiếp nhận chính thức</p>
              <p className="text-muted mt-0.5">Ký kết hợp đồng lao động tại {emp.departmentName}.</p>
            </div>
            <div className="relative pl-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute -left-[21px] top-1" />
              <p className="font-semibold text-ink">01/01/2026 — Đánh giá định kỳ Quý 4</p>
              <p className="text-muted mt-0.5">Đạt xếp loại A (Xuất sắc) và điều chỉnh lương năng suất.</p>
            </div>
          </div>
        </AppCard>
      )}

      {/* Edit Modal */}
      <AppModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Chỉnh Sửa Thông Tin Nhân Viên"
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton variant="primary" onClick={handleUpdateInfo}>
              Lưu Cập Nhật
            </AppButton>
          </>
        }
      >
        <form onSubmit={handleUpdateInfo} className="space-y-4">
          <AppInput
            label="Chức danh / Vị trí"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <AppInput
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </form>
      </AppModal>

      {/* Status Modal */}
      <AppModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Thay Đổi Trạng Thái Làm Việc"
        footer={
          <>
            <AppButton variant="outline" onClick={() => setIsStatusModalOpen(false)}>
              Hủy
            </AppButton>
            <AppButton variant="primary" onClick={handleUpdateStatus}>
              Xác Nhận Đổi Trạng Thái
            </AppButton>
          </>
        }
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <AppSelect
            label="Trạng thái mới"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as any)}
            options={[
              { value: 'active', label: 'Đang làm việc (Active)' },
              { value: 'probation', label: 'Thử việc (Probation)' },
              { value: 'onleave', label: 'Nghỉ phép tạm thời (OnLeave)' },
              { value: 'terminated', label: 'Đã thôi việc / Chấm dứt HĐ (Terminated)' },
            ]}
          />
        </form>
      </AppModal>
    </div>
  );
};
