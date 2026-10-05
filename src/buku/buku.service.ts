import { Injectable } from '@nestjs/common';
import { CreateBukuDto } from './dto/create-buku.dto.js';
import { UpdateBukuDto } from './dto/update-buku.dto.js';

@Injectable()
export class BukuService {
  create(createBukuDto: CreateBukuDto) {
    return 'This action adds a new buku';
  }

  findAll() {
    return `This action returns all buku`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buku`;
  }

  update(id: number, updateBukuDto: UpdateBukuDto) {
    return `This action updates a #${id} buku`;
  }

  remove(id: number) {
    return `This action removes a #${id} buku`;
  }
}
