import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arvore } from '../arvores/entities/arvore.entity';
import { SqlErrno } from '../common/constants/sql-errno.enum';
import { SqlStateError } from '../common/constants/sql-state-error.enum';
import { InternalBadRequestException } from '../common/exceptions/internal-bad-request.exception';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';

@Injectable()
export class GruposService {

  constructor(
    @InjectRepository(Grupo)
    private readonly repository: Repository<Grupo>,
  ) {}

  async findAll() {
    return await this.repository.find({
      relations: {
        arvores: true
      }
    });
  }

  async findOne(grupoId: number) {
    const grupo = await this.repository.findOne({
      where: { grupoId },
      relations: { arvores: true },
    });

    if (!grupo) {
      throw new InternalBadRequestException('Grupo não cadastrado');
    }

    return grupo;
  }

  async create(createGrupoDto: CreateGrupoDto) {
    const entity = this.repository.create(createGrupoDto);

    if (createGrupoDto?.arvoreIds) {
      entity.arvores = createGrupoDto.arvoreIds?.map(arvoreId => ({ ...new Arvore(), arvoreId }));
    }

    return await this.repository.save(entity)
      .catch(exception => {
        if (SqlStateError.INTEGRITY_CONSTRAINT_VIOLATION === exception.sqlState) {
          throw new InternalBadRequestException('Há um grupo com o mesmo código já cadastrado');
        }
        throw exception;
      });
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto) {
    const grupo = await this.findOne(id);
    const newGrupo = this.repository.merge(grupo, updateGrupoDto);
    
    if (updateGrupoDto?.arvoreIds) {
      newGrupo.arvores = updateGrupoDto.arvoreIds?.map(arvoreId => ({ ...new Arvore(), arvoreId }));
    }

    return await this.repository.save(newGrupo)
      .catch(exception => {
        if (SqlStateError.INTEGRITY_CONSTRAINT_VIOLATION === exception.sqlState) {
          switch (exception?.errno) {
            case SqlErrno.DUPLICATE_ENTRY_ON_UNIQUE:
              throw new InternalBadRequestException('Há um grupo com o mesmo código já cadastrado');
            case SqlErrno.FOREIGN_KEY_CONSTAINT_FAILED:
              throw new InternalBadRequestException('Dados de grupo inválidos, árvores não cadastradas');
          }
        }
        throw exception;
      });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
