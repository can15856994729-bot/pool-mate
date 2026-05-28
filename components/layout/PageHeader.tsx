"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

export default function PageHeader({
  title,
  showBack = true,
  right,
  className,
  transparent = false,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center h-14 px-4",
        !transparent && "border-b",
        className
      )}
      style={{
        background: transparent ? "transparent" : "rgba(13,13,13,0.95)",
        backdropFilter: transparent ? "none" : "blur(12px)",
        borderColor: "#2a2a2a",
      }}
    >
      {/* 返回按钮 */}
      {showBack ? (
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{ color: "#f0f0f0" }}
        >
          <ChevronLeft size={24} />
        </button>
      ) : (
        <div className="w-9" />
      )}

      {/* 标题 */}
      <h1 className="flex-1 text-center font-bold text-base" style={{ color: "#f0f0f0" }}>
        {title}
      </h1>

      {/* 右侧插槽 */}
      <div className="w-9 flex justify-end">{right}</div>
    </header>
  );
}
