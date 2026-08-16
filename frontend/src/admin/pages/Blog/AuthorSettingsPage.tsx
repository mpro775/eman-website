import { useState, useEffect, type FormEvent } from 'react';
import { FormInput } from '../../components/forms/FormInput';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { blogService } from '../../../services/blog.service';
import type { BlogAuthorSettings } from '../../../types/blog.types';
import { FiSave, FiEye, FiEyeOff } from 'react-icons/fi';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop';

export const AuthorSettingsPage = () => {
  const { showToast } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState<BlogAuthorSettings>({
    name: 'إيمان جميل',
    title: 'كاتب ومتخصص في التكنولوجيا والذكاء الاصطناعي',
    image: DEFAULT_IMAGE,
    buttonText: 'عرض المزيد من المقالات',
    buttonLink: '/blog',
    isEnabled: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setFetching(true);
    try {
      const data = await blogService.getAuthorSettings();
      if (data) {
        setFormData({
          name: data.name || 'إيمان جميل',
          title: data.title || 'كاتب ومتخصص في التكنولوجيا والذكاء الاصطناعي',
          image: data.image || DEFAULT_IMAGE,
          buttonText: data.buttonText || 'عرض المزيد من المقالات',
          buttonLink: data.buttonLink || '/blog',
          isEnabled: data.isEnabled ?? true,
        });
      }
    } catch (error) {
      console.error('Failed to load author settings', error);
      showToast('فشل تحميل إعدادات الكاتب', 'error');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await blogService.updateAuthorSettings(formData);
      showToast('تم حفظ إعدادات بطاقة الكاتب بنجاح', 'success');
    } catch (error) {
      console.error('Failed to update author settings', error);
      showToast('حدث خطأ أثناء حفظ الإعدادات', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--color-admin-text-primary)]">
            تخصيص بطاقة الكاتب
          </h1>
          <p className="text-sm text-[color:var(--color-admin-text-secondary)] mt-1">
            التحكم في العنصر الخاص بالكاتب الظاهر في أسفل صفحة تفاصيل المدونة
          </p>
        </div>
      </div>

      {/* Live Preview Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[color:var(--color-admin-border)] pb-3">
          <span className="text-sm font-semibold text-[color:var(--color-admin-text-primary)] flex items-center gap-2">
            <FiEye className="text-accent-pink" />
            معاينة حية لبطاقة الكاتب (Live Preview)
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            formData.isEnabled
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {formData.isEnabled ? 'ظاهرة في الموقع' : 'مخفية'}
          </span>
        </div>

        <div className={`p-6 rounded-2xl transition-all duration-300 ${!formData.isEnabled ? 'opacity-40 grayscale' : ''}`}
             style={{ background: '#0f0f1a' }}>
          {/* Target Element HTML Preview */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center gap-6">
            <img
              alt={formData.name || 'الكاتب'}
              className="w-20 h-20 rounded-full object-cover border-2 border-accent-pink"
              src={formData.image || DEFAULT_IMAGE}
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
              }}
            />
            <div className="text-center md:text-right flex-1">
              <h4 className="text-white text-lg font-semibold mb-2">
                {formData.name || 'اسم الكاتب'}
              </h4>
              <p className="text-text-secondary text-sm mb-4">
                {formData.title || 'المسمى الوظيفي / الوصف'}
              </p>
              <button
                type="button"
                className="text-accent-pink text-sm font-medium hover:text-accent-pink-light transition-colors duration-300"
              >
                {formData.buttonText || 'عرض المزيد من المقالات'}
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[color:var(--color-admin-border)] pb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isEnabled}
                onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                className="w-5 h-5 rounded border-[color:var(--color-admin-border)] bg-[color:var(--color-admin-bg-secondary)] text-accent-pink focus:ring-accent-pink"
              />
              <span className="text-sm font-medium text-[color:var(--color-admin-text-primary)] flex items-center gap-2">
                {formData.isEnabled ? <FiEye className="text-emerald-400" /> : <FiEyeOff className="text-rose-400" />}
                إظهار بطاقة الكاتب في تفاصيل المقالات
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="اسم الكاتب"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: إيمان جميل"
              required
            />

            <FormInput
              label="الوصف / المسمى الوظيفي"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: كاتب ومتخصص في التكنولوجيا والذكاء الاصطناعي"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="نص الزر"
              value={formData.buttonText}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              placeholder="مثال: عرض المزيد من المقالات"
              required
            />

            <FormInput
              label="رابط الزر"
              value={formData.buttonLink}
              onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
              placeholder="مثال: /blog"
              required
            />
          </div>

          <div>
            <ImageUpload
              label="صورة الكاتب"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              helperText="يفضل صورة مربعة بحجم 200x200 بكسل"
            />
          </div>

          {/* Fallback Image URL input */}
          <FormInput
            label="أو أدخل رابط صورة مباشر (Image URL)"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
          />
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-lg"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <FiSave />
                حفظ التغييرات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
