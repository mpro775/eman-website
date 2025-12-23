import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '../../components/forms/FormInput';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { programsService } from '../../../services/programs.service';

export const ProgramForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    orderNumber: 0,
  });

  useEffect(() => {
    if (isEdit) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const program = await programsService.getById(id);
      setFormData({
        image: program.image,
        name: program.name,
        orderNumber: program.orderNumber,
      });
    } catch (error) {
      showToast('فشل تحميل البرنامج', 'error');
      navigate('/admin/programs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await programsService.update(id!, formData);
        showToast('تم تحديث البرنامج بنجاح', 'success');
      } else {
        await programsService.create(formData);
        showToast('تم إنشاء البرنامج بنجاح', 'success');
      }
      navigate('/admin/programs');
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
        {isEdit ? 'تعديل البرنامج' : 'إضافة برنامج جديد'}
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload
            label="صورة البرنامج"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            required
          />

          <FormInput
            label="اسم البرنامج"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
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
              onClick={() => navigate('/admin/programs')}
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
              {isEdit ? 'حفظ التغييرات' : 'إنشاء البرنامج'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

