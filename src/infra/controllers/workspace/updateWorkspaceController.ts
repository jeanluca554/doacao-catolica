import type { UpdateWorkspaceUseCase } from "~/app/useCases/workspace/updateWorkspaceUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { updateWorkspaceSchema } from "~/infra/schemas/internal/workspace";
import { AuthMiddleware } from "~/main/middlewares/authMiddleware";
import type { RouteDTO } from "~/main/types/route";

class UpdateWorkspaceController {
  constructor(private updateWorkspaceUseCase: UpdateWorkspaceUseCase) {}

  async handle(route: RouteDTO) {
    const { token, id: userId } = await AuthMiddleware.authenticate(route);
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(updateWorkspaceSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.updateWorkspaceUseCase.execute(
      { ...validatedBody, status: "active", userId },
      token,
    );
  }
}

export { UpdateWorkspaceController };
