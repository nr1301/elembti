"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        duration: 3 + (i % 3),
        xDrift: (i % 5) * 4 - 8,
        delay: (i * 0.2) % 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-2 w-2 rounded-full bg-black/8"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -28, 0],
            x: [0, p.xDrift, 0],
            scale: [1, 1.5, 1],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
