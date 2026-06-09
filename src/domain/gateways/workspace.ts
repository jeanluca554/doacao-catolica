import type { Workspace } from "../entities/workspace";

type CreateWorkspaceProps = {
  name: string;
  description: string;
  userId: string;
  image: string;
  status: "active" | "inactive";
};

type UpdateWorkspaceProps = {
  id: string;
  name: string;
  description: string;
  userId: string;
  image: string;
  status: "active" | "inactive";
};

type WorkspaceGatewayDTO = {
  createWorkspace: (i: CreateWorkspaceProps, token: string) => Promise<string>;
  updateWorkspace: (i: UpdateWorkspaceProps, token: string) => Promise<void>;
  listWorkspaces: (userId: string, token: string) => Promise<Workspace[]>;
};

export type { CreateWorkspaceProps, WorkspaceGatewayDTO, UpdateWorkspaceProps };
