import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arvore } from "../../arvores/entities/arvore.entity";

@Entity({ name: 'especie' })
export class EspecieEntity {
  @ApiProperty({
    type: Number,
    title: 'ID',
    description: 'ID da espécie',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  especieId: number;

  @ApiProperty({
    type: String,
    title: 'Código',
    description: 'Código da espécie de árvore',
    example: 'Handroanthus albus',
  })
  @Column({ unique: true, length: 100, nullable: false })
  codigo: string;

  @ApiPropertyOptional({
    type: String,
    title: 'Descrição',
    description: 'Descrição da espécie de árvore',
    example: 'Ipê-amarelo, também é conhecido no Brasil como aipê e ipê-branco',
  })
  @Column({ length: 1000 })
  descricao: string;

  @ApiPropertyOptional({
    isArray: true,
    type: () => Arvore,
    title: 'Árvores',
    description: 'Lista de árvores cadastradas da espécie.',
    example: [
      {
        arvoreId: 1,
        codigo: 'ABC123',
        nome: 'Ipe de abelha',
        descricao: 'Árvore próxima ao lago',
        idade: 5,
      }
    ]
  })
  @OneToMany(() => Arvore, (arvore) => arvore.especie)
  @JoinColumn({ name: "arvore_id" })
  arvores: Arvore[];
}
