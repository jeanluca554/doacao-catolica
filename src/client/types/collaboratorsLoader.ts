import { loader } from "~/main/routes/route.collaborators";

type CollaboratorsLoader = Awaited<ReturnType<typeof loader>>;

export type { CollaboratorsLoader };
