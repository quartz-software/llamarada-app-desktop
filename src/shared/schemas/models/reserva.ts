import { z } from "zod";

export const ReservaCreateSchema = z.object({
  idCliente: z.coerce
    .number({ message: "Debe seleccionar un cliente" }),
  numAdultos: z.coerce
    .number({ message: "Debe ingresar la cantidad de adultos" })
    .min(1, "Debe haber al menos un adulto"),

  numNinos: z.coerce
    .number({ message: "Debe ingresar la cantidad de niños" })
    .min(0, "La cantidad de niños no puede ser negativa"),

  checkIn: z.coerce
    .date({ message: "Debe ingresar la fecha de ingreso" }),

  checkOut: z.coerce
    .date({ message: "Debe ingresar la fecha de salida" }),

  precioTotal: z.number().optional(),
});

export const ReservaUpdateSchema = ReservaCreateSchema.partial();

export const ReservaSchema = ReservaCreateSchema.extend({
  id: z.number(),
});
