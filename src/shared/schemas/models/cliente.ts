import { z } from "zod";

export const ClienteCreateSchema = z.object({
  dni: z
    .string({ required_error: "El DNI es obligatorio" })
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(15, "El DNI no debe superar los 15 caracteres"),

  nombre1: z
    .string({ required_error: "El primer nombre es obligatorio" })
    .min(1, "El primer nombre no puede estar vacío"),

  nombre2: z.string().optional(),

  apellido1: z
    .string({ required_error: "El primer apellido es obligatorio" })
    .min(1, "El primer apellido no puede estar vacío"),

  apellido2: z.string().optional(),

  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no debe superar los 20 dígitos")
    .optional(),

  pais: z
    .string({ required_error: "El país es obligatorio" })
    .min(1, "Tiene que agregar un país"),

  idUsuario: z
    .number({ required_error: "El ID de usuario es obligatorio" })
});

export const ClienteUpdateSchema = ClienteCreateSchema.partial();

export const ClienteSchema = ClienteCreateSchema.extend({
  id: z.number(),
});
