import { Injectable } from '@nestjs/common';
import { CreateBarangDto } from './dto/create-barang.dto.js';
import { UpdateBarangDto } from './dto/update-barang.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barang } from './entities/barang.entity.js';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class BarangService {

  constructor(
    @InjectRepository(Barang)
    private readonly barangRepository: Repository<Barang>
  ) { }

  async create(createBarangDto: CreateBarangDto): Promise<Barang> {
    const existingBarang = await this.barangRepository.findOne({
      where: { namaBarang: createBarangDto.namaBarang }
    });

    if (existingBarang) {
      throw new ConflictException(`Barang dengan nama '${createBarangDto.namaBarang}' sudah ada.`);
    }

    // 2. Buat instance dan simpan
    const barang = new Barang();
    barang.namaBarang = createBarangDto.namaBarang;
    barang.kategori = createBarangDto.kategori;
    barang.satuan = createBarangDto.satuan;
    barang.hargaJual = createBarangDto.hargaJual;
    barang.totalStok = createBarangDto.totalStok ?? 0;

    return await this.barangRepository.save(barang);
  };

  findAll() {
    return `This action returns all barang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barang`;
  }

  update(id: number, updateBarangDto: UpdateBarangDto) {
    return `This action updates a #${id} barang`;
  }

  remove(id: number) {
    return `This action removes a #${id} barang`;
  }
}
