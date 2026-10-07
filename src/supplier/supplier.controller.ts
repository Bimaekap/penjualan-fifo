import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SupplierService } from './supplier.service.js';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    const data = await this.supplierService.create(createSupplierDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Supplier berhasil disimpan',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.supplierService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Data supplier berhasil diambil',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.supplierService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Data supplier berhasil diambil',
      data,
    };
  }
}
