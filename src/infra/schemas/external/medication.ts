import { z } from "zod";

type ExternalMedication = z.infer<typeof externalMedicationSchema>;

const externalMedicationSchema = z.object({
  id: z.string(),
  followUpId: z.string(),
  active: z.boolean(),
  name: z.string(),
  dosage: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  remindersEnabled: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
});

const listMedicationsSchema = z.object({
  items: z.array(externalMedicationSchema),
  page: z.number(),
  pagesize: z.number(),
  total: z.number(),
});

export {
  externalMedicationSchema,
  listMedicationsSchema,
  type ExternalMedication,
};
