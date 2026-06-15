import { z } from "zod";

const paymentStatusSchema = z.object({
  amount: z.number(),
  fee_amount: z.number(),
  quantity: z.number(),
  gross_amount: z.number(),
});

type ExternalPaymentMetrics = z.infer<typeof externalPaymentMetricsSchema>;

const externalPaymentMetricsSchema = z.object({
  total: z.object({
    amount: z.number(),
    fee_amount: z.number(),
    quantity: z.number(),
  }),
  total_by_status: z.object({
    awaiting_payment: paymentStatusSchema,
    canceled: paymentStatusSchema,
    confirmed: paymentStatusSchema,
    created: paymentStatusSchema,
    deleted: paymentStatusSchema,
    failed: paymentStatusSchema,
    manual: paymentStatusSchema,
    overdue: paymentStatusSchema,
    processing: paymentStatusSchema,
    received: paymentStatusSchema,
    refunded: paymentStatusSchema,
  }),
  details: z.object({
    transfers: z.record(z.string(), paymentStatusSchema),
    subscriptions: z.record(z.string(), paymentStatusSchema),
  }),
});

export { externalPaymentMetricsSchema, type ExternalPaymentMetrics };
