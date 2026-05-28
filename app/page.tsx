"use client";

import Link from "next/link";
import { Search, MapPin, Users, Swords, Store, ChevronRight, Zap, ShieldCheck, AlertTriangle, Lock, Navigation2, Download } from "lucide-react";
import { MOCK_COMPANIONS, MOCK_GAMES, MOCK_VENUES } from "@/lib/mock-data";
import CompanionCard from "@/components/companion/CompanionCard";
import GameCard from "@/components/game/GameCard";
import VenueCard from "@/components/venue/VenueCard";

const quickActions = [
  { icon: Users,  label: "找陪练",  href: "/companions",  color: "#1a6b3c", bg: "rgba(26,107,60,0.18)" },
  { icon: Swords, label: "约球局",  href: "/games",       color: "#c9a84c", bg: "rgba(201,168,76,0.15)" },
  { icon: Store,  label: "找球房",  href: "/venues",      color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  { icon: Zap,    label: "成为陪练", href: "/join",        color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
];

const safetyItems = [
  { icon: ShieldCheck,   label: "实名认证",  color: "#1a6b3c" },
  { icon: Navigation2,   label: "公开球房",  color: "#3b82f6" },
  { icon: Lock,          label: "平台担保",  color: "#c9a84c" },
  { icon: AlertTriangle, label: "违规举报",  color: "#f87171" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>

      {/* ═══════════════════════════════════════
          Hero
      ═══════════════════════════════════════ */}
      <div
        className="relative px-4 pt-14 pb-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #091f11 0%, #0c1e13 35%, #0d0d0d 70%)",
        }}
      >
        {/* 背景装饰球 */}
        <div
          className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(26,107,60,0.18) 0%, transparent 70%)",
            transform: "translate(15%,-20%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            transform: "translate(-25%,30%)",
          }}
        />

        {/* 定位栏 */}
        <div className="flex items-center justify-between mb-5">
          <button className="flex items-center gap-1 active:opacity-70">
            <MapPin size={13} color="#1a6b3c" />
            <span className="text-[13px] font-semibold" style={{ color: "#22874d" }}>
              广州市 · 天河区
            </span>
            <ChevronRight size={12} color="#22874d" />
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{
              background: "rgba(26,107,60,0.15)",
              border: "1px solid rgba(26,107,60,0.3)",
            }}
          >
            🎱
          </div>
        </div>

        {/* 主标题 */}
        <div className="mb-5">
          <p
            className="text-[10px] font-black tracking-[0.25em] uppercase mb-2"
            style={{ color: "#1a6b3c" }}
          >
            台球运动社交平台
          </p>
          <h1 className="font-black leading-[1.15] mb-2">
            <span className="block text-[30px]" style={{ color: "#f0f0f0" }}>
              今晚想打球？
            </span>
            <span className="block text-[30px]" style={{ color: "#f0f0f0" }}>
              附近球伴
              <span style={{ color: "#1a6b3c" }}>马上约</span>
            </span>
          </h1>
          <p className="text-[12px]" style={{ color: "#666" }}>
            实名认证 · 公开球房 · 安全运动社交
          </p>
        </div>

        {/* CTA 按钮组 */}
        <div className="flex gap-3 mb-4">
          <Link
            href="/companions"
            className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl font-black text-[13px] active:opacity-80 transition-opacity"
            style={{ background: "#1a6b3c", color: "#fff", boxShadow: "0 4px 20px rgba(26,107,60,0.4)" }}
          >
            🎱 立即找陪练
          </Link>
          <Link
            href="/games/create"
            className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl font-bold text-[13px] active:opacity-80 transition-opacity"
            style={{
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#c9a84c",
              background: "rgba(201,168,76,0.08)",
            }}
          >
            📅 发布球局
          </Link>
        </div>

        {/* 下载横幅 */}
        <Link href="/download">
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-3 active:opacity-80"
            style={{
              background: "rgba(26,107,60,0.12)",
              border: "1px solid rgba(26,107,60,0.25)",
            }}
          >
            <Download size={13} color="#22874d" />
            <span className="text-[12px] font-semibold flex-1" style={{ color: "#22874d" }}>
              📲 下载 App，随时随地约球
            </span>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full" style={{ background: "#1a6b3c", color: "#fff" }}>
              免费
            </span>
            <ChevronRight size={12} color="#22874d" />
          </div>
        </Link>

        {/* 搜索框 */}
        <Link href="/companions">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl active:opacity-80"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <Search size={15} color="#555" />
            <span className="text-sm" style={{ color: "#555" }}>
              搜索球伴、教练、球房…
            </span>
          </div>
        </Link>
      </div>

      {/* ═══════════════════════════════════════
          快捷入口
      ═══════════════════════════════════════ */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map(({ icon: Icon, label, href, color, bg }) => (
            <Link key={href} href={href}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
                  style={{ background: bg, border: `1px solid ${color}30` }}
                >
                  <Icon size={22} color={color} strokeWidth={1.8} />
                </div>
                <span
                  className="text-[11px] font-semibold text-center leading-tight"
                  style={{ color: "#777" }}
                >
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          安全合规模块
      ═══════════════════════════════════════ */}
      <div
        className="mx-4 mb-4 p-4 rounded-2xl"
        style={{ background: "#131313", border: "1px solid #1e1e1e" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={13} color="#1a6b3c" />
          <span className="text-[12px] font-black" style={{ color: "#f0f0f0" }}>
            平台安全保障
          </span>
          <span className="ml-auto text-[10px]" style={{ color: "#444" }}>
            绿色健康运动社交
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {safetyItems.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}33`,
                }}
              >
                <Icon size={16} color={color} strokeWidth={1.5} />
              </div>
              <span
                className="text-[10px] font-semibold text-center leading-tight"
                style={{ color: "#666" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-[10px] leading-[1.7] pt-3"
          style={{
            color: "#444",
            borderTop: "1px solid #1e1e1e",
          }}
        >
          本平台仅提供台球运动陪练、教学、组局等合法运动社交服务。
          所有见面须在平台收录的公开台球厅进行，严禁私下交易。
        </p>
      </div>

      {/* ═══════════════════════════════════════
          如何使用
      ═══════════════════════════════════════ */}
      <div className="px-4 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[15px] font-black" style={{ color: "#f0f0f0" }}>
            <span style={{ color: "#c9a84c", marginRight: 5 }}>▌</span>
            如何使用球伴
          </span>
        </div>
        <div
          className="rounded-2xl p-4"
          style={{ background: "#131313", border: "1px solid #1e1e1e" }}
        >
          {[
            {
              step: "01",
              icon: "🔍",
              title: "选择球伴或球局",
              desc: "浏览附近已认证陪练，或加入同城约球组局",
              color: "#1a6b3c",
            },
            {
              step: "02",
              icon: "📅",
              title: "在线预约确认",
              desc: "选择服务类型、时长、球房，一键提交预约",
              color: "#c9a84c",
            },
            {
              step: "03",
              icon: "🏠",
              title: "到公开球房见面",
              desc: "所有服务须在平台认证球房进行，安全有保障",
              color: "#3b82f6",
            },
            {
              step: "04",
              icon: "⭐",
              title: "完成评价",
              desc: "服务结束后双方互评，维护平台安全生态",
              color: "#f59e0b",
            },
          ].map((item, i, arr) => (
            <div key={item.step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}33`,
                  }}
                >
                  {item.icon}
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="w-px flex-1 my-1"
                    style={{ background: "#2a2a2a", minHeight: 16 }}
                  />
                )}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-black tracking-widest"
                    style={{ color: item.color }}
                  >
                    STEP {item.step}
                  </span>
                </div>
                <p className="font-bold text-[13px] mb-0.5" style={{ color: "#f0f0f0" }}>
                  {item.title}
                </p>
                <p className="text-[11px] leading-[1.6]" style={{ color: "#555" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          新人优惠
      ═══════════════════════════════════════ */}
      <div
        className="mx-4 mb-5 rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(130deg, #152b1c 0%, #0e1f14 100%)",
          border: "1px solid rgba(26,107,60,0.25)",
        }}
      >
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-[0.07] select-none pointer-events-none"
        >
          🎱
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-[10px] font-black tracking-widest mb-1"
              style={{ color: "#c9a84c" }}
            >
              🎁 新人专享优惠
            </p>
            <p className="font-black text-[22px] leading-none mb-1" style={{ color: "#f0f0f0" }}>
              首单立减 <span style={{ color: "#c9a84c" }}>¥30</span>
            </p>
            <p className="text-[11px]" style={{ color: "#666" }}>
              邀请好友再得 ¥20 运动券
            </p>
          </div>
          <Link
            href="/companions"
            className="px-4 py-2.5 rounded-xl text-[13px] font-black active:opacity-80"
            style={{ background: "#c9a84c", color: "#0d0d0d" }}
          >
            立即使用
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          推荐球伴
      ═══════════════════════════════════════ */}
      <section className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-[15px]" style={{ color: "#f0f0f0" }}>
            <span style={{ color: "#1a6b3c", marginRight: 5 }}>▌</span>
            推荐球伴
          </h2>
          <Link
            href="/companions"
            className="flex items-center gap-0.5 text-[12px] active:opacity-70"
            style={{ color: "#555" }}
          >
            全部 <ChevronRight size={13} />
          </Link>
        </div>
        <div className="space-y-3">
          {MOCK_COMPANIONS.filter((c) => c.online)
            .slice(0, 3)
            .map((c) => (
              <CompanionCard key={c.id} companion={c} />
            ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          附近球局
      ═══════════════════════════════════════ */}
      <section className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-[15px]" style={{ color: "#f0f0f0" }}>
            <span style={{ color: "#c9a84c", marginRight: 5 }}>▌</span>
            附近球局
          </h2>
          <Link
            href="/games"
            className="flex items-center gap-0.5 text-[12px] active:opacity-70"
            style={{ color: "#555" }}
          >
            全部 <ChevronRight size={13} />
          </Link>
        </div>
        <div className="space-y-3">
          {MOCK_GAMES.filter((g) => g.status === "recruiting")
            .slice(0, 2)
            .map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          热门球房
      ═══════════════════════════════════════ */}
      <section className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-[15px]" style={{ color: "#f0f0f0" }}>
            <span style={{ color: "#3b82f6", marginRight: 5 }}>▌</span>
            热门球房
          </h2>
          <Link
            href="/venues"
            className="flex items-center gap-0.5 text-[12px] active:opacity-70"
            style={{ color: "#555" }}
          >
            附近 <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_VENUES.slice(0, 2).map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      </section>

      <div className="h-6" />
    </div>
  );
}
