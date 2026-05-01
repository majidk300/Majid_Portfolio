import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "../../data/portfolio";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: .45 }}
          style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: "0 20px" }}>
          <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}>
            <div style={{ position: "relative", width: 160, height: 160, borderRadius: "50%" }}>
              <motion.div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid rgba(37,99,235,0.18)" }}
                animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} />
              <motion.div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: "2px solid rgba(59,130,246,0.25)" }}
                animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
              <div style={{ position: "absolute", inset: 24, borderRadius: "50%", overflow: "hidden",
                background: "linear-gradient(135deg,#2563eb,#7c3aed)", boxShadow: "0 0 48px rgba(37,99,235,0.18)" }}>
                <img src={PROFILE.avatar!} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
