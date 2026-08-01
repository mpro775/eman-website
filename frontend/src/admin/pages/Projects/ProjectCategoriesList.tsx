import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { FormInput } from '../../components/forms/FormInput';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { projectsService } from '../../../services/projects.service';
import { resolveImageUrl } from '../../../utils/imageUrl';
import type { Project, ProjectCategory } from '../../../types/project.types';

interface FormData {
    name: string;
    order: number;
    featuredProjects: string[];
}

const initialFormData: FormData = {
    name: '',
    order: 0,
    featuredProjects: [],
};

export const ProjectCategoriesList = () => {
    const { showToast } = useUIStore();
    const [categories, setCategories] = useState<ProjectCategory[]>([]);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
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
            const [cats, projectsRes] = await Promise.all([
                projectsService.getCategories(),
                projectsService.getAll({ limit: 100 }),
            ]);
            const sorted = [...(cats || [])].sort((a, b) => a.order - b.order);
            setCategories(sorted);
            setAllProjects(projectsRes?.data || []);
        } catch (error) {
            showToast('فشل تحميل فئات الأعمال', 'error');
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

        const currentFeatured = (category.featuredProjects || []).map((p) =>
            typeof p === 'object' ? p._id : p
        );

        setFormData({
            name: category.name,
            order: category.order || 0,
            featuredProjects: currentFeatured,
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
            showToast(error.response?.data?.message || 'فشل حذف الفئة', 'error');
            setShowDeleteDialog(false);
            setDeleteId(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData(initialFormData);
    };

    const toggleFeaturedProject = (projectId: string) => {
        setFormData((prev) => {
            const exists = prev.featuredProjects.includes(projectId);
            if (exists) {
                return {
                    ...prev,
                    featuredProjects: prev.featuredProjects.filter((id) => id !== projectId),
                };
            }
            if (prev.featuredProjects.length >= 3) {
                showToast('يمكنك اختيار 3 أعمال فقط كأعمال بارزة بالفئة', 'error');
                return prev;
            }
            return {
                ...prev,
                featuredProjects: [...prev.featuredProjects, projectId],
            };
        });
    };

    const categoryProjects = allProjects.filter((p) => {
        if (!editingId) return true;
        const catId = typeof p.category === 'object' ? p.category?._id : p.category;
        return catId === editingId;
    });

    const columns: Column<ProjectCategory>[] = [
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
            key: 'projectsCount',
            header: 'عدد الأعمال',
            render: (item) => (
                <span className="px-3 py-1 bg-[#8b5cf6]/20 text-[#c084fc] rounded-full text-sm font-medium">
                    {item.projectsCount ?? (item.previewProjects?.length || 0)} عمل
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
                    <h1
                        className="text-3xl font-bold text-[color:var(--color-admin-text-primary)] mb-2"
                        style={{ animation: 'slideUp 0.3s ease-out' }}
                    >
                        إدارة فئات الأعمال
                    </h1>
                    <p
                        className="text-sm text-[color:var(--color-admin-text-muted)]"
                        style={{ animation: 'slideUp 0.4s ease-out' }}
                    >
                        تظهر الفئات في قسم «أعمالي» بالصفحة الرئيسية كـ 3 بطاقات متكدسة مائلة
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
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        label="اسم الفئة"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                    {/* Featured Projects Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[color:var(--color-admin-text-primary)]">
                            الأعمال البارزة للـ (3-Card Stack) بالصفحة الرئيسية (اختياري - 3 كروت كحد أقصى)
                        </label>
                        <p className="text-xs text-[color:var(--color-admin-text-muted)]">
                            إذا تركتها فارغة، سيتم اختيار أحدث 3 أعمال تابعة لهذه الفئة تلقائياً.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-[color:var(--color-admin-border)] rounded-xl bg-[color:var(--color-admin-bg-card)]">
                            {categoryProjects.length === 0 ? (
                                <p className="text-xs text-center py-4 text-[color:var(--color-admin-text-muted)] col-span-2">
                                    لا توجد أعمال منسوبة لهذه الفئة حتى الآن
                                </p>
                            ) : (
                                categoryProjects.map((p) => {
                                    const isSelected = formData.featuredProjects.includes(p._id);
                                    return (
                                        <button
                                            key={p._id}
                                            type="button"
                                            onClick={() => toggleFeaturedProject(p._id)}
                                            className={`flex items-center gap-3 p-2 rounded-lg text-right transition-all border ${
                                                isSelected
                                                    ? 'border-[#4a9eff] bg-[#4a9eff]/10 text-white'
                                                    : 'border-transparent hover:bg-[color:var(--color-admin-bg-card-hover)] text-[color:var(--color-admin-text-muted)]'
                                            }`}
                                        >
                                            <img
                                                src={resolveImageUrl(p.image)}
                                                alt=""
                                                className="w-10 h-10 object-cover rounded-md shrink-0"
                                            />
                                            <span className="text-xs font-medium truncate flex-1">{p.name}</span>
                                            {isSelected && (
                                                <span className="text-xs text-[#4a9eff] font-bold">✓</span>
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

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
                message="هل أنت متأكد من حذف هذه الفئة؟ لا يمكن حذف فئة مرتبطة بأعمال — انقل أعمالها إلى فئة أخرى أولاً."
                confirmText="حذف"
                cancelText="إلغاء"
                variant="danger"
            />
        </div>
    );
};

