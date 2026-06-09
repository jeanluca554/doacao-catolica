import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "../types/route";

class AuthMiddleware {
  static async authenticate(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw RedirectServerAdapter.to("/sign-in");

    return user;
  }

  static async getUser(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) return null;
    return user;
  }

  static async logoutUser(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) return null;

    return await AuthService.destroyAuthStorage(route);
  }
}

export { AuthMiddleware };
