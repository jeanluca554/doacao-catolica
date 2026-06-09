import type { Role } from "../views/role";

type RoleDalDTO = {
  listAll: () => Promise<Role[]>;
};

export type { RoleDalDTO };
