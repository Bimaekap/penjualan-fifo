import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pembelian } from '../../pembelian/entities/pembelian.entity.js';
import { Barang } from '../../barang/entities/barang.entity.js';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

@Entity('batch_stok')
export class BatchStok {
    @PrimaryGeneratedColumn()
    id: number;

    @IsInt({ message: 'pembelianId harus berupa angka' })
    @Min(1, { message: 'pembelianId tidak boleh negatif' })
    @IsNotEmpty({ message: 'pembelianId tidak boleh kosong' })
    @Column({ name: 'pembelian_id', nullable: false })
    pembelianId: number;

    @Column({ name: 'barang_id', nullable: false })
    barangId: number;

    @Column({ name: 'jumlah_awal', default: 0, nullable: false })
    jumlahAwal: number;

    @Column({ name: 'stok_awal', nullable: false })
    stokAwal: number;

    @Column({ name: 'sisa_stok', nullable: false })
    sisaStok: number;

    @Column({ name: 'harga_beli', type: 'decimal', precision: 12, scale: 2, nullable: false })
    hargaBeli: number;

    @Column({ name: 'tanggal_masuk', type: 'date', nullable: false })
    tanggalMasuk: Date;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @ManyToOne(() => Pembelian, (pembelian) => pembelian.batches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pembelian_id' })
    pembelian: Pembelian;

    @ManyToOne(() => Barang)
    @JoinColumn({ name: 'barang_id' })
    barang: Barang;
}