import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arvore } from "../../arvores/entities/arvore.entity";

@Entity('grupo')
export class Grupo {
  @ApiProperty({
    type: Number,
    title: 'ID',
    description: 'ID do grupo',
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'grupo_id' })
  grupoId: number;

  @ApiProperty({
    type: String,
    title: 'Código',
    description: 'Código do grupo',
    example: 'G01',
  })
  @Column({ unique: true })
  codigo: string;

  @ApiPropertyOptional({
    type: String,
    title: 'Nome',
    description: 'Nome do grupo',
    example: 'Grupo 01',
  })
  @Column()
  nome: string;

  @ApiPropertyOptional({
    type: String,
    title: 'Descrição',
    description: 'Descrição do grupo',
    example: 'Árvores colhidas a cada 3 meses',
  })
  @Column()
  descricao: string;

  @ApiPropertyOptional({
    isArray: true,
    type: () => Arvore,
    title: 'Árvores',
    description: 'Árvores do grupo',
    example: [
      {
        arvoreId: 1,
        codigo: 'ABC123',
        descricao: 'Árvore próxima ao lago',
        idade: 5,
      },
    ],
  })
  @ManyToMany(
    () => Arvore,
    arvore => arvore.grupos,
  )
  @JoinTable({
    name: 'grupo_arvore',
    joinColumn: {
      name: 'grupo_id',
      referencedColumnName: 'grupoId',
    },
    inverseJoinColumn: {
      name: 'arvore_id',
      referencedColumnName: 'arvoreId',
    }
  })
  arvores?: Arvore[];
}
