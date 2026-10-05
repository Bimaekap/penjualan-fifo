import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBatchStokDto } from './dto/update-batch_stok.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatchStok } from './entities/batch_stok.entity.js';

@Injectable()
export class BatchStokService {
  constructor(
    @InjectRepository(BatchStok)
    private readonly batchStokRepository: Repository<BatchStok>,
  ) { }

  async findAvailableBatches(barangId?: number): Promise<BatchStok[]> {
    const query = this.batchStokRepository
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.barang', 'barang')
      .leftJoinAndSelect('batch.pembelian', 'pembelian')
      .where('batch.sisaStok > 0');

    if (barangId) {
      query.andWhere('batch.barangId = :barangId', { barangId });
    }

    return await query
      .orderBy('batch.tanggalMasuk', 'ASC')
      .addOrderBy('batch.id', 'ASC')
      .getMany();
  }

  findAll() {
    return `This action returns all batchStok`;
  }

  // Find 1 batch by ID
  async findOne(id: number): Promise<BatchStok> {
    const batch = await this.batchStokRepository.findOne({
      where: { id },
      relations: ['barang', 'pembelian'],
    });

    if (!batch) {
      throw new NotFoundException(`BatchStok dengan ID ${id} tidak ditemukan`);
    }

    return batch;
  }

  update(id: number, updateBatchStokDto: UpdateBatchStokDto) {
    return `This action updates a #${id} batchStok`;
  }

  remove(id: number) {
    return `This action removes a #${id} batchStok`;
  }
}
