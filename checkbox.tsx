import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, checked, defaultChecked, disabled, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const [isChecked, setIsChecked] = React.useState<boolean>(Boolean(checked ?? defaultChecked));

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(Boolean(checked));
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'flex items-start gap-2.5 cursor-pointer select-none group',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center mt-0.5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-5 w-5 rounded-md border transition-all duration-200 flex items-center justify-center',
              isChecked
                ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                : 'bg-card border-border group-hover:border-primary/50'
            )}
          >
            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-foreground leading-snug">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground mt-0.5">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
