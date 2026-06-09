import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

class RouteAdapter {
  static async adaptRoute({
    params,
    request,
  }: LoaderFunctionArgs | ActionFunctionArgs) {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    return {
      request: request,
      params: params as Record<string, string>,
      query,
    };
  }
}

export { RouteAdapter };
