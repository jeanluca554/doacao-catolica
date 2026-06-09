import { loader } from "~/main/routes/layout.treatmentLayout";

type TreatmentLoader = Awaited<ReturnType<typeof loader>>;

export type { TreatmentLoader };
