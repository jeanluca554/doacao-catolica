import { z } from "zod";
import { ValidateAdapter } from "~/infra/adapters/validateAdapter";

const signUserSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
  source: z.enum(["STANDARD", "GOOGLE"]),
  avatar: z.url("URL de avatar inválida"),
  phone: z
    .string()
    .min(4, "Telefone é obrigatório")
    .refine(ValidateAdapter.phone, "Telefone inválido"),
  utm: z.record(z.string(), z.string()).optional(),
});

const forgotPasswordSchema = z.object({
  email: z.email("E-mail inválido"),
});

const changeForgotPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    forgotPasswordToken: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export {
  changeForgotPasswordSchema,
  createUserSchema,
  forgotPasswordSchema,
  signUserSchema,
};
