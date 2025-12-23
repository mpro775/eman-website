import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Pagination } from '../../components/tables/Pagination';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { testimonialsService } from '../../../services/testimonials.service';
import type { Testimonial } from '../../../types/testimonial.types';

export const TestimonialsList = () => {
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchTestimonials();
  }, [currentPage]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await testimonialsService.getAll(currentPage, limit);
      setTestimonials(response.data || []);
      setTotalPages(response.meta.totalPages);
    } catch (error: any) {
      showToast('فشل تحميل الشهادات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await testimonialsService.delete(deleteId);
      showToast('تم حذف الشهادة بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchTestimonials();
    } catch (error: any) {
      showToast('فشل حذف الشهادة', 'error');
    }
  };

  const columns: Column<Testimonial>[] = [
    {
      key: 'image',
      header: 'الصورة',
      render: (item) => (
        <img
          src={item.image}
          alt={item.personName}
          className="w-16 h-16 object-cover rounded-lg"
        />
      ),
    },
    { key: 'personName', header: 'اسم الشخص' },
    { key: 'companyName', header: 'اسم الشركة' },
    {
      key: 'ratingText',
      header: 'الشهادة',
      render: (item) => (
        <span className="text-sm text-[color:var(--color-admin-text-secondary)] line-clamp-2">
          {item.ratingText}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/testimonials/${item._id}`)}
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
          إدارة الشهادات
        </h1>
        <button
          onClick={() => navigate('/admin/testimonials/new')}
          className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
        >
          <FiPlus />
          إضافة شهادة
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={testimonials} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Card>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeleteId(null);
        }}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذه الشهادة؟"
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

