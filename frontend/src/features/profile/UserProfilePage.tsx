import React, { useState } from 'react';
import { User, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { useMock } from '../../mock/MockContext';

export const UserProfilePage: React.FC = () => {
  const { currentUser } = useMock();
  const [activeTab, setActiveTab] = useState('personal');
  const [phone, setPhone] = useState('0977112233');
  const [address, setAddress] = useState('Tòa nhà Landmark 72, Nam Từ Liêm, Hà Nội');
  const [isSaved, setIsSaved] = useState(false);

  // Password change states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passSaved, setPassSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass && newPass === confirmPass) {
      setPassSaved(true);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setPassSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Profile Card */}
      <AppCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-hairline shadow-subtle"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-2xl sm:text-3xl font-light text-ink">
                  {currentUser.name}
                </h1>
                <AppBadge variant="active">{currentUser.role}</AppBadge>
              </div>
              <p className="text-sm text-body">{currentUser.position}</p>
              <p className="text-xs text-muted">
                Mã NV: <span className="font-mono font-semibold text-ink">{currentUser.code}</span> · {currentUser.departmentName}
              </p>
            </div>
          </div>

          <div className="text-xs text-muted">
            <span className="block">Trạng thái tài khoản:</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đang hoạt động (Active)
            </span>
          </div>
        </div>
      </AppCard>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'personal', label: 'Thông Tin Cá Nhân & Liên Hệ', icon: <User className="w-4 h-4" /> },
          { id: 'work', label: 'Công Tác & Hợp Đồng', icon: <FileText className="w-4 h-4" /> },
          { id: 'security', label: 'Bảo Mật & Mật Khẩu', icon: <Shield className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: Personal Info */}
      {activeTab === 'personal' && (
        <AppCard className="p-6 sm:p-8">
          <h2 className="font-display text-xl font-light text-ink mb-1">Hồ Sơ Cá Nhân</h2>
          <p className="text-xs text-muted mb-6">Thông tin liên hệ và giấy tờ tùy thân theo hồ sơ nhân sự</p>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AppInput label="Họ và tên đầy đủ" value={currentUser.name} disabled />
              <AppInput label="Email công ty" value={currentUser.email} disabled />
              <AppInput
                label="Số điện thoại cá nhân"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <AppInput label="Số CCCD / Hộ chiếu" value="014094008921" disabled />
            </div>

            <AppInput
              label="Địa chỉ thường trú"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {isSaved && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Cập nhật thông tin thành công!
              </p>
            )}

            <div className="pt-2">
              <AppButton type="submit" variant="primary">
                Lưu Thay Đổi
              </AppButton>
            </div>
          </form>
        </AppCard>
      )}

      {/* Tab 2: Work & Contract */}
      {activeTab === 'work' && (
        <AppCard className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-display text-xl font-light text-ink mb-1">Thông Tin Công Tác</h2>
            <p className="text-xs text-muted">Vị trí, cơ cấu phòng ban và hợp đồng lao động hiện tại</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted block">Phòng ban trực thuộc:</span>
              <span className="font-semibold text-ink text-sm mt-0.5 block">{currentUser.departmentName}</span>
            </div>
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted block">Chức danh / Vị trí:</span>
              <span className="font-semibold text-ink text-sm mt-0.5 block">{currentUser.position}</span>
            </div>
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted block">Người quản lý trực tiếp:</span>
              <span className="font-semibold text-ink text-sm mt-0.5 block">Lê Hoàng Nam (Trưởng Khối)</span>
            </div>
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline">
              <span className="text-muted block">Loại hợp đồng:</span>
              <span className="font-semibold text-ink text-sm mt-0.5 block">Xác định thời hạn (3 năm)</span>
            </div>
          </div>
        </AppCard>
      )}

      {/* Tab 3: Security & Password */}
      {activeTab === 'security' && (
        <AppCard className="p-6 sm:p-8">
          <h2 className="font-display text-xl font-light text-ink mb-1">Đổi Mật Khẩu Cá Nhân</h2>
          <p className="text-xs text-muted mb-6">Mật khẩu mới cần có tối thiểu 8 ký tự, bao gồm số và ký tự đặc biệt</p>

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <AppInput
              label="Mật khẩu hiện tại"
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
            <AppInput
              label="Mật khẩu mới"
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <AppInput
              label="Xác nhận mật khẩu mới"
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              errorMessage={confirmPass && newPass !== confirmPass ? 'Mật khẩu không khớp' : undefined}
            />

            {passSaved && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Đổi mật khẩu thành công!
              </p>
            )}

            <AppButton type="submit" variant="primary" disabled={!newPass || newPass !== confirmPass}>
              Cập Nhật Mật Khẩu
            </AppButton>
          </form>
        </AppCard>
      )}
    </div>
  );
};
