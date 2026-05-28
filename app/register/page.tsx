"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, KeyRound, User, ShieldCheck, ChevronLeft } from "lucide-react";
import { useAuthStore, randomAvatar } from "@/store/authStore";

const MOCK_CODE = "123456";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function sendCode() {
    if (phone.length !== 11) { setError("请输入正确的11位手机号"); return; }
    setError("");
    setCodeSent(true);
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) { clearInterval(t); return 0; }
        return n - 1;
      });
    }, 1000);
    setTimeout(() => alert("【球伴】验证码：123456，5分钟内有效。（演示用）"), 300);
  }

  function handleRegister() {
    setError("");
    if (!name.trim()) { setError("请输入昵称"); return; }
    if (name.trim().length > 12) { setError("昵称最多12个字"); return; }
    if (phone.length !== 11) { setError("请输入正确的11位手机号"); return; }
    if (!codeSent) { setError("请先获取验证码"); return; }
    if (code !== MOCK_CODE) { setError("验证码错误，请输入 123456"); return; }

    setLoading(true);
    setTimeout(() => {
      login({
        id: `u_${phone.slice(-4)}_${Date.now()}`,
        name: name.trim(),
        avatar: randomAvatar(),
        phone: phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
        isCompanion: false,
        wallet: 30, // 新人赠送 ¥30 运动券
      });
      router.replace("/profile");
    }, 800);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d0d0d" }}>

      {/* 顶部 */}
      <div
        className="relative px-5 pt-14 pb-8 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #091f11 0%, #0c1e13 50%, #0d0d0d 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }}
        />
        <Link href="/login" className="relative z-10 flex items-center gap-1 mb-5 w-fit active:opacity-70">
          <ChevronLeft size={18} color="#555" />
          <span className="text-[13px]" style={{ color: "#555" }}>返回登录</span>
        </Link>
        <div className="relative z-10">
          <p className="text-[11px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: "#1a6b3c" }}>
            加入球伴
          </p>
          <h1 className="font-black text-[26px] mb-1" style={{ color: "#f0f0f0" }}>
            创建账号
          </h1>
          <p className="text-[13px]" style={{ color: "#555" }}>
            注册后立享新人优惠券 <span style={{ color: "#c9a84c" }}>¥30</span>
          </p>
        </div>
      </div>

      {/* 表单 */}
      <div className="flex-1 px-5 pt-6">

        {/* 昵称 */}
        <div className="mb-4">
          <label className="text-[12px] font-semibold mb-1.5 block" style={{ color: "#888" }}>
            昵称
          </label>
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
          >
            <User size={15} color="#555" />
            <input
              type="text"
              maxLength={12}
              placeholder="给自己起个好名字（最多12字）"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent text-[15px] outline-none"
              style={{ color: "#f0f0f0" }}
            />
            <span className="text-[11px]" style={{ color: "#444" }}>
              {name.length}/12
            </span>
          </div>
        </div>

        {/* 手机号 */}
        <div className="mb-4">
          <label className="text-[12px] font-semibold mb-1.5 block" style={{ color: "#888" }}>
            手机号
          </label>
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
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

        {/* 注册按钮 */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-[16px] mb-4 active:opacity-85 transition-opacity"
          style={{
            background: loading ? "#1c1c1c" : "linear-gradient(135deg, #1a6b3c, #22874d)",
            color: loading ? "#555" : "#fff",
            boxShadow: loading ? "none" : "0 4px 20px rgba(26,107,60,0.4)",
          }}
        >
          {loading ? "注册中…" : "立即注册"}
        </button>

        {/* 新人福利提示 */}
        <div
          className="p-3 rounded-xl flex items-center gap-3 mb-5"
          style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <span className="text-xl">🎁</span>
          <div>
            <p className="text-[12px] font-bold" style={{ color: "#c9a84c" }}>新人专属福利</p>
            <p className="text-[11px]" style={{ color: "#666" }}>
              注册即送 ¥30 运动券，首单立减
            </p>
          </div>
        </div>

        {/* 已有账号 */}
        <div className="text-center">
          <span className="text-[13px]" style={{ color: "#555" }}>已有账号？</span>
          <Link href="/login" className="text-[13px] font-bold ml-1" style={{ color: "#22874d" }}>
            直接登录
          </Link>
        </div>

        {/* 协议 */}
        <div className="flex items-center justify-center gap-1.5 mt-5 mb-4">
          <ShieldCheck size={11} color="#333" />
          <span className="text-[10px]" style={{ color: "#333" }}>
            注册即代表同意《用户协议》和《隐私政策》
          </span>
        </div>
      </div>
    </div>
  );
}
