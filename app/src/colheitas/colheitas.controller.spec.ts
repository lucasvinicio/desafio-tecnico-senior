import { Test, TestingModule } from '@nestjs/testing';
import { ColheitasController } from './colheitas.controller';
import { ColheitasService } from './colheitas.service';

describe('ColheitasController', () => {
  let controller: ColheitasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColheitasController],
      providers: [ColheitasService],
    }).compile();

    controller = module.get<ColheitasController>(ColheitasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
