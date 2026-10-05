import { IsString, IsNotEmpty, IsNumber, IsDate, IsInt, Min } from "class-validator";

export class CreateBatchStokDto {
    @IsString({ message: 'Pembelian id harus berupa string' })
    @IsNotEmpty({ message: 'Pembelian id tidak boleh kosong' })
    pembelianId: string;

    @IsString({ message: 'Barang id harus berupa string' })
    @IsNotEmpty({ message: 'Barang id tidak boleh kosong' })
    barangId: string;

    @IsInt({ message: 'Stok awal harus berupa bilangan bulat' })
    @Min(0, { message: 'Stok awal tidak boleh negatif' })
    @IsNotEmpty({ message: 'Stok awal tidak boleh kosong' })
    stokAwal: number;

    @IsInt({ message: 'Sisa stok harus berupa bilangan bulat' })
    @Min(0, { message: 'Sisa stok tidak boleh negatif' })
    @IsNotEmpty({ message: 'Sisa stok tidak boleh kosong' })
    sisaStok: number;

    @IsNumber({}, { message: 'Harga beli harus berupa angka' })
    @IsNotEmpty({ message: 'Harga beli tidak boleh kosong' })
    hargaBeli: number;

    @IsDate({ message: 'Tanggal masuk harus berupa tanggal' })
    @IsNotEmpty({ message: 'Tanggal masuk tidak boleh kosong' })
    tanggalMasuk: Date;

}
