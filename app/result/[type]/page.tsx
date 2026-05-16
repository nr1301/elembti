"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { results } from "@/data/results";
import FloatingParticles from "@/components/FloatingParticles";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cfg = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), cfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), cfg);
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.x + r.width / 2)) / r.width);
        y.set((e.clientY - (r.y + r.height / 2)) / r.height);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >{children}</motion.div>
  );
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const type = (params?.type as string)?.toUpperCase();
  const result = results[type];
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="text-6xl">😅</div>
        <p className="text-xl font-black" style={{ fontFamily: "'Jua', sans-serif" }}>결과를 찾을 수 없어요</p>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => router.push("/quiz")}
          className="brutal-btn rounded-2xl bg-[#5B8FF9] px-8 py-3 text-lg font-black text-white"
          style={{ fontFamily: "'Jua', sans-serif" }}>
          다시 검사하기
        </motion.button>
      </main>
    );
  }

  async function handleSave() {
    if (saving || !cardRef.current) return;
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, backgroundColor: "#f0f0f0" });
      const link = document.createElement("a");
      link.download = `mbti-${type}-결과.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch { alert("이미지 저장에 실패했어요."); }
    finally { setSaving(false); }
  }

  async function handleShare() {
    const text = `나는 ${result.character}! ${result.type} 유형이에요 🌟\n${result.tagline}`;
    if (navigator.share) {
      try { await navigator.share({ title: text, url: window.location.href }); } catch { /* 취소 */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert("링크가 복사되었어요! 친구에게 공유해 보세요 🎉");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10">
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-md space-y-5">

        {/* ── 결과 카드 ── */}
        <TiltCard>
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border-4 border-black bg-white
              shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]"
          >
            {/* 유형 헤더 */}
            <div className="relative flex items-center justify-between px-6 py-4"
              style={{ background: result.color, borderBottom: "3px solid #000" }}>
              <span className="text-2xl font-black tracking-widest text-white"
                style={{ fontFamily: "'Jua', sans-serif" }}>{type}</span>

              {/* 배지 (레퍼런스의 animated badge) */}
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 0.9, 1.1, 1], y: [0, -4, 4, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: [0.76, 0, 0.24, 1] }}
                className="rounded-full border-2 border-black bg-[#FFD43B]
                  px-3 py-1 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >나의 유형!</motion.div>
            </div>

            {/* 캐릭터 */}
            <div className="flex flex-col items-center px-6 pt-6 pb-5 text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-4 h-48 w-48 overflow-hidden rounded-full
                  border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]"
              >
                {!imgError ? (
                  <Image src={result.image} alt={result.character} fill
                    className="object-cover" onError={() => setImgError(true)} priority />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-7xl bg-gray-100">🎭</div>
                )}
              </motion.div>

              <p className="text-xs font-bold text-gray-400">{result.movie}</p>
              <h1 className="mt-0.5 text-3xl font-black text-[#1a1a1a]"
                style={{ fontFamily: "'Jua', sans-serif" }}>{result.character}</h1>

              {/* 태그라인 */}
              <motion.div
                animate={{ y: [0, -3, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-2 rounded-full border-2 border-black px-4 py-1
                  text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
                style={{ background: result.color, fontFamily: "'Jua', sans-serif" }}
              >{result.tagline}</motion.div>

              {/* 특성 태그 */}
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {result.traits.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.1, rotate: [-2, 2, 0], transition: { duration: 0.3 } }}
                    className="rounded-full border-2 border-black bg-[#FFD43B]
                      px-3 py-0.5 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >{t}</motion.span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">{result.description}</p>
            </div>
          </motion.div>
        </TiltCard>

        {/* ── 공부법 섹션 ── */}
        <Section title="📚 나에게 맞는 공부법" color={result.color}>
          {result.studyTips.map((tip, i) => (
            <FeatureRow key={i} emoji={tip.emoji} title={tip.title} desc={tip.desc}
              color={result.color} delay={i * 0.1} />
          ))}
        </Section>

        {/* ── 체험 프로그램 섹션 ── */}
        <Section title="🌟 추천 체험 프로그램" color={result.color}>
          {result.experiences.map((exp, i) => (
            <FeatureRow key={i} emoji={exp.emoji} title={exp.title} desc={exp.desc}
              sub={exp.reason} color={result.color} delay={i * 0.1 + 0.2} />
          ))}
        </Section>

        {/* ── 액션 버튼 ── */}
        <div className="space-y-3 pb-10">
          {[
            { label: saving ? "⏳ 저장 중..." : "📸 결과 이미지 저장하기", bg: result.color, color: "#fff", onClick: handleSave, disabled: saving },
            { label: "🔗 친구에게 공유하기", bg: "#FFD43B", color: "#1a1a1a", onClick: handleShare },
            { label: "🔄 다시 검사하기", bg: "#fff", color: "#555", onClick: () => router.push("/quiz") },
          ].map(({ label, bg, color, onClick, disabled }, i) => (
            <motion.button
              key={i}
              onClick={onClick}
              disabled={disabled}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96, rotate: [-1, 1, 0] }}
              className="brutal-btn w-full rounded-2xl py-4 text-base font-black disabled:opacity-60"
              style={{ background: bg, color, fontFamily: "'Jua', sans-serif" }}
            >{label}</motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border-3 border-black bg-white p-5"
      style={{ border: "3px solid #000", boxShadow: `6px 6px 0px 0px ${color}` }}
    >
      <h2 className="mb-3 text-lg font-black text-[#1a1a1a]"
        style={{ fontFamily: "'Jua', sans-serif" }}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

function FeatureRow({ emoji, title, desc, sub, color, delay }: {
  emoji: string; title: string; desc: string; sub?: string; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
      className="flex items-start gap-3 rounded-xl border-2 border-black bg-gray-50 p-3
        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
    >
      <motion.span
        whileHover={{ scale: 1.2, rotate: 360 }}
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center
          rounded-lg border-2 border-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]"
        style={{ background: `${color}22` }}
      >{emoji}</motion.span>
      <div>
        <p className="font-black text-[#1a1a1a]"
          style={{ fontFamily: "'Jua', sans-serif" }}>{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
        {sub && (
          <p className="mt-1 text-xs font-black" style={{ color }}>✓ {sub}</p>
        )}
      </div>
    </motion.div>
  );
}
