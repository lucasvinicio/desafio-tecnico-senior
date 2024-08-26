import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, LessThan, MoreThan, Repository } from 'typeorm';
import { Arvore } from '../arvores/entities/arvore.entity';
import { isValidNumberArray } from '../common/utils';
import { CreateColheitaDto } from './dto/create-colheita.dto';
import { GetColheitaReportDto } from './dto/get-colheita-report.dto';
import { UpdateColheitaDto } from './dto/update-colheita.dto';
import { Colheita } from './entities/colheita.entity';

@Injectable()
export class ColheitasService {

  constructor(
    @InjectRepository(Colheita)
    private readonly repository: Repository<Colheita>,
  ) {}

  async findAll() {
    return await this.repository.find({
      relations: {
        arvore: true,
      }
    });
  }

  async findOne(colheitaId: number) {
    const colheita = await this.repository.findOne({
      where: { colheitaId },
      relations: { arvore: true },
    });

    if (!colheita) {
      throw new NotFoundException('Espécie não cadastrada');
    }

    return colheita;
  }

  async create(createColheitaDto: CreateColheitaDto) {
    const colheita = this.repository.create(createColheitaDto);
    colheita.arvore = { ...new Arvore(), arvoreId: createColheitaDto.arvoreId };

    return await this.repository.save(colheita);
  }

  async update(id: number, updateColheitaDto: UpdateColheitaDto) {
    const colheita = await this.findOne(id);
    const newColheita = this.repository.merge(
      colheita,
      updateColheitaDto,
      { arvore: { ...new Arvore(), arvoreId: updateColheitaDto.arvoreId } },
    );

    return await this.repository.save(newColheita);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }

  async findByEspecie(especieId: number) {
    return await this.repository.find({
      where: { arvore: { especie: { especieId } } },
    });
  }

  async findByParameters(parameters: GetColheitaReportDto) {
    const queryWhere: FindOptionsWhere<Colheita> = {
      arvore: {
        especie: { },
        grupos: { }
      }
    };

    const queryWhereArvore = queryWhere.arvore as FindOptionsWhere<Arvore>;

    if (isValidNumberArray(parameters?.especieIds)) {
      queryWhereArvore.especie = { especieId: In(parameters.especieIds) };
    }

    if (isValidNumberArray(parameters?.grupoIds)) {
      queryWhereArvore.grupos = { grupoId: In(parameters.grupoIds) };
    }

    if (isValidNumberArray(parameters?.arvoreIds)) {
      queryWhereArvore.arvoreId = In(parameters.arvoreIds);
    }

    if (parameters?.dataInicio && parameters?.dataFim) {
      queryWhere.data = Between(parameters.dataInicio, parameters.dataFim);
    } else {
      if (parameters?.dataInicio) {
        queryWhere.data = MoreThan(parameters.dataInicio);
      }
      if (parameters?.dataFim) {
        queryWhere.data = LessThan(parameters.dataFim);
      } 
    }

    return await this.repository.find({
      relations: { arvore: true },
      where: queryWhere,
    })
  }

  async getReportResume(parameters: GetColheitaReportDto) {
    const colheitasReport = await this.findByParameters(parameters);
    return colheitasReport.reduce((total, colheita) => total + Number(colheita.pesoBruto), 0);
  }
}
