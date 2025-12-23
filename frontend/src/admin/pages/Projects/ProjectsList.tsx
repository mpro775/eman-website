import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Pagination } from '../../components/tables/Pagination';
import { SearchBar } from '../../components/tables/SearchBar';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { projectsService } from '../../../services/projects.service';
import type { Project } from '../../../types/project.types';

export const ProjectsList = () => {
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchProjects();
  }, [currentPage, search]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectsService.getAll({
        page: currentPage,
        limit,
        search: search || undefined,
      });
      setProjects(response.data || []);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error: any) {
      showToast('فشل تحميل المشاريع', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await projectsService.delete(deleteId);
      showToast('تم حذف المشروع بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchProjects();
    } catch (error: any) {
      showToast('فشل حذف المشروع', 'error');
    }
  };

  const columns: Column<Project>[] = [
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
    {
      key: 'name',
      header: 'الاسم',
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
      key: 'category',
      header: 'الفئة',
      render: (item) => {
        const category = typeof item.category === 'object' ? item.category.name : item.category;
        return <span>{category}</span>;
      },
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/projects/${item._id}`)}
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
            إدارة المشاريع
          </h1>
          <p className="text-sm text-[color:var(--color-admin-text-muted)]"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            إضافة وتعديل مشاريعك
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/projects/new')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4a9eff] to-[#6b5eff] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,158,255,0.4)] hover:scale-105 hover:-translate-y-0.5"
          style={{ animation: 'slideUp 0.5s ease-out' }}
        >
          <FiPlus className="text-lg" />
          إضافة مشروع
        </button>
      </div>

      <Card className="mb-6">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          placeholder="بحث في المشاريع..."
        />
      </Card>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={projects} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={totalItems}
              itemsPerPage={limit}
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
        message="هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

