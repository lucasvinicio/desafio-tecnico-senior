import { Test, TestingModule } from '@nestjs/testing';
import { ColheitasService } from './colheitas.service';

describe('ColheitasService', () => {
  let service: ColheitasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColheitasService],
    }).compile();

    service = module.get<ColheitasService>(ColheitasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
