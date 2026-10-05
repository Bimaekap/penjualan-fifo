import { PartialType } from '@nestjs/mapped-types';
import { CreateBukuDto } from './create-buku.dto.js';

export class UpdateBukuDto extends PartialType(CreateBukuDto) {}
