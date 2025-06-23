import { z } from "zod";

export const ReservaCreateSchema = z.object({
  idCliente: z.number().optional(),
  numAdultos: z.coerce.number(),
  numNinos: z.coerce.number(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  checkOutReal: z.coerce.date().optional(),
  precioTotal: z.number().optional(),
  origenReserva: z.enum(["web", "system"]),
});

export const ReservaUpdateSchema = ReservaCreateSchema.partial();

export const ReservaSchema = ReservaCreateSchema.extend({
  id: z.number(),
});
