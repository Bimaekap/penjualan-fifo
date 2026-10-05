import { Test, TestingModule } from '@nestjs/testing';
import { BatchStokController } from './batch_stok.controller.js';
import { BatchStokService } from './batch_stok.service.js';

describe('BatchStokController', () => {
  let controller: BatchStokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchStokController],
      providers: [BatchStokService],
    }).compile();

    controller = module.get<BatchStokController>(BatchStokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
