import { InputHTMLAttributes } from "react";

export function GlassInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`input-glass ${className ?? ""}`} {...props} />;
}
