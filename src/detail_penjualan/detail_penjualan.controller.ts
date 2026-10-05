import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailPenjualanService } from './detail_penjualan.service.js';
import { CreateDetailPenjualanDto } from './dto/create-detail_penjualan.dto.js';
import { UpdateDetailPenjualanDto } from './dto/update-detail_penjualan.dto.js';

@Controller('detail-penjualan')
export class DetailPenjualanController {
  constructor(private readonly detailPenjualanService: DetailPenjualanService) {}

  @Post()
  create(@Body() createDetailPenjualanDto: CreateDetailPenjualanDto) {
    return this.detailPenjualanService.create(createDetailPenjualanDto);
  }

  @Get()
  findAll() {
    return this.detailPenjualanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailPenjualanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailPenjualanDto: UpdateDetailPenjualanDto) {
    return this.detailPenjualanService.update(+id, updateDetailPenjualanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailPenjualanService.remove(+id);
  }
}
