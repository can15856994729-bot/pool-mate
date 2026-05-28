import Link from "next/link";
import Image from "next/image";
import { MapPin, ShieldCheck, Zap, BookOpen } from "lucide-react";
import type { Companion } from "@/types";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";

interface CompanionCardProps {
  companion: Companion;
}

export default function CompanionCard({ companion }: CompanionCardProps) {
  const recentlyActive = companion.online || companion.ordersCompleted > 80;

  return (
    <div
      className="p-4 rounded-2xl active:opacity-90 transition-opacity"
      style={{ background: "#141414", border: "1px solid #222" }}
    >
      <div className="flex gap-3">

        {/* ── 头像 ── */}
        <Link href={`/companions/${companion.id}`} className="flex-shrink-0">
          <div className="relative">
            <div
              className="w-[70px] h-[70px] rounded-2xl overflow-hidden"
              style={{
                border: `2px solid ${companion.online ? "#1a6b3c" : "#252525"}`,
              }}
            >
              <Image
                src={companion.avatar}
                alt={companion.name}
                width={70}
                height={70}
                className="object-cover object-top w-full h-full"
              />
            </div>
            {/* 在线点 */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{
                background: companion.online ? "#22c55e" : "#333",
                borderColor: "#141414",
              }}
            />
            {/* 实名角标 */}
            {companion.verified && (
              <span
                className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center"
                style={{ background: "#1a6b3c", width: 18, height: 18 }}
              >
                <ShieldCheck size={10} color="#fff" />
              </span>
            )}
          </div>
        </Link>

        {/* ── 信息区 ── */}
        <div className="flex-1 min-w-0">

          {/* 姓名 + 等级 */}
          <div className="flex items-center gap-1.5 mb-1">
            <Link href={`/companions/${companion.id}`}>
              <span className="font-bold text-[15px]" style={{ color: "#f0f0f0" }}>
                {companion.name}
              </span>
            </Link>
            <Badge variant="gold">{companion.level}</Badge>
          </div>

          {/* 评分 + 距离 */}
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={companion.rating} size={12} />
            <span className="text-[11px]" style={{ color: "#555" }}>
              {companion.reviewCount} 条评价
            </span>
            <span
              className="flex items-center gap-0.5 text-[11px]"
              style={{ color: "#555" }}
            >
              <MapPin size={10} />
              {companion.distance}
            </span>
          </div>

          {/* 可信度行 */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {companion.verified && (
              <span
                className="flex items-center gap-1 text-[10px] font-bold px-2 py-[3px] rounded-full"
                style={{
                  background: "rgba(26,107,60,0.15)",
                  color: "#22874d",
                  border: "1px solid rgba(26,107,60,0.25)",
                }}
              >
                <ShieldCheck size={9} /> 已认证陪练
              </span>
            )}
            <span
              className="text-[10px] font-semibold px-2 py-[3px] rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#666",
                border: "1px solid #222",
              }}
            >
              接单 {companion.ordersCompleted} 次
            </span>
            {recentlyActive && (
              <span
                className="flex items-center gap-0.5 text-[10px] font-semibold px-2 py-[3px] rounded-full"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  color: "#b8922e",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <Zap size={8} /> 近7天活跃
              </span>
            )}
          </div>

          {/* 擅长项目 */}
          {companion.specialties.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen size={10} color="#555" />
              <span className="text-[11px] truncate" style={{ color: "#666" }}>
                {companion.specialties.slice(0, 2).join(" · ")}
              </span>
            </div>
          )}

          {/* 技能标签 */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {companion.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="gray">{tag}</Badge>
            ))}
          </div>

          {/* 价格 + 按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-0.5">
              <span className="font-black text-[18px]" style={{ color: "#c9a84c" }}>
                ¥{companion.pricePerHour}
              </span>
              <span className="text-[11px]" style={{ color: "#555" }}>/小时</span>
            </div>
            <Link
              href={`/booking?companionId=${companion.id}`}
              className="flex items-center justify-center rounded-xl text-[13px] font-black px-5 py-2 active:opacity-80 transition-opacity"
              style={{
                background: "#1a6b3c",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(26,107,60,0.35)",
              }}
            >
              立即预约
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
