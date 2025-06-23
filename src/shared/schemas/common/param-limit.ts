import { z } from "zod";

const LimitParamsSchema = z.object({
  pid: z.coerce.number().int().optional(),
  q: z.coerce.number().int().optional(),
});

export { LimitParamsSchema };
