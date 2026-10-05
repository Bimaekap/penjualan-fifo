import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('barang')
export class Barang {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'kategori', nullable: false })
    kategori: string;

    @Column({ name: 'nama_barang', nullable: false })
    namaBarang: string;

    @Column({ name: 'satuan', nullable: false })
    satuan: string;

    @Column({ name: 'harga_jual', type: 'decimal', precision: 12, scale: 2, nullable: false })
    hargaJual: number;

    @Column({ name: 'total_stok', type: 'int', default: 0 })
    totalStok: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

}
