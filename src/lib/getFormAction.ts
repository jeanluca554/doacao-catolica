async function getFormAction(request: Request) {
  const formData = await request.clone().formData();
  const action = formData.get("_action");

  return { _action: action?.toString() ?? null };
}

export { getFormAction };
