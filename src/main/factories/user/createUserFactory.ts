import { CreateUserUseCase } from "~/app/useCases/user/createUserUseCase";
import { CreateUserController } from "~/infra/controllers/user/createUserController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();

const createUserUseCase = new CreateUserUseCase(userGateway);
const createUserController = new CreateUserController(createUserUseCase);
const createUser = createUserController;

export { createUser };
