import { z } from "zod";

const externalBirthdayCelebrantSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  whatsapp: z.string().nullable(),
  birth_date: z.string().nullable(),
});

const externalBirthdayCelebrantsSchema = z.object({
  items: z.array(externalBirthdayCelebrantSchema),
  current_page: z.number(),
  per_page: z.number(),
  total: z.number(),
  last_page: z.number(),
});

type ExternalBirthdayCelebrant = z.infer<
  typeof externalBirthdayCelebrantSchema
>;

export {
  externalBirthdayCelebrantsSchema,
  type ExternalBirthdayCelebrant,
};
