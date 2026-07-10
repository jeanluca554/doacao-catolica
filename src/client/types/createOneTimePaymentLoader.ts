import type { loader } from "~/main/routes/route.campaign.createOneTimePayment";

type CreateOneTimePaymentLoader = Awaited<ReturnType<typeof loader>>;

export type { CreateOneTimePaymentLoader };
