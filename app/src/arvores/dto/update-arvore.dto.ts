import { PartialType } from '@nestjs/mapped-types';
import { CreateArvoreDto } from './create-arvore.dto';

export class UpdateArvoreDto extends PartialType(CreateArvoreDto) {}
