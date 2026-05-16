"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { questions, type Choice } from "@/data/questions";
import FloatingParticles from "@/components/FloatingParticles";

type Answers = Record<number, Choice>;

function calcType(answers: Answers): string {
  const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  questions.forEach((q) => {
    const a = answers[q.id];
    if (!a) return;
    if (q.dimension === "EI") a === "A" ? s.E++ : s.I++;
    else if (q.dimension === "SN") a === "A" ? s.S++ : s.N++;
    else if (q.dimension === "TF") a === "A" ? s.T++ : s.F++;
    else if (q.dimension === "JP") a === "A" ? s.J++ : s.P++;
  });
  return (s.E >= s.I ? "E" : "I") + (s.S >= s.N ? "S" : "N") +
         (s.T >= s.F ? "T" : "F") + (s.J >= s.P ? "J" : "P");
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cfg = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), cfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), cfg);

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
    >
      {children}
    </motion.div>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<Choice | null>(null);
  const [animating, setAnimating] = useState(false);

  const total = questions.length;
  const q = questions[current];
  const progress = (current / total) * 100;

  function handleSelect(choice: Choice) {
    if (animating) return;
    setSelected(choice);
    setTimeout(() => {
      const next = { ...answers, [q.id]: choice };
      setAnswers(next);
      if (current + 1 < total) {
        setAnimating(true);
        setTimeout(() => { setCurrent((c) => c + 1); setSelected(null); setAnimating(false); }, 220);
      } else {
        router.push(`/result/${calcType(next)}`);
      }
    }, 280);
  }

  function handleBack() {
    if (current === 0) { router.push("/"); return; }
    setCurrent((c) => c - 1);
    setSelected(answers[questions[current - 1].id] ?? null);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8">
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-md">
        {/* 헤더 */}
        <div className="mb-5 flex items-center gap-3">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="brutal-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg"
          >←</motion.button>

          <div className="flex-1">
            <div className="mb-1.5 flex justify-between text-xs font-bold text-gray-500"
              style={{ fontFamily: "'Jua', sans-serif" }}>
              <span>질문 {current + 1} / {total}</span>
              <span>{Math.round(progress)}% 완료 ✨</span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 문항 카드 (3D 틸트) */}
        <TiltCard>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animating ? 0 : 1, y: animating ? -10 : 0 }}
            transition={{ duration: 0.25 }}
            className="brutal-card rounded-2xl p-7"
          >
            {/* Q 번호 뱃지 */}
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 0.95, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-4 inline-flex h-9 w-9 items-center justify-center
                rounded-full border-2 border-black bg-[#FFD43B]
                text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Jua', sans-serif" }}
            >
              Q{current + 1}
            </motion.div>

            <div className="mb-7 text-center">
              <motion.div
                key={`emoji-${current}`}
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-3 text-5xl"
              >{q.emoji}</motion.div>
              <h2 className="text-xl font-black leading-snug text-[#1a1a1a]"
                style={{ fontFamily: "'Jua', sans-serif" }}>{q.text}</h2>
            </div>

            {/* 선택지 */}
            <div className="space-y-3">
              {(["A", "B"] as Choice[]).map((choice, idx) => {
                const label = choice === "A" ? q.optionA : q.optionB;
                const isSel = selected === choice;
                return (
                  <motion.button
                    key={choice}
                    onClick={() => handleSelect(choice)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
                    whileTap={{ scale: 0.97 }}
                    className={`choice-btn ${isSel ? "selected" : ""}`}
                  >
                    <span className="flex items-start gap-3">
                      <motion.span
                        animate={isSel ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center
                          rounded-full border-2 border-black text-xs font-black
                          shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)]
                          ${isSel ? "bg-white text-[#5B8FF9]" : "bg-[#5B8FF9] text-white"}`}
                      >{choice}</motion.span>
                      {label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </TiltCard>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-5 text-center text-sm text-gray-400"
          style={{ fontFamily: "'Jua', sans-serif" }}
        >💡 솔직하게 고르는 게 가장 정확해요!</motion.p>
      </div>
    </main>
  );
}
