import { User } from "~/domain/entities/user";
import type { ExternalUser } from "../schemas/external/user";

class UserMapper {
  static toEntity(externalUser: ExternalUser) {
    return User.restore({
      id: externalUser.userId,
      name: externalUser.name,
      email: externalUser.email,
      avatar: externalUser.avatar,
    });
  }
}

export { UserMapper };
