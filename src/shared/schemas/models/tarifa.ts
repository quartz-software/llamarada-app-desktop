import { z } from "zod";

export const TarifaCreateSchema = z.object({
  fechaInicio: z.coerce.date().optional(),
  fechaFin: z.coerce.date().optional(),
  precio: z.number(),
  activo: z.boolean(),
});

export const TarifaUpdateSchema = TarifaCreateSchema.partial();

export const TarifaSchema = TarifaCreateSchema.extend({
  id: z.number(),
});
