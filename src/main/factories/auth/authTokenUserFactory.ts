import { AuthTokenUserUseCase } from "~/app/useCases/user/authTokenUserUseCase";
import { AuthTokenUserController } from "~/infra/controllers/auth/authTokenUserController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();
const authTokenUserUseCase = new AuthTokenUserUseCase(userGateway);
const authTokenUserController = new AuthTokenUserController(authTokenUserUseCase);
const authTokenUser = authTokenUserController;

export { authTokenUser };
