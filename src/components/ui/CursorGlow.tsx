import { useEffect, useRef } from "react";
export default function CursorGlow() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x:0, y:0 });
  const rpos = useRef({ x:0, y:0 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const mv = (e: MouseEvent) => { pos.current = { x:e.clientX, y:e.clientY }; };
    window.addEventListener("mousemove", mv, { passive:true });
    let raf: number;
    const tick = () => {
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x-4}px,${pos.current.y-4}px)`;
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.13;
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.13;
      if (ring.current) ring.current.style.transform = `translate(${rpos.current.x-13}px,${rpos.current.y-13}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot}  style={{ position:"fixed", top:0, left:0, width:8,  height:8,  borderRadius:"50%", background:"#2563eb", pointerEvents:"none", zIndex:9999, opacity:.7, mixBlendMode:"multiply" }}/>
      <div ref={ring} style={{ position:"fixed", top:0, left:0, width:26, height:26, borderRadius:"50%", border:"1.5px solid rgba(37,99,235,0.4)", pointerEvents:"none", zIndex:9999 }}/>
    </>
  );
}
