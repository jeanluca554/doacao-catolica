import { SignUserUseCase } from "~/app/useCases/user/signUserUseCase";
import { SignUserController } from "~/infra/controllers/user/signUserController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();

const signUserUseCase = new SignUserUseCase(userGateway);
const signUserController = new SignUserController(signUserUseCase);
const signUser = signUserController;

export { signUser };
