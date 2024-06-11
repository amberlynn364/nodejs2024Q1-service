export enum StatusCodeMessage {
  NotFound = 'Not Found',
  BadRequest = 'Bad Request',
  UnprocessableEntity = 'Unprocessable Entity',
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUserId extends Request {
  userId: string;
}
