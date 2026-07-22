import { z } from "zod";

const createCampaignGroupSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
});

const updateCampaignGroupSchema = z.object({
  id: z.string().min(1, "Id obrigatório"),
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
});

const deleteCampaignGroupSchema = z.object({
  id: z.string().min(1, "Id obrigatório"),
});

export {
  createCampaignGroupSchema,
  deleteCampaignGroupSchema,
  updateCampaignGroupSchema,
};
