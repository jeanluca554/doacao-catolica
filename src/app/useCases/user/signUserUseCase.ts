import type { UserGatewayDTO } from "~/domain/gateways/user";

type InputProps = {
  email: string;
  password: string;
};

class SignUserUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(input: InputProps) {
    const { password, email } = input;
    const [user, token] = await this.userGateway.signUser({ password, email });
    return [user.toJson(), token] as const;
  }
}

export { SignUserUseCase };
