import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("hero");
  const [open, setOpen]         = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      const ids = [...NAV_LINKS].reverse().map(l => l.href.replace("#",""));
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.getElementById(href.replace("#",""))?.scrollIntoView({ behavior:"smooth", block:"start" });
    setOpen(false);
  };

  return (
    <>
      {/* Scroll progress */}
      <div style={{ position:"fixed", top:0, left:0, zIndex:60, height:2.5, width:`${progress}%`,
        background:"linear-gradient(90deg,#2563eb,#7c3aed)", transition:"width .1s linear" }}/>

      <motion.header
        initial={{ y:-72, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:.6, delay:.1 }}
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, display:"flex", justifyContent:"center", padding:"10px clamp(12px,3vw,32px)" }}>

        <div className="nav-pill"
          style={{ display:"flex", alignItems:"center", gap:4, padding:"8px 14px",
            width:"100%", maxWidth:920,
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.1)" : "none",
            transition:"box-shadow .3s" }}>

          {/* Logo */}
          <button onClick={() => go("#hero")}
            style={{ display:"flex", alignItems:"center", gap:9, marginRight:8, flexShrink:0 }}>
            <div style={{ width:34, height:34, borderRadius:10, overflow:"hidden", flexShrink:0,
              background:"linear-gradient(135deg,#2563eb,#7c3aed)", padding:1.5 }}>
              <div style={{ borderRadius:9, overflow:"hidden", width:"100%", height:"100%" }}>
                <img src={PROFILE.avatar!} alt="MN"
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}/>
              </div>
            </div>
            <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:14, color:"var(--col-text)" }}>
              Majid<span style={{ color:"var(--col-blue)" }}>.</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav style={{ display:"none", alignItems:"center", gap:2, flex:1 }} className="lg:flex">
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.replace("#","");
              return (
                <button key={link.href} onClick={() => go(link.href)}
                  style={{ padding:"6px 12px", borderRadius:8, fontSize:13, fontWeight:500,
                    color: isActive ? "var(--col-blue)" : "var(--col-text2)",
                    background: isActive ? "rgba(37,99,235,0.08)" : "transparent",
                    transition:"all .18s", cursor:"pointer", position:"relative" }}>
                  {link.label}
                  {isActive && (
                    <motion.div layoutId="nav-dot"
                      style={{ position:"absolute", bottom:3, left:"50%", transform:"translateX(-50%)",
                        width:4, height:4, borderRadius:"50%", background:"var(--col-blue)" }}/>
                  )}
                </button>
              );
            })}
          </nav>

          <div style={{ display:"none", alignItems:"center", gap:8, marginLeft:"auto", flexShrink:0 }} className="md:flex">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
              style={{ padding:"7px 14px", fontSize:12 }}>GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              style={{ padding:"7px 14px", fontSize:12 }}>LinkedIn</a>
          </div>

          <button onClick={() => setOpen(!open)}
            style={{ marginLeft:"auto", display:"flex", alignItems:"center", justifyContent:"center",
              width:36, height:36, borderRadius:10, border:"1.5px solid var(--col-border)",
              color:"var(--col-blue)", flexShrink:0, background:"#fff" }} className="lg:hidden">
            {open ? <X size={17}/> : <Menu size={17}/>}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:.18 }}
            style={{ position:"fixed", top:72, left:12, right:12, zIndex:49,
              background:"rgba(255,255,255,0.97)", backdropFilter:"blur(20px)",
              border:"1px solid var(--col-border)", borderRadius:16, padding:12,
              boxShadow:"0 16px 48px rgba(0,0,0,0.1)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {NAV_LINKS.map(link => (
                <button key={link.href} onClick={() => go(link.href)}
                  style={{ textAlign:"left", padding:"10px 16px", borderRadius:10, fontSize:14, fontWeight:500,
                    color: active===link.href.replace("#","") ? "var(--col-blue)" : "var(--col-text2)",
                    background: active===link.href.replace("#","") ? "rgba(37,99,235,0.07)" : "transparent",
                    transition:"all .15s" }}>
                  {link.label}
                </button>
              ))}
              <div style={{ height:1, background:"var(--col-border)", margin:"4px 0" }}/>
              <div style={{ display:"flex", gap:8 }}>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
                  style={{ flex:1, justifyContent:"center", fontSize:13 }}>GitHub</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                  style={{ flex:1, justifyContent:"center", fontSize:13 }}>LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
