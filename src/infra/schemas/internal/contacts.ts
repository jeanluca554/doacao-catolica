import { z } from "zod";
import { paginationSchema } from "./pagination";

const listContactsSchema = paginationSchema.extend({
  name: z.string().optional(),
  status: z.string().optional(),
});

export { listContactsSchema };
