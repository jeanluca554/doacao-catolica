import { CollaboratorSearchParams } from "~/app/search/collaboratorSearchParams";
import type { CollaboratorGatewayDTO } from "~/domain/gateways/collaborator";

type InputProps = {
  page?: number | null;
  filter: { name?: string };
};

class ListCollaboratorsUseCase {
  constructor(private collaboratorGateway: CollaboratorGatewayDTO) {}

  async execute(input: InputProps) {
    const { page, filter } = input;
    const searchParams = new CollaboratorSearchParams({ page, filter });

    const collaborators =
      await this.collaboratorGateway.listCollaborators(searchParams);

    return collaborators.toJson();
  }
}

export { ListCollaboratorsUseCase };
