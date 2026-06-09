import { z } from "zod";
import { paginationSchema } from "./pagination";

type CreateMedicationType = z.infer<typeof createMedicationSchema>;
type DeleteMedicationType = z.infer<typeof deleteMedicationSchema>;
type UpdateMedicationType = z.infer<typeof updateMedicationSchema>;
type ListMedicationsType = z.infer<typeof listMedicationsSchema>;

const createMedicationSchema = z.object({
  name: z.string().min(1, "Nome do medicamento é obrigatório"),
  dosage: z.string().min(1, "Posologia é obrigatória"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  remindersEnabled: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((value) => value === true || value === "true"),
});

const updateMedicationBaseSchema = createMedicationSchema.extend({
  id: z.uuid("ID do medicamento inválido"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  remindersEnabled: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((value) => value === true || value === "true"),
  active: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((value) => value === true || value === "true"),
});

const updateMedicationReminderSchema = z.object({
  id: z.uuid("ID do medicamento inválido"),
  remindersEnabled: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((value) => value === true || value === "true"),
});

const updateMedicationSchema = z.union([
  updateMedicationBaseSchema,
  updateMedicationReminderSchema,
]);

const deleteMedicationSchema = z.object({
  id: z.uuid("ID do medicamento inválido"),
});

const listMedicationsSchema = paginationSchema.extend({
  followUpId: z.string().optional(),
  name: z.string().optional(),
  active: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((value) => value === true || value === "true")
    .optional(),
});

export {
  createMedicationSchema,
  deleteMedicationSchema,
  updateMedicationSchema,
  listMedicationsSchema,
  type CreateMedicationType,
  type DeleteMedicationType,
  type ListMedicationsType,
  type UpdateMedicationType,
};
