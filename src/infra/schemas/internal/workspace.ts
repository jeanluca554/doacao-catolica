import { z } from "zod";

const listWorkspacesSchema = z.object({
  userId: z.uuidv7(),
});

const createWorkspaceSchema = z.object({
  userId: z.uuidv7(),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image: z.url("URL da imagem é inválida"),
});

const updateWorkspaceSchema = z.object({
  id: z.uuidv7("ID do espaço de trabalho é obrigatório"),
  userId: z.uuidv7(),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image: z.url("URL da imagem é inválida"),
});

export { createWorkspaceSchema, listWorkspacesSchema, updateWorkspaceSchema };
