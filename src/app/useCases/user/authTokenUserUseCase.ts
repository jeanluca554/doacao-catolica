import type { UserGatewayDTO } from "~/domain/gateways/user";

class AuthTokenUserUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(token: string) {
    return this.userGateway.meUser(token);
  }
}

export { AuthTokenUserUseCase };
