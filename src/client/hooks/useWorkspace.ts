import { useMatches, useParams } from "react-router";
import type { WorkspaceLoader } from "../types/workspaceLoader";

function useWorkspace() {
  const matches = useMatches();

  const matchUrl = "main/routes/layout.workspaceLayout";
  const match = matches.find((m) => m.id === matchUrl);
  const data = match?.loaderData as WorkspaceLoader;

  const workspaces = data?.workspaces || [];
  const workspaceId = useParams()?.workspaceId;

  const currentWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId,
  );

  if (data && currentWorkspace) return { ...data, currentWorkspace };

  throw new Error("Workspace layout match not found");
}

export { useWorkspace };
