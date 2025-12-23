import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { blogService } from '../../../services/blog.service';
import type { BlogCategory } from '../../../types/blog.types';

export const CategoriesList = () => {
  const { showToast } = useUIStore();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const cats = await blogService.getCategories();
      setCategories(cats || []);
    } catch (error: any) {
      showToast('فشل تحميل الفئات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await blogService.updateCategory(editingId, formData.name, formData.description);
        showToast('تم تحديث الفئة بنجاح', 'success');
      } else {
        await blogService.createCategory(formData.name, formData.description);
        showToast('تم إنشاء الفئة بنجاح', 'success');
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'حدث خطأ', 'error');
    }
  };

  const handleEdit = (category: BlogCategory) => {
    setEditingId(category._id);
    setFormData({ name: category.name, description: category.description || '' });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await blogService.deleteCategory(deleteId);
      showToast('تم حذف الفئة بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchCategories();
    } catch (error: any) {
      showToast('فشل حذف الفئة', 'error');
    }
  };

  const columns: Column<BlogCategory>[] = [
    { key: 'name', header: 'الاسم' },
    {
      key: 'description',
      header: 'الوصف',
      render: (item) => (
        <span className="text-sm text-[color:var(--color-admin-text-secondary)]">
          {item.description || '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#4a9eff] to-[#6b5eff] text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,158,255,0.4)] hover:scale-110"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => {
              setDeleteId(item._id);
              setShowDeleteDialog(true);
            }}
            className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header with gradient background */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[color:var(--color-admin-text-primary)] mb-2"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            إدارة فئات المدونة
          </h1>
          <p className="text-sm text-[color:var(--color-admin-text-muted)]"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            إضافة وتعديل فئات المدونة
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', description: '' });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4a9eff] to-[#6b5eff] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,158,255,0.4)] hover:scale-105 hover:-translate-y-0.5"
          style={{ animation: 'slideUp 0.5s ease-out' }}
        >
          <FiPlus className="text-lg" />
          إضافة فئة
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <DataTable columns={columns} data={categories} />
        )}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ name: '', description: '' });
        }}
        title={editingId ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="اسم الفئة"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormTextarea
            label="الوصف"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setFormData({ name: '', description: '' });
              }}
              className="px-6 py-2.5 bg-[color:var(--color-admin-bg-card)] text-[color:var(--color-admin-text-primary)] border border-[color:var(--color-admin-border)] rounded-lg hover:bg-[color:var(--color-admin-bg-card-hover)] transition-all duration-150"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
            >
              {editingId ? 'حفظ' : 'إنشاء'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeleteId(null);
        }}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذه الفئة؟"
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

