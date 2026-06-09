import type { UserGatewayDTO } from "~/domain/gateways/user";

type InputProps = {
  email: string;
  name: string;
  phone: string;
  password: string;
  source: "STANDARD" | "GOOGLE";
  avatar: string;
  utm?: Record<string, string>;
};

class CreateUserUseCase {
  constructor(private userGateway: UserGatewayDTO) {}

  async execute(input: InputProps) {
    const { password, email, name, phone, utm, source, avatar } = input;

    await this.userGateway.createUser({
      avatar,
      password,
      email,
      name,
      phone,
      utm,
      source,
    });
  }
}

export { CreateUserUseCase };
