import { z } from "zod";

type ExternalCollaborator = z.infer<typeof externalCollaboratorSchema>;

const externalCollaboratorSchema = z.object({
  organizationMemberId: z.string(),
  organizationMemberName: z.string(),
  organizationMemberAvatar: z.string().nullable(),
  organizationMemberProfessionalRegistry: z.string().nullable(),
  organizationMemberActive: z.boolean(),
  organizationId: z.string(),
  userId: z.string(),
  userEmail: z.string(),
  roleId: z.string(),
  roleName: z.string(),
  activityAreaId: z.string().nullable(),
  activityAreaName: z.string().nullable(),
  specialtyId: z.string().nullable(),
  specialtyName: z.string().nullable(),
});

const listCollaboratorsSchema = z.object({
  items: z.array(externalCollaboratorSchema),
  page: z.number(),
  pagesize: z.number(),
  total: z.number(),
});

export { listCollaboratorsSchema, type ExternalCollaborator };
