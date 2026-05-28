"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Swords, Store, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const navItems = [
  { href: "/",           label: "首页", icon: Home  },
  { href: "/companions", label: "球伴", icon: Users },
  { href: "/games",      label: "球局", icon: Swords },
  { href: "/venues",     label: "球房", icon: Store },
  { href: "/profile",    label: "我的", icon: User  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50"
      style={{
        background: "rgba(10,10,10,0.96)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid #1e1e1e",
      }}
    >
      <div className="flex items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const isProfile = href === "/profile";

          return (
            <Link
              key={href}
              href={href}
              className="relative flex-1 flex flex-col items-center justify-center gap-[3px] py-3 transition-colors active:opacity-70"
              style={{ color: isActive ? "#1a6b3c" : "#444" }}
            >
              {/* 顶部绿线 */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #1a6b3c 0%, #c9a84c 100%)" }}
                />
              )}

              {/* 图标 + 未登录红点 */}
              <div className="relative">
                <Icon size={21} strokeWidth={isActive ? 2.3 : 1.7} />
                {isProfile && !isLoggedIn && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                    style={{ background: "#f87171", border: "1.5px solid #0a0a0a" }}
                  />
                )}
              </div>

              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? "#1a6b3c" : "#444" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
    </nav>
  );
}
