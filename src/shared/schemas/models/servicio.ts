import { z } from "zod";

export const ServicioCreateSchema = z.object({
  nombre: z.string(),
  descripcion: z.string().optional(),
  restricciones: z.string().optional(),
  precio: z.coerce.number(),
  moneda: z.string(),
  horaApertura: z.string().regex(/\d\d:\d\d/),
  horaCierre: z.string(),
  disponible: z.boolean(),
  idTipoServicio: z.coerce.number(),
});

export const ServicioUpdateSchema = ServicioCreateSchema.partial();

export const ServicioSchema = ServicioCreateSchema.extend({
  id: z.number(),
});
