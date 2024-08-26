import { ArgumentMetadata, Injectable, ParseIntPipeOptions, PipeTransform } from '@nestjs/common';
import { InternalBadRequestException } from '../../../common/exceptions/internal-bad-request.exception';

export interface CustomParseIntPipeOptions extends Pick<ParseIntPipeOptions, 'optional'> {
  errorMessage?: string;
}

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  protected readonly options?: CustomParseIntPipeOptions = {
    optional: false,
    errorMessage: 'Numeral inválido',
  };

  constructor(options?: CustomParseIntPipeOptions) {
    this.options = options;
  }

  transform(value: string, _metadata: ArgumentMetadata) {
    if (this.options?.optional && !value) {
      return null;
    }

    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new InternalBadRequestException(this.options?.errorMessage);
    }
    return intValue;
  }
}
