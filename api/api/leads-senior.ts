import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const schema = z.object({
  nombre: z.string().min(1),
  telefono: z.string().min(6),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });

  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Nombre y teléfono son obligatorios." });
    }

    const { error } = await supabase
      .from("leads_senior")
      .insert({
        nombre: parsed.data.nombre,
        telefono: parsed.data.telefono,
        estado: "nuevo",
      });

    if (error) {
      console.error("[leads-senior] Supabase error:", error);
      return res.status(500).json({ error: "Error al registrar. Inténtalo de nuevo." });
    }

    return res.status(201).json({ ok: true });

  } catch (error) {
    console.error("[leads-senior] Error:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
