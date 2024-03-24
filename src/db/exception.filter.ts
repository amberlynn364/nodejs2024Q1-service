import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { StatusCodeMessage } from 'src/types';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    switch (exception.code) {
      case 'P2003': {
        const statusCode = HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
          message: StatusCodeMessage.BadRequest,
          statusCode,
        });
        break;
      }
      case 'P2025': {
        const statusCode = HttpStatus.NOT_FOUND;
        response.status(statusCode).json({
          message: StatusCodeMessage.NotFound,
          statusCode,
        });
        break;
      }
      default: {
        super.catch(exception, host);
        break;
      }
    }
  }
}
