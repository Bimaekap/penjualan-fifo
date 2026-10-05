import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePembelianDto } from './dto/create-pembelian.dto.js';
import { UpdatePembelianDto } from './dto/update-pembelian.dto.js';
import { DataSource } from 'typeorm';
import { Supplier } from '../supplier/entities/supplier.entity.js';
import { Pembelian } from './entities/pembelian.entity.js';
import { BatchStok } from '../batch_stok/entities/batch_stok.entity.js';
import { Barang } from '../barang/entities/barang.entity.js';
@Injectable()
export class PembelianService {
  constructor(
    private readonly dataSource: DataSource) { }

  async create(createPembelianDto: CreatePembelianDto): Promise<Pembelian> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const supplier = await queryRunner.manager.findOne(Supplier, {
        where: { id: createPembelianDto.supplierId },
      });
      if (!supplier) {
        throw new NotFoundException(`Supplier dengan ID ${createPembelianDto.supplierId} tidak ditemukan`);
      }

      const user = await queryRunner.manager.findOne('User', {
        where: { id: createPembelianDto.userId },

      });
      if (!user) {
        throw new NotFoundException(`User dengan ID ${createPembelianDto.userId} tidak ditemukan`);
      }

      let grandTotalBayar = 0;

      const pembelian = new Pembelian();
      pembelian.noFaktur = createPembelianDto.noFaktur;
      pembelian.supplierId = createPembelianDto.supplierId;
      pembelian.userId = createPembelianDto.userId;
      pembelian.tanggalPembelian = new Date();;
      pembelian.totalBayar = createPembelianDto.totalBayar;

      const savedPembelian = await queryRunner.manager.save(Pembelian, pembelian);

      for (const item of createPembelianDto.items) {
        const barang = await queryRunner.manager.findOne('Barang', {
          where: { id: item.barangId },
        });
        if (!barang) {
          throw new NotFoundException(`Barang dengan ID ${item.barangId} tidak ditemukan`);
        }

        const hargaBeliNum = Number(item.hargaBeli);
        const jumlahAwalNum = Number(item.jumlah);
        const subTotal = hargaBeliNum * jumlahAwalNum;
        grandTotalBayar += subTotal;

        const batchStok = new BatchStok();
        batchStok.pembelianId = savedPembelian.id;
        batchStok.barangId = item.barangId;
        batchStok.stokAwal = item.jumlah;
        batchStok.sisaStok = item.jumlah;
        batchStok.hargaBeli = hargaBeliNum;
        batchStok.tanggalMasuk = new Date();

        await queryRunner.manager.save(BatchStok, batchStok);

        await queryRunner.manager.increment(
          Barang,
          { id: item.barangId },
          'totalStok',
          item.jumlah,
        );
      }

      savedPembelian.totalBayar = grandTotalBayar;
      const finalPembelian = await queryRunner.manager.save(Pembelian, savedPembelian);

      await queryRunner.commitTransaction();

      return finalPembelian;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Transaction Rollback di PembelianService:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }

  }


  findAll() {
    return `This action returns all pembelian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pembelian`;
  }

  update(id: number, updatePembelianDto: UpdatePembelianDto) {
    return `This action updates a #${id} pembelian`;
  }

  remove(id: number) {
    return `This action removes a #${id} pembelian`;
  }
}
