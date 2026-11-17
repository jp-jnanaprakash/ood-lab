import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  shimmer = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted/70 rounded-md',
        shimmer &&
          'after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-card/50 after:to-transparent',
        className
      )}
      {...props}
    />
  );
};

export const SkeletonRestaurantCard: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl border border-border/70 p-3 flex flex-col gap-3 shadow-soft">
      {/* Image Skeleton */}
      <Skeleton className="h-44 w-full rounded-xl" />
      {/* Title & Rating */}
      <div className="flex items-center justify-between px-1">
        <Skeleton className="h-5 w-3/5 rounded-md" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      {/* Cuisine & Delivery Time */}
      <div className="flex items-center justify-between px-1">
        <Skeleton className="h-4 w-2/5 rounded-md" />
        <Skeleton className="h-4 w-1/4 rounded-md" />
      </div>
      {/* Price tag */}
      <div className="px-1 pt-1 border-t border-border/40">
        <Skeleton className="h-4 w-1/3 rounded-md" />
      </div>
    </div>
  );
};

export const SkeletonMenuItem: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl border border-border/70 p-4 flex items-center justify-between gap-4 shadow-soft">
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-6 rounded-sm" />
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-3 w-4/5 rounded-md mt-1" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-24 w-24 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-lg -mt-4 shadow-md" />
      </div>
    </div>
  );
};
