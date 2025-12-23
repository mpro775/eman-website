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
        image: testimonial.image,
        personName: testimonial.personName,
        companyName: testimonial.companyName,
        ratingText: testimonial.ratingText,
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

    try {
      if (isEdit) {
        await testimonialsService.update(id!, formData);
        showToast('تم تحديث الشهادة بنجاح', 'success');
      } else {
        await testimonialsService.create(formData);
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
          <ImageUpload
            label="صورة الشخص"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="اسم الشخص"
              value={formData.personName}
              onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
              required
              disabled={loading}
            />

            <FormInput
              label="اسم الشركة"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <FormTextarea
            label="نص الشهادة"
            value={formData.ratingText}
            onChange={(e) => setFormData({ ...formData, ratingText: e.target.value })}
            required
            rows={6}
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

