import { useState, useEffect } from 'react';
import { DataTable, type Column } from '../../components/tables/DataTable';
import { Pagination } from '../../components/tables/Pagination';
import { SearchBar } from '../../components/tables/SearchBar';
import { FormSelect } from '../../components/forms/FormSelect';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import { newsletterService } from '../../../services/newsletter.service';
import { type NewsletterSubscriber, SubscriberStatus } from '../../../types/newsletter.types';

export const NewsletterSubscribers = () => {
  const { showToast } = useUIStore();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubscriberStatus | ''>('');

  const limit = 10;

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, search, statusFilter]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await newsletterService.getSubscribers({
        page: currentPage,
        limit,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });
      setSubscribers(response.data || []);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error: any) {
      showToast('فشل تحميل المشتركين', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: SubscriberStatus) => {
    const isSubscribed = status === SubscriberStatus.SUBSCRIBED;
    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
          isSubscribed
            ? 'bg-gradient-to-r from-[rgba(16,185,129,0.15)] to-[rgba(16,185,129,0.25)] text-[#10b981] border border-[rgba(16,185,129,0.3)]'
            : 'bg-gradient-to-r from-[rgba(128,128,128,0.15)] to-[rgba(128,128,128,0.25)] text-[color:var(--color-admin-text-muted)] border border-[rgba(128,128,128,0.3)]'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ml-2 ${
          isSubscribed ? 'bg-[#10b981] animate-pulse' : 'bg-[color:var(--color-admin-text-muted)]'
        }`} />
        {isSubscribed ? 'مشترك' : 'غير مشترك'}
      </span>
    );
  };

  const columns: Column<NewsletterSubscriber>[] = [
    { key: 'email', header: 'البريد الإلكتروني' },
    {
      key: 'status',
      header: 'الحالة',
      render: (item) => getStatusBadge(item.status),
    },
    {
      key: 'createdAt',
      header: 'تاريخ الاشتراك',
      render: (item) => new Date(item.createdAt).toLocaleDateString('ar-SA'),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-admin-text-primary)] mb-2"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          إدارة المشتركين في النشرة الإخبارية
        </h1>
        <p className="text-sm text-[color:var(--color-admin-text-muted)]"
          style={{ animation: 'slideUp 0.4s ease-out' }}
        >
          عرض وإدارة قائمة المشتركين في النشرة الإخبارية
        </p>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            placeholder="بحث في المشتركين..."
          />
          <FormSelect
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as SubscriberStatus | '');
              setCurrentPage(1);
            }}
            options={[
              { value: '', label: 'جميع المشتركين' },
              { value: SubscriberStatus.SUBSCRIBED, label: 'مشترك' },
              { value: SubscriberStatus.UNSUBSCRIBED, label: 'غير مشترك' },
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
            <DataTable columns={columns} data={subscribers} />
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
    </div>
  );
};

