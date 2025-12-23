import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable,type Column } from '../../components/tables/DataTable';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { FormInput } from '../../components/forms/FormInput';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { blogService } from '../../../services/blog.service';
import { type BlogTag } from '../../../types/blog.types';

export const TagsList = () => {
  const { showToast } = useUIStore();
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const tagsData = await blogService.getTags();
      setTags(tagsData || []);
    } catch (error: any) {
      showToast('فشل تحميل التاغات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await blogService.updateTag(editingId, name);
        showToast('تم تحديث التاغ بنجاح', 'success');
      } else {
        await blogService.createTag(name);
        showToast('تم إنشاء التاغ بنجاح', 'success');
      }
      setShowModal(false);
      setEditingId(null);
      setName('');
      fetchTags();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'حدث خطأ', 'error');
    }
  };

  const handleEdit = (tag: BlogTag) => {
    setEditingId(tag._id);
    setName(tag.name);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await blogService.deleteTag(deleteId);
      showToast('تم حذف التاغ بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchTags();
    } catch (error: any) {
      showToast('فشل حذف التاغ', 'error');
    }
  };

  const columns: Column<BlogTag>[] = [
    { key: 'name', header: 'الاسم' },
    { key: 'slug', header: 'الرابط' },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="w-8 h-8 flex items-center justify-center bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => {
              setDeleteId(item._id);
              setShowDeleteDialog(true);
            }}
            className="w-8 h-8 flex items-center justify-center bg-[color:var(--color-admin-danger)] text-white rounded-lg hover:bg-[#DC2626] transition-all duration-150"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[color:var(--color-admin-text-primary)]">
          إدارة تاغات المدونة
        </h1>
        <button
          onClick={() => {
            setEditingId(null);
            setName('');
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
        >
          <FiPlus />
          إضافة تاغ
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <DataTable columns={columns} data={tags} />
        )}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setName('');
        }}
        title={editingId ? 'تعديل التاغ' : 'إضافة تاغ جديد'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="اسم التاغ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setName('');
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
        message="هل أنت متأكد من حذف هذا التاغ؟"
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

