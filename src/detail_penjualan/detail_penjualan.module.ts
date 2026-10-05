import { Module } from '@nestjs/common';
import { DetailPenjualanService } from './detail_penjualan.service.js';
import { DetailPenjualanController } from './detail_penjualan.controller.js';
import { DetailPenjualan } from './entities/detail_penjualan.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailPenjualan])
  ],
  controllers: [DetailPenjualanController],
  providers: [DetailPenjualanService],
})
export class DetailPenjualanModule { }
