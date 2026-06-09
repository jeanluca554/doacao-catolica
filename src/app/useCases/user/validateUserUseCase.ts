import type { UserGatewayDTO } from "~/domain/gateways/user";

class ValidateUserUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(token: string) {
    await this.userGateway.validateUser(token);
  }
}

export { ValidateUserUseCase };
