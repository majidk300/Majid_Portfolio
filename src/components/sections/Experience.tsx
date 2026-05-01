import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "../../data/portfolio";

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="pg-wrap">
        <motion.div className="section-header center"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">03 / Experience</span>
          <h2 className="section-title">Work <span className="accent">Journey</span></h2>
          <div className="divider" />
        </motion.div>

        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={exp.id} className="card card-lg"
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.65 }}>

              {/* Colored left accent */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                background: `linear-gradient(180deg, ${exp.color}, transparent)`, borderRadius: "20px 0 0 20px" }} />

              <div style={{ paddingLeft: 12 }}>
                {/* Top row */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                      background: `color-mix(in srgb, ${exp.color} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${exp.color} 25%, transparent)`, flexShrink: 0 }}>
                      <Briefcase size={19} style={{ color: exp.color }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--col-text)" }}>{exp.title}</h3>
                      <div style={{ fontSize: 14, fontWeight: 600, color: exp.color, marginTop: 2 }}>{exp.company}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontFamily: "var(--font-mono)",
                      color: exp.color, background: `color-mix(in srgb, ${exp.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${exp.color} 20%, transparent)`,
                      padding: "4px 10px", borderRadius: 6 }}>
                      <Calendar size={11} /> {exp.period}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--col-text3)" }}>
                      <MapPin size={11} /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                  {exp.description.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle2 size={14} style={{ color: exp.color, flexShrink: 0, marginTop: 2, opacity: 0.8 }} />
                      <span style={{ fontSize: 14, lineHeight: 1.65, color: "var(--col-text2)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 14,
                  borderTop: "1px solid var(--col-border)" }}>
                  {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Future placeholder */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            <div style={{ padding: "18px 24px", borderRadius: 16, border: "1px dashed rgba(0,212,255,0.2)",
              textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--col-text3)" }}>
                // next_chapter = "loading..."
              </p>
              <p style={{ fontSize: 12, color: "var(--col-text3)", marginTop: 4, opacity: 0.6 }}>
                Open to full-time opportunities
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
