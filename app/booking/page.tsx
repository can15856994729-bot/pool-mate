"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import { MOCK_COMPANIONS, MOCK_VENUES } from "@/lib/mock-data";
import PageHeader from "@/components/layout/PageHeader";
import type { ServiceType } from "@/types";
import { formatPrice } from "@/lib/utils";

const SERVICE_OPTIONS: ServiceType[] = ["实战陪练", "陪练", "教学"];
const DURATION_OPTIONS = [1, 1.5, 2, 3];
const TIME_SLOTS = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companionId = searchParams.get("companionId") ?? "c1";

  const companion = MOCK_COMPANIONS.find((c) => c.id === companionId) ?? MOCK_COMPANIONS[0];

  const [service, setService] = useState<ServiceType>(companion.services[0]);
  const [duration, setDuration] = useState(1);
  const [venue, setVenue] = useState(MOCK_VENUES[0]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[4]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = companion.pricePerHour * duration;

  const handleSubmit = () => {
    setSubmitting(true);
    // Mock 下单：直接跳转成功页
    setTimeout(() => {
      const orderId = `BK${Date.now()}`;
      router.push(`/booking/success?id=${orderId}&total=${total}&companion=${companion.name}`);
    }, 800);
  };

  return (
    <div>
      <PageHeader title="预约球伴" />

      <div className="px-4 py-4 space-y-4">

        {/* 球伴信息 */}
        <div className="p-4 rounded-xl flex items-center gap-3"
          style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
          <Image src={companion.avatar} alt={companion.name} width={48} height={48} className="rounded-full" />
          <div>
            <p className="font-bold text-sm" style={{ color: "#f0f0f0" }}>{companion.name}</p>
            <p className="text-xs" style={{ color: "#888" }}>¥{companion.pricePerHour}/小时</p>
          </div>
        </div>

        {/* 选择服务 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>选择服务类型</label>
          <div className="grid grid-cols-3 gap-2">
            {SERVICE_OPTIONS.filter((s) => companion.services.includes(s)).map((s) => (
              <button
                key={s}
                onClick={() => setService(s)}
                className="py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: service === s ? "#1a6b3c" : "#1c1c1c",
                  color: service === s ? "#f0f0f0" : "#888",
                  border: `1px solid ${service === s ? "#1a6b3c" : "#2a2a2a"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 选择时长 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>选择时长</label>
          <div className="grid grid-cols-4 gap-2">
            {DURATION_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className="py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: duration === d ? "#1a6b3c" : "#1c1c1c",
                  color: duration === d ? "#f0f0f0" : "#888",
                  border: `1px solid ${duration === d ? "#1a6b3c" : "#2a2a2a"}`,
                }}
              >
                {d}h
              </button>
            ))}
          </div>
        </div>

        {/* 选择球房 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>选择球房</label>
          <div className="space-y-2">
            {MOCK_VENUES.map((v) => (
              <button
                key={v.id}
                onClick={() => setVenue(v)}
                className="w-full p-3 rounded-xl text-left flex items-center gap-3 transition-colors"
                style={{
                  background: venue.id === v.id ? "rgba(26,107,60,0.15)" : "#1c1c1c",
                  border: `1px solid ${venue.id === v.id ? "#1a6b3c" : "#2a2a2a"}`,
                }}
              >
                <MapPin size={14} color={venue.id === v.id ? "#1a6b3c" : "#555"} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#f0f0f0" }}>{v.name}</p>
                  <p className="text-xs truncate" style={{ color: "#555" }}>{v.address}</p>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: "#555" }}>{v.distance}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 选择时间 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>选择开始时间（今天）</label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => setTimeSlot(t)}
                className="py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: timeSlot === t ? "#1a6b3c" : "#1c1c1c",
                  color: timeSlot === t ? "#f0f0f0" : "#888",
                  border: `1px solid ${timeSlot === t ? "#1a6b3c" : "#2a2a2a"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>备注需求（选填）</label>
          <textarea
            className="input"
            rows={3}
            placeholder="例如：想练习走位，侧重中远台控球…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* 价格合计 */}
        <div className="p-4 rounded-xl" style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: "#888" }}>{service} × {duration}小时</span>
            <span style={{ color: "#f0f0f0" }}>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: "#888" }}>新人优惠</span>
            <span style={{ color: "#22c55e" }}>-¥30</span>
          </div>
          <div className="divider my-2" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm" style={{ color: "#888" }}>合计</span>
            <span className="font-black text-xl" style={{ color: "#c9a84c" }}>
              {formatPrice(Math.max(0, total - 30))}
            </span>
          </div>
        </div>

        {/* 安全提示 */}
        <p className="text-[11px] text-center leading-relaxed" style={{ color: "#555" }}>
          🔒 本平台仅提供台球运动陪练服务 · 请勿私下交易 · 如有问题可联系客服
        </p>

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 rounded-xl font-black text-base transition-opacity glow-green-sm"
          style={{
            background: "#1a6b3c",
            color: "#f0f0f0",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "提交中…" : `确认预约 · ${formatPrice(Math.max(0, total - 30))}`}
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#1a6b3c", borderTopColor: "transparent" }} />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
