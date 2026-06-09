import z from "zod";

const externalGoogleAuthSchema = z.object({
  code: z.string(),
  state: z.string(),
  refundTo: z.string(),
});

export { externalGoogleAuthSchema };
