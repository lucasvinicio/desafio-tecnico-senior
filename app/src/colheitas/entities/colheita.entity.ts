import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Arvore } from "../../arvores/entities/arvore.entity";

@Entity()
export class Colheita {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    title: 'ID',
    description: 'ID da colheita',
    example: 1
  })
  colheitaId: number;

  @Column()
  @ApiPropertyOptional({
    type: String,
    title: 'Informações',
    description: 'Informações da colheita',
    example: 'Colheita feita pelo João',
  })
  informacoes: string;

  @Column()
  @ApiProperty({
    type: Date,
    title: 'Data',
    description: 'Data da colheita',
    example: '2024-01-01',
  })
  data: Date;

  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
  })
  @ApiProperty({
    type: Number,
    title: 'Peso bruto (em kg)',
    description: 'Peso bruto da colheita (em kg)',
    example: 5.23,
  })
  pesoBruto: number;

  @ApiProperty({
    type: () => Arvore,
    title: 'Árvore',
    description: 'Árvore que foi colhida',
    example: {
      arvoreId: 1,
      codigo: 'ABC123',
      descricao: 'Árvore próxima ao lago',
      idade: 5,
    }
  })
  @ManyToOne(() => Arvore, (arvore) => arvore.colheitas)
  @JoinColumn({ name: 'arvore_id' })
  arvore?: Arvore;
}
