import { z } from "zod";

export const ServicioCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre es obligatorio." }),

  descripcion: z
    .string()
    .min(10, { message: "Agrege una descripción de almenos 10 letras." }),

  restricciones: z
    .string()
    .optional(),

  precio: z
    .coerce
    .number()
    .min(0.01, { message: "El precio debe ser mayor a 0.01." }),

  moneda: z
    .enum(["usd", "bs"], {
      errorMap: () => ({ message: "Seleccion la moneda." })
    }),

  horaApertura: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Hora de apertura inválida. Formato esperado: HH:MM" }),

  horaCierre: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Hora de cierre inválida. Formato esperado: HH:MM" }),

  disponible: z
    .boolean(),

  idTipoServicio: z
    .coerce
    .number({ message: "Debe seleccionar un tipo de servicio." })
    .min(1, { message: "Debe seleccionar un tipo de servicio." }),
});

export const ServicioUpdateSchema = ServicioCreateSchema.partial();

export const ServicioSchema = ServicioCreateSchema.extend({
  id: z.number(),
});
