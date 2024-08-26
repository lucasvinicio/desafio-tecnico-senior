import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException } from "@nestjs/common";
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.NOT_FOUND;

    const jsonResponse = {
      status: 'error',
      message: exception.message,
    };

    const isDefaultBadRequestMessage = exception.message === 'Not Found';
    if (isDefaultBadRequestMessage) {
      jsonResponse.message = "Entidade não encontrada"; 
    }

    response
      .status(status)
      .json(jsonResponse);
  }
}
