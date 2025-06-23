import { z } from "zod";

export const EmpleadoCreateSchema = z.object({
  idUsuario: z.number(),
  idRol: z.number(),
  idEstado: z.number(),
  fechaContratacion: z.coerce.date(),
  dni: z.string(),
  nombre1: z.string(),
  nombre2: z.string().optional(),
  apellido1: z.string(),
  apellido2: z.string().optional(),
  telefono: z.string().optional(),
});

export const EmpleadoUpdateSchema = EmpleadoCreateSchema.partial();

export const EmpleadoSchema = EmpleadoCreateSchema.extend({
  id: z.number(),
});
