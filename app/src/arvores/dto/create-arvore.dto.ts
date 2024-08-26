import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, MaxLength, Min, MinLength } from "class-validator";
import { IsInteger } from "../../common/decorators/is-integer.decorator";

export class CreateArvoreDto {
  @MinLength(1, { message: 'O campo "código" deve ter pelo menos 1 caractere.' })
  @MaxLength(100, { message: 'O campo "código" deve ter no máximo 100 caracteres.' })
  @IsNotEmpty({ message: 'O campo "código" é obrigatório.' })
  @ApiProperty({
    type: String,
    title: 'Código',
    description: 'Código da árvore',
    example: 'ABC123',
  })
  readonly codigo: string;
  
  @MaxLength(1000, { message: 'O campo "descrição" deve ter no máximo 1000 caracteres.' })
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    title: 'Descrição',
    description: 'Descrição da árvore',
    example: 'Árvore próxima ao lago',
  })
  readonly descricao: string;
  
  @IsInteger({ field: 'idade' })
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    title: 'Idade (em anos)',
    description: 'Idade da árvore (em anos)',
    example: 5,
  })
  readonly idade: number;

  @IsInteger({ field: 'especieId' })
  @Min(1)
  @ApiProperty({
    type: Number,
    title: 'ID da espécie',
    description: 'ID da espécie da árvore',
    example: 1,
  })
  readonly especieId: number;

  @IsArray({ message: 'Os IDs de grupos devem ser um array de números' })
  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: () => Number,
    title: 'IDs de grupos',
    description: 'IDs dos grupos da árvore',
    example: [1],
  })
  readonly grupoIds: number[];
}
