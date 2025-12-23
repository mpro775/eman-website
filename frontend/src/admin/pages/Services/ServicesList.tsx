import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { servicesService } from '../../../services/services.service';
import type { Service } from '../../../types/service.types';

export const ServicesList = () => {
  const navigate = useNavigate();
  const { showToast } = useUIStore();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesService.getAll();
      setServices(data || []);
    } catch (error: any) {
      showToast('فشل تحميل الخدمات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await servicesService.delete(deleteId);
      showToast('تم حذف الخدمة بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchServices();
    } catch (error: any) {
      showToast('فشل حذف الخدمة', 'error');
    }
  };

  const columns: Column<Service>[] = [
    {
      key: 'icon',
      header: 'الأيقونة',
      render: (item) => (
        item.icon ? (
          <img
            src={item.icon}
            alt={item.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[rgba(74,158,255,0.1)] to-[rgba(157,78,221,0.1)] flex items-center justify-center text-[color:var(--color-admin-text-muted)]">
            <span className="text-xs">لا يوجد</span>
          </div>
        )
      ),
    },
    { key: 'name', header: 'الاسم' },
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
      key: 'isPublished',
      header: 'الحالة',
      render: (item) => {
        const isPublished = item.isPublished;
        return (
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              isPublished
                ? 'bg-gradient-to-r from-[rgba(16,185,129,0.15)] to-[rgba(16,185,129,0.25)] text-[#10b981] border border-[rgba(16,185,129,0.3)]'
                : 'bg-gradient-to-r from-[rgba(128,128,128,0.15)] to-[rgba(128,128,128,0.25)] text-[color:var(--color-admin-text-muted)] border border-[rgba(128,128,128,0.3)]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ml-2 ${
              isPublished ? 'bg-[#10b981] animate-pulse' : 'bg-[color:var(--color-admin-text-muted)]'
            }`} />
            {isPublished ? 'منشور' : 'مسودة'}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/services/${item._id}`)}
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
            إدارة الخدمات
          </h1>
          <p className="text-sm text-[color:var(--color-admin-text-muted)]"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            إضافة وتعديل خدمات الموقع
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/services/new')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4a9eff] to-[#6b5eff] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,158,255,0.4)] hover:scale-105 hover:-translate-y-0.5"
          style={{ animation: 'slideUp 0.5s ease-out' }}
        >
          <FiPlus className="text-lg" />
          إضافة خدمة
        </button>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <DataTable columns={columns} data={services} />
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
        message="هل أنت متأكد من حذف هذه الخدمة؟"
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

