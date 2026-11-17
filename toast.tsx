'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  toasts: ToastItem[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, variant = 'info', duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, message, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      {children}
      {/* Toast Notification Container */}
      <aside
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2 sm:p-0"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-elevated bg-card text-card-foreground animate-slideUp transition-all duration-200',
              item.variant === 'success' && 'border-success/40 bg-card',
              item.variant === 'error' && 'border-danger/40 bg-card',
              item.variant === 'warning' && 'border-warning/40 bg-card',
              item.variant === 'info' && 'border-primary/40 bg-card'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {item.variant === 'success' && (
                <CheckCircle2 className="h-5 w-5 text-success" />
              )}
              {item.variant === 'error' && (
                <AlertCircle className="h-5 w-5 text-danger" />
              )}
              {item.variant === 'warning' && (
                <AlertTriangle className="h-5 w-5 text-warning" />
              )}
              {item.variant === 'info' && (
                <Info className="h-5 w-5 text-primary" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground leading-snug">
                {item.title}
              </h4>
              {item.message && (
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {item.message}
                </p>
              )}
            </div>

            <button
              onClick={() => dismiss(item.id)}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
