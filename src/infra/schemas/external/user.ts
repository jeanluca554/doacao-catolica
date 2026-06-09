import z from "zod";

type ExternalUser = z.infer<typeof externalUserSchema>;

const externalTokenSchema = z.strictObject({
  jwt: z.string(),
});

const externalUserSchema = z.strictObject({
  userId: z.string(),
  phone: z.string(),
  iat: z.number(),
  exp: z.number(),
  email: z.email(),
  name: z.string(),
  token: z.string(),
  avatar: z.url(),
});

export { externalTokenSchema, externalUserSchema, type ExternalUser };
