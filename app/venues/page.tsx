import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation2, Users, CheckCircle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { MOCK_VENUES, MOCK_COMPANIONS } from "@/lib/mock-data";

const TABS = ["全部", "24小时", "斯诺克专区", "价格最低", "评分最高"];

export default function VenuesPage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>
      <PageHeader title="附近球房" showBack={false} />

      {/* 筛选标签 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: i === 0 ? "#1a6b3c" : "#1c1c1c",
              color: i === 0 ? "#f0f0f0" : "#666",
              border: `1px solid ${i === 0 ? "#1a6b3c" : "#2a2a2a"}`,
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* 球房列表 */}
      <div className="px-4 space-y-4 pb-6">
        {MOCK_VENUES.map((venue) => {
          const availableTables = venue.tables.filter((t) => t.available).length;
          const totalTables = venue.tables.length;
          const residentCompanions = MOCK_COMPANIONS.filter((c) =>
            venue.residents.includes(c.id)
          );

          return (
            <div
              key={venue.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#131313", border: "1px solid #1e1e1e" }}
            >
              {/* 封面图 */}
              <Link href={`/venues/${venue.id}`}>
                <div className="relative h-44 w-full">
                  <Image
                    src={venue.images[0]}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 55%, transparent 100%)",
                    }}
                  />
                  {/* 评分 */}
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.65)" }}
                  >
                    <span className="text-[11px] text-yellow-400">★</span>
                    <span className="text-[12px] font-black text-white">
                      {venue.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* 距离 */}
                  <div
                    className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ background: "rgba(26,107,60,0.8)" }}
                  >
                    <MapPin size={10} color="#fff" />
                    <span className="text-[11px] font-semibold text-white">
                      {venue.distance}
                    </span>
                  </div>

                  {/* 名称 */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-black text-[17px] text-white leading-tight">
                      {venue.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} color="#aaa" />
                      <p className="text-[11px] text-[#aaa] truncate">
                        {venue.address}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* 详情区域 */}
              <div className="p-4">
                {/* 营业时间 + 价格 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-[#888] text-[12px]">
                    <Clock size={12} />
                    <span>{venue.openHours}</span>
                  </div>
                  <span className="text-[13px]">
                    <span className="font-black" style={{ color: "#c9a84c" }}>
                      ¥{venue.pricePerHour}
                    </span>
                    <span className="text-[#555]">/小时起</span>
                  </span>
                </div>

                {/* 标签 */}
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {venue.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        background: "rgba(26,107,60,0.12)",
                        color: "#22874d",
                        border: "1px solid rgba(26,107,60,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 可约球桌 + 常驻陪练 */}
                <div
                  className="flex items-center justify-between py-3 mb-3"
                  style={{ borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}
                >
                  {/* 可约球桌 */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#555]">可约球桌</span>
                    <div className="flex items-center gap-1">
                      <span
                        className="text-[15px] font-black"
                        style={{ color: availableTables > 0 ? "#22874d" : "#f87171" }}
                      >
                        {availableTables}
                      </span>
                      <span className="text-[12px] text-[#555]">/ {totalTables} 台</span>
                    </div>
                  </div>

                  {/* 分割线 */}
                  <div className="w-px h-8" style={{ background: "#1e1e1e" }} />

                  {/* 常驻陪练 */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#555]">常驻陪练</span>
                    {residentCompanions.length > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1.5">
                          {residentCompanions.slice(0, 3).map((c) => (
                            <div
                              key={c.id}
                              className="relative w-6 h-6 rounded-full overflow-hidden"
                              style={{ border: "1.5px solid #131313" }}
                            >
                              <Image
                                src={c.avatar}
                                alt={c.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <CheckCircle size={10} color="#1a6b3c" />
                          <span className="text-[11px] font-semibold" style={{ color: "#22874d" }}>
                            {residentCompanions.length} 位已认证
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[12px] text-[#555]">暂无</span>
                    )}
                  </div>

                  {/* 分割线 */}
                  <div className="w-px h-8" style={{ background: "#1e1e1e" }} />

                  {/* 评价数 */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#555]">用户评价</span>
                    <div className="flex items-center gap-1">
                      <Users size={12} color="#888" />
                      <span className="text-[12px] text-[#888] font-semibold">
                        {venue.reviewCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 导航 + 电话 按钮 */}
                <div className="flex gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(venue.name + " " + venue.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13px] active:opacity-80"
                    style={{
                      background: "rgba(59,130,246,0.12)",
                      border: "1px solid rgba(59,130,246,0.25)",
                      color: "#3b82f6",
                    }}
                  >
                    <Navigation2 size={14} />
                    导航
                  </a>
                  <a
                    href={`tel:${venue.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13px] active:opacity-80"
                    style={{
                      background: "rgba(26,107,60,0.12)",
                      border: "1px solid rgba(26,107,60,0.25)",
                      color: "#22874d",
                    }}
                  >
                    <Phone size={14} />
                    {venue.phone}
                  </a>
                  <Link
                    href={`/venues/${venue.id}`}
                    className="flex items-center justify-center gap-1 px-4 py-3 rounded-xl font-bold text-[13px] active:opacity-80"
                    style={{ background: "#1a6b3c", color: "#fff" }}
                  >
                    详情
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
