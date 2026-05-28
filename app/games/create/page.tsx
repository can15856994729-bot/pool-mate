"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { MOCK_VENUES } from "@/lib/mock-data";
import type { GameType } from "@/types";

const GAME_TYPES: GameType[] = ["中式八球", "斯诺克", "美式九球", "不限"];
const LEVEL_OPTIONS = ["不限", "新手友好", "中级以上", "高级以上"];
const FEE_TYPES = ["AA", "发起人请客", "面议"] as const;
const SLOT_OPTIONS = [2, 3, 4, 6, 8];
const TIME_SLOTS = ["18:00", "19:00", "20:00", "21:00", "22:00"];

export default function CreateGamePage() {
  const router = useRouter();
  const [gameType, setGameType] = useState<GameType>("中式八球");
  const [venue, setVenue] = useState(MOCK_VENUES[0]);
  const [slots, setSlots] = useState(4);
  const [level, setLevel] = useState("不限");
  const [feeType, setFeeType] = useState<"AA" | "发起人请客" | "面议">("AA");
  const [feeNote, setFeeNote] = useState("");
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!feeNote) { alert("请填写费用说明"); return; }
    setSubmitting(true);
    setTimeout(() => {
      alert("🎱 球局已发布！等待球友加入～");
      router.push("/games");
    }, 600);
  };

  return (
    <div>
      <PageHeader title="发布球局" />

      <div className="px-4 py-4 space-y-5">

        {/* 球种 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>球局类型</label>
          <div className="grid grid-cols-2 gap-2">
            {GAME_TYPES.map((t) => (
              <button key={t} onClick={() => setGameType(t)}
                className="py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: gameType === t ? "#1a6b3c" : "#1c1c1c",
                  color: gameType === t ? "#f0f0f0" : "#888",
                  border: `1px solid ${gameType === t ? "#1a6b3c" : "#2a2a2a"}`,
                }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 球房 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>选择球房</label>
          <div className="space-y-2">
            {MOCK_VENUES.map((v) => (
              <button key={v.id} onClick={() => setVenue(v)}
                className="w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors"
                style={{
                  background: venue.id === v.id ? "rgba(26,107,60,0.15)" : "#1c1c1c",
                  border: `1px solid ${venue.id === v.id ? "#1a6b3c" : "#2a2a2a"}`,
                }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>{v.name}</p>
                  <p className="text-xs" style={{ color: "#555" }}>{v.distance} · {v.address}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 时间 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>今天开始时间</label>
          <div className="grid grid-cols-5 gap-2">
            {TIME_SLOTS.map((t) => (
              <button key={t} onClick={() => setTime(t)}
                className="py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: time === t ? "#1a6b3c" : "#1c1c1c",
                  color: time === t ? "#f0f0f0" : "#888",
                  border: `1px solid ${time === t ? "#1a6b3c" : "#2a2a2a"}`,
                }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 人数 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>需要人数（总人数）</label>
          <div className="flex gap-2">
            {SLOT_OPTIONS.map((s) => (
              <button key={s} onClick={() => setSlots(s)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                style={{
                  background: slots === s ? "#1a6b3c" : "#1c1c1c",
                  color: slots === s ? "#f0f0f0" : "#888",
                  border: `1px solid ${slots === s ? "#1a6b3c" : "#2a2a2a"}`,
                }}>
                {s}人
              </button>
            ))}
          </div>
        </div>

        {/* 水平要求 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>水平要求</label>
          <div className="grid grid-cols-2 gap-2">
            {LEVEL_OPTIONS.map((l) => (
              <button key={l} onClick={() => setLevel(l)}
                className="py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: level === l ? "#1a6b3c" : "#1c1c1c",
                  color: level === l ? "#f0f0f0" : "#888",
                  border: `1px solid ${level === l ? "#1a6b3c" : "#2a2a2a"}`,
                }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* 费用方式 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>费用方式</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {FEE_TYPES.map((f) => (
              <button key={f} onClick={() => setFeeType(f)}
                className="py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: feeType === f ? "#c9a84c" : "#1c1c1c",
                  color: feeType === f ? "#0d0d0d" : "#888",
                  border: `1px solid ${feeType === f ? "#c9a84c" : "#2a2a2a"}`,
                }}>
                {f}
              </button>
            ))}
          </div>
          <input
            className="input"
            placeholder="费用说明，例如：AA台费约50元/人"
            value={feeNote}
            onChange={(e) => setFeeNote(e.target.value)}
          />
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>补充说明（选填）</label>
          <textarea
            className="input"
            rows={2}
            placeholder="例如：友谊赛，轻松为主，欢迎新手"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* 提交 */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 rounded-xl font-black text-base transition-opacity"
          style={{
            background: "#1a6b3c",
            color: "#f0f0f0",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "发布中…" : "🎱 立即发布球局"}
        </button>

        <p className="text-[11px] text-center" style={{ color: "#555" }}>
          发布即代表同意平台《约球规则》，保持文明运动精神
        </p>
      </div>

      <div className="h-4" />
    </div>
  );
}
