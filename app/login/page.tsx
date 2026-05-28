"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, KeyRound, ChevronRight, ShieldCheck } from "lucide-react";
import { useAuthStore, randomAvatar } from "@/store/authStore";

const MOCK_CODE = "123456";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 发送验证码（mock）
  function sendCode() {
    if (phone.length !== 11) {
      setError("请输入正确的11位手机号");
      return;
    }
    setError("");
    setCodeSent(true);
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) { clearInterval(t); return 0; }
        return n - 1;
      });
    }, 1000);
    // 提示
    setTimeout(() => alert("【球伴】验证码：123456，5分钟内有效。（演示用）"), 300);
  }

  function handleLogin() {
    setError("");
    if (phone.length !== 11) { setError("请输入正确的11位手机号"); return; }
    if (!codeSent) { setError("请先获取验证码"); return; }
    if (code !== MOCK_CODE) { setError("验证码错误，请输入 123456"); return; }

    setLoading(true);
    setTimeout(() => {
      login({
        id: `u_${phone.slice(-4)}`,
        name: `球友${phone.slice(-4)}`,
        avatar: randomAvatar(),
        phone: phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
        isCompanion: false,
        wallet: 0,
      });
      router.replace("/profile");
    }, 800);
  }

  // 微信登录（mock）
  function handleWechat() {
    setLoading(true);
    setTimeout(() => {
      login({
        id: "u_wx001",
        name: "微信用户",
        avatar: randomAvatar(),
        phone: "未绑定",
        isCompanion: false,
        wallet: 0,
      });
      router.replace("/profile");
    }, 800);
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0d0d0d" }}
    >
      {/* 顶部 */}
      <div
        className="relative px-6 pt-16 pb-10 text-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #091f11 0%, #0c1e13 50%, #0d0d0d 100%)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,107,60,0.18) 0%, transparent 70%)" }}
        />
        <div className="relative z-10">
          <div
            className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl"
            style={{
              background: "linear-gradient(135deg, #1a6b3c, #0f4526)",
              border: "2px solid rgba(26,107,60,0.5)",
              boxShadow: "0 8px 32px rgba(26,107,60,0.35)",
            }}
          >
            🎱
          </div>
          <h1 className="font-black text-[24px] mb-1" style={{ color: "#f0f0f0" }}>
            欢迎回来
          </h1>
          <p className="text-[13px]" style={{ color: "#555" }}>
            登录球伴，找陪练 · 约球局 · 找球房
          </p>
        </div>
      </div>

      {/* 表单 */}
      <div className="flex-1 px-5 pt-6">

        {/* 手机号 */}
        <div className="mb-4">
          <label className="text-[12px] font-semibold mb-1.5 block" style={{ color: "#888" }}>
            手机号
          </label>
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{ background: "#1c1c1c", border: `1px solid ${error && !phone ? "#f87171" : "#2a2a2a"}` }}
          >
            <span className="text-[13px] font-semibold" style={{ color: "#555" }}>+86</span>
            <div className="w-px h-4" style={{ background: "#2a2a2a" }} />
            <Phone size={15} color="#555" />
            <input
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 bg-transparent text-[15px] outline-none"
              style={{ color: "#f0f0f0" }}
            />
          </div>
        </div>

        {/* 验证码 */}
        <div className="mb-5">
          <label className="text-[12px] font-semibold mb-1.5 block" style={{ color: "#888" }}>
            验证码
          </label>
          <div className="flex gap-2">
            <div
              className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
            >
              <KeyRound size={15} color="#555" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="6位验证码"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="flex-1 bg-transparent text-[15px] outline-none"
                style={{ color: "#f0f0f0" }}
              />
            </div>
            <button
              onClick={sendCode}
              disabled={countdown > 0}
              className="px-4 py-3 rounded-2xl text-[13px] font-bold flex-shrink-0"
              style={{
                background: countdown > 0 ? "#1c1c1c" : "rgba(26,107,60,0.2)",
                border: `1px solid ${countdown > 0 ? "#2a2a2a" : "rgba(26,107,60,0.4)"}`,
                color: countdown > 0 ? "#444" : "#22874d",
              }}
            >
              {countdown > 0 ? `${countdown}s` : "获取验证码"}
            </button>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <p className="text-[12px] mb-4 text-center" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        {/* 登录按钮 */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-[16px] mb-4 active:opacity-85 transition-opacity"
          style={{
            background: loading ? "#1c1c1c" : "linear-gradient(135deg, #1a6b3c, #22874d)",
            color: loading ? "#555" : "#fff",
            boxShadow: loading ? "none" : "0 4px 20px rgba(26,107,60,0.4)",
          }}
        >
          {loading ? "登录中…" : "登录"}
        </button>

        {/* 分割线 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
          <span className="text-[12px]" style={{ color: "#444" }}>其他登录方式</span>
          <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
        </div>

        {/* 微信登录 */}
        <button
          onClick={handleWechat}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl font-bold text-[15px] mb-6 flex items-center justify-center gap-2 active:opacity-85"
          style={{
            background: "rgba(9,177,76,0.12)",
            border: "1px solid rgba(9,177,76,0.3)",
            color: "#09b14c",
          }}
        >
          <span className="text-xl">💬</span>
          微信一键登录
        </button>

        {/* 注册入口 */}
        <div className="text-center">
          <span className="text-[13px]" style={{ color: "#555" }}>还没有账号？</span>
          <Link
            href="/register"
            className="text-[13px] font-bold ml-1"
            style={{ color: "#22874d" }}
          >
            立即注册 <ChevronRight size={12} className="inline" />
          </Link>
        </div>

        {/* 安全提示 */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <ShieldCheck size={11} color="#333" />
          <span className="text-[10px]" style={{ color: "#333" }}>
            登录即代表同意《用户协议》和《隐私政策》
          </span>
        </div>
      </div>
    </div>
  );
}
