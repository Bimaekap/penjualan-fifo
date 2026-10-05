import { PartialType } from '@nestjs/mapped-types';
import { CreatePembelianDto } from './create-pembelian.dto.js';

export class UpdatePembelianDto extends PartialType(CreatePembelianDto) {}
