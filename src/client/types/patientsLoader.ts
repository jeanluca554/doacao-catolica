import { loader } from "~/main/routes/route.patients";

type PatientsLoader = Awaited<ReturnType<typeof loader>>;

export type { PatientsLoader };
