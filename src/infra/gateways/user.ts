import type { User } from "~/domain/entities/user";
import type {
  CreateUserProps,
  SignUserByGoogleProps,
  SignUserProps,
  UserGatewayDTO,
} from "~/domain/gateways/user";
import { HttpAdapter } from "../adapters/httpAdapter";
import { JwtAdapter } from "../adapters/jwtAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { UserMapper } from "../mappers/user";
import {
  externalTokenSchema,
  externalUserSchema,
} from "../schemas/external/user";

class UserGateway implements UserGatewayDTO {
  async signUser(user: SignUserProps): Promise<[User, string]> {
    const url = "/users/signin-standard";
    const apiResponse = await api.post(url, { body: user });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const tokenValidator = new SchemaValidatorAdapter(externalTokenSchema);
    const token = tokenValidator.validate(apiResponse.response);

    const decoded = JwtAdapter.decode(token.jwt);
    const schemaValidator = new SchemaValidatorAdapter(externalUserSchema);
    const validatedExternalData = schemaValidator.validate(decoded);

    return [UserMapper.toEntity(validatedExternalData), token.jwt] as const;
  }

  async signUserByGoogle(user: SignUserByGoogleProps): Promise<[User, string]> {
    const url = "/users/signin-google";
    const apiResponse = await api.post(url, { body: user });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const tokenValidator = new SchemaValidatorAdapter(externalTokenSchema);
    const token = tokenValidator.validate(apiResponse.response);

    const decoded = JwtAdapter.decode(token.jwt);
    const schemaValidator = new SchemaValidatorAdapter(externalUserSchema);
    const validatedExternalData = schemaValidator.validate(decoded);

    return [UserMapper.toEntity(validatedExternalData), token.jwt] as const;
  }

  async createUser(user: CreateUserProps): Promise<void> {
    const mappedBody = { ...user, utm: undefined, utms: user.utm };
    const apiResponse = await api.post("/users/signup", { body: mappedBody });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async forgotPasswordToken(email: string): Promise<void> {
    const url = `/users/password-recovery`;
    const apiResponse = await api.post(url, { body: { email } });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async changePasswordByToken(token: string, password: string): Promise<void> {
    const url = `/users/password-change`;

    const apiResponse = await api.post(url, {
      body: { password },
      headers: { token },
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async validateUser(token: string): Promise<void> {
    const url = `/users/confirm-signup`;
    const apiResponse = await api.post(url, { token });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { UserGateway };
