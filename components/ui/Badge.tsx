import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "gold" | "gray" | "red";
  className?: string;
}

const variantStyles = {
  green: { background: "rgba(26,107,60,0.2)", color: "#22874d", border: "1px solid rgba(26,107,60,0.4)" },
  gold: { background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" },
  gray: { background: "rgba(255,255,255,0.06)", color: "#888", border: "1px solid #2a2a2a" },
  red: { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
};

export default function Badge({ children, variant = "gray", className }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold", className)}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
