import { z } from "zod";

type ExternalInvite = z.infer<typeof externalInviteSchema>;

const externalInviteSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  roleId: z.string(),
  roleName: z.string().optional().nullable(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  professionalRegistry: z.string().nullable(),
  activityAreaId: z.string().nullable(),
  activityAreaName: z.string().optional().nullable(),
  specialtyId: z.string().nullable(),
  specialtyName: z.string().optional().nullable(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
  responded: z.string().nullable(),
  respondedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const listInvitesSchema = z.object({
  items: z.array(externalInviteSchema),
  page: z.number(),
  pagesize: z.number(),
  total: z.number(),
});

export { listInvitesSchema, type ExternalInvite };
