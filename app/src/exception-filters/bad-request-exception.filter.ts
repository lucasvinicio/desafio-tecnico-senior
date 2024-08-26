import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    const jsonResponse = {
      status: 'error',
      message: exception?.cause == 'internal' ? exception.message : 'Parâmetros de requisição inválidos',
    };

    response
      .status(status)
      .json(jsonResponse);
  }
}
