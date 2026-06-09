import { Workspace } from "~/domain/entities/workspace";
import type { ExternalWorkspace } from "../schemas/external/workspace";

class WorkspaceMapper {
  static toEntity(externalWorkspace: ExternalWorkspace) {
    return Workspace.restore({
      id: externalWorkspace.id,
      description: externalWorkspace.description,
      name: externalWorkspace.name,
      image: externalWorkspace.image,
      status: externalWorkspace.active ? "active" : "inactive",
      userId: externalWorkspace.userId,
    });
  }
}

export { WorkspaceMapper };
