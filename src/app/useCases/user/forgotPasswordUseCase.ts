import type { UserGatewayDTO } from "~/domain/gateways/user";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";

type InputProps = {
  email: string;
};

class ForgotPasswordUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(input: InputProps) {
    const { email } = input;
    await this.userGateway.forgotPasswordToken(email);
    throw RedirectServerAdapter.to("/forgot-password?emailSent=true");
  }
}

export { ForgotPasswordUseCase };
