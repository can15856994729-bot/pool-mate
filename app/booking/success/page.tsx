"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const total = searchParams.get("total");
  const companion = searchParams.get("companion");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
      style={{ background: "linear-gradient(160deg, #0f3d23 0%, #0d0d0d 50%)" }}>

      {/* 成功图标 */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: "rgba(26,107,60,0.2)", border: "2px solid rgba(26,107,60,0.4)" }}>
          <CheckCircle size={48} color="#1a6b3c" strokeWidth={1.5} />
        </div>
        <div className="absolute inset-0 rounded-full" style={{ background: "rgba(26,107,60,0.1)", filter: "blur(20px)" }} />
      </div>

      {/* 标题 */}
      <p className="text-xs font-bold tracking-widest mb-2" style={{ color: "#1a6b3c" }}>预约成功</p>
      <h1 className="text-4xl font-black mb-3" style={{ color: "#f0f0f0" }}>已确认！🎱</h1>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: "#888" }}>
        您的预约已提交，{companion ?? "球伴教练"}将在30分钟内确认。
      </p>

      {/* 订单信息 */}
      <div className="w-full p-5 rounded-2xl mb-6 text-left"
        style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
        <p className="text-xs font-bold mb-3" style={{ color: "#555" }}>预约单号</p>
        <p className="font-black text-xl tracking-widest mb-4" style={{ color: "#c9a84c" }}>{orderId}</p>

        {total && (
          <>
            <div className="divider mb-3" />
            <div className="flex justify-between text-sm">
              <span style={{ color: "#888" }}>实付金额</span>
              <span className="font-black" style={{ color: "#f0f0f0" }}>¥{total}</span>
            </div>
          </>
        )}
      </div>

      {/* 下一步说明 */}
      <div className="w-full p-4 rounded-2xl mb-8 text-left"
        style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
        <p className="text-xs font-bold mb-3" style={{ color: "#888" }}>接下来</p>
        <ul className="space-y-3">
          {[
            "球伴教练确认后，您将收到通知",
            "请提前10分钟到达约定球房",
            "如需修改请提前2小时联系球伴教练",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#888" }}>
              <CheckCircle size={13} color="#1a6b3c" className="flex-shrink-0 mt-0.5" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="w-full space-y-3">
        <Link
          href="/orders"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-sm glow-green-sm"
          style={{ background: "#1a6b3c", color: "#f0f0f0" }}
        >
          查看我的订单 <ArrowRight size={16} />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center w-full py-4 rounded-xl font-semibold text-sm"
          style={{ border: "1px solid #2a2a2a", color: "#888" }}
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#1a6b3c", borderTopColor: "transparent" }} />
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
