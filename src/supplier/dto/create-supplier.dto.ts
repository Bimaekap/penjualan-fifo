import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
    @IsString({ message: 'Nama supplier harus berupa string' })
    @IsNotEmpty({ message: 'Nama supplier tidak boleh kosong' })
    namaSupplier: string;

    @IsString({ message: 'Alamat harus berupa string' })
    @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
    alamat: string;

    @IsString({ message: 'telepon supplier harus berupa string' })
    @IsNotEmpty({ message: 'telepon supplier tidak boleh kosong' })
    telepon: string;


}