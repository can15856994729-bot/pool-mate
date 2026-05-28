import Link from "next/link";
import {
  Download, Smartphone, ShieldCheck, ChevronRight,
  AlertCircle, Settings, PackageOpen, Rocket, AlertTriangle,
} from "lucide-react";

const APP_VERSION = "1.0.0";
const APK_SIZE = "4.6 MB";
const MIN_ANDROID = "8.0";
const APK_PATH = "/downloads/PoolMate.apk";

const installSteps = [
  {
    icon: Download,
    color: "#1a6b3c",
    title: "点击下载 APK",
    desc: "点击上方「立即下载」按钮，等待浏览器下载完成",
  },
  {
    icon: Settings,
    color: "#3b82f6",
    title: "允许安装未知来源",
    desc: "下载完成后系统会提示，点击「设置」→ 开启「允许来自此来源的应用」",
  },
  {
    icon: PackageOpen,
    color: "#c9a84c",
    title: "打开 APK 安装",
    desc: "在通知栏或文件管理器中找到 PoolMate.apk，点击安装",
  },
  {
    icon: Rocket,
    color: "#f59e0b",
    title: "开始使用",
    desc: "安装完成，打开「球伴 CueMate」，找陪练、约球局！",
  },
];

// 各品牌手机的安装步骤
const brandGuides = [
  {
    brand: "华为 / 荣耀",
    emoji: "📱",
    color: "#ef4444",
    steps: [
      "用「华为浏览器」或「Chrome」打开下载链接",
      "下载完成后，点通知栏中的 PoolMate.apk",
      "弹出提示 → 点「设置」→ 开启「允许安装未知应用」",
      "返回安装界面，点「安装」",
    ],
    tip: "⚠️ 若华为浏览器提示「风险文件」，请改用 Chrome 浏览器下载",
  },
  {
    brand: "小米 / MIUI",
    emoji: "📱",
    color: "#f59e0b",
    steps: [
      "下载完成后点通知栏中的 APK 文件",
      "若提示安全拦截 → 选「继续安装」",
      "或前往：设置 → 隐私保护 → 特殊权限 → 安装未知应用",
    ],
    tip: null,
  },
  {
    brand: "OPPO / vivo",
    emoji: "📱",
    color: "#8b5cf6",
    steps: [
      "下载完成后在「文件管理」中找到 APK 点击",
      "弹出安全提示 → 点「允许」",
      "或前往：设置 → 安全 → 安装外部来源应用",
    ],
    tip: null,
  },
];

export default function DownloadPage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div
        className="relative px-4 pt-14 pb-8 overflow-hidden text-center"
        style={{ background: "linear-gradient(160deg, #091f11 0%, #0c1e13 40%, #0d0d0d 80%)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,107,60,0.2) 0%, transparent 70%)" }}
        />
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

        {/* 版本信息 */}
        <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
          {[`v${APP_VERSION}`, APK_SIZE, `Android ${MIN_ANDROID}+`].map((label) => (
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
          className="relative z-10 flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-[16px] active:opacity-85 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #1a6b3c, #22874d)",
            color: "#fff",
            boxShadow: "0 6px 28px rgba(26,107,60,0.5)",
          }}
        >
          <Download size={20} strokeWidth={2.5} />
          立即下载 APK（Android）
        </a>

        <p className="text-[11px] mt-3 relative z-10" style={{ color: "#444" }}>
          免费下载 · 无广告 · 无需翻墙
        </p>
      </div>

      {/* ── 下载失败？ ── */}
      <div
        className="mx-4 mt-4 p-4 rounded-2xl"
        style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={14} color="#f87171" />
          <span className="font-bold text-[13px]" style={{ color: "#f87171" }}>
            下载或安装报错？
          </span>
        </div>
        <ul className="space-y-1.5">
          {[
            "换用 Chrome 浏览器打开本页面再下载",
            "华为手机：下载后点「设置」开启「允许安装未知应用」",
            "确保手机存储空间 > 50 MB",
            "下载完成后在「文件管理 → 下载」中手动找到 APK 安装",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-[11px] mt-0.5" style={{ color: "#f87171" }}>•</span>
              <span className="text-[12px] leading-[1.6]" style={{ color: "#888" }}>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── 各品牌安装指南 ── */}
      <div className="px-4 mt-5">
        <h2 className="font-black text-[14px] mb-3" style={{ color: "#f0f0f0" }}>
          <span style={{ color: "#c9a84c", marginRight: 5 }}>▌</span>
          各品牌手机安装指南
        </h2>
        <div className="space-y-3">
          {brandGuides.map((guide) => (
            <div
              key={guide.brand}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#131313", border: "1px solid #1e1e1e" }}
            >
              {/* 品牌标题 */}
              <div
                className="flex items-center gap-2.5 px-4 py-3"
                style={{ borderBottom: "1px solid #1e1e1e" }}
              >
                <span className="text-base">{guide.emoji}</span>
                <span className="font-black text-[13px]" style={{ color: "#f0f0f0" }}>
                  {guide.brand}
                </span>
                <div
                  className="w-1.5 h-1.5 rounded-full ml-auto"
                  style={{ background: guide.color }}
                />
              </div>
              {/* 步骤 */}
              <div className="px-4 py-3 space-y-2">
                {guide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                      style={{ background: `${guide.color}20`, color: guide.color }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[12px] leading-[1.6]" style={{ color: "#888" }}>
                      {step}
                    </span>
                  </div>
                ))}
                {guide.tip && (
                  <div
                    className="flex items-start gap-2 mt-2 p-2.5 rounded-xl"
                    style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)" }}
                  >
                    <AlertCircle size={12} color="#f87171" className="flex-shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-[1.6]" style={{ color: "#f87171" }}>
                      {guide.tip}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 通用安装步骤 ── */}
      <div className="px-4 mt-5">
        <h2 className="font-black text-[14px] mb-3" style={{ color: "#f0f0f0" }}>
          <span style={{ color: "#1a6b3c", marginRight: 5 }}>▌</span>
          通用安装步骤
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
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}
                  >
                    <Icon size={16} color={item.color} />
                  </div>
                  {i < installSteps.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: "#222", minHeight: 14 }} />
                  )}
                </div>
                <div className="pb-4 flex-1">
                  <p className="text-[10px] font-black tracking-widest mb-0.5" style={{ color: item.color }}>
                    0{i + 1}
                  </p>
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
          <p className="font-bold text-[13px]" style={{ color: "#f0f0f0" }}>iOS 版本</p>
          <p className="text-[11px]" style={{ color: "#555" }}>App Store 版本开发中，敬请期待</p>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)", color: "#555", border: "1px solid #2a2a2a" }}
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
              官方发布 · 安全无毒 · 无隐私收集
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "#444" }}>
              本平台仅提供台球运动陪练、教学、组局等合法运动社交服务
            </p>
          </div>
        </div>
      </div>

      {/* ── Web 版入口 ── */}
      <div className="px-4 mt-4 mb-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-[13px] active:opacity-80"
          style={{ border: "1px solid #2a2a2a", color: "#666" }}
        >
          <Smartphone size={15} />
          先在线体验 Web 版
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="px-4 py-6 text-center">
        <p className="text-[10px]" style={{ color: "#333" }}>
          球伴 CueMate v{APP_VERSION} · 如遇安装问题请联系客服
        </p>
      </div>
    </div>
  );
}
