import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';
import { AppButton } from '../../shared/components/ui/AppButton';

export const NotFound404Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-canvas text-center">
      <div className="max-w-lg w-full space-y-6">
        <div className="font-display text-8xl sm:text-9xl font-light text-stone-300 dark:text-stone-800 tracking-tighter select-none">
          404
        </div>

        <div className="space-y-2 -mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Không Tìm Thấy Trang</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-ink">
            Đường dẫn không tồn tại
          </h1>
          <p className="text-body text-sm leading-relaxed max-w-md mx-auto">
            Địa chỉ bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đã được chuyển sang cấu trúc thư mục mới.
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
