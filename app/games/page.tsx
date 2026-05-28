"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { MOCK_GAMES } from "@/lib/mock-data";
import GameCard from "@/components/game/GameCard";
import PageHeader from "@/components/layout/PageHeader";
import type { GameType } from "@/types";

const GAME_TYPE_FILTERS: { label: string; value: GameType | "全部" }[] = [
  { label: "全部", value: "全部" },
  { label: "中式八球", value: "中式八球" },
  { label: "斯诺克", value: "斯诺克" },
  { label: "美式九球", value: "美式九球" },
];

export default function GamesPage() {
  const [filter, setFilter] = useState<GameType | "全部">("全部");

  const games = filter === "全部"
    ? MOCK_GAMES
    : MOCK_GAMES.filter((g) => g.gameType === filter);

  const handleJoin = (gameId: string) => {
    alert(`🎱 已发送加入申请！等待 ${MOCK_GAMES.find((g) => g.id === gameId)?.hostName} 确认。`);
  };

  return (
    <div>
      <PageHeader
        title="球局广场"
        showBack={false}
        right={
          <Link href="/games/create"
            className="w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: "#1a6b3c" }}>
            <Plus size={18} color="#fff" />
          </Link>
        }
      />

      {/* 球种筛选 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {GAME_TYPE_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: filter === value ? "#1a6b3c" : "#1c1c1c",
              color: filter === value ? "#f0f0f0" : "#888",
              border: `1px solid ${filter === value ? "#1a6b3c" : "#2a2a2a"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 发布提示 */}
      <div className="mx-4 mb-3 px-4 py-3 rounded-xl"
        style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <p className="text-xs" style={{ color: "#c9a84c" }}>
          🎱 同城约球，发起球局找搭子 — 点右上角 + 发布
        </p>
      </div>

      {/* 球局列表 */}
      <div className="px-4 space-y-3 pb-4">
        {games.length === 0 ? (
          <div className="text-center py-16" style={{ color: "#555" }}>
            <p className="text-4xl mb-3">🎱</p>
            <p className="text-sm">暂无球局，快去发布一个吧</p>
          </div>
        ) : (
          games.map((game) => (
            <GameCard key={game.id} game={game} onJoin={handleJoin} />
          ))
        )}
      </div>
    </div>
  );
}
