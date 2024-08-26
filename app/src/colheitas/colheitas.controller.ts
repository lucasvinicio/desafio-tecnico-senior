import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from '../common/pipes/custom-parse-id/custom-parse-id.pipe';
import { ColheitasService } from './colheitas.service';
import { CreateColheitaDto } from './dto/create-colheita.dto';
import { GetColheitaReportDto } from './dto/get-colheita-report.dto';
import { UpdateColheitaDto } from './dto/update-colheita.dto';
import { Colheita } from './entities/colheita.entity';

@ApiTags('Colheitas')
@Controller('colheitas')
@ApiInternalServerErrorResponse({ description: 'Erro interno' })
export class ColheitasController {
  constructor(private readonly colheitasService: ColheitasService) {}

  @Get()
  @ApiOperation({ summary: 'Busca todas as colheitas' })
  @ApiOkResponse({
    isArray: true,
    type: Colheita,
    description: 'Retorna todas as colheitas'
  })
  findAll() {
    return this.colheitasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por uma colheita específica' })
  @ApiOkResponse({ type: Colheita, description: 'Colheita retornada' })
  @ApiNotFoundResponse({ description: 'Colheita não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findOne(@Param('id', new ParseIdPipe) id: number) {
    return this.colheitasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova colheita' })
  @ApiCreatedResponse({ type: Colheita, description: 'Espécie criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados de colheita inválidos' })
  create(@Body() createColheitaDto: CreateColheitaDto) {
    return this.colheitasService.create(createColheitaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações de uma colheita cadastrada' })
  @ApiOkResponse({ type: Colheita, description: 'Colheita atualizada com sucesso' })
  @ApiNotFoundResponse({ description: 'Colheita não encontrada' })
  @ApiBadRequestResponse({ description: 'ID e/ou dados inválido(s)' })
  update(
    @Param('id', new ParseIdPipe) id: number,
    @Body() updateColheitaDto: UpdateColheitaDto
  ) {
    return this.colheitasService.update(id, updateColheitaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma colheita cadastrada' })
  @ApiOkResponse({ description: 'Colheita excluída com sucesso' })
  @ApiNotFoundResponse({ description: 'Colheita não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  remove(@Param('id', new ParseIdPipe) id: number) {
    return this.colheitasService.remove(id);
  }

  @Get('especies/:especieId')
  @ApiOperation({ summary: 'Busca todas as colheitas feitas na espécie' })
  @ApiOkResponse({ isArray: true, type: Colheita, description: 'Colheitas retornadas' })
  @ApiNotFoundResponse({ description: 'Espécie não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findByEspecie(@Param('especieId', new ParseIdPipe) especieId: number) {
    return this.colheitasService.findByEspecie(especieId);
  }

  @Post('get-relatorio')
  @ApiOperation({ summary: 'Relatório de colheitas' })
  @ApiOkResponse({
    isArray: true,
    type: Colheita,
    description: 'Colheitas retornadas'
  })
  @ApiBadRequestResponse({ description: 'Parametros inválidos' })
  getReport(@Body() parameters: GetColheitaReportDto) {
    return this.colheitasService.findByParameters(parameters);
  }

  @Post('get-relatorio-peso-bruto-total')
  @ApiOperation({ summary: 'Relatório de colheitas' })
  @ApiOkResponse({
    isArray: true,
    type: Colheita,
    description: 'Colheitas retornadas'
  })
  @ApiBadRequestResponse({ description: 'Parametros inválidos' })
  getRelatorioPesoBrutoTotal(@Body() parameters: GetColheitaReportDto) {
    return this.colheitasService.getReportResume(parameters);
  }
}
