import { loader } from "~/main/routes/route.chooseWorkspace";

type ChooseWorkspaceLoader = Awaited<ReturnType<typeof loader>>;

export type { ChooseWorkspaceLoader };
