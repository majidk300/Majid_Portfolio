import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink, Code2, Shield, Layers, GraduationCap } from "lucide-react";
import { PROFILE, EDUCATION } from "../../data/portfolio";

const highlights = [
  { icon: Code2,   label: "Full-Stack",     desc: "End-to-end web apps",         color: "var(--col-cyan)"   },
  { icon: Shield,  label: "Secure APIs",    desc: "JWT & RESTful architecture",   color: "var(--col-purple)" },
  { icon: Layers,  label: "Scalable Apps",  desc: "Production-grade systems",     color: "var(--col-green)"  },
];

const fadeLeft  = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, visible: { opacity: 1, x: 0 } };
const fadeUp    = { hidden: { opacity: 0, y: 20  }, visible: { opacity: 1, y: 0 } };

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const t = (d = 0) => ({ duration: 0.65, delay: d });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="pg-wrap">

        {/* Header */}
        <motion.div className="section-header"
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={t()}>
          <span className="section-label">01 / About</span>
          <h2 className="section-title">Who <span className="accent">I Am</span></h2>
          <div className="divider" />
        </motion.div>

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "start" }} className="about-grid">

          {/* ── Profile card ── */}
          <motion.div variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"} transition={t(0.15)}>
            <div className="card card-lg" style={{ maxWidth: 340, margin: "0 auto" }}>
              {/* Gradient top bar */}
              <div style={{ height: 3, borderRadius: "3px 3px 0 0", margin: "-40px -40px 28px",
                background: "linear-gradient(90deg, var(--col-cyan), var(--col-blue), var(--col-purple))" }} />

              {/* Photo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 108, height: 108, borderRadius: "50%", padding: 2.5,
                    background: "linear-gradient(135deg, var(--col-cyan), var(--col-blue), var(--col-purple))" }}>
                    <div style={{ borderRadius: "50%", overflow: "hidden", width: "100%", height: "100%" }}>
                      <img src={PROFILE.avatar!} alt={PROFILE.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderRadius: "50%",
                    background: "var(--col-green)", border: "2px solid var(--col-bg)",
                    boxShadow: "0 0 8px rgba(16,185,129,0.7)" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--col-text)" }}>
                    {PROFILE.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--col-cyan)", marginTop: 3 }}>{PROFILE.role}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 6 }}>
                    <MapPin size={12} style={{ color: "var(--col-text3)" }} />
                    <span style={{ fontSize: 12, color: "var(--col-text3)" }}>{PROFILE.location}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--col-border)", marginBottom: 20 }} />

              {/* Contact items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {[
                  { icon: Mail,  v: PROFILE.email, href: `mailto:${PROFILE.email}`, c: "var(--col-cyan)"   },
                  { icon: Phone, v: PROFILE.phone, href: `tel:${PROFILE.phone}`,    c: "var(--col-purple)" },
                ].map(({ icon: Icon, v, href, c }) => (
                  <a key={v} href={href}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10,
                      background: "var(--col-surface2)", border: "1px solid var(--col-border)",
                      fontSize: 13, color: "var(--col-text2)", transition: "border-color 0.2s",
                      overflow: "hidden" }}>
                    <Icon size={14} style={{ color: c, flexShrink: 0 }} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</span>
                  </a>
                ))}
              </div>

              {/* Social buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
                  style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                  <ExternalLink size={13} /> GitHub
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                  style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                  <ExternalLink size={13} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Bio + content ── */}
          <motion.div variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"} transition={t(0.25)}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Bio */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--col-text2)" }}>
                I'm <strong style={{ color: "var(--col-text)", fontWeight: 600 }}>MD Majid Naseem</strong>, a passionate full-stack engineer from Aligarh, India. I love building systems that solve real problems — from robust backend APIs to polished, responsive frontends.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--col-text2)" }}>
                My core stack is <span style={{ color: "var(--col-cyan)", fontWeight: 600 }}>Java & Spring Boot</span> for backend services and <span style={{ color: "#a78bfa", fontWeight: 600 }}>React.js</span> for frontend. I've shipped production apps with payment gateways and secure JWT auth flows.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--col-text2)" }}>
                After my internship at Softential Solutions, I'm deepening my expertise in <span style={{ color: "var(--col-green)", fontWeight: 600 }}>C# & .NET</span>, while exploring cloud deployment and microservices.
              </p>
            </div>

            {/* Highlight cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="highlights-grid">
              {highlights.map((h, i) => (
                <motion.div key={h.label} variants={fadeUp} initial="hidden"
                  animate={inView ? "visible" : "hidden"} transition={t(0.35 + i * 0.1)}
                  className="card card-sm" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `color-mix(in srgb, ${h.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${h.color} 25%, transparent)` }}>
                    <h.icon size={17} style={{ color: h.color }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--col-text)" }}>{h.label}</div>
                    <div style={{ fontSize: 12, color: "var(--col-text3)", marginTop: 3 }}>{h.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <GraduationCap size={15} style={{ color: "var(--col-cyan)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "var(--col-text3)" }}>Education</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {EDUCATION.map((e, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden"
                    animate={inView ? "visible" : "hidden"} transition={t(0.5 + i * 0.1)}
                    className="card card-sm" style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color,
                      boxShadow: `0 0 8px ${e.color}70`, flexShrink: 0, marginTop: 5 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--col-text)" }}>{e.degree}</div>
                      <div style={{ fontSize: 12, color: e.color, marginTop: 2 }}>{e.institution}</div>
                      <div style={{ fontSize: 12, color: "var(--col-text3)", marginTop: 1 }}>{e.location}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: e.color,
                      background: `color-mix(in srgb, ${e.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${e.color} 20%, transparent)`,
                      padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>
                      {e.period.split("–")[1]?.trim() || e.period}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 340px 1fr !important; }
        }
        @media (max-width: 600px) {
          .highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
