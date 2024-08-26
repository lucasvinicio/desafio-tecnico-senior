import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EspecieEntity } from './entities/especie.entity';
import { EspeciesService } from './especies.service';

describe('EspeciesService', () => {
  let service: EspeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<EspeciesService>(EspeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
