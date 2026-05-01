import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Copy, Check, Send, MapPin, ExternalLink } from "lucide-react";
import { PROFILE } from "../../data/portfolio";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`mailto:${PROFILE.email}?subject=${encodeURIComponent("Portfolio Contact from " + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`);
    setSent(true); setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    { icon: Mail,        label: "Email",    value: PROFILE.email,   href: `mailto:${PROFILE.email}`, color: "var(--col-green)"  },
    { icon: Phone,       label: "WhatsApp", value: PROFILE.phone,   href: PROFILE.whatsapp,         color: "var(--col-cyan)"   },
    { icon: ExternalLink, label: "GitHub",  value: "github.com/majidk300", href: PROFILE.github,     color: "var(--col-purple)" },
    { icon: ExternalLink, label: "LinkedIn", value: "MD Majid Naseem", href: PROFILE.linkedin,       color: "var(--col-blue)"   },
    { icon: MapPin,      label: "Location", value: PROFILE.location, href: null,                      color: "var(--col-cyan)"   },
  ];

  return (
    <section id="contact" className="section" style={{ background: "var(--col-surface)" }} ref={ref}>
      <div className="pg-wrap">

        <motion.div className="section-header center"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">06 / Contact</span>
          <h2 className="section-title">Let's <span className="accent">Connect</span></h2>
          <p className="section-desc">Open to full-time roles, freelance projects, and interesting collaborations.</p>
          <div className="divider" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="contact-grid">

          {/* Info side */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.65 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--col-text)", marginBottom: 10 }}>
                Get In Touch
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--col-text2)" }}>
                I'm always open to discussing new opportunities, interesting projects, or just a good tech conversation.
              </p>
            </div>

            {/* Email copy card */}
            <div onClick={copyEmail} className="card" style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
              borderColor: "rgba(16,185,129,0.3)", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.5)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.3)"}>
              <div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", flexShrink: 0 }}>
                <Mail size={18} style={{ color: "var(--col-green)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "var(--col-text3)", marginBottom: 2 }}>Click to copy email</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--col-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{PROFILE.email}</div>
              </div>
              <div style={{ color: copied ? "var(--col-green)" : "var(--col-text3)", flexShrink: 0, transition: "color 0.2s" }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </div>
            </div>

            {/* Other links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {contacts.slice(1).map(c => (
                c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="card card-sm" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--col-border-hi)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--col-border)"}>
                    <c.icon size={15} style={{ color: c.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "var(--col-text3)", marginRight: 2 }}>{c.label}:</span>
                    <span style={{ fontSize: 13, color: "var(--col-text2)", fontWeight: 500 }}>{c.value}</span>
                  </a>
                ) : (
                  <div key={c.label} className="card card-sm" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <c.icon size={15} style={{ color: c.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "var(--col-text3)", marginRight: 2 }}>{c.label}:</span>
                    <span style={{ fontSize: 13, color: "var(--col-text2)", fontWeight: 500 }}>{c.value}</span>
                  </div>
                )
              ))}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.65 }}>
            <form onSubmit={submit} className="card card-lg" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--col-text)", marginBottom: -4 }}>
                Send a Message
              </h4>

              {[
                { id: "name" as const,  label: "Name",    type: "text",  placeholder: "John Doe" },
                { id: "email" as const, label: "Email",   type: "email", placeholder: "john@example.com" },
              ].map(f => (
                <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--col-text3)" }}>{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder}
                    value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })} />
                </div>
              ))}

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--col-text3)" }}>Message</label>
                <textarea rows={4} required placeholder="Tell me about your project..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ resize: "none" }} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", padding: "12px",
                background: sent ? "linear-gradient(135deg, var(--col-green), var(--col-cyan))" : undefined }}>
                {sent ? <><Check size={16} /> Message Sent!</> : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
