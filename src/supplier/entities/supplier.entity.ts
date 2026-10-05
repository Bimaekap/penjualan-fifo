import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('supplier')
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nama_supplier', nullable: false })
    namaSupplier: string;

    @Column({ name: 'telepon' })
    telepon: string;

    @Column({ name: 'alamat' })
    alamat: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;
}