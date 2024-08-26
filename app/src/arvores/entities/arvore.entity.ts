import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Colheita } from "../../colheitas/entities/colheita.entity";
import { EspecieEntity } from "../../especies/entities/especie.entity";
import { Grupo } from "../../grupos/entities/grupo.entity";

@Entity()
export class Arvore {
  @ApiProperty({
    type: Number,
    title: 'ID',
    description: 'ID da árvore',
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'arvore_id' })
  arvoreId: number;

  @Column()
  @ApiProperty({
    type: String,
    title: 'Código',
    description: 'Código da árvore',
    example: 'ABC123',
  })
  codigo: string;

  @Column()
  @ApiPropertyOptional({
    type: String,
    title: 'Descrição',
    description: 'Descrição da árvore',
    example: 'Árvore próxima ao lago',
  })
  descricao: string;

  @Column()
  @ApiPropertyOptional({
    type: Number,
    title: 'Idade (em anos)',
    description: 'Idade da árvore (em anos)',
    example: 5,
  })
  idade: number;

  @ApiProperty({
    type: () => EspecieEntity,
    title: 'Espécie',
    description: 'Espécie da árvore',
    example: {
      especieId: 1,
      codigo: 'Handroanthus albus',
      descricao: 'Ipê-amarelo, também é conhecido no Brasil como aipê e ipê-branco',
    },
  })
  @ManyToOne(() => EspecieEntity, (especie) => especie.arvores)
  @JoinColumn({ name: 'especie_id' })
  especie: EspecieEntity;
  
  @ApiProperty({
    isArray: true,
    type: () => Grupo,
    title: 'Grupos',
    description: 'Grupos da árvore',
    example: [
      {
        grupoId: 1
      },
      {
        grupoId: 2
      },
    ],
  })
  @ManyToMany(() => Grupo, grupo => grupo.arvores)
  grupos?: Grupo[];

  @ApiProperty({
    isArray: true,
    type: () => Colheita,
    title: 'Colheitas',
    description: 'Colheitas feitas na árvore',
    example: [
      {
        colheitaId: 1
      },
      {
        colheitaId: 2
      },
    ],
  })
  @OneToMany(() => Colheita, (colheita) => colheita.arvore)
  colheitas?: Colheita[];
}
