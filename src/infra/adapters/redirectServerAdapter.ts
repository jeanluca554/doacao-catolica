import { redirect } from "react-router";

class RedirectServerAdapter {
  static to(url: string, init?: ResponseInit): void {
    throw redirect(url, init);
  }
}

export { RedirectServerAdapter };
