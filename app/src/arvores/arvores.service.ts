import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SqlErrno } from '../common/constants/sql-errno.enum';
import { SqlStateError } from '../common/constants/sql-state-error.enum';
import { InternalBadRequestException } from '../common/exceptions/internal-bad-request.exception';
import { EspecieEntity } from '../especies/entities/especie.entity';
import { CreateArvoreDto } from './dto/create-arvore.dto';
import { UpdateArvoreDto } from './dto/update-arvore.dto';
import { Arvore } from './entities/arvore.entity';

@Injectable()
export class ArvoresService {

  constructor(
    @InjectRepository(Arvore)
    private readonly repository: Repository<Arvore>,
  ) {}

  async findAll() {
    return await this.repository.find({
      relations: {
        especie: true,
        grupos: true,
      }
    });
  }

  async findOne(arvoreId: number) {
    const arvore = await this.repository.findOne({
      where: { arvoreId },
      relations: { especie: true },
    });

    if (!arvore) {
      throw new InternalBadRequestException('Árvore não cadastrada');
    }

    return arvore;
  }

  async create(createArvoreDto: CreateArvoreDto) {
    const arvore = this.repository.create(createArvoreDto);
    arvore.especie = { ...new EspecieEntity(), especieId: createArvoreDto.especieId };

    return await this.repository.save(arvore)
      .catch((exception) => {
        if (SqlStateError.INTEGRITY_CONSTRAINT_VIOLATION === exception.sqlState) {
          switch (exception?.errno) {
            case SqlErrno.DUPLICATE_ENTRY_ON_UNIQUE:
              throw new InternalBadRequestException('Árvore com mesmo código já cadastrada');
            case SqlErrno.FOREIGN_KEY_CONSTAINT_FAILED: {
              const failedForeignKeyFields = ["especie_id", "grupo_id"]
                .filter(field => exception?.sqlMessage?.includes(`\`${field}\``));
              
              throw new InternalBadRequestException(`Dados de árvore inválidos: ${
                failedForeignKeyFields.map(field => field.split('_')[0]).join(', ')
              }`);
            }
          }
        }
        throw new InternalServerErrorException();
      }
    );
  }

  async update(id: number, updateArvoreDto: UpdateArvoreDto) {
    const arvore = await this.findOne(id);
    const newArvore = this.repository.merge(
      arvore,
      updateArvoreDto,
      { especie: { ...new EspecieEntity(), especieId: updateArvoreDto.especieId } }
    );

    return await this.repository.save(newArvore)
      .catch((exception) => {
        if (SqlStateError.INTEGRITY_CONSTRAINT_VIOLATION === exception.sqlState) {
          throw new InternalBadRequestException('Árvore com mesmo código já cadastrada');
        }
        throw exception;
      });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
