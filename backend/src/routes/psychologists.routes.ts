import { Router, Request, Response } from "express";
import prisma from "../config/database";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const psychologists = await prisma.psychologist.findMany({
    where: {
      is_active: true,
      user: { is_active: true, role: "PSYCHOLOGIST" },
    },
    select: {
      id: true,
      specialization: true,
      bio: true,
      photo_url: true,
      fonasa_code: true,
      fonasa_level: true,
      is_active: true,
      user: { select: { first_name: true, last_name: true } },
    },
    orderBy: { id: "asc" },
  });

  res.json(psychologists);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const psychologist = await prisma.psychologist.findUnique({
    where: { id },
    select: {
      id: true,
      specialization: true,
      bio: true,
      photo_url: true,
      fonasa_code: true,
      fonasa_level: true,
      is_active: true,
      user: { select: { first_name: true, last_name: true, phone: true } },
    },
  });

  if (!psychologist) return res.status(404).json({ message: "No encontrado" });
  res.json(psychologist);
});

router.patch("/:id/profile", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const { specialization, bio, photo_url, fonasa_code, fonasa_level } = req.body ?? {};

  if (fonasa_code !== undefined) {
    if (typeof fonasa_code !== "string" || fonasa_code.trim().length === 0) {
      return res.status(400).json({ message: "fonasa_code inválido" });
    }
    if (fonasa_code.length > 20) {
      return res.status(400).json({ message: "fonasa_code excede 20 caracteres" });
    }

    const exists = await prisma.psychologist.findFirst({
      where: { fonasa_code, NOT: { id } },
      select: { id: true },
    });
    if (exists) return res.status(409).json({ message: "fonasa_code ya está en uso" });
  }

  const updated = await prisma.psychologist.update({
    where: { id },
    data: {
      ...(specialization !== undefined ? { specialization } : {}),
      ...(bio !== undefined ? { bio } : {}),
      ...(photo_url !== undefined ? { photo_url } : {}),
      ...(fonasa_code !== undefined ? { fonasa_code } : {}),
      ...(fonasa_level !== undefined ? { fonasa_level } : {}),
    },
    select: {
      id: true,
      specialization: true,
      bio: true,
      photo_url: true,
      fonasa_code: true,
      fonasa_level: true,
      is_active: true,
    },
  });

  res.json(updated);
});

router.patch("/:id/active", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { is_active } = req.body ?? {};
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });
  if (typeof is_active !== "boolean") return res.status(400).json({ message: "is_active debe ser boolean" });

  const updated = await prisma.psychologist.update({
    where: { id },
    data: { is_active },
    select: { id: true, is_active: true },
  });

  res.json(updated);
});

export default router;
