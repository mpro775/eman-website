import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { servicesService } from '../../../services/services.service';

export const ServiceForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    order: 0,
    isPublished: true,
  });

  useEffect(() => {
    if (isEdit) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const service = await servicesService.getById(id);
      setFormData({
        name: service.name,
        description: service.description,
        icon: service.icon || '',
        order: service.order,
        isPublished: service.isPublished,
      });
    } catch (error) {
      showToast('فشل تحميل الخدمة', 'error');
      navigate('/admin/services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await servicesService.update(id!, formData);
        showToast('تم تحديث الخدمة بنجاح', 'success');
      } else {
        await servicesService.create(formData);
        showToast('تم إنشاء الخدمة بنجاح', 'success');
      }
      navigate('/admin/services');
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
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-[color:var(--color-admin-text-primary)] mb-2"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {isEdit ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </h1>
        <p 
          className="text-sm text-[color:var(--color-admin-text-muted)]"
          style={{ animation: 'slideUp 0.4s ease-out' }}
        >
          {isEdit ? 'تعديل بيانات الخدمة' : 'إضافة خدمة جديدة إلى الموقع'}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="اسم الخدمة"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />

          <FormTextarea
            label="الوصف"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
            disabled={loading}
          />

          <ImageUpload
            label="أيقونة الخدمة"
            value={formData.icon}
            onChange={(url) => setFormData({ ...formData, icon: url })}
            helperText="ارفع صورة توضح الخدمة (PNG, JPG, أو GIF)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="الترتيب"
              type="number"
              value={formData.order.toString()}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
              disabled={loading}
            />

            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-5 h-5 rounded border-[color:var(--color-admin-border)] bg-[color:var(--color-admin-bg-secondary)] text-[color:var(--color-admin-accent-blue)] focus:ring-2 focus:ring-[color:var(--color-admin-accent-blue)]"
              />
              <label
                htmlFor="isPublished"
                className="text-sm font-medium text-[color:var(--color-admin-text-primary)] cursor-pointer"
              >
                منشور
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/services')}
              className="px-6 py-2.5 glass-effect text-[color:var(--color-admin-text-primary)] rounded-lg hover:bg-[color:var(--color-admin-bg-card-hover)] transition-all duration-300 disabled:opacity-50"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#4a9eff] to-[#6b5eff] text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,158,255,0.4)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading && <LoadingSpinner size="sm" />}
              {isEdit ? 'حفظ التغييرات' : 'إنشاء الخدمة'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

