import { useEffect, useRef } from "react";

// ─── All developer symbols including Flutter ───────────────────────────────
const SYMBOLS = [
  // Syntax
  "{}", "[]", "()", "</>", "=>", "===", "&&", "||", "!=" , "++", "--", "::",
  // Keywords
  "const", "class", "async", "await", "return", "import", "export", "void",
  // Java / Spring
  "@Bean", "@Override", "@GET", "@POST", "public", "private", "static",
  // Flutter / Dart
  "Flutter", "Widget", "StatefulWidget", "BuildContext", "Scaffold",
  "setState()", "Future<>", "async*", "Stream", "Dart",
  // Web / React
  "React", "useState", "useEffect", "JSX", "props", "hook",
  // Backend
  "Spring", "JWT", "REST", "@Controller", "MySQL", "ORM", "JPA",
  // .NET / C#
  ".NET", "C#", "LINQ", "Task<>", "IEnumerable",
  // App / Mobile
  "APK", "SDK", "UI/UX", "MVP", "MVVM", "ViewModel",
  // DevOps / Misc
  "Git", "API", "JSON", "HTTP", "SQL", "0x1F",
  // Binary poetry
  "01010", "11001", "10110",
];

const COLORS_RGB = [
  [0,   212, 255],   // cyan
  [99,  102, 241],   // indigo
  [139,  92, 246],   // purple
  [16,  185, 129],   // green
  [59,  130, 246],   // blue
  [236,  72, 153],   // pink (rare)
];

interface Token {
  x: number; y: number;
  vx: number; vy: number;
  text: string;
  size: number;
  rgb: number[];
  alpha: number;
  maxAlpha: number;
  life: number; maxLife: number;
  phase: "in" | "hold" | "out";
}

export default function DevBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;

    let W = 0, H = 0, raf = 0;
    const tokens: Token[] = [];

    // ── resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      W = cvs.width  = window.innerWidth;
      H = cvs.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── create one token ────────────────────────────────────────────────────
    const rand   = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
    const pick   = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const mkToken = (fromBottom = false): Token => {
      const maxLife  = rand(260, 480);
      const maxAlpha = rand(0.22, 0.52);          // MUCH more visible
      return {
        x: rand(0, W),
        y: fromBottom ? H + rand(10, 40) : rand(0, H),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.5, -0.18),                     // float upward
        text: pick(SYMBOLS),
        size: Math.floor(rand(11, 19)),
        rgb:  pick(COLORS_RGB),
        alpha: 0,
        maxAlpha,
        life: 0,
        maxLife,
        phase: "in",
      };
    };

    // ── seed ────────────────────────────────────────────────────────────────
    const TOTAL = 70;
    for (let i = 0; i < TOTAL; i++) {
      const t = mkToken(false);
      t.life   = rand(0, t.maxLife);               // stagger phases
      t.phase  = "hold";
      t.alpha  = t.maxAlpha;
      tokens.push(t);
    }

    // ── draw connections ─────────────────────────────────────────────────────
    const drawLines = () => {
      const MAX_D = 130;
      for (let i = 0; i < tokens.length - 1; i++) {
        for (let j = i + 1; j < tokens.length; j++) {
          const dx = tokens[i].x - tokens[j].x;
          const dy = tokens[i].y - tokens[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_D) {
            const a = (1 - d / MAX_D)            // closer = brighter
                    * Math.min(tokens[i].alpha, tokens[j].alpha)
                    * 0.35;                        // line opacity multiplier
            ctx.beginPath();
            ctx.moveTo(tokens[i].x, tokens[i].y);
            ctx.lineTo(tokens[j].x, tokens[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    // ── main loop ────────────────────────────────────────────────────────────
    const FADE_IN_END  = 0.18;     // first 18 % of life → fade in
    const FADE_OUT_START = 0.78;   // last 22 % → fade out

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      drawLines();

      for (let i = tokens.length - 1; i >= 0; i--) {
        const t = tokens[i];
        t.life++;
        t.x += t.vx;
        t.y += t.vy;

        // wrap X
        if (t.x < -80)  t.x = W + 60;
        if (t.x > W + 80) t.x = -60;

        const prog = t.life / t.maxLife;

        // fade in / hold / fade out
        if (prog < FADE_IN_END) {
          t.alpha = t.maxAlpha * (prog / FADE_IN_END);
        } else if (prog < FADE_OUT_START) {
          t.alpha = t.maxAlpha;
        } else {
          t.alpha = t.maxAlpha * (1 - (prog - FADE_OUT_START) / (1 - FADE_OUT_START));
        }

        // recycle
        if (t.life >= t.maxLife || t.y < -60) {
          tokens[i] = mkToken(true);
          continue;
        }

        // ── render ────────────────────────────────────────────────────────
        const [r, g, b] = t.rgb;
        ctx.save();
        ctx.globalAlpha = Math.max(0, t.alpha);
        ctx.font        = `500 ${t.size}px "JetBrains Mono", "Courier New", monospace`;
        ctx.fillStyle   = `rgb(${r},${g},${b})`;

        // soft glow halo
        ctx.shadowBlur  = 12;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;

        ctx.fillText(t.text, t.x, t.y);
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        0,
        // slight dark vignette overlay painted by CSS gradient
        // keeps edges calm while centre stays vivid
      }}
    />
  );
}
