import { z } from "zod";

export const StockCreateSchema = z.object({
  nombre: z
    .string()
    .nonempty("El nombre es obligatorio"),

  cantidad: z
    .number({
      required_error: "La cantidad es obligatoria",
      invalid_type_error: "La cantidad debe ser un número"
    })
    .gt(0, "La cantidad debe ser mayor a 0"),

  precio: z
    .number({
      required_error: "El precio es obligatorio",
      invalid_type_error: "El precio debe ser un número"
    })
    .gte(0, "El precio no puede ser negativo"),

  unidadMedida: z
    .string()
    .nonempty("La unidad de medida es obligatoria"),

  idCategoria: z
    .number({
      required_error: "La categoría es obligatoria",
      invalid_type_error: "La categoría debe ser un número"
    })
    .gt(0, "Debe seleccionar una categoría válida"),
});

export const StockUpdateSchema = StockCreateSchema.partial();

export const StockSchema = StockCreateSchema.extend({
  id: z.number(),
});
