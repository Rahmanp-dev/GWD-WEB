import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  motionProps?: any;
}

export function GlassCard({
  children,
  className,
  motionProps,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`glass-panel ${className ?? ""}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
