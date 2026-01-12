import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';
import { Toast } from '../ui/Toast';
import { useUIStore } from '../../../store/ui.store';
import { ErrorBoundary } from '../../../components/common';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, removeToast } = useUIStore();

  return (
    <ErrorBoundary>
      <div className="bg-[color:var(--color-admin-bg-primary)] text-[color:var(--color-admin-text-primary)] min-h-screen" dir="rtl">
      <Sidebar />
      <div className="mr-[260px] min-h-screen transition-all duration-300">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mt-16 p-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      </div>
    </ErrorBoundary>
  );
};
