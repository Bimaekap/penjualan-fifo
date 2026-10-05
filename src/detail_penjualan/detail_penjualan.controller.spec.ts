import { Test, TestingModule } from '@nestjs/testing';
import { DetailPenjualanController } from './detail_penjualan.controller.js';
import { DetailPenjualanService } from './detail_penjualan.service.js';

describe('DetailPenjualanController', () => {
  let controller: DetailPenjualanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailPenjualanController],
      providers: [DetailPenjualanService],
    }).compile();

    controller = module.get<DetailPenjualanController>(DetailPenjualanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
