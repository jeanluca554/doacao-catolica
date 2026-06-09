import { decodeRequestBody } from "@arkyn/server";

class DecodeRequestBodyAdapter {
  static async decode(request: Request): Promise<any> {
    return await decodeRequestBody(request);
  }
}

export { DecodeRequestBodyAdapter };
