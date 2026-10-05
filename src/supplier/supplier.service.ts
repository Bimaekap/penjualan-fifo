import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity.js';
import { Repository } from 'typeorm';

@Injectable()

export class SupplierService {
  constructor(

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findOne({
      where: { namaSupplier: createSupplierDto.namaSupplier }
    });

    if (existingSupplier) {
      throw new ConflictException(`Supplier dengan nama '${createSupplierDto.namaSupplier}' sudah ada.`);
    }

    const supplier = new Supplier();
    supplier.namaSupplier = createSupplierDto.namaSupplier;
    supplier.alamat = createSupplierDto.alamat;
    supplier.telepon = createSupplierDto.telepon;

    return await this.supplierRepository.save(supplier);
  };

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
