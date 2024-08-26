import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from '../common/pipes/custom-parse-id/custom-parse-id.pipe';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';
import { GruposService } from './grupos.service';

@ApiTags('Grupos')
@Controller('grupos')
@ApiInternalServerErrorResponse({ description: 'Erro interno' })
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Get()
  @ApiOperation({ summary: 'Busca todos os grupos' })
  @ApiOkResponse({
    type: Grupo,
    isArray: true,
    description: 'Retorna todos os grupos'
  })
  findAll() {
    return this.gruposService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por um grupo específico' })
  @ApiOkResponse({ type: Grupo, description: 'Grupo retornado' })
  @ApiNotFoundResponse({ description: 'Grupo não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findOne(@Param('id', new ParseIdPipe) id: number) {
    return this.gruposService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo grupo' })
  @ApiCreatedResponse({ type: Grupo, description: 'Grupo criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados de grupo inválidos' })
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações de um grupo já cadastrado' })
  @ApiOkResponse({ type: Grupo, description: 'Grupo atualizado com sucesso' })
  @ApiNotFoundResponse({ description: 'Grupo não encontrado' })
  @ApiBadRequestResponse({ description: 'ID e/ou dados inválido(s)' })
  update(
    @Param('id', new ParseIdPipe) id: number,
    @Body() updateGrupoDto: UpdateGrupoDto
  ) {
    return this.gruposService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um grupo cadastrado' })
  @ApiOkResponse({ description: 'Grupo excluído com sucesso' })
  @ApiNotFoundResponse({ description: 'Grupo não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  remove(@Param('id', new ParseIdPipe) id: number) {
    return this.gruposService.remove(id);
  }
}
