import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "../../data/portfolio";

interface Skill { name: string; icon: string; level: number; }

function Bar({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{skill.icon}</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--col-text)" }}>{skill.name}</span>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color }}>{skill.level}%</span>
      </div>
      <div className="progress-track">
        <motion.div className="progress-fill"
          style={{ background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, transparent))` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function Chip({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.35 }}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10,
        background: "var(--col-surface2)", border: "1px solid var(--col-border)",
        transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--col-border-hi)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--col-border)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
      <span style={{ fontSize: 15 }}>{skill.icon}</span>
      <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--col-text2)" }}>{skill.name}</span>
    </motion.div>
  );
}

const CATS = [
  { key: "languages", label: "Languages",           sub: "Core languages",          color: "var(--col-cyan)",   icon: "⚡", data: SKILLS.languages, type: "bars"  },
  { key: "frameworks", label: "Frameworks & Tools",  sub: "Libraries & frameworks",  color: "var(--col-purple)", icon: "🔧", data: SKILLS.frameworks, type: "chips" },
  { key: "tooling",    label: "Databases & Tooling", sub: "Data, infra, concepts",   color: "var(--col-green)",  icon: "🗄️", data: SKILLS.tools,      type: "bars"  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section" style={{ background: "var(--col-surface)", position: "relative" }} ref={ref}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0 }} />
      <div className="pg-wrap" style={{ position: "relative" }}>

        <motion.div className="section-header center"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">02 / Skills</span>
          <h2 className="section-title">Technical <span className="accent">Arsenal</span></h2>
          <div className="divider" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="skills-grid">
          {CATS.map((cat, ci) => (
            <motion.div key={cat.key} className="card"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.12, duration: 0.6 }}>

              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, background: `color-mix(in srgb, ${cat.color} 12%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${cat.color} 20%, transparent)`, flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--col-text)" }}>{cat.label}</div>
                  <div style={{ fontSize: 12, color: "var(--col-text3)", marginTop: 2 }}>{cat.sub}</div>
                </div>
              </div>

              <div style={{ height: 1, background: `linear-gradient(90deg, color-mix(in srgb, ${cat.color} 30%, transparent), transparent)`, marginBottom: 20 }} />

              {cat.type === "bars" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {(cat.data as Skill[]).map((s, i) => <Bar key={s.name} skill={s} color={cat.color} delay={ci * 0.1 + i * 0.07} />)}
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(cat.data as Skill[]).map((s, i) => <Chip key={s.name} skill={s} delay={ci * 0.1 + i * 0.05} />)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .skills-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
