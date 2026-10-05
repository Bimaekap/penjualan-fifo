import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePenjualanDto } from './dto/create-penjualan.dto.js';
import { Penjualan } from './entities/penjualan.entity.js';
import { Barang } from '../barang/entities/barang.entity.js';
import { BatchStok } from '../batch_stok/entities/batch_stok.entity.js';
import { DetailPenjualan } from '../detail_penjualan/entities/detail_penjualan.entity.js';

@Injectable()
export class PenjualanService {

  constructor(
    private readonly dataSource: DataSource,
  ) { }

  async create(createPenjualanDto: CreatePenjualanDto): Promise<Penjualan> {
    const queryRunner = this.dataSource.createQueryRunner();

    // 1. Inisialisasi dan jalankan database transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const user = await queryRunner.manager.findOne('User', {
        where: { id: createPenjualanDto.userId },
      });
      if (!user) {
        throw new NotFoundException(`User dengan ID ${createPenjualanDto.userId} tidak ditemukan`);
      };

      let grandTotalHpp = 0;
      let grandTotalBayar = 0;

      // 2. Buat header Penjualan terlebih dahulu
      const penjualan = queryRunner.manager.create(Penjualan, {
        noNota: createPenjualanDto.noNota,
        userId: createPenjualanDto.userId,
        tanggalPenjualan: new Date(),
        totalHpp: 0,
        totalBayar: 0,
        labaKotor: 0,
      });

      const savedPenjualan = await queryRunner.manager.save(Penjualan, penjualan);

      // 3. Iterasi setiap item barang dari request DTO
      for (const item of createPenjualanDto.items) {
        let sisaKebutuhan = item.jumlah;

        // Validasi ketersediaan Master Barang
        const barang = await queryRunner.manager.findOne(Barang, {
          where: { id: item.barangId },
        });

        if (!barang) {
          throw new NotFoundException(`Barang dengan ID ${item.barangId} tidak ditemukan.`);
        }

        if (barang.totalStok < item.jumlah) {
          throw new BadRequestException(
            `Stok '${barang.namaBarang}' tidak mencukupi. (Dibutuhkan: ${item.jumlah}, Tersedia: ${barang.totalStok})`,
          );
        }

        // Ambil BatchStok sesuai prinsip FIFO (tanggal_masuk ASC, id ASC)
        const activeBatches = await queryRunner.manager.find(BatchStok, {
          where: { barangId: item.barangId },
          order: {
            tanggalMasuk: 'ASC',
            id: 'ASC',
          },
        });

        const availableBatches = activeBatches.filter((b) => b.sisaStok > 0);

        // Eksekusi pemotongan FIFO per BatchStok
        for (const batch of availableBatches) {
          if (sisaKebutuhan <= 0) break;

          const diambil = Math.min(batch.sisaStok, sisaKebutuhan);

          // Potong sisa stok di batch
          batch.sisaStok -= diambil;
          sisaKebutuhan -= diambil;
          await queryRunner.manager.save(BatchStok, batch);

          // Kalkulasi angka keuangan per batch
          const hargaBeliBatch = Number(batch.hargaBeli);
          const subtotalHpp = diambil * hargaBeliBatch;
          const subtotalJual = diambil * item.hargaJual;

          grandTotalHpp += subtotalHpp;
          grandTotalBayar += subtotalJual;

          // Catat ke DetailPenjualan sesuai skema DBML
          const detailPenjualan = queryRunner.manager.create(DetailPenjualan, {
            penjualanId: savedPenjualan.id,
            batchStokId: batch.id,
            jumlah: diambil,
            hargaBeliBatch: hargaBeliBatch,
            hargaJual: item.hargaJual,
            subtotalHpp: subtotalHpp,
            subtotalJual: subtotalJual,
          });

          await queryRunner.manager.save(DetailPenjualan, detailPenjualan);
        }

        // Update aggregated total_stok pada Master Barang
        barang.totalStok -= item.jumlah;
        await queryRunner.manager.save(Barang, barang);
      }

      // 4. Update akumulasi header Nota Penjualan & Laba Kotor
      savedPenjualan.totalHpp = grandTotalHpp;
      savedPenjualan.totalBayar = grandTotalBayar;
      savedPenjualan.labaKotor = grandTotalBayar - grandTotalHpp; // total_bayar - total_hpp

      const result = await queryRunner.manager.save(Penjualan, savedPenjualan);

      // 5. Commit seluruh perubahan jika sukses
      await queryRunner.commitTransaction();
      return result;

    } catch (error) {
      // Rollback jika terjadi kesalahan atau stok habis di tengah jalan
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Lepaskan koneksi runner
      await queryRunner.release();
    }
  }
  // Method Read: Mengambil seluruh riwayat transaksi
  async findAll(): Promise<Penjualan[]> {
    return this.dataSource.getRepository(Penjualan).find({
      relations: ['user', 'details', 'details.batchStok'],
      order: { id: 'DESC' },
    });
  }

  // Method Read: Mengambil 1 nota spesifik beserta detail & batch yang dipotong
  async findOne(id: number): Promise<Penjualan> {
    const penjualan = await this.dataSource.getRepository(Penjualan).findOne({
      where: { id },
      relations: [
        'user',
        'details',
        'details.batchStok',
        'details.batchStok.barang',
      ],
    });

    if (!penjualan) {
      throw new NotFoundException(
        `Transaksi Penjualan dengan ID ${id} tidak ditemukan.`,
      );
    }

    return penjualan;

  }
}


