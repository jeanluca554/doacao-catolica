import type { Route } from "+/api.fileUpload";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { FileAdapter } from "~/infra/adapters/fileAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { environmentVariables } from "../config/environmentVariables";

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const width = url.searchParams.get("w") ? Number(url.searchParams.get("w")) : undefined;
  const height = url.searchParams.get("h") ? Number(url.searchParams.get("h")) : undefined;
  const quality = url.searchParams.get("reduceQuality")
    ? Number(url.searchParams.get("reduceQuality"))
    : undefined;

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

  const formData = await parseFormData(request, uploadHandler);
  return { url: formData.get("file") };
}
