import type { UserGatewayDTO } from "~/domain/gateways/user";

type InputProps = {
  email: string;
};

class SignUserByGoogleUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(input: InputProps) {
    const { email } = input;

    const [user, token] = await this.userGateway.signUserByGoogle({ email });
    return [user.toJson(), token] as const;
  }
}

export { SignUserByGoogleUseCase };
