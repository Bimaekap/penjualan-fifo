import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailPenjualanDto } from './create-detail_penjualan.dto.js';

export class UpdateDetailPenjualanDto extends PartialType(CreateDetailPenjualanDto) {}
