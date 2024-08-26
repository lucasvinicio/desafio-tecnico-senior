import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArvoresController } from './arvores.controller';
import { ArvoresService } from './arvores.service';
import { Arvore } from './entities/arvore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Arvore
    ])
  ],
  controllers: [ArvoresController],
  providers: [ArvoresService],
})
export class ArvoresModule {}
