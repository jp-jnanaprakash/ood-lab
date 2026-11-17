'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  position?: 'bottom' | 'right' | 'left';
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  position = 'bottom',
  children,
  footer,
  className,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const positionStyles = {
    bottom:
      'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl border-t border-border animate-slideUp',
    right:
      'top-0 right-0 bottom-0 w-full sm:max-w-md border-l border-border rounded-l-3xl animate-slideDown',
    left:
      'top-0 left-0 bottom-0 w-full sm:max-w-md border-r border-border rounded-r-3xl animate-slideDown',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          'fixed bg-card text-card-foreground shadow-elevated z-10 flex flex-col overflow-hidden',
          positionStyles[position],
          className
        )}
      >
        {/* Mobile Pull Handle for bottom drawer */}
        {position === 'bottom' && (
          <div className="w-full flex justify-center pt-3 pb-1 cursor-grab">
            <div className="w-12 h-1.5 rounded-full bg-border-subtle" />
          </div>
        )}

        {/* Header */}
        <div className="p-5 pb-3 border-b border-border/60 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-bold font-display text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-5 pt-3 border-t border-border/60 bg-muted/20">{footer}</div>
        )}
      </div>
    </div>
  );
};
