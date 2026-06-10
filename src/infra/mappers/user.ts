import { User } from "~/domain/entities/user";
import type { ExternalUser } from "../schemas/external/user";

class UserMapper {
  static toEntity(externalUser: ExternalUser, token: string): User {
    return User.restore({
      id: externalUser.id,
      name: externalUser.name,
      email: externalUser.email,
      avatar: externalUser.avatar,
      token: token,
      accountId: externalUser.account_id,
      provider: externalUser.provider,
    });
  }
}

export { UserMapper };
