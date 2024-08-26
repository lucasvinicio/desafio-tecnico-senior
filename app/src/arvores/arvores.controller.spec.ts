import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArvoresController } from './arvores.controller';
import { ArvoresService } from './arvores.service';
import { Arvore } from './entities/arvore.entity';

describe('ArvoresController', () => {
  let controller: ArvoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArvoresController],
      providers: [
        ArvoresService,
        {
          provide: getRepositoryToken(Arvore),
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

    controller = module.get<ArvoresController>(ArvoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
