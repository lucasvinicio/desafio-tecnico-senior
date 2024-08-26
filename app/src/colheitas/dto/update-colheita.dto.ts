import { PartialType } from '@nestjs/swagger';
import { CreateColheitaDto } from './create-colheita.dto';

export class UpdateColheitaDto extends PartialType(CreateColheitaDto) {}
