import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from '../common/pipes/custom-parse-id/custom-parse-id.pipe';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { EspecieEntity } from './entities/especie.entity';
import { EspeciesService } from './especies.service';

@ApiTags('Espécies')
@Controller('especies')
@ApiInternalServerErrorResponse({ description: 'Erro interno' })
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Get()
  @ApiOperation({ summary: 'Busca por todas as espécies' })
  @ApiOkResponse({
    type: EspecieEntity,
    isArray: true,
    description: 'Retorna todas as espécies'
  })
  findAll() {
    return this.especiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por uma espécie específica' })
  @ApiOkResponse({ type: EspecieEntity, description: 'Espécie retornada' })
  @ApiNotFoundResponse({ description: 'Espécie não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findOne(@Param('id', new ParseIdPipe) id: number) {
    return this.especiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova espécie' })
  @ApiCreatedResponse({ type: EspecieEntity, description: 'Espécie criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados de espécie inválidos' })
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especiesService.create(createEspecieDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações de uma espécie cadastrada' })
  @ApiOkResponse({ description: 'Espécie atualizada' })
  @ApiNotFoundResponse({ description: 'Espécie não encontrada' })
  @ApiBadRequestResponse({ description: 'ID e/ou dados inválido(s)' })
  update(
    @Param('id', new ParseIdPipe) id: number,
    @Body() updateEspecyDto: UpdateEspecieDto,
  ) {
    return this.especiesService.update(id, updateEspecyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma espécie cadastrada' })
  @ApiOkResponse({ description: 'Espécie excluída com sucesso' })
  @ApiNotFoundResponse({ description: 'Espécie não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  remove(@Param('id', new ParseIdPipe) id: number) {
    return this.especiesService.remove(id);
  }
}
