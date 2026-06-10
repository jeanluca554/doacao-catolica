import type { User } from "../entities/user";

type UserGatewayDTO = {
  meUser: (token: string) => Promise<User>;
};

export type { UserGatewayDTO };
