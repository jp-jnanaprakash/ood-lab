import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps {
  value: number; // 0 to 5
  max?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  reviewCount,
  size = 'md',
  showBadge = false,
  className,
}) => {
  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
  };

  if (showBadge) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 bg-emerald-600 text-white font-bold rounded-lg px-2 py-0.5 shadow-sm select-none',
          textSizes[size],
          className
        )}
      >
        <span>{value > 0 ? value.toFixed(1) : 'NEW'}</span>
        <Star className={cn('fill-white stroke-white', iconSizes[size])} />
        {reviewCount !== undefined && (
          <span className="text-[11px] font-normal opacity-90 ml-1">
            ({reviewCount})
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('inline-flex items-center gap-1.5 select-none', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, index) => {
          const starVal = index + 1;
          const isFull = value >= starVal;
          const isHalf = !isFull && value >= index + 0.5;

          return (
            <div key={index} className="relative">
              <Star
                className={cn(
                  iconSizes[size],
                  'text-amber-400 stroke-amber-400',
                  isFull
                    ? 'fill-amber-400'
                    : isHalf
                    ? 'fill-amber-400/50'
                    : 'fill-transparent text-muted-foreground/30 stroke-muted-foreground/30'
                )}
              />
            </div>
          );
        })}
      </div>
      <span className={cn('text-foreground font-semibold', textSizes[size])}>
        {value.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
};

export interface RatingInputProps {
  value: number;
  onChange: (val: number) => void;
  max?: number;
  size?: 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  value,
  onChange,
  max = 5,
  size = 'lg',
  className,
  disabled = false,
}) => {
  const [hoverVal, setHoverVal] = useState<number | null>(null);

  const iconSizes = {
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      {Array.from({ length: max }).map((_, index) => {
        const rating = index + 1;
        const active = (hoverVal ?? value) >= rating;

        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onChange(rating)}
            onMouseEnter={() => !disabled && setHoverVal(rating)}
            onMouseLeave={() => !disabled && setHoverVal(null)}
            className={cn(
              'p-1 transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md cursor-pointer',
              !disabled && 'hover:scale-110 active:scale-95',
              disabled && 'cursor-not-allowed opacity-60'
            )}
            aria-label={`Rate ${rating} star${rating > 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                iconSizes[size],
                'transition-colors duration-150',
                active
                  ? 'fill-amber-400 text-amber-400 stroke-amber-400 drop-shadow-sm'
                  : 'fill-transparent text-muted-foreground/40 stroke-muted-foreground/40'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
