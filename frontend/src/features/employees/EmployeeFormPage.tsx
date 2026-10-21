import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, User, Briefcase, FileCheck, ShieldCheck } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppSelect } from '../../shared/components/ui/AppSelect';
import { useMock } from '../../mock/MockContext';

export const EmployeeFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { addEmployee, departments } = useMock();
  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [gender, setGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nam');
  const [cccd, setCccd] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState(departments[1]?.id || 'DEPT_ENG');
  const [position, setPosition] = useState('Kỹ Sư Phần Mềm (Frontend)');
  const [contractType, setContractType] = useState('Thử việc (2 tháng)');
  const [basicSalary, setBasicSalary] = useState(18000000);
  const [startDate, setStartDate] = useState('2026-11-01');

  const selectedDeptObj = departments.find((d) => d.id === departmentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({
      fullName: fullName || 'Nhân Viên Mới',
      avatarUrl:
        gender === 'Nữ'
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@hrm.company.vn`,
      phone: phone || '0901234567',
      cccd: cccd || '001099001234',
      gender,
      birthDate,
      departmentId,
      departmentName: selectedDeptObj?.name || 'Khối Công Nghệ',
      position,
      joinDate: '01/11/2026',
      status: 'probation',
      contractType,
      basicSalary: Number(basicSalary),
      managerName: selectedDeptObj?.managerName || 'Lê Hoàng Nam',
    });

    navigate('/employees');
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
            <h1 className="font-display text-2xl sm:text-3xl font-light text-ink">Thêm Hồ Sơ Nhân Viên Mới</h1>
            <p className="text-xs text-muted">Quy trình nhập liệu 3 bước theo chuẩn master data nhân sự</p>
          </div>
        </div>

        <span className="font-mono text-xs px-3 py-1 bg-surface-card rounded-full border border-hairline text-muted">
          Mã dự kiến: Tự động tăng (EMPxxxx)
        </span>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-surface-card p-4 rounded-2xl border border-hairline shadow-subtle flex items-center justify-around text-xs">
        <button
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            currentStep === 1 ? 'text-ink font-semibold' : 'text-muted'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 1 ? 'bg-primary text-white' : 'bg-stone-200 dark:bg-stone-800'
            }`}
          >
            1
          </span>
          <span>Thông tin cá nhân & CCCD</span>
        </button>

        <span className="h-0.5 w-12 bg-hairline" />

        <button
          onClick={() => setCurrentStep(2)}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            currentStep === 2 ? 'text-ink font-semibold' : 'text-muted'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 2 ? 'bg-primary text-white' : 'bg-stone-200 dark:bg-stone-800'
            }`}
          >
            2
          </span>
          <span>Phân công công tác</span>
        </button>

        <span className="h-0.5 w-12 bg-hairline" />

        <button
          onClick={() => setCurrentStep(3)}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            currentStep === 3 ? 'text-ink font-semibold' : 'text-muted'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 3 ? 'bg-primary text-white' : 'bg-stone-200 dark:bg-stone-800'
            }`}
          >
            3
          </span>
          <span>Tài khoản & Hợp đồng</span>
        </button>
      </div>

      <AppCard className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-light text-ink pb-2 border-b border-hairline">
                Bước 1: Thông Tin Cá Nhân & Định Danh
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppInput
                  label="Họ và tên đầy đủ"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Văn Nam"
                />

                <AppInput
                  label="Ngày sinh"
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />

                <div>
                  <label className="text-sm font-medium text-body-strong mb-1.5 block">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 pt-1">
                    {(['Nam', 'Nữ', 'Khác'] as const).map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === g}
                          onChange={() => setGender(g)}
                          className="w-4 h-4 text-primary"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <AppInput
                  label="Số CCCD / Hộ chiếu (Duy nhất)"
                  required
                  value={cccd}
                  onChange={(e) => setCccd(e.target.value)}
                  placeholder="12 chữ số theo CCCD gắn chip..."
                />

                <AppInput
                  label="Số điện thoại cá nhân"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xxxxxxxx..."
                />

                <AppInput
                  label="Email cá nhân"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email.canhan@gmail.com"
                />
              </div>

              <div className="flex justify-end pt-4">
                <AppButton
                  type="button"
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Tiếp Tục: Phân Công Công Tác
                </AppButton>
              </div>
            </div>
          )}

          {/* Step 2: Work Assignment */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-light text-ink pb-2 border-b border-hairline">
                Bước 2: Phân Công Phòng Ban & Vị Trí
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppSelect
                  label="Phòng ban trực thuộc"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  options={departments.map((d) => ({ value: d.id, label: d.name }))}
                />

                <AppInput
                  label="Chức danh / Vị trí công tác"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Ví dụ: Kỹ Sư Phần Mềm"
                />

                <AppInput
                  label="Người quản lý trực tiếp"
                  value={selectedDeptObj?.managerName || 'Lê Hoàng Nam'}
                  disabled
                  helperText="Tự động đồng bộ theo Trưởng phòng ban đã chọn"
                />

                <AppInput
                  label="Ngày bắt đầu làm việc"
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <AppButton type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  Quay Lại Bước 1
                </AppButton>
                <AppButton
                  type="button"
                  variant="primary"
                  onClick={() => setCurrentStep(3)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Tiếp Tục: Tài Khoản & Hợp Đồng
                </AppButton>
              </div>
            </div>
          )}

          {/* Step 3: Account & Contract */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-light text-ink pb-2 border-b border-hairline">
                Bước 3: Tài Khoản Hệ Thống & Hợp Đồng Ban Đầu
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppSelect
                  label="Loại hợp đồng ban đầu"
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                  options={[
                    { value: 'Thử việc (2 tháng)', label: 'Thử việc (2 tháng)' },
                    { value: 'Xác định thời hạn (1 năm)', label: 'Hợp đồng 1 năm' },
                    { value: 'Xác định thời hạn (3 năm)', label: 'Hợp đồng 3 năm' },
                    { value: 'Không xác định thời hạn', label: 'Không xác định thời hạn' },
                  ]}
                />

                <AppInput
                  label="Mức lương cơ bản thỏa thuận (VNĐ)"
                  type="number"
                  required
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                />
              </div>

              <div className="p-4 rounded-xl bg-canvas-soft border border-hairline space-y-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary rounded mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-ink">
                      Tự động cấp tài khoản và gửi email kích hoạt lần đầu
                    </span>
                    <p className="text-muted mt-0.5">
                      Hệ thống sẽ cấp email dạng <span className="font-mono">ho.ten@hrm.company.vn</span> và mật khẩu tạm thời.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4">
                <AppButton type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                  Quay Lại Bước 2
                </AppButton>
                <AppButton type="submit" variant="primary" leftIcon={<Check className="w-4 h-4" />}>
                  Lưu & Tạo Hồ Sơ Nhân Sự
                </AppButton>
              </div>
            </div>
          )}
        </form>
      </AppCard>
    </div>
  );
};
