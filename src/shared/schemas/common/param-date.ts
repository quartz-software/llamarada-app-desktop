import { z } from "zod";

export const ParamDateSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});
