import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColheitasController } from './colheitas.controller';
import { ColheitasService } from './colheitas.service';
import { Colheita } from './entities/colheita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Colheita]),
  ],
  controllers: [ColheitasController],
  providers: [ColheitasService],
})
export class ColheitasModule {}
