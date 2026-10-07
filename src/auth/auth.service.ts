import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly JwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signIn(username: string, password: string){
        const user = await this.usersService.findByUsername(username);

        if(!user){
            throw new UnauthorizedException('Username atau password salah');
        }

        const passwordValid = 
        await bcrypt.compare(password, user.password);


        if(!passwordValid){
            throw new UnauthorizedException('Username atau password salah');
        }
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        }


        const accessToken = await this.JwtService.signAsync(payload, {
            secret: this.configService.get<string>(
                'JWT_SECRET',
            ),
            expiresIn: '15m',
        });
        
        const refreshToken = await this.JwtService.signAsync(payload,{
            secret: 'JWT_REFRESH_SECRET',
            expiresIn: '7d',
        })


        return {
            message: 'Login berhasil',
            data: {
                accessToken,
                refreshToken,
            }
        }
    }

     async refreshToken(refreshToken: string) {
    try {
      const payload =
        await this.JwtService.verifyAsync(
          refreshToken,
          {
            secret:
              this.configService.get<string>(
                'JWT_REFRESH_SECRET',
              ),
          },
        );

      const newAccessToken =
        await this.JwtService.signAsync(
          {
            sub: payload.sub,
            username: payload.username,
            role: payload.role,
          },
          {
            secret:
              this.configService.get<string>(
                'JWT_SECRET',
              ),
            expiresIn: '15m',
          },
        );
      return {
        message: 'Token berhasil diperbarui',
        data: {
          accessToken: newAccessToken,
        }
      };
    } catch (error) {
         console.log('REFRESH TOKEN ERROR:', error);
      throw new UnauthorizedException('Token tidak valid');
    }
  
     }
    }
    

