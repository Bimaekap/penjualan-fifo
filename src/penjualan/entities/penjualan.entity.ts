import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { DetailPenjualan } from '../../detail_penjualan/entities/detail_penjualan.entity.js';

@Entity('penjualan')
export class Penjualan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'no_nota', nullable: false })
    noNota: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'tanggal_penjualan', type: 'date', nullable: false })
    tanggalPenjualan: Date;

    @Column({ name: 'total_hpp', type: 'decimal', precision: 12, scale: 2, nullable: false })
    totalHpp: number;

    @Column({ name: 'total_bayar', type: 'decimal', precision: 12, scale: 2, nullable: false })
    totalBayar: number;

    @Column({ name: 'laba_kotor', type: 'decimal', precision: 12, scale: 2, nullable: false })
    labaKotor: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    // relasi ke user

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => DetailPenjualan, (detail) => detail.penjualanId, {
        cascade: true,
    })
    details: DetailPenjualan[];
}
