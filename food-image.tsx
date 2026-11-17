'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Pizza,
  Coffee,
  Soup,
  Flame,
  Sandwich,
  IceCream,
  Salad,
  Cake,
  Fish,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FoodImageProps {
  name: string;
  cuisine?: string;
  src?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  alt?: string;
  badge?: React.ReactNode;
}

interface GradientTheme {
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

function getFoodTheme(name: string, cuisine?: string): GradientTheme {
  const query = `${name} ${cuisine || ''}`.toLowerCase();

  if (query.includes('pizza') || query.includes('pasta') || query.includes('italian')) {
    return {
      gradient: 'from-orange-500 via-rose-500 to-red-600',
      icon: Pizza,
      accentColor: 'text-amber-200',
    };
  }
  if (
    query.includes('burger') ||
    query.includes('sandwich') ||
    query.includes('wrap') ||
    query.includes('roll')
  ) {
    return {
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      icon: Sandwich,
      accentColor: 'text-yellow-200',
    };
  }
  if (
    query.includes('biryani') ||
    query.includes('curry') ||
    query.includes('tandoor') ||
    query.includes('tikka') ||
    query.includes('north indian')
  ) {
    return {
      gradient: 'from-amber-600 via-orange-600 to-red-700',
      icon: Flame,
      accentColor: 'text-yellow-300',
    };
  }
  if (
    query.includes('dosa') ||
    query.includes('idli') ||
    query.includes('vada') ||
    query.includes('south indian')
  ) {
    return {
      gradient: 'from-emerald-500 via-teal-600 to-green-700',
      icon: UtensilsCrossed,
      accentColor: 'text-emerald-100',
    };
  }
  if (
    query.includes('cake') ||
    query.includes('dessert') ||
    query.includes('sweet') ||
    query.includes('pastry') ||
    query.includes('ice cream') ||
    query.includes('waffle')
  ) {
    return {
      gradient: 'from-pink-500 via-rose-500 to-purple-600',
      icon: IceCream,
      accentColor: 'text-pink-100',
    };
  }
  if (
    query.includes('soup') ||
    query.includes('noodle') ||
    query.includes('chinese') ||
    query.includes('asian') ||
    query.includes('dim sum')
  ) {
    return {
      gradient: 'from-red-600 via-rose-700 to-amber-700',
      icon: Soup,
      accentColor: 'text-amber-200',
    };
  }
  if (
    query.includes('salad') ||
    query.includes('healthy') ||
    query.includes('bowl') ||
    query.includes('vegan')
  ) {
    return {
      gradient: 'from-green-500 via-emerald-600 to-teal-700',
      icon: Salad,
      accentColor: 'text-green-100',
    };
  }
  if (
    query.includes('coffee') ||
    query.includes('tea') ||
    query.includes('shake') ||
    query.includes('beverage')
  ) {
    return {
      gradient: 'from-amber-700 via-yellow-800 to-stone-800',
      icon: Coffee,
      accentColor: 'text-amber-200',
    };
  }
  if (query.includes('fish') || query.includes('sea food') || query.includes('prawn')) {
    return {
      gradient: 'from-cyan-600 via-blue-600 to-indigo-700',
      icon: Fish,
      accentColor: 'text-cyan-200',
    };
  }

  // Default warm appetising QuickBite saffron-tomato gradient
  return {
    gradient: 'from-primary via-orange-500 to-amber-600',
    icon: UtensilsCrossed,
    accentColor: 'text-yellow-200',
  };
}

export const FoodImage: React.FC<FoodImageProps> = ({
  name,
  cuisine,
  src,
  aspectRatio = 'square',
  size = 'full',
  className,
  alt,
  badge,
}) => {
  const [imageError, setImageError] = useState(!src);
  const theme = getFoodTheme(name, cuisine);
  const Icon = theme.icon;

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full',
  };

  const sizeClasses = {
    sm: 'h-16 w-16 text-lg',
    md: 'h-24 w-24 text-2xl',
    lg: 'h-36 w-36 text-4xl',
    xl: 'h-48 w-48 text-5xl',
    full: 'w-full h-full',
  };

  const initial = (name.trim()[0] || 'Q').toUpperCase();

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl flex items-center justify-center select-none shadow-soft',
        aspectClasses[aspectRatio],
        sizeClasses[size],
        className
      )}
    >
      {/* If src is provided and loaded successfully */}
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || name}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        /* Rich Appetising Gradient Tile with Food Icon & Micro Pattern */
        <div
          className={cn(
            'relative h-full w-full bg-gradient-to-br flex flex-col items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105',
            theme.gradient
          )}
        >
          {/* Subtle geometric dot/wave texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.7) 1px, transparent 0)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Glowing center aura */}
          <div className="absolute h-24 w-24 rounded-full bg-white/20 blur-xl pointer-events-none" />

          {/* Central Dish Icon & Decorative Initials */}
          <div className="relative z-10 flex flex-col items-center justify-center text-white drop-shadow-md">
            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-lg mb-1.5 transition-transform duration-200 group-hover:rotate-6">
              <Icon className="h-8 w-8 sm:h-10 sm:w-10 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-white/90 drop-shadow">
              {cuisine || name.split(' ')[0]}
            </span>
          </div>

          {/* Subtle initial watermark in corner */}
          <div className="absolute -bottom-2 -right-1 text-7xl font-black text-white/10 font-display select-none pointer-events-none leading-none">
            {initial}
          </div>
        </div>
      )}

      {/* Optional Top Overlay Badge */}
      {badge && (
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
          {badge}
        </div>
      )}
    </div>
  );
};
