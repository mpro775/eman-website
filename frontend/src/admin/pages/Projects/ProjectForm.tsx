import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { FormSelect } from '../../components/forms/FormSelect';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { projectsService } from '../../../services/projects.service';
import type { ProjectCategory } from '../../../types/project.types';

export const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const cats = await projectsService.getCategories();
      setCategories(cats);
    } catch (error) {
      showToast('فشل تحميل الفئات', 'error');
    }
  };

  const fetchProject = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const project = await projectsService.getById(id);
      setFormData({
        name: project.name,
        image: project.image,
        description: project.description,
        category:
          typeof project.category === 'object' ? project.category._id : project.category,
      });
    } catch (error) {
      showToast('فشل تحميل المشروع', 'error');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await projectsService.update(id!, formData);
        showToast('تم تحديث المشروع بنجاح', 'success');
      } else {
        await projectsService.create(formData);
        showToast('تم إنشاء المشروع بنجاح', 'success');
      }
      navigate('/admin/projects');
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
        {isEdit ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="اسم المشروع"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />

          <ImageUpload
            label="صورة المشروع"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            required
          />

          <FormTextarea
            label="الوصف"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
            disabled={loading}
          />

          <FormSelect
            label="الفئة"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categories.map((cat) => ({ value: cat._id, label: cat.name }))}
            placeholder="اختر الفئة"
            required
            disabled={loading}
          />

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-6 py-2.5 bg-[color:var(--color-admin-bg-card)] text-[color:var(--color-admin-text-primary)] border border-[color:var(--color-admin-border)] rounded-lg hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)] transition-all duration-150 disabled:opacity-50"
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
              {isEdit ? 'حفظ التغييرات' : 'إنشاء المشروع'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

