import { z } from "zod";

type ExternalRole = z.infer<typeof externalRoleSchema>;

const externalRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: z.array(z.string()),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const listRolesSchema = z.array(externalRoleSchema);

export { listRolesSchema, type ExternalRole };
