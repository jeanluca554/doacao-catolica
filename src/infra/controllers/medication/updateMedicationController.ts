import type { UpdateMedicationUseCase } from "~/app/useCases/medication/updateMedicationUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { updateMedicationSchema } from "~/infra/schemas/internal/medication";
import type { RouteDTO } from "~/main/types/route";

class UpdateMedicationController {
  constructor(private updateMedicationUseCase: UpdateMedicationUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const treatmentId = route.params.treatmentId;

    if (!treatmentId) {
      throw HttpAdapter.badRequest("ID do tratamento não informado");
    }

    const schemaValidator = new SchemaValidatorAdapter(updateMedicationSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.updateMedicationUseCase.execute(
      validatedBody,
      treatmentId,
    );
  }
}

export { UpdateMedicationController };
