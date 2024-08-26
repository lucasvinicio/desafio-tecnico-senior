import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from '../common/pipes/custom-parse-id/custom-parse-id.pipe';
import { ArvoresService } from './arvores.service';
import { CreateArvoreDto } from './dto/create-arvore.dto';
import { UpdateArvoreDto } from './dto/update-arvore.dto';
import { Arvore } from './entities/arvore.entity';

@ApiTags('Árvores')
@Controller('arvores')
@ApiInternalServerErrorResponse({ description: 'Erro interno' })
export class ArvoresController {
  constructor(private readonly arvoresService: ArvoresService) {}

  @Get()
  @ApiOperation({ summary: 'Busca todas as árvores' })
  @ApiOkResponse({
    type: Arvore,
    isArray: true,
    description: 'Retorna todas as árvores'
  })
  findAll() {
    return this.arvoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca por uma árvore específica' })
  @ApiOkResponse({ type: Arvore, description: 'Árvore retornada' })
  @ApiNotFoundResponse({ description: 'Árvore não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findOne(@Param('id', new ParseIdPipe) id: number) {
    return this.arvoresService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova árvore' })
  @ApiCreatedResponse({ type: Arvore, description: 'Árvore criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados de árvore inválidos' })
  create(@Body() createArvoreDto: CreateArvoreDto) {
    return this.arvoresService.create(createArvoreDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações de uma árvore cadastrada' })
  @ApiOkResponse({ type: Arvore, description: 'Árvore atualizada com sucesso' })
  @ApiNotFoundResponse({ description: 'Árvore não encontrada' })
  @ApiBadRequestResponse({ description: 'ID e/ou dados inválido(s)' })
  update(
    @Param('id', new ParseIdPipe) id: number,
    @Body() updateArvoreDto: UpdateArvoreDto,
  ) {
    return this.arvoresService.update(id, updateArvoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma árvore cadastrada' })
  @ApiOkResponse({ description: 'Árvore excluída com sucesso' })
  @ApiNotFoundResponse({ description: 'Árvore não encontrada' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  remove(@Param('id', new ParseIdPipe) id: number) {
    return this.arvoresService.remove(id);
  }
}
