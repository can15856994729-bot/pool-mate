"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import PageHeader from "@/components/layout/PageHeader";
import Badge from "@/components/ui/Badge";
import { formatDate, formatPrice } from "@/lib/utils";
import type { BookingStatus } from "@/types";

const STATUS_FILTERS: { label: string; value: BookingStatus | "全部" }[] = [
  { label: "全部", value: "全部" },
  { label: "待确认", value: "待确认" },
  { label: "已确认", value: "已确认" },
  { label: "已完成", value: "已完成" },
  { label: "已取消", value: "已取消" },
];

const statusStyle: Record<BookingStatus, { bg: string; color: string }> = {
  "待确认": { bg: "rgba(201,168,76,0.15)", color: "#c9a84c" },
  "已确认": { bg: "rgba(26,107,60,0.15)", color: "#22874d" },
  "进行中": { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  "已完成": { bg: "rgba(255,255,255,0.06)", color: "#888" },
  "已取消": { bg: "rgba(239,68,68,0.1)", color: "#f87171" },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<BookingStatus | "全部">("全部");

  const orders = filter === "全部"
    ? MOCK_BOOKINGS
    : MOCK_BOOKINGS.filter((o) => o.status === filter);

  return (
    <div>
      <PageHeader title="我的订单" showBack={false} />

      {/* 状态筛选 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {STATUS_FILTERS.map(({ label, value }) => (
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

      {/* 订单列表 */}
      <div className="px-4 space-y-3 pb-4">
        {orders.length === 0 ? (
          <div className="text-center py-16" style={{ color: "#555" }}>
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">暂无订单</p>
            <Link href="/companions"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: "#1a6b3c", color: "#f0f0f0" }}>
              去找球伴
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card p-4">
              {/* 头部：状态 + 时间 */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold" style={{ color: "#555" }}>
                  {formatDate(order.createdAt)}
                </span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={statusStyle[order.status]}
                >
                  {order.status}
                </span>
              </div>

              {/* 球伴信息 */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={order.companionAvatar}
                  alt={order.companionName}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "#f0f0f0" }}>{order.companionName}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="gray">{order.service}</Badge>
                    <span className="text-xs" style={{ color: "#555" }}>{order.duration}小时</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#555" />
              </div>

              <div className="divider mb-3" />

              {/* 详情 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs" style={{ color: "#888" }}>
                  <Clock size={12} color="#1a6b3c" />
                  {formatDate(order.bookingTime)}
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#888" }}>
                  <MapPin size={12} color="#1a6b3c" />
                  {order.venueName}
                </div>
              </div>

              <div className="divider my-3" />

              {/* 底部：价格 + 操作 */}
              <div className="flex items-center justify-between">
                <span>
                  <span className="text-xs" style={{ color: "#555" }}>实付 </span>
                  <span className="font-black text-base" style={{ color: "#c9a84c" }}>
                    {formatPrice(order.totalPrice)}
                  </span>
                </span>
                <div className="flex gap-2">
                  {order.status === "已完成" && (
                    <button
                      className="text-xs font-bold px-3 py-1.5 rounded-lg"
                      style={{ border: "1px solid #1a6b3c", color: "#1a6b3c" }}
                    >
                      去评价
                    </button>
                  )}
                  {(order.status === "待确认" || order.status === "已确认") && (
                    <button
                      className="text-xs font-bold px-3 py-1.5 rounded-lg"
                      style={{ border: "1px solid #2a2a2a", color: "#555" }}
                      onClick={() => alert("如需取消，请联系客服")}
                    >
                      取消预约
                    </button>
                  )}
                  <Link
                    href={`/companions/${order.companionId}`}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: "#1a6b3c", color: "#f0f0f0" }}
                  >
                    再次预约
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
