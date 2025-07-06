import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  children: ReactNode;
  [key: string]: any;
}

export function NeonButton({
  as: Component = "button",
  className,
  children,
  ...rest
}: NeonButtonProps) {
  return (
    <Component
      className={`btn-primary glass-neon-border ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
