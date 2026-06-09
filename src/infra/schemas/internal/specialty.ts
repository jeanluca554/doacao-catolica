import z from "zod";
import { paginationSchema } from "./pagination";

const listSpecialtiesSchema = paginationSchema.extend({
  activityAreaId: z.string().optional(),
});

export { listSpecialtiesSchema };
