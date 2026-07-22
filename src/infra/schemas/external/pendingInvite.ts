import { z } from "zod";

const externalPendingInviteSchema = z.object({
  invite_id: z.string(),
  invite_created_at: z.string(),
  project_name: z.string(),
  project_end_date: z.string().nullable(),
  project_start_date: z.string().nullable(),
  project_image: z.string().nullable(),
  project_image_thumbnail: z.string().nullable().optional(),
  inviting_user_name: z.string(),
  invited_user_role_id: z.string(),
  project_public_id: z.string().uuid(),
});

const externalPendingInvitesSchema = z.array(
  externalPendingInviteSchema,
);

type ExternalPendingInvite = z.infer<
  typeof externalPendingInviteSchema
>;

export { externalPendingInvitesSchema, type ExternalPendingInvite };
