import { Test, TestingModule } from '@nestjs/testing';
import { BatchStokService } from './batch_stok.service.js';

describe('BatchStokService', () => {
  let service: BatchStokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchStokService],
    }).compile();

    service = module.get<BatchStokService>(BatchStokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
