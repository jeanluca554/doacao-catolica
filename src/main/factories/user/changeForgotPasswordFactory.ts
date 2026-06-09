import { ChangeForgotPasswordUseCase } from "~/app/useCases/user/changeForgotPasswordUseCase";
import { ChangeForgotPasswordController } from "~/infra/controllers/user/changeForgotPasswordController";
import { UserGateway } from "~/infra/gateways/user";

const userGateway = new UserGateway();
const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase(
  userGateway
);
const changeForgotPasswordController = new ChangeForgotPasswordController(
  changeForgotPasswordUseCase
);

const changeForgotPassword = {
  handle: changeForgotPasswordController.handle.bind(
    changeForgotPasswordController
  ),
};

export { changeForgotPassword };
