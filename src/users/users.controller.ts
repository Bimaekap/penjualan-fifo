import { Controller, Get, UseGuards, Request, Post, Body, Patch, Param, Delete, Req, ParseIntPipe,HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

import {JwtAuthGuard} from '../auth/guards/jtw-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request): string {
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);

    return 'Daftar Semua User';
  }

  @Get('username/:username')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findByUsername(@Param('username') username:string) {
const data = await this.usersService.findByUsername(username);
    return {
      statusCode: HttpStatus.OK,
      message: 'Data user berhasil diambil berdasarkan username',
      data: data,
    }
  } 

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return {
      statusCode: 200,
      message: 'Data Profile berhasil diambil',
      data:req.user,
    };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  getAdminData(){
    return {
      message: 'Data admin berhasil diambil',
      data: {
        secretInfo: 'Ini adalah data rahasia untuk admin',
      },
    };

    }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
