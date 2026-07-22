import type { ProjectRole } from "../entities/projectRole";

type ProjectRoleDalDTO = {
  listAll: (token: string) => Promise<ProjectRole[]>;
};

export type { ProjectRoleDalDTO };
