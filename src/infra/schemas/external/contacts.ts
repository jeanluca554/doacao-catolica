import { z } from "zod";

const externalContactItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const listContactsSchema = z.array(externalContactItemSchema);

const findOneContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  cpf: z.string().nullable(),
  account_id: z.number(),
  birth_date: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  avatar: z.string().nullable(),
});

type ExternalContactItem = z.infer<typeof externalContactItemSchema>;
type ExternalContactDetail = z.infer<typeof findOneContactSchema>;

export {
  listContactsSchema,
  findOneContactSchema,
  type ExternalContactItem,
  type ExternalContactDetail,
};
