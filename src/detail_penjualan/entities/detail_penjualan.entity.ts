import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Barang } from '../../barang/entities/barang.entity.js';
import type { Penjualan } from '../../penjualan/entities/penjualan.entity.js';

@Entity('detail_penjualan')
export class DetailPenjualan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'penjualan_id', nullable: false })
    penjualanId: number;

    @Column({ name: 'batch_stok_id', nullable: false })
    batchStokId: number;

    @Column({ name: 'jumlah', nullable: false })
    jumlah: number;

    @Column({ name: 'harga_beli_batch', type: 'decimal', precision: 12, scale: 2, nullable: false })
    hargaBeliBatch: number;

    @Column({ name: 'harga_jual', type: 'decimal', precision: 12, scale: 2, nullable: false })
    hargaJual: number;

    @Column({ name: 'subtotal_hpp', type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    subTotalHpp: number;

    @Column({ name: 'subtotal_jual', type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    subTotalJual: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;


    // Relasi ke Master Barang
    @ManyToOne(() => Barang)
    @JoinColumn({ name: 'barang_id' })
    barang: Barang;
    // Relasi ke Header Penjualan

    @ManyToOne('Penjualan', (penjualan: Penjualan) => penjualan.details,
     { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'penjualan_id' })
    penjualan: Penjualan;



}

