import {
  BadGateway,
  BadRequest,
  Conflict,
  DebugService,
  NotFound,
  ServerError,
  Unauthorized,
  UnprocessableEntity,
  NotImplemented,
  Created,
  Updated,
  Success,
} from "@arkyn/server";

DebugService.setIgnoreFile("httpAdapter.ts");

type UnprocessableEntityProps = {
  data?: any;
  fieldErrors?: Record<string, string>;
  fields?: Record<string, string>;
  message?: string;
};

class HttpAdapter {
  static badRequest(message: string, cause?: any) {
    throw new BadRequest(message, cause);
  }

  static badGateway(message: string, cause?: any) {
    throw new BadGateway(message, cause);
  }

  static serverError(message: string, cause?: any) {
    throw new ServerError(message, cause);
  }

  static notFound(message: string, cause?: any) {
    throw new NotFound(message, cause);
  }

  static conflict(message: string, cause?: any) {
    throw new Conflict(message, cause);
  }

  static unauthorized(message: string, cause?: any) {
    throw new Unauthorized(message, cause);
  }

  static notImplemented(message: string, cause?: any) {
    throw new NotImplemented(message, cause);
  }

  static unprocessableEntity(props: UnprocessableEntityProps) {
    throw new UnprocessableEntity(props);
  }

  static created(message: string, body?: any) {
    throw new Created(message, {
      closeModal: true,
      message,
      name: "Success",
      ...body,
    });
  }

  static updated(message: string, body?: any) {
    throw new Updated(message, {
      closeModal: true,
      message,
      name: "Success",
      ...body,
    });
  }

  static success(message: string, body?: any) {
    throw new Success(message, {
      closeModal: true,
      message,
      name: "Success",
      ...body,
    });
  }
}

export { HttpAdapter };
