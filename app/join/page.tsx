"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Upload, ChevronRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import type { ServiceType } from "@/types";

const STEPS = ["基本信息", "服务设置", "资质认证", "提交审核"];

const SERVICE_OPTIONS: ServiceType[] = ["陪打", "陪练", "教学", "组局"];
const LEVEL_OPTIONS = ["新手", "初级", "中级", "高级", "大师"];
const SPECIALTY_OPTIONS = [
  "中式八球", "斯诺克", "美式九球",
  "走位技术", "发球技巧", "防守战术",
  "比赛心态", "斯诺克长台", "中远台控球",
];

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // 基本信息
  const [name, setName] = useState("");
  const [city, setCity] = useState("广州市");
  const [bio, setBio] = useState("");

  // 服务设置
  const [services, setServices] = useState<ServiceType[]>(["陪打"]);
  const [level, setLevel] = useState("中级");
  const [price, setPrice] = useState("80");
  const [specialties, setSpecialties] = useState<string[]>([]);

  // 认证
  const [agreed, setAgreed] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // 提交入驻
  const toggleService = (s: ServiceType) =>
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const toggleSpecialty = (s: string) =>
    setSpecialties((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleNext = () => {
    if (step === 0 && !name) { alert("请填写昵称"); return; }
    if (step === 1 && services.length === 0) { alert("请选择至少一项服务"); return; }
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!agreed) { alert("请阅读并同意平台协议"); return; }
    setSubmitting(true);
    setTimeout(() => {
      alert("🎉 入驻申请已提交！平台将在1-3个工作日内审核，请耐心等待。");
      router.push("/profile");
    }, 800);
  };

  return (
    <div>
      <PageHeader title="成为陪练" />

      {/* 步骤指示器 */}
      <div className="flex items-center px-4 py-4">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                style={{
                  background: i <= step ? "#1a6b3c" : "#1c1c1c",
                  color: i <= step ? "#f0f0f0" : "#555",
                  border: `1px solid ${i <= step ? "#1a6b3c" : "#2a2a2a"}`,
                }}
              >
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className="text-[9px] mt-1 font-semibold" style={{ color: i <= step ? "#1a6b3c" : "#555" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-1" style={{ background: i < step ? "#1a6b3c" : "#2a2a2a" }} />
            )}
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">

        {/* Step 0: 基本信息 */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-black text-lg" style={{ color: "#f0f0f0" }}>👤 基本信息</h2>

            {/* 头像 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: "#1c1c1c", border: "2px dashed #2a2a2a" }}>
                <Upload size={24} color="#555" />
              </div>
              <p className="text-xs" style={{ color: "#555" }}>点击上传头像</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>昵称 *</label>
              <input className="input" placeholder="你的台球昵称" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>所在城市</label>
              <div className="input flex items-center justify-between" style={{ cursor: "pointer" }}>
                <span>{city}</span>
                <ChevronRight size={16} color="#555" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>个人介绍</label>
              <textarea className="input" rows={3}
                placeholder="介绍你的台球经历、风格、特长…"
                value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 1: 服务设置 */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-black text-lg" style={{ color: "#f0f0f0" }}>🎱 服务设置</h2>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>服务类型（可多选）</label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((s) => (
                  <button key={s} onClick={() => toggleService(s)}
                    className="py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      background: services.includes(s) ? "#1a6b3c" : "#1c1c1c",
                      color: services.includes(s) ? "#f0f0f0" : "#888",
                      border: `1px solid ${services.includes(s) ? "#1a6b3c" : "#2a2a2a"}`,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>台球水平</label>
              <div className="grid grid-cols-5 gap-1.5">
                {LEVEL_OPTIONS.map((l) => (
                  <button key={l} onClick={() => setLevel(l)}
                    className="py-2 rounded-xl text-xs font-bold transition-colors"
                    style={{
                      background: level === l ? "#c9a84c" : "#1c1c1c",
                      color: level === l ? "#0d0d0d" : "#888",
                      border: `1px solid ${level === l ? "#c9a84c" : "#2a2a2a"}`,
                    }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>服务价格（元/小时）</label>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black" style={{ color: "#c9a84c" }}>¥</span>
                <input
                  type="number"
                  className="input flex-1"
                  placeholder="建议60-200"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className="text-sm" style={{ color: "#555" }}>/小时</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#888" }}>擅长项目（可多选）</label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTY_OPTIONS.map((s) => (
                  <button key={s} onClick={() => toggleSpecialty(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      background: specialties.includes(s) ? "rgba(26,107,60,0.3)" : "#1c1c1c",
                      color: specialties.includes(s) ? "#22874d" : "#888",
                      border: `1px solid ${specialties.includes(s) ? "#1a6b3c" : "#2a2a2a"}`,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 资质认证 */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-black text-lg" style={{ color: "#f0f0f0" }}>🏅 资质认证</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
              上传资质有助于提升用户信任度，增加接单量。陪练须完成实名认证方可上线接单。
            </p>

            {[
              { label: "台球水平证明", sub: "比赛证书、成绩单截图等", required: false },
              { label: "实战视频", sub: "上传1-3段打球视频（不超过30秒）", required: false },
              { label: "身份证正面", sub: "用于实名认证", required: true },
              { label: "身份证反面", sub: "用于实名认证", required: true },
            ].map(({ label, sub, required }) => (
              <div key={label}>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs font-bold" style={{ color: "#888" }}>{label}</span>
                  {required && <span className="text-xs" style={{ color: "#f87171" }}>*必填</span>}
                </div>
                <div
                  className="h-28 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
                  style={{ background: "#1c1c1c", border: "2px dashed #2a2a2a" }}
                  onClick={() => alert("请选择文件上传")}
                >
                  <Upload size={24} color="#555" />
                  <p className="text-xs" style={{ color: "#555" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: 提交审核 */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-black text-lg" style={{ color: "#f0f0f0" }}>📋 提交审核</h2>

            {/* 信息摘要 */}
            <div className="p-4 rounded-xl space-y-3" style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}>
              {[
                { label: "昵称", value: name || "未填写" },
                { label: "城市", value: city },
                { label: "台球水平", value: level },
                { label: "服务类型", value: services.join("、") || "未选择" },
                { label: "服务价格", value: `¥${price}/小时` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span style={{ color: "#555" }}>{label}</span>
                  <span style={{ color: "#f0f0f0" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* 协议 */}
            <div
              className="p-4 rounded-xl text-xs leading-relaxed"
              style={{ background: "rgba(26,107,60,0.08)", border: "1px solid rgba(26,107,60,0.2)", color: "#888" }}
            >
              <p className="font-bold mb-2" style={{ color: "#1a6b3c" }}>平台服务声明</p>
              本平台仅提供台球运动陪练、教学、组局等合法运动社交服务，严禁任何违法、违规或低俗行为。
              违者将永久封号并保留追究法律责任的权利。
            </div>

            {/* 同意 */}
            <button
              onClick={() => setAgreed(!agreed)}
              className="flex items-center gap-3"
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: agreed ? "#1a6b3c" : "#1c1c1c", border: `1px solid ${agreed ? "#1a6b3c" : "#2a2a2a"}` }}
              >
                {agreed && <CheckCircle size={14} color="#fff" />}
              </div>
              <span className="text-xs text-left" style={{ color: "#888" }}>
                我已阅读并同意《球伴平台陪练入驻协议》和《用户服务协议》
              </span>
            </button>
          </div>
        )}

        {/* 按钮 */}
        <div className="mt-6">
          {step < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-black text-base"
              style={{ background: "#1a6b3c", color: "#f0f0f0" }}
            >
              下一步
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-4 rounded-xl font-black text-base transition-opacity"
              style={{
                background: "#c9a84c",
                color: "#0d0d0d",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "提交中…" : "🎉 提交入驻申请"}
            </button>
          )}

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-full py-3 mt-2 text-sm font-semibold"
              style={{ color: "#555" }}
            >
              上一步
            </button>
          )}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
