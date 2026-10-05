import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { BatchStokService } from './batch_stok.service.js';
import { CreateBatchStokDto } from './dto/create-batch_stok.dto.js';
import { UpdateBatchStokDto } from './dto/update-batch_stok.dto.js';

@Controller('batch-stok')
export class BatchStokController {
  constructor(private readonly batchStokService: BatchStokService) { }

  @Get()
  async findAvailable(@Query('barangId') barangId?: number) {
    const data = await this.batchStokService.findAvailableBatches(barangId ? Number(barangId) : undefined);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil daftar BatchStok aktif (FIFO)',
      data,
    }

  }

  @Get()
  findAll() {
    return this.batchStokService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.batchStokService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Berhasil mengambil detail BatchStok ID ${id}`,
      data,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatchStokDto: UpdateBatchStokDto) {
    return this.batchStokService.update(+id, updateBatchStokDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchStokService.remove(+id);
  }
}
