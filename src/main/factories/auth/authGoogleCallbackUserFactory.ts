import { SignUserByGoogleUseCase } from "~/app/useCases/user/signUserByGoogleUseCase";
import { AuthGoogleCallbackUserController } from "~/infra/controllers/auth/authGoogleCallbackUserController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();

const signUserByGoogleUseCase = new SignUserByGoogleUseCase(userGateway);
const authGoogleCallbackUserController = new AuthGoogleCallbackUserController(signUserByGoogleUseCase);
const authGoogleCallbackUser = authGoogleCallbackUserController;

export { authGoogleCallbackUser };
