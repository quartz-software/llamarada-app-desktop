import { z } from "zod";

export const ImagenHabitacionCreateSchema = z.object({
  tipoImagen: z.enum(["panoramica", "3d", "plano"]),
  url: z.string(),
  descripcion: z.string().optional(),
  idHabitacion: z.number(),
});

export const ImagenHabitacionUpdateSchema =
  ImagenHabitacionCreateSchema.partial();

export const ImagenHabitacionSchema = ImagenHabitacionCreateSchema.extend({
  id: z.number(),
});
