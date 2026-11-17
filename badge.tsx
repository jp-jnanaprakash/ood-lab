import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold tracking-wide uppercase select-none transition-colors';

  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground border border-border/50',
    outline: 'border border-border text-foreground bg-transparent',
    success: 'bg-success/15 text-success border border-success/30',
    danger: 'bg-danger/15 text-danger border border-danger/30',
    warning: 'bg-warning/15 text-warning border border-warning/30',
    info: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full gap-1',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};

export type OrderStatus =
  | 'PLACED'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REJECTED';

export interface StatusBadgeProps {
  status: OrderStatus | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'md' }) => {
  const upper = status.toUpperCase();

  const config: Record<
    string,
    { label: string; dot: string; bg: string; text: string; border: string }
  > = {
    PLACED: {
      label: 'Order Placed',
      dot: 'bg-blue-500 animate-pulse',
      bg: 'bg-blue-500/10',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-500/20',
    },
    ACCEPTED: {
      label: 'Accepted',
      dot: 'bg-amber-500',
      bg: 'bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/20',
    },
    PREPARING: {
      label: 'Preparing',
      dot: 'bg-orange-500 animate-pulse',
      bg: 'bg-orange-500/10',
      text: 'text-orange-700 dark:text-orange-300',
      border: 'border-orange-500/20',
    },
    READY_FOR_PICKUP: {
      label: 'Ready for Pickup',
      dot: 'bg-indigo-500',
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/20',
    },
    OUT_FOR_DELIVERY: {
      label: 'Out for Delivery',
      dot: 'bg-primary animate-pulse',
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
    },
    DELIVERED: {
      label: 'Delivered',
      dot: 'bg-emerald-500',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/20',
    },
    CANCELLED: {
      label: 'Cancelled',
      dot: 'bg-gray-400',
      bg: 'bg-gray-400/10',
      text: 'text-gray-600 dark:text-gray-400',
      border: 'border-gray-400/20',
    },
    REJECTED: {
      label: 'Rejected',
      dot: 'bg-rose-500',
      bg: 'bg-rose-500/10',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/20',
    },
    PAID: {
      label: 'Paid',
      dot: 'bg-emerald-500',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/20',
    },
    PENDING: {
      label: 'Pending',
      dot: 'bg-amber-500',
      bg: 'bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/20',
    },
  };

  const item = config[upper] || {
    label: upper,
    dot: 'bg-muted-foreground',
    bg: 'bg-muted',
    text: 'text-muted-foreground',
    border: 'border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold border select-none',
        item.bg,
        item.text,
        item.border,
        size === 'sm' ? 'px-2 py-0.5 text-[11px] gap-1.5' : 'px-2.5 py-1 text-xs gap-2',
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', item.dot)} />
      {item.label}
    </span>
  );
};

export interface VegNonVegBadgeProps {
  isVeg: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Authentic Indian standard Veg (green square with circle) / Non-Veg (red square with triangle/circle) badge
 */
export const VegNonVegBadge: React.FC<VegNonVegBadgeProps> = ({
  isVeg,
  showText = false,
  size = 'md',
  className,
}) => {
  const containerSizes = {
    sm: 'h-3.5 w-3.5 border-[1.5px] p-[1.5px] rounded-[3px]',
    md: 'h-4 w-4 border-2 p-[2px] rounded-[4px]',
    lg: 'h-5 w-5 border-2 p-[2.5px] rounded-[5px]',
  };

  const dotSizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5 select-none', className)}>
      <div
        className={cn(
          'flex items-center justify-center shrink-0 bg-card',
          containerSizes[size],
          isVeg ? 'border-veg' : 'border-nonveg'
        )}
        title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
        aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
      >
        <div
          className={cn(
            'rounded-full',
            dotSizes[size],
            isVeg ? 'bg-veg' : 'bg-nonveg'
          )}
        />
      </div>
      {showText && (
        <span
          className={cn(
            'font-bold uppercase tracking-wider text-[11px]',
            isVeg ? 'text-veg' : 'text-nonveg'
          )}
        >
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};
