import { Test, TestingModule } from '@nestjs/testing';
import { PembelianController } from './pembelian.controller.js';
import { PembelianService } from './pembelian.service.js';

describe('PembelianController', () => {
  let controller: PembelianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PembelianController],
      providers: [PembelianService],
    }).compile();

    controller = module.get<PembelianController>(PembelianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
