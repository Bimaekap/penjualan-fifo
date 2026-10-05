import { Module } from '@nestjs/common';
import { BatchStokService } from './batch_stok.service.js';
import { BatchStokController } from './batch_stok.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchStok } from './entities/batch_stok.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([BatchStok])
  ],
  controllers: [BatchStokController],
  providers: [BatchStokService],
  exports: [TypeOrmModule, BatchStokService],
})
export class BatchStokModule { }
