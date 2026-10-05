import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Supplier } from '../../supplier/entities/supplier.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { BatchStok } from '../../batch_stok/entities/batch_stok.entity.js';
import { IsInt } from 'class-validator';

@Entity('pembelian')
export class Pembelian {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'no_faktur', nullable: false })
    noFaktur: string;

    @IsInt({ message: 'supplierId harus berupa angka' })
    @Column({ name: 'supplier_id' })
    supplierId: number;

    @IsInt({ message: 'userId harus berupa angka' })
    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'tanggal_pembelian', type: 'date', nullable: false })
    tanggalPembelian: Date;

    @Column({ name: 'total_bayar', type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    totalBayar: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    // Relasi ke Supplier
    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => BatchStok, (batch) => batch.pembelianId)
    batches: BatchStok[];


}