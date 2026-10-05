import { Module } from '@nestjs/common';
import { PembelianService } from './pembelian.service.js';
import { PembelianController } from './pembelian.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pembelian } from './entities/pembelian.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pembelian])
  ],
  controllers: [PembelianController],
  providers: [PembelianService],
  exports: [PembelianService], // Export PembelianService agar bisa digunakan di module lain
})
export class PembelianModule { }
