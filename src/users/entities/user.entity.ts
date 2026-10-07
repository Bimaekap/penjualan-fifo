import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    role: string;
    
    @Column()
    password: string;
}