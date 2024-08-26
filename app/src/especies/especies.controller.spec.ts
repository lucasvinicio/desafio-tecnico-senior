import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EspecieEntity } from './entities/especie.entity';
import { EspeciesController } from './especies.controller';
import { EspeciesService } from './especies.service';

describe('EspeciesController', () => {
  let controller: EspeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspeciesController],
      providers: [
        EspeciesService,
        {
          provide: getRepositoryToken(EspecieEntity),
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

    controller = module.get<EspeciesController>(EspeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
