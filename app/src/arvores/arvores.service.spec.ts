import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArvoresService } from './arvores.service';
import { Arvore } from './entities/arvore.entity';

describe('ArvoresService', () => {
  let service: ArvoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ArvoresService>(ArvoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
