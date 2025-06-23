import { z } from "zod";

export const HabitacionCreateSchema = z.object({
  numeroHabitacion: z.string(),
  capacidad: z.coerce.number(),
  descripcion: z.string().optional(),
  idEstadoHabitacion: z.coerce.number(),
  idTipoHabitacion: z.coerce.number(),
});

export const HabitacionUpdateSchema = HabitacionCreateSchema.partial();

export const HabitacionSchema = HabitacionCreateSchema.extend({
  id: z.number(),
});
