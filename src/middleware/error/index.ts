export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UN_AUTHORIZED = 401,
  NOT_MATCH = 406,
}

class BaseError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

class ApiError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error'
  ) {
    super(name, httpCode, description, isOperational);
  }
}

class Http400Error extends BaseError {
  constructor(description = 'bad request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description, true);
  }
}

class NotFoundError extends BaseError {
  constructor(description = 'path not found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description, true);
  }
}

class UnauthorizedError extends BaseError {
  constructor(description = 'unauthorized') {
    super('UNAUTHORIZED', HttpStatusCode.UN_AUTHORIZED, description, true);
  }
}

//
// type Http400ErrorType = Http400Error;
// type NotFoundErrorType = NotFoundError
// type UnauthorizedErrorType = UnauthorizedError
// type ApiErrorType = ApiError
// type BaseErrorType = BaseError

export {
  BaseError,
  ApiError,
  Http400Error,
  NotFoundError,
  UnauthorizedError,
  // Http400ErrorType,
  // NotFoundErrorType,
  // UnauthorizedErrorType,
  // ApiErrorType,
  // BaseErrorType
};
