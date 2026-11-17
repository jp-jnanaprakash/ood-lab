import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      id,
      disabled,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const [length, setLength] = React.useState<number>(
      typeof value === 'string'
        ? value.length
        : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLength(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="text-xs font-semibold text-foreground/80 tracking-wide uppercase select-none"
            >
              {label}
            </label>
          )}
          {showCount && maxLength && (
            <span className="text-xs text-muted-foreground ml-auto">
              {length}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            'w-full bg-card text-foreground placeholder:text-muted-foreground text-sm rounded-lg border border-border p-3 transition-all duration-200 outline-none resize-y',
            'focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-soft',
            'disabled:opacity-50 disabled:bg-muted/50 disabled:cursor-not-allowed',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-danger font-medium animate-fadeIn">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
