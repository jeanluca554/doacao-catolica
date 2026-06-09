import { z } from "zod";

type ExternalActivityArea = z.infer<typeof externalActivityAreaSchema>;

const externalActivityAreaSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const listActivityAreasSchema = z.array(externalActivityAreaSchema);

export { listActivityAreasSchema, type ExternalActivityArea };
