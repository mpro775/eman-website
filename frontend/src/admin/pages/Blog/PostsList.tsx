import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Pagination } from '../../components/tables/Pagination';
import { SearchBar } from '../../components/tables/SearchBar';
import { FormSelect } from '../../components/forms/FormSelect';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { blogService } from '../../../services/blog.service';
import  { type Post, PostStatus } from '../../../types/blog.types';

export const PostsList = () => {
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatus | ''>('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchPosts();
  }, [currentPage, search, statusFilter]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await blogService.getPosts({
        page: currentPage,
        limit,
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setPosts(response.data || []);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error: any) {
      showToast('فشل تحميل المقالات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await blogService.deletePost(deleteId);
      showToast('تم حذف المقال بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchPosts();
    } catch (error: any) {
      showToast('فشل حذف المقال', 'error');
    }
  };

  const getStatusBadge = (status: PostStatus) => {
    const badges = {
      draft: 'bg-[rgba(245,158,11,0.2)] text-[color:var(--color-admin-warning)]',
      published: 'bg-[rgba(16,185,129,0.2)] text-[color:var(--color-admin-success)]',
      archived: 'bg-[rgba(128,128,128,0.2)] text-[color:var(--color-admin-text-muted)]',
    };
    const labels = {
      draft: 'مسودة',
      published: 'منشور',
      archived: 'مؤرشف',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const columns: Column<Post>[] = [
    {
      key: 'title',
      header: 'العنوان',
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (item) => getStatusBadge(item.status),
    },
    {
      key: 'category',
      header: 'الفئة',
      render: (item) => {
        if (!item.category) return '-';
        const category = typeof item.category === 'object' ? item.category.name : item.category;
        return <span>{category}</span>;
      },
    },
    {
      key: 'createdAt',
      header: 'تاريخ الإنشاء',
      render: (item) => new Date(item.createdAt).toLocaleDateString('ar-SA'),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/blog/posts/${item._id}`)}
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
          إدارة المقالات
        </h1>
        <button
          onClick={() => navigate('/admin/blog/posts/new')}
          className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
        >
          <FiPlus />
          إضافة مقال
        </button>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            placeholder="بحث في المقالات..."
          />
          <FormSelect
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as PostStatus | '');
              setCurrentPage(1);
            }}
            options={[
              { value: '', label: 'جميع الحالات' },
              { value: PostStatus.DRAFT, label: 'مسودة' },
              { value: PostStatus.PUBLISHED, label: 'منشور' },
              { value: PostStatus.ARCHIVED, label: 'مؤرشف' },
            ]}
            placeholder="فلترة حسب الحالة"
          />
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={posts} />
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
        message="هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

