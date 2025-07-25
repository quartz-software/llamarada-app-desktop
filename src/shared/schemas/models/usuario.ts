import { z } from "zod";

export const UsuarioCreateSchema = z.object({
  correo: z
    .string().min(1, "El correo es obligatorio")
    .email("Debe ser un correo electrónico válido"),
  password: z.string().min(1, "Ingrese una contrseña"),
});
export const UsuarioLoginSchema = UsuarioCreateSchema;

export const UsuarioUpdateSchema = UsuarioCreateSchema.partial();

export const UsuarioSchema = UsuarioCreateSchema.extend({
  id: z.number(),
});
