import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { FormInput } from '../../components/forms/FormInput';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { projectsService } from '../../../services/projects.service';
import type { ProjectCategory } from '../../../types/project.types';

interface FormData {
    name: string;
    image: string;
    order: number;
}

const initialFormData: FormData = {
    name: '',
    image: '',
    order: 0,
};

export const ProjectCategoriesList = () => {
    const { showToast } = useUIStore();
    const [categories, setCategories] = useState<ProjectCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const cats = await projectsService.getCategories();
            // Sort by order
            const sorted = [...(cats || [])].sort((a, b) => a.order - b.order);
            setCategories(sorted);
        } catch (error) {
            showToast('فشل تحميل فئات المشاريع', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showToast('يرجى إدخال اسم الفئة', 'error');
            return;
        }

        if (!formData.image) {
            showToast('يرجى رفع صورة الفئة', 'error');
            return;
        }

        setSubmitting(true);
        try {
            if (editingId) {
                await projectsService.updateCategory(editingId, formData);
                showToast('تم تحديث الفئة بنجاح', 'success');
            } else {
                await projectsService.createCategory(formData);
                showToast('تم إنشاء الفئة بنجاح', 'success');
            }
            handleCloseModal();
            fetchCategories();
        } catch (error: any) {
            showToast(error.response?.data?.message || 'حدث خطأ', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category: ProjectCategory) => {
        setEditingId(category._id);
        setFormData({
            name: category.name,
            image: category.image,
            order: category.order || 0,
        });
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await projectsService.deleteCategory(deleteId);
            showToast('تم حذف الفئة بنجاح', 'success');
            setShowDeleteDialog(false);
            setDeleteId(null);
            fetchCategories();
        } catch (error: any) {
            showToast('فشل حذف الفئة', 'error');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData(initialFormData);
    };

    const columns: Column<ProjectCategory>[] = [
        {
            key: 'image',
            header: 'الصورة',
            render: (item) => (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                />
            ),
        },
        { key: 'name', header: 'الاسم' },
        {
            key: 'order',
            header: 'الترتيب',
            render: (item) => (
                <span className="px-3 py-1 bg-[color:var(--color-admin-bg-card)] rounded-full text-sm font-medium">
                    {item.order || 0}
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
                        إدارة فئات المشاريع
                    </h1>
                    <p className="text-sm text-[color:var(--color-admin-text-muted)]"
                        style={{ animation: 'slideUp 0.4s ease-out' }}
                    >
                        إضافة وتعديل فئات المشاريع
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData(initialFormData);
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
                ) : categories.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-[color:var(--color-admin-text-muted)] mb-4">لا توجد فئات حتى الآن</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-[color:var(--color-admin-accent-blue)] hover:underline"
                        >
                            إضافة فئة جديدة
                        </button>
                    </div>
                ) : (
                    <DataTable columns={columns} data={categories} />
                )}
            </Card>

            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={editingId ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="اسم الفئة"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={submitting}
                    />

                    <ImageUpload
                        label="صورة الفئة"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        required
                    />

                    <FormInput
                        label="الترتيب"
                        type="number"
                        value={formData.order.toString()}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        disabled={submitting}
                    />

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-6 py-2.5 bg-[color:var(--color-admin-bg-card)] text-[color:var(--color-admin-text-primary)] border border-[color:var(--color-admin-border)] rounded-lg hover:bg-[color:var(--color-admin-bg-card-hover)] transition-all duration-150"
                            disabled={submitting}
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            disabled={submitting}
                        >
                            {submitting && <LoadingSpinner size="sm" />}
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
                message="هل أنت متأكد من حذف هذه الفئة؟ سيتم أيضاً حذف أي مشاريع مرتبطة بها."
                confirmText="حذف"
                cancelText="إلغاء"
                variant="danger"
            />
        </div>
    );
};
