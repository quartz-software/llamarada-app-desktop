import { z } from "zod";

const IdParamsSchema = z.coerce.number().int().min(1);

export { IdParamsSchema };
