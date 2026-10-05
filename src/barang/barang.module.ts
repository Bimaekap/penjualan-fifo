import { Module } from '@nestjs/common';
import { BarangService } from './barang.service.js';
import { BarangController } from './barang.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './entities/barang.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Barang])
  ],
  controllers: [BarangController],
  providers: [BarangService],
  exports: [BarangService], // Export BarangService agar bisa digunakan di module lain
})
export class BarangModule { }
