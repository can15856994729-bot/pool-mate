"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation, Star, CheckCircle } from "lucide-react";
import { MOCK_VENUES, MOCK_COMPANIONS } from "@/lib/mock-data";
import PageHeader from "@/components/layout/PageHeader";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";

export default function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const venue = MOCK_VENUES.find((v) => v.id === id) ?? MOCK_VENUES[0];
  const [imgIndex, setImgIndex] = useState(0);

  const residents = MOCK_COMPANIONS.filter((c) => venue.residents.includes(c.id));

  return (
    <div>
      <PageHeader title={venue.name} transparent />

      {/* 封面图轮播 */}
      <div className="relative h-56 w-full -mt-14">
        <Image
          src={venue.images[imgIndex]}
          alt={venue.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 40%)" }} />
        {/* 图片指示器 */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
          {venue.images.map((_, i) => (
            <button key={i} onClick={() => setImgIndex(i)}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ background: i === imgIndex ? "#f0f0f0" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
        {/* 名称 */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-black text-2xl mb-1" style={{ color: "#f0f0f0" }}>{venue.name}</h1>
          <div className="flex items-center gap-2">
            <StarRating rating={venue.rating} size={12} />
            <span className="text-xs" style={{ color: "#888" }}>{venue.reviewCount}条评价</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* 基础信息 */}
        <div className="p-4 rounded-xl space-y-3"
          style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
          <div className="flex items-start gap-2 text-sm">
            <MapPin size={15} color="#1a6b3c" className="flex-shrink-0 mt-0.5" />
            <span style={{ color: "#888" }}>{venue.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={15} color="#1a6b3c" />
            <span style={{ color: "#888" }}>营业时间：{venue.openHours}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star size={15} color="#c9a84c" fill="#c9a84c" />
            <span style={{ color: "#888" }}>台费：</span>
            <span className="font-black" style={{ color: "#c9a84c" }}>¥{venue.pricePerHour}</span>
            <span style={{ color: "#555" }}>/小时起</span>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {venue.tags.map((tag) => (
            <Badge key={tag} variant="green">{tag}</Badge>
          ))}
        </div>

        {/* 可用球桌 */}
        <div>
          <h2 className="font-bold text-sm mb-3" style={{ color: "#888" }}>🎱 可预约球桌</h2>
          <div className="space-y-2">
            {venue.tables.map((table) => (
              <div key={table.id}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm" style={{ color: "#f0f0f0" }}>{table.number}</span>
                  <Badge variant="gray">{table.type}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">
                    <span className="font-bold" style={{ color: "#c9a84c" }}>¥{table.pricePerHour}</span>
                    <span style={{ color: "#555" }}>/h</span>
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      background: table.available ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
                      color: table.available ? "#22c55e" : "#555",
                    }}>
                    {table.available ? "可约" : "使用中"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 常驻陪练 */}
        {residents.length > 0 && (
          <div>
            <h2 className="font-bold text-sm mb-3" style={{ color: "#888" }}>🏅 常驻陪练</h2>
            <div className="space-y-2">
              {residents.map((c) => (
                <Link key={c.id} href={`/companions/${c.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
                    <Image src={c.avatar} alt={c.name} width={40} height={40} className="rounded-full" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: "#f0f0f0" }}>{c.name}</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={c.rating} size={11} />
                        <span className="text-xs" style={{ color: "#555" }}>¥{c.pricePerHour}/h</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg"
                      style={{ background: "#1a6b3c", color: "#f0f0f0" }}>
                      预约
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => alert(`📞 ${venue.phone}`)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm"
            style={{ border: "1px solid #2a2a2a", color: "#888" }}
          >
            <Phone size={16} />
            电话联系
          </button>
          <button
            onClick={() => alert(`🗺️ 正在打开导航：${venue.address}`)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm glow-green-sm"
            style={{ background: "#1a6b3c", color: "#f0f0f0" }}
          >
            <Navigation size={16} />
            导航前往
          </button>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
