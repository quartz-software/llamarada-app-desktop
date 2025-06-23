import { z } from "zod";

export const ServicioSolicitadoCreateSchema = z.object({
  descripcion: z.string(),
  createdAt: z.coerce.date(),
  idEstado: z.number(),
  idServicio: z.number(),
  idReserva: z.number(),
  idHabitacion: z.number(),
});

export const ServicioSolicitadoUpdateSchema =
  ServicioSolicitadoCreateSchema.partial();

export const ServicioSolicitadoSchema = ServicioSolicitadoCreateSchema.extend({
  id: z.number(),
});
