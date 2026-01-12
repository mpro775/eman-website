import { errorLogger } from '../services/errorLogger';
import type { AxiosError } from 'axios';
import type { ApiError } from '../types/api.types';

/**
 * Handle API errors and extract user-friendly messages
 */
export const handleApiError = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiError>;

  // Network error
  if (!axiosError.response) {
    errorLogger.logError(
      new Error('Network error'),
      { type: 'network', url: axiosError.config?.url }
    );
    return 'حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.';
  }

  // API error with response
  const status = axiosError.response.status;
  const errorData = axiosError.response.data;

  // Log the error
  errorLogger.logError(
    new Error(errorData?.message || 'API Error'),
    {
      type: 'api',
      status,
      url: axiosError.config?.url,
      response: errorData,
    }
  );

  // Return user-friendly message
  if (errorData?.message) {
    return errorData.message;
  }

  // Default messages based on status code
  switch (status) {
    case 400:
      return 'طلب غير صحيح. يرجى التحقق من البيانات المدخلة.';
    case 401:
      return 'غير مصرح لك بالوصول. يرجى تسجيل الدخول.';
    case 403:
      return 'ليس لديك صلاحية للوصول إلى هذا المورد.';
    case 404:
      return 'المورد المطلوب غير موجود.';
    case 409:
      return 'هناك تعارض في البيانات. يرجى المحاولة مرة أخرى.';
    case 422:
      return 'البيانات المدخلة غير صحيحة. يرجى التحقق من الحقول.';
    case 429:
      return 'تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً.';
    case 500:
      return 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.';
    case 503:
      return 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.';
    default:
      return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
  }
};

/**
 * Handle general errors
 */
export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    errorLogger.logError(error);
    return error.message || 'حدث خطأ غير متوقع.';
  }

  if (typeof error === 'string') {
    errorLogger.logWarning(error);
    return error;
  }

  errorLogger.logError(new Error('Unknown error'), { error });
  return 'حدث خطأ غير متوقع.';
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  const axiosError = error as AxiosError;
  return !axiosError.response && axiosError.request;
};

/**
 * Check if error is a timeout error
 */
export const isTimeoutError = (error: unknown): boolean => {
  const axiosError = error as AxiosError;
  return axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout');
};

