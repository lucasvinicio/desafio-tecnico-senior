import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateGrupoDto {
  @MinLength(1, { message: 'O código do grupo deve ter pelo menos 1 caractere.' })
  @MaxLength(100, { message: 'O código do grupo deve ter no máximo 100 caracteres.' })
  @IsNotEmpty({ message: 'O código do grupo deve ser informado.' })
  @ApiProperty({
    type: String,
    title: 'Código',
    description: 'Código do grupo',
    example: 'G01',
  })
  readonly codigo: string;

  @MaxLength(200, { message: 'O nome do grupo deve ter no máximo 200 caracteres.' })
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    title: 'Nome',
    description: 'Nome do grupo',
    example: 'Grupo 01',
  })
  readonly nome: string;

  @MaxLength(1000, { message: 'A descrição do grupo deve ter no máximo 1000 caracteres.' })
  @IsOptional()
  @ApiProperty({
    type: String,
    title: 'Descrição',
    description: 'Descrição do grupo',
    example: 'Árvores colhidas a cada 3 meses',
  })
  readonly descricao: string;

  @IsArray({ message: 'Os IDs de árvores devem ser um array de números' })
  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: () => Number,
    title: 'IDs de árvores',
    description: 'IDs de árvores do grupo',
    example: [1],
  })
  readonly arvoreIds: number[];
}
