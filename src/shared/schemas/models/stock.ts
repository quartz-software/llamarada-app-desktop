import { z } from "zod";

export const StockCreateSchema = z.object({
  nombre: z.string(),
  cantidad: z.number(),
  precio: z.number(),
  unidadMedida: z.string(),
  idCategoria: z.number(),
});

export const StockUpdateSchema = StockCreateSchema.partial();

export const StockSchema = StockCreateSchema.extend({
  id: z.number(),
});
