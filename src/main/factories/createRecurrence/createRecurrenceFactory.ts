import { CreateRecurrenceUseCase } from "~/app/useCases/createRecurrence/createRecurrenceUseCase";
import { CreateRecurrenceController } from "~/infra/controllers/createRecurrence/createRecurrenceController";
import { ContactGateway } from "~/infra/gateways/contact";
import { DonorGateway } from "~/infra/gateways/donor";
import { SubscriptionGateway } from "~/infra/gateways/subscription";

const contactGateway = new ContactGateway();
const donorGateway = new DonorGateway();
const subscriptionGateway = new SubscriptionGateway();
const createRecurrenceUseCase = new CreateRecurrenceUseCase(
  contactGateway,
  donorGateway,
  subscriptionGateway,
);
const createRecurrenceController = new CreateRecurrenceController(
  createRecurrenceUseCase,
);

const createRecurrence = {
  handle: createRecurrenceController.handle.bind(createRecurrenceController),
};

export { createRecurrence };
