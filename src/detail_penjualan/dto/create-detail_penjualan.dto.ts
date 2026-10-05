import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateDetailPenjualanDto {
    @IsString({ message: 'Penjualan id harus berupa string' })
    @IsNotEmpty({ message: 'Penjualan id tidak boleh kosong' })
    penjualanId: string;

    @IsString({ message: 'Batch stok id harus berupa string' })
    @IsNotEmpty({ message: 'Batch stok id tidak boleh kosong' })
    batchStokId: string;

    @IsNumber({}, { message: 'Jumlah harus berupa angka' })
    @IsNotEmpty({ message: 'Jumlah tidak boleh kosong' })
    jumlah: number;

    @IsNumber({}, { message: 'Harga beli batch harus berupa angka' })
    @IsNotEmpty({ message: 'Harga beli batch tidak boleh kosong' })
    hargaBeliBatch: number;

    @IsNumber({}, { message: 'Harga jual harus berupa angka' })
    @IsNotEmpty({ message: 'Harga jual tidak boleh kosong' })
    hargaJual: number;

    @IsNumber({}, { message: 'Sub total hpp harus berupa angka' })
    subTotalHpp: number;

    @IsNumber({}, { message: 'Sub total jual harus berupa angka' })
    subTotalJual: number;
}
