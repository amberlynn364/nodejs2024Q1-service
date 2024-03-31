import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return;

    const startTime = Date.now();
    const controllerClassName = context.getClass().name;
    const response = context.switchToHttp().getResponse<Response>();
    const { method, path, query, body } = context
      .switchToHttp()
      .getRequest<Request>();
    let message = `${method} ${path} (query: ${JSON.stringify(
      query,
    )}, body: ${JSON.stringify(body)})`;

    response.on('close', () => {
      const timeSpend = Math.round(Date.now() - startTime);
      const { statusCode } = response;
      message += ` => ${statusCode} (${timeSpend} ms)`;
      this.loggingService.log(message, controllerClassName);
    });

    return next.handle();
  }
}
