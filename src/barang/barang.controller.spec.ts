import { Test, TestingModule } from '@nestjs/testing';
import { BarangController } from './barang.controller.js';
import { BarangService } from './barang.service.js';

describe('BarangController', () => {
  let controller: BarangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarangController],
      providers: [BarangService],
    }).compile();

    controller = module.get<BarangController>(BarangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
