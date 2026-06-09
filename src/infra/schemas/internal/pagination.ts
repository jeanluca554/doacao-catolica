import { z } from "zod";

const paginationSchema = z.object({
  page: z
    .string()
    .transform((val) => (val ? +val : 1))
    .pipe(z.number().int().min(1))
    .optional(),
  pageLimit: z
    .string()
    .transform((val) => (val ? +val : 1))
    .pipe(z.number().int().min(1).max(100))
    .optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export { paginationSchema };
