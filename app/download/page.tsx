import Link from "next/link";
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  AlertCircle,
  Wifi,
  Settings,
  PackageOpen,
  Rocket,
} from "lucide-react";

const APP_VERSION = "1.0.0";
const APK_SIZE = "28 MB";
const MIN_ANDROID = "8.0";
const APK_PATH = "/downloads/PoolMate.apk";

const installSteps = [
  {
    icon: Download,
    color: "#1a6b3c",
    title: "点击下载 APK",
    desc: "点击上方「立即下载」按钮，浏览器会开始下载 PoolMate.apk 文件",
  },
  {
    icon: Settings,
    color: "#3b82f6",
    title: "允许安装未知来源",
    desc: '若弹出提示，前往 设置 → 安全 → 打开「允许安装未知来源应用」，不同手机路径略有不同',
  },
  {
    icon: PackageOpen,
    color: "#c9a84c",
    title: "打开 APK 文件安装",
    desc: "在下载通知栏或文件管理器中找到 PoolMate.apk，点击打开并按提示完成安装",
  },
  {
    icon: Rocket,
    color: "#f59e0b",
    title: "开始使用",
    desc: "安装完成后打开「球伴 CueMate」，找陪练、约球局、发现附近球房！",
  },
];

export default function DownloadPage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div
        className="relative px-4 pt-14 pb-8 overflow-hidden text-center"
        style={{
          background:
            "linear-gradient(160deg, #091f11 0%, #0c1e13 40%, #0d0d0d 80%)",
        }}
      >
        {/* 背景光晕 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(26,107,60,0.2) 0%, transparent 70%)",
          }}
        />

        {/* App 图标 */}
        <div
          className="w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center text-5xl relative z-10"
          style={{
            background: "linear-gradient(135deg, #1a6b3c, #0f4526)",
            border: "2px solid rgba(26,107,60,0.5)",
            boxShadow: "0 8px 32px rgba(26,107,60,0.4)",
          }}
        >
          🎱
        </div>

        <h1 className="font-black text-[26px] mb-1 relative z-10" style={{ color: "#f0f0f0" }}>
          球伴 CueMate
        </h1>
        <p className="text-[13px] mb-4 relative z-10" style={{ color: "#888" }}>
          台球运动社交平台 · 找陪练 · 约球局 · 找球房
        </p>

        {/* 版本信息徽章 */}
        <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
          {[
            { label: `v${APP_VERSION}` },
            { label: `${APK_SIZE}` },
            { label: `Android ${MIN_ANDROID}+` },
          ].map(({ label }) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#888",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* 主下载按钮 */}
        <a
          href={APK_PATH}
          download="PoolMate.apk"
          className="relative z-10 flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-[16px] active:opacity-85 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #1a6b3c, #22874d)",
            color: "#fff",
            boxShadow: "0 6px 28px rgba(26,107,60,0.5)",
          }}
        >
          <Download size={20} strokeWidth={2.5} />
          立即下载 APK
        </a>

        <p className="text-[11px] mt-3 relative z-10" style={{ color: "#444" }}>
          免费下载 · 无需登录即可浏览 · 数据安全有保障
        </p>
      </div>

      {/* ── 安全提示 ── */}
      <div
        className="mx-4 mt-4 p-3 rounded-xl flex items-start gap-2.5"
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <AlertCircle size={15} color="#3b82f6" className="flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-[1.7]" style={{ color: "#6ba3f5" }}>
          本 APK 由球伴官方发布，请勿从第三方渠道下载。安装前建议连接 Wi-Fi，
          安装完成后可在设置中关闭「未知来源」权限。
        </p>
      </div>

      {/* ── 功能亮点 ── */}
      <div className="px-4 mt-5">
        <h2 className="font-black text-[14px] mb-3" style={{ color: "#f0f0f0" }}>
          <span style={{ color: "#1a6b3c", marginRight: 5 }}>▌</span>
          核心功能
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { emoji: "🔍", title: "找陪练",   desc: "附近实名认证陪练一键预约" },
            { emoji: "📅", title: "约球局",   desc: "同城组局，随时加入球局广场" },
            { emoji: "🏠", title: "找球房",   desc: "查看附近球房实时可约球桌" },
            { emoji: "⭐", title: "双向评价", desc: "服务结束互评，平台有保障" },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="p-3 rounded-xl"
              style={{ background: "#131313", border: "1px solid #1e1e1e" }}
            >
              <div className="text-xl mb-1.5">{emoji}</div>
              <p className="font-bold text-[13px] mb-0.5" style={{ color: "#f0f0f0" }}>
                {title}
              </p>
              <p className="text-[11px] leading-[1.5]" style={{ color: "#555" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 安装步骤 ── */}
      <div className="px-4 mt-5">
        <h2 className="font-black text-[14px] mb-3" style={{ color: "#f0f0f0" }}>
          <span style={{ color: "#c9a84c", marginRight: 5 }}>▌</span>
          安装步骤
        </h2>
        <div
          className="rounded-2xl p-4"
          style={{ background: "#131313", border: "1px solid #1e1e1e" }}
        >
          {installSteps.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}33`,
                    }}
                  >
                    <Icon size={16} color={item.color} />
                  </div>
                  {i < installSteps.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: "#222", minHeight: 14 }}
                    />
                  )}
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[10px] font-black tracking-widest"
                      style={{ color: item.color }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p className="font-bold text-[13px] mb-0.5" style={{ color: "#f0f0f0" }}>
                    {item.title}
                  </p>
                  <p className="text-[11px] leading-[1.6]" style={{ color: "#555" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── iOS 敬请期待 ── */}
      <div
        className="mx-4 mt-4 p-4 rounded-2xl flex items-center gap-3"
        style={{ background: "#131313", border: "1px solid #1e1e1e" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          🍎
        </div>
        <div className="flex-1">
          <p className="font-bold text-[13px]" style={{ color: "#f0f0f0" }}>
            iOS 版本
          </p>
          <p className="text-[11px]" style={{ color: "#555" }}>
            App Store 版本开发中，敬请期待
          </p>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#555",
            border: "1px solid #2a2a2a",
          }}
        >
          即将上线
        </span>
      </div>

      {/* ── 安全保障 ── */}
      <div className="px-4 mt-4">
        <div
          className="p-3 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(26,107,60,0.08)", border: "1px solid rgba(26,107,60,0.15)" }}
        >
          <ShieldCheck size={18} color="#1a6b3c" className="flex-shrink-0" />
          <div>
            <p className="font-bold text-[12px]" style={{ color: "#22874d" }}>
              实名认证 · 公开球房 · 平台担保
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "#444" }}>
              本平台仅提供台球运动陪练、教学、组局等合法运动社交服务
            </p>
          </div>
        </div>
      </div>

      {/* ── 在线预览 ── */}
      <div className="px-4 mt-4 mb-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-[13px] active:opacity-80"
          style={{
            border: "1px solid #2a2a2a",
            color: "#666",
          }}
        >
          <Smartphone size={15} />
          先在线体验 Web 版
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* ── 底部版权 ── */}
      <div className="px-4 py-6 text-center">
        <p className="text-[10px]" style={{ color: "#333" }}>
          球伴 CueMate v{APP_VERSION} · 仅供台球运动社交使用
        </p>
        <p className="text-[10px] mt-1" style={{ color: "#333" }}>
          如遇安装问题请联系客服
        </p>
      </div>

    </div>
  );
}
