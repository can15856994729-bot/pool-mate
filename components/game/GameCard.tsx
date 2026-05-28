import Image from "next/image";
import { MapPin, Clock, Users, DollarSign } from "lucide-react";
import type { Game } from "@/types";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { formatGameTime, getSlotsText } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  onJoin?: (gameId: string) => void;
}

const gameTypeColor: Record<string, string> = {
  "中式八球": "#1a6b3c",
  "斯诺克":  "#c9a84c",
  "美式九球": "#3b82f6",
  "不限":    "#555",
};

export default function GameCard({ game, onJoin }: GameCardProps) {
  const isFull    = game.filledSlots >= game.totalSlots;
  const spotsLeft = game.totalSlots - game.filledSlots;
  const accentColor = gameTypeColor[game.gameType] ?? "#555";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#141414", border: "1px solid #222" }}
    >
      {/* 顶部色条 */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

      <div className="p-4">
        {/* ── 发起人 + 球种 ── */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border" style={{ borderColor: "#2a2a2a" }}>
              <Image
                src={game.hostAvatar}
                alt={game.hostName}
                width={36}
                height={36}
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold" style={{ color: "#f0f0f0" }}>
                  {game.hostName}
                </span>
                <StarRating rating={game.hostRating} size={10} />
              </div>
              <span className="text-[10px]" style={{ color: "#555" }}>发起约球</span>
            </div>
          </div>
          {/* 球种徽章 */}
          <span
            className="text-[11px] font-black px-2.5 py-1 rounded-full"
            style={{
              background: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
            }}
          >
            {game.gameType}
          </span>
        </div>

        {/* ── 核心信息 ── */}
        <div
          className="rounded-xl p-3 mb-3 space-y-2"
          style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}
        >
          {/* 时间 */}
          <div className="flex items-center gap-2">
            <Clock size={13} color={accentColor} />
            <span className="text-[13px] font-bold" style={{ color: "#f0f0f0" }}>
              {formatGameTime(game.gameTime)}
            </span>
          </div>
          {/* 地点 */}
          <div className="flex items-center gap-2">
            <MapPin size={13} color="#555" />
            <span className="text-[12px] truncate" style={{ color: "#888" }}>
              {game.venueName}
              <span style={{ color: "#555" }}> · {game.venueAddress}</span>
            </span>
          </div>
          {/* 人数 + 费用 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users size={13} color="#555" />
              <span className="text-[12px]" style={{ color: "#888" }}>
                {getSlotsText(game.filledSlots, game.totalSlots)}
                {!isFull && (
                  <span style={{ color: "#c9a84c" }}> · 缺{spotsLeft}人</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign size={13} color="#555" />
              <span className="text-[12px]" style={{ color: "#888" }}>{game.feeNote}</span>
            </div>
          </div>
        </div>

        {/* ── 底部：水平要求 + 加入按钮 ── */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            <Badge variant="gray">{game.levelRequired}</Badge>
            <Badge variant={game.feeType === "AA" ? "gray" : "gold"}>{game.feeType}</Badge>
          </div>

          {isFull ? (
            <span
              className="text-[12px] font-bold px-4 py-2 rounded-xl"
              style={{ background: "#1c1c1c", color: "#555", border: "1px solid #222" }}
            >
              已满员
            </span>
          ) : (
            <button
              onClick={() => onJoin?.(game.id)}
              className="text-[13px] font-black px-5 py-2 rounded-xl active:opacity-80 transition-opacity"
              style={{
                background: accentColor,
                color: accentColor === "#c9a84c" ? "#0d0d0d" : "#fff",
                boxShadow: `0 2px 12px ${accentColor}40`,
              }}
            >
              加入球局
            </button>
          )}
        </div>

        {/* 补充说明 */}
        {game.note && (
          <p className="mt-2 text-[11px] leading-relaxed" style={{ color: "#555" }}>
            💬 {game.note}
          </p>
        )}
      </div>
    </div>
  );
}
