import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { GruposController } from './grupos.controller';
import { GruposService } from './grupos.service';

describe('GruposController', () => {
  let controller: GruposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GruposController],
      providers: [
        GruposService,
        {
          provide: getRepositoryToken(Grupo),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    }).compile();

    controller = module.get<GruposController>(GruposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
