import { PartialType } from '@nestjs/mapped-types';
import { CreatePenjualanDto } from './create-penjualan.dto.js';

export class UpdatePenjualanDto extends PartialType(CreatePenjualanDto) {}
