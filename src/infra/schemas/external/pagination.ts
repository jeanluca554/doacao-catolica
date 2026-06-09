import z from "zod";

const externalPaginationSchema = z.object({
  total: z.number(),
});

export { externalPaginationSchema };
