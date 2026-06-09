import { generateId } from "@arkyn/shared";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { FileUpload } from "@mjackson/form-data-parser";
import { Readable } from "stream";

type ConstructorProps = {
  awsRegion: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsS3Bucket: string;
  awsDomain: string;
};

class FileAdapter {
  readonly awsRegion: string;
  readonly awsAccessKeyId: string;
  readonly awsSecretAccessKey: string;
  readonly awsS3Bucket: string;
  readonly awsDomain: string;

  constructor(props: ConstructorProps) {
    this.awsRegion = props.awsRegion;
    this.awsAccessKeyId = props.awsAccessKeyId;
    this.awsSecretAccessKey = props.awsSecretAccessKey;
    this.awsS3Bucket = props.awsS3Bucket;
    this.awsDomain = props.awsDomain;
  }

  async uploadFile(file: FileUpload): Promise<string> {
    const fileSize = file.size;
    const contentType = file.type;
    const webStream = file.stream();
    const fileStream = Readable.fromWeb(webStream as any);

    const uploadParams = {
      Bucket: this.awsS3Bucket,
      Key: `uploads/${generateId("text", "v4")}`,
      Body: fileStream,
      ContentType: contentType,
      ContentLength: fileSize,
    };

    const s3Client = new S3Client({
      region: this.awsRegion,
      credentials: {
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretAccessKey,
      },
    });

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `${this.awsDomain}/${uploadParams.Key}`;
  }
}

export { FileAdapter };
