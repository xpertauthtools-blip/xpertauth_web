import { useEffect, useRef, useState } from "react";

function getLuminanceAt(x: number, y: number): number {
  // Obtener todos los elementos en el punto (de más superficial a más profundo)
  const elements = document.elementsFromPoint(x, y);

  for (const el of elements) {
    // Ignorar el propio cursor y elementos sin fondo real
    if ((el as HTMLElement).dataset?.cursor === "true") continue;

    const bg = window.getComputedStyle(el).backgroundColor;
    if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") continue;

    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) continue;

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);

    // Si el alpha es 0, ignorar
    const alphaMatch = bg.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
    if (alphaMatch && parseFloat(alphaMatch[1]) < 0.1) continue;

    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  // Por defecto: oscuro (la mayoría de la web es dark)
  return 0;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

      const luminance = getLuminanceAt(mouseX, mouseY);
      // Umbral 0.5: por encima → fondo claro → cursor oscuro
      setIsLight(luminance > 0.5);

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

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const color = isLight ? "#0A0E1A" : "#FFFFFF";

  return (
    <>
      {/* Círculo exterior */}
      <div
        ref={cursorRef}
        data-cursor="true"
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
          transition: "opacity 0.2s ease, border-color 0.3s ease",
          willChange: "transform",
        }}
      />
      {/* Punto central */}
      <div
        ref={dotRef}
        data-cursor="true"
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
          transition: "opacity 0.2s ease, background-color 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
