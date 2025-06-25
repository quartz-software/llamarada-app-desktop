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
    .number({ required_error: "Debe seleccionar un estado para la habitación" })
    .min(1, "Debe seleccionar un estado válido"),

  idTipoHabitacion: z.coerce
    .number({ required_error: "Debe seleccionar un tipo de habitación" })
    .min(1, "Debe seleccionar un tipo válido"),
});

export const HabitacionUpdateSchema = HabitacionCreateSchema.partial();

export const HabitacionSchema = HabitacionCreateSchema.extend({
  id: z.number(),
});
