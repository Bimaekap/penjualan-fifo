import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchStokDto } from './create-batch_stok.dto.js';

export class UpdateBatchStokDto extends PartialType(CreateBatchStokDto) {}
