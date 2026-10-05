import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { PembelianService } from './pembelian.service.js';
import { CreatePembelianDto } from './dto/create-pembelian.dto.js';
import { UpdatePembelianDto } from './dto/update-pembelian.dto.js';

@Controller('pembelian')
export class PembelianController {

  constructor(private readonly pembelianService: PembelianService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)

  async create(@Body() createPembelianDto: CreatePembelianDto) {
    const data = await this.pembelianService.create(createPembelianDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transaksi pembelian berhasil disimpan dan BatchStok terbentuk',
      data,
    }
  }

  @Get()
  findAll() {
    return this.pembelianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pembelianService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePembelianDto: UpdatePembelianDto) {
    return this.pembelianService.update(+id, updatePembelianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pembelianService.remove(+id);
  }
}
