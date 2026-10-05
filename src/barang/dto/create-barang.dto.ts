import { IsNotEmpty, IsNumber, IsString, IsInt, Min } from "class-validator";
export class CreateBarangDto {

    @IsString({ message: 'Kategori barang harus berupa string' })
    @IsNotEmpty({ message: 'Kategori barang tidak boleh kosong' })
    kategori: string;

    @IsString({ message: 'Nama barang harus berupa string' })
    @IsNotEmpty({ message: 'Nama barang tidak boleh kosong' })
    namaBarang: string;

    @IsString({ message: 'Satuan harus berupa string' })
    @IsNotEmpty({ message: 'Satuan tidak boleh kosong' })
    satuan: string;

    @IsNumber({}, { message: 'Harga jual harus berupa angka' })
    @Min(0, { message: 'Harga jual tidak boleh minus' })
    @IsNotEmpty({ message: 'Harga jual tidak boleh kosong' })
    hargaJual: number;

    @IsInt({ message: 'Total stok harus berupa bilangan bulat' })
    @Min(0, { message: 'Total stok tidak boleh minus' })
    @IsNotEmpty({ message: 'Total stok tidak boleh kosong' })
    totalStok: number;

}
