import { ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { InternalBadRequestException } from '../../exceptions/internal-bad-request.exception';
import { CustomParseIntPipe } from '../custom-parse-int-pipe/custom-parse-int-pipe.pipe';

@Injectable()
export class ParseIdPipe extends CustomParseIntPipe {
  transform(value: string, metadata: ArgumentMetadata) {
    try {
      const id = super.transform(value, metadata);
      if (0 >= id) {
        throw new InternalBadRequestException(this.options?.errorMessage ?? 'ID inválido');
      }
      return id;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new InternalBadRequestException(this.options?.errorMessage ?? 'ID inválido');
      } else {
        throw error;
      }
    }

  }
}
