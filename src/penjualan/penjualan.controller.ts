import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PenjualanService } from './penjualan.service.js';
import { CreatePenjualanDto } from './dto/create-penjualan.dto.js';

@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) { }

  // POST /penjualan - Membuat transaksi penjualan baru (FIFO & HPP Calculation)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPenjualanDto: CreatePenjualanDto) {
    const data = await this.penjualanService.create(createPenjualanDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transaki penjualan berhasil disimpan',
      data,
    }
  }

  // GET /penjualan - Mengambil seluruh daftar riwayat transaksi penjualan
  @Get()
  async findAll() {
    const data = await this.penjualanService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil seluruh data penjualan',
      data,
    };
  }

  // GET /penjualan/:id - Mengambil 1 detail nota spesifik beserta relasi FIFO batch-nya
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.penjualanService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Berhasil mengambil detail penjualan dengan ID ${id}`,
      data,
    };

  }


}
