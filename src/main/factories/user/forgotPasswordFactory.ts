import { ForgotPasswordUseCase } from "~/app/useCases/user/forgotPasswordUseCase";
import { ForgotPasswordController } from "~/infra/controllers/user/forgotPasswordController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();
const forgotPasswordUseCase = new ForgotPasswordUseCase(userGateway);
const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase
);

const forgotPassword = {
  handle: forgotPasswordController.handle.bind(forgotPasswordController),
};

export { forgotPassword };
