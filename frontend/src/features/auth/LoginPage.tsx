import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';
import { useMock } from '../../mock/MockContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchUserRole } = useMock();
  const [email, setEmail] = useState('admin@hrm.company.vn');
  const [password, setPassword] = useState('Admin@123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [isLockedDemo, setIsLockedDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorBanner(null);

    setTimeout(() => {
      setIsLoading(false);
      // Demo routing based on email
      if (email.includes('admin')) {
        switchUserRole('ADMIN');
      } else if (email.includes('thao')) {
        switchUserRole('HR');
      } else if (email.includes('nam')) {
        switchUserRole('MANAGER');
      } else {
        switchUserRole('EMPLOYEE');
      }
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-canvas">
      {/* Left Column (Desktop 50% split with atmospheric mint-peach orb) */}
      <div className="hidden md:flex md:w-1/2 bg-orb-mint-peach border-r border-hairline p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
            HR
          </div>
          <div>
            <span className="font-display text-2xl font-light text-ink tracking-tight">HRM Platform</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-soft block">Enterprise</span>
          </div>
        </div>

        {/* Editorial Headline */}
        <div className="my-auto max-w-lg space-y-6">
          <h1 className="font-display text-4xl lg:text-5xl font-light text-ink leading-tight">
            Quản trị Vòng đời Nhân sự & Tự phục vụ Toàn diện
          </h1>
          <p className="text-body text-base lg:text-lg leading-relaxed">
            Hệ thống chuẩn mực cho doanh nghiệp Việt Nam: Chấm công, Nghỉ phép, Tiền lương và Tuyển dụng với độ chính xác cao nhất.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 text-sm text-body">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Chấm công thời gian thực & Phê duyệt đơn 1 chạm</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-body">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Bảo mật dữ liệu nhân sự đa cấp độ & Ma trận RBAC</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-body">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Tối ưu hóa hiển thị di động cho toàn bộ nhân viên</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-muted">
          © 2026 HRM Enterprise System. Tiêu chuẩn bảo mật ISO/IEC 27001.
        </div>
      </div>

      {/* Right Column (Form card) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-surface-card rounded-2xl border border-hairline p-8 sm:p-10 shadow-subtle">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">
              HR
            </div>
            <span className="font-display text-xl font-light text-ink">HRM Platform</span>
          </div>

          <div className="mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">Đăng nhập</h2>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Nhập email công ty và mật khẩu được cấp để truy cập.
            </p>
          </div>

          {/* Brute-force locked state banner demo trigger */}
          {isLockedDemo && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Tài khoản tạm thời bị khóa 15 phút</p>
                <p className="mt-0.5">
                  Bạn đã nhập sai mật khẩu 5 lần liên tiếp. Vui lòng thử lại sau 14:59 hoặc liên hệ IT Administrator.
                </p>
              </div>
            </div>
          )}

          {errorBanner && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorBanner}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AppInput
              label="Email công ty"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ten.nv@hrm.company.vn"
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <AppInput
              label="Mật khẩu"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-body">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-hairline-strong text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>

              <Link
                to="/auth/forgot-password"
                className="text-muted hover:text-ink transition-colors font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <AppButton
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-4"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? 'Đang xác thực...' : 'Đăng nhập vào hệ thống'}
            </AppButton>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-8 pt-6 border-t border-hairline">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
              Chọn nhanh tài khoản mẫu:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@hrm.company.vn');
                  setPassword('Admin@123456');
                }}
                className="p-2 rounded-lg bg-canvas-soft hover:bg-surface-strong text-left border border-hairline cursor-pointer"
              >
                <div className="font-semibold text-ink">Admin</div>
                <div className="text-[10px] text-muted">admin@hrm...</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('thao.tran@hrm.company.vn');
                  setPassword('Thao@123456');
                }}
                className="p-2 rounded-lg bg-canvas-soft hover:bg-surface-strong text-left border border-hairline cursor-pointer"
              >
                <div className="font-semibold text-ink">HR Specialist</div>
                <div className="text-[10px] text-muted">thao.tran@hrm...</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('nam.le@hrm.company.vn');
                  setPassword('Nam@123456');
                }}
                className="p-2 rounded-lg bg-canvas-soft hover:bg-surface-strong text-left border border-hairline cursor-pointer"
              >
                <div className="font-semibold text-ink">Trưởng Phòng</div>
                <div className="text-[10px] text-muted">nam.le@hrm...</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('a.pham@hrm.company.vn');
                  setPassword('PhamA@123456');
                }}
                className="p-2 rounded-lg bg-canvas-soft hover:bg-surface-strong text-left border border-hairline cursor-pointer"
              >
                <div className="font-semibold text-ink">Nhân Viên</div>
                <div className="text-[10px] text-muted">a.pham@hrm...</div>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
              <button
                type="button"
                onClick={() => setIsLockedDemo(!isLockedDemo)}
                className="underline hover:text-red-600 cursor-pointer"
              >
                {isLockedDemo ? 'Tắt demo khóa 15p' : 'Xem thử trạng thái Khóa Brute-force (5 lần sai)'}
              </button>
              <Link to="/auth/first-time-password" className="underline hover:text-ink">
                Đổi pass lần đầu →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
