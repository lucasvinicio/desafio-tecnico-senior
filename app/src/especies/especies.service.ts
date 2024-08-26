import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SqlErrno } from '../common/constants/sql-errno.enum';
import { SqlStateError } from '../common/constants/sql-state-error.enum';
import { InternalBadRequestException } from '../common/exceptions/internal-bad-request.exception';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { EspecieEntity } from './entities/especie.entity';

@Injectable()
export class EspeciesService {

  constructor(
    @InjectRepository(EspecieEntity)
    private readonly repository: Repository<EspecieEntity>
  ) { }

  async findAll() {
    return await this.repository.find({
      relations: {
        arvores: true,
      }
    });
  }

  async findOne(especieId: number) {
    const especie = await this.repository.findOne({
      where: { especieId },
      relations: { arvores: true },
    });

    if (!especie) {
      throw new NotFoundException('Espécie não cadastrada');
    }

    return especie;
  }

  async create(createEspecieDto: CreateEspecieDto) {
    const especie = this.repository.create(createEspecieDto);
    
    return await this.repository.save(especie)
      .catch((exception) => {
        if (SqlStateError.INTEGRITY_CONSTRAINT_VIOLATION === exception.sqlState) {
          switch (exception?.errno) {
            case SqlErrno.DUPLICATE_ENTRY_ON_UNIQUE:
              throw new InternalBadRequestException('Espécie com mesmo código já cadastrada');
            case SqlErrno.FOREIGN_KEY_CONSTAINT_FAILED:
              throw new InternalBadRequestException('Dados de espécie inválidos');
          }
        }
        throw exception;
      }
    );
  }

  async update(especieId: number, updateEspecieDto: UpdateEspecieDto) {
    const especie = await this.findOne(especieId);
    const newEspecie = this.repository.merge(especie, updateEspecieDto);

    return this.repository.save(newEspecie)
      .catch((exception) => {
        if (SqlStateError.INTEGRITY_CONSTRAINT_VIOLATION === exception.sqlState) {
          throw new InternalBadRequestException('Espécie com mesmo código já cadastrada');
        }
        throw exception;
      });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
