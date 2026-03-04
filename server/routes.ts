import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema, insertNewsletterSignupSchema } from "@shared/schema";

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

  return httpServer;
}
