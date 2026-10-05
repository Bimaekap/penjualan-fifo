import { Test, TestingModule } from '@nestjs/testing';
import { DetailPenjualanService } from './detail_penjualan.service.js';

describe('DetailPenjualanService', () => {
  let service: DetailPenjualanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailPenjualanService],
    }).compile();

    service = module.get<DetailPenjualanService>(DetailPenjualanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
