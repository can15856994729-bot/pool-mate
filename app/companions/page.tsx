"use client";

import { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { MOCK_COMPANIONS } from "@/lib/mock-data";
import CompanionCard from "@/components/companion/CompanionCard";
import PageHeader from "@/components/layout/PageHeader";
import Badge from "@/components/ui/Badge";
import type { ServiceType } from "@/types";

const SERVICE_FILTERS: { label: string; value: ServiceType | "全部" }[] = [
  { label: "全部", value: "全部" },
  { label: "陪打", value: "陪打" },
  { label: "陪练", value: "陪练" },
  { label: "教学", value: "教学" },
  { label: "组局", value: "组局" },
];

const SORT_OPTIONS = ["评分最高", "距离最近", "价格最低", "接单最多"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export default function CompanionsPage() {
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "全部">("全部");
  const [sortBy, setSortBy] = useState<SortOption>("评分最高");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  let companions = MOCK_COMPANIONS;

  // 搜索
  if (search) {
    companions = companions.filter(
      (c) =>
        c.name.includes(search) ||
        c.tags.some((t) => t.includes(search)) ||
        c.specialties.some((s) => s.includes(search))
    );
  }

  // 服务筛选
  if (serviceFilter !== "全部") {
    companions = companions.filter((c) => c.services.includes(serviceFilter));
  }

  // 在线筛选
  if (onlineOnly) {
    companions = companions.filter((c) => c.online);
  }

  // 排序
  companions = [...companions].sort((a, b) => {
    if (sortBy === "评分最高") return b.rating - a.rating;
    if (sortBy === "价格最低") return a.pricePerHour - b.pricePerHour;
    if (sortBy === "接单最多") return b.ordersCompleted - a.ordersCompleted;
    return 0;
  });

  return (
    <div>
      <PageHeader title="找球伴" showBack={false} />

      {/* 搜索框 */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
          style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
          <Search size={15} color="#555" />
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#f0f0f0" }}
            placeholder="搜索球伴、教练、技能标签…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 服务类型筛选 */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
        {SERVICE_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setServiceFilter(value)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: serviceFilter === value ? "#1a6b3c" : "#1c1c1c",
              color: serviceFilter === value ? "#f0f0f0" : "#888",
              border: `1px solid ${serviceFilter === value ? "#1a6b3c" : "#2a2a2a"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 排序 & 在线筛选 */}
      <div className="flex items-center justify-between px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className="flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: sortBy === opt ? "rgba(201,168,76,0.15)" : "transparent",
                color: sortBy === opt ? "#c9a84c" : "#555",
                border: `1px solid ${sortBy === opt ? "#c9a84c44" : "transparent"}`,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOnlineOnly(!onlineOnly)}
          className="flex items-center gap-1.5 text-xs font-semibold flex-shrink-0"
          style={{ color: onlineOnly ? "#22c55e" : "#555" }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: onlineOnly ? "#22c55e" : "#333" }}
          />
          仅看在线
        </button>
      </div>

      {/* 列表 */}
      <div className="px-4 space-y-3 pb-4">
        {companions.length === 0 ? (
          <div className="text-center py-16 text-[#555]">
            <p className="text-4xl mb-3">🎱</p>
            <p className="text-sm">暂无匹配的球伴</p>
          </div>
        ) : (
          companions.map((c) => <CompanionCard key={c.id} companion={c} />)
        )}
      </div>
    </div>
  );
}
