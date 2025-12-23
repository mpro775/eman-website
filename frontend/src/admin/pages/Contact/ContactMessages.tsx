import { useState, useEffect } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Pagination } from '../../components/tables/Pagination';
import { FormSelect } from '../../components/forms/FormSelect';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { contactService } from '../../../services/contact.service';
import { type ContactMessage, MessageStatus } from '../../../types/contact.types';

export const ContactMessages = () => {
  const { showToast } = useUIStore();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusFilter, setStatusFilter] = useState<MessageStatus | ''>('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchMessages();
  }, [currentPage, statusFilter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await contactService.getMessages(
        currentPage,
        limit,
        statusFilter || undefined
      );
      setMessages(response.data || []);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error: any) {
      showToast('فشل تحميل الرسائل', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: MessageStatus) => {
    try {
      await contactService.updateStatus(id, status);
      showToast('تم تحديث حالة الرسالة بنجاح', 'success');
      fetchMessages();
    } catch (error: any) {
      showToast('فشل تحديث حالة الرسالة', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await contactService.delete(deleteId);
      showToast('تم حذف الرسالة بنجاح', 'success');
      setShowDeleteDialog(false);
      setDeleteId(null);
      fetchMessages();
    } catch (error: any) {
      showToast('فشل حذف الرسالة', 'error');
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    const badges = {
      new: 'bg-[rgba(74,158,255,0.2)] text-[color:var(--color-admin-info)]',
      read: 'bg-[rgba(16,185,129,0.2)] text-[color:var(--color-admin-success)]',
      replied: 'bg-[rgba(245,158,11,0.2)] text-[color:var(--color-admin-warning)]',
      archived: 'bg-[rgba(128,128,128,0.2)] text-[color:var(--color-admin-text-muted)]',
    };
    const labels = {
      new: 'جديد',
      read: 'مقروء',
      replied: 'تم الرد',
      archived: 'مؤرشف',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const columns: Column<ContactMessage>[] = [
    {
      key: 'fullName',
      header: 'الاسم',
    },
    {
      key: 'email',
      header: 'البريد الإلكتروني',
    },
    {
      key: 'subject',
      header: 'الموضوع',
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (item) => getStatusBadge(item.status),
    },
    {
      key: 'createdAt',
      header: 'التاريخ',
      render: (item) => new Date(item.createdAt).toLocaleDateString('ar-SA'),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedMessage(item);
              setShowModal(true);
            }}
            className="w-8 h-8 flex items-center justify-center bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150"
          >
            <FiEye />
          </button>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item._id, e.target.value as MessageStatus)}
            className="px-2 py-1 text-xs bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded text-[color:var(--color-admin-text-primary)]"
          >
            <option value={MessageStatus.NEW}>جديد</option>
            <option value={MessageStatus.READ}>مقروء</option>
            <option value={MessageStatus.REPLIED}>تم الرد</option>
            <option value={MessageStatus.ARCHIVED}>مؤرشف</option>
          </select>
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
      <h1 className="text-2xl font-bold text-[color:var(--color-admin-text-primary)] mb-6">
        إدارة الرسائل
      </h1>

      <Card className="mb-6">
        <FormSelect
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as MessageStatus | '');
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'جميع الرسائل' },
            { value: MessageStatus.NEW, label: 'جديد' },
            { value: MessageStatus.READ, label: 'مقروء' },
            { value: MessageStatus.REPLIED, label: 'تم الرد' },
            { value: MessageStatus.ARCHIVED, label: 'مؤرشف' },
          ]}
          placeholder="فلترة حسب الحالة"
        />
      </Card>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={messages} />
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

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMessage(null);
        }}
        title="تفاصيل الرسالة"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[color:var(--color-admin-text-secondary)] mb-1">الاسم</p>
              <p className="text-[color:var(--color-admin-text-primary)]">
                {selectedMessage.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm text-[color:var(--color-admin-text-secondary)] mb-1">
                البريد الإلكتروني
              </p>
              <p className="text-[color:var(--color-admin-text-primary)]">
                {selectedMessage.email}
              </p>
            </div>
            {selectedMessage.phone && (
              <div>
                <p className="text-sm text-[color:var(--color-admin-text-secondary)] mb-1">
                  الهاتف
                </p>
                <p className="text-[color:var(--color-admin-text-primary)]">
                  {selectedMessage.phone}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-[color:var(--color-admin-text-secondary)] mb-1">
                الموضوع
              </p>
              <p className="text-[color:var(--color-admin-text-primary)]">
                {selectedMessage.subject}
              </p>
            </div>
            <div>
              <p className="text-sm text-[color:var(--color-admin-text-secondary)] mb-1">
                الرسالة
              </p>
              <p className="text-[color:var(--color-admin-text-primary)] whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>
            <div>
              <p className="text-sm text-[color:var(--color-admin-text-secondary)] mb-1">
                التاريخ
              </p>
              <p className="text-[color:var(--color-admin-text-primary)]">
                {new Date(selectedMessage.createdAt).toLocaleString('ar-SA')}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeleteId(null);
        }}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذه الرسالة؟"
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
};

