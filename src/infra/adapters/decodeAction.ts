class DecodeActionAdapter {
  static async decode(request: Request): Promise<string | null> {
    const formData = await request.clone().formData();
    const _action = formData.get("_action");
    return _action ? _action.toString() : null;
  }
}

export { DecodeActionAdapter };
