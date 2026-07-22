import type { loader } from "~/main/routes/route.campaign.collaborators";

type CollaboratorsLoader = Awaited<ReturnType<typeof loader>>;

export type { CollaboratorsLoader };
