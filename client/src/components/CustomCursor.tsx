mport { useEffect, useRef, useState } from "react";

// Fondos oscuros de XpertAuth → cursor blanco
const DARK_BG_COLORS = ["#0A0E1A", "#0F1628", "#070A12"];

function isDarkBackground(element: Element | null): boolean {
  if (!element) return true;
  let el: Element | null = element;
  while (el && el !== document.body) {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      // Convierte rgb a hex aproximado para comparar luminosidad
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        // Luminosidad relativa — si es oscuro, cursor blanco
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.4;
      }
    }
    el = el.parentElement;
  }
  return true; // Por defecto oscuro (la mayoría de la web es dark)
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Solo en desktop — no mostrar en touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      // Detectar si el elemento bajo el cursor tiene fondo claro
      const el = document.elementFromPoint(mouseX, mouseY);
      const dark = isDarkBackground(el);
      setIsLight(!dark);

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCursor);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  // No renderizar en dispositivos táctiles
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const color = isLight ? "#0A0E1A" : "#FFFFFF";

  return (
    <>
      {/* Círculo exterior */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          opacity: visible ? 0.7 : 0,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "opacity 0.2s ease, border-color 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Punto central */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: visible ? 1 : 0,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "opacity 0.2s ease, background-color 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
