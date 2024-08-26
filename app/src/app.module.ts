import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ArvoresModule } from './arvores/arvores.module';
import { Arvore } from './arvores/entities/arvore.entity';
import { ColheitasModule } from './colheitas/colheitas.module';
import { Colheita } from './colheitas/entities/colheita.entity';
import { CommonModule } from './common/common.module';
import { EspecieEntity } from './especies/entities/especie.entity';
import { EspeciesModule } from './especies/especies.module';
import { Grupo } from './grupos/entities/grupo.entity';
import { GruposModule } from './grupos/grupos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_LOCAL_PORT,
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [EspecieEntity, Arvore, Grupo, Colheita],
      synchronize: false,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    EspeciesModule,
    ArvoresModule,
    CommonModule,
    GruposModule,
    ColheitasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
