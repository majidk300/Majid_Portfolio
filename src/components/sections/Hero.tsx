import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { Mail, ChevronDown, ArrowRight, Download, MapPin } from "lucide-react";
import { PROFILE, TECH_BADGES } from "../../data/portfolio";

/* ─── Typewriter ─────────────────────────────────────────────────────────── */
const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Java Spring Boot Developer",
  "Cloud Engineer (AWS / Azure)",
  "Flutter Developer",
];
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = ROLES[idx];
    const t = setTimeout(() => {
      if (!del && txt.length < cur.length)        setTxt(cur.slice(0, txt.length + 1));
      else if (!del && txt.length === cur.length) setTimeout(() => setDel(true), 2000);
      else if (del && txt.length > 0)             setTxt(txt.slice(0, -1));
      else { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
    }, del ? 30 : 60);
    return () => clearTimeout(t);
  }, [txt, del, idx]);
  return (
    <span style={{ fontFamily: "var(--font-mono)", color: "var(--col-blue)", fontSize: "clamp(13px,1.8vw,15px)" }}>
      {txt}<span className="cursor-blink" style={{ color: "var(--col-blue)" }}>|</span>
    </span>
  );
}

/* ─── Tech bubble icons (SVG) ────────────────────────────────────────────── */
const BUBBLES = [
  {
    id: "java", label: "Java",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#e65100" d="M12 16s-.7.4.5.55c1.45.17 2.2.14 3.79-.16 0 0 .42.27 1.01.49-3.58 1.53-8.1-.09-5.3-.88z"/>
        <path fill="#e65100" d="M11.6 13.7s-.79.58.41.7c1.56.16 2.78.18 4.9-.23 0 0 .3.3.76.45-4.33 1.27-9.16.1-6.07-.92z"/>
        <path fill="#e65100" d="M15.13 9.34c.88 1.02-.23 1.94-.23 1.94s2.25-1.16 1.21-2.61c-.97-1.34-1.7-2.01 2.3-4.32 0 0-6.28 1.57-3.28 4.99z"/>
        <path fill="#e65100" d="M20.13 17s.52.43-.58.76c-2.07.63-8.64.82-10.47.03-.66-.29.58-.68.97-.76.41-.09.64-.07.64-.07-.73-.51-4.75 1.02-2.04 1.46 7.4 1.2 13.48-.53 11.48-1.42z"/>
        <path fill="#e65100" d="M12.44 11.39s-3.37.8-1.19 1.09c.92.12 2.75.09 4.46-.05 1.39-.11 2.79-.37 2.79-.37s-.49.21-.85.45c-3.42.9-10.02.48-8.12-.44 1.61-.78 2.91-.03 2.91-.03z"/>
        <path fill="#e65100" d="M18.35 14.47c3.48-1.81 1.87-3.55.75-3.31-.27.06-.4.11-.4.11s.1-.16.3-.23c2.18-.77 3.87 2.27-.72 3.47 0 0 .05-.04.07-.04z"/>
        <path fill="#bf360c" d="M16.29 2.67S18.53 4.91 14.06 8.39c-3.57 2.82-.81 4.43 0 6.26-2.09-1.88-3.61-3.54-2.59-5.08 1.51-2.26 5.68-3.36 4.82-6.9z"/>
        <path fill="#e65100" d="M13.05 21.72c3.34.21 8.47-.12 8.59-1.68 0 0-.23.6-2.76 1.07-2.85.54-6.37.48-8.45.13 0 0 .43.35 2.62.48z"/>
        <path fill="#1565c0" d="M14.55 24.51s-.52.43 1.66.58c1.97.13 3.06.05 5.3-.26 0 0 .67.4-.11.64-2.58.81-11.23.29-10.04-.6 1.03-.75 3.19-.36 3.19-.36z"/>
        <path fill="#1565c0" d="M13.78 22.7s-.68.48 1.84.66c2.33.16 4.17.11 7.34-.35 0 0 .47.41-.21.64-2.89.87-12.72.25-11.45-.77 1.1-.84 2.48-.18 2.48-.18z"/>
        <path fill="#1565c0" d="M12.86 26.59c3.67.23 9.3-.13 9.43-1.85 0 0-.25.65-3.03 1.18-3.14.59-7.01.52-9.29.15 0 0 .47.38 2.89.52z"/>
      </svg>
    ),
    bg: "#fff3e0", border: "#e65100",
  },
  {
    id: "spring", label: "Spring",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#6db33f" d="M29 3.6c-.4.1-1.2.8-2.7 2.9-.8 1.2-1.65 2.57-2.37 3.74-.7 1.15-1.32 2.19-1.68 2.7-.36.52-.73 1.05-1.14 1.52-.4.47-.86.9-1.27 1.21-.4.32-.78.55-1.06.65-.15.06-.29.08-.4.06-.07-.01-.14-.05-.2-.1-.1-.12-.14-.32-.06-.62l.01-.03c.02-.06.04-.14.07-.23.25-.93.48-2.7.25-4.42-.23-1.72-.93-3.35-2.42-4.19-1.07-.6-2.24-.68-3.32-.47-1.08.21-2.07.65-2.86 1.16-1.57 1.01-2.47 2.28-2.97 3.36-.5 1.07-.6 1.98-.6 2.65 0 .68.09 1.11.09 1.11l.001.007-.001-.007.001.007.001.006c.02.08.03.11.03.11s-.13-.11-.35-.35c-.22-.24-.53-.63-.85-1.16-.17-.26-.33-.56-.46-.87-.14-.31-.25-.65-.3-.99-.05-.34-.05-.67.03-.99.16-.63.52-1.13.94-1.51.43-.38.91-.62 1.38-.75.46-.13.9-.15 1.25-.08.35.07.61.22.76.43.15.21.19.47.12.78-.04.17-.1.32-.16.41.04-.14.13-.29.25-.39.13-.1.28-.16.44-.17.16-.01.32.03.46.12.14.09.26.22.35.39.08.17.13.37.1.59-.03.29-.18.57-.48.84-.29.27-.73.52-1.34.68-.61.17-1.37.24-2.27.16-.9-.08-1.97-.33-3.05-.78-.55-.23-1.1-.51-1.64-.84-.55-.33-.11.6-.32.81-.2.42-.36.87-.45 1.37-.05.34-.05.69.03 1.04.08.35.23.69.44 1 .21.32.48.6.77.84.59.49 1.29.81 1.96.99.67.18 1.31.21 1.85.1.54-.11.97-.36 1.23-.73.26-.37.35-.86.25-1.47-.1-.61-.37-1.34-.76-2.15-.2-.4-.41-.82-.61-1.24-.2-.41-.4-.82-.54-1.21-.15-.39-.25-.77-.25-1.12 0-.35.1-.67.32-.91.44-.49 1.17-.56 1.82-.43.65.13 1.24.46 1.71.88.47.43.83.97 1.04 1.58.21.61.27 1.3.14 2.02-.13.71-.45 1.46-.94 2.22-.49.76-1.14 1.55-1.88 2.33-.73.78-1.55 1.55-2.35 2.33-.8.77-1.57 1.55-2.22 2.34-.65.79-1.18 1.58-1.5 2.38-.32.8-.41 1.6-.23 2.4.18.8.62 1.59 1.28 2.27.66.68 1.53 1.27 2.53 1.68.99.42 2.1.67 3.23.73 1.13.06 2.26-.08 3.27-.38 1.01-.3 1.9-.76 2.61-1.33.71-.57 1.24-1.24 1.54-1.97.3-.73.36-1.5.18-2.27-.18-.77-.59-1.54-1.17-2.25-.59-.71-1.34-1.37-2.17-1.95-.83-.58-1.72-1.1-2.58-1.57-.87-.47-1.71-.9-2.44-1.31-.73-.42-1.33-.82-1.74-1.24-.41-.41-.63-.82-.61-1.24.02-.41.26-.82.67-1.17.42-.35.99-.63 1.63-.8.64-.17 1.33-.23 1.99-.16.66.07 1.28.27 1.76.6.48.32.81.76.93 1.29.12.53.02 1.14-.28 1.78-.29.64-.79 1.3-1.42 1.96-.63.66-1.37 1.31-2.11 1.98-.74.67-1.47 1.35-2.1 2.04-.62.69-1.12 1.39-1.4 2.09-.27.7-.3 1.4-.07 2.07.23.67.71 1.31 1.37 1.86.66.55 1.49 1.01 2.42 1.33.93.33 1.94.51 2.94.54 1 .03 1.97-.09 2.83-.35.86-.26 1.6-.67 2.15-1.19.55-.52.89-1.14 1-1.82.11-.68-.02-1.41-.36-2.11-.33-.7-.86-1.39-1.5-2.04-.63-.65-1.37-1.27-2.12-1.87-.75-.6-1.51-1.19-2.2-1.79-.69-.6-1.32-1.21-1.82-1.84-.51-.63-.88-1.28-1.04-1.97-.16-.69-.1-1.41.17-2.12.27-.7.73-1.4 1.31-2.06.58-.66 1.29-1.28 2.05-1.84.76-.56 1.56-1.06 2.33-1.5.76-.44 1.49-.81 2.12-1.14.62-.33 1.15-.6 1.55-.85.39-.26.65-.48.73-.68.04-.1-.01-.22-.07-.34-.07-.14-.15-.28-.15-.44 0-.17.07-.34.19-.49.13-.14.29-.27.47-.36.18-.09.38-.15.58-.16.19-.01.39.03.57.1.17.08.34.19.48.33.14.15.26.32.34.51.09.2.13.41.12.64-.01.22-.07.46-.18.69-.11.24-.26.47-.44.69-.18.23-.4.44-.62.64-.23.2-.47.39-.71.56-.24.18-.5.34-.74.49-.5.3-.97.57-1.38.82l-.88.52s2.64-1.12 5.09.47c3.63 2.36 4.67 5.99 4.67 5.99s.37-4.19-.76-8.09c0 0 2.64-1.12 5.09.47 2.44 1.59 3.26 4.64 3.26 4.64S43.16 3.5 29 3.6z"/>
        <circle fill="#6db33f" cx="16" cy="16" r="5"/>
      </svg>
    ),
    bg: "#f0fdf4", border: "#6db33f",
  },
  {
    id: "react", label: "React",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <circle fill="#61dafb" cx="16" cy="16" r="3.2"/>
        <ellipse fill="none" stroke="#61dafb" strokeWidth="1.8" cx="16" cy="16" rx="13" ry="5"/>
        <ellipse fill="none" stroke="#61dafb" strokeWidth="1.8" cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)"/>
        <ellipse fill="none" stroke="#61dafb" strokeWidth="1.8" cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)"/>
      </svg>
    ),
    bg: "#e0f7fa", border: "#61dafb",
  },
  {
    id: "html", label: "HTML",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#e34f26" d="M4 3l2.2 24.6L16 30l9.8-2.4L28 3H4z"/>
        <path fill="#ef652a" d="M16 27.7V5.7H26l-1.9 21.1L16 27.7z"/>
        <path fill="#fff" d="M16 13.5h4.5l.3-3.5H16V6.6h8.7l-.2 2.5-.9 9.9H16v-5.5z"/>
        <path fill="#ebebeb" d="M16 24.2l-3.7-1-.2-2.7H9.2l.4 5 6.4 1.8V24.2z"/>
        <path fill="#fff" d="M16 18.4H13l-.3-3-2.7-.1.3 5.9 5.7 1.6v-4.4z"/>
        <path fill="#ebebeb" d="M16 6.6v3.4H7.7L7.5 8 7.3 6.6H16z"/>
        <path fill="#ebebeb" d="M16 13.5v2.5h-3.8l-.3-2.5H16z"/>
      </svg>
    ),
    bg: "#fff3f0", border: "#e34f26",
  },
  {
    id: "css", label: "CSS3",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#1572b6" d="M4 3l2.2 24.6L16 30l9.8-2.4L28 3H4z"/>
        <path fill="#33a9dc" d="M16 27.7V5.7H26l-1.9 21.1L16 27.7z"/>
        <path fill="#fff" d="M16 18.4H12.5l-.2-2.9H16V13h-6.9l.5 4.9.3 1.6H16v-1.1z"/>
        <path fill="#ebebeb" d="M16 24.2l-3.7-1-.3-3.2H9.2l.5 5.5L16 27.2V24.2z"/>
        <path fill="#fff" d="M16 10v2.5H9l.5-2.5H16z"/>
        <path fill="#ebebeb" d="M16 13h-3.1l-.2 2.4H16V13z"/>
        <path fill="#fff" d="M16 18.4v1.1h3.1l-.3 3.5-2.8.8v3l5.7-1.7.5-4.9-.5-2.7h-5.7z"/>
      </svg>
    ),
    bg: "#e8f4fd", border: "#1572b6",
  },
  {
    id: "js", label: "JavaScript",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <rect fill="#f7df1e" width="32" height="32" rx="3"/>
        <path fill="#000" d="M20.5 23.5c.4.7.9 1.2 1.9 1.2 1.1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.6-1.6l-.5-.2c-1.6-.7-2.6-1.5-2.6-3.2 0-1.6 1.2-2.8 3.1-2.8 1.4 0 2.3.5 3 1.6l-1.6 1c-.4-.6-.7-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.5.2c1.9.8 2.9 1.6 2.9 3.4 0 1.9-1.5 3.1-3.5 3.1-1.9 0-3.2-.9-3.8-2.1l1.7-1zm-8 .3c.3.5.6.9 1.3.9.6 0 1-.2 1-1.1v-6.2h2.1v6.2c0 2.3-1.3 3.3-3.2 3.3-1.7 0-2.7-.9-3.2-2l2-1.1z"/>
      </svg>
    ),
    bg: "#fffde7", border: "#f7df1e",
  },
  {
    id: "flutter", label: "Flutter",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#54c5f8" d="M8.5 19l2.7-2.7 6-6h5.4L13.9 19z"/>
        <path fill="#54c5f8" d="M8.5 19l2.7 2.7 6 6h5.4L13.9 19z" opacity=".6"/>
        <path fill="#01579b" d="M16.6 22.6l-2.7-2.7 2.7-2.7L22.6 23l-2.7 2.7-3.3-3.1z"/>
        <path fill="#29b6f6" d="M13.9 25.4l2.7 2.7h5.4L19.3 25l-5.4.4z"/>
        <path fill="#54c5f8" d="M17.2 4.7H11.8l-3.3 3.3L19.9 19.4l5.4-5.4L17.2 4.7z"/>
      </svg>
    ),
    bg: "#e1f5fe", border: "#29b6f6",
  },
  {
    id: "mysql", label: "MySQL",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#00618a" d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z"/>
        <path fill="#fff" d="M8 11h2v6H8v-6zm2.5 0h1.5l2 3.5L16 11h1.5v6H16v-4l-2 3-2-3v4h-1.5v-6zm7.5 0h2v5h3v1h-5v-6z"/>
        <ellipse fill="#fff" cx="16" cy="9.5" rx="4" ry="1.5" opacity=".6"/>
        <path fill="none" stroke="#fff" strokeWidth=".8" d="M12 9.5v5.5c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V9.5" opacity=".5"/>
      </svg>
    ),
    bg: "#e8f5e9", border: "#00618a",
  },
  {
    id: "git", label: "Git",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#f14e32" d="M29.5 14.5L17.5 2.5a1.7 1.7 0 00-2.4 0l-2.4 2.4 3 3a2 2 0 012.6 2.6l2.9 2.9a2 2 0 012.6 2.6 2 2 0 01-2 2 2 2 0 01-2-2c0-.3.1-.6.2-.8l-2.7-2.7v7a2 2 0 01.5 1.3 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 011-1.7V13a2 2 0 01-1-1.7 2 2 0 012-2 2 2 0 012 2l-.1.7L18 9.4 15.1 6.5 2.5 19.1a1.7 1.7 0 000 2.4l12 12a1.7 1.7 0 002.4 0L29.5 16.9a1.7 1.7 0 000-2.4z"/>
      </svg>
    ),
    bg: "#fff0ee", border: "#f14e32",
  },
  {
    id: "dotnet", label: ".NET",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <circle fill="#512bd4" cx="16" cy="16" r="14"/>
        <path fill="#fff" d="M7 21V11h1.5l3.7 6.1V11H14v10h-1.5L8.7 15v6H7zm7.5 0V11H17c1.3 0 2.3.4 3 1.1.8.7 1.2 1.7 1.2 3v2.8c0 1.3-.4 2.3-1.2 3-.7.7-1.7 1.1-3 1.1h-2.5zm1.8-1.4H17c.8 0 1.4-.2 1.8-.7.5-.5.7-1.2.7-2v-3c0-.9-.2-1.5-.7-2-.4-.5-1-.7-1.8-.7h-.7v8.4z"/>
      </svg>
    ),
    bg: "#f3f0ff", border: "#512bd4",
  },
  {
    id: "aws", label: "AWS",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#f90" d="M9.5 20.5c-2.5-1.3-4.2-3.9-4.2-6.9 0-4.3 3.5-7.8 7.8-7.8 1.3 0 2.5.3 3.6.9"/>
        <path fill="#f90" d="M22.5 11.5c2.5 1.3 4.2 3.9 4.2 6.9 0 4.3-3.5 7.8-7.8 7.8-1.3 0-2.5-.3-3.6-.9"/>
        <path fill="#232f3e" d="M10 25l2-1.5 2 1.5-2-5H10v5zM20 7l-2 1.5-2-1.5 2 5h2V7z"/>
        <text x="16" y="18" textAnchor="middle" fill="#232f3e" fontSize="6" fontWeight="700" fontFamily="Arial">AWS</text>
      </svg>
    ),
    bg: "#fff8e1", border: "#f90",
  },
  {
    id: "tailwind", label: "Tailwind",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22">
        <path fill="#06b6d4" d="M16 6.4C11.7 6.4 9.1 8.5 8 12.8c1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3 2.2 1.6 1.6 3.4 3.4 7.4 3.4 4.3 0 6.9-2.1 8-6.4-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3-2.2-1.6-1.6-3.4-3.4-7.4-3.4zM8 19.2c-4.3 0-6.9 2.1-8 6.4 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3 2.2 1.6 1.6 3.4 3.4 7.4 3.4 4.3 0 6.9-2.1 8-6.4-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3-2.2-1.6-1.6-3.4-3.4-7.4-3.4z"/>
      </svg>
    ),
    bg: "#ecfeff", border: "#06b6d4",
  },
];

