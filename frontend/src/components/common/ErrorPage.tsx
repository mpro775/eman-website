import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import Button from '../ui/Button';

interface ErrorPageProps {
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
  onReset?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, errorInfo, onReset }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    if (onReset) {
      onReset();
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <FiAlertCircle className="text-6xl text-accent-pink mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-lg text-text-secondary mb-2">
            نعتذر، حدث خطأ أثناء تحميل الصفحة
          </p>
          <p className="text-sm text-text-muted">
            تم تسجيل الخطأ وسنعمل على إصلاحه في أقرب وقت ممكن
          </p>
        </div>

        {import.meta.env.DEV && error && (
          <div className="mb-8 p-4 bg-bg-secondary rounded-lg text-right border border-accent-pink/20">
            <h2 className="text-lg font-semibold text-accent-pink mb-2">تفاصيل الخطأ (Development Only):</h2>
            <pre className="text-xs text-text-secondary overflow-auto max-h-64 p-3 bg-bg-tertiary rounded">
              <code>{error.toString()}</code>
              {errorInfo?.componentStack && (
                <div className="mt-4">
                  <strong>Component Stack:</strong>
                  <pre className="mt-2 whitespace-pre-wrap">{errorInfo.componentStack}</pre>
                </div>
              )}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="primary"
            onClick={handleGoHome}
            icon={<FiHome />}
            iconPosition="right"
          >
            العودة للصفحة الرئيسية
          </Button>
          <Button
            variant="secondary"
            onClick={handleReload}
            icon={<FiRefreshCw />}
            iconPosition="right"
          >
            إعادة تحميل الصفحة
          </Button>
        </div>

        <div className="mt-8 text-sm text-text-muted">
          <p>إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

