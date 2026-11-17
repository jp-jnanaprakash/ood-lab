import React from 'react';
import { ShoppingBag, UtensilsCrossed, Search, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface EmptyStateProps {
  icon?: 'cart' | 'restaurant' | 'search' | 'orders' | React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'cart',
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon;

    const iconClasses = 'h-10 w-10 text-primary';
    switch (icon) {
      case 'cart':
        return <ShoppingBag className={iconClasses} />;
      case 'restaurant':
        return <UtensilsCrossed className={iconClasses} />;
      case 'search':
        return <Search className={iconClasses} />;
      case 'orders':
        return <Clock className={iconClasses} />;
      default:
        return <ShoppingBag className={iconClasses} />;
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-card border border-border/60 shadow-soft max-w-md mx-auto my-6',
        className
      )}
    >
      <div className="h-20 w-20 rounded-2xl bg-primary-subtle border border-primary/20 flex items-center justify-center mb-5 shadow-inner">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-bold font-display text-foreground leading-snug">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
        {description}
      </p>
      {actionText && (
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
