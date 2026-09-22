import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-gold-400 to-gold-600 text-evergreen-950 shadow-lg shadow-gold-600/20 hover:brightness-105 active:brightness-95",
  secondary: "bg-evergreen-800 text-cream hover:bg-evergreen-700 border border-evergreen-600/60",
  ghost: "bg-transparent text-cream hover:bg-white/10",
  outline: "bg-transparent text-cream border border-cream/30 hover:border-gold-400 hover:text-gold-400",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: "md" | "lg" | "sm";
  className?: string;
  children: React.ReactNode;
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-base",
  lg: "px-7 py-4 text-base sm:text-lg",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { href: string } & React.ComponentPropsWithoutRef<"a">) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("sms:") || href.startsWith("mailto:");
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export function ButtonAsButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
