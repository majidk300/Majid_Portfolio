import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, CheckCircle, ArrowUpRight, Zap } from "lucide-react";
import { PROJECTS } from "../../data/portfolio";

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: -((e.clientY - r.top) / r.height - 0.5) * 10 });
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65 }}
      onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
      style={{
        background: "var(--col-surface)", border: "1px solid var(--col-border)", borderRadius: 20,
        overflow: "hidden", display: "flex", flexDirection: "column",
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(${hov ? 6 : 0}px)`,
        transition: hov ? "transform 0.08s ease" : "transform 0.4s ease, border-color 0.25s, box-shadow 0.25s",
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}18` : "none",
        borderColor: hov ? project.color + "35" : "var(--col-border)",
      }}>

      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${project.color}, ${project.accentColor})` }} />

      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              background: `color-mix(in srgb, ${project.color} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${project.color} 25%, transparent)` }}>
              <Zap size={18} style={{ color: project.color }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--col-text)" }}>{project.title}</h3>
              <div style={{ fontSize: 12, color: "var(--col-text3)", marginTop: 2 }}>{project.subtitle}</div>
            </div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, flexShrink: 0,
            background: project.status === "Live" ? "rgba(16,185,129,0.1)" : "rgba(0,212,255,0.08)",
            color: project.status === "Live" ? "var(--col-green)" : "var(--col-cyan)",
            border: `1px solid ${project.status === "Live" ? "rgba(16,185,129,0.2)" : "rgba(0,212,255,0.18)"}` }}>
            {project.status === "Live" ? "🟢 Live" : "⚡ Open Source"}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--col-text2)" }}>{project.description}</p>

        {/* Features 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {project.features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={12} style={{ color: project.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "var(--col-text3)" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, paddingTop: 14, borderTop: "1px solid var(--col-border)", marginTop: "auto" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center",
                padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
                background: `color-mix(in srgb, ${project.color} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${project.color} 30%, transparent)`,
                color: project.color, transition: "all 0.2s" }}>
              <ExternalLink size={13} /> Live Demo <ArrowUpRight size={11} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center",
                padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
                background: "var(--col-surface2)", border: "1px solid var(--col-border)",
                color: "var(--col-text2)", transition: "all 0.2s" }}>
              <GitBranch size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section" style={{ background: "var(--col-surface)" }} ref={ref}>
      <div className="pg-wrap">
        <motion.div className="section-header center"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">04 / Projects</span>
          <h2 className="section-title">Featured <span className="accent">Projects</span></h2>
          <p className="section-desc">Real-world applications built with production-quality code</p>
          <div className="divider" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: 32 }}>
          <a href={`https://github.com/majidk300`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <GitBranch size={15} /> More on GitHub <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px)  { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1100px) { .projects-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
