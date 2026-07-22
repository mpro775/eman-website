interface ErrorContext {
  componentStack?: string;
  errorBoundary?: boolean;
  userId?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
  [key: string]: unknown;
}

class ErrorLogger {
  private isDevelopment = import.meta.env.DEV;
  private isProduction = import.meta.env.PROD;

  /**
   * Log an error with context
   */
  logError(error: Error, context: ErrorContext = {}): void {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Always log to console in development
    if (this.isDevelopment) {
      console.error('🚨 Error Logged:', errorInfo);
    }

    // In production, you can send to error tracking service
    if (this.isProduction) {
      this.sendToErrorService(errorInfo);
    }

    // Store in localStorage for debugging (last 5 errors)
    this.storeError(errorInfo);
  }

  /**
   * Log a warning
   */
  logWarning(message: string, context: ErrorContext = {}): void {
    const warningInfo = {
      message,
      ...context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    if (this.isDevelopment) {
      console.warn('⚠️ Warning:', warningInfo);
    }

    if (this.isProduction) {
      // Send to monitoring service if needed
      this.sendToErrorService(warningInfo, 'warning');
    }
  }

  /**
   * Log an info message
   */
  logInfo(message: string, context: ErrorContext = {}): void {
    const info = {
      message,
      ...context,
      timestamp: new Date().toISOString(),
    };

    if (this.isDevelopment) {
      console.info('ℹ️ Info:', info);
    }
  }

  /**
   * Send error to external error tracking service
   * You can integrate with Sentry, LogRocket, etc.
   */
  private sendToErrorService(errorInfo: Record<string, unknown>, level: 'error' | 'warning' = 'error'): void {
    // TODO: Integrate with error tracking service (e.g., Sentry)
    // Example:
    // if (window.Sentry) {
    //   window.Sentry.captureException(new Error(errorInfo.message), {
    //     extra: errorInfo,
    //     level,
    //   });
    // }

    // For now, just log to console in production
    if (this.isProduction && level === 'error') {
      // You can also send to your backend API
      this.sendToBackend(errorInfo);
    }
  }

  /**
   * Send error to backend API
   */
  private async sendToBackend(errorInfo: Record<string, unknown>): Promise<void> {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.emanjameel.pro/api';
      if (apiUrl) {
        const cleanUrl = apiUrl.replace(/\/$/, '');
        await fetch(`${cleanUrl}/errors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorInfo),
        }).catch(() => {
          // Silently ignore network failures for error logging
        });
      }
    } catch {
      // Silently fail if fetch or JSON fails
    }
  }

  /**
   * Store error in localStorage for debugging
   */
  private storeError(errorInfo: Record<string, unknown>): void {
    try {
      const stored = localStorage.getItem('errorLogs');
      const errors: Array<Record<string, unknown>> = stored ? JSON.parse(stored) : [];
      
      // Keep only last 5 errors
      errors.unshift(errorInfo);
      if (errors.length > 5) {
        errors.pop();
      }

      localStorage.setItem('errorLogs', JSON.stringify(errors));
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  /**
   * Get stored errors from localStorage
   */
  getStoredErrors(): Array<Record<string, unknown>> {
    try {
      const stored = localStorage.getItem('errorLogs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear stored errors
   */
  clearStoredErrors(): void {
    try {
      localStorage.removeItem('errorLogs');
    } catch {
      // Silently fail
    }
  }
}

export const errorLogger = new ErrorLogger();

