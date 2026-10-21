import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';

export const Forbidden403Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-canvas text-center">
      <div className="max-w-lg w-full space-y-6">
        <div className="font-display text-8xl sm:text-9xl font-light text-stone-300 dark:text-stone-800 tracking-tighter select-none">
          403
        </div>

        <div className="space-y-2 -mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Quyền Truy Cập Bị Từ Chối</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-ink">
            Khu vực hạn chế phân quyền
          </h1>
          <p className="text-body text-sm leading-relaxed max-w-md mx-auto">
            Tài khoản của bạn không có quyền thực hiện thao tác này hoặc tài nguyên này thuộc phạm vi phòng ban khác. Nếu bạn cho rằng đây là sự nhầm lẫn, vui lòng liên hệ Quản trị viên hệ thống.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <AppButton
            variant="outline"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Quay lại trang trước
          </AppButton>
          <AppButton
            variant="primary"
            onClick={() => navigate('/dashboard')}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Về Bảng điều khiển
          </AppButton>
        </div>
      </div>
    </div>
  );
};
