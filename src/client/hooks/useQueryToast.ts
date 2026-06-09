import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useToast, useScopedParams } from "@arkyn/components";

type UseQueryToastOptions = {
  param: string;
  value?: string; // opcional (default: "true")
  message: string;
  type?: "success" | "danger";
};

function useQueryToast({
  param,
  value = "true",
  message,
  type = "success",
}: UseQueryToastOptions) {
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const scopedParams = useScopedParams(location.search);
  const paramValue = scopedParams.getParam(param);

  const hasShown = useRef(false);

  useEffect(() => {
    if (paramValue === value && !hasShown.current) {
      hasShown.current = true;

      showToast({ message, type });

      const params = new URLSearchParams(location.search);
      params.delete(param);

      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true },
      );
    }
  }, [paramValue, value, message, type, showToast, location, navigate]);
}

export { useQueryToast };
