import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { testimonialsService } from '../../../services/testimonials.service';

export const TestimonialForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'text' as 'text' | 'image',
    reviewImage: '',
    image: '',
    personName: '',
    companyName: '',
    ratingText: '',
    orderNumber: 0,
  });

  useEffect(() => {
    if (isEdit) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const testimonial = await testimonialsService.getById(id);
      setFormData({
        type: (testimonial.type as 'text' | 'image') || 'text',
        reviewImage: testimonial.reviewImage || '',
        image: testimonial.image,
        personName: testimonial.personName,
        companyName: testimonial.companyName,
        ratingText: testimonial.ratingText || '',
        orderNumber: testimonial.orderNumber,
      });
    } catch (error) {
      showToast('فشل تحميل الشهادة', 'error');
      navigate('/admin/testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      image: formData.image || formData.reviewImage || '',
    };

    try {
      if (isEdit) {
        await testimonialsService.update(id!, payload);
        showToast('تم تحديث الشهادة بنجاح', 'success');
      } else {
        await testimonialsService.create(payload);
        showToast('تم إنشاء الشهادة بنجاح', 'success');
      }
      navigate('/admin/testimonials');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'حدث خطأ', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[color:var(--color-admin-text-primary)] mb-6">
        {isEdit ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-[color:var(--color-admin-text-primary)] mb-2">
              نوع الشهادة
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'text' })}
                className={`flex-1 py-3 px-4 rounded-xl border font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  formData.type === 'text'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-400 shadow-lg shadow-purple-500/10'
                    : 'bg-[color:var(--color-admin-bg-secondary)] border-[color:var(--color-admin-border)] text-[color:var(--color-admin-text-muted)] hover:border-purple-500/50'
                }`}
              >
                <span>💬</span> رأي نصي
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'image' })}
                className={`flex-1 py-3 px-4 rounded-xl border font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  formData.type === 'image'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-400 shadow-lg shadow-purple-500/10'
                    : 'bg-[color:var(--color-admin-bg-secondary)] border-[color:var(--color-admin-border)] text-[color:var(--color-admin-text-muted)] hover:border-purple-500/50'
                }`}
              >
                <span>🖼️</span> صورة رأي / سكرين شوت
              </button>
            </div>
          </div>

          {formData.type === 'image' && (
            <ImageUpload
              label="صورة الشهادة / السكرين شوت (Screenshot Review)"
              value={formData.reviewImage}
              onChange={(url) => setFormData({ ...formData, reviewImage: url })}
              required
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="اسم الشخص"
              value={formData.personName}
              onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
              required
              disabled={loading}
            />

            <FormInput
              label="اسم الشركة / الصفة"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <FormTextarea
            label={formData.type === 'image' ? 'تعليق / نص إضافي (اختياري)' : 'نص الشهادة'}
            value={formData.ratingText}
            onChange={(e) => setFormData({ ...formData, ratingText: e.target.value })}
            required={formData.type === 'text'}
            rows={formData.type === 'image' ? 3 : 6}
            disabled={loading}
          />

          <FormInput
            label="الترتيب"
            type="number"
            value={formData.orderNumber.toString()}
            onChange={(e) =>
              setFormData({ ...formData, orderNumber: parseInt(e.target.value) || 0 })
            }
            disabled={loading}
          />

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/testimonials')}
              className="px-6 py-2.5 bg-[color:var(--color-admin-bg-card)] text-[color:var(--color-admin-text-primary)] border border-[color:var(--color-admin-border)] rounded-lg hover:bg-[color:var(--color-admin-bg-card-hover)] transition-all duration-150 disabled:opacity-50"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading && <LoadingSpinner size="sm" />}
              {isEdit ? 'حفظ التغييرات' : 'إنشاء الشهادة'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

