import z from "zod";

type ExternalUser = z.infer<typeof externalUserSchema>;

const externalUserSchema = z.object({
  id: z.number(),
  accountId: z.number(),
  avatar: z.string().nullable(),
  verified: z.boolean(),
  uuid: z.uuid(),
  name: z.string(),
  email: z.string(),
});

export { externalUserSchema, type ExternalUser };
