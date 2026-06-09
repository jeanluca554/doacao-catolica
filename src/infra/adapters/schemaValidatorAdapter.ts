import { DebugService, SchemaValidator } from "@arkyn/server";
import z, { ZodType } from "zod";

DebugService.setIgnoreFile("schemaValidatorAdapter.ts");

class SchemaValidatorAdapter<T extends ZodType<any>> {
  constructor(readonly schema: T) {}

  validate(data: object): z.infer<T> {
    const schemaValidator = new SchemaValidator(this.schema);
    return schemaValidator.formValidate(data);
  }
}

export { SchemaValidatorAdapter };
