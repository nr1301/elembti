"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FloatingParticles from "@/components/FloatingParticles";

const FEATURES = [
  { emoji: "🎯", text: "초등학생 맞춤 20문항" },
  { emoji: "🎭", text: "나와 꼭 닮은 디즈니 캐릭터 발견!" },
  { emoji: "📚", text: "내 성향에 딱 맞는 공부법 추천" },
  { emoji: "🌟", text: "신나는 체험 프로그램 추천" },
];

const EMOJIS = ["🧊","🌊","🦁","🧚","🤖","🌸","🎩","🌺"];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <FloatingParticles />

      {/* 배경 이모지 장식 */}
      {EMOJIS.map((e, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none text-2xl opacity-20"
          style={{
            left: `${[8,18,75,85,5,90,45,55][i]}%`,
            top: `${[10,80,8,72,45,35,88,20][i]}%`,
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {e}
        </motion.span>
      ))}

      {/* 메인 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="brutal-card rounded-2xl p-8 text-center">

          {/* 타이틀 헤더 박스 */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 inline-block w-full"
          >
            <div className="relative rounded-xl border-4 border-black bg-gradient-to-br from-white to-gray-100
              px-6 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]">
              {/* 상단 태그 */}
              <motion.div
                animate={{ rotate: [0,4,-4,0], y: [0,-3,0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap
                  rounded-full border-2 border-black bg-[#FFD43B] px-4 py-1
                  text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                ✨ 초등학생 MBTI 검사
              </motion.div>

              {/* 성 이모지 */}
              <motion.div
                className="mt-3 mb-2 text-6xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🏰
              </motion.div>

              <h1 style={{ fontFamily: "'Jua', sans-serif" }}
                className="text-3xl font-black leading-tight text-[#1a1a1a]">
                나는 어떤<br />
                <span className="relative inline-block text-[#5B8FF9]">
                  디즈니 캐릭터
                  <motion.span
                    className="absolute -bottom-1 left-0 h-2.5 w-full rounded bg-[#FFD43B] opacity-60 -z-10"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                </span>일까?
              </h1>
            </div>
            <motion.div
              className="mx-auto mt-2 h-1.5 rounded-full bg-gradient-to-r from-black via-gray-500 to-black"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>

          {/* 피처 리스트 */}
          <div className="mb-7 space-y-2.5 text-left">
            {FEATURES.map(({ emoji, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
                className="flex items-center gap-3 rounded-xl border-2 border-black
                  bg-gray-50 px-4 py-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
              >
                <span className="text-xl">{emoji}</span>
                <span className="text-sm font-bold text-[#1a1a1a]"
                  style={{ fontFamily: "'Jua', sans-serif" }}>{text}</span>
              </motion.div>
            ))}
          </div>

          {/* 시작 버튼 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96, rotate: [-1, 1, 0] }}
          >
            <Link href="/quiz"
              className="brutal-btn block w-full rounded-2xl bg-[#5B8FF9] py-4
                text-xl text-white text-center font-black"
              style={{ fontFamily: "'Jua', sans-serif" }}>
              🚀 검사 시작하기
            </Link>
          </motion.div>

          <p className="mt-4 text-xs text-gray-400">로그인 없이 바로 시작 · 약 5분 소요</p>
        </div>
      </motion.div>
    </main>
  );
}
