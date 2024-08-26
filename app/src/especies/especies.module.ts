import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecieEntity } from './entities/especie.entity';
import { EspeciesController } from './especies.controller';
import { EspeciesService } from './especies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EspecieEntity]),
  ],
  controllers: [EspeciesController],
  providers: [EspeciesService],
  exports: [EspeciesService],
})
export class EspeciesModule {}
