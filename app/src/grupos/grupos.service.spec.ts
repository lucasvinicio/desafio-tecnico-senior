import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { GruposService } from './grupos.service';

describe('GruposService', () => {
  let service: GruposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<GruposService>(GruposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
