import { decodeJwt } from "jose";
import { HttpAdapter } from "./httpAdapter";

class JwtAdapter {
  static decode(token: string) {
    try {
      const raw = token.replace(/^Bearer\s+/i, "");
      const payload = decodeJwt(raw);
      return { ...payload, token };
    } catch (error) {
      throw HttpAdapter.unauthorized("Invalid token");
    }
  }
}

export { JwtAdapter };
