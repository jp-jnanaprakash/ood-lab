import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-warm hover:shadow-glow',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover border border-border/60 shadow-soft',
      outline:
        'bg-transparent border-2 border-primary text-primary hover:bg-primary-subtle',
      ghost:
        'bg-transparent text-foreground hover:bg-muted/70 active:bg-muted',
      danger:
        'bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active shadow-soft',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5 h-8',
      md: 'text-sm px-4 py-2 rounded-lg gap-2 h-10',
      lg: 'text-base px-6 py-3 rounded-xl gap-2.5 h-12 font-semibold',
      icon: 'h-10 w-10 p-0 rounded-lg',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
