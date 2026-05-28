"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Calendar, Package, Wallet, Star, ShieldCheck,
  UserPlus, HeadphonesIcon, ScrollText, ChevronRight, LogIn
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

// Mock 当前用户
const MOCK_USER = {
  id: "u1",
  name: "台球爱好者",
  avatar: "https://i.pravatar.cc/300?img=23",
  phone: "138****8888",
  isCompanion: false,
  wallet: 120,
};

const menuItems = [
  { icon: Calendar, label: "我的预约", href: "/orders", badge: "2" },
  { icon: Package, label: "我的订单", href: "/orders" },
  { icon: Wallet, label: "我的钱包", href: "#", sub: `余额 ¥${MOCK_USER.wallet}` },
  { icon: Star, label: "我的评价", href: "#" },
  { icon: ShieldCheck, label: "实名认证", href: "#", sub: "未认证" },
];

const bottomItems = [
  { icon: UserPlus, label: "成为陪练",     href: "/join", highlight: true },
  { icon: HeadphonesIcon, label: "客服中心", href: "#" },
  { icon: ScrollText, label: "安全规则", href: "#" },
];

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="我的" showBack={false} />

      <div className="px-4 py-4">

        {/* 用户信息卡 */}
        <div className="p-4 rounded-2xl mb-6"
          style={{ background: "linear-gradient(135deg, #1a3d28, #0f2a1a)", border: "1px solid #1a6b3c33" }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2" style={{ borderColor: "#1a6b3c" }}>
                <Image src={MOCK_USER.avatar} alt={MOCK_USER.name} width={64} height={64} className="object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-black text-lg" style={{ color: "#f0f0f0" }}>{MOCK_USER.name}</p>
              <p className="text-xs" style={{ color: "#888" }}>{MOCK_USER.phone}</p>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}>
                普通用户
              </span>
            </div>
            <ChevronRight size={18} color="#555" />
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(26,107,60,0.3)" }}>
            {[
              { label: "订单", value: "3" },
              { label: "收藏", value: "5" },
              { label: "评价", value: "1" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-black text-xl" style={{ color: "#f0f0f0" }}>{value}</p>
                <p className="text-[10px]" style={{ color: "#888" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 主菜单 */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid #2a2a2a" }}>
          {menuItems.map(({ icon: Icon, label, href, badge, sub }, i) => (
            <Link key={label} href={href}>
              <div
                className="flex items-center gap-3 px-4 py-4 transition-colors"
                style={{
                  background: "#1c1c1c",
                  borderBottom: i < menuItems.length - 1 ? "1px solid #2a2a2a" : "none",
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(26,107,60,0.15)" }}>
                  <Icon size={16} color="#1a6b3c" />
                </div>
                <span className="flex-1 text-sm font-semibold" style={{ color: "#f0f0f0" }}>{label}</span>
                {badge && (
                  <span className="text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#1a6b3c", color: "#f0f0f0" }}>
                    {badge}
                  </span>
                )}
                {sub && <span className="text-xs" style={{ color: "#555" }}>{sub}</span>}
                <ChevronRight size={15} color="#555" />
              </div>
            </Link>
          ))}
        </div>

        {/* 底部菜单 */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #2a2a2a" }}>
          {bottomItems.map(({ icon: Icon, label, href, highlight }, i) => (
            <Link key={label} href={href}>
              <div
                className="flex items-center gap-3 px-4 py-4 transition-colors"
                style={{
                  background: "#1c1c1c",
                  borderBottom: i < bottomItems.length - 1 ? "1px solid #2a2a2a" : "none",
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: highlight ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)" }}>
                  <Icon size={16} color={highlight ? "#c9a84c" : "#555"} />
                </div>
                <span className="flex-1 text-sm font-semibold"
                  style={{ color: highlight ? "#c9a84c" : "#f0f0f0" }}>
                  {label}
                </span>
                {highlight && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c" }}>
                    陪练入驻
                  </span>
                )}
                <ChevronRight size={15} color="#555" />
              </div>
            </Link>
          ))}
        </div>

        {/* 退出登录 */}
        <button
          onClick={() => alert("退出登录")}
          className="w-full mt-4 py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: "#1c1c1c", border: "1px solid #2a2a2a", color: "#555" }}
        >
          退出登录
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
}
