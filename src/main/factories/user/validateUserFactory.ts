import { ValidateUserUseCase } from "~/app/useCases/user/validateUserUseCase";
import { ValidateUserController } from "~/infra/controllers/user/validateUserController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();

const validateUserUseCase = new ValidateUserUseCase(userGateway);
const validateUserController = new ValidateUserController(validateUserUseCase);
const validateUser = validateUserController;

export { validateUser };
