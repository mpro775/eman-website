import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiBriefcase } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { experiencesService } from '../../../services/experiences.service';
import type { Experience } from '../../../types/experience.types';

interface FormData {
    name: string;
    description: string;
    order: number;
}

const initialFormData: FormData = {
    name: '',
    description: '',
    order: 0,
};

export const ExperiencesList = () => {
    const { showToast } = useUIStore();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const data = await experiencesService.getAll();
            // Sort by order
            const sorted = [...(data || [])].sort((a, b) => a.order - b.order);
            setExperiences(sorted);
        } catch (error) {
            showToast('فشل تحميل الخبرات', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showToast('يرجى إدخال اسم الخبرة', 'error');
            return;
        }

        if (!formData.description.trim()) {
            showToast('يرجى إدخال وصف الخبرة', 'error');
            return;
        }

        setSubmitting(true);
        try {
            if (editingId) {
                await experiencesService.update(editingId, formData);
                showToast('تم تحديث الخبرة بنجاح', 'success');
            } else {
                await experiencesService.create(formData);
                showToast('تم إنشاء الخبرة بنجاح', 'success');
            }
            handleCloseModal();
            fetchExperiences();
        } catch (error: any) {
            showToast(error.response?.data?.message || 'حدث خطأ', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (experience: Experience) => {
        setEditingId(experience._id);
        setFormData({
            name: experience.name,
            description: experience.description,
            order: experience.order || 0,
        });
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await experiencesService.delete(deleteId);
            showToast('تم حذف الخبرة بنجاح', 'success');
            setShowDeleteDialog(false);
            setDeleteId(null);
            fetchExperiences();
        } catch (error: any) {
            showToast('فشل حذف الخبرة', 'error');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData(initialFormData);
    };

    const columns: Column<Experience>[] = [
        {
            key: 'order',
            header: 'الترتيب',
            render: (item) => (
                <span className="px-3 py-1 bg-gradient-to-br from-[#4a9eff]/20 to-[#6b5eff]/20 rounded-full text-sm font-medium text-[color:var(--color-admin-accent-blue)]">
                    {item.order || 0}
                </span>
            ),
        },
        {
            key: 'name',
            header: 'الاسم',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4a9eff] to-[#6b5eff] flex items-center justify-center text-white">
                        <FiBriefcase />
                    </div>
                    <span className="font-medium">{item.name}</span>
                </div>
            ),
        },
        {
            key: 'description',
            header: 'الوصف',
            render: (item) => (
                <span className="text-sm text-[color:var(--color-admin-text-secondary)] line-clamp-2">
                    {item.description}
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
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[color:var(--color-admin-text-primary)] mb-2"
                        style={{ animation: 'slideUp 0.3s ease-out' }}
                    >
                        إدارة الخبرات العملية
                    </h1>
                    <p className="text-sm text-[color:var(--color-admin-text-muted)]"
                        style={{ animation: 'slideUp 0.4s ease-out' }}
                    >
                        إضافة وتعديل الخبرات العملية
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
                    إضافة خبرة
                </button>
            </div>

            <Card>
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : experiences.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4a9eff]/20 to-[#6b5eff]/20 flex items-center justify-center">
                            <FiBriefcase className="text-2xl text-[color:var(--color-admin-accent-blue)]" />
                        </div>
                        <p className="text-[color:var(--color-admin-text-muted)] mb-4">لا توجد خبرات حتى الآن</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-[color:var(--color-admin-accent-blue)] hover:underline"
                        >
                            إضافة خبرة جديدة
                        </button>
                    </div>
                ) : (
                    <DataTable columns={columns} data={experiences} />
                )}
            </Card>

            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={editingId ? 'تعديل الخبرة' : 'إضافة خبرة جديدة'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="اسم الخبرة"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: تطوير تطبيقات الويب"
                        required
                        disabled={submitting}
                    />

                    <FormTextarea
                        label="وصف الخبرة"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="وصف تفصيلي للخبرة..."
                        rows={4}
                        required
                        disabled={submitting}
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
                message="هل أنت متأكد من حذف هذه الخبرة؟"
                confirmText="حذف"
                cancelText="إلغاء"
                variant="danger"
            />
        </div>
    );
};
