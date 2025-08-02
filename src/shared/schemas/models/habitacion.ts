import { z } from "zod";

export const HabitacionCreateSchema = z.object({
  numeroHabitacion: z
    .string({ required_error: "El número de habitación es obligatorio" })
    .min(1, "Debe ingresar un número de habitación"),

  capacidad: z.coerce
    .number({ required_error: "La capacidad es obligatoria" })
    .min(1, "La capacidad debe ser al menos 1"),

  descripcion: z
    .string()
    .optional(),

  idEstadoHabitacion: z.coerce
    .number()
    .min(1, "Debe seleccionar un estado"),

  idTipoHabitacion: z.coerce
    .number({ required_error: "Debe seleccionar un tipo de habitación" })
    .min(1, "Debe seleccionar el tipo de la habitación"),
});

export const HabitacionUpdateSchema = HabitacionCreateSchema.partial();

export const HabitacionSchema = HabitacionCreateSchema.extend({
  id: z.number(),
});
