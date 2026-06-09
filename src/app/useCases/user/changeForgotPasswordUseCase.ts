import type { UserGatewayDTO } from "~/domain/gateways/user";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";

type InputProps = {
  newPassword: string;
  forgotPasswordToken: string;
};

class ChangeForgotPasswordUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(input: InputProps) {
    const { newPassword, forgotPasswordToken } = input;

    await this.userGateway.changePasswordByToken(
      forgotPasswordToken,
      newPassword,
    );

    throw RedirectServerAdapter.to(
      `/forgot-password/${forgotPasswordToken}?passwordChanged=true`,
    );
  }
}

export { ChangeForgotPasswordUseCase };
