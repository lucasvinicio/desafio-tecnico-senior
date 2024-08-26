import { ApiHeader, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional } from "class-validator";

@ApiHeader({
  name: 'Pârametros para filtrar o relatório de colheitas',
})
export class GetColheitaReportDto {
  @ApiPropertyOptional({
    isArray: true,
    type: Number,
    title: 'IDs de árvores',
    description: 'Lista de IDs de árvores',
    example: [1, 2],
  })
  @IsArray({ message: 'O campo "arvoreIds" deve ser um array de números' })
  @IsOptional()
  arvoreIds?: number[];
  
  @ApiPropertyOptional({
    isArray: true,
    type: Number,
    title: 'IDs de grupos',
    description: 'Lista de IDs de grupos',
    example: [1, 2],
  })
  @IsArray({ message: 'O campo "grupoIds" deve ser um array de números' })
  @IsOptional()
  grupoIds?: number[];
  
  @ApiPropertyOptional({
    isArray: true,
    type: Number,
    title: 'IDs de espécies',
    description: 'Lista de IDs de espécies',
    example: [1, 2],
  })
  @IsArray({ message: 'O campo "especieIds" deve ser um array de números' })
  @IsOptional()
  especieIds?: number[];
  
  @ApiPropertyOptional({
    type: Date,
    title: 'Data de ínicio (YYYY-MM-DD)',
    description: 'Data de ínicio para filtrar (no formato YYYY-MM-DD)',
    example: '2022-01-01',
  })
  @IsDate({ message: 'O campo "dataInicio" deve ser uma data válida.' })
  @Type(() => Date)
  @IsOptional()
  dataInicio?: Date;
  
  @ApiPropertyOptional({
    type: Date,
    title: 'Data de fim (YYYY-MM-DD)',
    description: 'Data de fim para filtrar (no formato YYYY-MM-DD)',
    example: '2022-01-05',
  })
  @IsDate({ message: 'O campo "dataFim" deve ser uma data válida.' })
  @Type(() => Date)
  @IsOptional()
  dataFim?: Date;
}
