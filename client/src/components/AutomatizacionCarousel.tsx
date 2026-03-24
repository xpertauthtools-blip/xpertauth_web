import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = (q: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(q).matches
  }
  const [matches, setMatches] = useState<boolean>(() => getMatches(query))
  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    const handleChange = () => setMatches(getMatches(query))
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])
  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.4, ease: [0.32, 0.72, 0, 1] }

interface CasoUso {
  num: string
  titulo: string
  descripcion: string
  herramientas: { nombre: string; color: string; logo: string }[]
}

const casos: CasoUso[] = [
  {
    num: "01",
    titulo: "Clasificar emails y registrar incidencias",
    descripcion: "Cada email de cliente se clasifica por tipo automaticamente. Las incidencias se registran en Sheets y se confirma la recepcion al cliente sin intervenir.",
    herramientas: [
      { nombre: "Gmail", color: "#EA4335", logo: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png" },
      { nombre: "Sheets", color: "#34A853", logo: "https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_32dp.png" },
      { nombre: "Gmail", color: "#EA4335", logo: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png" },
    ],
  },
  {
    num: "02",
    titulo: "Nuevo lead entra solo en CRM con bienvenida",
    descripcion: "El formulario web crea el contacto en tu CRM y dispara un email de bienvenida personalizado. Sin tocar nada.",
    herramientas: [
      { nombre: "Formulario", color: "#7B68EE", logo: "" },
      { nombre: "HubSpot", color: "#FF6B35", logo: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png" },
      { nombre: "Gmail", color: "#EA4335", logo: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png" },
    ],
  },
  {
    num: "03",
    titulo: "Mensaje de cliente genera tarea para el equipo",
    descripcion: "Un mensaje de cliente en WhatsApp crea automaticamente una tarea en Notion y notifica al responsable en Slack.",
    herramientas: [
      { nombre: "WhatsApp", color: "#25D366", logo: "" },
      { nombre: "Notion", color: "#ffffff", logo: "" },
      { nombre: "Slack", color: "#4A154B", logo: "" },
    ],
  },
  {
    num: "04",
    titulo: "Extrae datos de facturas a tu hoja de costes",
    descripcion: "Subes la factura PDF a Drive. La IA extrae importe, proveedor y fecha. Los datos se vuelcan solos en tu hoja de contabilidad.",
    herramientas: [
      { nombre: "Drive", color: "#4285F4", logo: "https://www.gstatic.com/images/branding/product/2x/drive_2020q4_32dp.png" },
      { nombre: "IA", color: "#8B5CF6", logo: "" },
      { nombre: "Sheets", color: "#34A853", logo: "https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_32dp.png" },
    ],
  },
  {
    num: "05",
    titulo: "Recordatorio automatico de cita al cliente",
    descripcion: "Creas el evento en Calendar. 24h antes el cliente recibe automaticamente un WhatsApp con la confirmacion y los detalles.",
    herramientas: [
      { nombre: "Calendar", color: "#4285F4", logo: "https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_32dp.png" },
      { nombre: "WhatsApp", color: "#25D366", logo: "" },
    ],
  },
  {
    num: "06",
    titulo: "Informe semanal de ventas sin tocarlo",
    descripcion: "Cada lunes a las 8h se genera el informe de ventas de la semana anterior y se envia automaticamente a los responsables.",
    herramientas: [
      { nombre: "Sheets", color: "#34A853", logo: "https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_32dp.png" },
      { nombre: "PDF", color: "#F72585", logo: "" },
      { nombre: "Gmail", color: "#EA4335", logo: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png" },
    ],
  },
  {
    num: "07",
    titulo: "Recepcion de eCMR y registro automatico",
    descripcion: "El eCMR llega por email. La IA extrae matricula, origen, destino y fecha. Se registra en tu hoja de servicios y se archiva en Drive.",
    herramientas: [
      { nombre: "Email", color: "#EA4335", logo: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png" },
      { nombre: "IA", color: "#8B5CF6", logo: "" },
      { nombre: "Sheets", color: "#34A853", logo: "https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_32dp.png" },
      { nombre: "Drive", color: "#4285F4", logo: "https://www.gstatic.com/images/branding/product/2x/drive_2020q4_32dp.png" },
    ],
  },
  {
    num: "08",
    titulo: "Facturacion automatica al cerrar el servicio",
    descripcion: "Al marcar el servicio como completado en Sheets, se genera la factura en Sage y se envia automaticamente al cliente por email.",
    herramientas: [
      { nombre: "Sheets", color: "#34A853", logo: "https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_32dp.png" },
      { nombre: "Sage", color: "#00DC82", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sage_Group_logo.svg/200px-Sage_Group_logo.svg.png" },
      { nombre: "Gmail", color: "#EA4335", logo: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png" },
    ],
  },
]

function ToolPill({ herramienta }: { herramienta: CasoUso["herramientas"][0] }) {
  return (
    <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1">
      {herramienta.logo ? (
        <img src={herramienta.logo} alt={herramienta.nombre} className="w-3.5 h-3.5 rounded-sm object-contain" />
      ) : (
        <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ backgroundColor: herramienta.color }} />
      )}
      <span className="text-white/80 text-xs font-medium">{herramienta.nombre}</span>
    </div>
  )
}

function FlipCard({ caso, isActive, onClick }: { caso: CasoUso; isActive: boolean; onClick: () => void }) {
  return (
    <div
      className="w-full h-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={(e) => { e.stopPropagation(); onClick() }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          transform: isActive ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRENTE */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #0F1628 0%, #111827 100%)",
            border: "1px solid rgba(27,79,216,0.3)",
          }}
        >
          <div className="text-[#4D9FEC] text-xs font-bold tracking-widest mb-3">
            {caso.num}
          </div>
          <h3 className="text-white font-semibold text-sm leading-snug mb-auto">
            {caso.titulo}
          </h3>
          <div className="mt-4 flex flex-wrap gap-1.5 items-center">
            {caso.herramientas.map((h, i) => (
              <div key={i} className="flex items-center gap-1">
                <ToolPill herramienta={h} />
                {i < caso.herramientas.length - 1 && (
                  <span className="text-white/30 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-3 text-center">Clic para ver como funciona</p>
        </div>

        {/* REVERSO */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #1B4FD8 0%, #1640b0 100%)",
            border: "1px solid rgba(77,159,236,0.4)",
          }}
        >
          <div className="text-[#4D9FEC] text-xs font-bold tracking-widest mb-3">
            COMO FUNCIONA
          </div>
          <p className="text-white text-sm leading-relaxed">
            {caso.descripcion}
          </p>
          <p className="text-white/40 text-xs mt-4 text-center">Clic para volver</p>
        </div>
      </div>
    </div>
  )
}

const CarouselInner = memo(({
  handleClick,
  controls,
  activeIndex,
  isCarouselActive,
}: {
  handleClick: (index: number) => void
  controls: any
  activeIndex: number | null
  isCarouselActive: boolean
}) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
  const faceCount = casos.length
  const cylinderWidth = isScreenSizeSm ? 1200 : 2000
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (value) => `rotate3d(0,1,0,${value}deg)`)

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
        onDrag={(_, info) => isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.04)}
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.04,
            transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {casos.map((caso, i) => (
          <motion.div
            key={caso.num}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            initial={{ filter: "blur(4px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={transition}
          >
            <div className="w-full h-full">
              <FlipCard
                caso={caso}
                isActive={activeIndex === i}
                onClick={() => handleClick(i)}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
})

export function AutomatizacionCarousel() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null)
      setIsCarouselActive(true)
    } else {
      setActiveIndex(index)
      setIsCarouselActive(false)
      controls.stop()
    }
  }

  return (
    <div className="w-full">
      <div className="relative h-[340px] w-full overflow-hidden">
        <CarouselInner
          handleClick={handleClick}
          controls={controls}
          activeIndex={activeIndex}
          isCarouselActive={isCarouselActive}
        />
      </div>
      <p className="text-white/30 text-xs text-center mt-4">
        Arrastra para girar · Clic en una tarjeta para ver el flujo
      </p>
    </div>
  )
}
