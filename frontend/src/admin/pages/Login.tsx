import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useUIStore } from '../../store/ui.store';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { showToast } = useUIStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      showToast('تم تسجيل الدخول بنجاح', 'success');
      navigate('/admin');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[color:var(--color-admin-bg-primary)] to-[color:var(--color-admin-bg-secondary)] p-5" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-2xl p-10 shadow-[0_20px_25px_rgba(0,0,0,0.6)]">
          <div className="text-center mb-8">
            <h1 className="m-0 mb-2 text-3xl font-bold text-[color:var(--color-admin-text-primary)]">
              تسجيل الدخول
            </h1>
            <p className="m-0 text-sm text-[color:var(--color-admin-text-secondary)]">
              مرحباً بك في لوحة الإدارة
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-300 focus:outline-none focus:border-[color:var(--color-admin-border-focus)] focus:shadow-[0_0_0_3px_rgba(74,158,255,0.1)] placeholder:text-[color:var(--color-admin-text-muted)] disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="أدخل بريدك الإلكتروني"
                disabled={isSubmitting || isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-300 focus:outline-none focus:border-[color:var(--color-admin-border-focus)] focus:shadow-[0_0_0_3px_rgba(74,158,255,0.1)] placeholder:text-[color:var(--color-admin-text-muted)] disabled:opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="أدخل كلمة المرور"
                disabled={isSubmitting || isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg px-4 py-3 font-medium text-sm transition-all duration-150 hover:bg-[#3A8EFF] hover:shadow-[0_0_10px_rgba(74,158,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
