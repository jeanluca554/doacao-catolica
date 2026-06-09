import type { CreateWorkspaceUseCase } from "~/app/useCases/workspace/createWorkspaceUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { createWorkspaceSchema } from "~/infra/schemas/internal/workspace";
import { AuthMiddleware } from "~/main/middlewares/authMiddleware";
import type { RouteDTO } from "~/main/types/route";

class CreateWorkspaceController {
  constructor(private createWorkspaceUseCase: CreateWorkspaceUseCase) {}

  async handle(route: RouteDTO) {
    const { token, id: userId } = await AuthMiddleware.authenticate(route);
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(createWorkspaceSchema);
    const validatedBody = schemaValidator.validate({
      ...body,
      userId,
      description: body?.name,
      image: `https://ui-avatars.com/api/?name=${body?.name}`,
    });

    const workspaceId = await this.createWorkspaceUseCase.execute(
      { ...validatedBody, status: "active" },
      token,
    );

    throw RedirectServerAdapter.to(`/workspaces/${workspaceId}/home`);
  }
}

export { CreateWorkspaceController };
