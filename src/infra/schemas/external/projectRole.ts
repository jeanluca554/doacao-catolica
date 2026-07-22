import { z } from "zod";

type ExternalProjectRole = z.infer<typeof externalProjectRoleSchema>;

const externalProjectRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

const externalProjectRolesSchema = z.array(externalProjectRoleSchema);

export { externalProjectRolesSchema, type ExternalProjectRole };
