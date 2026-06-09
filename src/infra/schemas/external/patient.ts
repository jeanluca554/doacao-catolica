import { z } from "zod";

type ExternalPatient = z.infer<typeof externalPatientSchema>;

const externalPatientSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  avatar: z.string().nullable(),
  document: z.string(),
  birthDate: z.string(),
  gender: z.string(),
  maritalStatus: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  observations: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const listPatientsSchema = z.object({
  items: z.array(externalPatientSchema),
  page: z.number(),
  pagesize: z.number(),
  total: z.number(),
});

export { externalPatientSchema, listPatientsSchema, type ExternalPatient };
