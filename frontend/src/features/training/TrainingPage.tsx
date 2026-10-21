import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, Users, Clock, CheckCircle2, Plus } from 'lucide-react';
import { AppCard } from '../../shared/components/ui/AppCard';
import { AppTabs } from '../../shared/components/ui/AppTabs';
import { AppBadge } from '../../shared/components/ui/AppBadge';
import { AppButton } from '../../shared/components/ui/AppButton';
import { MOCK_TRAINING_COURSES, MOCK_MY_CERTIFICATES, TrainingCourse } from '../../mock/mockTraining';

export const TrainingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Phân Hệ Quản Lý Đào Tạo (TRAIN)
            </span>
          </div>
          <h1 className="font-display text-3xl font-light text-ink">Chương Trình Đào Tạo & Chứng Chỉ</h1>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => alert('Mở form tạo khóa đào tạo mới...')}
          >
            Tạo khóa học mới
          </AppButton>
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'courses', label: 'Danh Mục Khóa Học Toàn Công Ty', count: MOCK_TRAINING_COURSES.length, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'my-training', label: 'Khóa Học & Chứng Chỉ Của Tôi', count: MOCK_MY_CERTIFICATES.length, icon: <Award className="w-4 h-4" /> },
        ]}
      />

      {/* Tab 1: Courses Catalog */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TRAINING_COURSES.map((course) => (
            <AppCard key={course.id} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    {course.category}
                  </span>
                  <AppBadge
                    variant={
                      course.status === 'completed'
                        ? 'active'
                        : course.status === 'in_progress'
                        ? 'info'
                        : 'warning'
                    }
                  >
                    {course.status === 'completed'
                      ? 'Đã kết thúc'
                      : course.status === 'in_progress'
                      ? 'Đang diễn ra'
                      : 'Sắp diễn ra'}
                  </AppBadge>
                </div>

                <h3 className="font-display text-xl font-light text-ink leading-snug">{course.title}</h3>
                <p className="text-xs text-body line-clamp-2">{course.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-hairline text-xs">
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {course.durationHours} giờ đào tạo
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {course.enrolledCount} / {course.maxParticipants} học viên
                  </span>
                </div>

                <div className="text-[11px] text-muted">
                  Giảng viên: <span className="font-semibold text-ink">{course.instructor}</span>
                </div>

                <AppButton variant="outline" size="sm" className="w-full">
                  Xem Lịch & Danh Sách Học Viên
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      )}

      {/* Tab 2: My Training & Certificates */}
      {activeTab === 'my-training' && (
        <div className="max-w-3xl space-y-6">
          <h2 className="font-display text-xl font-light text-ink">Chứng Chỉ Đào Tạo Đã Hoàn Thành</h2>

          <div className="space-y-4">
            {MOCK_MY_CERTIFICATES.map((cert, idx) => (
              <AppCard key={idx} className="p-6 bg-orb-mint-peach border border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-muted-soft uppercase font-bold tracking-wider">
                        CHỨNG CHỈ HOÀN THÀNH
                      </span>
                      <h3 className="font-display text-xl font-light text-ink mt-0.5">{cert.courseTitle}</h3>
                      <p className="text-xs text-muted mt-0.5">
                        Ngày cấp: {cert.completedDate} · Điểm số kiểm tra: <strong className="text-emerald-700">{cert.score}/100</strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:self-center">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-surface-card border border-hairline text-ink font-semibold">
                      {cert.certificateCode}
                    </span>
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
