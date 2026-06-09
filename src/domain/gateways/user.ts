import type { User } from "../entities/user";

type SignUserProps = {
  email: string;
  password: string;
};

type SignUserByGoogleProps = {
  email: string;
};

type CreateUserProps = {
  avatar: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  source: "STANDARD" | "GOOGLE";
  utm?: Record<string, string>;
};

type UserGatewayDTO = {
  signUser: (i: SignUserProps) => Promise<[User, string]>;
  signUserByGoogle: (i: SignUserByGoogleProps) => Promise<[User, string]>;
  createUser: (i: CreateUserProps) => Promise<void>;
  forgotPasswordToken: (email: string) => Promise<void>;
  changePasswordByToken: (token: string, newPassword: string) => Promise<void>;
  validateUser: (token: string) => Promise<void>;
};

export type {
  CreateUserProps,
  SignUserByGoogleProps,
  SignUserProps,
  UserGatewayDTO,
};
