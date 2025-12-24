import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { FormSelect } from '../../components/forms/FormSelect';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { blogService } from '../../../services/blog.service';
import { PostStatus, type BlogCategory, type BlogTag } from '../../../types/blog.types';

export const PostForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [_tags, setTags] = useState<BlogTag[]>([]);
  const [formData, setFormData] = useState<{
    title: string;
    summary: string;
    content: string;
    featuredImage: string;
    category: string;
    tags: string[];
    publishDate: string;
    status: PostStatus;
    readTime: number;
    seo: {
      metaTitle: string;
      metaDescription: string;
    };
  }>({
    title: '',
    summary: '',
    content: '',
    featuredImage: '',
    category: '',
    tags: [],
    publishDate: '',
    status: PostStatus.DRAFT,
    readTime: 0,
    seo: {
      metaTitle: '',
      metaDescription: '',
    },
  });

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (isEdit) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const cats = await blogService.getCategories();
      setCategories(cats);
    } catch (error) {
      showToast('فشل تحميل الفئات', 'error');
    }
  };

  const fetchTags = async () => {
    try {
      const tagsData = await blogService.getTags();
      setTags(tagsData);
    } catch (error) {
      showToast('فشل تحميل التاغات', 'error');
    }
  };

  const fetchPost = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const post = await blogService.getPostById(id);
      setFormData({
        title: post.title,
        summary: post.summary,
        content: post.content,
        featuredImage: post.featuredImage || '',
        category: typeof post.category === 'object' ? post.category._id : post.category || '',
        tags:
          post.tags?.map((tag) => (typeof tag === 'object' ? tag._id : tag)) || [],
        publishDate: post.publishDate || '',
        status: post.status as PostStatus,
        readTime: post.readTime || 0,
        seo: post.seo || { metaTitle: '', metaDescription: '' },
      });
    } catch (error) {
      showToast('فشل تحميل المقال', 'error');
      navigate('/admin/blog/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.filter(Boolean),
        category: formData.category || undefined,
      };
      if (isEdit) {
        await blogService.updatePost(id!, data);
        showToast('تم تحديث المقال بنجاح', 'success');
      } else {
        await blogService.createPost(data);
        showToast('تم إنشاء المقال بنجاح', 'success');
      }
      navigate('/admin/blog/posts');
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
        {isEdit ? 'تعديل المقال' : 'إضافة مقال جديد'}
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="العنوان"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            disabled={loading}
          />

          <FormTextarea
            label="الملخص"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            required
            rows={3}
            disabled={loading}
          />

          <FormTextarea
            label="المحتوى"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
            disabled={loading}
          />

          <ImageUpload
            label="الصورة المميزة"
            value={formData.featuredImage}
            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="الفئة"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories.map((cat) => ({ value: cat._id, label: cat.name }))}
              placeholder="اختر الفئة"
            />

            <FormSelect
              label="الحالة"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as PostStatus })
              }
              options={[
                { value: PostStatus.DRAFT, label: 'مسودة' },
                { value: PostStatus.PUBLISHED, label: 'منشور' },
                { value: PostStatus.ARCHIVED, label: 'مؤرشف' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="تاريخ النشر"
              type="datetime-local"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              disabled={loading}
            />

            <FormInput
              label="وقت القراءة (بالدقائق)"
              type="number"
              value={formData.readTime.toString()}
              onChange={(e) =>
                setFormData({ ...formData, readTime: parseInt(e.target.value) || 0 })
              }
              disabled={loading}
            />
          </div>

          <div className="border-t border-[color:var(--color-admin-border)] pt-6">
            <h3 className="text-lg font-semibold text-[color:var(--color-admin-text-primary)] mb-4">
              إعدادات SEO
            </h3>
            <div className="space-y-4">
              <FormInput
                label="Meta Title"
                value={formData.seo.metaTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value },
                  })
                }
                disabled={loading}
              />
              <FormTextarea
                label="Meta Description"
                value={formData.seo.metaDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value },
                  })
                }
                rows={3}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/blog/posts')}
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
              {isEdit ? 'حفظ التغييرات' : 'إنشاء المقال'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

