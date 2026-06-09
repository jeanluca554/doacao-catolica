import type { SignUserByGoogleUseCase } from "~/app/useCases/user/signUserByGoogleUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { externalGoogleAuthSchema } from "~/infra/schemas/external/auth";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class AuthGoogleCallbackUserController {
  constructor(private signUserByGoogleUseCase: SignUserByGoogleUseCase) {}

  async handle(route: RouteDTO) {
    const searchParams = new URL(route.request.url).searchParams;

    const schemaValidator = new SchemaValidatorAdapter(
      externalGoogleAuthSchema,
    );

    const { code, refundTo } = schemaValidator.validate({
      code: searchParams.get("code"),
      state: searchParams.get("state"),
      refundTo: await AuthService.getAuthCallback(route),
    });

    const idToken = await AuthService.getTokenFromCode(code);

    const userEmail = idToken.email;
    const userAvatar = idToken.picture;
    const userName = idToken.name;
    const userSub = idToken.sub;

    if (!userEmail) {
      throw HttpAdapter.badRequest("Email not provided by Google");
    }

    if (!userAvatar) {
      throw HttpAdapter.badRequest("Avatar not provided by Google");
    }

    if (!userName) {
      throw HttpAdapter.badRequest("Name not provided by Google");
    }

    let signValue:
      | [{ id: string; name: string; email: string; avatar: string }, string]
      | null = null;

    try {
      const [user, token] = await this.signUserByGoogleUseCase.execute({
        email: userEmail,
      });
      signValue = [user, token];
    } catch (error) {
      const encodedName = encodeURIComponent(userName);
      const encodedMail = encodeURIComponent(userEmail);
      const encodedSub = encodeURIComponent(userSub);

      const url = `/sign-up-google?email=${encodedMail}&avatar=${userAvatar}&name=${encodedName}&sub=${encodedSub}`;
      throw RedirectServerAdapter.to(url);
    }

    return await AuthService.setAuthStorage(
      route,
      { ...signValue[0], avatar: userAvatar, token: signValue[1] },
      refundTo,
    );
  }
}

export { AuthGoogleCallbackUserController };
