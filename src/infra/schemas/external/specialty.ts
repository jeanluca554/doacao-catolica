import { z } from "zod";

type ExternalSpecialty = z.infer<typeof externalSpecialtySchema>;

const externalSpecialtySchema = z.object({
  id: z.string(),
  name: z.string(),
  activityAreaId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const listSpecialtiesSchema = z.array(externalSpecialtySchema);

export { listSpecialtiesSchema, type ExternalSpecialty };
