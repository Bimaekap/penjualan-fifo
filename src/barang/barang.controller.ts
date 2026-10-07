import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BarangService } from './barang.service.js';
import { CreateBarangDto } from './dto/create-barang.dto.js';
import { UpdateBarangDto } from './dto/update-barang.dto.js';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBarangDto: CreateBarangDto) {
    const data = await this.barangService.create(createBarangDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Barang berhasil disimpan',
      data,
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.barangService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Data barang berhasil diambil',
      data,
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.barangService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Data barang berhasil diambil bersdasarkan ID',
      data,
    }
  }
}
