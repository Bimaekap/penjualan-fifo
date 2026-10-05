import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsDate, Min, IsArray, ValidateNested, IsInt, IsNotEmptyObject } from "class-validator";


export class ItemPenjualanDto {
    @IsInt({ message: 'ID Barang harus berupa integer' })
    @Min(1, { message: 'ID Barang tidak valid' })
    @IsNotEmpty({ message: 'Barang ID wajib diisi' })
    barangId: number;

    @IsInt({ message: 'Jumlah barang harus berupa bilangan bulat' })
    @Min(1, { message: 'Jumlah penjualan minimal 1' })
    jumlah: number;

    @IsNumber({}, { message: 'Harga jual harus berupa angka' })
    @Min(0, { message: 'Harga jual tidak boleh minus' })
    hargaJual: number;


}
export class CreatePenjualanDto {
    @IsString({ message: 'Nomor nota harus berupa teks' })
    @IsNotEmpty({ message: 'User ID (Kasir) wajib diisi' })
    noNota: string;

    @IsString({ message: 'User ID harus berupa integer' })
    @IsNotEmpty({ message: 'User ID tidak boleh kosong' })
    userId: number;

    @IsArray({ message: 'Item harus berupa array' })
    @ValidateNested({ each: true })
    @Type(() => ItemPenjualanDto)
    items: ItemPenjualanDto[];
}
