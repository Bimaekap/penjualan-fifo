import { IsString, IsNumber, IsNotEmpty, IsDate, IsInt, Min, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


export class ItemPembelianDto {
    @IsInt({ message: 'barangId harus berupa angka integer' })
    @Min(1, { message: 'barangId tidak valid' })
    @IsNotEmpty({ message: 'barangId wajib diisi' })
    @Type(() => Number)
    barangId: number;

    @IsInt({ message: 'jumlah harus berupa bilangan bulat' })
    @Min(1, { message: 'Jumlah pembelian minimal 1 unit' })
    @IsNotEmpty({ message: 'jumlah wajib diisi' })
    @Type(() => Number)
    jumlah: number;

    @IsNumber({}, { message: 'hargaBeli harus berupa angka' })
    @Min(0, { message: 'hargaBeli tidak boleh minus' })
    @IsNotEmpty({ message: 'hargaBeli wajib diisi' })
    @Type(() => Number)
    hargaBeli: number;
}

export class CreatePembelianDto {
    @IsString({ message: 'No faktur harus berupa string' })
    @IsNotEmpty({ message: 'No faktur tidak boleh kosong' })
    noFaktur: string;

    @IsInt({ message: 'supplierId harus berupa angka' })
    @Min(1, { message: 'supplier ID tidak valid' })
    @IsNotEmpty({ message: 'Supplier ID tidak boleh kosong' })
    supplierId: number;

    @IsInt({ message: 'userId harus berupa angka' })
    @Min(1, { message: 'userId tidak valid' })
    @IsNotEmpty({ message: 'userId tidak boleh kosong' })
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemPembelianDto)
    items: ItemPembelianDto[];

    @IsNumber({}, { message: 'Total Bayar harus berupa angka' })
    @IsNotEmpty({ message: 'Total Bayar tidak boleh kosong' })
    totalBayar: number;


}
