import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import { useAuthStore } from '../../../store/auth.store';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header 
      className="fixed top-0 right-[260px] left-0 h-16 glass-effect flex items-center justify-between px-6 z-[90]"
      style={{
        borderBottom: '1px solid rgba(90, 90, 136, 0.3)',
        animation: 'fadeIn 0.5s ease-out'
      }}
    >
      <div className="flex items-center gap-4">
        <button
          className="hidden bg-transparent border-0 text-[color:var(--color-admin-text-primary)] text-2xl cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-[rgba(74,158,255,0.1)] hover:scale-110 md:block"
          onClick={onMenuClick}
        >
          <FiMenu />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4a9eff] to-[#6b5eff] flex items-center justify-center">
            <span className="text-white font-bold text-sm">EM</span>
          </div>
          <h1 className="m-0 text-xl font-semibold text-[color:var(--color-admin-text-primary)]">
            لوحة الإدارة
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2 glass-effect rounded-lg px-4 py-2 text-[color:var(--color-admin-text-primary)] cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,158,255,0.2)] hover:scale-105 text-sm font-medium group"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4a9eff] to-[#9d4edd] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <FiUser className="text-white" />
            </div>
            <span className="font-medium hidden sm:inline">{user?.name || 'مستخدم'}</span>
            <FiChevronDown className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <>
              <div 
                className="absolute top-full left-0 mt-2 glass-effect-strong rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] min-w-[220px] z-[1000] overflow-hidden"
                style={{
                  animation: 'scaleIn 0.2s ease-out'
                }}
              >
                {/* User info section with gradient background */}
                <div className="relative px-4 py-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(74,158,255,0.1)] to-[rgba(157,78,221,0.1)]" />
                  <div className="relative flex items-center gap-3 text-[color:var(--color-admin-text-primary)] text-sm">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4a9eff] to-[#9d4edd] flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{user?.name || 'مستخدم'}</div>
                      <div className="text-xs text-[color:var(--color-admin-text-muted)]">{user?.email}</div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[rgba(90,90,136,0.5)] to-transparent my-1" />
                
                {/* Logout button */}
                <button
                  className="flex items-center gap-3 px-4 py-3 text-[color:var(--color-admin-danger)] bg-transparent border-0 w-full text-right cursor-pointer transition-all duration-300 hover:bg-[rgba(239,68,68,0.15)] hover:translate-x-1 text-sm font-medium group"
                  onClick={handleLogout}
                >
                  <FiLogOut className="transition-transform duration-300 group-hover:scale-110" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
              <div
                className="fixed inset-0 z-[999]"
                onClick={() => setShowUserMenu(false)}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
