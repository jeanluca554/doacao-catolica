type RouteDTO = {
  request: Request;
  params: Record<string, string>;
  query: Record<string, string>;
};

export type { RouteDTO };
