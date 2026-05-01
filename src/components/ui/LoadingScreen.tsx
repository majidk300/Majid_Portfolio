import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "../../data/portfolio";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => setDone(true), 350); return 100; }
        return p + Math.random() * 14 + 4;
      });
    }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loading-screen" exit={{ opacity:0 }} transition={{ duration:.45 }}>
          <motion.div initial={{ opacity:0, scale:.6 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.5 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", padding:2.5,
              background:"linear-gradient(135deg,#2563eb,#7c3aed)" }}>
              <div style={{ borderRadius:"50%", overflow:"hidden", width:"100%", height:"100%" }}>
                <img src={PROFILE.avatar!} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}/>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2 }} style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:20, color:"var(--col-text)", letterSpacing:"-0.02em" }}>
              MD Majid Naseem
            </div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--col-text3)", marginTop:4, letterSpacing:".2em", textTransform:"uppercase" }}>
              Full-Stack Engineer
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
            <div style={{ width:200, height:3, borderRadius:2, background:"rgba(37,99,235,0.1)", overflow:"hidden" }}>
              <motion.div style={{ height:"100%", borderRadius:2, background:"linear-gradient(90deg,#2563eb,#7c3aed)" }}
                animate={{ width:`${Math.min(progress,100)}%` }} transition={{ ease:"linear" }}/>
            </div>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--col-text3)" }}>
              {Math.min(Math.round(progress),100)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
