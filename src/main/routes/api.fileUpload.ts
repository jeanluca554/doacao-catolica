import type { Route } from "+/api.fileUpload";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { FileAdapter } from "~/infra/adapters/fileAdapter";
import { AuthService } from "~/infra/services/authService";
import { environmentVariables } from "../config/environmentVariables";

const ACCEPTED_FORMATS_LABEL = "JPG, PNG, WebP ou GIF";

function parsePositiveInt(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

export async function action(args: Route.ActionArgs) {
  const route = await RouteAdapter.adaptRoute(args);
  const user = await AuthService.getAuthStorage(route);
  if (!user) throw HttpAdapter.unauthorized("Unauthorized");

  const url = new URL(args.request.url);
  const width = parsePositiveInt(url.searchParams.get("w"));
  const height = parsePositiveInt(url.searchParams.get("h"));
  const quality = parsePositiveInt(url.searchParams.get("reduceQuality"));

  const uploadHandler = async (fileUpload: FileUpload): Promise<string> => {
    if (fileUpload.fieldName !== "file") {
      throw HttpAdapter.badRequest("Invalid field name");
    }

    const fileAdapter = new FileAdapter({
      awsAccessKeyId: environmentVariables.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: environmentVariables.AWS_SECRET_ACCESS_KEY,
      awsRegion: environmentVariables.AWS_REGION,
      awsS3Bucket: environmentVariables.AWS_S3_BUCKET,
      awsDomain: environmentVariables.AWS_DOMAIN,
      width,
      height,
      quality,
    });

    return await fileAdapter.uploadFile(fileUpload);
  };

  try {
    const formData = await parseFormData(args.request, uploadHandler);
    return { url: formData.get("file") };
  } catch (error) {
    const msg = error instanceof Error ? error.message.toLowerCase() : "";
    if (msg.includes("unsupported") || msg.includes("format")) {
      return {
        error: `Formato de imagem não suportado. Envie uma imagem ${ACCEPTED_FORMATS_LABEL}.`,
      };
    }
    return { error: "Erro ao processar imagem. Tente novamente." };
  }
}
