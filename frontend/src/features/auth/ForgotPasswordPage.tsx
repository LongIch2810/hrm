import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';
import { AppInput } from '../../shared/components/ui/AppInput';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-canvas">
      <div className="w-full max-w-md bg-surface-card rounded-2xl border border-hairline p-8 sm:p-10 shadow-subtle">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-ink">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">Quên Mật Khẩu</h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Nhập email công ty đã đăng ký. Hệ thống sẽ gửi đường dẫn an toàn để bạn đặt lại mật khẩu mới.
          </p>
        </div>

        {isSent ? (
          <div className="text-center space-y-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-semibold text-emerald-800 text-sm">Đã gửi email khôi phục</h3>
              <p className="text-xs text-emerald-700 mt-1">
                Vui lòng kiểm tra hòm thư <span className="font-semibold">{email}</span> để nhận hướng dẫn. Đường dẫn có hiệu lực trong 15 phút.
              </p>
            </div>
            <Link to="/login">
              <AppButton variant="outline" className="w-full">
                Quay lại Đăng nhập
              </AppButton>
            </Link>
          </div>
        ) : (
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

            <AppButton
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Gửi Đường Dẫn Đặt Lại
            </AppButton>

            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại Đăng nhập</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
