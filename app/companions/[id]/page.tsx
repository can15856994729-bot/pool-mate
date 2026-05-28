import Link from "next/link";
import Image from "next/image";
import { MapPin, ShieldCheck, Clock, CheckCircle, MessageCircle } from "lucide-react";
import { MOCK_COMPANIONS } from "@/lib/mock-data";
import PageHeader from "@/components/layout/PageHeader";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return MOCK_COMPANIONS.map((c) => ({ id: c.id }));
}

export default async function CompanionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const companion = MOCK_COMPANIONS.find((c) => c.id === id);

  if (!companion) {
    return (
      <div className="text-center py-24 text-[#555]">
        <p className="text-4xl mb-3">😕</p>
        <p>找不到该球伴</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={companion.name} />

      {/* 头部信息 */}
      <div className="px-4 py-5">
        <div className="flex gap-4 items-start">
          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-2xl overflow-hidden border-2"
              style={{ borderColor: companion.online ? "#1a6b3c" : "#2a2a2a" }}
            >
              <Image
                src={companion.avatar}
                alt={companion.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
              style={{
                background: companion.online ? "#22c55e" : "#555",
                borderColor: "#0d0d0d",
              }}
            />
          </div>

          {/* 信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-black" style={{ color: "#f0f0f0" }}>
                {companion.name}
              </h1>
              {companion.verified && <ShieldCheck size={16} color="#1a6b3c" />}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold">{companion.level}</Badge>
              <span
                className="text-xs"
                style={{ color: companion.online ? "#22c55e" : "#555" }}
              >
                {companion.online ? "● 在线可约" : "● 暂时离线"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={companion.rating} size={13} />
              <span className="text-xs" style={{ color: "#555" }}>
                {companion.reviewCount}条评价
              </span>
              <span
                className="text-xs flex items-center gap-0.5"
                style={{ color: "#555" }}
              >
                <MapPin size={10} />
                {companion.distance}
              </span>
            </div>
          </div>
        </div>

        {/* 数据统计 */}
        <div
          className="grid grid-cols-3 gap-3 mt-4 p-4 rounded-xl"
          style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
        >
          {[
            { label: "已完成订单", value: `${companion.ordersCompleted}单` },
            { label: "综合评分", value: companion.rating.toFixed(1) },
            {
              label: "服务时间",
              value: companion.availableTime.split(" ")[1] || "灵活",
            },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-black text-lg" style={{ color: "#c9a84c" }}>
                {value}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "#555" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* 个人介绍 */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-sm mb-2" style={{ color: "#888" }}>
          个人介绍
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "#f0f0f0" }}>
          {companion.bio}
        </p>
      </div>

      <div className="divider" />

      {/* 服务 & 价格 */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-sm mb-3" style={{ color: "#888" }}>
          服务内容
        </h2>
        <div className="space-y-2">
          {companion.services.map((service) => (
            <div
              key={service}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={15} color="#1a6b3c" />
                <span className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>
                  {service}
                </span>
              </div>
              <span>
                <span className="font-black" style={{ color: "#c9a84c" }}>
                  ¥{companion.pricePerHour}
                </span>
                <span className="text-xs" style={{ color: "#555" }}>
                  /小时
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* 擅长项目 */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-sm mb-2" style={{ color: "#888" }}>
          擅长项目
        </h2>
        <div className="flex flex-wrap gap-2">
          {companion.specialties.map((s) => (
            <Badge key={s} variant="green">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* 可约时间 */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-sm mb-2" style={{ color: "#888" }}>
          可约时间
        </h2>
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "#f0f0f0" }}
        >
          <Clock size={14} color="#1a6b3c" />
          {companion.availableTime}
        </div>
      </div>

      <div className="divider" />

      {/* 照片墙 */}
      {companion.gallery.length > 0 && (
        <>
          <div className="px-4 py-4">
            <h2 className="font-bold text-sm mb-3" style={{ color: "#888" }}>
              精彩图集
            </h2>
            <div className="flex gap-2 overflow-x-auto">
              {companion.gallery.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt=""
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="divider" />
        </>
      )}

      {/* 用户评价 */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-sm mb-3" style={{ color: "#888" }}>
          用户评价 ({companion.reviewCount})
        </h2>
        {companion.reviews.length === 0 ? (
          <p className="text-sm" style={{ color: "#555" }}>
            暂无评价
          </p>
        ) : (
          <div className="space-y-3">
            {companion.reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-xl"
                style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src={review.userAvatar}
                    alt={review.userName}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#f0f0f0" }}
                  >
                    {review.userName}
                  </span>
                  <StarRating rating={review.rating} size={11} />
                  <span
                    className="text-[10px] ml-auto"
                    style={{ color: "#555" }}
                  >
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#888" }}
                >
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部操作 */}
      <div
        className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4"
        style={{
          background: "rgba(13,13,13,0.9)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #2a2a2a",
        }}
      >
        <div className="flex gap-3">
          <button
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm"
            style={{ borderColor: "#2a2a2a", color: "#888" }}
          >
            <MessageCircle size={16} />
            私信
          </button>
          <Link
            href={`/booking?companionId=${companion.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm glow-green-sm"
            style={{ background: "#1a6b3c", color: "#f0f0f0" }}
          >
            立即预约 · ¥{companion.pricePerHour}/小时
          </Link>
        </div>
      </div>

      {/* 底部 padding */}
      <div className="h-32" />
    </div>
  );
}
