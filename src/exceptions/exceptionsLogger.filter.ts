import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsLoggerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      error: exception.message,
    });
  }
}
