import { useEffect } from "react";
import { toast } from "sonner";

const BAD_RESPONSE_NAMES = [
  "BadGateway",
  "BadRequest",
  "Conflict",
  "Forbidden",
  "NotFound",
  "NotImplemented",
  "ServerError",
  "Unauthorized",
  "UnprocessableEntity",
];

type ActionToastData = {
  toast?: { message: string; type: "success" | "error" };
  name?: string;
  message?: string;
  cause?: { fieldErrors?: Record<string, string[]> } | null;
} | null | undefined;

function useActionToast(data: ActionToastData) {
  useEffect(() => {
    if (!data) return;

    if (data.toast) {
      if (data.toast.type === "success") toast.success(data.toast.message);
      else toast.error(data.toast.message);
      return;
    }

    if (data.name && BAD_RESPONSE_NAMES.includes(data.name)) {
      if (data.cause?.fieldErrors) {
        toast.error("Verifique os campos e tente novamente.");
      } else {
        toast.error(data.message ?? "Ocorreu um erro inesperado.");
      }
    }
  }, [data]);
}

export { useActionToast };
export type { ActionToastData };
