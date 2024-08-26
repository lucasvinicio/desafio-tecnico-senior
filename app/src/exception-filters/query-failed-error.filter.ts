import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message
        });
  }
}
