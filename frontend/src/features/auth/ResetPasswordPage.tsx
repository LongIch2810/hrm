import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-canvas">
      <div className="w-full max-w-md bg-surface-card rounded-2xl border border-hairline p-8 sm:p-10 shadow-subtle">
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">Đặt Lại Mật Khẩu</h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-semibold text-emerald-800 text-sm">Đặt lại mật khẩu thành công!</h3>
            <p className="text-xs text-emerald-700">Đang chuyển về trang đăng nhập...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AppInput
              label="Mật khẩu mới"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tối thiểu 8 ký tự..."
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <AppInput
              label="Xác nhận mật khẩu mới"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu..."
              errorMessage={confirmPassword && password !== confirmPassword ? 'Mật khẩu không khớp' : undefined}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <AppButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={!password || password !== confirmPassword}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Lưu Mật Khẩu Mới
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
