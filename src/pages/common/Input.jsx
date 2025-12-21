import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(
  (
    {
      className,
      type = "text",
      label,
      error,
      success,
      helperText,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id || props.name} className="block text-sm text-gray-300 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(
            "w-full rounded-md border bg-neutral-900 text-gray-100 px-3 py-2 text-sm outline-hidden transition",
            "placeholder:text-gray-500",
            error && "border-red-500 focus:border-red-400",
            success && "border-green-500 focus:border-green-400",
            !error && !success && "border-gray-700 focus:border-teal-500",
            className
          )}
        />

        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-400">{errorMessage}</p>
        )}

        {!error && helperText && (
          <p className="mt-1 text-xs text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
const Textarea = forwardRef(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      errorMessage,
      rows = 4,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id || props.name} className="block text-sm text-gray-300 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          {...props}
          className={cn(
            "w-full rounded-md border bg-neutral-900 text-gray-100 px-3 py-2 text-sm outline-hidden resize-none transition",
            "placeholder:text-gray-500",
            error && "border-red-500 focus:border-red-400",
            success && "border-green-500 focus:border-green-400",
            !error && !success && "border-gray-700 focus:border-teal-500",
            className
          )}
        />

        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-400">{errorMessage}</p>
        )}

        {!error && helperText && (
          <p className="mt-1 text-xs text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea,Input };
