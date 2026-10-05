import { Module } from '@nestjs/common';
import { BukuService } from './buku.service.js';
import { BukuController } from './buku.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buku } from './entities/buku.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Buku])],
  controllers: [BukuController],
  providers: [BukuService],
})
export class BukuModule { }
