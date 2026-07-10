import { CreateOneTimePaymentUseCase } from "~/app/useCases/createOneTimePayment/createOneTimePaymentUseCase";
import { RegisterOfflinePaymentUseCase } from "~/app/useCases/createOneTimePayment/registerOfflinePaymentUseCase";
import { CreateOneTimePaymentController } from "~/infra/controllers/createOneTimePayment/createOneTimePaymentController";

const createOneTimePaymentUseCase = new CreateOneTimePaymentUseCase();
const registerOfflinePaymentUseCase = new RegisterOfflinePaymentUseCase();
const createOneTimePaymentController = new CreateOneTimePaymentController(
  createOneTimePaymentUseCase,
  registerOfflinePaymentUseCase,
);

const createOneTimePayment = {
  handle: createOneTimePaymentController.handle.bind(
    createOneTimePaymentController,
  ),
};

export { createOneTimePayment };
