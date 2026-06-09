import z, { string } from "zod";
import { externalPaginationSchema } from "./pagination";

type ExternalWorkspace = z.infer<typeof externalWorkspaceSchema>;

const externalWorkspaceSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  name: z.string(),
  description: z.string(),
  image: z
    .url()
    .nullable()
    .transform((url) => url || "https://ui-avatars.com/api/?name=Workspace"),
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const externalWorkspacesSchema = externalPaginationSchema.extend({
  items: z.array(externalWorkspaceSchema),
});

export {
  externalWorkspaceSchema,
  externalWorkspacesSchema,
  type ExternalWorkspace,
};
