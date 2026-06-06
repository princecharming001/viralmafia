"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* A chubby, friendly narwhal facing right (nose + tusk lead the leap). */
function Narwhal() {
  return (
    <svg
      viewBox="0 0 200 120"
      width="150"
      height="90"
      fill="none"
      className="drop-shadow-[0_10px_18px_rgba(20,40,70,0.25)]"
      aria-hidden
    >
      {/* tail fluke */}
      <path
        d="M30 62 C14 50 6 44 0 47 C8 55 12 60 20 64 C12 68 8 74 0 84 C8 86 18 78 30 68 Z"
        fill="#5f7fa6"
      />
      {/* body */}
      <path
        d="M26 64 C24 43 66 33 118 46 C141 52 151 58 151 64 C151 71 141 77 118 83 C66 95 28 85 26 64 Z"
        fill="#6f8fb0"
      />
      {/* belly highlight */}
      <path
        d="M44 75 C74 87 112 83 138 74 C114 81 74 85 44 75 Z"
        fill="#dcebf8"
        opacity="0.7"
      />
      {/* pectoral flipper */}
      <path
        d="M116 75 C120 88 131 93 138 89 C132 83 127 78 123 73 Z"
        fill="#5f7fa6"
      />
      {/* tusk */}
      <path d="M151 60 L199 50 L199 54 L152 64 Z" fill="#f1e7cd" />
      {/* tusk spiral */}
      <g stroke="#cdb98c" strokeWidth="1.1" strokeLinecap="round">
        <path d="M160 57 l4 4" />
        <path d="M170 55 l4 4" />
        <path d="M180 53 l4 4" />
        <path d="M190 51 l3 4" />
      </g>
      {/* mouth */}
      <path
        d="M150 67 q -9 4 -16 1"
        stroke="#3c5878"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* eye */}
      <circle cx="138" cy="58" r="2.6" fill="#16110d" />
      <circle cx="139" cy="57" r="0.8" fill="#fff" />
    </svg>
  );
}

const DROPS = [-66, -40, -18, 16, 38, 64];

function Splash({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {DROPS.map((vx, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-full"
          style={{ width: 7, height: 7, backgroundColor: "#bcd8f0" }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            x: vx,
            y: [0, -38 - Math.abs(vx) * 0.35, 34],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.4],
          }}
          transition={{ duration: 0.9, delay, ease: "easeOut", times: [0, 0.4, 1] }}
        />
      ))}
    </div>
  );
}

export default function NarwhalLeap() {
  const reduce = useReducedMotion();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setGone(true), 2900);
    return () => clearTimeout(t);
  }, [reduce]);

  // This component is only ever mounted client-side (on submit success).
  if (reduce || gone || typeof window === "undefined") return null;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const startX = -w * 0.16;
  const endX = w * 1.16;
  const lowY = h * 0.74;
  const apexY = -h * 0.18; // control point above the top edge -> tall arc
  // smooth symmetric arch from below-left to below-right
  const path = `M ${startX} ${lowY} Q ${w * 0.5} ${apexY} ${endX} ${lowY}`;

  const DURATION = 2.2;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {/* takeoff + landing water bursts */}
      <Splash x={startX + w * 0.12} y={lowY - 6} delay={0.05} />
      <Splash x={endX - w * 0.12} y={lowY - 6} delay={DURATION * 0.82} />

      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          offsetPath: `path("${path}")`,
          offsetRotate: "auto",
          offsetAnchor: "50% 50%",
        }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "35%", "50%", "65%", "100%"] }}
        transition={{
          duration: DURATION,
          ease: "easeInOut",
          times: [0, 0.22, 0.5, 0.78, 1],
        }}
      >
        {/* gentle swimming flex so it reads alive, not rigid */}
        <motion.div
          animate={{ rotate: [-3, 3, -2, 3, -3], scaleY: [1, 1.05, 0.97, 1.05, 1] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          <Narwhal />
        </motion.div>
      </motion.div>
    </div>
  );
}
