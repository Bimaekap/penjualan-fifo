import { Injectable } from '@nestjs/common';
import { CreateDetailPenjualanDto } from './dto/create-detail_penjualan.dto.js';
import { UpdateDetailPenjualanDto } from './dto/update-detail_penjualan.dto.js';

@Injectable()
export class DetailPenjualanService {
  create(createDetailPenjualanDto: CreateDetailPenjualanDto) {
    return 'This action adds a new detailPenjualan';
  }

  findAll() {
    return `This action returns all detailPenjualan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailPenjualan`;
  }

  update(id: number, updateDetailPenjualanDto: UpdateDetailPenjualanDto) {
    return `This action updates a #${id} detailPenjualan`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailPenjualan`;
  }
}
