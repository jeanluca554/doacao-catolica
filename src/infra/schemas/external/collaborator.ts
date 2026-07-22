import { z } from "zod";

type ExternalCollaborator = z.infer<typeof externalCollaboratorSchema>;

const externalCollaboratorSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  user_id: z.number(),
  value: z.string(),
  role_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  users: z.object({
    name: z.string(),
    email: z.string(),
  }),
});

const externalCollaboratorsSchema = z.object({
  data: z.array(externalCollaboratorSchema),
  meta: z.object({
    currentPage: z.number(),
    itemsPerPage: z.number(),
    sortBy: z.array(z.string()),
    totalItems: z.number(),
    totalPages: z.number(),
  }),
});

export { externalCollaboratorsSchema, type ExternalCollaborator };
