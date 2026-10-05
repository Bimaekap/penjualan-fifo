import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service.js';
import { SupplierController } from './supplier.controller.js';
import { Supplier } from './entities/supplier.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier])
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [SupplierService], // Export SupplierService agar bisa digunakan di module lain
})
export class SupplierModule { }
