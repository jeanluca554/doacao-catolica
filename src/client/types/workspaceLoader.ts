import { loader } from "~/main/routes/layout.workspaceLayout";

type WorkspaceLoader = Awaited<ReturnType<typeof loader>>;

export type { WorkspaceLoader };
