import { loader } from "~/main/routes/route.patientUpdate";

type UpdatePatientLoader = Awaited<ReturnType<typeof loader>>;

export type { UpdatePatientLoader };
