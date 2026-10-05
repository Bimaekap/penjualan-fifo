import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BukuService } from './buku.service.js';
import { CreateBukuDto } from './dto/create-buku.dto.js';
import { UpdateBukuDto } from './dto/update-buku.dto.js';

@Controller('buku')
export class BukuController {
  constructor(private readonly bukuService: BukuService) {}

  @Post()
  create(@Body() createBukuDto: CreateBukuDto) {
    return this.bukuService.create(createBukuDto);
  }

  @Get()
  findAll() {
    return this.bukuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bukuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBukuDto: UpdateBukuDto) {
    return this.bukuService.update(+id, updateBukuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bukuService.remove(+id);
  }
}
