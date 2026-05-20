import React, { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { startProgressLoop, stopProgressLoop } from '../utils/soundManager';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string | null;
  setLoading: (loading: boolean, message?: string) => void;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const loadingDepthRef = useRef(0);

  const setLoading = useCallback((loading: boolean, message?: string) => {
    setIsLoading(loading);
    setLoadingMessage(message || null);

    // Keep loop in sync even for direct setLoading usage (used in Admin).
    if (loading) {
      if (loadingDepthRef.current === 0) startProgressLoop({ volume: 0.6 });
      loadingDepthRef.current = Math.max(1, loadingDepthRef.current);
    } else {
      loadingDepthRef.current = 0;
      stopProgressLoop();
    }
  }, []);

  const startLoading = useCallback((message?: string) => {
    loadingDepthRef.current += 1;
    setIsLoading(true);
    setLoadingMessage(message || null);
    // Start loop only on the first start call.
    if (loadingDepthRef.current === 1) {
      startProgressLoop({ volume: 0.6 });
    }
  }, []);

  const stopLoading = useCallback(() => {
    loadingDepthRef.current = Math.max(0, loadingDepthRef.current - 1);
    if (loadingDepthRef.current === 0) {
      setIsLoading(false);
      setLoadingMessage(null);
      stopProgressLoop();
    }
  }, []);

  const value: LoadingContextType = {
    isLoading,
    loadingMessage,
    setLoading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <GlobalLoadingSpinner message={loadingMessage} />}
    </LoadingContext.Provider>
  );
};

interface GlobalLoadingSpinnerProps {
  message: string | null;
}

const GlobalLoadingSpinner: React.FC<GlobalLoadingSpinnerProps> = ({ message }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="bg-bg-secondary rounded-lg p-6 shadow-lg border border-accent-pink/20 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-accent-pink/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-accent-pink rounded-full animate-spin" />
          </div>
          {message && (
            <p className="text-text-primary text-center font-arabic text-sm">
              {message}
            </p>
          )}
          {!message && (
            <p className="text-text-primary text-center font-arabic text-sm">
              جاري التحميل...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

