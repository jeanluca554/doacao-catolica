import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class AuthGoogleUserController {
  constructor() {}

  async handle(route: RouteDTO) {
    let refundTo = route.query?.refundTo;
    if (!refundTo) refundTo = "/choose-workspace";

    const googleAuthURL = AuthService.generateAuthUrl("register");
    return AuthService.setAuthCallback(googleAuthURL, refundTo);
  }
}

export { AuthGoogleUserController };
