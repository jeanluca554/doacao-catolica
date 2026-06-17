import { FindOneContactUseCase } from "~/app/useCases/contacts/findOneContactUseCase";
import { FindOneContactController } from "~/infra/controllers/contacts/findOneContactController";
import { ContactGateway } from "~/infra/gateways/contact";

const contactGateway = new ContactGateway();
const findOneContactUseCase = new FindOneContactUseCase(contactGateway);
const findOneContactController = new FindOneContactController(
  findOneContactUseCase,
);

const findOneContact = {
  handle: findOneContactController.handle.bind(findOneContactController),
};

export { findOneContact };
