import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity.js';
import { BukuController } from './buku/buku.controller.js';
import { BukuService } from './buku/buku.service.js';
import { SupplierModule } from './supplier/supplier.module.js';
import { BarangModule } from './barang/barang.module.js';
import { PenjualanModule } from './penjualan/penjualan.module.js';
import { PembelianModule } from './pembelian/pembelian.module.js';
import { BatchStokModule } from './batch_stok/batch_stok.module.js';
import { DetailPenjualanModule } from './detail_penjualan/detail_penjualan.module.js';
import { Penjualan } from './penjualan/entities/penjualan.entity.js';
import { DetailPenjualan } from './detail_penjualan/entities/detail_penjualan.entity.js';
import { Barang } from './barang/entities/barang.entity.js';
import { Supplier } from './supplier/entities/supplier.entity.js';
import { Pembelian } from './pembelian/entities/pembelian.entity.js';
import { BatchStok } from './batch_stok/entities/batch_stok.entity.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UsersModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbName = configService.get<string>('DATABASE_NAME', 'test'); // Default ke 'nest_db' jika env kosong
        const dbUser = configService.get<string>('DB_USERNAME', 'root');
        const dbPassword = configService.get<string>('DB_PASSWORD');
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<number>('DB_PORT');
        const dbDatabase = configService.get<string>('DB_DATABASE', dbName);

        return {
          type: 'mysql',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbDatabase,
          entities: [User, Penjualan, DetailPenjualan, BatchStok, Barang, Supplier, Pembelian], // Tambahkan entitas Penjualan di sini
          synchronize: true, // Jangan gunakan synchronize: true di lingkungan produksi
        };
      },
    }),
    UsersModule,
    SupplierModule,
    BarangModule,
    PenjualanModule,
    PembelianModule,
    BatchStokModule,
    DetailPenjualanModule,
  ],
  controllers: [AppController, BukuController],
  providers: [AppService, BukuService],
})
export class AppModule { }  