/* ─── Freely floating bubble ─────────────────────────────────────────────── */
/*
  Each bubble animates along a random smooth path using framer-motion keyframes.
  The path is a figure-8-like sequence of (x,y) offsets from its home position.
  We place home positions on two rings around the photo, but let each bubble
  wander ±20–35px from home — giving a natural "floating" feel.
*/
interface Bubble {
  id: string;
  label: string;
  icon: React.ReactElement;
  bg: string;
  border: string;
}

interface BubbleProps {
  b: Bubble;
  homeX: number;   // px from centre of container
  homeY: number;
  delay: number;
  duration: number;
}

function FloatBubble({ b, homeX, homeY, delay, duration }: BubbleProps) {
  /* Generate a looping 6-point wander path */
  const seed  = b.id.charCodeAt(0) + b.id.charCodeAt(1);
  const wX    = (i: number) => homeX + Math.sin((i * 1.3 + seed) * 0.8) * 22;
  const wY    = (i: number) => homeY + Math.cos((i * 1.1 + seed) * 0.9) * 18;
  const xs    = [0,1,2,3,4,5,6].map(wX);
  const ys    = [0,1,2,3,4,5,6].map(wY);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [...xs, xs[0]],
        y: [...ys, ys[0]],
      }}
      transition={{
        opacity: { delay, duration: 0.4 },
        scale:   { delay, duration: 0.4, type: "spring", stiffness: 180 },
        x: { delay: delay + 0.5, duration, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
        y: { delay: delay + 0.5, duration: duration * 1.12, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
      }}
      style={{
        position: "absolute",
        top:  "50%",
        left: "50%",
        /* homeX/Y baked into the animated x/y — start from 0 */
        x: homeX, y: homeY,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 6,
        pointerEvents: "none",
      }}
    >
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            3,
        padding:        "6px 9px",
        borderRadius:   12,
        background:     b.bg,
        border:         `1.5px solid ${b.border}30`,
        boxShadow:      `0 4px 14px ${b.border}20, 0 1px 3px rgba(0,0,0,0.06)`,
        minWidth:       48,
        userSelect:     "none",
      }}>
        {b.icon}
        <span style={{
          fontFamily:   "var(--font-mono)",
          fontSize:     8.5,
          fontWeight:   600,
          color:        "#475569",
          whiteSpace:   "nowrap",
          letterSpacing:"0.02em",
        }}>
          {b.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Avatar with floating bubbles ──────────────────────────────────────── */
function Avatar() {
  /*
    Place bubbles on two virtual rings (r1=155, r2=220) but stagger them
    so they look naturally distributed. The float animation drifts each
    bubble off its home position smoothly.
  */
  const r1 = 158, r2 = 225;
  const ring1 = BUBBLES.slice(0, 6);
  const ring2 = BUBBLES.slice(6);

  const placed: BubbleProps[] = [];

  ring1.forEach((b, i) => {
    const angle = ((360 / ring1.length) * i - 90) * (Math.PI / 180);
    placed.push({
      b,
      homeX: Math.cos(angle) * r1,
      homeY: Math.sin(angle) * r1,
      delay:    0.9 + i * 0.12,
      duration: 5.5 + (i % 3) * 1.2,
    });
  });
  ring2.forEach((b, i) => {
    const angle = ((360 / ring2.length) * i - 60) * (Math.PI / 180);
    placed.push({
      b,
      homeX: Math.cos(angle) * r2,
      homeY: Math.sin(angle) * r2,
      delay:    1.2 + i * 0.13,
      duration: 6.5 + (i % 3) * 1.3,
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      style={{
        position: "relative", width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Soft radial glow */}
      <div style={{
        position: "absolute", width: 250, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
        animation: "pulse-shadow 4s ease-in-out infinite",
        zIndex: 1,
      }}/>

      {/* Photo — BIGGER: 220px */}
      <div style={{ position: "relative", width: 220, height: 220, zIndex: 5 }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: "50%", padding: 3.5,
          background: "linear-gradient(135deg,#2563eb,#7c3aed,#06b6d4)",
          boxShadow: "0 8px 40px rgba(37,99,235,0.22), 0 2px 8px rgba(0,0,0,0.08)",
        }}>
          <div style={{ borderRadius: "50%", overflow: "hidden", width: "100%", height: "100%", background: "#f8fafc" }}>
            <img
              src={PROFILE.avatar!}
              alt={PROFILE.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </div>
        {/* Online dot */}
        <div style={{ position: "absolute", bottom: 10, right: 10, width: 18, height: 18, zIndex: 6 }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: "#10b981", border: "3px solid #f8fafc",
            boxShadow: "0 0 8px rgba(16,185,129,0.6)",
          }}/>
          <div style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            background: "rgba(16,185,129,0.2)",
            animation: "ping-soft 2s ease-out infinite",
          }}/>
        </div>
      </div>

      {/* Floating bubbles */}
      {placed.map(p => <FloatBubble key={p.b.id} {...p}/>)}
    </motion.div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const anim = (d: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: d },
});

export default function HeroSection() {
  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", overflow: "hidden",
      background: "linear-gradient(160deg,#f0f7ff 0%,#f8fafc 55%,#faf5ff 100%)",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0 }}/>
      <div style={{
        position: "absolute", right: "-5%", top: "5%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", left: "-8%", bottom: "5%",
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="pg-wrap" style={{ paddingTop: 100, paddingBottom: 80, width: "100%" }}>
        <div className="hero-layout" style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(36px,5vw,64px)",
          alignItems: "center",
          minHeight: "calc(100vh - 180px)",
        }}>

          {/* ── LEFT: text ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            <motion.div {...anim(0.15)}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 14px", borderRadius: 999,
                background: "rgba(16,185,129,0.09)", border: "1.5px solid rgba(16,185,129,0.3)",
                fontSize: 11, fontWeight: 600, letterSpacing: ".2em",
                textTransform: "uppercase", color: "#059669", fontFamily: "var(--font-mono)",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#10b981",
                  animation: "ping-soft 2s ease-out infinite",
                }}/>
                Available for Work
              </span>
            </motion.div>

            <motion.div {...anim(0.25)}>
              <h1 style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                lineHeight: 1.06, letterSpacing: "-0.03em",
                fontSize: "clamp(34px,6vw,66px)", color: "var(--col-text)",
              }}>
                Hi, I'm{" "}
                <span className="text-gradient">MD Majid</span>
                <br/>
                <span>Naseem</span>
              </h1>
            </motion.div>

            <motion.div {...anim(0.32)} style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 26 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--col-text3)" }}>~/dev $&nbsp;</span>
              <Typewriter/>
            </motion.div>

            <motion.div {...anim(0.36)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={13} style={{ color: "var(--col-blue)", flexShrink: 0 }}/>
              <span style={{ fontSize: 13, color: "var(--col-text3)" }}>{PROFILE.location}</span>
            </motion.div>

            <motion.p {...anim(0.40)} style={{
              fontSize: "clamp(14px,1.4vw,15px)", lineHeight: 1.78,
              color: "var(--col-text2)", maxWidth: 490,
            }}>
              {PROFILE.summary}
            </motion.p>

            <motion.div {...anim(0.44)} style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {TECH_BADGES.map(b => <span key={b} className="tag">{b}</span>)}
            </motion.div>

            <motion.div {...anim(0.48)} style={{ display: "flex", flexWrap: "wrap", gap: 11, marginTop: 4 }}>
              <button className="btn btn-primary"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                View Projects <ArrowRight size={14}/>
              </button>
              <button className="btn btn-outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                <Mail size={13}/> Contact Me
              </button>
              <a href="https://drive.google.com/uc?export=download&id=1Z5xH31RFbBKUo8Il4AO_Id5VxV_nwllt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume PDF"
                className="btn btn-ghost">
                <Download size={13}/> Resume
              </a>
            </motion.div>

            <motion.div {...anim(0.52)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 12, color: "var(--col-text3)" }}>Find me on</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { label: "GitHub",   href: PROFILE.github,            txt: "GH" },
                  { label: "LinkedIn", href: PROFILE.linkedin,          txt: "in" },
                  { label: "Email",    href: `mailto:${PROFILE.email}`, txt: "@"  },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer" aria-label={s.label}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1.5px solid var(--col-border)", color: "var(--col-text2)",
                      fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                      background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      transition: "all .18s",
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--col-blue)"; el.style.color = "var(--col-blue)"; el.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--col-border)"; el.style.color = "var(--col-text2)"; el.style.transform = "none"; }}>
                    {s.txt}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: avatar with floating bubbles ── */}
          <div className="hero-visual" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", minHeight: 520,
          }}>
            {/* Container sized to fit outer ring (r=225) + bubble overhang ≈ 530px */}
            <div style={{
              position: "relative", zIndex: 2,
              width: 530, height: 530,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Avatar/>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          background: "none", border: "none", cursor: "pointer",
          opacity: .45, transition: "opacity .2s",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.45"}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--col-text3)" }}>scroll</span>
        <ChevronDown size={15} style={{ color: "var(--col-blue)", animation: "scroll-bounce 2s ease-in-out infinite" }}/>
      </button>

      <style>{`
        @media (min-width: 1024px) {
          .hero-layout { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 1023px) {
          .hero-visual { min-height: 460px !important; order: -1; }
        }
        @media (max-width: 640px) {
          .hero-visual { min-height: 380px !important; overflow: hidden; }
          .hero-visual > div { width: 360px !important; height: 360px !important; }
        }
      `}</style>
    </section>
  );
}
