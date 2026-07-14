import { GenerateUpcomingPaymentsUseCase } from "~/app/useCases/generateUpcomingPayments/generateUpcomingPaymentsUseCase";
import { GenerateUpcomingPaymentsController } from "~/infra/controllers/generateUpcomingPayments/generateUpcomingPaymentsController";
import { UpcomingPaymentGateway } from "~/infra/gateways/upcomingPayment";

const upcomingPaymentGateway = new UpcomingPaymentGateway();
const generateUpcomingPaymentsUseCase = new GenerateUpcomingPaymentsUseCase(
  upcomingPaymentGateway,
);
const generateUpcomingPaymentsController = new GenerateUpcomingPaymentsController(
  generateUpcomingPaymentsUseCase,
);

const generateUpcomingPayments = {
  handle: generateUpcomingPaymentsController.handle.bind(
    generateUpcomingPaymentsController,
  ),
};

export { generateUpcomingPayments };
