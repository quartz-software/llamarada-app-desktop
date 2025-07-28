import { z } from "zod";

export const UsuarioCreateSchema = z.object({
  correo: z
    .string()
    .email("Debe ser un correo electrónico válido"),
  password: z.string(),
});
export const UsuarioLoginSchema = UsuarioCreateSchema.extend({
  correo: z
    .string().min(0, "El correo es obligatorio")
    .email("Debe ser un correo electrónico válido"),
  password: z.string().min(1, "Ingrese una contrseña"),
});

export const UsuarioUpdateSchema = UsuarioCreateSchema.partial();

export const UsuarioSchema = UsuarioCreateSchema.extend({
  id: z.number(),
});
