import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema, insertNewsletterSignupSchema } from "@shared/schema";
import { supabase } from "./supabase";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const socioSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  tipo_socio: z.enum(["gratuito", "individual", "corporativo"]),
  acepta_privacidad: z.boolean().default(false),
});

const contactoSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  mensaje: z.string().min(1),
  acepta_privacidad: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad.",
  }),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = insertWaitlistSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Datos inválidos. Por favor revisa el formulario." });
      }

      const existing = await storage.getWaitlistByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ error: "Este email ya está registrado en la lista de espera." });
      }

      const entry = await storage.addToWaitlist(parsed.data);
      return res.status(201).json(entry);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const parsed = insertNewsletterSignupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Email inválido." });
      }

      const existing = await storage.getNewsletterByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ error: "Este email ya está suscrito." });
      }

      const entry = await storage.addNewsletterSignup(parsed.data);
      return res.status(201).json(entry);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  });

  app.post("/api/socios", async (req, res) => {
    try {
      const parsed = socioSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Datos inválidos. Revisa el formulario." });
      }

      const { data: existing } = await supabase
        .from("socios")
        .select("id")
        .eq("email", parsed.data.email)
        .maybeSingle();

      if (existing) {
        return res.status(409).json({ error: "Este email ya está registrado." });
      }

      const { data, error } = await supabase
        .from("socios")
        .insert({
          nombre: parsed.data.nombre,
          email: parsed.data.email,
          tipo_socio: parsed.data.tipo_socio,
          acepta_privacidad: parsed.data.acepta_privacidad,
          estado: "pendiente",
        })
        .select()
        .single();

      if (error) {
        console.error("[supabase] Insert error:", error);
        return res.status(500).json({ error: "Error al registrar. Inténtalo de nuevo." });
      }

      return res.status(201).json(data);
    } catch (error) {
      console.error("[socios] Error:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  });

  app.post("/api/contacto", async (req, res) => {
    try {
      const parsed = contactoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Datos inválidos. Revisa el formulario." });
      }

      const { error } = await supabase
        .from("contacto")
        .insert({
          nombre: parsed.data.nombre,
          email: parsed.data.email,
          mensaje: parsed.data.mensaje,
          leido: false,
          respondido: false,
        });

      if (error) {
        console.error("[supabase] contacto insert error:", error);
        return res.status(500).json({ error: "Error al enviar el mensaje. Inténtalo de nuevo." });
      }

      return res.status(201).json({ ok: true });
    } catch (error) {
      console.error("[contacto] Error:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  });

  return httpServer;
}
