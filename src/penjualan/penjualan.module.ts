import { Module } from '@nestjs/common';
import { PenjualanService } from './penjualan.service.js';
import { PenjualanController } from './penjualan.controller.js';
import { BatchStok } from '../batch_stok/entities/batch_stok.entity.js';
import { Barang } from '../barang/entities/barang.entity.js';
import { DetailPenjualan } from '../detail_penjualan/entities/detail_penjualan.entity.js';
import { Penjualan } from './entities/penjualan.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity.js';
import { BatchStokModule } from '../batch_stok/batch_stok.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Penjualan, DetailPenjualan, Barang, BatchStok, User]),
    BatchStokModule
  ],
  controllers: [PenjualanController],
  providers: [PenjualanService],
  exports: [PenjualanService]
})
export class PenjualanModule { }
