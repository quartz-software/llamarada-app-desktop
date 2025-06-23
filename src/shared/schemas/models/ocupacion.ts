import { z } from "zod";

export const OcupacionCreateSchema = z.object({
  fecha: z.coerce.date(),
  idHabitacion: z.number(),
});

export const OcupacionUpdateSchema = OcupacionCreateSchema.partial();

export const OcupacionSchema = OcupacionCreateSchema.extend({
  id: z.number(),
});
