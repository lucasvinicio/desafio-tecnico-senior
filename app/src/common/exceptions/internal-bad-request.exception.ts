import { BadRequestException } from "@nestjs/common";

export class InternalBadRequestException extends BadRequestException {
  constructor(message: string) {
    super(message, { cause: 'internal' });
  }
}
