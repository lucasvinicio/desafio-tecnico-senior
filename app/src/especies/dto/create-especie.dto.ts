import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateEspecieDto {
  @ApiProperty({
    type: String,
    title: 'Código',
    description: 'Código da espécie de árvore',
    example: 'Handroanthus albus',
  })
  @MinLength(1, { message: 'O campo "código" deve ter pelo menos 1 caractere.' })
  @MaxLength(100, { message: 'O campo "código" deve ter no máximo 100 caracteres.' })
  @IsNotEmpty({ message: 'O campo "código" é obrigatório.',  })
  readonly codigo: string;

  @ApiPropertyOptional({
    type: String,
    title: 'Descrição',
    description: 'Descrição da espécie de árvore',
    example: 'Ipê-amarelo, também é conhecido no Brasil como aipê e ipê-branco',
  })
  @MaxLength(1000, { message: 'O campo "descrição" deve ter no máximo 1000 caracteres.' })
  @IsOptional()
  readonly descricao: string;
}
