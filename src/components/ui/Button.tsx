import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark disabled:bg-text-disabled",
  secondary:
    "bg-surface text-text-primary border border-border hover:bg-bg",
  tertiary:
    "bg-transparent text-primary hover:underline px-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-caption",
  md: "h-10 px-4 text-body",
};

/**
 * Section 24: only one primary (filled) button per section. Prefer
 * `secondary` or `tertiary` for every other action on a screen.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", size = "md", className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          variant !== "tertiary" && sizeClasses[size],
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
