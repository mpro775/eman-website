import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { FormSelect } from '../../components/forms/FormSelect';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { MultiImageUpload } from '../../components/forms/MultiImageUpload';
import { TagsInput } from '../../components/forms/TagsInput';
import { IconPicker } from '../../components/forms/IconPicker';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { WorkCardPreview } from '../../components/ui/WorkCardPreview';
import { useUIStore } from '../../../store/ui.store';
import { projectsService } from '../../../services/projects.service';
import { normalizeExternalUrl } from '../../../utils/externalUrl';
import type { ProjectCategory, ProjectDetailRow } from '../../../types/project.types';

/**
 * Rows a new project starts with — a starting point, not a fixed schema: each
 * one can be renamed, re-iconed or deleted, and more can be added.
 */
const makeDefaultDetailRows = (): ProjectDetailRow[] => [
  { icon: 'layers', label: 'نوع المشروع', value: '' },
  { icon: 'calendar', label: 'السنة', value: '' },
  { icon: 'figma', label: 'الأدوات', value: '' },
  { icon: 'user', label: 'العميل', value: '' },
];

export const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [formData, setFormData] = useState(() => ({
    name: '',
    image: '',
    description: '',
    category: '',
    gallery: [] as string[],
    tags: [] as string[],
    details: isEdit ? ([] as ProjectDetailRow[]) : makeDefaultDetailRows(),
    projectLink: '',
    figmaLink: '',
  }));

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
        gallery: Array.isArray(project.gallery) ? project.gallery.filter(Boolean) : [],
        tags: Array.isArray(project.tags) ? project.tags.filter(Boolean) : [],
        details: Array.isArray(project.details)
          ? project.details.map((row) => ({
              icon: row?.icon ?? '',
              label: row?.label ?? '',
              value: row?.value ?? '',
            }))
          : [],
        projectLink: project.projectLink ?? '',
        figmaLink: project.figmaLink ?? '',
      });
    } catch (error) {
      showToast('فشل تحميل العمل', 'error');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryName =
    categories.find((c) => c._id === formData.category)?.name || '';

  const updateDetailRow = (index: number, patch: Partial<ProjectDetailRow>) => {
    const details = [...formData.details];
    details[index] = { ...details[index], ...patch };
    setFormData({ ...formData, details });
  };

  const addDetailRow = () => {
    setFormData({ ...formData, details: [...formData.details, { icon: 'info', label: '', value: '' }] });
  };

  const removeDetailRow = (index: number) => {
    const details = [...formData.details];
    details.splice(index, 1);
    setFormData({ ...formData, details });
  };

  const moveDetailRow = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= formData.details.length) return;
    const details = [...formData.details];
    [details[index], details[target]] = [details[target], details[index]];
    setFormData({ ...formData, details });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      gallery: formData.gallery.filter(Boolean),
      tags: formData.tags.map((tag) => tag.trim()).filter(Boolean),
      details: formData.details
        .filter((row) => row.label.trim())
        .map((row) => ({
          icon: row.icon || '',
          label: row.label.trim(),
          value: (row.value || '').trim(),
        })),
      projectLink: normalizeExternalUrl(formData.projectLink),
      figmaLink: normalizeExternalUrl(formData.figmaLink),
    };

    try {
      if (isEdit) {
        await projectsService.update(id!, payload);
        showToast('تم تحديث العمل بنجاح', 'success');
      } else {
        await projectsService.create(payload);
        showToast('تم إنشاء العمل بنجاح', 'success');
      }
      navigate('/admin/projects');
    } catch (error: any) {
      const message = error.response?.data?.message;
      showToast(Array.isArray(message) ? message.join(' · ') : message || 'حدث خطأ', 'error');
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
        {isEdit ? 'تعديل العمل' : 'إضافة عمل جديد'}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Form Fields */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <Card>
              <h2 className="text-lg font-semibold text-[color:var(--color-admin-text-primary)] mb-4">
                المعلومات الأساسية
              </h2>

              <div className="space-y-6">
                <FormInput
                  label="اسم العمل"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                />

                <ImageUpload
                  label="صورة بطاقة المشروع (غلاف البطاقة)"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="projects"
                  helperText="تظهر هذه الصورة في بطاقة المشروع ضمن قائمة/شبكة الأعمال."
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

                <FormInput
                  label="رابط المشروع"
                  type="text"
                  dir="ltr"
                  placeholder="https://..."
                  value={formData.projectLink}
                  onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                  helperText="يظهر كزر «زيارة المشروع مباشر». اتركه فارغاً لإخفاء الزر."
                  disabled={loading}
                />

                <FormInput
                  label="رابط Figma Community"
                  type="text"
                  dir="ltr"
                  placeholder="https://www.figma.com/community/..."
                  value={formData.figmaLink}
                  onChange={(e) => setFormData({ ...formData, figmaLink: e.target.value })}
                  helperText="يظهر كزر «المشروع على Figma Community». اتركه فارغاً لإخفاء الزر."
                  disabled={loading}
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-[color:var(--color-admin-text-primary)] mb-1">
                صور تفاصيل المشروع (عند النقر لاستعراض التفاصيل)
              </h2>
              <p className="text-sm text-[color:var(--color-admin-text-muted)] mb-4">
                الصور الخاصة باستعراض تفاصيل المشروع كاملة عند النقر على بطاقة المشروع.
              </p>
              <MultiImageUpload
                value={formData.gallery}
                onChange={(gallery) => setFormData({ ...formData, gallery })}
                folder="projects"
                disabled={loading}
                helperText="تظهر هذه الصور بهذا الترتيب في معرض صفحة تفاصيل المشروع. (إن تُرِكت فارغة ستُعرض صورة البطاقة)."
              />
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-[color:var(--color-admin-text-primary)] mb-4">
                تفاصيل المشروع
              </h2>

              <div className="space-y-6">
                <TagsInput
                  label="الوسوم"
                  value={formData.tags}
                  onChange={(tags) => setFormData({ ...formData, tags })}
                  disabled={loading}
                  helperText="تظهر كشرائح أسفل وصف المشروع."
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
                      صفوف التفاصيل
                    </label>
                    <button
                      type="button"
                      onClick={addDetailRow}
                      disabled={loading || formData.details.length >= 20}
                      className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg text-sm transition-colors hover:bg-[#3A8EFF] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiPlus />
                      <span>إضافة صف</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.details.length > 0 ? (
                      formData.details.map((row, index) => (
                        <div
                          key={index}
                          className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 bg-[color:var(--color-admin-bg-tertiary)] rounded-lg border border-[color:var(--color-admin-border)]"
                        >
                          <IconPicker
                            value={row.icon}
                            onChange={(icon) => updateDetailRow(index, { icon })}
                            disabled={loading}
                            ariaLabel={`أيقونة الصف ${index + 1}`}
                          />

                          <input
                            type="text"
                            value={row.label}
                            onChange={(e) => updateDetailRow(index, { label: e.target.value })}
                            placeholder="اسم الحقل (مثال: السنة)"
                            disabled={loading}
                            className="flex-1 min-w-[140px] px-3 py-2 bg-[color:var(--color-admin-bg-primary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm focus:outline-none focus:border-[color:var(--color-admin-border-focus)] placeholder:text-[color:var(--color-admin-text-muted)]"
                          />

                          <input
                            type="text"
                            value={row.value}
                            onChange={(e) => updateDetailRow(index, { value: e.target.value })}
                            placeholder="القيمة (مثال: 2024)"
                            disabled={loading}
                            className="flex-1 min-w-[140px] px-3 py-2 bg-[color:var(--color-admin-bg-primary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm focus:outline-none focus:border-[color:var(--color-admin-border-focus)] placeholder:text-[color:var(--color-admin-text-muted)]"
                          />

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => moveDetailRow(index, -1)}
                              disabled={index === 0 || loading}
                              aria-label="تحريك لأعلى"
                              className="p-2 text-[color:var(--color-admin-text-secondary)] hover:bg-[color:var(--color-admin-bg-card-hover)] rounded-lg transition-colors disabled:opacity-30"
                            >
                              <FiChevronUp />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveDetailRow(index, 1)}
                              disabled={index === formData.details.length - 1 || loading}
                              aria-label="تحريك لأسفل"
                              className="p-2 text-[color:var(--color-admin-text-secondary)] hover:bg-[color:var(--color-admin-bg-card-hover)] rounded-lg transition-colors disabled:opacity-30"
                            >
                              <FiChevronDown />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeDetailRow(index)}
                              disabled={loading}
                              aria-label="حذف الصف"
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <FiX className="text-xl" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-[color:var(--color-admin-text-muted)]">
                        <p>لا توجد تفاصيل</p>
                        <p className="text-sm mt-1">اضغط على "إضافة صف" لإضافة تفاصيل المشروع</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sticky Sidebar Live Card Preview */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-6">
            <Card className="bg-[#080716] border border-[#211d49]/60 shadow-xl">
              <WorkCardPreview
                title={formData.name}
                categoryName={selectedCategoryName}
                image={formData.image}
              />
            </Card>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-6">
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
            {isEdit ? 'حفظ التغييرات' : 'إنشاء العمل'}
          </button>
        </div>
      </form>
    </div>
  );
};
