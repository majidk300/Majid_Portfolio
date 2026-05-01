import { PROFILE, NAV_LINKS } from "../../data/portfolio";

export default function Footer() {
  const go = (href: string) => document.getElementById(href.replace("#",""))?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer style={{ borderTop: "1px solid var(--col-border)", paddingTop: 48, paddingBottom: 48 }}>
      <div className="pg-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, overflow: "hidden", flexShrink: 0,
              background: "linear-gradient(135deg, var(--col-cyan), var(--col-blue))", padding: 1.5 }}>
              <div style={{ borderRadius: 9, overflow: "hidden", width: "100%", height: "100%" }}>
                <img src={PROFILE.avatar!} alt="MN" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--col-text)" }}>MD Majid Naseem</div>
              <div style={{ fontSize: 12, color: "var(--col-text3)" }}>Full-Stack Engineer · India</div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                style={{ fontSize: 13, color: "var(--col-text3)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--col-text)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--col-text3)"}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { l: "GH", href: PROFILE.github },
              { l: "Li", href: PROFILE.linkedin },
              { l: "@",  href: `mailto:${PROFILE.email}` },
            ].map(s => (
              <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--col-surface)", border: "1px solid var(--col-border)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--col-text3)",
                  transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--col-cyan)"; el.style.borderColor = "var(--col-border-hi)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--col-text3)"; el.style.borderColor = "var(--col-border)"; }}>
                {s.l}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ height: 1, background: "var(--col-border)", margin: "24px 0 20px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8,
          fontSize: 12, color: "var(--col-text3)" }}>
          <span>© {new Date().getFullYear()} MD Majid Naseem. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
