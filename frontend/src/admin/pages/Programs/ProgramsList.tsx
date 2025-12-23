import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Pagination } from '../../components/tables/Pagination';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { programsService } from '../../../services/programs.service';
import type { UsedProgram } from '../../../types/program.types';

export const ProgramsList = () => {
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const [programs, setPrograms] = useState<UsedProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchPrograms();
  }, [currentPage]);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await programsService.getAll(currentPage, limit);
      setPrograms(response.data || []);
      setTotalPages(response.meta.totalPages);
    } catch (error: any) {
      showToast('فشل تحميل البرامج', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await programsService.delete(deleteId);
      showToast('تم حذف البرنامج بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchPrograms();
    } catch (error: any) {
      showToast('فشل حذف البرنامج', 'error');
    }
  };

  const columns: Column<UsedProgram>[] = [
    {
      key: 'image',
      header: 'الصورة',
      render: (item) => (
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
      ),
    },
    { key: 'name', header: 'الاسم' },
    { key: 'orderNumber', header: 'الترتيب' },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/programs/${item._id}`)}
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
          إدارة البرامج المستخدمة
        </h1>
        <button
          onClick={() => navigate('/admin/programs/new')}
          className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
        >
          <FiPlus />
          إضافة برنامج
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={programs} />
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
        message="هل أنت متأكد من حذف هذا البرنامج؟"
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

