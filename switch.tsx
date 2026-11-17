import React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  checked,
  defaultChecked,
  disabled,
  onChange,
  label,
  description,
  className,
}) => {
  const generatedId = React.useId();
  const switchId = id || generatedId;
  const [isOn, setIsOn] = React.useState<boolean>(Boolean(checked ?? defaultChecked));

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsOn(Boolean(checked));
    }
  }, [checked]);

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (checked === undefined) {
      setIsOn(next);
    }
    onChange?.(next);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {(label || description) && (
        <div className="flex flex-col cursor-pointer" onClick={toggle}>
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      )}
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isOn ? 'bg-primary' : 'bg-muted border-border',
          disabled && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
            isOn ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};

Switch.displayName = 'Switch';
