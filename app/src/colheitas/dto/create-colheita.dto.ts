import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Max, MaxDate, MaxLength, Min } from "class-validator";
import { IsInteger } from "../../common/decorators/is-integer.decorator";

export class CreateColheitaDto {
  @ApiPropertyOptional({
    type: String,
    title: 'Informações',
    description: 'Informações da colheita',
    example: 'Colheita feita pelo João',
  })
  @MaxLength(1000, { message: 'O campo "informações" deve ter no máximo 1000 caracteres.' })
  @IsOptional()
  informacoes: string;

  @ApiProperty({
    type: Date,
    title: 'Data (YYYY-MM-DD)',
    description: 'Data da colheita (no formato YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @MaxDate(new Date(), { message: 'A data da colheita deve ser anterior à data atual.' })
  @Type(() => Date)
  @IsDate({ message: 'O campo "data" deve ser uma data válida (no formato YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'O campo "data" é obrigatório.' })
  data: Date;

  @ApiProperty({
    type: Number,
    title: 'Peso bruto (kg)',
    description: 'Peso bruto da colheita (em kilogramas)',
    example: 5.23,
  })
  @Max(99999.99, { message: 'O campo "pesoBruto" deve ser menor que 100000.' })
  @Min(0.01, { message: 'O campo "pesoBruto" deve ser maior que 0.00' })
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  }, {
    message: 'O campo "pesoBruto" deve ser um número real válido (com até duas casas decimais e positivo).',
  })
  @IsNotEmpty({ message: 'O campo "pesoBruto" é obrigatório.' })
  pesoBruto: number;

  @ApiProperty({
    type: Number,
    title: 'ID da árvore',
    description: 'ID da árvore colhida',
    example: 1,
  })
  @Min(1, { message: 'O campo "arvoreId" deve ser maior que 0.' })
  @IsInteger({ field: 'arvoreId' })
  @IsNotEmpty({ message: 'O campo "arvoreId" é obrigatório.' })
  arvoreId: number;
}
