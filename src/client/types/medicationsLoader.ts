import { loader } from "~/main/routes/route.medications";

type MedicationsLoader = Awaited<ReturnType<typeof loader>>;

export type { MedicationsLoader };
