import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';

export const FirstTimePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation rules
  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  // Strength score
  const passedCount = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  let strengthLabel = 'Yếu';
  let strengthColor = 'bg-red-500';
  if (passedCount >= 5) {
    strengthLabel = 'Rất mạnh';
    strengthColor = 'bg-emerald-500';
  } else if (passedCount >= 4) {
    strengthLabel = 'Khá mạnh';
    strengthColor = 'bg-blue-500';
  } else if (passedCount >= 3) {
    strengthLabel = 'Trung bình';
    strengthColor = 'bg-amber-500';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passedCount < 4 || !isMatch) return;
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-canvas">
      <div className="w-full max-w-lg bg-surface-card rounded-2xl border border-hairline p-8 sm:p-10 shadow-subtle">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
            Kích Hoạt Tài Khoản & Đổi Mật Khẩu
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-md mx-auto">
            Đây là lần đầu tiên bạn đăng nhập vào hệ thống HRM. Vui lòng đổi mật khẩu tạm thời thành mật khẩu cá nhân mới để kích hoạt bảo mật.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <h3 className="font-semibold text-emerald-800 text-base">Đổi mật khẩu thành công!</h3>
            <p className="text-xs text-emerald-700">Đang chuyển hướng vào hệ thống làm việc...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AppInput
              label="Mật khẩu tạm thời (nhận qua email)"
              type="password"
              required
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Nhập mật khẩu tạm thời..."
            />

            <div>
              <AppInput
                label="Mật khẩu cá nhân mới"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự..."
              />

              {/* Password strength meter */}
              {newPassword && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Độ mạnh mật khẩu:</span>
                    <span className="font-semibold text-ink">{strengthLabel}</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strengthColor} transition-all duration-300`}
                      style={{ width: `${(passedCount / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Checklist */}
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline space-y-2 text-xs">
              <p className="font-semibold text-ink mb-1">Quy định mật khẩu an toàn:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className={`flex items-center gap-2 ${hasMinLength ? 'text-emerald-700 font-medium' : 'text-muted'}`}>
                  {hasMinLength ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Ít nhất 8 ký tự</span>
                </div>
                <div className={`flex items-center gap-2 ${hasUpper ? 'text-emerald-700 font-medium' : 'text-muted'}`}>
                  {hasUpper ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Chứa chữ in hoa (A-Z)</span>
                </div>
                <div className={`flex items-center gap-2 ${hasLower ? 'text-emerald-700 font-medium' : 'text-muted'}`}>
                  {hasLower ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Chứa chữ thường (a-z)</span>
                </div>
                <div className={`flex items-center gap-2 ${hasNumber ? 'text-emerald-700 font-medium' : 'text-muted'}`}>
                  {hasNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Chứa chữ số (0-9)</span>
                </div>
                <div className={`flex items-center gap-2 ${hasSpecial ? 'text-emerald-700 font-medium' : 'text-muted'}`}>
                  {hasSpecial ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Ký tự đặc biệt (@, #, $...)</span>
                </div>
              </div>
            </div>

            <AppInput
              label="Xác nhận mật khẩu mới"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới..."
              errorMessage={confirmPassword && !isMatch ? 'Mật khẩu xác nhận không trùng khớp' : undefined}
            />

            <AppButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={passedCount < 4 || !isMatch}
              className="w-full mt-4"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Kích Hoạt & Vào Hệ Thống
            </AppButton>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-muted hover:text-ink">
                ← Quay lại trang đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
